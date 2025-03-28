import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone_num: z.string(),
  email: z.string(),
  password: z.string(),
  re_password: z.string(),
  terms_condition: z.boolean(),
});

export default function TestSignupForm() {
  //   const form = useForm < z.infer < typeof formSchema >> ({
  //     resolver: zodResolver(formSchema),

  //   })

  //   function onSubmit(values: z.infer < typeof formSchema > ) {
  //     try {
  //       console.log(values);
  //       toast(
  //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //           <code className="text-white">{JSON.stringify(values, null, 2)}</code>
  //         </pre>
  //       );
  //     } catch (error) {
  //       console.error("Form submission error", error);
  //       toast.error("Failed to submit the form. Please try again.");
  //     }
  //   }

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    try {
      console.log(values);
      toast({
        title: "Successful",
        description: "Login now",
      });
      // toast(
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">successfulJobPost</code>
      //   </pre>
      // );
    } catch (error) {
      console.error("Form submission error", error);
      // toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Card
      className="sm:bg-[url('/images/signup-bg.jpg')] sm:bg-cover sm:bg-center sm:bg-no-repeat 
        sm:min-h-screen sm:w-full sm:grid sm:place-items-center">
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
                      defaultCountry="TR"
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
                  <FormDescription>enter your email address</FormDescription>
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
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                  <FormControl>
                    <Checkbox
                      className="p-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="text-xs sm:text-base">
                    <FormDescription className="inline-block">
                      {" "}
                      I agree to the
                    </FormDescription>
                    <span className="text-sky-400"> Terms of Service </span> and
                    <span className="text-sky-400"> Privacy conditions </span>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-sky-600 border-none hover:bg-sky-700"
              type="submit">
              <span>Submit</span>
            </Button>
          </form>
        </Form>
        {/* or signup using other methods */}
        <div>
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
        </div>
        <Toaster />
      </CardContent>
    </Card>
  );
}
