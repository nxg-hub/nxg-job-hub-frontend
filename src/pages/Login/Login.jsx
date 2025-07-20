import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import Googleicon from "../../static/images/icon_google.png";
import Linkedinicon from "../../static/images/icon_linkedin.png";
import LoginBG from "../../static/images/login-left-bg.png";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { cn, getUserUsingAuthKey } from "@/lib/utils";
import axios from "axios";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import { Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  keep_loggin: z.boolean().optional(),
});

export default function LoginForm() {
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      keep_loggin: false,
    },
  });

  // Improved onSubmit function with better error handling
async function onSubmit(values) {
  setLoginLoading(true);
  
  try {
    // Login request
    const res = await axios.post(
      `${API_HOST_URL}/api/v1/auth/login`,
      {
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false, // Explicitly set to false for now
      }
    );

    // Extract and format auth token
    const rawAuthKey = res.headers.authorization || res.headers.Authorization;
    console.log("Raw Auth Header:", rawAuthKey);

    if (!rawAuthKey) {
      throw new Error("No authorization header received from server");
    }

    const authKey = rawAuthKey.startsWith("Bearer ")
      ? rawAuthKey
      : `Bearer ${rawAuthKey}`;

    if (authKey === "Bearer undefined" || authKey === "Bearer null") {
      throw new Error("Invalid authorization token received");
    }

    console.log("Auth Key Being Sent:", authKey);

    // Get user data
    const userRes = await axios.get(
      `${API_HOST_URL}/api/v1/auth/get-user`,
      {
        headers: {
          "Authorization": authKey,
          "Content-Type": "application/json",
        },
        withCredentials: false, // Match the login request
      }
    );

    const { id, userType } = userRes.data;
    const userData = { 
      authKey, 
      email: values.email, 
      id, 
      userType 
    };

    // Store user data based on "keep logged in" preference
    if (values.keep_loggin) {
      window.localStorage.setItem("NXGJOBHUBLOGINKEYV1", JSON.stringify(userData));
      // Clear session storage to avoid conflicts
      window.sessionStorage.removeItem("NXGJOBHUBLOGINKEYV1");
    } else {
      window.sessionStorage.setItem("NXGJOBHUBLOGINKEYV1", JSON.stringify(userData));
      // Clear local storage to avoid conflicts
      window.localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
    }

    // Navigate based on user type
    if (!userType) {
      navigate("/create");
    } else {
      toast({
        className: cn(
          "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
        ),
        title: "Success",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
            <code className="text-white">Logging in...</code>
          </pre>
        ),
        duration: 2500,
      });

      setTimeout(() => {
        navigate(
          userType === "EMPLOYER"
            ? "/employer"
            : userType === "AGENT"
            ? "/agent"
            : userType === "TALENT"
            ? "/talent"
            : "/create"
        );
      }, 2500); // Reduced timeout to match toast duration
    }
  } catch (error) {
    console.error("Login error:", error);
    
    // Enhanced error handling
    if (error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data?.message || "Login failed";
      
      let title = "Login Failed";
      let description = errorMessage;
      
      if (status === 401) {
        title = "Invalid Credentials";
        description = "Please check your email and password";
      } else if (status === 403) {
        title = "Access Denied";
        description = "Your account may be suspended or you don't have permission";
      } else if (status === 404) {
        title = "Account Not Found";
        description = "No account found with this email address";
      } else if (status === 429) {
        title = "Too Many Attempts";
        description = "Please wait before trying again";
      }
      
      toast({
        className: cn(
          "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
        ),
        title,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
            <code className="text-white">{description}</code>
          </pre>
        ),
      });
    } else if (error.request) {
      // Network error
      toast({
        className: cn(
          "flex flex-col gap-5 top-10 right-4 fixed max-w-[400px] md:max-w-[420px]"
        ),
        title: "Network Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-gray-100 p-4 text-red-700">
            <code>
              Failed to connect to server.
              Please check your internet connection.
            </code>
          </pre>
        ),
        action: (
          <ToastAction
            onClick={() => form.handleSubmit(onSubmit)()}
            className="bg-primary text-white hover:bg-sky-700 hover:text-white self-start border-transparent"
            altText="Try again"
          >
            Try again
          </ToastAction>
        ),
      });
    } else {
      // Other errors (including our custom errors)
      toast({
        className: cn(
          "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
        ),
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
            <code className="text-white">
              {error.message || "An unexpected error occurred"}
            </code>
          </pre>
        ),
      });
    }
  } finally {
    setLoginLoading(false);
  }
}

  // Fixed AutoLoginUser function
  const AutoLoginUser = async () => {
    try {
      const storedData = JSON.parse(
        window.localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
        window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
        "null"
      );
  
      if (storedData?.authKey) {
        try {
          const userData = await getUserUsingAuthKey(storedData.authKey);

          if (!userData?.userType) {
            navigate("/create");
          } else {
            navigate(
              userData.userType === "EMPLOYER"
                ? "/employer"
                : userData.userType === "AGENT"
                ? "/agent"
                : userData.userType === "TALENT"
                ? "/talent"
                : "/create"
            );
          }
        } catch (authError) {
          console.error("Authentication failed:", authError);
         // Clear invalid stored data on auth failure
          window.localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
          window.sessionStorage.removeItem("NXGJOBHUBLOGINKEYV1");
        
          // Don't navigate to login if already on login page
          if (window.location.pathname !== "/login") {
            navigate("/login");
          }
        }
      }
    } catch (error) {
      console.error("Auto login failed:", error);
      // Clear invalid stored data
      window.localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
      window.sessionStorage.removeItem("NXGJOBHUBLOGINKEYV1");
    }
  };

  // Add a flag to prevent multiple calls
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  useEffect(() => {
    if (!autoLoginAttempted) {
      setAutoLoginAttempted(true);
      AutoLoginUser();
    }
  }, [autoLoginAttempted]); // Add autoLoginAttempted to dependency array

  return (
    <div className="flex items-center justify-center min-h-screen py-14">
      <Card>
        <CardContent className="flex rounded-b-lg p-0 sm:w-[1000px]">
          <section className="hidden sm:inline-block sm:w-1/2">
            <img src={LoginBG} alt="" className="rounded-l-lg h-full" />
          </section>
          <section className="px-10 sm:w-1/2 sm:px-10 py-14">
            <div>
              <h1 className="text-3xl font-semibold">
                Sign in to your account
              </h1>
              <p className="text-base">Login into your account</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-3xl mx-auto py-10"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter your password."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <Link to="/forgotpassword" className="underline text-sm">
                    Forgot Password?
                  </Link>
                </div>

                <FormField
                  control={form.control}
                  name="keep_loggin"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          className="p-0 border-black hover:border-transparent hover:bg-secondary"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Keep me logged in</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button
                  disabled={loginLoading}
                  className="w-full bg-sky-600 border-none hover:bg-sky-700"
                  type="submit"
                >
                  {loginLoading ? (
                    <div className="flex items-center space-x-1">
                      <Loader2 className="animate-spin" />
                      <span>Please wait</span>
                    </div>
                  ) : (
                    <span>Sign in</span>
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="text-center">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="underline text-sm text-sky-600">
                  Sign up
                </Link>
              </p>
            </div>
          </section>
          <Toaster />
        </CardContent>
      </Card>
    </div>
  );
}