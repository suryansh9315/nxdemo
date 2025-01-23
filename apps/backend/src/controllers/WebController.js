const AWS = require("aws-sdk");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { WebUser, ProfileData } = require("../models/WebUser");

const secretKey = process.env.ENCRYPTION_KEY;
const SES = new AWS.SES();
const cognito = new AWS.CognitoIdentityServiceProvider();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

const WebController = {
  Register: async (req, res) => {
    try {
      const { email, password, businessType } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required." });
      }

      const existingUser = await WebUser.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists." });
      }

      const hashedPassword = await hashPassword(password);
      const secretHash = getSecretHash(email);

      const countryCode = +91;
      const mobilePhone = 7985897358;
      const city = "nothing";
      const firstName = "hello";
      const lastName = "world";

      const params = {
        ClientId: process.env.COGNITO_CLIENT_ID,
        SecretHash: secretHash,
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "phone_number", Value: `+${countryCode}${mobilePhone}` },
          { Name: "address", Value: city },
          { Name: "name", Value: `${firstName} ${lastName}` },
        ],
      };

      const signUpCognito = () =>
        new Promise((resolve, reject) => {
          cognito.signUp(params, (err, data) => {
            if (err) return reject(err);
            resolve(data);
          });
        });

      try {
        await signUpCognito();

        const newUser = new WebUser({
          email,
          password: hashedPassword,
          businessType,
        });

        const savedUser = await newUser.save();
        const token = jwt.sign(
          { email: savedUser.email, userId: savedUser._id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.EXPIRE_IN }
        );
        const refreshToken = jwt.sign(
          { email: savedUser.email, userId: savedUser._id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.EXPIRE_IN_REFRESH }
        );

        res.cookie("accessToken", token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 1000, // 1 hour
          sameSite: "Strict",
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000, // 1 day or as per your design
          sameSite: "Strict",
        });

        return res.status(200).json({
          message: "User registered successfully!",
          userId: savedUser._id,
        });
      } catch (dbError) {
        console.error("Error saving user to DB:", dbError);
        res.status(500).json({ message: "Database error while saving user." });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const getEmail = await WebUser.findOne({ email });
      if (!getEmail) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValidPassword = await bcrypt.compare(password, getEmail.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { email: getEmail.email, userId: getEmail._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRE_IN }
      );

      const refreshToken = jwt.sign(
        { email: getEmail.email, userId: getEmail._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRE_IN_REFRESH }
      );

      res.cookie("accessToken", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
        sameSite: "Strict",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "Strict",
      });

      return res.status(200).json({
        message: "Login Successful",
        token,
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
  signOut: async (req, res) => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      res.clearCookie("refreshToken", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error during sign-out:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email);

      const user = await WebUser.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpiry = Date.now() + 5 * 60 * 1000;
        await WebUser.updateOne({ email }, { $set: { otp, otpExpiry } });
        const params = {
          Source: process.env.MAIL_DRIVER,
          Destination: {
            ToAddresses: [email],
          },
          Message: {
            Subject: { Data: "Your OTP Code" },
            Body: {
              Text: { Data: `Your OTP is: ${otp}. It is valid for 5 minutes.` },
            },
          },
        };
        const emailSent = await SES.sendEmail(params).promise();
        console.log("Email sent:", emailSent);
        res.status(200).json({ message: "Otp sent successfully" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "Error during login", error: error.message });
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;

      console.log("Received OTP:", otp);

      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
      }

      const user = await WebUser.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const formattedOtp = Array.isArray(otp)
        ? parseInt(otp.join(""), 10)
        : parseInt(otp, 10);

      const isOtpValid = user.otp === formattedOtp;
      const isOtpExpired = Date.now() > user.otpExpiry;

      if (!isOtpValid) {
        return res.status(401).json({ message: "Invalid OTP" });
      }

      if (isOtpExpired) {
        return res.status(401).json({ message: "OTP has expired" });
      }

      await WebUser.updateOne(
        { email },
        { $unset: { otp: "", otpExpiry: "" } }
      );

      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({
        message: "Error during OTP verification",
        error: error.message,
      });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { email, password } = req.body;
      const getdata = await WebUser.findOne({ email });
      if (!getdata) {
        return res.status(404).json({ message: "User not found" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await WebUser.updateOne(
          { email },
          { $set: { password: hashedPassword } }
        );
        res.status(200).json({ message: "Password updated successfully" });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({
        message: "Error updating password",
      });
    }
  },
  setupProfile: async (req, res) => {
    console.log("Files:", req.files?.prescription_upload);
    try {
      const {
        userId,
        businessName,
        registrationNumber,
        yearOfEstablishment,
        phoneNumber,
        website,
        addressLine1,
        street,
        city,
        state,
        zipCode,
        activeModes,
        selectedServices,
      } = req.body;
      console.log("selectedServices", selectedServices);
      const uploadToS3 = (file, folderName) => {
        return new Promise((resolve, reject) => {
          const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `${folderName}/${Date.now()}_${file.name}`,
            Body: file.data,
            ContentType: file.mimetype,
          };

          s3.upload(params, (err, data) => {
            if (err) {
              console.error("Error uploading to S3:", err);
              reject(err);
            } else {
              resolve(data.Key);
            }
          });
        });
      };

      const logo = req.files?.logo
        ? await uploadToS3(req.files.logo, "logo")
        : undefined; // Don't overwrite if no new logo is provided
      const prescriptionUpload = req.files?.prescription_upload
        ? await uploadToS3(req.files.prescription_upload, "prescriptions")
        : undefined; // Don't overwrite if no new prescription file is provided

      const profile = await ProfileData.findOne({ userId });

      if (profile) {
        await ProfileData.updateOne(
          { userId },
          {
            $set: {
              businessName,
              registrationNumber,
              yearOfEstablishment,
              phoneNumber,
              website,
              address: { addressLine1, street, city, state, zipCode },
              activeModes,
              selectedServices,
              logo: logo || profile.logo,
              prescription_upload:
                prescriptionUpload || profile.prescription_upload,
            },
          }
        );
        res.status(200).json({ message: "Profile updated successfully" });
      } else {
        // Create a new profile if it doesn't exist
        const newProfile = await ProfileData.create({
          userId,
          businessName,
          registrationNumber,
          yearOfEstablishment,
          phoneNumber,
          website,
          address: { addressLine1, street, city, state, zipCode },
          activeModes,
          selectedServices,
          logo: logo || null,
          prescription_upload: prescriptionUpload || null,
        });
        if (newProfile) {
          res.status(200).json({ message: "Profile created successfully" });
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error.message, error.stack);
      res.status(500).json({
        message: "Error updating profile",
      });
    }
  },

  getProfile: async (req, res) => {
    try {
      const userId = req.params.id;
      const profile = await ProfileData.findOne({ userId });

      if (profile) {
        const getS3Url = (fileKey) => {
          if (fileKey) {
            return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
          }
          return null;
        };

        const logoUrl = getS3Url(profile.logo);
        const prescriptionUploadUrl = getS3Url(profile.prescription_upload);
        console.log(logoUrl, prescriptionUploadUrl);

        res.status(200).json({
          ...profile.toObject(),
          logoUrl,
          prescriptionUploadUrl,
        });
      } else {
        res.status(404).json({ message: "Profile not found" });
      }
    } catch (error) {
      console.error("Error getting profile:", error);
      res.status(500).json({ message: "Error retrieving profile" });
    }
  },
};
function getSecretHash(email) {
  const clientId = process.env.COGNITO_CLIENT_ID;
  const clientSecret = process.env.COGNITO_CLIENT_SECRET;

  return crypto
    .createHmac("SHA256", clientSecret)
    .update(email + clientId)
    .digest("base64");
}

module.exports = WebController;
