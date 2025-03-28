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
import { cn } from "@/lib/utils";
import axios from "axios";
import { API_HOST_URL } from "../../utils/api/API_HOST";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
  keep_loggin: z.boolean().optional(),
});

export default function TestLoginForm() {
  const navigate = useNavigate();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    try {
      // console.log(values);
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

      if (check && authKey) {
        // if "remember me" is set, Save authentication key to local storage
        window.localStorage.setItem(
          "NXGJOBHUBLOGINKEYV1",
          JSON.stringify({ authKey, email, id })
        );
      } else if (!check && authKey) {
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
        navigate(
          userRes.data.userType === "employer"
            ? "/profilelanding"
            : "/dashboard"
        );
      }

      toast({
        className: cn(
          "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
        ),
        title: "Successful",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Login now {values.keep_loggin ? "Yes" : "No"}
            </code>
          </pre>
        ),
      });
    } catch (error) {
      // let errorMessage = error.response.data || error.message;
      console.error("Form login error", error);

      toast({
        className: cn(
          "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
        ),
        title: "errorMessage",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              Failed to login. Please try again.
            </code>
          </pre>
        ),
      });
    }
    // catch (error) {
    //   let errorMessage = error.response.data || error.message;
    //   console.log(error);

    //   showpopUp({
    //     type: "danger",
    //     message: "Login failed, " + errorMessage,
    //   });
    //   setTimeout(() => showpopUp(undefined), 5000);
    // }
  }

  const AutoLoginUser = async () => {
    const storedData = JSON.parse(
      window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")
    );
    if (storedData) {
      const userRes = await axios.get(`${API_HOST_URL}/api/v1/auth/get-user`, {
        headers: {
          "Content-Type": "application/json",
          authorization: storedData.authKey,
        },
      });
      if (!userRes.data.userType) {
        navigate("/create");
      } else {
        navigate("/dashboard");
      }
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
            <img
              src={LoginBG}
              alt=""
              className="rounded-l-lg h-full"
            />
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
                className="space-y-8 max-w-3xl mx-auto py-10">
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
                  <Link
                    to={"/"}
                    className="underline text-sm">
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
                          className="p-0"
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
                  className="w-full bg-sky-600 border-none hover:bg-sky-700"
                  type="submit">
                  <span>Sign in</span>
                </Button>
              </form>
            </Form>
            <div>
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
            </div>
            <div className="text-center mt-20">
              <p>
                Don't have an account?{" "}
                <Link
                  to={"/"}
                  className="underline text-sm text-sky-600">
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
