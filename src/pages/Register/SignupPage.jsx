import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent } from "@/components/ui/card";
import Googleicon from "../../static/images/icon_google.png";
import Linkedinicon from "../../static/images/icon_linkedin.png";
import regbg from "../../static/images/regbg.webp";
import Logo from "../../static/images/splash.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import { cn } from "@/lib/utils";
import EmailVerificationNotice from "@/components/EmailVerificationNotice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "Name cannot be less than 3 characters")
      .nonempty()
      .regex(/^[A-Za-z-]+$/, "Name can only contain letter"),

    lastName: z
      .string()
      .min(3, "Name cannot be less than 3 characters")
      .nonempty()
      .regex(/^[A-Za-z-]+$/, "Name can only contain letter"),

    phoneNumber: z
      .string()
      .refine((val) => isValidPhoneNumber(val), {
        message: "Invalid phone number",
      })
      .transform((value, ctx) => {
        const phone_num = parsePhoneNumberWithError(value, {
          defaultCountry: "NG",
        });
        if (!phone_num?.isValid()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid phone number",
          });
          return z.NEVER;
        }
        return phone_num.formatInternational();
      }),

    email: z.string().email(),

    gender: z.enum(["MALE", "FEMALE"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
    password: z
      .string()
      .min(8, "Password must contain at least 8 character(s)")
      .regex(/[A-Za-z]/, "Must contain at least a letter ")
      .regex(/\d/, "Must contain at least a number "),
    re_password: z.string(),
    terms_condition: z.boolean(),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.re_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password don't match, please repeat password again.",
        path: ["re_password"],
      });
    }
  });

export default function SignupForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [regEmail, setRegEmail] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      password: "",
      re_password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (dataForm) => {
      const res = await axios.post(
        `${API_HOST_URL}/api/v1/auth/register/`,
        dataForm
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast({
        className: cn(
          "bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
        ),
        title: <span className="text-green-800">Registration Successful:</span>,
        description: (
          <p className="text-gray-800 rounded-md bg-green-100 p-4 font-mono w-full">
            Your account have been successfully registered. Kindly proceed to
            verify your account!
          </p>
        ),
        duration: 2500,
      });
      setTimeout(() => {
        window.sessionStorage.setItem("NXGJOBHUBREG", regEmail);
        navigate("/register/success-signup", { replace: true });
        form.reset();
      }, 3000);
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
                Account creation failed, please check your internet connection.
              </p>
            ),
            action: (
              <ToastAction
                onClick={form.handleSubmit(onSubmit)}
                className="bg-primary text-white   hover:bg-sky-700 hover:text-white self-start border-transparent"
                altText="Try again">
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
          title: <span className="text-red-900">Registration failed:</span>,
          description: (
            <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
              {err.response.data}
            </p>
          ),
        });
      }
    },
  });

  function onSubmit(values) {
    setRegEmail(values.email);
    mutation.mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      password: values.password,
      deviceType: "WEB",
    });
  }

  return (
    <Card
      style={{ backgroundImage: `url(${regbg})` }}
      className=" sm:bg-cover sm:bg-center sm:bg-no-repeat 
        sm:min-h-screen sm:w-full sm:grid sm:place-items-center">
      <img
        src={Logo}
        alt="login-logo"
        className="rounded-l-lg h-[70px] w-[70px] absolute left-[5%] top-5"
      />
      <CardContent className="bg-white rounded-lg shadow-lg p-10 sm:w-[60%] sm:my-12 sm:px-20 sm:py-10">
        <div>
          <h1 className="text-3xl font-semibold">Let's get you started</h1>
          <p className="text-base">
            Get started and connect to different professionals.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10">
            <div className="space-y-7 sm:flex sm:space-x-6 sm:space-y-0">
              <div className="sm:w-1/2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          type=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="sm:w-1/2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
                          type=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder="Enter your phone number"
                      {...field}
                      defaultCountry="NG"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
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
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex space-x-10 ">
                      <FormItem className="flex space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            className="p-0 border-black hover:border-transparent hover:bg-secondary"
                            value="MALE"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            className="p-0 border-black hover:border-transparent hover:bg-secondary"
                            value="FEMALE"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
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

            <FormField
              control={form.control}
              name="re_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retype password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms_condition"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormControl>
                    <Checkbox
                      className="p-0 border-black hover:border-transparent hover:bg-secondary"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <p className="text-xs sm:text-base">
                    I agree to the
                    <Link
                      to={"/terms"}
                      target="_blank"
                      className="text-primary hover:underline">
                      {" "}
                      Terms of Service{" "}
                    </Link>
                    and
                    <Link
                      to={"/privacy"}
                      target="_blank"
                      className="text-primary hover:underline">
                      {" "}
                      Privacy conditions
                    </Link>
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={mutation.isPending}
              className="w-full bg-sky-600 border-none hover:bg-sky-700"
              type="submit">
              {mutation.isPending ? (
                <div className="flex items-center space-x-1">
                  <Loader2 className="animate-spin" />
                  <span>Form submitting ....</span>
                </div>
              ) : (
                <span>Register</span>
              )}
            </Button>
          </form>
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-600">
              Log in
            </Link>
          </p>
          <Link
            to={"/"}
            className="flex items-center space-x-2 text-gray-500 mt-5">
            <ArrowLeft />
            <span className="text-sm">Go back to</span>
            <span className="text-sky-600">Home</span>
          </Link>
        </Form>

        {/* or signup using other methods */}
        {/* <div>
          <section class="w-10/12 flex items-center text-gray-600 mx-auto mb-10 sm:text-sm sm:w-2/3">
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

        <Toaster />
      </CardContent>
    </Card>
  );
}
