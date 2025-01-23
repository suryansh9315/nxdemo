// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import "./Clinic_visiblity.css"
import { HeadText } from '../SignUp/SignUp'
import { MainBtn } from '../Appointment/page'
import whtcheck from "../../../public/Images/whtcheck.png"
import pft from "../../../public/Images/pft.png"
import Gallery from '../../Components/Gallery/Gallery'

const Clinic_visiblity = () => {

    // Services state and logic
    const [services, setServices] = useState([
        { name: '24/7 Emergency Care', checked: true },
        { name: 'Surgery and Operating Rooms', checked: true },
        { name: 'Veterinary ICUs', checked: false },
        { name: 'Diagnostic Imaging (X-ray, Ultrasound)', checked: true },
        { name: 'In-House Laboratory', checked: false },
        { name: 'Dental Clinic', checked: true },
        { name: 'Pain Management', checked: false },
        { name: 'Specialist Consultations', checked: true },
        { name: 'Nutritional Counseling', checked: false }
    ]);

    const [showAllServices, setShowAllServices] = useState(false);
    const servicesToShow = showAllServices ? services : services.slice(0, 7);

    const handleCheckboxToggleServices = (index) => {
        const updatedServices = [...services];
        updatedServices[index].checked = !updatedServices[index].checked;
        setServices(updatedServices);
    };

    // Departments state and logic
    const [departments, setDepartments] = useState([
        { name: '24/7 Emergency Care', checked: true, doctors: 7 },
        { name: 'Surgery and Operating Rooms', checked: true, doctors: 5 },
        { name: 'Veterinary ICUs', checked: false, doctors: 0 },
        { name: 'Diagnostic Imaging (X-ray, Ultrasound)', checked: true, doctors: 4 },
        { name: 'In-House Laboratory', checked: false, doctors: 0 },
        { name: 'Dental Clinic', checked: true, doctors: 6 },
        { name: 'Pain Management', checked: false, doctors: 0 },
        { name: 'Specialist Consultations', checked: true, doctors: 8 },
        { name: 'Nutritional Counseling', checked: false, doctors: 0 }
    ]);
    
    
    
    const [showAllDepartments, setShowAllDepartments] = useState(false);
    const departmentsToShow = showAllDepartments ? departments : departments.slice(0, 7);

    const handleCheckboxToggleDepartments = (index) => {
        const updatedDepartments = [...departments];
        updatedDepartments[index].checked = !updatedDepartments[index].checked;
        setDepartments(updatedDepartments);
    };


// Initial state for services1
    const [services1, setServices1] = useState([
        { name: 'Emergency Services', checked: true },
        { name: 'Cashless Facility', checked: false },
        { name: '24/7 Services', checked: true },
    ]);

    // Toggle checkbox state
    const handleCheckboxChangeServices1 = (index) => {
        const updatedServices1 = [...services1];
        updatedServices1[index].checked = !updatedServices1[index].checked;
        setServices1(updatedServices1);
    };
// Initial state for services1


  return (
    <>
    <section className='ClinicVisibleSec'>
        <div className="container">


            <div className="visibletext">
                <HeadText Spntext="Control" blktext=" your clinic’s visibilty "/>
                <p>Manage the visibility of your clinic&apos;s departments, doctors, and services. Choose what to showcase to ensure a tailored experience for your clients.</p>
            </div>

            <div className="ClicVisibleData">

                <div className="LeftvisibleDiv">

                    <div className="clicprofdiv">
                        <img src={pft} alt="" />
                        <div className="ClVDiv">
                            <div className="clpfname">
                                <h4>San Francisco Animal Medical Center</h4>
                                <div className="loct">
                                    <span><i className="ri-map-pin-2-fill"></i> 2.5mi</span>
                                    <span><i className="ri-shining-2-fill"></i> 2.5mi</span>
                                </div>
                                <div className="opencl">
                                    <span>Open</span>
                                    <p>Open 24 Hours</p>
                                </div>
                            </div>
                            <div className="Profcomp">
                                <button className="complete-button" > <i className="ri-edit-fill"></i> Edit Details </button>
                            </div>
                        </div>
                    </div>

                    <div className="EmergencyDrDiv">
                        {services1.map((service1, index) => (
                            <label
                                key={index}
                                className={`Pfcheck ${service1.checked ? 'selected' : ''}`} // Apply 'selected' class if checked
                            >
                                <input
                                    type="checkbox"
                                    checked={service1.checked}
                                    onChange={() => handleCheckboxChangeServices1(index)}
                                />
                                {service1.name}
                                
                            </label>
                        ))}
                    </div>

                    <div className="Sercontrol">
                        {/* Services Section */}
                        <div className='VisibleServiceDiv'>
                            <div className='ClServDiv'>
                                <h5>Services</h5>
                                {services.length > 7 && (
                                    <button onClick={() => setShowAllServices(!showAllServices)}>
                                        {showAllServices ? 'See Less' : 'See More'}
                                    </button>
                                )}
                            </div>
                            <ul>
                                {servicesToShow.map((service, index) => (
                                    <li key={index} className={service.checked ? 'selected' : ''}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={service.checked}
                                                onChange={() => handleCheckboxToggleServices(index)}
                                            />
                                            {service.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Departments Section */}
                        <div className='VisibleServiceDiv'>
                            <div className='ClServDiv'>
                                <h5>Departments</h5>
                                {departments.length > 7 && (
                                    <button onClick={() => setShowAllDepartments(!showAllDepartments)}>
                                        {showAllDepartments ? 'See Less' : 'See More'}
                                    </button>
                                )}
                            </div>
                            <ul>
                                {departmentsToShow.map((department, index) => (
                                    <li key={index} className={department.checked ? 'selected' : ''}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={department.checked}
                                                onChange={() => handleCheckboxToggleDepartments(index)}
                                            />
                                            {department.name}
                                        </label>
                                        {/* Only display the number of doctors if checked */}
                                        {department.checked && department.doctors > 0 && (
                                            <div className="department-info">
                                                <p>{department.doctors} Doctors <i className="ri-arrow-right-s-line"></i></p>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>



                    <MainBtn  bimg={whtcheck} btext="Update Visibility" optclas=""  />


                </div>

                <div className="RytvisibleDiv">

                    <div className="clinicContDetail">
                        <h5>Contact Information</h5>
                        <div className="Cont-info">
                            <a href="#"><i className="ri-phone-fill"></i> +1 415-872-1872</a>
                            <a href="#"><i className="ri-global-fill"></i> sfamc.com</a>
                            <a href="#"><i className="ri-home-wifi-fill"></i> 2343 Fillmore St San Francisco, CA 94115</a>
                        </div>
                    </div>

                    <Gallery/>









                </div>


            </div>

            





















        </div>
    </section>









    </>
  )
}

export default Clinic_visiblity