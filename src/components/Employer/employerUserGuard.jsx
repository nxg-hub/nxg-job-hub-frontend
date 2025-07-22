import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

const tourSteps = [
  {
    id: "welcome",
    title: "Welcome to Your Dashboard! 🎉",
    description:
      "Let's take a quick tour to help you get started with all the amazing features available.",
    target: null,
    position: "center",
  },
  {
    id: "search-feature",
    title: "Quick Search",
    description:
      "Use this search bar to quickly find projects, tasks, or team members across your workspace.",
    target: "search-feature",
    position: "bottom",
  },
  {
    id: "notifications",
    title: "Stay Updated",
    description:
      "Click here to view your notifications and stay on top of important updates.",
    target: "notifications",
    position: "bottom",
  },
  {
    id: "create-button",
    title: "Create New Content",
    description:
      "Start new projects, tasks, or documents with this create button. It's your gateway to productivity!",
    target: "create-button",
    position: "bottom",
  },
  {
    id: "stats-section",
    title: "Your Performance Overview",
    description:
      "These cards show your key metrics at a glance. Track your progress and team performance here.",
    target: "stats-section",
    position: "top",
  },
  {
    id: "activity-section",
    title: "Recent Activity Feed",
    description:
      "Stay informed about what's happening in your projects and team activities in real-time.",
    target: "activity-section",
    position: "top",
  },
  {
    id: "complete",
    title: "You're All Set! ✨",
    description:
      "That's it! You're ready to make the most of your dashboard. Remember, you can always access help from the settings menu.",
    target: null,
    position: "center",
  },
];

export default function UserGuard({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tourSteps[currentStep];

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    onComplete();
  };

  const getTargetElement = () => {
    if (!step.target) return null;
    return document.getElementById(step.target);
  };

  const getSpotlightStyle = () => {
    const target = getTargetElement();
    if (!target) return {};

    const rect = target.getBoundingClientRect();
    return {
      top: rect.top - 8,
      left: rect.left - 8,
      width: rect.width + 16,
      height: rect.height + 16,
    };
  };

  const getTooltipStyle = () => {
    const target = getTargetElement();
    if (!target)
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const rect = target.getBoundingClientRect();
    const tooltipWidth = 320;
    const tooltipHeight = 200;

    let top = rect.bottom + 16;
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;

    // Adjust if tooltip goes off screen
    if (step.position === "top") {
      top = rect.top - tooltipHeight - 16;
    }
    if (left < 16) left = 16;
    if (left + tooltipWidth > window.innerWidth - 16) {
      left = window.innerWidth - tooltipWidth - 16;
    }

    return { top, left };
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Spotlight */}
      {step.target && (
        <div
          className="absolute rounded-lg ring-4 ring-white/20 bg-transparent pointer-events-none transition-all duration-300"
          style={getSpotlightStyle()}
        />
      )}

      {/* Tooltip */}
      <Card
        className="absolute w-80 shadow-2xl border-2"
        style={
          step.target
            ? getTooltipStyle()
            : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
        }
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              Step {currentStep + 1} of {tourSteps.length}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={skipTour}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardTitle className="text-lg">{step.title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {step.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <Button
              size="sm"
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
