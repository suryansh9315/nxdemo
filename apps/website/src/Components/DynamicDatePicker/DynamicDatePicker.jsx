// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./DynamicDatePicker.css";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

const DynamicDatePicker = ({ placeholder, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`
      : null;
    onDateChange(formattedDate);
  };

  return (
    <>
      <div className="DatePicDiv">
        <FormControl
          as="div"
          style={{ cursor: "pointer" }}
          className=""
          onClick={(e) => e.preventDefault()}
        >
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText={placeholder}
            dateFormat="yyyy-MM-dd"
          />
        </FormControl>
        <FaCalendarAlt />
      </div>
    </>
  );
};

// Add PropTypes validation
DynamicDatePicker.propTypes = {
  placeholder: PropTypes.string.isRequired, // Placeholder must be a string and is required
  onDateChange: PropTypes.func.isRequired,
};

export default DynamicDatePicker;
