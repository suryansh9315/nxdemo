// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./Add_Vet.css";
import { Forminput, FormPassw, HeadText } from "../SignUp/SignUp";
import camera from "../../../public/Images/camera.png";
import { ProfileProg } from "../SignUpDetails/SignUpDetails";
import { Col, Form, Row } from "react-bootstrap";
import UplodeImage from "../../Components/UplodeImage/UplodeImage";
import DynamicSelect from "../../Components/DynamicSelect/DynamicSelect";
import OperatingHours from "../../Components/OperatingHours/OperatingHours";
import { Modal, Button } from "react-bootstrap";
import Switch from "react-switch";
import { MainBtn } from "../Appointment/page";
import whtcheck from "../../../public/Images/whtcheck.png";
import { MdOpacity } from "react-icons/md";
import axios from "axios";
import DynamicDatePicker from "../../Components/DynamicDatePicker/DynamicDatePicker";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Add_Vet = () => {
  const navigate = useNavigate();
  const [OperatingHour, setOperatingHours] = useState([]);
  const [PersonalInfoForm, setPersonalInfoForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });
  console.log("PersonalInfoForm.dateOfBirth", PersonalInfoForm.dateOfBirth);

  const [ResidentialAddressForm, setResidentialAddressForm] = useState({
    addressLine1: "",
    city: "",
    stateProvince: "",
    country: "",
    zipCode: "",
  });
  const [professionalBackground, setProfessionalBackground] = useState({
    specialization: "",
    qualification: "",
    medicalLicenseNumber: "",
    yearsOfExperience: "",
    languagesSpoken: "",
    biography: "",
    image: "",
  });
  console.log(professionalBackground.specialization);

  const [selectedFile, setSelectedFile] = useState(null);
  const [consultFee, setConsultFee] = useState("");
  const [CreateLogin, setCreateLogin] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [authSettings, setAuthSettings] = useState({
    takeAssessments: false,
    appointments: false,
    viewMedicalRecords: false,
    prescribeMedications: false,
  });
  const [options, setOptions] = useState([]);
  console.log("options", options);

  const handleDateChange = (date) => {
    setPersonalInfoForm((pre) => ({
      ...pre,
      dateOfBirth: date,
    })); // Update the parent state with the selected date
  };

  const getSpecilization = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/auth/getAddDepartment`
      );
      const departmentOptions = response.data.map((department) => ({
        value: department._id,
        label: department.departmentName,
      }));
      setOptions(departmentOptions);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };
  useEffect(() => {
    getSpecilization();
  }, []);

  const handleprofessionalBackground = (e) => {
    const { name, value } = e.target;
    setProfessionalBackground((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSpecializationChange = (selectedValue) => {
    setProfessionalBackground((prevState) => ({
      ...prevState,
      specialization: selectedValue,
    }));
  };

  // Handle residential address input change
  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setResidentialAddressForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle personal information form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfoForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle personal info click action
  const handleClick = (field, value) => {
    setPersonalInfoForm((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Profile image upload handler
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Toggle handlers
  const [isToggled, setIsToggled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = (checked) => {
    setIsToggled(checked);
    if (checked) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Operating hours handler
  const handleSaveOperatingHours = (updatedHours) => {
    setOperatingHours(updatedHours);
    console.log("Received operating hours:", updatedHours);
  };

  // Consultation mode handling
  const [activeModes, setActiveModes] = useState(["In-person"]);
  const handleModeClick = (mode) => {
    if (mode === "Both") {
      setActiveModes(["In-person", "Online"]);
    } else if (
      activeModes.includes("In-person") &&
      activeModes.includes("Online")
    ) {
      setActiveModes([mode]);
    } else {
      setActiveModes([mode]);
    }
  };

  const handleFeeChange = (e) => {
    setConsultFee(e.target.value);
  };

  const [error, setError] = useState(""); // For validation errors

  // Create login handler
  const handleCreateLogin = (e) => {
    const { name, value } = e.target;
    setCreateLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle switch toggle changes for authorization settings
  const handleSwitchChange = (e) => {
    const { id, checked } = e.target;
    setAuthSettings((prevSettings) => ({
      ...prevSettings,
      [id]: checked,
    }));
  };

  // Select options

  const HandleSubmit = async () => {
    // 1. Validate input data
    if (
      !PersonalInfoForm.firstName ||
      !PersonalInfoForm.lastName ||
      !PersonalInfoForm.email ||
      !PersonalInfoForm.phone
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all required personal information fields.",
      });
      return;
    }

    if (CreateLogin.password !== CreateLogin.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
      return;
    }

    if (!CreateLogin.username) {
      Swal.fire({
        icon: "error",
        title: "Username Required",
        text: "Please provide a username.",
      });
      return;
    }

    // Create FormData to send data, including files
    const formData = new FormData();

    // Append files to FormData
    if (selectedFile) {
      formData.append("DoctorPrescriptions", selectedFile); // File data
    }
    if (image) {
      formData.append("image", image); // Image file
    }

    // Append regular (non-file) data as a JSON string inside FormData
    formData.append(
      "formData",
      JSON.stringify({
        personalInfo: PersonalInfoForm,
        residentialAddress: ResidentialAddressForm,
        professionalBackground: professionalBackground,
        availability: OperatingHour,
        activeModes: activeModes,
        consultFee: consultFee,
        loginCredentials: CreateLogin,
        authSettings: authSettings,
      })
    );

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/doctors/add-doctors`,
        {
          method: "POST",
          body: formData, // Send FormData with both files and regular data
        }
      );

      if (response.ok) {
        // Success Alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Form submitted successfully!",
        });
        navigate("/addoctor");
        // Reset forms and other states
        // setPersonalInfoForm({
        //   firstName: "",
        //   lastName: "",
        //   gender: "",
        //   email: "",
        //   phone: "",
        //   image: "",
        // });
        // setResidentialAddressForm({
        //   addressLine1: "",
        //   city: "",
        //   stateProvince: "",
        //   country: "",
        //   zipCode: "",
        // });
        // setProfessionalBackground({
        //   specialization: "",
        //   qualification: "",
        //   medicalLicenseNumber: "",
        //   yearsOfExperience: "",
        //   languagesSpoken: "",
        //   biography: "",
        //   image: "",
        // });
        // setCreateLogin({
        //   username: "",
        //   password: "",
        //   confirmPassword: "",
        // });
        // setAuthSettings({
        //   takeAssessments: false,
        //   appointments: false,
        //   viewMedicalRecords: false,
        //   prescribeMedications: false,
        // });
      } else {
        const errorData = await response.json();

        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text:
            errorData.message ||
            "An error occurred while submitting the form. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit the form. Please try again later.",
      });
      console.error("Submission Error:", error);
    }
  };

  return (
    <>
      <section className="ProfileSec">
        <div className="container">
          <div className="mb-3">
            <HeadText Spntext="Add" blktext="a vet " />
          </div>

          <div className="Add_Profile_Data">
            <div className="LeftProfileDiv">
              <Form>
                <div className="PersonlInfoDiv">
                  <div className="perInfo">
                    <h6>Personal Information</h6>
                    <div className="add-logo-container">
                      <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="logo-upload" className="upload-label">
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="preview-image"
                          />
                        ) : (
                          <div className="upload-placeholder">
                            <img src={camera} alt="camera" className="icon" />
                          </div>
                        )}
                      </label>
                      <h5>Add Profile Picture</h5>
                    </div>
                  </div>
                  <Row>
                    <Col md={6}>
                      <Forminput
                        inlabel="First Name"
                        intype="text"
                        inname="firstName"
                        value={PersonalInfoForm.firstName}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col md={6}>
                      <Forminput
                        inlabel="Last Name"
                        intype="text"
                        inname="lastName"
                        value={PersonalInfoForm.lastName}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <div className="DoctGendr">
                        <p>Gender</p>
                        <ul className="SelectUl">
                          {["Male", "Female", "Other"].map((gender) => (
                            <li
                              key={gender}
                              className={
                                PersonalInfoForm.gender === gender
                                  ? "active"
                                  : ""
                              }
                              onClick={() => handleClick("gender", gender)}
                            >
                              {gender}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                    <Col md={6}>
                      <DynamicDatePicker
                        onDateChange={handleDateChange} // Pass the handler function
                        placeholder="Date of Birth"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Forminput
                        inlabel="Email Address"
                        intype="email"
                        inname="email"
                        value={PersonalInfoForm.email}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Forminput
                        inlabel="First Name"
                        intype="text"
                        inname="name"
                      />
                    </Col>
                    <Col md={9}>
                      <Forminput
                        inlabel="Phone Number"
                        intype="number"
                        inname="phone"
                        value={PersonalInfoForm.phone}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                </div>

                <div className="doctadressdiv">
                  <h6>Residential Address</h6>
                  <Row>
                    <Col md={12}>
                      <Forminput
                        inlabel="Address Line 1"
                        intype="text"
                        inname="addressLine1"
                        value={ResidentialAddressForm.addressLine1}
                        onChange={handleAddressInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Forminput
                        inlabel="City"
                        intype="text"
                        inname="city"
                        value={ResidentialAddressForm.city}
                        onChange={handleAddressInputChange}
                      />
                    </Col>
                    <Col md={6}>
                      <Forminput
                        inlabel="State / Province"
                        intype="text"
                        inname="stateProvince"
                        value={ResidentialAddressForm.stateProvince}
                        onChange={handleAddressInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Forminput
                        inlabel="Country"
                        intype="text"
                        inname="country"
                        value={ResidentialAddressForm.country}
                        onChange={handleAddressInputChange}
                      />
                    </Col>
                    <Col md={6}>
                      <Forminput
                        inlabel="ZIP Code"
                        intype="number"
                        inname="zipCode"
                        value={ResidentialAddressForm.zipCode}
                        onChange={handleAddressInputChange}
                      />
                    </Col>
                  </Row>
                </div>

                <div className="ProfBackDiv">
                  <h6>Professional Background</h6>

                  <Row>
                    <Col md={12}>
                      <DynamicSelect
                        options={options} // Pass options here
                        placeholder="Specialization" // Placeholder text
                        value={professionalBackground.specialization} // Use just the value
                        onChange={(selectedValue) =>
                          handleSpecializationChange(selectedValue)
                        } // Handle selection change
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Forminput
                        inlabel="Qualification (MBBS, MD, etc.)"
                        intype="text"
                        inname="qualification"
                        value={professionalBackground.qualification}
                        onChange={handleprofessionalBackground}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Forminput
                        inlabel="Medical License Number"
                        intype="number"
                        inname="medicalLicenseNumber"
                        value={professionalBackground.medicalLicenseNumber}
                        onChange={handleprofessionalBackground}
                      />
                    </Col>
                    <Col md={6}>
                      <Forminput
                        inlabel="Years of Experience"
                        intype="number"
                        inname="yearsOfExperience"
                        value={professionalBackground.yearsOfExperience}
                        onChange={handleprofessionalBackground}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <Forminput
                        inlabel="Languages spoken"
                        intype="text"
                        inname="languagesSpoken"
                        value={professionalBackground.languagesSpoken}
                        onChange={handleprofessionalBackground}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className="form-floating  mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Biography/Short Description"
                          id="floatingTextarea2"
                          value={professionalBackground.biography}
                          onChange={(e) =>
                            setProfessionalBackground({
                              ...professionalBackground,
                              biography: e.target.value,
                            })
                          }
                        ></textarea>
                        <label htmlFor="floatingTextarea2">
                          Biography/Short Description
                        </label>
                      </div>
                    </Col>
                  </Row>

                  <UplodeImage onFileChange={handleFileChange} />

                  {selectedFile && (
                    <div>
                      <h3>Selected File:</h3>
                      <p>File Name: {selectedFile.name}</p>
                      <p>File Type: {selectedFile.type}</p>
                      <p>File Size: {selectedFile.size} bytes</p>
                    </div>
                  )}
                </div>

                <div className="abilityDiv">
                  <OperatingHours
                    onSave={handleSaveOperatingHours}
                    Optrtname="Availability"
                  />

                  <div className="SynclndrDiv">
                    <p>Sync with Calendar</p>
                    <div className="text-center ">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <span>{isToggled ? "On" : "Off"}</span>
                        <Switch
                          checked={isToggled}
                          onChange={handleToggle}
                          onColor="#86d3ff"
                          onHandleColor="#2693e6"
                          handleDiameter={20}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                          height={20}
                          width={48}
                        />
                      </div>

                      {/* Modal */}
                      <Modal show={isModalOpen} onHide={closeModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Toggle is On</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>
                            The toggle is turned on. You can add more content
                            here.
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={closeModal}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>

                  <div className="ConsultationModeDiv">
                    <p>Consultation Mode</p>
                    <div className="ConstModeUl">
                      <ul>
                        <li
                          className={
                            activeModes.includes("In-person") ? "active" : ""
                          }
                          onClick={() => handleModeClick("In-person")}
                        >
                          In-person
                        </li>
                        <li
                          className={
                            activeModes.includes("Online") ? "active" : ""
                          }
                          onClick={() => handleModeClick("Online")}
                        >
                          Online
                        </li>
                        <li
                          className={
                            activeModes.includes("In-person") &&
                            activeModes.includes("Online")
                              ? "active"
                              : ""
                          }
                          onClick={() => handleModeClick("Both")}
                        >
                          Both
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Row>
                    <Col md={6}>
                      <div className="ConsultFee">
                        <p>Consultation Fee</p>
                        <Forminput
                          inlabel="$ Fee"
                          intype="number"
                          inname="number"
                          value={consultFee}
                          onChange={handleFeeChange}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="crtlogn">
                  <h6>Create Login</h6>

                  {/* Form for username */}
                  <Forminput
                    inlabel="Choose username"
                    intype="text"
                    inname="username"
                    value={CreateLogin.username}
                    onChange={handleCreateLogin}
                  />

                  {/* Form for password */}
                  <FormPassw
                    paswlabel="Password"
                    intype="password"
                    inname="password"
                    value={CreateLogin.password}
                    onChange={handleCreateLogin}
                  />

                  <FormPassw
                    paswlabel="Confirm Password"
                    intype="password"
                    inname="confirmPassword"
                    value={CreateLogin.confirmPassword}
                    onChange={handleCreateLogin}
                  />

                  {/* Display error message */}
                  {error && <p className="error-message">{error}</p>}
                </div>

                <div className="AuthrizDiv">
                  <h6>Authorization Settings</h6>
                  <div className="AuthrzData">
                    {/* Take Assessments */}
                    <div className="Authitems">
                      <div className="lftauth">
                        <h6>Take Assessments</h6>
                        <p>Allow this vet to conduct assessments for pets.</p>
                      </div>
                      <div className="Ryttauth">
                        <p>On</p>
                        <Form.Check
                          type="switch"
                          id="takeAssessments"
                          checked={authSettings.takeAssessments}
                          onChange={handleSwitchChange}
                        />
                        <p>Off</p>
                      </div>
                    </div>

                    {/* Appointments (Chat or In-Person) */}
                    <div className="Authitems">
                      <div className="lftauth">
                        <h6>Appointments (Chat or In-Person)</h6>
                        <p>
                          Authorize this vet to handle chat or in-person
                          appointments.
                        </p>
                      </div>
                      <div className="Ryttauth">
                        <p>On</p>
                        <Form.Check
                          type="switch"
                          id="appointments"
                          checked={authSettings.appointments}
                          onChange={handleSwitchChange}
                        />
                        <p>Off</p>
                      </div>
                    </div>

                    {/* View Medical Records */}
                    <div className="Authitems">
                      <div className="lftauth">
                        <h6>View Medical Records</h6>
                        <p>
                          Grant access to the pet’s medical history and records.
                        </p>
                      </div>
                      <div className="Ryttauth">
                        <p>On</p>
                        <Form.Check
                          type="switch"
                          id="viewMedicalRecords"
                          checked={authSettings.viewMedicalRecords}
                          onChange={handleSwitchChange}
                        />
                        <p>Off</p>
                      </div>
                    </div>

                    {/* Prescribe Medications */}
                    <div className="Authitems">
                      <div className="lftauth">
                        <h6>Prescribe Medications</h6>
                        <p>
                          Allow the vet to issue prescriptions for treatments.
                        </p>
                      </div>
                      <div className="Ryttauth">
                        <p>On</p>
                        <Form.Check
                          type="switch"
                          id="prescribeMedications"
                          checked={authSettings.prescribeMedications}
                          onChange={handleSwitchChange}
                        />
                        <p>Off</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Sign_check">
                  <input
                    type="checkbox"
                    className="check-input"
                    id="exampleCheck1"
                    required
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    I agree to Yosemite Crew’s <span>Terms and Conditions</span>{" "}
                    and <span>Privacy Policy</span>
                  </label>
                </div>

                <MainBtn
                  btntyp="button"
                  bimg={whtcheck}
                  btext="Add Vet"
                  optclas="opt5"
                  onClick={() => {
                    HandleSubmit();
                  }}
                />
              </Form>
            </div>

            <div className="RytProfileDiv">
              <ProfileProg blname="Profile" spname="Progress" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Add_Vet;
