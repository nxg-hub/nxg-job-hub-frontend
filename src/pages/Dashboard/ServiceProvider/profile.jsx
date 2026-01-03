import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useServiceProviderProfileUpdate } from "@/hooks/Service-provider/serviceProviderHook";
import { useEffect, useState } from "react";
import { getLoggedInServiceProviderData } from "@/redux/ServiceProviderUserDataSlice";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import PersonalInfoTab from "./PersonalInfoTab";
import ExperienceTab from "./ExperienceTab";
import EducationTab from "./EducationTab";
import Skills from "./Skills";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";

import axios from "axios";

const subSkillsOptions = {
  CARPENTRY: ["Furniture Making", "Cabinetry", "Framing", "Finishing"],
  ELECTRICAL: ["Wiring", "Installation", "Repair", "Maintenance"],
  PLUMBING: ["Installation", "Repair", "Drainage", "Fixtures"],
  PAINTING: ["Interior Painting", "Exterior Painting", "Decorative Finishes"],
  MASONRY: ["Bricklaying", "Concrete Work", "Stonework"],
  WELDING: ["Arc Welding", "MIG Welding", "TIG Welding", "Fabrication"],
  OTHERS: [],
};
export default function ServiceProviderProfile() {
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));
  const dispatch = useDispatch();
  const { updateServiceProviderProfile, isLoading } =
    useServiceProviderProfileUpdate();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.UserDataReducer.data);
  // console.log(userData);
  const id = useSelector((state) => state.UserDataReducer.data.id);
  const isProfileComplete = userData?.serviceProvider?.subSkills;
  const phone = useSelector((state) => state.UserDataReducer.data.phoneNumber);
  const [workImages, setWorkImages] = useState([]);
  const [workLoading, setWorkLoading] = useState(false);
  const [workError, setWorkError] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({});
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceForm, setExperienceForm] = useState({
    jobTitle: "",
    companyName: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState(false);
  const [educationForm, setEducationForm] = useState({
    highestQualification: "",
    schoolName: "",
    schoolYear: "",
    schoolLocation: "",
    schoolDescription: "",
  });

  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState(
    userData?.serviceProvider?.subSkills || []
  );
  const [newSkill, setNewSkill] = useState("");

  //validations
  const validatePersonal = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!formData.phone) newErrors.phone = "Required";
    if (!formData.city) newErrors.city = "Required";
    if (!formData.state) newErrors.state = "Required";
    if (!formData.additionalInfo) newErrors.additionalInfo = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateExperience = () => {
    const newErrors = {};
    if (!experienceForm.jobTitle) newErrors.jobTitle = "Required";
    if (!experienceForm.companyName) newErrors.companyName = "Required";
    if (!experienceForm.employmentType) newErrors.employmentType = "Required";
    if (!experienceForm.startDate) newErrors.startDate = "Required";
    if (!experienceForm.endDate) newErrors.endDate = "Required";
    if (!experienceForm.location) newErrors.location = "Required";
    if (!experienceForm.description) newErrors.description = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEducation = () => {
    const newErrors = {};
    if (!educationForm.highestQualification)
      newErrors.highestQualification = "Required";
    if (!educationForm.schoolName) newErrors.schoolName = "Required";
    if (!educationForm.schoolYear) newErrors.schoolYear = "Required";
    if (!educationForm.schoolLocation) newErrors.schoolLocation = "Required";
    if (!educationForm.schoolDescription)
      newErrors.schoolDescription = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //SKILL UPDATE LOGIC
  // ✅ Determine available skills based on job title
  // useEffect(
  //   () => {
  //     const title =
  //       userData?.serviceProvider?.mainSkills &&
  //       userData?.serviceProvider?.mainSkills[0]?.toUpperCase();
  //     setAvailableSkills(subSkillsOptions[title] || subSkillsOptions.OTHERS);
  //   },
  //   [
  //     // userData?.jobTitle
  //   ]
  // );
  useEffect(() => {
    const title = userData?.serviceProvider?.mainSkills?.[0]?.toUpperCase();
    setAvailableSkills(subSkillsOptions[title] || subSkillsOptions.OTHERS);
  }, [userData?.serviceProvider?.mainSkills]);

  // ✅ Toggle select/remove skill
  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // ✅ Add a custom skill
  const handleAddCustomSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (!trimmedSkill || selectedSkills.includes(trimmedSkill)) return;
    setSelectedSkills([...selectedSkills, trimmedSkill]);
    setNewSkill("");
  };

  // ✅ Handle Enter key for adding new skill
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomSkill();
    }
  };

  // ✅ Save skills to backend
  const handleSaveSkills = async () => {
    if (!isProfileComplete) {
      navigate("/services-provider/complete-profile");
      return;
    }
    const payload = {
      subSkills: selectedSkills,
    };

    try {
      await updateServiceProviderProfile(payload); // your backend hook
      setShowEducationForm(false);
      dispatch(getLoggedInServiceProviderData({ token: token.authKey }));
      toast({
        title: "Success",
        description: "Service Provider Skills Updated Successfully!",
      });
    } catch (error) {
      console.error("Failed to Save Skills:", error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to Update Skills. Please try again.",
        variant: "destructive",
      });
    }
  };

  //EDUCATION UPDATE LOGIC
  // Save or update education
  const handleSaveEducation = async () => {
    if (!isProfileComplete) {
      navigate("/services-provider/complete-profile");
      return;
    }
    if (!validateEducation()) {
      return;
    }
    const payload = {
      education: { ...educationForm },
    };
    try {
      await updateServiceProviderProfile(payload); // your backend hook
      setShowEducationForm(false);
      dispatch(getLoggedInServiceProviderData({ token: token.authKey }));
      toast({
        title: "Success",
        description: "Service Provider Education updated successfully!",
      });
    } catch (error) {
      console.error("Failed to save education:", error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to Update Education. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete education
  const handleDeleteEducation = async () => {
    const payload = { education: null }; // clear the field
    try {
      await updateServiceProviderProfile(payload);
    } catch (error) {
      console.error("Failed to delete education:", error);
    }
  };

  //EXPERIENCE UPDATE LOGIC
  // When editing, prefill form
  useEffect(() => {
    if (editingExperience) {
      setExperienceForm(editingExperience);
    } else {
      setExperienceForm({
        jobTitle: "",
        companyName: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      });
    }
  }, [editingExperience]);

  const handleSaveExperience = async () => {
    if (!isProfileComplete) {
      navigate("/services-provider/complete-profile");
      return;
    }
    let updatedList = [];

    if (editingExperience) {
      // Update existing
      updatedList = userData.serviceProvider.workExperiences.map((exp) =>
        exp === editingExperience ? experienceForm : exp
      );
    } else {
      // Add new
      updatedList = [
        ...(userData.serviceProvider.workExperiences || []),
        experienceForm,
      ];
    }

    const payload = {
      ...userData.serviceProvider,
      workExperiences: updatedList,
    };
    if (!validateExperience()) {
      return;
    }
    try {
      await updateServiceProviderProfile(payload);
      setShowExperienceForm(false);
      setEditingExperience(null);
      dispatch(getLoggedInServiceProviderData({ token: token.authKey }));
      toast({
        title: "Success",
        description: "Service Provider Experience updated successfully!",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Update Failed",
        description:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to save experience. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteExperience = async (index) => {
    const updatedList = userData.serviceProvider.workExperiences.filter(
      (_, i) => i !== index
    );
    const payload = {
      ...userData.serviceProvider,
      workExperiences: updatedList,
    };

    try {
      await updateServiceProviderProfile(payload);
      toast({
        title: "Success",
        description: "Service Provider profile updated successfully!",
      });
      dispatch(getLoggedInServiceProviderData({ token: token.authKey }));
    } catch (err) {
      console.error(err);
      toast({
        title: "Update Failed",
        description:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to Delete Experience. Please try again.",
        variant: "destructive",
      });
    }
  };

  // PERSONAL UPDATE LOGIC
  // Prefill data when userData is loaded
  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        phone: phone || "",
        city: userData?.serviceProvider?.city || "",
        state: userData?.serviceProvider?.state || "",
        additionalInfo: userData?.serviceProvider?.additionalInfo || "",
      });
    }
  }, [userData, phone]);

  const handleSaveChanges = async () => {
    if (!isProfileComplete) {
      navigate("/services-provider/complete-profile");
      return;
    }
    if (!validatePersonal()) {
      return;
    }
    try {
      await updateServiceProviderProfile(formData);
      toast({
        title: "Success",
        description: "Service Provider profile updated successfully!",
      });
      dispatch(getLoggedInServiceProviderData({ token: token.authKey }));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Error updating profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    setWorkImages(userData?.serviceProvider?.picturesOfPreviousWorkDone || []);
  }, [userData?.serviceProvider?.picturesOfPreviousWorkDone]);

  // const uploadWorkImage = async (file) => {
  //   if (!file) return null;

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "tin4r1lt");

  //   const res = await axios.post(
  //     "https://api.cloudinary.com/v1_1/dildznazt/image/upload",
  //     formData,
  //     { headers: { "Content-Type": "multipart/form-data" } }
  //   );

  //   return res.data.secure_url; // return uploaded image URL
  // };

  const handleUploadWorkImages = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    setWorkLoading(true);
    setWorkError(false);

    try {
      // 1️⃣ Upload each file to Cloudinary
      const uploadedUrls = [];

      for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "tin4r1lt");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dildznazt/image/upload",
          formData
        );

        uploadedUrls.push(res.data.secure_url);
      }

      // 2️⃣ Merge new + existing images already saved
      const allImages = [...workImages, ...uploadedUrls];

      // 3️⃣ Update backend using ONLY your hook
      const body = {
        picturesOfPreviousWorkDone: allImages,
      };

      await updateServiceProviderProfile(body);

      // 4️⃣ Update UI
      setWorkImages(allImages);

      toast({
        title: "Success",
        description: "Work images uploaded successfully!",
      });

      dispatch(getLoggedInServiceProviderData({ token: token.authKey }));
    } catch (err) {
      console.error(err);
      setWorkError(true);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Could not upload work images.",
      });
    } finally {
      setWorkLoading(false);
    }
  };

  const handleRemoveWorkImage = async (imgUrl) => {
    const filtered = workImages.filter((img) => img !== imgUrl);

    try {
      // 1️⃣ Update backend using ONLY your hook
      const body = {
        picturesOfPreviousWorkDone: filtered,
      };

      await updateServiceProviderProfile(body);

      // 2️⃣ Update UI
      setWorkImages(filtered);

      toast({
        title: "Success",
        description: "Image removed.",
      });

      dispatch(getLoggedInServiceProviderData({ token: token.authKey }));
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Remove Failed",
        description: "Could not remove work image.",
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid !mb-[100px] md:!mb-0 grid-cols-2 md:grid-cols-5 w-full bg-[#E6F7FC]">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="works">Works</TabsTrigger>
        </TabsList>

        {/* PERSONAL INFORMATION */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <PersonalInfoTab
                isLoading={isLoading}
                errors={errors}
                formData={formData}
                setFormData={setFormData}
                handleSaveChanges={handleSaveChanges}
                userData={userData}
                token={token}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* EXPERIENCE */}
        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Work Experience</span>
                <Button
                  className="bg-sky-700 hover:bg-sky-800"
                  onClick={() => {
                    if (!isProfileComplete) {
                      navigate("/services-provider/complete-profile");
                      return;
                    }
                    setEditingExperience(null);
                    setShowExperienceForm(true);
                  }}>
                  Add Experience
                </Button>
              </CardTitle>
            </CardHeader>
            <ExperienceTab
              userData={userData}
              setEditingExperience={setEditingExperience}
              setShowExperienceForm={setShowExperienceForm}
              handleDeleteExperience={handleDeleteExperience}
              showExperienceForm={showExperienceForm}
              editingExperience={editingExperience}
              setExperienceForm={setExperienceForm}
              experienceForm={experienceForm}
              isLoading={isLoading}
              handleSaveExperience={handleSaveExperience}
              errors={errors}
            />
          </Card>
        </TabsContent>

        {/* EDUCATION */}
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Education</span>
                {/* <Button
                  className="bg-sky-700 hover:bg-sky-800"
                  onClick={() => {
                    if (!isProfileComplete) {
                      navigate("/services-provider/complete-profile");
                      return;
                    }
                    setEditingEducation(null);
                    setShowEducationForm(true);
                    setEducationForm({
                      highestQualification: "",
                      schoolName: "",
                      schoolYear: "",
                      schoolLocation: "",
                      schoolDescription: "",
                    });
                  }}>
                  Add Education
                </Button> */}
              </CardTitle>
            </CardHeader>

            <EducationTab
              userData={userData}
              setEditingEducation={setEditingEducation}
              setShowEducationForm={setShowEducationForm}
              setEducationForm={setEducationForm}
              handleDeleteEducation={handleDeleteEducation}
              errors={errors}
              showEducationForm={showEducationForm}
              editingEducation={editingEducation}
              handleSaveEducation={handleSaveEducation}
              educationForm={educationForm}
              isLoading={isLoading}
            />
          </Card>
        </TabsContent>

        {/* SKILLS */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>
                  Skills (
                  {userData?.serviceProvider?.mainSkills?.length
                    ? userData?.serviceProvider?.mainSkills[0]
                    : "No Job Title"}
                  )
                </span>

                <Button
                  disabled={isLoading}
                  className="bg-sky-700 hover:bg-sky-800"
                  onClick={handleSaveSkills}>
                  {isLoading ? "Processing..." : "Save Skills"}
                </Button>
              </CardTitle>
            </CardHeader>

            <Skills
              availableSkills={availableSkills}
              setNewSkill={setNewSkill}
              newSkill={newSkill}
              handleAddCustomSkill={handleAddCustomSkill}
              toggleSkill={toggleSkill}
              selectedSkills={selectedSkills}
              handleKeyDown={handleKeyDown}
            />
          </Card>
        </TabsContent>
        <TabsContent value="works">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col md:flex-row gap-2 justify-between items-center">
                <span className="text-2xl md:text-3xl">
                  Works (Photos of completed projects)
                </span>

                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleUploadWorkImages}
                  className="w-48 border p-1 cursor-pointer"
                />
              </CardTitle>
            </CardHeader>

            <CardContent>
              {workLoading && <p className="text-blue-500">Uploading...</p>}
              {workError && (
                <p className="text-red-500">Upload failed. Try again later.</p>
              )}

              {/* GALLERY */}

              <div className="mt-4">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={16}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                  }}>
                  {workImages.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative">
                        <img
                          src={img}
                          alt={`work-${index}`}
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => handleRemoveWorkImage(img)}
                          className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700">
                          X
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {!workImages.length && (
                <p className="text-gray-500 mt-4">
                  No work images uploaded yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
}
