import React, { useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

const FileUploader = ({ title, onFileSelectError, onFileChange }) => {
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);

  const onDragEnter = () => fileInput.current.classList.add('dragover');
  const onDragLeave = () => fileInput.current.classList.remove('dragover');
  const onDrop = () => fileInput.current.classList.remove('dragover');

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
    // const updatedFile = [...files, selectedFile];
      setFile(selectedFile);
      onFileChange(selectedFile);
  };

  const fileRemove = () => {
    // const updatedFile = files.filter (file => file !== fileToRemove);
    setFile(null);
    onFileChange(null);
  }

  return (
    <div className="file-wrapper">
        <label>{title}</label>
        <div 
          ref={fileInput} // Reference to the file input element
          className="file-uploader"
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="drop-file-input-img-label">
            <IoMdCloudUpload className="upload-img"/>
            <div className="drop-file-labels">
              <h6>Browse files here</h6>
              <p>Drag and drop files here</p>
            </div>
          </div>
          <input
            type="file"
            accept=".jpeg, .jpg, .png, .docx, .pdf"
            value=""
            onChange={handleFileInput}
            id="drop-file-input"
          />
        </div>
        {
          file && (
            <div className="drop-file-preview">
              <div className="drop-file-preview-item">
                {/* Adjust the following logic based on the file type */}
                {file.type.startsWith("image/") ? (
                  <img src={URL.createObjectURL(file)} alt={file.name} />
                  ) : (
                  <p>{file.name}</p>
                )}
                <div className="drop-file-preview-info">
                  <p>{file.name}</p>
                </div>
                <span className="drop-file-delete" onClick={() => fileRemove(file)}>
                  x
                </span>
              </div>
            </div>
          )
        }
    </div>
  );
};

export default FileUploader;
