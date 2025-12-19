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
            {/* Previous Work / Portfolio Images */}
            {provider.picturesOfPreviousWorkDone?.length > 0 && (
              <div className="space-y-2">
                <p className="font-semibold text-sm">Previous Works:</p>
                <button
                  onClick={() =>
                    openImage(provider.picturesOfPreviousWorkDone, 0)
                  }
                  className="px-4 py-2 bg-primary rounded-lg text-white font-medium hover:bg-secondary transition">
                  View Works ({provider.picturesOfPreviousWorkDone.length})
                </button>
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
      {/* <Dialog open={openPreview} onOpenChange={setOpenPreview}>
        <DialogContent className="w-full h-full top-80  lg:top-10 p-0 bg-black flex items-center justify-center relative">
          {currentProviderImages.length > 0 && selectedImageIndex !== null && (
            <>
              <img
                src={currentProviderImages[selectedImageIndex]}
                alt="preview"
                className="w-full md:h-[80vh]  object-cover"
              />
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <Button
                  onClick={showPrevImage}
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </Button>
              </div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <Button
                  onClick={showNextImage}
                  className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-full">
                  <ArrowRight className="w-6 h-6 text-white" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog> */}

      <Dialog open={openPreview} onOpenChange={setOpenPreview}>
        <DialogContent
          className="
      max-w-none
      w-screen
      h-screen
      p-0
      bg-transparent
      border-none
      shadow-none
      flex
      items-center
      justify-center
    "
          // clicking the empty area closes modal
          onClick={() => setOpenPreview(false)}>
          {currentProviderImages.length > 0 && selectedImageIndex !== null && (
            <div
              className="relative w-full h-full flex items-center justify-center"
              // prevent inside clicks from closing modal
              onClick={(e) => e.stopPropagation()}>
              {/* Image */}
              <img
                src={currentProviderImages[selectedImageIndex]}
                alt="preview"
                className="
            max-w-[95vw]
            max-h-[85vh]
            lg:max-w-[85vw]
            lg:max-h-[90vh]
            object-contain
          "
              />

              {/* Close button */}
              <button
                onClick={() => setOpenPreview(false)}
                className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 p-2 rounded-full">
                <span className="text-white text-xl leading-none">✕</span>
              </button>

              {/* Left Arrow */}
              <button
                onClick={showPrevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full">
                <ArrowLeft className="w-7 h-7 text-white" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={showNextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full">
                <ArrowRight className="w-7 h-7 text-white" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
};

export default TalentServiceProvider;
