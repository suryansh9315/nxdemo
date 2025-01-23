const express = require("express");
const authController = require("../controllers/authController");
const WebController = require("../controllers/WebController");
const AddDepartmentController = require("../controllers/addDepartmentController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/sendOtp", authController.sendOtp);
router.post("/deleteUser", authController.deleteUser);
router.post("/confirmSignup", authController.confirmSignup);
router.post("/resendConfirmationCode", authController.resendConfirmationCode);
router.post("/register", WebController.Register);
router.post("/signin", WebController.signIn);
router.post("/forgotPassword", WebController.forgotPassword);
router.post("/verifyotp", WebController.verifyOtp);
router.post("/updatepassword", WebController.updatePassword);
router.post("/setupProfile", WebController.setupProfile);
router.get("/getProfile/:id", WebController.getProfile);
router.post("/signOut", WebController.signOut);

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Add Department >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.post("/addDepartment", AddDepartmentController.addDepartment);
router.get("/getAddDepartment", AddDepartmentController.getAddDepartment);

module.exports = router;
