const appointment = require('../models/appointment');


async function handleAddAppointment(req, res) {
    var fileName = "";
    const { day, month, userId, hospitalId, departmentId, doctorId, time, message,appointmentDate } = req.body;
    
  
    const document = req.file;
    if (document) fileName = document.filename;
  
    const addappointment = await appointment.create({
      userId,
      hospitalId,
      departmentId,
      doctorId,
      dayFor: day,
      timeFor: time,
      monthFor: month,
      appointmentDate: appointmentDate,
      message,
      document: fileName,
    });
  
    if (addappointment) {
      res.status(201).json({
        message: "Appointment Booked successfully",
        appointment: {
          id: addappointment.id,
        }
      });
    }
  }

async function handleGetAppointment(req, res) {
    try {
      const { userId } = req.body;
      const startOfToday = new Date().toISOString().split("T")[0]; 
      const [allAppointments, confirmedAppointments, upcomingAppointments, pastAppointments] = await Promise.all([
        appointment.find({ userId }),
        appointment.find({ userId, appointmentStatus: 1 }),
        appointment.find({ userId, appointmentDate: { $gt: startOfToday } }),
        appointment.find({ userId, appointmentDate: { $lt: startOfToday } })
      ]);
  
      if (allAppointments.length === 0) {
        return res.status(404).json({ message: "No appointments found for this user" });
      }
      res.json({
        allAppointments,
        confirmedAppointments,
        upcomingAppointments,
        pastAppointments
      });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "An error occurred while retrieving appointments" });
    }
  }


async function handleCancelAppointment(req,res) {
    try {
        const updatedAppointmentData = req.body;
        const id = updatedAppointmentData.appointmentId;
        updatedAppointmentData.appointmentStatus = 2;
        const cancelappointmentData = await appointment.findByIdAndUpdate(id,updatedAppointmentData, { new: true });
        if (!cancelappointmentData) {
            return res.status(404).json({ message: "This appointment not found" });
          }
          res.json(cancelappointmentData);
        } catch (error) {
          res.status(500).json({ message: "Error while cancelling appointment", error });
        }   
}


module.exports = {
    handleAddAppointment,
    handleGetAppointment,
    handleCancelAppointment,
}
