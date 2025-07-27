import React, { useState, useRef } from "react";
import { Upload, File, X, Camera, User, FileText, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

const RenderStepFourTalent = ({ formData, setFormData, formError }) => {
  const [dragActive, setDragActive] = useState({
    resume: false,
    coverletter: false,
    profilePicture: false
  });

  // File input refs
  const resumeInputRef = useRef(null);
  const coverLetterInputRef = useRef(null);
  const profilePictureInputRef = useRef(null);

  // Handle form data updates
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // File validation
  const validateFile = (file, type) => {
    const maxSize = type === 'profilePicture' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for images, 10MB for documents
    
    if (file.size > maxSize) {
      alert(`File size must be less than ${type === 'profilePicture' ? '5MB' : '10MB'}`);
      return false;
    }

    const allowedTypes = {
      resume: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      coverletter: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      profilePicture: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    };

    if (!allowedTypes[type].includes(file.type)) {
      const typeNames = {
        resume: 'PDF or Word document',
        coverletter: 'PDF or Word document',
        profilePicture: 'JPEG, PNG, or WebP image'
      };
      alert(`Please upload a ${typeNames[type]}`);
      return false;
    }

    return true;
  };

  // Handle file selection
  const handleFileSelect = (file, type) => {
    if (validateFile(file, type)) {
      // Convert file to base64 or handle as needed
      const reader = new FileReader();
      reader.onload = (e) => {
        updateFormData(type, {
          file: file,
          data: e.target.result,
          name: file.name,
          size: file.size,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag events
  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [type]: true }));
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [type]: false }));
    }
  };

  // Handle drop
  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [type]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0], type);
    }
  };

  // Handle input change
  const handleInputChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0], type);
    }
  };

  // Remove file
  const removeFile = (type) => {
    updateFormData(type, "");
    // Reset input
    if (type === 'resume' && resumeInputRef.current) resumeInputRef.current.value = '';
    if (type === 'coverletter' && coverLetterInputRef.current) coverLetterInputRef.current.value = '';
    if (type === 'profilePicture' && profilePictureInputRef.current) profilePictureInputRef.current.value = '';
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // File upload component
  const FileUploadBox = ({ type, icon: Icon, title, description, accept }) => {
    const hasFile = formData[type] && formData[type].name;
    const isError = formError && !formData[type];

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {title} *
        </Label>
        
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${dragActive[type] ? 'border-blue-500 bg-blue-50' : ''}
            ${isError ? 'border-red-500' : 'border-gray-300'}
            ${hasFile ? 'bg-green-50 border-green-300' : 'hover:border-gray-400'}
          `}
          onDragEnter={(e) => handleDrag(e, type)}
          onDragLeave={(e) => handleDrag(e, type)}
          onDragOver={(e) => handleDrag(e, type)}
          onDrop={(e) => handleDrop(e, type)}
        >
          <Input
            ref={type === 'resume' ? resumeInputRef : type === 'coverletter' ? coverLetterInputRef : profilePictureInputRef}
            type="file"
            accept={accept}
            onChange={(e) => handleInputChange(e, type)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          {hasFile ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                <Icon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">{formData[type].name}</p>
                <p className="text-sm text-green-600">{formatFileSize(formData[type].size)}</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(type);
                }}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-gray-100 rounded-full">
                <Icon className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Drop your {title.toLowerCase()} here, or <span className="text-blue-600">browse</span>
                </p>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
              <Button type="button" variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Resume Upload */}
      <FileUploadBox
        type="resume"
        icon={FileText}
        title="Resume/CV"
        description="Upload your resume in PDF or Word format (max 10MB)"
        accept=".pdf,.doc,.docx"
      />

      {/* Cover Letter Upload */}
      <FileUploadBox
        type="coverletter"
        icon={Mail}
        title="Cover Letter"
        description="Upload your cover letter in PDF or Word format (max 10MB)"
        accept=".pdf,.doc,.docx"
      />

      {/* Profile Picture Upload */}
      <FileUploadBox
        type="profilePicture"
        icon={Camera}
        title="Profile Picture"
        description="Upload a professional photo in JPEG, PNG, or WebP format (max 5MB)"
        accept=".jpg,.jpeg,.png,.webp"
      />

      {/* File Requirements */}
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h4 className="font-medium text-amber-800 mb-2">File Requirements:</h4>
        <div className="space-y-1 text-sm text-amber-700">
          <div className="flex items-start gap-2">
            <span>•</span>
            <span><strong>Resume & Cover Letter:</strong> PDF or Word documents, maximum 10MB each</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span><strong>Profile Picture:</strong> JPEG, PNG, or WebP images, maximum 5MB</span>
          </div>
          <div className="flex items-start gap-2">
            <span>•</span>
            <span><strong>Profile Picture:</strong> Should be professional, clear, and well-lit</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tips:</strong> Ensure your resume is up-to-date and highlights your technical skills. 
          Your cover letter should be tailored and show your enthusiasm. 
          Use a professional headshot for your profile picture - it significantly increases your chances of getting noticed!
        </p>
      </div>

      {/* Progress Summary */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Upload Progress:</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Resume/CV</span>
            <span className={`text-xs px-2 py-1 rounded ${formData.resume ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {formData.resume ? 'Uploaded' : 'Required'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Cover Letter</span>
            <span className={`text-xs px-2 py-1 rounded ${formData.coverletter ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {formData.coverletter ? 'Uploaded' : 'Required'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Profile Picture</span>
            <span className={`text-xs px-2 py-1 rounded ${formData.profilePicture ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {formData.profilePicture ? 'Uploaded' : 'Required'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderStepFourTalent;