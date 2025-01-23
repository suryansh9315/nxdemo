const mongoose = require("mongoose");
const appointmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  addressline1: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  petName: {
    type: String,
    required: true,
  },
  petAge: {
    type: String,
    required: true,
  },
  petType: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  breed: {
    type: String,
  },
  purposeOfVisit: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: String,
    required: true,
  },
  appointmentSource: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  veterinarian: {
    type: String,
    required: true,
  },
});
const webAppointments = mongoose.model("webAppointment", appointmentSchema);
module.exports = webAppointments;
