const Department = require("../models/AddDepartment");
const AddDoctors = require("../models/addDoctor");
const bcrypt = require("bcrypt");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const AddDoctorsController = {
  addDoctor: async (req, res) => {
    const formData = req.body.formData ? JSON.parse(req.body.formData) : {};
    const {
      personalInfo,
      residentialAddress,
      professionalBackground,
      availability,
      consultFee,
      loginCredentials,
      activeModes,
      authSettings,
    } = formData;
    console.log(formData);

    // S3 file upload utility
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

    let image, prescriptionUpload;

    try {
      // Check if files are present and upload them to S3
      if (req.files && req.files.image) {
        image = await uploadToS3(req.files.image, "images"); // Upload image file to 'images' folder
      }
      if (req.files && req.files.DoctorPrescriptions) {
        prescriptionUpload = await uploadToS3(
          req.files.DoctorPrescriptions,
          "DoctorPrescriptions"
        ); // Upload prescription file
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(loginCredentials.password, 10);

      // Create a new doctor instance and populate it with the received data
      const newDoctor = new AddDoctors({
        personalInfo: { ...personalInfo, image }, // Add image URL if uploaded
        residentialAddress,
        professionalBackground,
        availability,
        consultFee,
        loginCredentials: {
          username: loginCredentials.username,
          password: hashedPassword, // Store the hashed password
        },
        activeModes,
        authSettings,
        DoctorPrescriptions: prescriptionUpload, // Save the prescription file URL if uploaded
      });

      // Save the doctor record to the database
      const savedDoctor = await newDoctor.save();

      // Respond with the saved doctor data
      res.status(201).json(savedDoctor);
    } catch (error) {
      // Handle any errors
      console.error("Error saving doctor:", error);
      res.status(400).json({ error: error.message });
    }
  },
  // DoctorSDashboard: async (req, res) => {
  //   try {
  //     const doctors = await AddDoctors.find().select(
  //       "personalInfo firstName lastName professionalBackground.specialization professionalBackground.qualification"
  //     );
  //     console.log(doctors);

  //     const doctorDataWithSpecializations = await Promise.all(
  //       doctors.map(async (doctor) => {
  //         const department = await Department.findOne({
  //           _id: doctor.professionalBackground.specialization,
  //         }).select("departmentName");

  //         return {
  //           doctorName: `${doctor.personalInfo.firstName} ${doctor.personalInfo.lastName}`,
  //           qualification: doctor.professionalBackground.qualification,
  //           specialization: department
  //             ? department.departmentName
  //             : "No specialization found",
  //         };
  //       })
  //     );

  //     const groupedBySpecialization = doctorDataWithSpecializations.reduce(
  //       (acc, doctor) => {
  //         const { specialization } = doctor;
  //         if (!acc[specialization]) {
  //           acc[specialization] = [];
  //         }

  //         acc[specialization].push(doctor);

  //         return acc;
  //       },
  //       {}
  //     );

  //     res.status(200).json(groupedBySpecialization);
  //   } catch (error) {
  //     console.error("Error fetching doctors data:", error);
  //     res.status(500).json({ message: "Failed to fetch doctors data" });
  //   }
  // },

  getOverview: async (req, res) => {
    try {
      const aggregation = await AddDoctors.aggregate([
        // Group by specialization and count the occurrences
        {
          $group: {
            _id: "$professionalBackground.specialization",
          },
        },
        {
          $group: {
            _id: null,
            totalSpecializations: { $sum: 1 },
          },
        },
      ]);

      const totalDoctors = await AddDoctors.countDocuments();

      const overview = {
        totalDoctors,
        totalSpecializations: aggregation[0]?.totalSpecializations || 0,
      };

      return res.status(200).json(overview);
    } catch (error) {
      console.error("Error fetching overview data:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  },

  getDoctorsBySpecilizationId: async (req, res) => {
    try {
      const { id } = req.params;

      const doctors = await AddDoctors.find({
        "professionalBackground.specialization": id,
      }).select("_id personalInfo.firstName personalInfo.lastName");

      if (!doctors || doctors.length === 0) {
        return res
          .status(404)
          .json({ message: "No doctors found for this specialization" });
      }

      return res.status(200).json(doctors);
    } catch (error) {
      console.error("Error fetching doctors by specialization ID:", error);

      return res.status(500).json({ message: "Internal server error", error });
    }
  },
  searchDoctorsByName: async (req, res) => {
    try {
      const { name } = req.query;

      const searchFilter = name
        ? {
            $or: [
              { "personalInfo.firstName": { $regex: name, $options: "i" } },
              { "personalInfo.lastName": { $regex: name, $options: "i" } },
            ],
          }
        : {};

      const doctors = await AddDoctors.find(searchFilter).select(
        "personalInfo.firstName personalInfo.lastName personalInfo.image professionalBackground.specialization professionalBackground.qualification"
      );

      if (!doctors || doctors.length === 0) {
        return res.status(404).json({ message: "No doctors found" });
      }

      const specializationIds = [
        ...new Set(
          doctors.map((doctor) => doctor.professionalBackground.specialization)
        ),
      ];

      const departments = await Department.find({
        _id: { $in: specializationIds },
      }).select("_id departmentName");

      const specializationMap = departments.reduce((acc, department) => {
        acc[department._id] = department.departmentName;
        return acc;
      }, {});
      const doctorDataWithSpecializations = doctors.map((doctor) => {
        const specializationId = doctor.professionalBackground.specialization;
        return {
          doctorName: `${doctor.personalInfo.firstName} ${doctor.personalInfo.lastName}`,
          qualification: doctor.professionalBackground.qualification,
          specialization:
            specializationMap[specializationId] || "No specialization found",
          image:
            ` https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${doctor.personalInfo.image}` ||
            "",
        };
      });

      const groupedBySpecialization = doctorDataWithSpecializations.reduce(
        (acc, doctor) => {
          const { specialization } = doctor;
          if (!acc[specialization]) {
            acc[specialization] = [];
          }
          acc[specialization].push(doctor);
          return acc;
        },
        {}
      );
      res.status(200).json(groupedBySpecialization);
    } catch (error) {
      console.error("Error fetching doctors data:", error);
      res.status(500).json({ message: "Failed to fetch doctors data", error });
    }
  },
};

module.exports = AddDoctorsController;
