const express = require("express");
const AddDoctorsControllers = require("../controllers/addDoctorController");
const router = express.Router();
const { verifyTokenAndRefresh } = require("../middlewares/authMiddleware");

// Define the route to add doctors
router.post("/add-doctors", AddDoctorsControllers.addDoctor);
router.get(
  "/getDoctorsBySpecilizationId/:id",
  AddDoctorsControllers.getDoctorsBySpecilizationId
);
router.get("/getOverview", AddDoctorsControllers.getOverview);
router.get(
  "/searchDoctorsByName",
  verifyTokenAndRefresh,
  AddDoctorsControllers.searchDoctorsByName
);

module.exports = router;
