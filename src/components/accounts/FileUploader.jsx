import axios from "axios";
import React, { useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

const FileUploader = ({
  title,
  name,
  value,
  onFileSelectError,
  onFileChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [fileTypeError, setFileTypeError] = useState('')
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInput = useRef(null);

  // const onDragEnter = () => fileInput.current.classList.add("dragover");
  // const onDragLeave = () => fileInput.current.classList.remove("dragover");
  // const onDrop = () => fileInput.current.classList.remove("dragover");

  const [document, setDocument] = useState("");
  const onDragEnter = () => fileInput.current.classList.add("dragover");
  const onDragLeave = () => fileInput.current.classList.remove("dragover");
  const onDrop = () => fileInput.current.classList.remove("dragover");

  const [document, setDocument] = useState("")
  const onDragEnter = () => fileInput.current.classList.add('dragover');
  const onDragLeave = () => fileInput.current.classList.remove('dragover');
  const onDrop = () => fileInput.current.classList.remove('dragover');
  const uploadImage = async (file) => {
    setLoading(true);
    setError(false);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tin4r1lt");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dildznazt/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUrl(res.data.secure_url);
      onFileChange(res.data.secure_url);
      // alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setError(true);
      // alert("File upload failed. Please try again.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = (files) => {
    const file = files[0];
    if (!files || files.length === 0) {
      alert("Select a file")
      return;
    }
    const allowedFileTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

    if (!allowedFileTypes.includes(file.type)) {
      onFileSelectError({ error: "Only DOC and PDF files are allowed" });
      setFileTypeError('Only DOC and PDF files are allowed')
      return;
    }

    
    if (file.size > 5 * 1024 * 1024) {
      onFileSelectError({ error: "File size cannot exceed 5MB" });
      return;
    }
    setDocument(files[0]?.name)
    uploadImage(file);
  };

  const fileRemove = () => {
    setUrl("");
    onFileChange(null);
  };

  return (
    <div className="file-wrapper">
      <label>{title}</label>
      <div
        ref={fileInput}
        className="file-uploader "
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}>
        <div className="drop-file-input-img-label">
        onDrop={onDrop}
      >
        <div className="drop-file-input-img-label flex justify-center flex-col items-center">
          <IoMdCloudUpload className="upload-img" />
          <div className="drop-file-labels">
            <h6>Browse files here</h6>
            <p>Drag and drop files here</p>
          </div>
          {document !== "" && <span>{document}</span>}
        </div>
        <input
          type="file"
          accept=".jpeg, .jpg, .png, .docx, .pdf"
          name={name}
          value={value}
          onChange={(e) => uploadFiles(e.target.files)}
          id="drop-file-input"
        />
     <span>   {fileTypeError}</span>
      </div>
      {url && (
        <div className="drop-file-preview">
          <div className="drop-file-preview-item">
            {/* <div className="drop-file-preview-info">
              <p>
                Access your file at{" "}
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </p>
            </div> */}
            {/* <span className="drop-file-delete" onClick={fileRemove}>
              x
            </span> */}
            <div className="bg-[#5EAB2F] w-[80%] px-3 py-2 text-white flex justify-between">
              <p>{`${fileName} Uploaded Successfully `} </p>
              <span className="drop-file-delete" onClick={fileRemove}>
                x
              </span>
            </div>
          </div>
        </div>
      )}
      {error && !loading ? (
        <div className=" w-[80%] px-3 py-2 text-red-500 font-bold">
          <p>File upload failed. Please try again.</p>
        </div>
      ) : null}
      <div>{loading && <div>Loading...</div>}</div>
    </div>
  );
};

export default FileUploader;
