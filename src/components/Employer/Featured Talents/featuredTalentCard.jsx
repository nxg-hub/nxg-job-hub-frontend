import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRequestFeaturedTalent } from "@/hooks/Employer/employerHooks";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Award, Dot, GraduationCap } from "lucide-react";

export default function FeaturedTalentCard({ featuredTalent }) {
  const { mutate } = useRequestFeaturedTalent({
    onSuccess: (data) => {
      toast({
        className: cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 py-2 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
        ),
        title: (
          <span className="text-green-800 text-xs sm:text-sm">
            Request successful
          </span>
        ),
        description: (
          <p className="w-full  bg-gray-700 p-2 text-green-100 text-xs sm:text-sm">
            {data}
          </p>
        ),
        duration: 2500,
      });
    },
    onError: (err) => {
      console.error("Featured Talent Request error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast({
            className: cn(
              "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 py-2 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
            ),
            title: (
              <p className="text-red-700 text-xs sm:text-sm">
                {" "}
                Request failed:
              </p>
            ),
            description: (
              <p className="w-full  bg-gray-700 p-2 text-red-100 text-xs sm:text-sm">
                {err.response.data}
              </p>
            ),
          });
        } else if (err.request) {
          toast({
            className: cn(
              "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 py-2 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
            ),
            title: (
              <span className="text-red-700 text-xs sm:text-sm">
                Network error:
              </span>
            ),
            description: (
              <p className="w-full  bg-gray-700 p-2 text-red-100 text-xs sm:text-sm">
                Request can't be send, please check your internet connection.
              </p>
            ),
          });
        }
      } else {
        toast({
          className: cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 py-2 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
          ),
          title: (
            <span className="text-red-700 text-xs sm:text-sm">
              Request failed:
            </span>
          ),
          description: (
            <p className="w-full  bg-gray-700 p-2 text-red-100 text-xs sm:text-sm">
              Feactured talent failed, please try again.
            </p>
          ),
        });
      }
    },
  });
  return (
    <Card className="p-4 bg-white border border-stone-200 flex flex-col md:max-w-lg md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={featuredTalent?.talentProfilePic || "/placeholder.svg"}
            alt={featuredTalent?.talentName}
          />
          <AvatarFallback>
            {featuredTalent?.talentName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <div>
            <h3 className="text-base md:text-xl font-semibold text-foreground">
              {featuredTalent?.talentName}
            </h3>
            <div className="w-full flex flex-nowrap gap-2">
              <div className="flex">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-xs">
                  {featuredTalent?.yearsOfExperience}
                </span>
              </div>
              <div className="flex flex-1 gap-1">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-xs line-clamp-1">
                  {featuredTalent?.educationLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1  ">
            <span className="w-fit border-[1px] rounded text-xs font-medium p-1">
              Talent Stack
            </span>
            <span className="flex">
              {featuredTalent?.talentTechStack.split(",").map((i, n) => (
                <span key={n} className="flex text-primary">
                  <Dot className="w-4 h-4" />
                  <span className="text-xs">{i}</span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between md:flex-col md:w-3/12 gap-2 ">
        <Button
          asChild
          variant="outline"
          className="text-xs md:text-sm text-primary"
        >
          <a
            href={featuredTalent?.talentResume}
            target="_blank"
            rel="noopener noreferrer"
            // className="  hover:text-secondary hover:underline font-medium "
          >
            View Resume
          </a>
        </Button>
        <Button
          onClick={() => mutate(featuredTalent?.id)}
          className="bg-primary text-xs md:text-sm hover:bg-secondary text-white border-transparent"
        >
          Request Talent
        </Button>
      </div>
    </Card>
  );
}
