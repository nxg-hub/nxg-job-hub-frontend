import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../static/images/logo_colored.png";
import axios from "axios";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import { Button } from "@/components/ui/button";
import { RadioGroupItem } from "../ui/radio-group";
import { RadioGroup } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { cn } from "@/lib/utils";
import { useAutoLogin } from "@/hooks/useAutoLogin";

const SelectAccountType = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [accountChoice, setAccountChoice] = useState("");
  //a state that disabled login button when trying to log user in
  const [submittingLoading, setSubmittingLoading] = useState(false);

  const { data, fetchStatus, isError, isSuccess, error, isFetched } =
    useAutoLogin();

  //if auto-login check has completed(either success or failed)
  const isAutoLoginChecking = fetchStatus === "fatching";

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

  useEffect(() => {
    setSearchParams("");
  }, [setSearchParams]);

  useEffect(() => {
    if (!storedToken && !isAutoLoginChecking && !isFetched) {
      console.log("No token found");
      navigate("/login", { replace: true });
      return;
    }

    if (isFetched && !isAutoLoginChecking) {
      if (isSuccess && data?.userType) {
        //redirect user to their dashboard based on thier type
        if (data.userType === "EMPLOYER") {
          navigate("/employer", { replace: true });
        } else if (data.userType === "AGENT") {
          navigate("/agent", { replace: true });
        } else if (data.userType === "TALENT") {
          navigate("/talent", { replace: true });
        } else if (data.userType === "TECHTALENT") {
          navigate("/talent", { replace: true });
        } else if (data.userType === "SERVICE_PROVIDER") {
          navigate("/services-provider", { replace: true });
        } else {
          console.warn("Unknown user type:", data.userType);
        }
      } else if (
        isError ||
        (isSuccess &&
          (!data?.userType === null || data?.userType === undefined))
      ) {
        if (isError) {
          // Clear invalid token if this error occurred
          localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
          sessionStorage.removeItem("NXGJOBHUBLOGINKEYV1");
          console.error("Auto-login failed:", error.message);
        }
      }
    }
  }, [
    isAutoLoginChecking,
    isSuccess,
    isError,
    data,
    error,
    storedToken,
    isFetched,
    navigate,
  ]);

  const accountRadios = [
    { label: "Tech Talent", value: "techtalent" },
    // { label: "Talent", value: "talent" },
    { label: "Agent", value: "agent" },
    { label: "Employer", value: "employer" },
    { label: "Service Provider", value: "serviceprovider" },
  ];

  const accountTypes = {
    techtalent: `${API_HOST_URL}/api/v1/tech-talent/register/`,
    agent: `${API_HOST_URL}/api/agents/createAgent`,
    employer: `${API_HOST_URL}/api/employers/createEmployer`,
    serviceprovider: `${API_HOST_URL}/api/service-providers`,
    talent: `${API_HOST_URL}/api/v1/talent/register`,
  };

  const handleChange = (value) => {
    setAccountChoice(value);
  };

  const setAccountType = async () => {
    setSubmittingLoading(true);

    //new user: account profile not complete
    localStorage.setItem("NXGJOBHUBComPro", JSON.stringify(false));

    const authKey =
      (searchParams.get("authKey")
        ? "Bearer " + searchParams.get("authKey")
        : null) ||
      JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"))
        ?.authKey ||
      JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey;

    if (accountChoice === "agent") {
      toast({
        className: cn("top-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"),
        title: <span className="text-green-800">Successful:</span>,
        description: (
          <p className="text-gray-800 rounded-md bg-green-100 p-4 font-mono">
            Created {accountChoice} account successfully.
          </p>
        ),
        duration: 2500,
      });
      // Updated the condition to navigate to the appropriate page based on the accountChoice
      setTimeout(() => {
        navigate("/agent/complete-profile");
        setSubmittingLoading(false);
      }, 3000);
    } else {
      try {
        await axios.post(
          accountTypes[accountChoice],
          {},
          {
            headers: {
              authorization: authKey,
              "Content-Type": "application/json",
            },
          }
        );
        toast({
          className: cn("top-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"),
          title: <span className="text-green-800">Successful:</span>,
          description: (
            <p className="text-gray-800 rounded-md bg-green-100 p-4 font-mono">
              Created {accountChoice} account successfully.
            </p>
          ),
          duration: 2500,
        });
        // Updated the condition to navigate to the appropriate page based on the accountChoice
        setTimeout(() => {
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
        }, 3000);
      } catch (err) {
        console.log(err);
        setSubmittingLoading(false);
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
    }
  };

  if (isAutoLoginChecking || (!isFetched && !storedToken))
    return <div>Loading...</div>;

  return (
    <div className="space-y-10">
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4">
        <img className="w-20 sm:w-24" src={Logo} alt="" />
      </nav>
      <div className="px-5 sm:mx-auto sm:w-1/3 sm:p-6 sm:border sm:border-sky-400 sm:rounded-md">
        <div className="mb-8">
          <h1 className="font-semibold text-2xl ">
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
                className="p-0  border-black hover:border-transparent hover:bg-secondary"
                value={radio.value}
                id={radio.value}
              />
            </div>
          ))}
        </RadioGroup>
        <Button
          className={
            accountChoice === "" || submittingLoading
              ? "w-full bg-gray-300 border-none text-white rounded py-3 mb-5 cursor-not-allowed hover:bg-gray-300"
              : "w-full bg-sky-600 border-none text-white rounded py-3 mb-5 cursor-pointer hover:bg-sky-700"
          }
          type="button"
          onClick={setAccountType}
          aria-disabled={!accountChoice}
          disabled={!accountChoice || submittingLoading}
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
