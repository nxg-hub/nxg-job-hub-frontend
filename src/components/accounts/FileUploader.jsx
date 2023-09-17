import React, { useRef } from "react";


const FileUploader = ({ title, onFileSelectError, onFileSelectSuccess }) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      alert("Select a file")
      return; // No file selected, do nothing
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      onFileSelectError({ error: "File cannot exceed more than 5MB" });
      return;
    }

    onFileSelectSuccess(selectedFile);
  };

  return (
    <div className="file-uploader">
      <label>{title}</label>
      <input
        type="file"
        accept=".jpeg, .jpg, .png, .docx, .pdf"
        onChange={handleFileInput}
        ref={fileInput} // Reference to the file input element
        style={{ display: "none" }}
      />
      <button onClick={() => fileInput.current && fileInput.current.click()}>
        {title}
      </button>
    </div>
  );
};

export default FileUploader;
