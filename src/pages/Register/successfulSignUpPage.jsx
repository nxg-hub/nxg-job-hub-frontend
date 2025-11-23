import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/static/images/splash.png";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ToastAction } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function SuccessfulSignupPage() {
  const navigate = useNavigate();

  const handleResendEmail = async () => {
    let email = window.sessionStorage.getItem("NXGJOBHUBREG");
    mutation.mutate(email);
  };

  const backToLoginPage = () => {
    window.sessionStorage.removeItem("NXGJOBHUBREG");
    navigate("/login");
  };

  const mutation = useMutation({
    mutationFn: async (email) => {
      const url = `${API_HOST_URL}/api/v1/auth/resendverification-mail?email=${encodeURIComponent(
        email
      )}`;
      const res = await axios.post(url);
      return res.data;
    },
    onSuccess: (data) => {
      toast({
        className: cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 py-2 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
        ),
        title: (
          <span className="text-green-800 text-xs sm:text-sm">Successful:</span>
        ),
        description: (
          <p className="w-full  bg-gray-100 p-2 text-green-700 text-xs sm:text-sm">
            Email verification link resend, kindly proceed to verify your
            account!
          </p>
        ),
        duration: 2500,
      });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast({
            className: cn(
              "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 py-2 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
            ),
            title: <p className="text-red-700 text-xs sm:text-sm">Failed:</p>,
            description: (
              <p className="w-full  bg-gray-100 p-2 text-red-700 text-xs sm:text-sm">
                {err.response.data}
              </p>
            ),
          });
        } else if (err.request) {
          toast({
            className: cn(
              "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 py-2 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
            ),
            title: <span className="text-red-900">Network error:</span>,
            description: (
              <p className="w-full  bg-gray-100 p-2 text-red-700 text-xs sm:text-sm">
                Please check your internet connection.
              </p>
            ),
            action: (
              <ToastAction
                onClick={handleResendEmail}
                className="text-xs text-secondary p-0 self-end mt-7  sm:text-sm sm:px-2 sm:bg-secondary sm:text-white hover:bg-sky-700 hover:text-white border-transparent"
                altText="Try again"
              >
                Try again
              </ToastAction>
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
              {err.response.data}
            </p>
          ),
        });
      }
    },
  });

  return (
    <div className="min-h-screen">
      <nav className="flex w-full bg-sky-600 p-2 fixed top-0 left-0 z-50 md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10" src={Logo} alt="" />
          <div className="flex flex-col text-white -space-y-1.5">
            <span className="font-bold text-2xl">NXG</span>
            <span className="text-xs ">JOB HUB</span>
          </div>
        </Link>
      </nav>
      <div className="w-full flex items-center justify-center px-3 md:px-52 pt-20 md:pt-40">
        <div className="w-full md:max-w-3xl flex flex-col justify-center items-center gap-3 border-[1px] rounded-md shadow-sm py-10">
          <p className="text-xl md:text-3xl">🥳</p>
          <p className="text-gray-400 text-xs md:text-sm">
            Registration successful
          </p>
          <h1 className="text-gray-900 text-lg md:text-2xl font-bold">
            Welcome to NXG JUBHUB
          </h1>
          <p className="w-full text-justify leading-relaxed px-5 text-gray-800 text-sm md:text-base md:px-10">
            We've sent an activation link to your email address. Please check
            your inbox ( and spam folder, just in case) to verify your account.
            Your account will only be activated after you click the verification
            link in the email.
          </p>
          <div className="w-full flex flex-col px-7 md:flex-row md:place-items-end md:justify-center gap-5 md:gap-40 mt-6">
            <div className="md:flex md:flex-col">
              <Button
                variant="outline"
                className="w-full h-11"
                type="button"
                onClick={backToLoginPage}
              >
                Proceed to Login
              </Button>
            </div>
            <div className="flex flex-col">
              <span className="hidden md:block text-sm self-end px-2 text-gray-500">
                Didn't receive the email?
              </span>
              <Button
                onClick={handleResendEmail}
                className="w-full h-11 border-transparent bg-secondary hover:bg-primary text-white hover:text-white"
                type="button"
              >
                Resend Activation Email
              </Button>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
