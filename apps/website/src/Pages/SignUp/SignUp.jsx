import React, { useState } from "react";
import "./SignUp.css";
import PropTypes from "prop-types";
import { MainBtn } from "../Appointment/page";
import eys from "../../../public/Images/eys.png";
import whtcheck from "../../../public/Images/whtcheck.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
const SignUp = () => {
  // types of business
  const { SignUp } = useAuth();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const businessTypes = [
    "Hospital",
    "Clinic",
    "Breeder Shop",
    "Pet Stay Owner",
    "Groomer Shop",
  ];

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
        text: "Please make sure both passwords are the same.",
      });
      return;
    }

    const formData = {
      email,
      password,
      businessType: selectedType,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Successfully signed up!",
          text: "You can now proceed to the next step.",
        });
        navigate("/signupdetails");
      } else if (response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "User already exists",
          text: "Please use a different email.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Something went wrong.",
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Sign Up failed: ${error.response.data.message}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Sign Up failed: Unable to connect to the server.",
        });
      }
    }
  };

  return (
    <>
      <section className="SignUpSec">
        <div className="container">
          <div className="SignupData">
            <div className="SignUpText">
              <h1>
                <span>Join the Future</span> of <br /> Veterinary Practice{" "}
                <br /> Management
              </h1>
              <p>
                Streamline your operations, improve patient care, and grow your
                practice with our comprehensive PIMS.
              </p>
            </div>

            <div className="SignFormDiv">
              <form onSubmit={handleSubmit}>
                <HeadText Spntext="Sign up" blktext="now" />

                <div className="">
                  <Forminput
                    inlabel="Email Address"
                    intype="text"
                    inname="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="pasdiv">
                    <FormPassw
                      paswlabel="Password"
                      intype="password"
                      inname="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p>
                      Password must be at least 8 characters long, including an
                      uppercase letter, a number, and a special character.
                    </p>
                  </div>
                  <FormPassw
                    paswlabel="Confirm Password"
                    intype="password"
                    inname="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <div className="business-type-container">
                    <p>Select Your Business Type</p>
                    <div className="button-group">
                      <ul>
                        {businessTypes.map((type) => (
                          <li
                            key={type}
                            className={`business-button ${
                              selectedType === type ? "selected" : ""
                            }`}
                            onClick={() => handleSelectType(type)}
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
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

                <div className="sinbtn">
                  <MainBtn
                    btntyp="submit"
                    bimg={whtcheck}
                    btext="Sign Up"
                    onClick={() => handleSubmit()}
                  />
                  <h6>
                    Already have an account? <Link to="/signin">Login</Link>
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;

// form input
Forminput.propTypes = {
  inlabel: PropTypes.string.isRequired,
  intype: PropTypes.string.isRequired,
  inname: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
export function Forminput({ inlabel, intype, inname, value, onChange }) {
  return (
    <div className="signup__field ">
      <input
        className="signup__input"
        type={intype}
        name={inname}
        id={inname}
        value={value}
        onChange={onChange}
        required
      />
      <label className="signup__label" htmlFor={inname}>
        {inlabel}
      </label>
    </div>
  );
}

FormPassw.propTypes = {
  paswlabel: PropTypes.string.isRequired,
  intype: PropTypes.string.isRequired,
  inname: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export function FormPassw({ paswlabel, intype, inname, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup__field passfield">
      <input
        className="signup__input"
        type={showPassword ? "text" : intype} // Toggle between 'text' and original input type
        name={inname}
        id={inname}
        value={value}
        onChange={onChange}
        required
      />
      <label className="signup__label" htmlFor={inname}>
        {paswlabel}
      </label>
      <a href="#" onClick={togglePasswordVisibility}>
        <img src={eys} alt="eyes" />
      </a>
    </div>
  );
}

// headtext
HeadText.propTypes = {
  Spntext: PropTypes.string.isRequired,
  blktext: PropTypes.string.isRequired,
};
export function HeadText({ Spntext, blktext }) {
  return (
    <div className="Headingtext">
      <h2>
        <span>{Spntext}</span> {blktext}
      </h2>
    </div>
  );
}
