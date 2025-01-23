// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import "./DynamicSelect.css";

const DynamicSelect = ({ options, placeholder, value, onChange }) => {
  return (
    <div className="SelectedInpt">
      <Form.Select
        aria-label="Dynamic select menu"
        name="dynamicSelect"
        value={value} // Bind the value to the state
        onChange={(e) => onChange(e.target.value)} // Pass the selected value back to the parent
      >
        <option value="">{placeholder}</option>
        {options && options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No options available
          </option>
        )}
      </Form.Select>
    </div>
  );
};

DynamicSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string, // New prop for dynamic placeholder text
  value: PropTypes.string.isRequired, // Bind to a specific value
  onChange: PropTypes.func.isRequired, // Handle the change event
};

DynamicSelect.defaultProps = {
  placeholder: "Select an option", // Default placeholder
};

export default DynamicSelect;
