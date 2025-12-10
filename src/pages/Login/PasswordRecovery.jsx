import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import { Card, CardContent } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpLeft, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const PasswordRecovery = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().nonempty().email(),
      })
    ),
    defaultValues: {
      email: "",
    },
  });

  const [loginLoading, setLoginLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: async (email) => {
      const res = await axios.post(
        `${API_HOST_URL}/api/v1/auth/reset-password-email/${email}`
      );
      return res.data;
    },
    onSuccess: (data) => {
      setLoginLoading(false);
      toast({
        className: cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 py-2 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
        ),
        title: (
          <span className="text-green-800 text-xs sm:text-sm">
            Password reset successful:
          </span>
        ),
        description: (
          <p className="w-full bg-gray-700 p-2 text-green-200 text-xs sm:text-sm">
            {data}
          </p>
        ),
        duration: 2500,
      });
      setTimeout(() => {
        form.reset();
      }, 3000);
    },
    onError: (err) => {
      setLoginLoading(false);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast({
            className: cn(
              "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 py-2 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
            ),
            title: <p className="text-red-700 text-xs sm:text-sm">Failed:</p>,
            description: (
              <p className="w-full  bg-gray-700 p-2 text-red-200 text-xs sm:text-sm">
                {err.response.data}
              </p>
            ),
          });
        } else if (err.request) {
          toast({
            className: cn(
              "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 py-2 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
            ),
            title: (
              <p className="text-red-700 text-xs sm:text-sm">Network error</p>
            ),
            description: (
              <p className="w-full  bg-gray-700 p-2 text-red-200 text-xs sm:text-sm">
                Please check your internet connection.
              </p>
            ),
          });
        }
      } else {
        toast({
          className: cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 p-0 w-11/12 px-4 sm:p-4 sm:w-fit sm:left-auto sm:right-4 sm:translate-x-0"
          ),
          title: (
            <p className="text-red-700 text-xs sm:text-sm">
              Registration failed
            </p>
          ),
          description: (
            <p className="w-full  bg-gray-700 p-2 text-red-200 text-xs sm:text-sm">
              {err.response.data}
            </p>
          ),
        });
      }
    },
  });

  async function onSubmit(values) {
    setLoginLoading(true);
    mutation.mutate(values.email);
  }

  return (
    <div className="min-h-screen px-5 md:px-0">
      <Card className="max-w-2xl mx-auto mt-16 md:mt-44">
        <CardContent className="p-5 py-10 md:py-20 flex flex-col gap-5">
          <div className=" text-center flex flex-col gap-2">
            <h1 className="font-bold text-black text-xl md:text-3xl">
              Forgot Password
            </h1>
            <p className="text-xs md:text-sm text-gray-500 md:px-28">
              Enter the email address associated to your account and we will
              send you a link to reset your password.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 md:px-10"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-semibold">
                      Email:
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 text-sm w-full"
                        placeholder="example@gmail.com"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs md:text-sm" />
                  </FormItem>
                )}
              />
              <Button
                disabled={loginLoading}
                className="w-full bg-sky-600 border-none hover:bg-sky-700 h-11"
                type="submit"
              >
                {loginLoading ? (
                  <div className="flex items-center space-x-1">
                    <Loader2 className="animate-spin" />
                    <span>Submitting</span>
                  </div>
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </form>
          </Form>
          <Link
            className="flex gap-2 text-xs md:text-sm items-center text-primary underline border w-fit self-center p-3 py-2 rounded-2xl"
            to="/login"
          >
            <ArrowUpLeft className="w-5 h-5" />
            <span>Back to Login</span>
          </Link>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default PasswordRecovery;
