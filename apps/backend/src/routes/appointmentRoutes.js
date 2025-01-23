const express = require("express");
const router = express.Router();
const webAppointmentController = require("../controllers/webAppointment");

router.post("/webappointment", webAppointmentController.createWebAppointment);

module.exports = router;
