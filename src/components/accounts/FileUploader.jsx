import axios from "axios";
import React, { useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

const FileUploader = ({ title, name, value, onFileSelectError, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const fileInput = useRef(null);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onDragEnter = () => fileInput.current.classList.add('dragover');
  const onDragLeave = () => fileInput.current.classList.remove('dragover');
  const onDrop = () => fileInput.current.classList.remove('dragover');

  const uploadFile = async (base64) => {
    // setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/uploadFile", { file: base64 })
      setUrl(res.data);
      alert("File uploaded successfully.");     
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  }

  const handleFileInput = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      alert("Select a file")
      return; // No file selected, do nothing
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      onFileSelectError({ error: "File cannot exceed more than 5MB" });
      return;
    }
    if (selectedFile) {
      const base64 = await convertBase64(selectedFile);
      setFile(selectedFile);
      onFileChange(selectedFile);
      uploadFile(base64);
    }
  };

  const fileRemove = () => {
    // const updatedFile = files.filter (file => file !== fileToRemove);
    setFile(null);
    setUrl("");
    onFileChange(null);
  }

  return (
    <div className="file-wrapper">
        <label>{title}</label>
        <div 
          ref={fileInput} // Reference to the file input element
          className={`file-uploader ${loading ? "loading" : ""}`}
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
            name={name}
            value={value}
            onChange={handleFileInput}
            id="drop-file-input"
          />
        </div>
        {
          url && (
            <div className="drop-file-preview">
              <div className="drop-file-preview-item">
                {/* Adjust the following logic based on the file type */}
                {file?.type.startsWith("image/") ? (
                  <img src={URL.createObjectURL(file)} alt={file.name} />
                  ) : (
                  <p>
                    {file.name}
                  </p>
                )}
                <div className="drop-file-preview-info">
                  <p>
                    {file.name}
                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                  </p>
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
