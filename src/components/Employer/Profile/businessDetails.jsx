import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function BusinessDetails() {
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

  return (
    <div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tin">Tax Identification Number (TIN)</Label>
            <Input
              id="tin"
              value={formData.tin}
              onChange={(e) => handleInputChange("tin", e.target.value)}
              placeholder="Enter TIN"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxClearanceCertificate">
              Tax Clearance Certificate Number
            </Label>
            <Input
              id="taxClearanceCertificate"
              value={formData.taxClearanceCertificate}
              onChange={(e) =>
                handleInputChange("taxClearanceCertificate", e.target.value)
              }
              placeholder="Certificate number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxClearanceFile">
              Tax Clearance Certificate File
            </Label>
            <div className="flex items-center gap-2">
              <Label
                htmlFor="taxClearanceFile"
                className="cursor-pointer flex-1"
              >
                <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                  <Upload className="h-4 w-4" />
                  {files.taxClearanceCertificate
                    ? files.taxClearanceCertificate.name
                    : "Upload Certificate"}
                </div>
              </Label>
              <Input
                id="taxClearanceFile"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleFileUpload("taxClearanceCertificate", e.target.files[0])
                }
                className="hidden"
              />
              {files.taxClearanceCertificate && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile("taxClearanceCertificate")}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="namesOfDirectors">Names of Directors</Label>
          <Textarea
            id="namesOfDirectors"
            value={formData.namesOfDirectors}
            onChange={(e) =>
              handleInputChange("namesOfDirectors", e.target.value)
            }
            placeholder="List all company directors (one per line)"
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
