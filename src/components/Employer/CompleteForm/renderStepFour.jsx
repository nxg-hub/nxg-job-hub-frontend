import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CircleCheckBig, FileText } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import axios from "axios";

const FILE_OPTIONS = [
  {
    label: "Tax Clearance Certificate",
    value: "taxClearanceCertificate",
  },
  { label: "CAC Certificate", value: "CACCertificate" },
  { label: "Company Memorandum", value: "companyMemorandum" },
];

const fileUploadingStatus = Object.freeze({
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  FAILED: "FAILED",
  SUCCESSFUL: "SUCCESSFUL",
});

export default function RenderStepFour() {
  // Use the custom hook for Cloudinary upload
  const { control, setValue, getValues, formState } = useFormContext();

  const [countFilesUploaded, setCountFilesUploaded] = useState(1);
  const [selectedFileOption, setSelectedFileOption] = useState(null);
  const [fileUploadindDetails, setFileUploadingDetails] = useState({
    fileSize: "",
    uploadStatus: fileUploadingStatus.PENDING,
    uploadingMessage: "",
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isFileOptionSelected, setIsFileOptionSelected] = useState(false);

  const {
    mutate: uploadFileToCloudinary,
    progress,
    data: cloudinaryResponse,
  } = useCloudinaryUpload({
    onSuccess: (cloudinaryData) => {
      console.log(cloudinaryData?.secure_url);
      setCountFilesUploaded((prev) => prev + 1);
      setValue(selectedFileOption.value, cloudinaryData?.secure_url, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setSelectedFileOption(null);
      setIsFileOptionSelected(false);
      setFileUploadingDetails({
        fileSize: "",
        uploadingMessage: "",
        uploadStatus: fileUploadingStatus.PENDING,
      });
    },
    onError: (err) => {
      console.error("Upload error:", err);
      setFileUploadingDetails((prev) => ({
        ...prev,
        uploadingMessage: "(Failed to upload)",
        uploadStatus: fileUploadingStatus.FAILED,
      }));

      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Server error:</span>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                {err.response.data}
              </p>
            ),
          });
        } else if (err.request) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Network error:</span>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                File uploading failed, please check your internet connection.
              </p>
            ),
          });
        }
      } else {
        toast({
          className: cn(
            "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
          ),
          title: <span className="text-red-900">Failed:</span>,
          description: (
            <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
              File uploading failed, please try again.
            </p>
          ),
        });
      }
    },
  });

  const handleSelectionChange = (val) => {
    setIsFileOptionSelected(true);
    setSelectedFileOption(FILE_OPTIONS.find((f) => f.value === val));
  };

  const handleFileChange = (event) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    const file = event.target.files[0];

    if (file.size > MAX_FILE_SIZE) {
      setFileUploadingDetails({
        fileSize: "",
        uploadStatus: fileUploadingStatus.FAILED,
        uploadingMessage: "File size must be less than 10MB",
      });
      return;
    } else if (file.type !== "application/pdf") {
      setFileUploadingDetails({
        fileSize: "",
        uploadStatus: fileUploadingStatus.FAILED,
        uploadingMessage: "Only PDF files are allowed",
      });
      return;
    } else {
      setFileUploadingDetails({
        uploadStatus: fileUploadingStatus.IN_PROGRESS,
        fileSize: `${(file?.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadingMessage: "(Uploading...)",
      });
      uploadFileToCloudinary(file);
    }
  };

  return (
    <div className="space-y-5 md:space-y-8">
      <div className="hidden md:flex flex-col gap-1">
        <h1 className="font-semibold text-xl text-slate-800">
          Legal & Documents
        </h1>
        <p className="text-sm text-gray-600">
          Your organization/company legal documents for account verification.
        </p>
      </div>
      <div className="md:hidden">
        <h1 className="text-sm font-semibold text-secondary">
          Step 4 (Legal & Documents)
        </h1>
        <p className="text-xs text-gray-600">
          Your organization/company legal documents for account verification.
        </p>
      </div>
      <div className="space-y-3">
        <FormField
          control={control}
          name="tin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">
                Tax Identification Number (TIN)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Tatx ID Number"
                  className="text-sm h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="-space-y-3.5">
          <h3 className="text-slate-800 text-sm md:text-base font-medium pb-3 pt-4">
            Upload Documents
          </h3>
          <p className="text-gray-400 text-xs md:text-sm">
            Select file type to upload your document
          </p>
        </div>
        <div className="border rounded-lg">
          {isFileOptionSelected && (
            <div className="flex gap-2 p-4">
              <img
                src={pdfIcon}
                alt="pdf-file"
                className="object-contain w-12 h-12"
              />
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className=" -space-y-0.5 mr-auto">
                    <p className="font-semibold">{selectedFileOption?.label}</p>
                    <p
                      className={cn(
                        `${
                          fileUploadindDetails.uploadStatus ===
                          fileUploadingStatus.FAILED
                            ? "text-red-500"
                            : fileUploadindDetails.uploadStatus ===
                              fileUploadingStatus.IN_PROGRESS
                            ? "text-secondary"
                            : "text-green-700"
                        }`,
                        "text-sm"
                      )}
                    >
                      {fileUploadindDetails?.fileSize}{" "}
                      {fileUploadindDetails?.uploadingMessage}
                    </p>
                  </div>
                  <div>
                    <Label
                      htmlFor="selectOption"
                      className={cn(
                        `${
                          fileUploadindDetails?.uploadStatus ===
                          fileUploadingStatus.IN_PROGRESS
                            ? "cursor-not-allowed"
                            : "cursor-pointer transition-colors duration-200 text-secondary"
                        }`,
                        " "
                      )}
                    >
                      <Button className="bg-sky-50" variant="outline" asChild>
                        <span>Select File</span>
                      </Button>
                      <Input
                        id="selectOption"
                        type="file"
                        className="hidden sr-only"
                        onChange={handleFileChange}
                        accept="application/pdf"
                        disabled={
                          fileUploadindDetails.uploadStatus ===
                          fileUploadingStatus.IN_PROGRESS
                        }
                      />
                    </Label>
                  </div>
                </div>
                {fileUploadindDetails.uploadStatus ===
                  fileUploadingStatus.IN_PROGRESS && (
                  <Progress value={progress} className="w-full h-2" />
                )}
              </div>
            </div>
          )}
          <div className="w-full flex justify-between md:justify-center  md:gap-3 gap-4 bg-gray-50 rounded-b-lg md:p-4 px-2">
            <div className="md:w-2/3 flex space-x-3 md:space-x-0">
              <div className="md:w-1/3 text-gray-600 flex items-center gap-1">
                <FileText className="w-5 h-5" />
                <p className="text-xs md:text-sm">File Type:</p>
              </div>
              <div className="pt-3 md:w-2/3">
                <Select
                  onValueChange={handleSelectionChange}
                  key={countFilesUploaded}
                >
                  <SelectTrigger
                    className="text-xs h-11 md:text-sm"
                    id="file-type-select"
                  >
                    <SelectValue placeholder="Choose document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {!formState.dirtyFields.taxClearanceCertificate && (
                      <SelectItem value="taxClearanceCertificate">
                        Tax Clearance Certificate
                      </SelectItem>
                    )}
                    {!formState.dirtyFields.CACCertificate && (
                      <SelectItem value="CACCertificate">
                        CAC Certificate
                      </SelectItem>
                    )}
                    {!formState.dirtyFields.companyMemorandum && (
                      <SelectItem value="companyMemorandum">
                        Company Memorandum
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {formState.dirtyFields.taxClearanceCertificate && (
          <div className="bg-green-50 text-sm text-green-700 rounded-lg border-[1px] flex items-center gap-3 p-3">
            <span>Tax Clearance Certificate</span> {"(uploaded)"}{" "}
            <CircleCheckBig className="h-4 w-4" />
          </div>
        )}
        {formState.dirtyFields.CACCertificate && (
          <div className="bg-green-50 text-sm text-green-700 rounded-lg border-[1px] flex items-center gap-3 p-3">
            <span>CAC Certificate</span> {"(uploaded)"}{" "}
            <CircleCheckBig className="h-4 w-4" />
          </div>
        )}
        {formState.dirtyFields.companyMemorandum && (
          <div className="bg-green-50 text-sm text-green-700 rounded-lg border-[1px] flex items-center  gap-3 p-3">
            <span>Company Memorandum</span> {"(uploaded)"}{" "}
            <CircleCheckBig className="h-4 w-4" />
          </div>
        )}
      </div>

      <div>
        {/* Global Error Display for dynamic arrays */}
        {(formState.errors.taxClearanceCertificate ||
          formState.errors.CACCertificate ||
          formState.errors.companyMemorandum) && (
          <div className="text-red-500 text-sm mt-4 p-2 border border-red-300 bg-red-50 rounded-lg space-y-3">
            <p>{formState.errors.taxClearanceCertificate?.message}</p>
            <p>{formState.errors.CACCertificate?.message}</p>
            <p>{formState.errors.companyMemorandum?.message}</p>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-500 rounded-lg py-4 md:w-4/5 px-2 mx-auto">
        <div className="flex gap-3 justify-center">
          <AlertCircle className="w-5 h-5 text-yellow-800 mt-0.5" />
          <p className="md:text-sm text-xs font-medium text-yellow-800 mb-1">
            Only PDF file format are allowed, and file must be 10MB or less
          </p>
        </div>
      </div>
    </div>
  );
}
