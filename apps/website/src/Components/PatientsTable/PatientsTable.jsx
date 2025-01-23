// eslint-disable-next-line no-unused-vars
import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import "./PatientsTable.css"
import { FaEye , FaUser } from "react-icons/fa";
import { BiSolidEditAlt } from "react-icons/bi";

const PatientsTable = () => {
  // Define the appointments array
  const appointments = [
    {
      id: 12,
      name: "Kizzie",
      owner: "Sky B",
      appointmentID: "DRO01-03-23-2024",
      time: "11:30 AM",
      petType: "Dog",
      breed: "Beagle",
      source: "In-Hospital",
      doctor: "Dr. Emily Johnson",
      specialization: "Cardiology",
      status: "In-progress",
      statusColor: "warning",
    },
    {
      id: 14,
      name: "Oscar",
      owner: "Pika K",
      appointmentID: "DRO02-03-23-2024",
      time: "11:45 AM",
      petType: "Cat",
      breed: "Egyptian Mau",
      source: "In-Hospital",
      doctor: "Dr. David Brown",
      specialization: "Gastroenterology",
      status: "Checked-In",
      statusColor: "success",
    },
    {
      id: 15,
      name: "King",
      owner: "Henry C",
      appointmentID: "DRO03-03-23-2024",
      time: "12:00 PM",
      petType: "Horse",
      breed: "Paso Finos",
      source: "App",
      doctor: "Dr. Megan Clark",
      specialization: "Endocrinology",
      status: "Pending",
      statusColor: "primary",
    },
    {
      id: 16,
      name: "Joey",
      owner: "Denny J",
      appointmentID: "DRO04-03-23-2024",
      time: "12:15 PM",
      petType: "Horse",
      breed: "Mustang",
      source: "In-Hospital",
      doctor: "Dr. Sarah Collins",
      specialization: "Dermatology",
      status: "On-hold",
      statusColor: "secondary",
    },
    {
      id: 17,
      name: "Tini",
      owner: "Chris T",
      appointmentID: "DRO05-03-23-2024",
      time: "12:30 PM",
      petType: "Cat",
      breed: "Siamese Cat",
      source: "App",
      doctor: "Dr. James Taylor",
      specialization: "Ophthalmology",
      status: "Checked-In",
      statusColor: "success",
    },
    {
      id: 18,
      name: "Oliver",
      owner: "Alex R",
      appointmentID: "DRO06-03-23-2024",
      time: "12:45 PM",
      petType: "Dog",
      breed: "Dachshund",
      source: "App",
      doctor: "Dr. Henry Wilson",
      specialization: "Surgery",
      status: "Cancelled",
      statusColor: "danger",
    },
  ];

  return (
    <div className="Patients_table">
    
      <Table responsive  className="table_custom">
        <thead>
          <tr>
            <th>Appt #</th>
            <th>Name</th>
            <th>Appointment ID</th>
            <th>Time</th>
            <th>Pet Type</th>
            <th>Appointment Source</th>
            <th>Doctor</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td> <strong>{appointment.id}</strong></td>
              <td> <strong>{appointment.name}</strong> <br /> <small> <FaUser /> ({appointment.owner})</small>
              </td>
              <td> <strong>{appointment.appointmentID}</strong> </td>
              <td><strong>{appointment.time}</strong></td>
              <td> <strong>{appointment.petType}</strong> <br /> <small>({appointment.breed})</small>
              </td>
              <td><strong>{appointment.source}</strong></td>
              <td> <strong>{appointment.doctor}</strong><br /><small>{appointment.specialization}</small>
              </td>
              <td>
                <div className="statusdiv">
                    <span className={`status-indicator bg-${appointment.statusColor}`}></span>
                    <p>{appointment.status}</p>
                </div>
              </td>
              <td>
                <Button  size="sm" className="me-1 btn ">
                    <FaEye />
                </Button>
                <Button  size="sm" className="me-1 btn">
                    <BiSolidEditAlt />
                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientsTable;
