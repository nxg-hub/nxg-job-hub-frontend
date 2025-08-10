import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  FileText,
  Upload,
  Save,
  UploadCloud,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";

export default function EmployerVerifiedDocuments() {
  const [fileItem, setFileItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileType, setFileType] = useState(""); // State for selected file type

  // Use the custom hook for Cloudinary upload
  const {
    mutate,
    isLoading,
    isSuccess,
    isError,
    error,
    data: cloudinaryResponse,
  } = useCloudinaryUpload({
    onMutate: (newFileDetails) => {
      // Optimistically update the UI or set status to uploading immediately
      setFileItem((prevFileItem) =>
        prevFileItem && prevFileItem.id === newFileDetails.file.id
          ? {
              ...prevFileItem,
              status: "uploading",
              progress: 0,
              type: newFileDetails.type,
            }
          : prevFileItem
      );
    },
    onSuccess: (cloudinaryData, variables) => {
      console.log("Upload successful:", cloudinaryData);
      setFileItem((prevFileItem) =>
        prevFileItem && prevFileItem.id === variables.file.id
          ? {
              ...prevFileItem,
              progress: 100,
              status: "completed",
              cloudinaryUrl: cloudinaryData.secure_url, // Store the URL from Cloudinary
              publicId: cloudinaryData.public_id, // Store the public ID if needed
            }
          : prevFileItem
      );
      // alert("File uploaded successfully to Cloudinary!"); // Use a custom modal instead of alert
    },
    onError: (err, variables) => {
      console.error("Upload error:", err);
      setFileItem((prevFileItem) =>
        prevFileItem && prevFileItem.id === variables.file.id
          ? { ...prevFileItem, status: "failed", progress: 0 }
          : prevFileItem
      );
      // alert(`File upload failed: ${err.message || "Unknown error"}`); // Use a custom modal instead of alert
    },
  });

  // Callback to update progress from the useCloudinaryUpload hook
  const handleProgressUpdate = useCallback((percentCompleted) => {
    setFileItem((prevFileItem) =>
      prevFileItem
        ? { ...prevFileItem, progress: percentCompleted }
        : prevFileItem
    );
  }, []);

  const handleAddFile = useCallback((newFile) => {
    if (newFile) {
      const fileWithIdAndProgress = {
        id: `${newFile.name}-${Date.now()}-${Math.random()}`,
        file: newFile,
        progress: 0,
        status: "pending",
      };
      setFileItem(fileWithIdAndProgress);
    }
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      const droppedFile = event.dataTransfer.files[0];
      handleAddFile(droppedFile);
    },
    [handleAddFile]
  );

  const handleFileChange = useCallback(
    (event) => {
      const selectedFile = event.target.files[0];
      handleAddFile(selectedFile);
    },
    [handleAddFile]
  );

  const handleRemoveFile = useCallback(() => {
    setFileItem(null);
    setFileType(""); // Reset file type when file is removed
  }, []);

  const handleUpload = useCallback(() => {
    if (fileItem && fileItem.status === "pending" && fileType) {
      // Pass the onProgress callback to the mutate function
      mutate({ file: fileItem.file, onProgress: handleProgressUpdate });
    }
  }, [fileItem, fileType, mutate, handleProgressUpdate]);

  // Determine upload button disabled state
  const isUploadButtonDisabled =
    !fileItem || fileItem.status !== "pending" || !fileType || isLoading;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4 gap-5">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Employer verification form</CardTitle>
          <CardDescription>
            Complete your profile to help clients find and connect with you
            Verify Your Account To Enjoy All Our Services And Make New Recruits
            Without Any Restrictions To Your Account! Select the file type, then
            drag and drop your file here, or click to browse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="file-type-select" className="mb-2 block">
              Select File Type
            </Label>
            <Select onValueChange={setFileType} value={fileType}>
              <SelectTrigger id="file-type-select" className="w-full">
                <SelectValue placeholder="Choose your document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tax-clearance-certificate">
                  Tax Clearance Certificate
                </SelectItem>
                <SelectItem value="cac-certificate">CAC Certificate</SelectItem>
                <SelectItem value="company-memorandum">
                  Company Memorandum
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200
            ${
              isDragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
            }
            ${!fileType ? "opacity-50 cursor-not-allowed" : ""}
          `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            // Disable drag/drop if no file type is selected
            aria-disabled={!fileType}
            tabIndex={!fileType ? -1 : 0}
          >
            <UploadCloud className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Drag and drop a file here or
            </p>
            <Label
              htmlFor="file-upload"
              className={`cursor-pointer ${
                !fileType ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Button variant="outline" asChild disabled={!fileType}>
                <span>Browse File</span>
              </Button>
              <Input
                id="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                disabled={!fileType}
              />
            </Label>
          </div>

          {fileItem && (
            <div className="mt-6 space-y-2">
              <h3 className="text-md font-medium">Selected File:</h3>
              <div className="flex flex-col py-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-800 dark:text-gray-200 truncate pr-4">
                    {fileItem.file.name}
                    {fileItem.status === "completed" && (
                      <span className="ml-2 text-green-500">(Uploaded)</span>
                    )}
                    {fileItem.status === "uploading" && (
                      <span className="ml-2 text-blue-500">(Uploading...)</span>
                    )}
                    {fileItem.type && (
                      <span className="ml-2 text-gray-500 dark:text-gray-400">
                        (
                        {fileItem.type
                          .replace(/-/g, " ")
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                        )
                      </span>
                    )}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border-none w-6 h-6 text-gray-500 hover:text-red-500"
                    onClick={handleRemoveFile}
                    aria-label={`Remove ${fileItem.file.name}`}
                    disabled={isLoading} // Disable remove while uploading
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {(fileItem.status === "uploading" ||
                  fileItem.status === "completed") && (
                  <Progress value={fileItem.progress} className="w-full h-2" />
                )}

                {/* Show current file status from Tanstack Query */}
                {isLoading && (
                  <span className="text-xs text-blue-600 mt-1">
                    Uploading...
                  </span>
                )}

                {isSuccess && (
                  <span className="text-xs text-green-600 mt-1">
                    Upload Complete!
                    {cloudinaryResponse?.secure_url && (
                      <a
                        href={cloudinaryResponse.secure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 hover:underline"
                      >
                        View File
                      </a>
                    )}
                  </span>
                )}

                {isError && (
                  <span className="text-xs text-red-600 mt-1">
                    Upload Failed: {error?.message}
                  </span>
                )}
              </div>
              <Button
                className="border-none w-full mt-4 bg-secondary"
                onClick={handleUpload}
                disabled={isUploadButtonDisabled}
              >
                {isLoading ? "Uploading..." : "Upload File"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Button className="border-none bg-secondary" type="submit">
        <Save className="w-4 h-4 mr-2" />
        Verify account
      </Button>

      <div className="w-full max-w-2xl bg-sky-50 border border-sky-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-secondary mt-0.5" />
          <div>
            <h4 className="font-medium text-secondary mb-1">
              Verification Process
            </h4>
            <p className="text-sm text-primary">
              All uploaded documents will be reviewed by our verification team
              within 2-3 business days. You'll receive an email notification
              once the verification is complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
