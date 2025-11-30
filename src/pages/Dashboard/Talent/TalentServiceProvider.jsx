import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProviders } from "@/redux/TalentServiceProviderSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TalentServiceProviderRequestButton from "./components/TalentServiceProviderRequestButton";
import { JobCardSkeleton } from "@/components/job-card-skeleton";
import { Toaster } from "@/components/ui/toaster";

const TalentServiceProvider = () => {
  const dispatch = useDispatch();
  const providers = useSelector(
    (state) => state.TalentServiceProvider.allServicesProviders
  );
  const loading = useSelector((state) => state.TalentServiceProvider.loading);
  const error = useSelector((state) => state.TalentServiceProvider.error);
  const success = useSelector((state) => state.TalentServiceProvider.success);

  const [searchTerm, setSearchTerm] = useState("");
  const [mainSkillFilter, setMainSkillFilter] = useState("");
  const [subSkillFilter, setSubSkillFilter] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentProviderImages, setCurrentProviderImages] = useState([]);

  useEffect(() => {
    if (!success) {
      dispatch(fetchAllProviders());
    }
  }, []);

  const verifiedProviders = providers.filter((p) => p.verified);

  const filteredProviders = verifiedProviders?.filter((p) => {
    const location = `${p.state} `.toLowerCase();
    const city = `${p.city} `.toLowerCase();

    const matchName =
      location.includes(searchTerm.toLowerCase()) ||
      city.includes(searchTerm.toLowerCase());

    const matchMainSkill = mainSkillFilter
      ? p.mainSkills?.some((skill) =>
          skill.toLowerCase().includes(mainSkillFilter.toLowerCase())
        )
      : true;

    const matchSubSkill = subSkillFilter
      ? p.subSkills?.some((skill) =>
          skill.toLowerCase().includes(subSkillFilter.toLowerCase())
        )
      : true;

    return matchName && matchMainSkill && matchSubSkill;
  });

  const openImage = (images, index) => {
    setCurrentProviderImages(images);
    setSelectedImageIndex(index);
    setOpenPreview(true);
  };

  const showPrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : currentProviderImages.length - 1
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev < currentProviderImages.length - 1 ? prev + 1 : 0
    );
  };
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!loading && error) {
    return (
      <p className="text-center text-red-500 mt-6">
        Failed to fetch service providers
      </p>
    );
  }

  return (
    <div className="mx-auto px-6 py-6 space-y-6">
      {/* SEARCH + FILTERS */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Input
          placeholder="Search by location..."
          className="w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Input
          placeholder="Filter by main skill"
          list="mainSkills"
          className="w-full md:w-1/4"
          value={mainSkillFilter}
          onChange={(e) => setMainSkillFilter(e.target.value)}
        />
        <datalist id="mainSkills">
          {providers
            ?.flatMap((p) => p.mainSkills)
            ?.map((skill, i) => (
              <option key={i} value={skill} />
            ))}
        </datalist>

        <Input
          placeholder="Filter by subskill"
          list="subSkills"
          className="w-full md:w-1/4"
          value={subSkillFilter}
          onChange={(e) => setSubSkillFilter(e.target.value)}
        />
        <datalist id="subSkills">
          {providers
            ?.flatMap((p) => p.subSkills)
            ?.map((skill, i) => (
              <option key={i} value={skill} />
            ))}
        </datalist>
      </div>
      {/* COUNT */}
      <p className="text-gray-600 text-sm">
        {filteredProviders?.length || 0} service providers found
      </p>
      {/* PROVIDER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders?.map((provider) => (
          <div
            key={provider.serviceProviderId}
            className="bg-white border rounded-xl shadow p-4 space-y-4 hover:shadow-lg transition">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <img
                src={provider.profilePicture}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-bold text-lg">
                  {provider.firstName} {provider.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {provider.city}, {provider.state}
                </p>
              </div>
            </div>
            {/* Main Skills */}
            <div className="flex flex-wrap gap-2">
              {provider.mainSkills?.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
            {/* Sub Skills */}
            <div className="flex flex-wrap gap-2">
              {provider.subSkills?.slice(0, 4).map((skill, index) => (
                <Badge key={index} className="bg-sky-100 text-sky-700">
                  {skill}
                </Badge>
              ))}
            </div>
            {/* Experience */}
            <div className="space-y-1">
              <p className="font-semibold text-sm">Experience:</p>
              {provider.workExperiences?.slice(0, 1).map((exp, i) => (
                <p key={i} className="text-gray-600 text-sm">
                  {exp.jobTitle} @ {exp.companyName}
                </p>
              ))}
            </div>
            {/* Previous Work / Portfolio Images */}
            {provider.picturesOfPreviousWorkDone?.length > 0 && (
              <div className="space-y-2">
                <p className="font-semibold text-sm">Previous Work:</p>
                <div className="grid grid-cols-3 gap-2">
                  {provider.picturesOfPreviousWorkDone
                    .slice(0, 3)
                    .map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        onClick={() =>
                          openImage(provider.picturesOfPreviousWorkDone, i)
                        }
                        alt="work preview"
                        className="h-20 w-full object-cover rounded-lg border cursor-pointer hover:opacity-80 transition"
                      />
                    ))}
                  {provider.picturesOfPreviousWorkDone.length > 3 && (
                    <div className="flex items-center justify-center bg-gray-200 rounded-lg text-gray-700 text-sm font-medium cursor-pointer">
                      +{provider.picturesOfPreviousWorkDone.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Request Button */}
            <TalentServiceProviderRequestButton
              providerId={provider.serviceProviderId}
            />
          </div>
        ))}
      </div>
      {/* Image Preview Dialog */}
      <Dialog open={openPreview} onOpenChange={setOpenPreview}>
        <DialogContent className="max-w-lg p-4 bg-black flex flex-col items-center justify-center gap-4">
          {currentProviderImages.length > 0 && selectedImageIndex !== null && (
            <>
              <img
                src={currentProviderImages[selectedImageIndex]}
                alt="preview"
                className="max-h-[80vh] max-w-full object-contain"
              />
              <div className="flex gap-4 mt-2">
                <Button onClick={showPrevImage}>
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <Button onClick={showNextImage}>
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
};

export default TalentServiceProvider;
