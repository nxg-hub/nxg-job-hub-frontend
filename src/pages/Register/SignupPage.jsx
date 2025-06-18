import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumberWithError } from "libphonenumber-js";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import { cn } from "@/lib/utils";
import User from "@/utils/classes/User";
import EmailVerificationNotice from "@/components/EmailVerificationNotice";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const formSchema = z
  .object({
    first_name: z
      .string()
      .min(3, "Name cannot be less than 3 characters")
      .nonempty()
      .regex(/^[A-Za-z]+$/i, "Name can only contain letter"),

    last_name: z
      .string()
      .min(3, "Name cannot be less than 3 characters")
      .nonempty()
      .regex(/^[A-Za-z]+$/i, "Name can only contain letter"),

    phone_num: z.string().transform((value, ctx) => {
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

    gender: z.string(),
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
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showEmailVerificationNotice, setShowEmailVerificationNotice] =
    useState(false);

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_num: "",
      email: "",
      gender: "",
      password: "",
      re_password: "",
    },
  });

  const closeModal = (e) => {
    if (e.target === e.currentTarget) setShowEmailVerificationNotice(false);
  };

  function onSubmit(values) {
    setSubmitLoading(true);
    const user = new User(values);
    axios
      .post(`${API_HOST_URL}/api/v1/auth/register/`, user)
      .then((res) => {
        if (res.status) {
          toast({
            className: cn(
              "top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
            ),
            title: "Registration Successful",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
                <code className="text-white">
                  Your account have been successfully registered. Kindly proceed
                  to verify your account!
                </code>
              </pre>
            ),
            duration: 2500,
          });
          setTimeout(() => {
            setShowEmailVerificationNotice(true);
            form.reset();
            setSubmitLoading(false);
          }, 3000);
        }
      })
      .catch((error) => {
        console.log("err", error);
        if (error.response) {
          if (error.response.status === 400) {
            toast({
              className: cn(
                "flex flex-col space-y-5 items-start top-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
              ),
              title: "Registration failed",
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-red-700 p-4">
                  <code className="text-white">{error.response.data}</code>
                </pre>
              ),
            });
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
                  Failed to submit your form, please check <br />
                  your internet connection.
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
        }
        setTimeout(() => {
          setSubmitLoading(false);
        }, 3000);
      });
  }

  return (
    <Card
      className="sm:bg-[url('/images/signup-bg.jpg')] sm:bg-cover sm:bg-center sm:bg-no-repeat 
        sm:min-h-screen sm:w-full sm:grid sm:place-items-center"
    >
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
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <div className="space-y-7 sm:flex sm:space-x-6 sm:space-y-0">
              <div className="sm:w-1/2">
                <FormField
                  control={form.control}
                  name="first_name"
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
                  name="last_name"
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
              name="phone_num"
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
                      className="flex space-x-10 "
                    >
                      {[
                        ["Male", "male"],
                        ["Female", "female"],
                      ].map((option, index) => (
                        <FormItem
                          className="flex space-x-2 space-y-0"
                          key={index}
                        >
                          <FormControl>
                            <RadioGroupItem
                              className="p-0 border-black hover:border-transparent hover:bg-secondary"
                              value={option[1]}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option[0]}
                          </FormLabel>
                        </FormItem>
                      ))}
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
                <FormItem className="">
                  <div className="flex items-center space-x-3 space-y-0 rounded-md p-4">
                    <FormControl>
                      <Checkbox
                        className="p-0 border-black hover:border-transparent hover:bg-secondary"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="text-xs sm:text-base">
                      <FormDescription className="inline-block">
                        {" "}
                        I agree to the
                      </FormDescription>
                      <span className="text-sky-400">
                        {" "}
                        Terms of Service{" "}
                      </span>{" "}
                      and
                      <span className="text-sky-400"> Privacy conditions </span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={submitLoading}
              className="w-full bg-sky-600 border-none hover:bg-sky-700"
              type="submit"
            >
              {submitLoading ? (
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
            className="flex items-center space-x-2 text-gray-500 mt-5"
          >
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
        {showEmailVerificationNotice && (
          <EmailVerificationNotice
            isOpen={showEmailVerificationNotice}
            onClose={closeModal}
          />
        )}
        <Toaster />
      </CardContent>
    </Card>
  );
}
