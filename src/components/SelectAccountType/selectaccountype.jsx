import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
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
import { cn, getUserUsingAuthKey } from "@/lib/utils";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const SelectAccountType = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [submittingLoading, setSubmittingLoading] = useState(false);
  const { toast } = useToast();
  const isAuthenticated = useAuthRedirect("NXGJOBHUBLOGINKEYV1", "/login");
  const [accountChoice, setAccountChoice] = useState("");

  const accountRadios = [
    { label: "Tech Talent", value: "techtalent" },
    { label: "Agent", value: "agent" },
    { label: "Employer", value: "employer" },
  ];

  const accountTypes = {
    techtalent: `${API_HOST_URL}/api/v1/tech-talent/register/`,
    agent: `${API_HOST_URL}/api/agents/createAgent`,
    employer: `${API_HOST_URL}/api/employers/createEmployer`,
  };

  const profileRoutes = {
    techtalent: "/techtalent/complete-profile",
    agent: "/agent/complete-profile",
    employer: "/employer/complete-profile",
  };

  const userTypeRoutes = {
    EMPLOYER: "/employer",
    AGENT: "/agent",
    TALENT: "/talent",
  };

  const handleChange = (value) => {
    setAccountChoice(value);
  };

  const getAuthKey = () => {
    // Check URL params first
    if (searchParams.get("authKey")) {
      return `Bearer ${searchParams.get("authKey")}`;
    }
    
    // Check stored data
    const storedData = JSON.parse(
      window.localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      "null"
    );
    
    return storedData?.authKey || null;
  };

  const showToast = (type, title, message, duration = null) => {
    const baseClassName = "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]";
    const className = type === "error" 
      ? `${baseClassName} flex-col space-y-5 items-start`
      : baseClassName;
    
    const bgColor = type === "success" ? "bg-green-700" : 
                   type === "error" ? "bg-red-700" : "bg-yellow-600";

    toast({
      className: cn(className),
      title,
      description: (
        <pre className={`mt-2 w-[340px] rounded-md p-4 ${bgColor}`}>
          <code className="text-white">{message}</code>
        </pre>
      ),
      ...(duration && { duration }),
    });
  };

  const redirectToProfile = (accountChoice) => {
    setTimeout(() => {
      navigate(profileRoutes[accountChoice]);
    }, 3000);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    let parsedKey;
    try {
      parsedKey = JSON.parse(isAuthenticated);
    } catch (err) {
      console.error("Invalid auth key", err);
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await getUserUsingAuthKey(parsedKey.authKey);
        if (data.userType && userTypeRoutes[data.userType]) {
          navigate(userTypeRoutes[data.userType]);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [isAuthenticated, navigate]);

  const setAccountType = async () => {
    if (!accountChoice) {
      showToast("warning", "Selection Required", "Please select an account type");
      return;
    }

    setSubmittingLoading(true);
    
    try {
      const authKey = getAuthKey();
      
      if (!authKey) {
        showToast("error", "Authentication Error", "No authentication token found. Please log in again.");
        navigate("/login");
        return;
      }

      console.log("Creating account for:", accountChoice);
      console.log("Using endpoint:", accountTypes[accountChoice]);

      // Enhanced request with better error handling
      const response = await axios.post(
        accountTypes[accountChoice],
        {}, // Empty body - make sure your API expects this
        {
          headers: {
            "Authorization": authKey,
            "Content-Type": "application/json",
          },
          withCredentials: false,
          timeout: 10000, // 10 second timeout
        }
      );

      console.log("Account creation response:", response.data);
      
      showToast(
        "success", 
        "Successful", 
        `Created ${accountChoice} account successfully`,
        2500
      );
      
      redirectToProfile(accountChoice);
      
    } catch (err) {
      console.error("Account creation failed:", err);
      
      // More detailed error handling
      let errorMessage = "Account creation failed. Please try again.";
      
      if (err.response) {
        // Server responded with error status
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 400) {
          errorMessage = data?.message || data?.error || "Bad request. Please check your account selection.";
        } else if (status === 401) {
          errorMessage = "Authentication failed. Please log in again.";
          setTimeout(() => navigate("/login"), 2000);
        } else if (status === 403) {
          errorMessage = "Access denied. You don't have permission to create this account type.";
        } else if (status === 409) {
          errorMessage = "Account already exists. Please try logging in instead.";
        } else if (status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (err.request) {
        // Network error
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (err.code === 'ECONNABORTED') {
        // Timeout error
        errorMessage = "Request timeout. Please try again.";
      }
      
      showToast("error", "Failed", errorMessage);
    } finally {
      setSubmittingLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col space-y-10">
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4">
        <img className="w-20 sm:w-24" src={Logo} alt="Logo" />
        <Link
          className="self-end sm:hidden text-white sm:mr-5 sm:mt-5"
          to="/login"
          title="Close"
        >
          <AiOutlineClose />
        </Link>
      </nav>
      
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center w-full min-h-screen rounded-b-lg shadow-md sm:space-y-10 sm:w-[700px]">
          <Link
            className="hidden self-end sm:block sm:mr-5 sm:mt-5"
            to="/login"
            title="Close"
          >
            <AiOutlineClose />
          </Link>
          
          <div className="flex flex-col items-center w-full sm:w-10/12 sm:p-6 sm:border sm:border-sky-400 sm:rounded-md">
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
                  ? "w-2/3 bg-gray-300 border-none text-white rounded py-3 mb-5 cursor-not-allowed hover:bg-gray-300"
                  : "w-2/3 bg-sky-600 border-none text-white rounded py-3 mb-5 cursor-pointer hover:bg-sky-700"
              }
              type="button"
              onClick={setAccountType}
              aria-disabled={!accountChoice || submittingLoading}
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

            <p>
              Already have an account?{" "}
              <Link className="text-sky-600" to="/login">
                Log in
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