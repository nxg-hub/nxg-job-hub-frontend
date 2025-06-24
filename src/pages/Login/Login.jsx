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
  password: z.string(),
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

      const userRes = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
        headers: {
          "Content-Type": "application/json",
          authorization: authKey,
        },
      });

      const id = userRes.data.id; // Assuming the user ID is returned in the response

      if (values.keep_loggin && authKey) {
        // if "remember me" is set, Save authentication key to local storage
        window.localStorage.setItem(
          "NXGJOBHUBLOGINKEYV1",
          JSON.stringify({ authKey, email, id })
        );
      } else if (!values.keep_loggin && authKey) {
        // if login without "remember me", start a session
        window.sessionStorage.setItem(
          "NXGJOBHUBLOGINKEYV1",
          JSON.stringify({ authKey, email, id })
        );
      } else if (authKey) {
        // if login without "remember me", start a session
        window.localStorage.setItem(
          "NXGJOBHUBLOGINKEYV1",
          JSON.stringify(authKey)
        );
      }

      if (!userRes.data.userType) {
        navigate("/create");
      } else {
        toast({
          className: cn(
            "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
          ),
          title: "Successful",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
              <code className="text-white">Logging in...</code>
            </pre>
          ),
          duration: 2500,
        });
        setTimeout(() => {
          navigate(
            userRes.data.userType === "EMPLOYER"
              ? "/employer"
              : userRes.data.userType === "AGENT"
              ? "/agent"
              : userRes.data.userType === "TALENT"
              ? "/talent"
              : null
          );
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
            ),
            title: "Failed to login",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
                <code className="text-white">
                  Wrong email or password combination
                </code>
              </pre>
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
            "flex flex-col gap-5 top-10 right-4 fixed max-w-[400px] md:max-w-[420px]"
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

  const AutoLoginUser = async () => {
    const storedData = JSON.parse(
      window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")
    );
    if (storedData) {
      getUserUsingAuthKey(storedData.authKey).then((data) => {
        if (!data.userType) {
          navigate("/create");
        } else {
          navigate(
            userRes.data.userType === "EMPLOYER"
              ? "/employer"
              : accountChoice === "AGENT"
              ? "/agent"
              : accountChoice === "TALENT"
              ? "/talent"
              : null
          );
        }
      });
    }
  };
  useEffect(() => {
    AutoLoginUser();
    // .then(() => {
    //   // Handle successful login if needed
    // })
    // .catch((error) => {
    //   console.error("Auto login failed:", error);
    // });
  });

  return (
    <div className="flex items-center justify-center min-h-screen py-14">
      <Card>
        <CardContent className="flex rounded-b-lg  p-0 sm:w-[1000px]">
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
