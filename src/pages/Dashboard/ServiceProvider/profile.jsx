import {
  Briefcase,
  Calendar,
  CircleUser,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useServiceProviderProfileUpdate } from "@/hooks/Service-provider/serviceProviderHook";
import { useEffect, useState } from "react";
import { getUserData } from "@/redux/ServiceProviderUserDataSlice";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import InstitutionAutocomplete from "@/components/ServiceProvider/InstitutionAutocomplete";
import ProfilePhotoUploader from "@/components/ServiceProvider/ProfilePhotoUploader";
const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
  "Apprenticeship",
  "Temporary",
  "Self-employed",
];

const qualifications = [
  "High School Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Certification",
  // "Other",
];

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
  console.log(userData);
  const id = useSelector((state) => state.UserDataReducer.data.id);
  const isProfileComplete = userData.subSkills;
  const phone = useSelector((state) => state.UserDataReducer.data.phoneNumber);

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
    userData?.subSkills || []
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
  useEffect(
    () => {
      const title =
        userData?.mainSkills && userData?.mainSkills[0]?.toUpperCase();
      setAvailableSkills(subSkillsOptions[title] || subSkillsOptions.OTHERS);
    },
    [
      // userData?.jobTitle
    ]
  );

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
      dispatch(
        getUserData({ token: token.authKey, id: userData.serviceProviderId })
      );
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
      dispatch(
        getUserData({ token: token.authKey, id: userData.serviceProviderId })
      );
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
      updatedList = userData.workExperiences.map((exp) =>
        exp === editingExperience ? experienceForm : exp
      );
    } else {
      // Add new
      updatedList = [...(userData.workExperiences || []), experienceForm];
    }

    const payload = { ...userData, workExperiences: updatedList };
    if (!validateExperience()) {
      return;
    }
    try {
      await updateServiceProviderProfile(payload);
      setShowExperienceForm(false);
      setEditingExperience(null);
      dispatch(
        getUserData({ token: token.authKey, id: userData.serviceProviderId })
      );
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
    const updatedList = userData.workExperiences.filter((_, i) => i !== index);
    const payload = { ...userData, workExperiences: updatedList };

    try {
      await updateServiceProviderProfile(payload);
      toast({
        title: "Success",
        description: "Service Provider profile updated successfully!",
      });
      dispatch(
        getUserData({ token: token.authKey, id: userData.serviceProviderId })
      );
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
        city: userData?.city || "",
        state: userData?.state || "",
        additionalInfo: userData?.additionalInfo || "",
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
      dispatch(
        getUserData({ token: token.authKey, id: userData.serviceProviderId })
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description:
          err?.response?.data?.message ||
          err?.message ||
          "Error updating profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid mb-10 md:mb-0 grid-cols-2 md:grid-cols-4 w-full bg-[#E6F7FC]">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        {/* PERSONAL INFORMATION */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <ProfilePhotoUploader
                  userId={userData.serviceProviderId}
                  token={token}
                  userData={userData}
                />

                <div className="flex-1 grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        readOnly
                        id="firstName"
                        className={"cursor-not-allowed"}
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                      {errors?.firstName && (
                        <p className="text-red-500 text-xs">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        className={"cursor-not-allowed"}
                        readOnly
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastName: e.target.value,
                          })
                        }
                      />
                      {errors?.lastName && (
                        <p className="text-red-500 text-xs">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex">
                      <Mail className="mr-2 h-4 w-4 opacity-70 mt-3" />
                      <Input
                        id="email"
                        type="email"
                        className={"cursor-not-allowed"}
                        readOnly
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    {errors?.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex">
                      <Phone className="mr-2 h-4 w-4 opacity-70 mt-3" />
                      <Input
                        id="phone"
                        type="tel"
                        readOnly
                        className={"cursor-not-allowed"}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                      />
                      {errors?.phone && (
                        <p className="text-red-500 text-xs">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex">
                      <MapPin className="mr-2 h-4 w-4 opacity-70 mt-3" />
                      <Input
                        id="location"
                        className={"cursor-not-allowed"}
                        readOnly
                        value={`${formData.city}, ${formData.state}`}
                        onChange={(e) => {
                          const [city, state] = e.target.value
                            .split(",")
                            .map((s) => s.trim());
                          setFormData({ ...formData, city, state });
                        }}
                      />
                      {errors?.city && (
                        <p className="text-red-500 text-xs">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          additionalInfo: e.target.value,
                        })
                      }
                    />
                    {errors?.additionalInfo && (
                      <p className="text-red-500 text-xs">
                        {errors.additionalInfo}
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-fit bg-sky-500 hover:bg-sky-600 border-none"
                    onClick={handleSaveChanges}
                    disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
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
            <CardContent>
              <div className="space-y-6">
                {userData?.workExperiences?.length > 0 ? (
                  userData.workExperiences.map((item, i) => (
                    <div key={i} className="border-b pb-6 last:border-0">
                      <div className="flex gap-4">
                        <Briefcase className="h-10 w-10 text-sky-700" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {item.jobTitle}
                          </h3>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <span>{item.companyName}</span>
                            <span>•</span>
                            <span>{item.employmentType}</span>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4" />
                            <span>{`${formatDate(item.startDate)} - ${
                              item.endDate
                                ? formatDate(item.endDate)
                                : "Present"
                            }`}</span>
                            <span>•</span>
                            <MapPin className="h-4 w-4" />
                            <span>{item.location}</span>
                          </div>
                          <p className="mt-2">{item.description}</p>
                        </div>
                        <div className="flex-col md:flex gap-2 ">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingExperience(item);
                              setShowExperienceForm(true);
                            }}>
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isLoading}
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteExperience(i)}>
                            {"Delete"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No work experience added yet.
                  </p>
                )}
              </div>

              {/* Experience Form */}
              {showExperienceForm && (
                <div className="mt-6 p-4 border rounded-md bg-gray-50">
                  <h3 className="text-md font-semibold mb-4">
                    {editingExperience ? "Edit Experience" : "Add Experience"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Job Title</Label>
                      <Input
                        value={experienceForm.jobTitle}
                        placeholder={`e.g., Senior ${
                          userData.workExperiences
                            ? userData.workExperiences[0]?.jobTitle
                            : "Plumber"
                        }`}
                        onChange={(e) =>
                          setExperienceForm({
                            ...experienceForm,
                            jobTitle: e.target.value,
                          })
                        }
                      />
                      {errors?.jobTitle && (
                        <p className="text-red-500 text-xs">
                          {errors.jobTitle}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Company Name</Label>
                      <Input
                        placeholder="e.g., ABC Construction"
                        value={experienceForm.companyName}
                        onChange={(e) =>
                          setExperienceForm({
                            ...experienceForm,
                            companyName: e.target.value,
                          })
                        }
                      />
                      {errors?.companyName && (
                        <p className="text-red-500 text-xs">
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Employment Type</Label>
                      <select
                        className="w-full border rounded-md p-2 text-sm bg-background"
                        value={experienceForm.employmentType}
                        onChange={(e) =>
                          setExperienceForm({
                            ...experienceForm,
                            employmentType: e.target.value,
                          })
                        }>
                        <option value="">Select Employment Type</option>
                        {employmentTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors?.employmentType && (
                        <p className="text-red-500 text-xs">
                          {errors.employmentType}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        placeholder="e.g., Lagos, Nigeria"
                        value={experienceForm.location}
                        onChange={(e) =>
                          setExperienceForm({
                            ...experienceForm,
                            location: e.target.value,
                          })
                        }
                      />
                      {errors?.location && (
                        <p className="text-red-500 text-xs">
                          {errors.location}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={experienceForm.startDate}
                        onChange={(e) =>
                          setExperienceForm({
                            ...experienceForm,
                            startDate: e.target.value,
                          })
                        }
                      />
                      {errors?.startDate && (
                        <p className="text-red-500 text-xs">
                          {errors.startDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={experienceForm.endDate}
                        onChange={(e) =>
                          setExperienceForm({
                            ...experienceForm,
                            endDate: e.target.value,
                          })
                        }
                      />
                      {errors?.endDate && (
                        <p className="text-red-500 text-xs">{errors.endDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label>Description</Label>
                    <textarea
                      className="w-full min-h-[80px] border rounded-md p-2 text-sm"
                      value={experienceForm.description}
                      onChange={(e) =>
                        setExperienceForm({
                          ...experienceForm,
                          description: e.target.value,
                        })
                      }
                    />
                    {errors?.description && (
                      <p className="text-red-500 text-xs">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowExperienceForm(false);
                        setEditingExperience(null);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      disabled={isLoading}
                      className="bg-sky-600 hover:bg-sky-700 text-white"
                      onClick={handleSaveExperience}>
                      {!isLoading && editingExperience
                        ? "Update"
                        : !isLoading && !editingExperience
                        ? "Save"
                        : "Processing..."}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* EDUCATION */}
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Education</span>
                <Button
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
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Existing Education Display */}
              {userData?.education ? (
                <div className="border-b pb-6 last:border-0">
                  <div className="flex gap-4">
                    <GraduationCap className="h-10 w-10 text-sky-700" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {userData.education.highestQualification}
                      </h3>
                      <div className="text-sm text-gray-500">
                        {userData.education.schoolName}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>Graduated {userData.education.schoolYear}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        📍 {userData.education.schoolLocation}
                      </div>
                      <p className="mt-2">
                        {userData.education.schoolDescription}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingEducation(true);
                          setShowEducationForm(true);
                          setEducationForm(userData.education);
                        }}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteEducation()}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No education record found.</p>
              )}

              {/* Add/Edit Education Form */}
              {showEducationForm && (
                <div className="mt-6 p-4 border rounded-md bg-gray-50">
                  <h3 className="font-semibold mb-4">
                    {editingEducation ? "Edit Education" : "Add Education"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Highest Qualification</Label>
                      <select
                        className="w-full border rounded-md p-2 text-sm bg-white"
                        value={educationForm.highestQualification}
                        onChange={(e) =>
                          setEducationForm({
                            ...educationForm,
                            highestQualification: e.target.value,
                          })
                        }>
                        <option value="">Select Qualification</option>
                        {qualifications.map((q, index) => (
                          <option key={index} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                      {errors?.highestQualification && (
                        <p className="text-red-500 text-xs">
                          {errors.highestQualification}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>School Name</Label>
                      <InstitutionAutocomplete
                        value={educationForm.schoolName}
                        onChange={(value) =>
                          setEducationForm({
                            ...educationForm,
                            schoolName: value,
                          })
                        }
                      />
                      {errors?.schoolName && (
                        <p className="text-red-500 text-xs">
                          {errors.schoolName}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Graduation Year</Label>
                      <Input
                        type="text"
                        value={educationForm.schoolYear}
                        onChange={(e) =>
                          setEducationForm({
                            ...educationForm,
                            schoolYear: e.target.value,
                          })
                        }
                      />
                      {errors?.schoolYear && (
                        <p className="text-red-500 text-xs">
                          {errors.schoolYear}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>School Location</Label>
                      <Input
                        placeholder="Enter school location (City, State/Country)"
                        value={educationForm.schoolLocation}
                        onChange={(e) =>
                          setEducationForm({
                            ...educationForm,
                            schoolLocation: e.target.value,
                          })
                        }
                      />
                      {errors?.schoolLocation && (
                        <p className="text-red-500 text-xs">
                          {errors.schoolLocation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label>Description</Label>
                    <textarea
                      placeholder="Briefly describe your studies, achievements, or relevant coursework"
                      className="w-full min-h-[80px] border rounded-md p-2 text-sm"
                      value={educationForm.schoolDescription}
                      onChange={(e) =>
                        setEducationForm({
                          ...educationForm,
                          schoolDescription: e.target.value,
                        })
                      }
                    />
                    {errors?.schoolDescription && (
                      <p className="text-red-500 text-xs">
                        {errors.schoolDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowEducationForm(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-sky-700 hover:bg-sky-800 text-white"
                      onClick={() => handleSaveEducation()}>
                      {/* {editingEducation ? "Update" : "Save"} */}
                      {!isLoading && editingEducation
                        ? "Update"
                        : !isLoading && !editingEducation
                        ? "Save"
                        : "Processing..."}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SKILLS */}
        <TabsContent value="skills">
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Skills</span>
                <Button className="bg-sky-700 hover:bg-sky-800">
                  Add Skill
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userData?.subSkills?.map((skill, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {skill}
                    <button className="text-gray-500 hover:text-gray-700">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>
                  Skills (
                  {userData?.mainSkills?.length
                    ? userData.mainSkills[0]
                    : "No Job Title"}
                  )
                </span>

                <Button
                  className="bg-sky-700 hover:bg-sky-800"
                  onClick={handleSaveSkills}>
                  Save Skills
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Predefined Skills */}
              {availableSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {availableSkills.map((skill, i) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1 rounded-full border text-sm transition ${
                          isSelected
                            ? "bg-sky-600 text-white border-sky-600"
                            : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                        }`}>
                        {skill}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-3">
                  No predefined skills for this job title. Add custom skills
                  below.
                </p>
              )}

              {/* Custom Skill Input */}
              <div className="flex items-center gap-2 mb-4">
                <Input
                  placeholder="Add a custom skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button
                  onClick={handleAddCustomSkill}
                  className="bg-sky-500 hover:bg-sky-600 text-white">
                  Add
                </Button>
              </div>

              {/* Selected Skills Display */}
              <div className="flex flex-wrap gap-2">
                {selectedSkills.length > 0 ? (
                  selectedSkills.map((skill, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {skill}
                      <button
                        onClick={() => toggleSkill(skill)}
                        className="text-gray-500 hover:text-gray-700">
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No skills selected yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
}
