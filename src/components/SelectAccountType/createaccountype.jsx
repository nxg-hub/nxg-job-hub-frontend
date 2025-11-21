import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "@/static/images/splash.png";
import EmployerIcon from "../../static/icons/SVG/employer-dark-bg.svg";
import AgentIcon from "../../static/icons/SVG/agent-dark-bg.svg";
import TechTalentIconDark from "../../static/icons/SVG/tech-talent-dark-bg.svg";
import ServiceProviderIconDark from "../../static/icons/SVG/service-provide-dark-bg.svg";
import CompanyHRIcon from "../../static/icons/SVG/company_hr_icon.svg";
import PostJobIcon from "../../static/icons/SVG/post_job_icon.svg";
import NeedJobIcon from "../../static/icons/SVG/need_job_icon.svg";
import axios from "axios";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Loader2 } from "lucide-react";
import { toast, useToast } from "@/hooks/use-toast";
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
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";

export default function CreateAccountType() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, fetchStatus, isError, isSuccess, error, isFetched } =
    useAutoLogin();

  // useEffect(() => {
  //   setSearchParams("");
  // }, [setSearchParams]);

  const userType = searchParams.get("user-type");

  const authKey =
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey ||
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey;

  const mutation = useMutation({
    mutationFn: async ({ url, payload }) => {
      const response = await axios.post(url, payload, {
        headers: {
          authorization: authKey,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });

  return (
    <div className="min-h-screen md:space-y-10">
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4">
        <div className="flex items-center gap-2">
          <img className="w-10 sm:w-14" src={Logo} alt="" />
          <div className="flex flex-col text-white -space-y-1.5">
            <span className="font-bold text-2xl md:text-3xl">NXG</span>
            <span className="text-xs md:text-xs md:tracking-widest">
              JOB HUB
            </span>
          </div>
        </div>
      </nav>
      <div className="w-full md:flex md:items-center md:justify-center md:p-20 md:gap-10 md:px-52">
        <div className="hidden md:block self-start w-2/6 md:pt-20">
          <h1 className="font-bold text-2xl  ">
            Hey👋, <br />
            <span className="text-xl">Let help you with Jobs.</span>
          </h1>
          <p className="mt-3 text-base text-gray-400">
            You are just a few steps a way from getting hired or posting jobs,
            the process is quick and easy
          </p>
        </div>
        <Separator
          orientation="vertical"
          className="hidden md:block w-[1px] h-[500px] my-auto"
        />
        <div className="w-full px-3 mt-10 md:w-2/4">
          {!userType ? (
            <AccountTypeSelection />
          ) : userType === "talent" ? (
            <TalentTypeSelection createUserAccount={mutation} />
          ) : (
            <EmployerTypeSelection createUserAccount={mutation} />
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

const AccountTypeSelection = () => {
  const [accountChoice, setAccountChoice] = useState("");
  const navigate = useNavigate();

  const accountTypeRadios = [
    {
      label: "Need a Job?",
      value: "talent",
      desc: "Looking to get job or services that match your skills",
      icon: NeedJobIcon,
    },
    {
      label: "Ready to Hire?",
      value: "employer",
      desc: "Looking to hire a great talent and build your team",
      icon: PostJobIcon,
    },
  ];

  const accountTypes = {
    talent: "/createAccount?user-type=talent",
    employer: "/createAccount?user-type=employer",
  };

  const handleChange = (value) => {
    setAccountChoice(value);
  };

  const setAccountType = async () => {
    navigate(accountTypes[accountChoice]);
  };

  return (
    <motion.div
      initial={{
        y: 7,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
      }}
      className="w-full flex flex-col gap-10  p-5 md:px-10 border rounded-md"
    >
      <div className="flex flex-col gap-1">
        <h1 className=" font-semibold text-xl md:text-2xl text-slate-800">
          Choose your account type
        </h1>
        <p className="md:w-10/12 text-xs md:text-sm text-gray-600">
          Personalize your account by selecting accounty type, Get started and
          connect with professionals!
        </p>
      </div>

      <RadioGroup className=" space-y-4" onValueChange={handleChange}>
        {accountTypeRadios.map((radio) => (
          <FieldLabel
            className={cn(
              `${
                accountChoice === radio.value ? "bg-sky-50" : "hover:bg-gray-50"
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
                    <FieldTitle className="text-sm md:text-base">
                      {radio.label}
                    </FieldTitle>
                    <FieldDescription className="text-xs md:text-sm">
                      {radio.desc}
                    </FieldDescription>
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
          accountChoice === ""
            ? "w-full bg-gray-300 border-none text-white rounded py-3 mb-5 cursor-not-allowed hover:bg-gray-300 h-11"
            : "w-full bg-sky-600 border-none text-white rounded py-3 mb-5 cursor-pointer hover:bg-sky-700 h-11"
        }
        type="button"
        onClick={setAccountType}
        aria-disabled={!accountChoice}
        disabled={!accountChoice}
      >
        <span>Continue</span>
      </Button>
    </motion.div>
  );
};

const EmployerTypeSelection = ({ createUserAccount }) => {
  const [employerChoice, setEmployerChoice] = useState("");
  const navigate = useNavigate();

  const employerAccountRadios = [
    {
      label: "Employer",
      value: "EMPLOYER",
      desc: "Post jobs and get connect with qualified candidates.",
      icon: EmployerIcon,
    },
    {
      label: "Company HR",
      value: "COMPANY_HR",
      desc: "Manage recruitment, review applications and collaborate.",
      icon: CompanyHRIcon,
    },

    {
      label: "Agency",
      value: "AGENCY",
      desc: "Represent candidates, match them with employers.",
      icon: AgentIcon,
    },
  ];

  const handleChange = (value) => {
    setEmployerChoice(value);
  };

  const setAccountType = async () => {
    createUserAccount.mutate(
      {
        url: `${API_HOST_URL}/api/employers/createEmployer`,
        payload: { employerType: employerChoice },
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setTimeout(() => {
            navigate("/employer/complete-profile");
          }, 3000);
        },
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            if (err.response) {
              toast({
                className: cn(
                  "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
                ),
                title: <span className="text-red-900">Failed:</span>,
                description: (
                  <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
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
                  <p className="text-red-700 text-xs sm:text-sm">
                    Network error:
                  </p>
                ),
                description: (
                  <p className="w-full  bg-gray-100 p-2 text-red-700 text-xs sm:text-sm">
                    Please check your internet connection.
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
                <span className="text-red-700 text-xs sm:text-sm">Failed:</span>
              ),
              description: (
                <p className="w-full  bg-gray-100 p-2 text-red-700 text-xs sm:text-sm">
                  Failed to create your account type, please try again.
                </p>
              ),
            });
          }
        },
      }
    );
  };

  return (
    <motion.div
      initial={{
        y: 7,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
      }}
      className="flex  flex-col gap-10 w-full md:px-10 p-5 border rounded-md"
    >
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl md:text-2xl  text-slate-800">
          Account type selection
        </h1>
        <p className="md:w-10/12 text-xs md:text-sm text-gray-600">
          Let help you with your jobs by connecting you to the right candidates.
        </p>
      </div>

      <RadioGroup className=" space-y-4" onValueChange={handleChange}>
        {employerAccountRadios.map((radio) => (
          <FieldLabel
            className={cn(
              `${
                employerChoice === radio.value
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
                    <FieldTitle className="text-sm md:text-base">
                      {radio.label}
                    </FieldTitle>
                    <FieldDescription className="text-xs md:text-sm">
                      {radio.desc}
                    </FieldDescription>
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
          employerChoice === ""
            ? "w-full bg-gray-300 border-none text-white rounded py-3 mb-5 cursor-not-allowed hover:bg-gray-300 h-11"
            : "w-full bg-sky-600 border-none text-white rounded py-3 mb-5 cursor-pointer hover:bg-sky-700 h-11"
        }
        type="button"
        onClick={setAccountType}
        aria-disabled={!employerChoice}
        disabled={!employerChoice}
      >
        <span>Continue</span>
      </Button>
    </motion.div>
  );
};

const TalentTypeSelection = ({ createUserAccount }) => {
  const [talentChoice, setTalentChoice] = useState("");
  const navigate = useNavigate();

  const talentTypeRadios = [
    {
      label: "Tech Talent",
      value: "techtalent",
      desc: "Showcase your skills, connect with top employer's.",
      icon: TechTalentIconDark,
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
    serviceprovider: `${API_HOST_URL}/api/service-providers`,
  };

  const handleChange = (value) => {
    setTalentChoice(value);
  };

  const setAccountType = async () => {
    createUserAccount.mutate(
      {
        url: accountTypes[talentChoice],
        payload: {},
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setTimeout(() => {
            if (talentChoice === "techtalent") {
              navigate("/techtalent/complete-profile");
            }
            if (talentChoice === "serviceprovider") {
              navigate("/services-provider/complete-profile");
            }
          }, 3000);
        },
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            if (err.response) {
              toast({
                className: cn(
                  "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
                ),
                title: <span className="text-red-900">Failed:</span>,
                description: (
                  <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
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
                  <p className="text-red-700 text-xs sm:text-sm">
                    Network error:
                  </p>
                ),
                description: (
                  <p className="w-full  bg-gray-100 p-2 text-red-700 text-xs sm:text-sm">
                    Please check your internet connection.
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
                <span className="text-red-700 text-xs sm:text-sm">Failed:</span>
              ),
              description: (
                <p className="w-full  bg-gray-100 p-2 text-red-700 text-xs sm:text-sm">
                  Failed to create your account type, please try again.
                </p>
              ),
            });
          }
        },
      }
    );
  };

  return (
    <motion.div
      initial={{
        y: 7,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
      }}
      className="flex  flex-col gap-10 w-full md:px-10 p-5 border rounded-md"
    >
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl md:text-2xl text-slate-800">
          Account type selection
        </h1>
        <p className="w-10/12 text-xs md:text-sm text-gray-600">
          Get hired by our top best employers and land your next big
          opportunity.
        </p>
      </div>

      <RadioGroup className=" space-y-4" onValueChange={handleChange}>
        {talentTypeRadios.map((radio) => (
          <FieldLabel
            className={cn(
              `${
                talentChoice === radio.value ? "bg-sky-50" : "hover:bg-gray-50"
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
                    <FieldTitle className="text-sm md:text-base">
                      {radio.label}
                    </FieldTitle>
                    <FieldDescription className="text-xs md:text-sm">
                      {radio.desc}
                    </FieldDescription>
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
          talentChoice === ""
            ? "w-full bg-gray-300 border-none text-white rounded py-3 mb-5 cursor-not-allowed hover:bg-gray-300 h-11"
            : "w-full bg-sky-600 border-none text-white rounded py-3 mb-5 cursor-pointer hover:bg-sky-700 h-11"
        }
        type="button"
        onClick={setAccountType}
        aria-disabled={!talentChoice}
        disabled={!talentChoice}
      >
        <span>Continue</span>
      </Button>
    </motion.div>
  );
};
