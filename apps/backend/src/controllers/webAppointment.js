const webAppointment = require("../models/WebAppointment");

const webAppointmentController = {
  createWebAppointment: async (req, res) => {
    try {
      const {
        name,
        phone,
        addressline1,
        street,
        city,
        state,
        zipCode,
        petName,
        petAge,
        petType,
        gender,
        breed,
        purposeOfVisit,
        appointmentType,
        appointmentSource,
        department,
        veterinarian,
      } = req.body;

      const response = await webAppointment.create({
        name,
        phone,
        addressline1,
        street,
        city,
        state,
        zipCode,
        petName,
        petAge,
        petType,
        gender,
        breed,
        purposeOfVisit,
        appointmentType,
        appointmentSource,
        department,
        veterinarian,
      });
      if (response) {
        res.status(200).json({ message: "Appointment created successfully" });
      } else {
        console.log("failed ");
        res.status(400).json({ message: "Failed to create Appointment" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = webAppointmentController;
