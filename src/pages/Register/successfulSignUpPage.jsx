import { useNavigate } from "react-router-dom";
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
          "bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
        ),
        title: <span className="text-green-800">Successful:</span>,
        description: (
          <p className="text-gray-800 rounded-md bg-green-100 p-4 font-mono w-full">
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
              "flex flex-col space-y-5 items-start top-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
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
              "flex flex-col space-y-5 items-start top-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Network error:</span>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                Email verification link resend failed, please check your
                internet connection.
              </p>
            ),
            action: (
              <ToastAction
                onClick={handleResendEmail}
                className="bg-primary text-white   hover:bg-sky-700 hover:text-white self-start border-transparent"
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
    <div>
      <nav className="flex justify-between items-center w-full bg-sky-600 p-4">
        <div className="flex items-center gap-2">
          <img className="w-20 sm:w-14" src={Logo} alt="" />
          <div className="flex flex-col text-white -space-y-1.5">
            <span className="font-bold text-3xl">NXG</span>
            <span className="text-xs tracking-widest">JOB HUB</span>
          </div>
        </div>
      </nav>
      <div className="w-full flex items-center justify-center px-52 mt-40">
        <div className="w-3/5 flex flex-col justify-center items-center gap-3 border-[1px] rounded-md shadow-sm py-10">
          <p className="text-3xl">🥳</p>
          <p className="text-gray-400 text-sm">Registration successful</p>
          <h1 className="text-gray-900 text-2xl font-bold">
            Welcome NXG JUBHUB
          </h1>
          <p className="w-10/12 text-justify leading-relaxed px-5 text-gray-800">
            We've sent an activation link to your email address. Please check
            your inbox ( and spam folder, just in case) to verify your account.
            Your account will only be activated after you click the verification
            link in the email.
          </p>
          <div className="flex place-items-end gap-28 mt-6">
            <div className="flex flex-col">
              <span className="text-sm self-end px-2 text-gray-500"></span>
              <Button
                variant="outline"
                className=""
                type="button"
                onClick={backToLoginPage}
              >
                Proceed to Login
              </Button>
            </div>
            <div className="flex flex-col">
              <span className="text-sm self-end px-2 text-gray-500">
                Didn't receive the email?
              </span>
              <Button
                onClick={handleResendEmail}
                className="border-transparent bg-secondary hover:bg-primary text-white hover:text-white"
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
