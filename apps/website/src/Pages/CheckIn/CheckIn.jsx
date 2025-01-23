// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./CheckIn.css";
import Modal from "react-bootstrap/Modal";
import {
  CiBookmarkCheck,
  CiCircleChevLeft,
  CiCircleChevRight,
} from "react-icons/ci";
import { BoxDiv, DivHeading } from "../Dashboard/page";
import box2 from "../../../public/Images/box2.png";
import box5 from "../../../public/Images/box5.png";
import { Forminput } from "../SignUp/SignUp";
import { Col, Row } from "react-bootstrap";
import DynamicSelect from "../../Components/DynamicSelect/DynamicSelect";
import DynamicDatePicker from "../../Components/DynamicDatePicker/DynamicDatePicker";
import { MainBtn } from "../Appointment/page";
import PatientsTable from "../../Components/PatientsTable/PatientsTable";

function CheckInModal(props) {
  const [activeItems, setActiveItems] = useState({
    petType: "Dog",
    gender: "Female",
    App: "App",
    Time: "10:45 AM",
  });

  const handleClick = (category, value) => {
    setActiveItems((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  // Select options
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  // Select options

  return (
    <div className="CheckInModalSec">
      <Modal
        {...props}
        className="CheckInModal"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <h3>
            <span>Book</span> an Appointment
          </h3>
        </Modal.Header>

        <Modal.Body>
          <div className="CheckInBg">
            <h6>Owner Details</h6>
            <div className="onrdtl">
              <Row>
                <Col md={6}>
                  <Forminput
                    inlabel="Pet Owner’s Name"
                    intype="text"
                    inname="name"
                  />
                </Col>
                <Col md={6}>
                  <Forminput
                    inlabel="Phone number"
                    intype="number"
                    inname="number"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Forminput
                    inlabel="Address Line 1"
                    intype="text"
                    inname="name"
                  />
                </Col>
                <Col md={6}>
                  <Forminput inlabel="Street" intype="text" inname="name" />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Forminput inlabel="City" intype="text" inname="name" />
                </Col>
                <Col md={4}>
                  <Forminput inlabel="State" intype="text" inname="name" />
                </Col>
                <Col md={4}>
                  <Forminput
                    inlabel="ZIP Code"
                    intype="number"
                    inname="number"
                  />
                </Col>
              </Row>
            </div>
          </div>

          <div className="CheckInBg">
            <h6>Pet Details</h6>
            <div className="onrdtl">
              <Row>
                <Col md={6}>
                  <Forminput inlabel="Pet’s Name" intype="text" inname="name" />
                </Col>
                <Col md={6}>
                  <Forminput inlabel="Age" intype="number" inname="number" />
                </Col>
              </Row>
            </div>
            <div className="onrdtltype">
              <div className="PetTypeDiv">
                <p>Pet Type</p>
                <ul className="SelectUl">
                  {["Cat", "Dog", "Horse"].map((pet) => (
                    <li
                      key={pet}
                      className={activeItems.petType === pet ? "active" : ""}
                      onClick={() => handleClick("petType", pet)}
                    >
                      {pet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="PetTypeDiv">
                <p>Gender</p>
                <ul className="SelectUl">
                  {["Male", "Female"].map((gender) => (
                    <li
                      key={gender}
                      className={activeItems.gender === gender ? "active" : ""}
                      onClick={() => handleClick("gender", gender)}
                    >
                      {gender}
                    </li>
                  ))}
                </ul>
              </div>

              <DynamicSelect options={options} placeholder="Breed" />
            </div>
          </div>

          <div className="CheckInBg">
            <h6>Appointment Details</h6>

            <Row>
              <Col md={6}>
                <DynamicSelect
                  options={options}
                  placeholder="Purpose of Visit"
                />
              </Col>
              <Col md={6}>
                <DynamicSelect
                  options={options}
                  placeholder="Appointment Type"
                />
              </Col>
            </Row>

            <div className="PetTypeDiv">
              <p>Appointment Source</p>
              <ul className="SelectUl">
                {["In-Hospital", "App"].map((App) => (
                  <li
                    key={App}
                    className={activeItems.App === App ? "active" : ""}
                    onClick={() => handleClick("App", App)}
                  >
                    {App}
                  </li>
                ))}
              </ul>
            </div>

            <Row>
              <Col md={6}>
                <DynamicSelect options={options} placeholder="Department" />
              </Col>
              <Col md={6}>
                <DynamicSelect
                  options={options}
                  placeholder="Select Veterinarian"
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <DynamicDatePicker placeholder="Select Appointment Date" />
              </Col>
            </Row>

            <div className="PetTypeDiv">
              <p>Appointment Time</p>
              <ul className="SelectUl">
                {[
                  "10:30 AM",
                  "10:45 AM",
                  "11:00 AM",
                  "11:15 AM",
                  "11:30 AM",
                  "11:45 AM",
                  "12:00 PM",
                  "12:15 PM",
                  "12:30 PM",
                  "2:30 PM",
                  "3:15 PM",
                  "3:45 PM",
                  "4:30 PM",
                  "5:15 PM",
                ].map((Time) => (
                  <li
                    key={Time}
                    className={activeItems.Time === Time ? "active" : ""}
                    onClick={() => handleClick("Time", Time)}
                  >
                    {Time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <MainBtn btext="Create Appointment" />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const CheckIn = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <section className="CheckInSec">
        <div className="container">
          <div className="CheckInData">
            <div className="TopCheckIn">
              <div className="CheckInHead">
                <div className="CheckInName">
                  <h2>
                    {" "}
                    <span>Waiting Room</span> Overview
                  </h2>
                </div>
                <div className="CheckInBtn">
                  <div className="Searchbar">
                    <input
                      type="text"
                      id="searchQueryInput"
                      name="searchQueryInput"
                      className="form-control"
                      placeholder="Search by name, ID, phone"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                    <button
                      id="searchQuerySubmit"
                      type="submit"
                      name="searchQuerySubmit"
                    >
                      <i className="ri-search-line"></i>
                    </button>
                  </div>

                  <div className="CheckToken">
                    <button type="submit" onClick={() => setModalShow(true)}>
                      <CiBookmarkCheck /> Book Appointment
                    </button>
                  </div>
                </div>
              </div>
              <div className="CheckInBoxed">
                <h6>Overview</h6>
                <div className="CheckInOverview">
                  <div className="Boxsed">
                    <BoxDiv
                      boximg={box2}
                      ovradcls="purple"
                      ovrtxt="Patients in Waiting Room"
                      boxcoltext="purpletext"
                      overnumb="48"
                    />
                    <BoxDiv
                      boximg={box2}
                      ovradcls=" fawndark"
                      ovrtxt="Tokens Generated Today"
                      boxcoltext="frowntext"
                      overnumb="65"
                    />
                    <BoxDiv
                      boximg={box5}
                      ovradcls=" cambrageblue"
                      ovrtxt="Checked-In Patients"
                      boxcoltext="greentext"
                      overnumb="12"
                    />
                    <BoxDiv
                      boximg={box2}
                      ovradcls="chillibg"
                      ovrtxt="Consultations Completed"
                      boxcoltext="ciltext"
                      overnumb="48"
                    />
                    <BoxDiv
                      boximg={box2}
                      ovradcls="purple"
                      ovrtxt="Cancelled Tokens"
                      boxcoltext="purpletext"
                      overnumb="65"
                    />
                    <BoxDiv
                      boximg={box2}
                      ovradcls=" fawndark"
                      ovrtxt="Doctors On-Duty"
                      boxcoltext="frowntext"
                      overnumb="12"
                    />
                  </div>
                  <div className="CheckInServing">
                    <div className="ServingText">
                      <h6>Now Serving:</h6>
                      <h2>#12</h2>
                    </div>
                    <div className="ServPrevBtn">
                      <a href="#">
                        <CiCircleChevLeft /> Previous
                      </a>
                      <a href="#" className="active">
                        Next Token <CiCircleChevRight />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="BottomCheckIn">
              <DivHeading TableHead="Patients in Queue" tablespan="(48)" />
              <PatientsTable />
            </div>
          </div>
        </div>
      </section>

      <CheckInModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default CheckIn;
