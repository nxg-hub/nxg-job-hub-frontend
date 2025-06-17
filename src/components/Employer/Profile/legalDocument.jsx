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
import { FileText, Upload, X } from "lucide-react";
import { useState } from "react";

export default function LegalDocument({ formData, updateFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        updateFormData({
          [name]: base64String,
          [`${name}FileName`]: file.name,
        });
      };
      reader.onerror = (error) => {
        console.error("Error reading file", error);
        updateFormData({
          [name]: null,
          [`${name}FileName`]: "",
        });
      };
      reader.readAsDataURL(file);
    } else {
      updateFormData({
        [name]: null,
        [`${name}FileName`]: "",
      });
    }
  };

  const removeFile = (fileName) => {
    updateFormData({
      [fileName]: "",
      [`${fileName}FileName`]: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tin">Tax Clearance Number(TIN)</Label>
        <Input
          id="tin"
          name="tin"
          value={formData.tin}
          onChange={handleInputChange}
          placeholder="CAC registration number"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="taxClearanceCertificate">
            Tax Clearance Certificate
          </Label>
          <div className="py-5 flex items-center justify-center gap-2 rounded-xl shadow">
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-10 w-10 text-gray-400" />
              <p className="font-medium text-sm text-gray-500">
                Choose a file for your TIN certificate
              </p>
              {formData.taxClearanceCertificate ? (
                <div className=" flex items-center justify-center  gap-2">
                  <p className="w-1/2 text-xs truncate">
                    {formData.taxClearanceCertificateFileName}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          onClick={() => removeFile("taxClearanceCertificate")}
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
                htmlFor="taxClearanceCertificate"
                className="cursor-pointer flex-1"
              >
                <div className="w-fit flex items-center gap-2 rounded-md bg-cyan-500 text-white px-3 py-2 text-sm hover:bg-cyan-600">
                  <Upload className="h-4 w-4" />
                  Upload
                </div>
              </Label>

              <Input
                id="taxClearanceCertificate"
                name="taxClearanceCertificate"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
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
              {formData.caccertificate ? (
                <div className=" flex items-center justify-center  gap-2">
                  <p className="w-1/2 text-xs truncate">
                    {formData.caccertificateFileName}
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
              <Label htmlFor="caccertificate" className="cursor-pointer flex-1">
                <div className="w-fit flex items-center gap-2 rounded-md bg-cyan-500 text-white px-3 py-2 text-sm hover:bg-cyan-600">
                  <Upload className="h-4 w-4" />
                  Upload
                </div>
              </Label>

              <Input
                id="caccertificate"
                name="caccertificate"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="namesOfDirectors">Number of Directors</Label>
        <Textarea
          id="namesOfDirectors"
          value={formData.namesOfDirectors}
          onChange={handleInputChange}
          placeholder="Enter company Director's name"
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyMemorandum">Company Memorandum File</Label>
        <div className="py-5 flex items-center justify-center gap-2 rounded-xl shadow">
          <div className="flex flex-col items-center gap-2">
            <FileText className="h-10 w-10 text-gray-400" />
            <p className="font-medium text-sm text-gray-500">
              Choose company memorandum file
            </p>
            {formData.companyMemorandum ? (
              <div className=" flex items-center justify-center  gap-2">
                <p className="w-1/2 text-xs truncate">
                  {formData.companyMemorandumFileName}
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        onClick={() => removeFile("companyMemorandum")}
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
              htmlFor="companyMemorandum"
              className="cursor-pointer flex-1"
            >
              <div className="w-fit flex items-center gap-2 rounded-md bg-cyan-500 text-white px-3 py-2 text-sm hover:bg-cyan-600">
                <Upload className="h-4 w-4" />
                Upload
              </div>
            </Label>

            <Input
              id="companyMemorandum"
              name="companyMemorandum"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
