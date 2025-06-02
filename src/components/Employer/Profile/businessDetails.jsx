import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useState } from "react";

const BusinessDetails = () => {
  const tittleStyle = cn("text-gray-800 text-sm font-medium");
  const infoStyle = cn(
    "text-gray-400 text-sm rounded border-[1px] border-gray-200 p-2"
  );
  return (
    <div className="space-y-8">
      <div className="w-full flex items-center justify-evenly gap-7">
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Tax Identification Number (TIN):</p>
          <p className={infoStyle}>Adewaleking academy</p>
        </div>
        <div className="w-1/2 space-y-3">
          <p className={tittleStyle}>Tax Clearance Certificate Number:</p>
          <p className={infoStyle}>Adewaleking</p>
        </div>
      </div>
      <div className="w-1/2 space-y-3">
        <p className={tittleStyle}>Tax Clearance Certificate File:</p>
        <p className={cn(infoStyle, "h-36 leading-relaxed p-4")}>
          Experienced recruitment agent with over 8 years of experience
          connecting top talent with leading companies. Specializing in tech and
          creative industries, I pride myself on understanding both client needs
          and candidate aspirations to create lasting professional
          relationships.
        </p>
      </div>

      <div className="w-full space-y-3">
        <p className={tittleStyle}>Names of Directors:</p>
        <p className={cn(infoStyle, "h-36 leading-relaxed p-4")}>
          Adewaleking academy
        </p>
      </div>
    </div>
  );
};

const EditBusinessDetails = () => {
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
      {/* <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Business Details
                  </CardTitle>
                  <CardDescription>
                    Business registration and tax information
                  </CardDescription>
                </CardHeader> */}
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
};

export { BusinessDetails, EditBusinessDetails };
