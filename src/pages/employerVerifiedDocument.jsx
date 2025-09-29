import { useEffect, useState } from "react";
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
  FileWarning,
  Save,
  UploadCloud,
  X,
  RefreshCcw,
  CloudUpload,
  CircleCheckBig,
  CircleDotDashed,
  ArrowLeft,
} from "lucide-react";
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
import { useUserProfileUpdate } from "@/hooks/useUserProfileUpdate";
import pdfIcon from "@/static/icons/pdf.png";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import Logo from "@/static/images/logo_colored.png";

const FILE_OPTIONS = [
  {
    label: "Tax Clearance Certificate",
    value: "taxClearanceCertificate",
    uploaded: false,
  },
  { label: "CAC Certificate", value: "CACCertificate", uploaded: false },
  { label: "Company Memorandum", value: "companyMemorandum", uploaded: false },
];

export default function EmployerVerifiedDocuments() {
  const [selectedFiles, setSelectedFiles] = useState([]); // State for selected file type

  const handleSelectionChange = (val) => {
    const selectFileDetails = FILE_OPTIONS.find((el) => el.value === val);
    setSelectedFiles((prev) => {
      if (prev.includes(selectFileDetails)) return prev;
      return [...prev, selectFileDetails];
    });
  };

  return (
    <div>
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4 fixed top-0 left-0 z-50 sm:static">
        <span
          // onClick={prevStep}
          className="inline-flex sm:hidden text-white cursor-pointer"
        >
          <ArrowLeft /> Back
        </span>
        <img className="w-20 sm:w-24" src={Logo} alt="" />
      </nav>

      <div className="flex justify-center bg-gray-50">
        <div className="flex flex-col justify-center items-center min-h-screen p-4 gap-5">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Employer verification form</CardTitle>
              <CardDescription>
                Help us verify your organization by uploading the necessary
                documents. Your information is safe and will only be used for
                verification
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <Label htmlFor="file-type-select" className="mb-2 block">
                  Select File Type
                </Label>
                <Select onValueChange={handleSelectionChange}>
                  <SelectTrigger id="file-type-select" className="w-full">
                    <SelectValue placeholder="Choose your document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FILE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                {selectedFiles.map((file) => (
                  <FileUploadPicker
                    key={file.value}
                    fileDatails={file}
                    onChangeFileDetails={setSelectedFiles}
                  />
                ))}
              </div>
              <div className="w-full max-w-2xl bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-secondary mb-1">
                      Verification Process
                    </h4>
                    <p className="text-sm text-primary">
                      All uploaded documents will be reviewed by our
                      verification team within 24hours. You'll receive an email
                      notification once the verification is complete.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="w-full max-w-2xl bg-yellow-50 border border-yellow-500 rounded-lg p-4">
            <div className="flex items-start gap-3 justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-800 mt-0.5" />
              <h4 className="font-medium text-yellow-800 mb-1">
                Only PDF file format are allowed, and file must be 10MB or less
              </h4>
            </div>
          </div>
          <Toaster />
        </div>
        <div className="mt-48 flex flex-col gap-12">
          {selectedFiles.map((file) => (
            <FileUploadChecker key={file.value} fileDatails={file} />
          ))}
        </div>
      </div>
    </div>
  );
}

const FileUploadChecker = ({ fileDatails }) => {
  return (
    <div
      className={cn(
        `${!fileDatails?.uploaded ? "text-gray-400" : "text-gray-900"}`,
        "flex items-center gap-2"
      )}
    >
      {!fileDatails?.uploaded ? (
        <CircleDotDashed className="w-6 h-6" />
      ) : (
        <CircleCheckBig className="w-6 h-6 text-green-700" />
      )}

      <div className="flex flex-col text-sm -space-y-1">
        <span>{fileDatails?.label}</span>
        <div className="text-xs">
          {!fileDatails?.uploaded ? (
            <span>Not uploaded yet</span>
          ) : (
            <span className="text-green-700">Successful uploaded</span>
          )}
        </div>
      </div>
    </div>
  );
};

const FileUploadPicker = ({ fileDatails, onChangeFileDetails }) => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const [file, setFile] = useState(null);
  const [uploadFileStatus, setUploadFileStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileSizeError, setFileSizeError] = useState("");
  const [disabledFileUpload, setDisabledFileUpload] = useState(false);

  // Use the custom hook for Cloudinary upload
  const {
    mutate: uploadFileToCloudinary,
    isPending,
    isSuccess,
    isError,
    progress,
    data: cloudinaryResponse,
  } = useCloudinaryUpload();

  const { mutate: updateEmployerProfile, data: apiResponse } =
    useUserProfileUpdate();

  const updateSeletedFileDetails = (fileValue) => {
    onChangeFileDetails((prev) =>
      prev.map((f) => (f.value === fileValue ? { ...f, uploaded: true } : f))
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile.size > MAX_FILE_SIZE) {
      setFileSizeError("File size must be less than 10MB");
      setFile(null);
      return;
    }
    if (droppedFile.type !== "application/pdf") {
      setFileSizeError("Only PDF files are allowed");
      setFile(null);
      return;
    }

    setFile(droppedFile);
  };

  const handleFileChange = (event) => {
    if (!disabledFileUpload) {
      const selectedFile = event.target.files[0];

      if (selectedFile.size > MAX_FILE_SIZE) {
        setFileSizeError("File size must be less than 10MB");
        setFile(null);
        return;
      }
      if (selectedFile.type !== "application/pdf") {
        setFileSizeError("Only PDF files are allowed");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpdateFileProfile = (payload) => {
    const storeValueObj =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");
    const userId = storeValueObj ? JSON.parse(storeValueObj).id : null;
    updateEmployerProfile(
      {
        url: `${API_HOST_URL}/api/employers`,
        userId,
        payload: payload,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setUploadFileStatus("Successful");
          setDisabledFileUpload(true);
          updateSeletedFileDetails(fileDatails?.value);
          toast({
            className: cn(
              "bottom-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
            ),
            title: <p className="tex-green-700">Successfully upload</p>,
            description: (
              <p className="text-gray-800 rounded-md bg-green-100 p-4 font-mono">
                Your file is uploaded successfully
              </p>
            ),
            duration: 2500,
          });
        },
        onError: (err) => {
          console.error("Upload error:", err);
          setUploadFileStatus("Failed");
          toast({
            className: cn(
              "bottom-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
            ),
            title: <p className="text-red-700">Upload error</p>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                Failed to upload your file
              </p>
            ),
            duration: 2500,
          });
        },
      }
    );
  };

  const handleUploadToCloudinary = () => {
    uploadFileToCloudinary(
      file, //
      {
        onMutate: (variable) => {
          // Optimistically update the UI or set status to uploading immediately
          setUploadFileStatus("Pending");
        },
        onSuccess: (cloudinaryData) => {
          handleUpdateFileProfile({
            [fileDatails?.value]: cloudinaryData?.secure_url,
          });
        },
        onError: (err) => {
          console.error("Upload error:", err);
          setUploadFileStatus("Failed");
          toast({
            className: cn(
              "bottom-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
            ),
            title: <p className="text-red-700">Upload error</p>,
            description: (
              <pre className=" rounded-md bg-red-100 p-4 font-mono w-full">
                <p className="text-gray-800 w-full">
                  {" "}
                  Failed to upload your file
                </p>
              </pre>
            ),
            duration: 2500,
          });
        }, //
      }
    );
  };

  const handleReload = () => {
    if (!cloudinaryResponse?.secure_url) {
      handleUploadToCloudinary();
    } else {
      handleUpdateFileProfile({
        [fileDatails?.value]: cloudinaryResponse?.secure_url,
      });
    }
  };

  useEffect(() => {
    //Check if file has been added and its status is pending
    if (file) {
      handleUploadToCloudinary();
    }
  }, [file]);

  return (
    <div className="my-5">
      <div
        className={cn(
          `${
            disabledFileUpload
              ? "cursor-not-allowed text-gray-200 bg-gray-50"
              : "bg-sky-50"
          }`,
          "border-2  border-dashed p-2  flex items-center  justify-between rounded"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Label
          htmlFor={fileDatails?.fileNameType}
          className={cn(
            `${
              disabledFileUpload
                ? "cursor-not-allowed"
                : "cursor-pointer transition-colors duration-200 text-secondary"
            }`,
            "  "
          )}
        >
          <Button className="bg-sky-50" variant="outline" asChild>
            <span>Select File</span>
          </Button>
          <Input
            id={fileDatails?.fileNameType}
            type="file"
            className="hidden sr-only"
            onChange={handleFileChange}
            accept="application/pdf"
            disabled={disabledFileUpload}
          />
        </Label>
        <div className="">
          {uploadFileStatus === "Pending" && (
            <span className="flex gap-2 text-blue-500">
              <CloudUpload className="w-6 h-6" />
              Uploading...
            </span>
          )}
          {uploadFileStatus === "Successful" && (
            <span className="text-sm text-gray-400 font-medium capitalize">
              {fileDatails?.fileName} uploaded
            </span>
          )}
          {!disabledFileUpload && (
            <span className="text-sm text-secondary font-medium">
              Drop a file here to upload
            </span>
          )}
        </div>
      </div>
      <div>
        {fileSizeError !== "" && (
          <div className="flex gap-1 p-2 text-red-400">
            <FileWarning className="w-5 h-5" />
            <span className=" text-sm italic">{fileSizeError}</span>
          </div>
        )}
        {file && (
          <div className="flex items-center justify-between p-2">
            <div className="flex gap-2">
              <img
                src={pdfIcon}
                alt="pdf-file"
                className="object-contain w-12 h-12"
              />

              <div className="flex flex-col text-sm">
                <span className="capitalize font-bold text-base text-gray-800">
                  {file?.name}
                </span>
                <span className="text-sm text-gray-800 truncate pr-4">
                  {uploadFileStatus === "Pending" && (
                    <span className="text-secondary text-xs">
                      ({(file?.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  )}
                  {uploadFileStatus === "Successful" && (
                    <span className="ml-2 text-green-500">
                      (File successfully uploaded)
                    </span>
                  )}
                  {uploadFileStatus === "Pending" && (
                    <span className="ml-2 text-blue-500">(Uploading...)</span>
                  )}
                  {uploadFileStatus === "Failed" && (
                    <span className="text-xs text-red-600 mt-1">
                      Upload Failed
                    </span>
                  )}
                </span>
                {uploadFileStatus === "Pending" && (
                  <Progress value={progress} className="w-full h-2" />
                )}
              </div>
            </div>
            <div className="">
              {isSuccess && (
                <span className="text-xs text-green-600 mt-1">
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="border-none w-6 h-6 text-gray-500 hover:text-red-500"
                  onClick={handleReload}
                >
                  <RefreshCcw className="w-6 h-6" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
