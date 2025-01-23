// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import "./DocterWiseAppoint.css";
import PropTypes from 'prop-types'; 
import { MdAttachMoney } from "react-icons/md";
import doct1 from "../../../public/Images/doct1.png"
import doct2 from "../../../public/Images/doct2.png"
import doct3 from "../../../public/Images/doct3.png"
import doct4 from "../../../public/Images/doct4.png"


const DocterWiseAppoint = ({ DoctWiseTable = [] }) => {

    // Dropdown options
  const options = ['Select Doctor', 'Dr. Laura Evans', 'Dr. Emily Foster', 'Dr. Robert Anderson', 'Dr. James Wilson'];

  // Fallback data if appointments prop is not provided
  const DocterWiseAppointList = [
    {
        DoctImage: doct1,
        DoctName: 'Dr. Laura Evans',
        PostName:"Cardiology",
        Apointid:"24",
        Asistid:"12",
        Renenu:"453",
      },
    {
        DoctImage: doct2,
        DoctName: 'Dr. Emily Foster',
        PostName:"Dermatology",
        Apointid:"28",
        Asistid:"8",
        Renenu:"671",
      },
    {
        DoctImage: doct3,
        DoctName: 'Dr. Robert Anderson',
        PostName:"Oncology",
        Apointid:"38",
        Asistid:"18",
        Renenu:"908",
      },
    {
        DoctImage: doct4,
        DoctName: 'Dr. James Wilson',
        PostName:"Critical Care",
        Apointid:"8",
        Asistid:"14",
        Renenu:"327",
      },
    {
        DoctImage: doct1,
        DoctName: 'Dr. Laura Evans',
        PostName:"Cardiology",
        Apointid:"24",
        Asistid:"12",
        Renenu:"453",
      },
    {
        DoctImage: doct2,
        DoctName: 'Dr. Emily Foster',
        PostName:"Dermatology",
        Apointid:"28",
        Asistid:"8",
        Renenu:"671",
      },
    {
        DoctImage: doct3,
        DoctName: 'Dr. Robert Anderson',
        PostName:"Oncology",
        Apointid:"38",
        Asistid:"18",
        Renenu:"908",
      },
    {
        DoctImage: doct4,
        DoctName: 'Dr. James Wilson',
        PostName:"Critical Care",
        Apointid:"8",
        Asistid:"14",
        Renenu:"327",
    }
    
    ];

  // Use the provided `appointments` or fallback to `DocterWiseAppointList`
  const dataToRender = DoctWiseTable.length > 0 ? DoctWiseTable : DocterWiseAppointList;

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
    <>

    <div className="WiseHeadDiv">
        <h4>Doctor-wise appointments</h4>
        <div className="DoctWiseSeclt">

            <select className="form-select" aria-label="Default select example">
                {options.map((option, index) => (
                <option key={index} value={index}>{option}</option>
                ))}
            </select>

            <select className="form-select" aria-label="Default select example">
                {options.map((option, index) => (
                <option key={index} value={index}>{option}</option>
                ))}
            </select>


        </div>
    </div>

    <div className="MainTableDiv">
      <table className="DoctWiseableDiv">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Doctor</th>
            <th scope="col">Appointments</th>
            <th scope="col">Assessments</th>
            <th scope="col">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((DoctWiseTable, index) => (
            <tr key={index}>
              <td scope="row">
                <div className="dogimg">
                  <img src={DoctWiseTable.DoctImage} alt={DoctWiseTable.DoctName} />
                </div>
              </td>
              <td>
                <div className="TBLDIV">
                  <h4>{DoctWiseTable.DoctName}</h4>
                  <p>{DoctWiseTable.PostName}</p>
                </div>
              </td>
              <td>{DoctWiseTable.Apointid}</td>
              <td>{DoctWiseTable.Asistid}</td>
              <td><span><MdAttachMoney /></span>{DoctWiseTable.Renenu}</td>
              
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

    </>
  );
};

DocterWiseAppoint.propTypes = {
    DoctWiseTable: PropTypes.arrayOf(
    PropTypes.shape({
        DoctImage: PropTypes.string.isRequired,
        DoctName: PropTypes.string.isRequired,
        PostName: PropTypes.string.isRequired,
        Apointid: PropTypes.string.isRequired,
        Asistid: PropTypes.string.isRequired,
        Renenu: PropTypes.string.isRequired
    })
  ),
};

export default DocterWiseAppoint;
