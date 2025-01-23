import React, { useState, useEffect } from "react";
import "./UplodeImage.css";
import Upload from "../../../public/Images/uplode.png";

const UplodeImage = ({ onFileChange, selectedFile }) => {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // setFileURL(URL.createObjectURL(uploadedFile)); // Create a URL for the selected file

      onFileChange(uploadedFile);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      // If selectedFile is a URL (from the backend), use it as the file URL
      if (typeof selectedFile === "string") {
        setFileURL(selectedFile);
        setFile(null); // Clear the file state since it's a URL
      } else {
        // If selectedFile is a file object (possibly with URL property), handle it
        setFile(selectedFile);
        setFileURL(selectedFile.url || ""); // Set the URL from the file object if available
      }
    }
  }, [selectedFile]);

  return (
    <div>
      <div className="upload-box">
        {fileURL || file ? (
          <div className="file-preview">
            {/* Display image preview if fileURL is valid */}
            <img
              src={fileURL ? fileURL : URL.createObjectURL(file)}
              alt="Preview"
              className="preview-image"
            />
          </div>
        ) : (
          <>
            <div className="upload-icon">
              <img src={Upload} alt="Upload Icon" />
            </div>
            <p className="upload-text">Upload prescription</p>
            <p className="file-info">
              Only DOC, PDF, PNG, JPEG formats <br /> with max size 20 MB
            </p>
          </>
        )}
        <input
          type="file"
          accept=".doc,.pdf,.png,.jpeg,.jpg"
          className="upload-input"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UplodeImage;
