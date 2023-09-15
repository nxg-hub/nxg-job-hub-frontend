import React, { useRef, useEffect } from 'react';

const FileUploader = ({ title, onFileSelect, onFileSelectError, onFileSelectSuccess }) => {
  const fileInput = useRef(null);

  const allowedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/pdf',
    'application/docx',
  ];

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return; // No file selected, do nothing
    }

    if (!allowedFileTypes.includes(file.type)) {
      onFileSelectError({ error: "Invalid file type" });
      return;
    }

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      // File size exceeds 5MB
      onFileSelectError({ error: "File cannot exceed more than 5MB" });
    } else {
      // File size is within limit, trigger success callback
      onFileSelectSuccess(file);
    }
  };

  useEffect(() => {
    fileInput.current && fileInput.current.click();
  }, []);

  return (
    <div className='file-uploader'>
        <label>{title}</label>
        <input
            type="file"
            accept='.jpeg, .jpg, .png, .docx, .pdf'
            onChange={handleFileInput}
            ref={fileInput} // Reference to the file input element
        />
    </div>
  );
};

export default FileUploader;
