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
  // All hooks must be declared at the top level, unconditionally
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [accountChoice, setAccountChoice] = useState("");
  const [submittingLoading, setSubmittingLoading] = useState(false);

  // This hook is fine where it is
  const { data, fetchStatus, isError, isSuccess, error, isFetched } = useAutoLogin();
  const isAutoLoginChecking = fetchStatus === "fetching";

  // This derived state (not a hook) is also fine
  const storedToken = (() => {
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

  // All useEffects must also be unconditional
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
        switch (data.userType) {
          case "EMPLOYER":
            navigate("/employer", { replace: true });
            break;
          case "AGENT":
            navigate("/agent", { replace: true });
            break;
          case "TALENT":
          case "TECHTALENT":
            navigate("/talent", { replace: true });
            break;
          default:
            console.warn("Unknown user type:", data.userType);
        }
      } else if (
        isError ||
        (isSuccess && (data?.userType === null || data?.userType === undefined))
      ) {
        if (isError) {
          console.error("Auto-login failed:", error.message);
        }
      }
    }
  }, [isAutoLoginChecking, isSuccess, isError, data, error, storedToken, isFetched, navigate]);


  // Only after ALL hooks have been called, can you conditionally return JSX.
  if (isAutoLoginChecking || (!isFetched && !storedToken)) {
      return <div>Loading...</div>;
  }
  // The rest of your component's render logic will only execute if the above condition is false.

  const accountRadios = [
    { label: "Tech Talent", value: "techtalent" },
    { label: "Agent", value: "agent" },
    { label: "Employer", value: "employer" },
    { label: "Service Provider", value: "serviceprovider" },
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

    const authKey =
      (searchParams.get("authKey")
        ? "Bearer " + searchParams.get("authKey")
        : null) ||
      JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey ||
      JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1"))?.authKey;

    if (!accountTypes[accountChoice]) {
      toast({
        title: "Invalid Selection",
        description: "Please select a valid account type.",
      });
      setSubmittingLoading(false);
      return;
    }

    if (accountChoice === "serviceprovider" || accountChoice === "agent") {
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

      setTimeout(() => {
        navigate(accountChoice === "serviceprovider" ? "/services-provider/complete-profile" : "/agent");
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

        setTimeout(() => {
          if (accountChoice === "employer") {
            localStorage.setItem("NXGJOBHUBEmpCP", JSON.stringify(true));
            navigate("/employer/complete-profile", { replace: true });
          } else if (accountChoice === "techtalent") {
            localStorage.setItem("NXGJOBHUBTCP", JSON.stringify(true));
            navigate("/techtalent/complete-profile", { replace: true });
          }
        }, 3000);
      } catch (err) {
        console.error(err);
        setSubmittingLoading(false);
        toast({
          className: cn("top-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"),
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


  return (
    <div className="space-y-10">
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4">
        <img className="w-20 sm:w-24" src={Logo} alt="logo" />
      </nav>

      <div className="px-5 sm:mx-auto sm:w-1/3 sm:p-6 sm:border sm:border-sky-400 sm:rounded-md">
        <div className="mb-8">
          <h1 className="font-semibold text-2xl">Join our community of professionals</h1>
          <p className="text-base text-slate-500">Get started and connect with professionals!</p>
        </div>

        <RadioGroup className="flex flex-col space-y-1 mb-6" onValueChange={handleChange}>
          {accountRadios.map((radio) => (
            <div
              key={radio.value}
              className="flex items-center justify-between space-x-48 space-y-0 border rounded p-4 text-base"
            >
              <Label htmlFor={radio.value}>{radio.label}</Label>
              <RadioGroupItem
                className="p-0 border-black hover:border-transparent hover:bg-secondary"
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
            Log in
          </Link>
        </p>
      </div>

      <Toaster />
    </div>
  );
};

export default SelectAccountType;
