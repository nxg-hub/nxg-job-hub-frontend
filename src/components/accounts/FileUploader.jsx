import axios from "axios";
import React, { useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

const FileUploader = ({ title, name, value, onFileSelectError, onFileChange }) => {
  const [loading, setLoading] = useState(false);
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

  const uploadSingleFile = async (base64) => {
    setLoading(true);
    try {
      const res = await axios.post("/uploadImage", { image: base64 }, { withCredentials: true });
      // const res = await axios.post("http://localhost:5000/uploadImage", { image: base64 }, { withCredentials: true });
      const fileUrl = res.data;
      setUrl(fileUrl);
      onFileChange(fileUrl);
      alert("File uploaded successfully.");     
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("File upload failed. Please try again.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  // const uploadMultipleFiles = async (images) => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.post("http://localhost:5000/uploadMultipleFiles", { images })
  //     setUrl(res.data);
  //     alert("File uploaded successfully.");     
  //   } catch (error) {
  //     console.error("Error uploading file:", error.message);
  //     alert("File upload failed. Please try again.");
  //     console.log(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const uploadImage = async (e) => {
    const files = e.target.files;
    // console.log(files.length);

    if (!files || files.length === 0) {
      alert("Select a file")
      return; // No file selected, do nothing
    }
    if (files[0].size > 5 * 1024 * 1024) {
      onFileSelectError({ error: "File cannot exceed more than 5MB" });
      return;
    }
    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleFile(base64);
      return;
    }

    // const base64s = [];
    // for (let i = 0; i < files.length; i++) {
    //   let base = await convertBase64(files[i]);
    //   base64s.push(base);
    // }
    // uploadMultipleFiles(base64s);
  };

  const fileRemove = () => {
    setUrl("");
    onFileChange(null);
  }

  return (
    <div className="file-wrapper">
        <label>{title}</label>
        <div 
          ref={fileInput} // Reference to the file input element
          className="file-uploader "
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
            onChange={uploadImage}
            id="drop-file-input"
          />
        </div>
        {
          url && (
            <div className="drop-file-preview">
              <div className="drop-file-preview-item">
                <div className="drop-file-preview-info">
                  <p>
                    Access your file at{" "}
                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                  </p>
                </div>
                <span className="drop-file-delete" onClick={fileRemove}>
                  x
                </span>
              </div>
            </div>
          )
        }
        <div>
          {loading && (<div>Loading...</div>)}
        </div>
    </div>
  );
};

export default FileUploader;
