// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import pet1 from "../../../public/Images/pet1.png"
import pet2 from "../../../public/Images/pet2.png"
import pet3 from "../../../public/Images/pet3.png"

const ActionsTable = ({ appointments = [], actimg1, actimg2 }) => {
  // Fallback data if appointments prop is not provided
  const appointmentsActionList = [
    {
      id: 'DR001-03-23-2024',
      petName: 'Kizie',
      ownerName: 'Sky B',
      petType: 'Dog',
      breed: 'Beagle',
      appointmentDate: '01 Sep 2024',
      appointmentTime: '11:30 AM',
      doctorName: 'Dr. Emily Johnson',
      specialization: 'Cardiology',
      petImage: pet1,
      acceptAction: '#',  
      declineAction: '#sss', 
    },
    {
      id: 'DR002-03-23-2024',
      petName: 'Oscar',
      ownerName: 'Pika K',
      petType: 'Cat',
      breed: 'Egyptian Mau',
      appointmentDate: '01 Sep 2024',
      appointmentTime: '12:00 PM',
      doctorName: 'Dr. David Brown',
      specialization: 'Gastroenterology',
      petImage: pet2,
      acceptAction: '#',  
      declineAction: '#', 
    },
    {
      id: 'DR003-03-23-2024',
      petName: 'King',
      ownerName: 'Henry C',
      petType: 'Horse',
      breed: 'Paso Finos',
      appointmentDate: '01 Sep 2024',
      appointmentTime: '01:00 PM',
      doctorName: 'Dr. Megan Clark',
      specialization: 'Endocrinology',
      petImage: pet3,
      acceptAction: '#',  
      declineAction: '#', 
    },
    {
      id: 'DR004-03-23-2024',
      petName: 'Bella',
      ownerName: 'John D',
      petType: 'Dog',
      breed: 'Golden Retriever',
      appointmentDate: '02 Sep 2024',
      appointmentTime: '09:30 AM',
      doctorName: 'Dr. James White',
      specialization: 'Orthopedics',
      petImage: pet1,
      acceptAction: '#',  
      declineAction: '#', 
    },
    {
      id: 'DR005-03-23-2024',
      petName: 'Lucy',
      ownerName: 'Alice M',
      petType: 'Cat',
      breed: 'Persian',
      appointmentDate: '02 Sep 2024',
      appointmentTime: '10:00 AM',
      doctorName: 'Dr. Sarah Green',
      specialization: 'Dermatology',
      petImage: pet2,
      acceptAction: '#',  
      declineAction: '#', 
    },
    {
      id: 'DR006-03-23-2024',
      petName: 'Max',
      ownerName: 'Bruce W',
      petType: 'Dog',
      breed: 'Bulldog',
      appointmentDate: '02 Sep 2024',
      appointmentTime: '02:00 PM',
      doctorName: 'Dr. Alan Blue',
      specialization: 'Neurology',
      petImage: pet3,
      acceptAction: '#',  
      declineAction: '#', 
    },
    // Add more items as needed
  ];

  // Use the provided `appointments` or fallback to `appointmentsActionList`
  const dataToRender = appointments.length > 0 ? appointments : appointmentsActionList;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Get the current page data
  const currentData = dataToRender.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handlers for pagination
  const handleNext = () => {
    if (currentPage < Math.ceil(dataToRender.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="MainTableDiv">
      <table className="Appointtable">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Appointment ID</th>
            <th scope="col">Pet Type</th>
            <th scope="col">Breed</th>
            <th scope="col">Date</th>
            <th scope="col">Doctor</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((appointment, index) => (
            <tr key={index}>
              <td scope="row">
                <div className="dogimg">
                  <img src={appointment.petImage} alt={appointment.petName} />
                </div>
              </td>
              <td>
                <div className="tblDiv">
                  <h4>{appointment.petName}</h4>
                  <p><i className="ri-user-fill"></i> {appointment.ownerName}</p>
                </div>
              </td>
              <td>{appointment.id}</td>
              <td>{appointment.petType}</td>
              <td>{appointment.breed}</td>
              <td>
                <div className="tblDiv">
                  <h4>{appointment.appointmentDate}</h4>
                  <p>{appointment.appointmentTime}</p>
                </div>
              </td>
              <td>
                <div className="tblDiv">
                  <h4>{appointment.doctorName}</h4>
                  <p>{appointment.specialization}</p>
                </div>
              </td>
              <td>
                <div className="actionDiv">
                  <a href={appointment.acceptAction}><img src={actimg1} alt="Accept" /></a>
                  <a href={appointment.declineAction}><img src={actimg2} alt="Decline" /></a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="PaginationDiv">
        {/* Previous Button */}
        <button 
          onClick={handlePrev} 
          disabled={currentPage === 0} // Disable if we're on the first page
        >
          <i className="ri-arrow-left-line"></i>
        </button>

        {/* Pagination Range */}
        <h6 className="PagiName">
          Responses 
          <span>
            {currentPage * itemsPerPage + 1} -{' '}
            {Math.min((currentPage + 1) * itemsPerPage, dataToRender.length)} 
            {/* You can also show total here like: "of {dataToRender.length}" */}
          </span>
        </h6>

        {/* Next Button */}
        <button 
          onClick={handleNext} 
          disabled={currentPage >= Math.ceil(dataToRender.length / itemsPerPage) - 1} // Disable if on last page
        >
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
};

ActionsTable.propTypes = {
  actimg1: PropTypes.string.isRequired,
  actimg2: PropTypes.string.isRequired,
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      petName: PropTypes.string.isRequired,
      ownerName: PropTypes.string.isRequired,
      petType: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      appointmentDate: PropTypes.string.isRequired,
      appointmentTime: PropTypes.string.isRequired,
      doctorName: PropTypes.string.isRequired,
      specialization: PropTypes.string.isRequired,
      petImage: PropTypes.string.isRequired,
      acceptAction: PropTypes.string.isRequired,
      declineAction: PropTypes.string.isRequired,
    })
  ),
};

export default ActionsTable;
