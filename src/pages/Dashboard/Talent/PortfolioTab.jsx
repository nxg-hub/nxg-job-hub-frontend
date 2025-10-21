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
// import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";
// import { API_HOST_URL } from "@/utils/api/API_HOST";

// const PortfolioTab = ({ userData, token }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const [formData, setFormData] = useState({
//     portfolioLink: userData?.portfolioLink || "",
//     professionalCert: userData?.professionalCert || "",
//     resume: userData?.resume || "",
//     coverletter: userData?.coverletter || "",
//   });

//   // 🔹 Handle text change
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   // 🔹 Upload file handler
//   const handleFileUpload = async (e, field) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     const formDataToSend = new FormData();
//     formDataToSend.append("file", file);

//     try {
//       const res = await axios.post(
//         `${BASE_URL}api/v1/tech/upload-file`,
//         formDataToSend,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // assuming backend returns URL or file path
//       const uploadedUrl = res.data?.url || file.name;

//       setFormData((prev) => ({
//         ...prev,
//         [field]: uploadedUrl,
//       }));
//     } catch (error) {
//       console.error("File upload failed:", error);
//       alert("Failed to upload file.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // 🔹 Save to backend
//   const handleSave = async () => {
//     try {
//       await axios.put(
//         `${API_HOST_URL}api/v1/tech/update-portfolio`,
//         {
//           techId: userData.techId,
//           portfolioLink: formData.portfolioLink,
//           professionalCert: formData.professionalCert,
//           resume: formData.resume,
//           coverletter: formData.coverletter,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Portfolio updated successfully!");
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Update failed:", error);
//       alert("Failed to update portfolio.");
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
//                 disabled={uploading}
//                 className="bg-green-600 hover:bg-green-700 text-white">
//                 {uploading ? (
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
//           {/* 🟩 Portfolio Link */}
//           <div>
//             <Label>Portfolio Link</Label>
//             <Input
//               id="portfolioLink"
//               value={formData.portfolioLink}
//               onChange={handleChange}
//               placeholder="https://yourportfolio.com"
//               readOnly={!isEditing}
//             />
//           </div>

//           {/* 🟩 Certification Upload */}
//           <div>
//             <Label>Professional Certification</Label>
//             {!isEditing ? (
//               <div className="flex items-center gap-2 mt-1">
//                 <FileText className="text-gray-400" size={18} />
//                 <span className="truncate text-sm text-gray-700">
//                   {formData.professionalCert || "No file uploaded"}
//                 </span>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3 mt-2">
//                 <input
//                   id="cert-upload"
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={(e) => handleFileUpload(e, "professionalCert")}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="cert-upload"
//                   className="flex items-center gap-2 cursor-pointer text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-2">
//                   <Upload size={16} /> Upload File
//                 </label>
//                 {formData.professionalCert && (
//                   <div className="flex items-center gap-1 text-green-600 text-xs">
//                     <CheckCircle2 size={14} /> Uploaded
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* 🟩 Resume Upload */}
//           <div>
//             <Label>Resume</Label>
//             {!isEditing ? (
//               <div className="flex items-center gap-2 mt-1">
//                 <FileText className="text-gray-400" size={18} />
//                 <span className="truncate text-sm text-gray-700">
//                   {formData.resume || "No resume uploaded"}
//                 </span>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3 mt-2">
//                 <input
//                   id="resume-upload"
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={(e) => handleFileUpload(e, "resume")}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="resume-upload"
//                   className="flex items-center gap-2 cursor-pointer text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-2">
//                   <Upload size={16} /> Upload Resume
//                 </label>
//                 {formData.resume && (
//                   <div className="flex items-center gap-1 text-green-600 text-xs">
//                     <CheckCircle2 size={14} /> Uploaded
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* 🟩 Cover Letter Upload */}
//           <div>
//             <Label>Cover Letter</Label>
//             {!isEditing ? (
//               <div className="flex items-center gap-2 mt-1">
//                 <FileText className="text-gray-400" size={18} />
//                 <span className="truncate text-sm text-gray-700">
//                   {formData.coverletter || "No cover letter uploaded"}
//                 </span>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3 mt-2">
//                 <input
//                   id="cover-upload"
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={(e) => handleFileUpload(e, "coverletter")}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="cover-upload"
//                   className="flex items-center gap-2 cursor-pointer text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-2">
//                   <Upload size={16} /> Upload Cover Letter
//                 </label>
//                 {formData.coverletter && (
//                   <div className="flex items-center gap-1 text-green-600 text-xs">
//                     <CheckCircle2 size={14} /> Uploaded
//                   </div>
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
import { fetchLoggedInUser } from "@/redux/LoggedInUserSlice";
import { toast } from "@/hooks/use-toast";

const PortfolioTab = ({ userData, token }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    portfolioLink: userData?.portfolioLink || "",
    professionalCert: userData?.professionalCert || "",
    resume: userData?.resume || "",
    coverletter: userData?.coverletter || "",
  });

  // 🟩 Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 🟦 Upload file to Cloudinary
  const uploadFile = async (file, field) => {
    if (!file) return;
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    formDataToSend.append("upload_preset", "tin4r1lt"); // your Cloudinary preset

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dildznazt/auto/upload",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const fileUrl = res.data.secure_url;

      setFormData((prev) => ({
        ...prev,
        [field]: fileUrl,
      }));

      toast({
        title: "Upload successful ✅",
        description: `${file.name} uploaded successfully.`,
      });
    } catch (err) {
      console.error("❌ Upload failed:", err.message);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🟦 Save portfolio info to backend
  const handleSave = async () => {
    try {
      await axios.put(
        `   ${API_HOST_URL}/api/v1/tech-talent/${userData.techId}`,
        {
          techId: userData.techId,
          portfolioLink: formData.portfolioLink,
          professionalCert: formData.professionalCert,
          resume: formData.resume,
          coverletter: formData.coverletter,
        },
        {
          headers: { Authorization: ` ${token}` },
        }
      );
      toast({
        title: "Profile Updated",
        description: "Portfolio and certifications updated successfully.",
      });
      dispatch(fetchLoggedInUser("/api/v1/tech-talent/get-user"));
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not save portfolio info. Please try again.",
      });
    }
  };

  return (
    <TabsContent value="portfolio">
      <Card className="shadow-sm rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">
              Portfolio & Certifications
            </CardTitle>
            <CardDescription>
              Showcase your work and credentials
            </CardDescription>
          </div>

          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#0659a6] hover:bg-[#054884] text-white">
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white">
                {loading ? (
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
            </div>
          )}
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">
          {/* Portfolio Link */}
          <div>
            <Label>Portfolio Link</Label>
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

          {/* Professional Certification */}
          <div>
            <Label>Professional Certification</Label>
            {!isEditing ? (
              formData.professionalCert &&
              formData.professionalCert !== "None" ? (
                <a
                  href={formData.professionalCert}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
                  <FileText size={16} /> View Certification
                </a>
              ) : (
                <span className="text-gray-500 text-sm">No file uploaded</span>
              )
            ) : (
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="cert-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  onChange={(e) =>
                    uploadFile(e.target.files[0], "professionalCert")
                  }
                  className="hidden"
                />
                <label
                  htmlFor="cert-upload"
                  className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-2 text-sm">
                  <Upload size={16} /> Upload File
                </label>
                {loading && (
                  <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
                )}
              </div>
            )}
          </div>

          {/* Resume */}
          <div>
            <Label>Resume</Label>
            {!isEditing ? (
              formData.resume ? (
                <a
                  href={formData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
                  <FileText size={16} /> View Resume
                </a>
              ) : (
                <span className="text-gray-500 text-sm">
                  No resume uploaded
                </span>
              )
            ) : (
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => uploadFile(e.target.files[0], "resume")}
                  className="hidden"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-2 text-sm">
                  <Upload size={16} /> Upload Resume
                </label>
                {loading && (
                  <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
                )}
              </div>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <Label>Cover Letter</Label>
            {!isEditing ? (
              formData.coverletter ? (
                <a
                  href={formData.coverletter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 text-sm hover:underline">
                  <FileText size={16} /> View Cover Letter
                </a>
              ) : (
                <span className="text-gray-500 text-sm">
                  No cover letter uploaded
                </span>
              )
            ) : (
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="cover-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => uploadFile(e.target.files[0], "coverletter")}
                  className="hidden"
                />
                <label
                  htmlFor="cover-upload"
                  className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-3 py-2 text-sm">
                  <Upload size={16} /> Upload Cover Letter
                </label>
                {loading && (
                  <Loader2 className="animate-spin w-4 h-4 text-gray-600" />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PortfolioTab;
