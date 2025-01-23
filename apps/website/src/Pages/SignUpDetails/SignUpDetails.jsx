import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is installed
import "./SignUpDetails.css";
import { Forminput, HeadText } from "../SignUp/SignUp";
import UplodeImage from "../../Components/UplodeImage/UplodeImage";
import { MainBtn } from "../Appointment/page";
import PropTypes from "prop-types";
import camera from "../../../public/Images/camera.png";
import whtcheck from "../../../public/Images/whtcheck.png";
import comp from "../../../public/Images/comp.png";
import host1 from "../../../public/Images/host1.png";
import host2 from "../../../public/Images/host2.png";
import whtcloud from "../../../public/Images/whtcloud.png";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignUpDetails = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preImage, setPreImage] = useState(null);
  const [formData, setFormData] = useState({
    businessName: "",
    registrationNumber: "",
    yearOfEstablishment: "",
    phoneNumber: "",
    website: "",
    addressLine1: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  console.log(formData);
  console.log(image);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log("selectedFile", selectedFile);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };
  // // checkbox
  // const [services, setServices] = useState({
  //   emergencyServices: "Yes",
  //   cashlessFacility: "No",
  //   services24x7: "Yes",
  // });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setServices((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // DropeDown Services

  const servicesList = [
    { id: 1, name: "24/7 Emergency Care" },
    { id: 2, name: "Surgery and Operating Rooms" },
    { id: 3, name: "Veterinary ICU" },
    { id: 4, name: "Dental Care Services" },
    { id: 5, name: "Behavioral Therapy" },
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  console.log(selectedServices);

  const [activeModes, setActiveModes] = useState("yes");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleSelectService = (value) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((serviceId) => serviceId !== value)
        : [...prevSelected, value]
    );
  };
  const filteredServices = servicesList.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModeClick = (mode) => {
    if (activeModes.includes("yes") && activeModes.includes("no")) {
      setActiveModes(mode);
    } else {
      setActiveModes(mode);
    }
  };

  // API Submission

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    // Append file inputs
    if (image) formDataToSend.append("logo", image); // Assuming 'image' is the file for the logo
    if (selectedFile)
      formDataToSend.append("prescription_upload", selectedFile); // File for prescription

    // Append other fields from formData state
    formDataToSend.append("userId", userId);
    formDataToSend.append("businessName", formData.businessName);
    formDataToSend.append("registrationNumber", formData.registrationNumber);
    formDataToSend.append("yearOfEstablishment", formData.yearOfEstablishment);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("addressLine1", formData.addressLine1);
    formDataToSend.append("street", formData.street);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("zipCode", formData.zipCode);

    selectedServices.forEach((service) => {
      formDataToSend.append("selectedServices", service); // Notice the use of [] to indicate it's an array
    });
    formDataToSend.append("activeModes", activeModes);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/auth/setupProfile`,
        formDataToSend
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Form submitted successfully!",
          text: "Your profile has been set up successfully.",
        });
        setSelectedServices(null);
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to submit form!",
          text: "There was an issue while submitting the form. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while submitting the form.",
      });
    }
  };

  const getProfiledata = async () => {
    console.log("hello");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/auth/getProfile/${userId}`
      );

      if (response.data) {
        console.log("response", response.data);

        const {
          businessName,
          registrationNumber,
          yearOfEstablishment,
          phoneNumber,
          website,
          activeModes,
          address,
          selectedServices,
          logoUrl,
          prescriptionUploadUrl,
        } = response.data;

        setFormData({
          businessName,
          registrationNumber,
          yearOfEstablishment,
          phoneNumber,
          website,
          addressLine1: address?.addressLine1 || "",
          street: address?.street || "",
          city: address?.city || "",
          state: address?.state || "",
          zipCode: address?.zipCode || "",
        });

        setSelectedServices(selectedServices || []);
        setImage(logoUrl || null);
        setSelectedFile(prescriptionUploadUrl || null);
        setActiveModes(activeModes || "");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      Swal.fire({
        icon: "error",
        title: "Error fetching profile data",
        text: "There was an issue fetching your profile data. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (userId) {
      getProfiledata();
    }
  }, [userId]);

  return (
    <>
      <section className="SignDetailsSec">
        <div className="container">
          <div className="mb-3">
            <HeadText Spntext="Set up" blktext="your profile " />
          </div>
          <div className="Sign_Details_Data">
            <div className="LeftProfile">
              <div className="ProfileDiv">
                <form onSubmit={handleSubmit}>
                  <div className="add-logo-container">
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="logo-upload" className="upload-label">
                      {preImage || image ? (
                        <img
                          src={preImage || image} // This will use preImage if available, otherwise image
                          alt="Preview"
                          className="preview-image"
                        />
                      ) : (
                        <div className="upload-placeholder">
                          <img src={camera} alt="camera" className="icon" />
                        </div>
                      )}
                    </label>
                    <h5>Add Logo</h5>
                  </div>

                  <div className="DetailInput">
                    <Forminput
                      inlabel="Business Name"
                      intype="text"
                      inname="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                    />
                    <div className="row">
                      <div className="col-md-6">
                        <Forminput
                          inlabel="Registration Number"
                          intype="number"
                          inname="registrationNumber"
                          value={formData.registrationNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <Forminput
                          inlabel="Year of Establishment"
                          intype="number"
                          inname="yearOfEstablishment"
                          value={formData.yearOfEstablishment}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <Forminput
                          inlabel="Phone Number"
                          intype="number"
                          inname="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-9">
                        <Forminput
                          inlabel="Website"
                          intype="text"
                          inname="website"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <h6>Address</h6>
                    <Forminput
                      inlabel="Address Line 1"
                      intype="text"
                      inname="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                    />
                    <div className="row">
                      <div className="col-md-6">
                        <Forminput
                          inlabel="Street"
                          intype="text"
                          inname="street"
                          value={formData.street}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <Forminput
                          inlabel="City"
                          intype="text"
                          inname="city"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Forminput
                          inlabel="State"
                          intype="text"
                          inname="state"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <Forminput
                          inlabel="ZIP Code"
                          intype="number"
                          inname="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* <div className="service-options-container">
                      <div className="service-group">
                        <label className="service-label">
                          Emergency Services
                        </label>
                        <input
                          type="radio"
                          name="emergencyServices"
                          value="Yes"
                          checked={services.emergencyServices === "Yes"}
                          onChange={handleChange}
                          id="emergency-yes"
                        />
                        <label htmlFor="emergency-yes" className="radio-label">
                          Yes
                        </label>
                        <input
                          type="radio"
                          name="emergencyServices"
                          value="No"
                          checked={services.emergencyServices === "No"}
                          onChange={handleChange}
                          id="emergency-no"
                        />
                        <label htmlFor="emergency-no" className="radio-label">
                          No
                        </label>
                      </div>

                      <div className="service-group">
                        <label className="service-label">
                          Cashless Facility
                        </label>
                        <input
                          type="radio"
                          name="cashlessFacility"
                          value="Yes"
                          checked={services.cashlessFacility === "Yes"}
                          onChange={handleChange}
                          id="cashless-yes"
                        />
                        <label htmlFor="cashless-yes" className="radio-label">
                          Yes
                        </label>
                        <input
                          type="radio"
                          name="cashlessFacility"
                          value="No"
                          checked={services.cashlessFacility === "No"}
                          onChange={handleChange}
                          id="cashless-no"
                        />
                        <label htmlFor="cashless-no" className="radio-label">
                          No
                        </label>
                      </div>

                      <div className="service-group">
                        <label className="service-label">24/7 Services</label>
                        <input
                          type="radio"
                          name="services24x7"
                          value="Yes"
                          checked={services.services24x7 === "Yes"}
                          onChange={handleChange}
                          id="services-yes"
                        />
                        <label htmlFor="services-yes" className="radio-label">
                          Yes
                        </label>
                        <input
                          type="radio"
                          name="services24x7"
                          value="No"
                          checked={services.services24x7 === "No"}
                          onChange={handleChange}
                          id="services-no"
                        />
                        <label htmlFor="services-no" className="radio-label">
                          No
                        </label>
                      </div>
                    </div> */}
                  </div>

                  <div className="sddsd">
                    <h6>Does your business have specialized departments?</h6>
                    <div className="ConstModeUl">
                      <ul>
                        <li
                          className={activeModes === "yes" ? "active" : ""}
                          onClick={() => handleModeClick("yes")}
                        >
                          Yes
                        </li>
                        <li
                          className={activeModes === "no" ? "active" : ""}
                          onClick={() => handleModeClick("no")}
                        >
                          No
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="services_dropdown">
                    <div
                      className={`ServHeadr ${isDropdownOpen ? "open" : ""}`}
                      onClick={toggleDropdown}
                    >
                      <span>Add Services</span>
                      <span className="arrow">
                        {isDropdownOpen ? "▲" : "▼"}
                      </span>
                    </div>
                    {isDropdownOpen && (
                      <div className="ServDropcontent">
                        <div className="serchbtn">
                          <i className="ri-search-line"></i>
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                          />
                        </div>
                        <ul className="services-list">
                          {filteredServices.map((service) => (
                            <li
                              key={service.id}
                              className={`service-item ${
                                selectedServices.includes(service.id)
                                  ? "selected"
                                  : ""
                              }`}
                            >
                              <label>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={selectedServices.includes(
                                    service.name
                                  )}
                                  onChange={() =>
                                    handleSelectService(service.name)
                                  }
                                />
                                <p>{service.name}</p>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <UplodeImage
                    selectedFile={selectedFile}
                    onFileChange={handleFileChange}
                  />

                  {selectedFile && (
                    <div>
                      {typeof selectedFile === "object" &&
                      selectedFile instanceof Blob ? (
                        <>
                          <h3>Selected File:</h3>
                          <p>File Name: {selectedFile.name}</p>
                          <p>File Type: {selectedFile.type}</p>
                          <p>File Size: {selectedFile.size} bytes</p>
                        </>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  )}

                  <MainBtn
                    bimg={whtcheck}
                    btext="Submit"
                    optclas=""
                    mdtarget="#ProfModal"
                    btntyp="submit"
                    // onClick={() => handleSubmit()}
                  />
                  {/* <ProfileModal /> */}
                </form>
              </div>
            </div>
            <div className="rightProfile">
              <ProfileProg blname="Profile" spname="Progress" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpDetails;

ProfileProg.propTypes = {
  blname: PropTypes.string.isRequired,
  spname: PropTypes.string.isRequired,
};
export function ProfileProg({ blname, spname }) {
  return (
    <div className="profProgressDiv">
      <div className="Prof">
        <div className="profileText">
          <h4>
            {blname} <span> {spname}</span>
          </h4>
        </div>
        <div className="ProgDiv">
          <div className="progress-bar">
            <span className="progress-fill" style={{ width: "48%" }}></span>
          </div>
          <p className="progress-text">
            48% <span>Complete</span>
          </p>
        </div>
      </div>
      <div className="Profcomp">
        <button className="complete-button">
          {" "}
          <img src={comp} alt="" /> Complete Later{" "}
        </button>
      </div>
    </div>
  );
}

export function ProfileModal() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="ProfileDetailModal">
      <div
        className="modal fade"
        id="ProfModal"
        tabIndex="-1"
        aria-labelledby="DashModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="Profile-content">
              <div className="modltoptext">
                <h3>Would You Like to Host Your PIMS?</h3>
                <p>Choose your hosting preference to get started.</p>
              </div>

              <div className="hosting-options">
                <div
                  className={`option-card ${
                    selectedOption === "cloud" ? "active" : ""
                  }`}
                  onClick={() => handleSelect("cloud")}
                >
                  <img src={host1} alt="Cloud Hosting" />
                  <h5>Cloud Hosting</h5>
                  <p>
                    Enjoy secure, hassle-free hosting on our cloud with
                    automatic updates, backups, and 24/7 support.
                  </p>
                </div>

                <div
                  className={`option-card ${
                    selectedOption === "self" ? "active" : ""
                  }`}
                  onClick={() => handleSelect("self")}
                >
                  <img src={host2} alt="Self Hosting" />
                  <h5>Self-Hosting</h5>
                  <p>
                    Host on your own infrastructure for complete control and
                    customization. We&apos;ll provide setup support.
                  </p>
                </div>
              </div>

              <div className="profmdbtn">
                <MainBtn
                  bimg={whtcloud}
                  btext="Choose Cloud Hosting"
                  optclas=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
