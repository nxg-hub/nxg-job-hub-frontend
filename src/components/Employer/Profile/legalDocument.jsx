import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { File, FileText, Upload, X } from "lucide-react";
import { useState } from "react";

export default function LegalDocument() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    position: "",
    companyAddress: "",
    companyPhone: "",
    companyWebsite: "",
    country: "",
    industryType: "",
    companySize: "",
    jobBoard: "",
    address: "",
    nationality: "",
    state: "",
    zipCode: "",
    companyZipCode: "",
    vacancies: "",
    taxClearanceCertificate: "",
    namesOfDirectors: "",
    companyMemorandum: "",
    caccertificate: "",
    tin: "",
  });

  const [files, setFiles] = useState({
    profilePicture: null,
    taxClearanceCertificate: null,
    caccertificate: null,
    companyMemorandum: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [field]: file,
      }));

      if (field === "profilePicture") {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const removeFile = (field) => {
    setFiles((prev) => ({
      ...prev,
      [field]: null,
    }));

    if (field === "profilePicture") {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { formData, files });
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="caccertificate">Tax Clearance Number(TIN)</Label>
        <Input
          id="caccertificate"
          value={formData.caccertificate}
          onChange={(e) => handleInputChange("caccertificate", e.target.value)}
          placeholder="CAC registration number"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="caccertificateFile">Tax Clearance Certificate</Label>
          <div className="py-5 flex items-center justify-center gap-2 rounded-xl shadow">
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-10 w-10 text-gray-400" />
              <p className="font-medium text-sm text-gray-500">
                Choose a file for your TIN certificate
              </p>
              {files.caccertificate ? (
                <div className=" flex items-center justify-center  gap-2">
                  <p className="w-1/2 text-xs truncate">
                    {files.caccertificate.name}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          onClick={() => removeFile("caccertificate")}
                          className="mt-2 h-4 w-4 p-0 text-sm border-transparent bg-red-400 hover:bg-red-500"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : null}
              <Label
                htmlFor="caccertificateFile"
                className="cursor-pointer flex-1"
              >
                <div className="w-fit flex items-center gap-2 rounded-md bg-cyan-500 text-white px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <Upload className="h-4 w-4" />
                  Upload
                </div>
              </Label>

              <Input
                id="caccertificateFile"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileUpload("caccertificate", e.target.files[0])
                }
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="caccertificateFile">CAC Certificate</Label>
          <div className="py-5 flex items-center justify-center gap-2 rounded-xl shadow">
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-10 w-10 text-gray-400" />
              <p className="font-medium text-sm text-gray-500">
                Choose a file for your CAC certificate
              </p>
              {files.caccertificate ? (
                <div className=" flex items-center justify-center  gap-2">
                  <p className="w-1/2 text-xs truncate">
                    {files.caccertificate.name}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          onClick={() => removeFile("caccertificate")}
                          className="mt-2 h-4 w-4 p-0 text-sm border-transparent bg-red-400 hover:bg-red-500"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : null}
              <Label
                htmlFor="caccertificateFile"
                className="cursor-pointer flex-1"
              >
                <div className="w-fit flex items-center gap-2 rounded-md bg-cyan-500 text-white px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <Upload className="h-4 w-4" />
                  Upload
                </div>
              </Label>

              <Input
                id="caccertificateFile"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileUpload("caccertificate", e.target.files[0])
                }
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyMemorandum">Number of Directors</Label>
        <Textarea
          id="companyMemorandum"
          value={formData.companyMemorandum}
          onChange={(e) =>
            handleInputChange("companyMemorandum", e.target.value)
          }
          placeholder="Company memorandum details or reference number"
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="caccertificateFile">Company Memorandum File</Label>
        <div className="py-5 flex items-center justify-center gap-2 rounded-xl shadow">
          <div className="flex flex-col items-center gap-2">
            <FileText className="h-10 w-10 text-gray-400" />
            <p className="font-medium text-sm text-gray-500">
              Choose company memorandum file
            </p>
            {files.caccertificate ? (
              <div className=" flex items-center justify-center  gap-2">
                <p className="w-1/2 text-xs truncate">
                  {files.caccertificate.name}
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        onClick={() => removeFile("caccertificate")}
                        className="mt-2 h-4 w-4 p-0 text-sm border-transparent bg-red-400 hover:bg-red-500"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove file</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : null}
            <Label
              htmlFor="caccertificateFile"
              className="cursor-pointer flex-1"
            >
              <div className="w-fit flex items-center gap-2 rounded-md bg-cyan-500 text-white px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                <Upload className="h-4 w-4" />
                Upload
              </div>
            </Label>

            <Input
              id="caccertificateFile"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) =>
                handleFileUpload("caccertificate", e.target.files[0])
              }
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
