import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../../static/images/logo_colored.png";
import axios from "axios";
import Notice from "../Notice";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import { Button } from "@/components/ui/button";
import { RadioGroupItem } from "../ui/radio-group";

import { RadioGroup } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { cn } from "@/lib/utils";

const SelectAccountType = () => {
  const navigate = useNavigate();
  const [popup, showPopup] = useState(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  const [submittingLoading, setSubmittingLoading] = useState(false);
  const { toast } = useToast();

  // Get authkey from sources
  const authKey =
    // authkey from url
    (searchParams.get("authKey")
      ? "Bearer " + searchParams.get("authKey")
      : null) ||
    // authkey from sessionstorage
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey ||
    // authkey from localstorage
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey;

  let localStore =
    // retrieve already stored data from localstorage
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    {};

  const checkForUserTypeAndRedirect = async (auth) => {
    if (localStore) {
      try {
        const res = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
          headers: {
            "Content-Type": "application/json",
            authorization: auth,
          },
        });

        if (!res.data.userType) {
          return;
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error.data);
        navigate("/login");
      }
    }
  };

  // if (authKey) {
  //   localStore = { ...localStore, authKey };
  //   // store in session to prevent expiry
  //   window.sessionStorage.setItem(
  //     "NXGJOBHUBLOGINKEYV1",
  //     JSON.stringify(localStore)
  //   );
  //   checkForUserTypeAndRedirect(authKey);
  // } else {
  //   navigate("/login");
  // }

  const [accountChoice, setAccountChoice] = useState("");

  const accountRadios = [
    { label: "Tech Talent", value: "techtalent" },
    // { label: "Talent", value: "talent" },
    { label: "Agent", value: "agent" },
    { label: "Employer", value: "employer" },
    // { label: "Service Provider", value: "serviceprovider" },
  ];

  const accountTypes = {
    techtalent: `${API_HOST_URL}/api/v1/tech-talent/register/`,
    agent: `${API_HOST_URL}/api/agents/createAgent`,
    employer: `${API_HOST_URL}/api/employers/createEmployer`,
    serviceprovider: `${API_HOST_URL}/api/v1/serviceprovider/register`,
    talent: `${API_HOST_URL}/api/v1/talent/register`,
  };

  const handleChange = (value) => {
    setAccountChoice(value);
  };

  const setAccountType = async () => {
    setSubmittingLoading(true);

    // try {
    //   await axios.post(
    //     accountTypes[accountChoice],
    //     {},
    //     {
    //       headers: {
    //         authorization: authKey,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   toast({
    //     className: cn(
    //       "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
    //     ),
    //     title: "Successful",
    //     description: (
    //       <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
    //         <code className="text-white">
    //           Created ${accountChoice} account successfully
    //         </code>
    //       </pre>
    //     ),
    //     duration: 2500,
    //   });
    //   // Updated the condition to navigate to the appropriate page based on the accountChoice
    //   setTimeout(() => {
    //     navigate(
    //       accountChoice === "employer"
    //         ? "employer/complete-profile"
    //         : accountChoice === "agent"
    //         ? "agent/complete-profile"
    //         : accountChoice === "techtalent"
    //         ? "techtalent/complete-profile"
    //         : null
    //     );
    //   }, 3000);
    // } catch (err) {
    //   console.log(err);
    //   setSubmittingLoading(false);
    //   toast({
    //     className: cn(
    //       "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
    //     ),
    //     title: "Failed ",
    //     description: (
    //       <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
    //         <code className="text-white">
    //           Account creation failed. Please try again.
    //         </code>
    //       </pre>
    //     ),
    //   });
    // }

    switch (accountChoice) {
      case "techtalent":
        toast({
          className: cn(
            "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: "Successful",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
              <code className="text-white">
                Created ${accountChoice} account successfully
              </code>
            </pre>
          ),
          duration: 2500,
        });
        // Updated the condition to navigate to the appropriate page based on the accountChoice
        setTimeout(() => {
          navigate("/techtalent/complete-profile");

          setSubmittingLoading(false);
        }, 3000);
        break;
      case "agent":
        toast({
          className: cn(
            "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: "Updating account",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
              <code className="text-white">Account update successfully</code>
            </pre>
          ),
          duration: 2500,
        });
        // Updated the condition to navigate to the appropriate page based on the accountChoice
        setTimeout(() => {
          navigate("/agent/complete-profile");
          setSubmittingLoading(false);
        }, 3000);
        break;
      case "employer":
        toast({
          className: cn(
            "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: "Successful",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
              <code className="text-white">
                Created ${accountChoice} account successfully
              </code>
            </pre>
          ),
          duration: 2500,
        });
        // Updated the condition to navigate to the appropriate page based on the accountChoice
        setTimeout(() => {
          navigate("/employer/complete-profile");
          setSubmittingLoading(false);
        }, 3000);


        break;
      case "talent":
        toast({
          className: cn(
            "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: "Updating account",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
              <code className="text-white">Account update successfully</code>
            </pre>
          ),
          duration: 2500,
        });
        // Updated the condition to navigate to the appropriate page based on the accountChoice
        setTimeout(() => {
          navigate("/talent/complete-profile");
          setSubmittingLoading(false);
        }, 3000);
        break;
      case "serviceprovider":
        toast({
          className: cn(
            "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: "Updating account",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
              <code className="text-white">Account update successfully</code>
            </pre>
          ),
          duration: 2500,
        });
        // Updated the condition to navigate to the appropriate page based on the accountChoice
        setTimeout(() => {
          navigate("/services-provider/complete-profile");
          setSubmittingLoading(false);
        }, 3000);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setSearchParams("");
  }, [setSearchParams]);

  return (
    <div className="flex flex-col space-y-10">
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4">
        <img className="w-20 sm:w-24" src={Logo} alt="" />
        <Link
          className="self-end sm:hidden text-white sm:mr-5 sm:mt-5"
          to="/login"
          title="Close"
        >
          {" "}
          <AiOutlineClose />{" "}
        </Link>
      </nav>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center w-full min-h-screen rounded-b-lg shadow-md sm:space-y-10 sm:w-[700px]">
          <Link
            className="hidden self-end sm:block sm:mr-5 sm:mt-5"
            to="/login"
            title="Close"
          >
            {" "}
            <AiOutlineClose />{" "}
          </Link>
          <div
            className="flex flex-col items-center w-full sm:w-10/12 sm:p-6 sm:border sm:border-sky-400 
              sm:rounded-md"
          >
            <div className="flex flex-col items-center mb-20 sm:mb-10">
              <h1 className="font-semibold text-2xl">
                Join our community of professionals
              </h1>
              <p className="text-base text-slate-500">
                Get started and connect with professionals!
              </p>
            </div>
            <RadioGroup
              className="flex flex-col space-y-1 mb-6"
              onValueChange={handleChange}
            >
              {accountRadios.map((radio) => (
                <div
                  key={radio.value}
                  className="flex items-center justify-between space-x-48 space-y-0 border
                 rounded p-4 text-base "
                >
                  <Label htmlFor={radio.value}>{radio.label}</Label>
                  <RadioGroupItem
                    className="p-0 "
                    value={radio.value}
                    id={radio.value}
                  />
                </div>
              ))}
            </RadioGroup>
            <Button
              className={
                accountChoice === "" || submittingLoading
                  ? "w-2/3 bg-gray-300 border-none text-white rounded py-3 mb-5 cursor-not-allowed hover:bg-gray-300"
                  : "w-2/3 bg-sky-600 border-none text-white rounded py-3 mb-5 cursor-pointer hover:bg-sky-700"
              }
              type="button"
              onClick={setAccountType}
              aria-disabled={!accountChoice}
              disabled={!accountChoice || submittingLoading}
              to={`./${accountChoice}`}
            >
              {submittingLoading ? (
                <div className="flex items-center space-x-1">
                  <Loader2 className="animate-spin" />
                  <span>Please wait</span>
                </div>
              ) : (
                <span>Continue</span>
              )}
            </Button>

            <p>
              Already have an account?{" "}
              <Link className="text-sky-600" to={"/login"}>
                {" "}
                Log in{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SelectAccountType;
