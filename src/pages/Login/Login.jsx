import { useEffect, useState } from "react";
import { useAutoLogin } from "@/hooks/useAutoLogin";
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
import LoginBG from "../../static/images/loginbg.webp";
import Logo from "../../static/images/splash.png";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import { Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { getLoggedInServiceProviderData } from "@/redux/ServiceProviderUserDataSlice";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/AllUsersSlice";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  keep_loggin: z.boolean().optional(),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  //a state that disabled login button when trying to log user in
  const [loginLoading, setLoginLoading] = useState(false);

  const { data, fetchStatus, isError, isSuccess, error } = useAutoLogin();

  //if auto-login check has completed(either success or failed)
  const isAutoLoginChecking = fetchStatus === "fetching";

  useEffect(() => {
    if (!isAutoLoginChecking) {
      if (isSuccess && data?.userType) {
        //redirect user to their dashboard based on thier type
        if (data.userType === "EMPLOYER") {
          navigate("/employer", { replace: true });
        } else if (data.userType === "TECHTALENT") {
          navigate("/talent", { replace: true });
        } else if (data.userType === "SERVICE_PROVIDER") {
          navigate("/services-provider", { replace: true });
        } else {
          console.warn("Unknown user type:", data.userType);
        }
      } else if (isError) {
        // Clear invalid token if this error occurred
        localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
        sessionStorage.removeItem("NXGJOBHUBLOGINKEYV1");
        console.error("Auto-login failed:", error.message);
      }
    }
  }, [isAutoLoginChecking, isSuccess, isError, data, error, navigate]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      keep_loggin: false,
    },
  });

  async function onSubmit(values) {
    setLoginLoading(true);
    try {
      const res = await axios.post(`${API_HOST_URL}/api/v1/auth/login`, {
        email: values.email,
        password: values.password,
      });

      const authKey = res.headers.authorization;

      if (!authKey) {
        navigate("/login");
        return;
      }
      dispatch(getLoggedInServiceProviderData({ token: authKey }));
      const userRes = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
        headers: {
          "Content-Type": "application/json",
          authorization: authKey,
        },
      });
      dispatch(setUserData(userRes.data));
      const id = userRes.data.id; // Assuming the user ID is returned in the response

      if (values.keep_loggin && authKey) {
        // if "remember me" is set, Save authentication key to local storage
        window.localStorage.setItem(
          "NXGJOBHUBLOGINKEYV1",
          JSON.stringify({ authKey, email, id })
        );
      } else if (!values.keep_loggin && authKey) {
        // if login without "remember me", start a session
        sessionStorage.setItem(
          "NXGJOBHUBLOGINKEYV1",
          JSON.stringify({ authKey, email, id })
        );
      } else if (authKey) {
        // if login without "remember me", start a session
        localStorage.setItem("NXGJOBHUBLOGINKEYV1", JSON.stringify(authKey));
      }

      if (!userRes.data.userType) {
        // navigate("/create");
        navigate("/createAccount");
      } else {
        toast({
          className: cn(
            "bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
          ),
          title: <span className="text-green-800">Successful:</span>,
          description: (
            <p className="text-gray-800 rounded-md bg-green-100 p-4 font-mono w-full">
              Logging in...
            </p>
          ),
          duration: 2500,
        });

        setTimeout(() => {
          //navigate to existing user dashboard
          navigate(
            userRes.data.userType === "EMPLOYER"
              ? "/employer"
              : userRes.data.userType === "TECHTALENT"
              ? "/talent"
              : userRes.data.userType === "SERVICE_PROVIDER"
              ? "/services-provider"
              : null
          );
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Failed to login:</span>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                Wrong email or password combination
              </p>
            ),
          });

          setTimeout(() => {
            setLoginLoading(false);
          }, 3000);
        }
      }

      if (!error.response) {
        toast({
          className: cn(
            "flex flex-col gap-5 bottom-10 right-4 fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: <p className="text-red-700">Network error</p>,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-gray-100 p-4 text-red-700">
              <code>
                Failed to login, please check your
                <br />
                internet connection.
              </code>
            </pre>
          ),
          action: (
            <ToastAction
              onClick={form.handleSubmit(onSubmit)}
              className="bg-primary text-white   hover:bg-sky-700 hover:text-white self-start border-transparent"
              altText="Try again"
            >
              Try again
            </ToastAction>
          ),
        });

        setTimeout(() => {
          setLoginLoading(false);
        }, 3000);
      }
    }
  }

  if (isAutoLoginChecking || (isSuccess && data?.userType)) {
    return <div>logging you in</div>;
  }

  return (
    <>
      <div className="bg-[#215E7D]">
        <Header />
      </div>
      <div className="flex items-center justify-center min-h-screen sm:py-14">
        <Card className="border-transparent">
          <CardContent className="flex items-center rounded-b-lg  p-0 sm:w-[1000px] ">
            <section
              className="hidden h-[615px] sm:inline-block sm:w-1/2 bg-cover bg-center  rounded-l-lg"
              style={{ backgroundImage: `url(${LoginBG})` }}
            >
              <img
                src={Logo}
                alt="login-logo"
                className="rounded-l-lg h-[50px] w-[50px] ml-[5%] mt-[20px]"
              />
            </section>

            <section className="md:border-[1px] rounded-r-lg px-10 sm:w-1/2 sm:px-10 sm:py-14">
              <div>
                <h1 className="text-3xl font-semibold">Login.</h1>
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
                            type="text"
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
                      Forget Passoword?
                    </Link>
                  </div>

                  <FormField
                    control={form.control}
                    name="keep_loggin"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                        <FormControl>
                          <Checkbox
                            className="p-0  border-black hover:border-transparent hover:bg-secondary"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Keep me logged In</FormLabel>

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
              {/* Logging using third party vendor  /> */}
              {/* <div>
      <section class="flex items-center text-gray-600 mx-auto mb-10 sm:text-sm sm:w-2/3">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="px-4">or</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </section>
      <section className="flex space-x-3 sm:flex-col sm:space-y-3 sm:space-x-0">
        <Button
          variant="outline"
          className="w-full"
          type="submit">
          <img
            className="w-5 h-5"
            src={Googleicon}
            alt=""
          />
          <span className="hidden sm:inline-block">
            Sign In with Google
          </span>
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="submit">
          <img
            className="w-5 h-5"
            src={Linkedinicon}
            alt=""
          />
          <span className="hidden sm:inline-block">
            Sign In with LinkedIn
          </span>
        </Button>
      </section>
    </div> */}
              <div className="text-center">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="underline text-sm text-sky-600"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </section>
            <Toaster />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
