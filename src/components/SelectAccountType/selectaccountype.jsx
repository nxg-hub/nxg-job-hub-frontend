import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../static/images/logo_colored.png";
import EmployerIconDark from "../../static/icons/SVG/employer-dark-bg.svg";
import AgentIconDark from "../../static/icons/SVG/agent-dark-bg.svg";
import TechTalentIconDark from "../../static/icons/SVG/tech-talent-dark-bg.svg";
import ServiceProviderIconDark from "../../static/icons/SVG/service-provide-dark-bg.svg";
import axios from "axios";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { cn } from "@/lib/utils";
import { useAutoLogin } from "@/hooks/useAutoLogin";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { useMutation } from "@tanstack/react-query";

const SelectAccountType = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [accountChoice, setAccountChoice] = useState("");

  const { data, fetchStatus, isError, isSuccess, error, isFetched } =
    useAutoLogin();

  const isAutoLoginChecking = fetchStatus === "fetching";

  const storedToken = (function () {
    let key =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

    try {
      const tokenParsed = key ? JSON.parse(key) : null;
      return tokenParsed?.authKey || tokenParsed;
    } catch (e) {
      return null;
    }
  })();

  // Check if profile is complete
  const isProfileComplete = () => {
    const profileStatus = localStorage.getItem("NXGJOBHUBComPro");
    try {
      return profileStatus ? JSON.parse(profileStatus) : false;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    setSearchParams("");
  }, [setSearchParams]);

  // useEffect(() => {
  //   if (!storedToken && !isAutoLoginChecking && !isFetched) {
  //     console.log("No token found");
  //     navigate("/login", { replace: true });
  //     return;
  //   }

  //   if (isFetched && !isAutoLoginChecking) {
  //     if (isSuccess && data?.userType) {
  //       // Check if this is a new user or existing user with complete profile
  //       const profileComplete = isProfileComplete();

  //       if (profileComplete) {
  //         // Existing user with complete profile - redirect to dashboard
  //         if (data.userType === "EMPLOYER") {
  //           navigate("/employer", { replace: true });
  //         } else if (data.userType === "AGENT") {
  //           navigate("/agent", { replace: true });
  //         } else if (data.userType === "TALENT") {
  //           navigate("/talent", { replace: true });
  //         } else if (data.userType === "TECHTALENT") {
  //           navigate("/talent", { replace: true });
  //         } else if (data.userType === "SERVICE_PROVIDER") {
  //           navigate("/services-provider", { replace: true });
  //         } else {
  //           console.warn("Unknown user type:", data.userType);
  //         }
  //       } else {
  //         // New user or incomplete profile - redirect to complete profile
  //         if (data.userType === "EMPLOYER") {
  //           navigate("/employer/complete-profile", { replace: true });
  //         } else if (data.userType === "AGENT") {
  //           navigate("/agent/complete-profile", { replace: true });
  //         } else if (data.userType === "TALENT") {
  //           navigate("/talent/complete-profile", { replace: true });
  //         } else if (data.userType === "TECHTALENT") {
  //           navigate("/techtalent/complete-profile", { replace: true });
  //         } else if (data.userType === "SERVICE_PROVIDER") {
  //           navigate("/services-provider/complete-profile", { replace: true });
  //         }
  //       }
  //     } else if (
  //       isError ||
  //       (isSuccess && (!data?.userType || data?.userType === null || data?.userType === undefined))
  //     ) {
  //       if (isError) {
  //         localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
  //         sessionStorage.removeItem("NXGJOBHUBLOGINKEYV1");
  //         console.error("Auto-login failed:", error.message);
  //       }
  //       // If no userType, stay on this page to select account type
  //     }
  //   }
  // }, [
  //   isAutoLoginChecking,
  //   isSuccess,
  //   isError,
  //   data,
  //   error,
  //   storedToken,
  //   isFetched,
  //   navigate,
  // ]);

  const accountRadios = [
    {
      label: "Tech Talent",
      value: "techtalent",
      desc: "Land projects that match your vibe",
      icon: TechTalentIconDark,
    },
    {
      label: "Agent",
      value: "agent",
      desc: "Link clients with great talent",
      icon: AgentIconDark,
    },
    {
      label: "Employer",
      value: "employer",
      desc: "Post jobs and build your team",
      icon: EmployerIconDark,
    },
    {
      label: "Service Provider",
      value: "serviceprovider",
      desc: "Share your skills and get booked",
      icon: ServiceProviderIconDark,
    },
  ];

  const accountTypes = {
    techtalent: `${API_HOST_URL}/api/v1/tech-talent/register/`,
    agent: `${API_HOST_URL}/api/v1/agents/register`,
    employer: `${API_HOST_URL}/api/employers/createEmployer`,
    serviceprovider: `${API_HOST_URL}/api/service-providers`,
    talent: `${API_HOST_URL}/api/v1/talent/register`,
  };

  const handleChange = (value) => {
    setAccountChoice(value);
  };

  //create user type using useMutation of tanstack query
  const mutation = useMutation({
    mutationFn: async ({ authKey }) => {
      const response = await axios.post(
        accountTypes[accountChoice],
        {},
        {
          headers: {
            authorization: authKey,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        className: cn("top-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"),
        title: <span className="text-green-800">Successful:</span>,
        description: (
          <p className="text-gray-800 rounded-md bg-green-100 p-4 font-mono">
            Created {accountChoice} account successfully.
          </p>
        ),
      });

      if (accountChoice === "employer") {
        navigate("/employer/complete-profile", { replace: true });
      }
      if (accountChoice === "techtalent") {
        navigate("/techtalent/complete-profile", { replace: true });
      }
      if (accountChoice === "serviceprovider") {
        navigate("/services-provider/complete-profile", { replace: true });
      }
      if (accountChoice === "agent") {
        navigate("/agent/complete-profile", { replace: true });
      }
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start top-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Server error:</span>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                {err.response.data}
              </p>
            ),
          });
        } else if (err.request) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start top-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Network error:</span>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                Account creation failed, please check your internet connection.
              </p>
            ),
          });
        }
      } else {
        toast({
          className: cn(
            "flex flex-col space-y-5 items-start top-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
          ),
          title: <span className="text-red-900">Failed:</span>,
          description: (
            <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
              Account creation failed, please try again.
            </p>
          ),
        });
      }
    },
  });

  const setAccountType = async () => {
    // Mark profile as incomplete for new user
    localStorage.setItem("NXGJOBHUBComPro", JSON.stringify(false));

    const authKey =
      (searchParams.get("authKey")
        ? "Bearer " + searchParams.get("authKey")
        : null) ||
      JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"))
        ?.authKey ||
      JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey;

    mutation.mutate({ authKey });
  };

  // if (isAutoLoginChecking || (!isFetched && !storedToken))
  //   return <div>Loading...</div>;

  return (
    <div className="space-y-10">
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4">
        <img className="w-20 sm:w-24" src={Logo} alt="" />
      </nav>
      <div className="px-5 sm:mx-auto sm:w-2/5 sm:p-6 sm:px-16 sm:border sm:rounded-md space-y-5">
        <div className="mb-8">
          <h1 className="font-semibold text-2xl ">Choose your account type</h1>
          <p className="text-base text-slate-500">
            Get started and connect with professionals!
          </p>
        </div>
        <RadioGroup className=" space-y-4" onValueChange={handleChange}>
          {accountRadios.map((radio) => (
            <FieldLabel
              className={cn(
                `${
                  accountChoice === radio.value
                    ? "bg-sky-50"
                    : "hover:bg-gray-50"
                }`
              )}
              key={radio.value}
              htmlFor={radio.value}
            >
              <Field orientation="horizontal">
                <FieldContent>
                  <div className="flex gap-3">
                    <img className="w-6 sm:w-10" src={radio.icon} alt="" />
                    <div>
                      <FieldTitle>{radio.label}</FieldTitle>
                      <FieldDescription>{radio.desc}</FieldDescription>
                    </div>
                  </div>
                </FieldContent>
                <RadioGroupItem
                  className="p-0  border-black hover:border-transparent hover:bg-secondary"
                  value={radio.value}
                  id={radio.value}
                />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        <Button
          className={
            accountChoice === "" || mutation.isPending
              ? "w-full bg-gray-300 border-none text-white rounded py-3 mb-5 cursor-not-allowed hover:bg-gray-300"
              : "w-full bg-sky-600 border-none text-white rounded py-3 mb-5 cursor-pointer hover:bg-sky-700"
          }
          type="button"
          onClick={setAccountType}
          aria-disabled={!accountChoice}
          disabled={!accountChoice || mutation.isPending}
        >
          {mutation.isPending ? (
            <div className="flex items-center space-x-1">
              <Loader2 className="animate-spin" />
              <span>Please wait</span>
            </div>
          ) : (
            <span>Continue</span>
          )}
        </Button>

        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-sky-600" to={"/login"}>
            {" "}
            Log in{" "}
          </Link>
        </p>
      </div>

      <Toaster />
    </div>
  );
};

export default SelectAccountType;
