// import { useState } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { TabsContent } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Upload, FileText, Loader2, ExternalLink } from "lucide-react";
// import { API_HOST_URL } from "@/utils/api/API_HOST";
// import { useDispatch } from "react-redux";
// import { fetchLoggedInUser } from "@/redux/LoggedInUserSlice";
// import { toast } from "@/hooks/use-toast";
// import { fetchTalentData } from "@/redux/TalentUserDataSlice";

// const PortfolioTab = ({ userData, token }) => {
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     portfolioLink: userData?.portfolioLink || "",
//     professionalCert: userData?.professionalCert || "",
//     resume: userData?.resume || "",
//     coverletter: userData?.coverletter || "",
//   });

//   // 🟩 Handle input change
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   // 🟦 Upload file to Cloudinary
//   const uploadFile = async (file, field) => {
//     if (!file) return;
//     setLoading(true);

//     const formDataToSend = new FormData();
//     formDataToSend.append("file", file);
//     formDataToSend.append("upload_preset", "tin4r1lt"); // your Cloudinary preset

//     try {
//       const res = await axios.post(
//         "https://api.cloudinary.com/v1_1/dildznazt/auto/upload",
//         formDataToSend,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       const fileUrl = res.data.secure_url;

//       setFormData((prev) => ({
//         ...prev,
//         [field]: fileUrl,
//       }));

//       toast({
//         title: "Upload successful ✅",
//         description: `${file.name} uploaded successfully.`,
//       });
//     } catch (err) {
//       console.error("❌ Upload failed:", err.message);
//       toast({
//         variant: "destructive",
//         title: "Upload Failed",
//         description: "Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🟦 Save portfolio info to backend
//   const handleSave = async () => {
//     try {
//       await axios.put(
//         `   ${API_HOST_URL}/api/v1/tech-talent/${userData.techId}`,
//         {
//           techId: userData.techId,
//           portfolioLink: formData.portfolioLink,
//           professionalCert: formData.professionalCert,
//           resume: formData.resume,
//           coverletter: formData.coverletter,
//         },
//         {
//           headers: { Authorization: ` ${token.authKey}` },
//         }
//       );
//       toast({
//         title: "Profile Updated",
//         description: "Portfolio and certifications updated successfully.",
//       });
//       dispatch(fetchTalentData({ token: token.authKey }));
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Update failed:", error);
//       toast({
//         variant: "destructive",
//         title: "Update Failed",
//         description: "Could not save portfolio info. Please try again.",
//       });
//     }
//   };

//   return (
//     <TabsContent value="portfolio">
//       <Card className="shadow-sm rounded-2xl">
//         <CardHeader className="flex justify-between items-center">
//           <div>
//             <CardTitle className="text-lg">
//               Portfolio & Certifications
//             </CardTitle>
//             <CardDescription>
//               Showcase your work and credentials
//             </CardDescription>
//           </div>

//           {!isEditing ? (
//             <Button
//               onClick={() => setIsEditing(true)}
//               className="bg-[#0659a6] hover:bg-[#054884] text-white">
//               Edit
//             </Button>
//           ) : (
//             <div className="flex gap-2">
//               <Button
//                 onClick={handleSave}
//                 disabled={loading}
//                 className="bg-green-600 hover:bg-green-700 text-white">
//                 {loading ? (
//                   <Loader2 className="animate-spin w-4 h-4" />
//                 ) : (
//                   "Save"
//                 )}
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setIsEditing(false);
//                   setFormData({
//                     portfolioLink: userData?.portfolioLink || "",
//                     professionalCert: userData?.professionalCert || "",
//                     resume: userData?.resume || "",
//                     coverletter: userData?.coverletter || "",
//                   });
//                 }}>
//                 Cancel
//               </Button>
//             </div>
//           )}
//         </CardHeader>

//         <CardContent className="grid gap-6 md:grid-cols-2">
//           {/* Portfolio Link */}
//           <div>
//             <Label>Portfolio Link</Label>
//             <Input
//               id="portfolioLink"
//               value={formData.portfolioLink}
//               onChange={handleChange}
//               placeholder="https://yourportfolio.com"
//               readOnly={!isEditing}
//             />
//             {formData.portfolioLink && (
//               <a
//                 href={formData.portfolioLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 text-sm flex items-center gap-1 mt-1 hover:underline">
//                 <ExternalLink size={14} /> View Portfolio
//               </a>
//             )}
//           </div>

//           {/* Professional Certification */}
//           <div>
//             <Label>Professional Certification</Label>
//             {!isEditing ? (
//               formData.professionalCert &&
//               formData.professionalCert !== "None" ? (
//                 <a
//                   href={formData.professionalCert}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
//                   <FileText size={16} /> View Certification
//                 </a>
//               ) : (
//                 <span className="text-gray-500 text-sm">No file uploaded</span>
//               )
//             ) : (
//               <div className="mt-2 flex items-center gap-3">
//                 <input
//                   id="cert-upload"
//                   type="file"
//                   accept=".pdf,.doc,.docx,.png,.jpg"
//                   onChange={(e) =>
//                     uploadFile(e.target.files[0], "professionalCert")
//                   }
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="cert-upload"
//                   className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-2 text-sm">
//                   <Upload size={16} /> Upload File
//                 </label>
//                 {loading && (
//                   <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Resume */}
//           <div>
//             <Label>Resume</Label>
//             {!isEditing ? (
//               formData.resume ? (
//                 <a
//                   href={formData.resume}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
//                   <FileText size={16} /> View Resume
//                 </a>
//               ) : (
//                 <span className="text-gray-500 text-sm">
//                   No resume uploaded
//                 </span>
//               )
//             ) : (
//               <div className="mt-2 flex items-center gap-3">
//                 <input
//                   id="resume-upload"
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={(e) => uploadFile(e.target.files[0], "resume")}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="resume-upload"
//                   className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-2 text-sm">
//                   <Upload size={16} /> Upload Resume
//                 </label>
//                 {loading && (
//                   <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Cover Letter */}
//           <div>
//             <Label>Cover Letter</Label>
//             {!isEditing ? (
//               formData.coverletter ? (
//                 <a
//                   href={formData.coverletter}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
//                   <FileText size={16} /> View Cover Letter
//                 </a>
//               ) : (
//                 <span className="text-gray-500 text-sm">
//                   No cover letter uploaded
//                 </span>
//               )
//             ) : (
//               <div className="mt-2 flex items-center gap-3">
//                 <input
//                   id="cover-upload"
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={(e) => uploadFile(e.target.files[0], "coverletter")}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="cover-upload"
//                   className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-2 text-sm">
//                   <Upload size={16} /> Upload Cover Letter
//                 </label>
//                 {loading && (
//                   <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
//                 )}
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </TabsContent>
//   );
// };

// export default PortfolioTab;

import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, ExternalLink } from "lucide-react";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { fetchTalentData } from "@/redux/TalentUserDataSlice";

const PortfolioTab = ({ userData, token }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState({
    professionalCert: false,
    resume: false,
    coverletter: false,
  });

  const [formData, setFormData] = useState({
    portfolioLink: userData?.portfolioLink || "",
    professionalCert: userData?.professionalCert || "",
    resume: userData?.resume || "",
    coverletter: userData?.coverletter || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const uploadFile = async (file, field) => {
    if (!file) return;

    setLoadingFiles((prev) => ({ ...prev, [field]: true }));

    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    formDataToSend.append("upload_preset", "tin4r1lt");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dildznazt/auto/upload",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setFormData((prev) => ({ ...prev, [field]: res.data.secure_url }));

      toast({
        title: "Upload Successful ✅",
        description: `${file.name} uploaded successfully.`,
      });
    } catch (err) {
      console.error("Upload failed:", err);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Please try again later.",
      });
    } finally {
      setLoadingFiles((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${API_HOST_URL}/api/v1/tech-talent/${userData.techId}`,
        {
          techId: userData.techId,
          portfolioLink: formData.portfolioLink,
          professionalCert: formData.professionalCert,
          resume: formData.resume,
          coverletter: formData.coverletter,
        },
        {
          headers: { Authorization: `${token.authKey}` },
        }
      );

      toast({
        title: "Profile Updated",
        description: "Portfolio and certifications updated successfully.",
      });

      dispatch(fetchTalentData({ token: token.authKey }));
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not save portfolio info. Please try again.",
      });
    }
  };

  const renderFileUpload = (label, field, accept) => (
    <div>
      <Label className="font-medium">{label}</Label>
      {!isEditing ? (
        formData[field] ? (
          <a
            href={formData[field]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 text-sm hover:underline mt-1">
            <FileText size={16} /> View {label}
          </a>
        ) : (
          <span className="text-gray-500 text-sm mt-1">No file uploaded</span>
        )
      ) : (
        <div className="mt-2 flex items-center gap-3">
          <input
            id={`${field}-upload`}
            type="file"
            accept={accept}
            onChange={(e) => uploadFile(e.target.files[0], field)}
            className="hidden"
          />
          <label
            htmlFor={`${field}-upload`}
            className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-2 text-sm transition">
            <Upload size={16} /> Upload {label}
          </label>
          {loadingFiles[field] && (
            <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
          )}
        </div>
      )}
    </div>
  );

  return (
    <TabsContent value="portfolio">
      <Card className="shadow-lg rounded-2xl border border-gray-100">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Portfolio & Certifications
            </CardTitle>
            <CardDescription className="text-gray-500 mt-1">
              Showcase your work and credentials
            </CardDescription>
          </div>

          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white">
                Edit
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  disabled={Object.values(loadingFiles).some(Boolean)}
                  className="bg-green-600 hover:bg-green-700 text-white">
                  {Object.values(loadingFiles).some(Boolean) ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      portfolioLink: userData?.portfolioLink || "",
                      professionalCert: userData?.professionalCert || "",
                      resume: userData?.resume || "",
                      coverletter: userData?.coverletter || "",
                    });
                  }}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">
          {/* Portfolio Link */}
          <div>
            <Label className="font-medium">Portfolio Link</Label>
            <Input
              id="portfolioLink"
              value={formData.portfolioLink}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
              readOnly={!isEditing}
            />
            {formData.portfolioLink && (
              <a
                href={formData.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm flex items-center gap-1 mt-1 hover:underline">
                <ExternalLink size={14} /> View Portfolio
              </a>
            )}
          </div>

          {/* File Uploads */}
          {renderFileUpload(
            "Professional Certification",
            "professionalCert",
            ".pdf,.doc,.docx,.png,.jpg"
          )}
          {renderFileUpload("Resume", "resume", ".pdf,.doc,.docx")}
          {renderFileUpload("Cover Letter", "coverletter", ".pdf,.doc,.docx")}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PortfolioTab;
