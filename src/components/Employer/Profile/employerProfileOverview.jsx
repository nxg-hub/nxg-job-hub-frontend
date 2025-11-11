import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Upload,
  Trash,
  Camera,
  User,
  MoreHorizontal,
  MapPin,
  MapPinned,
  Building2,
  Phone,
  Mail,
  Globe,
  PencilLine,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { cn, nigerianStates, countryOptions } from "@/lib/utils";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "@/lib/CLOUDINARY_API";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import { useUserProfileUpdate } from "@/hooks/useAllUsers";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/components/ui/phone-input";

export default function EmployerProfileOverview({
  userId,
  companyDescription,
  profilePicture,
  companyName,
  companyAddress,
  country,
  state,
  companyZipCode,
}) {
  const queryClient = useQueryClient();
  const { updateUserProfile, isSuccess } = useUserProfileUpdate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(profilePicture || null);

  const fileInputRef = useRef(null);

  const cloudinary_preset = CLOUDINARY_UPLOAD_PRESET;
  const cloudinary_name = CLOUDINARY_CLOUD_NAME;

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveProfileImage = async () => {
    // "https://res.cloudinary.com/dildznazt/image/upload/v1753749441/craagzeoi7fkprrvkaeb.jpg"
    if (!selectedImage) {
      throw new console.error("No image file provided");
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", cloudinary_preset);

      //storing profile image into cloudinary and get the file url path
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`,
        formData
      );

      const { secure_url } = response.data;
      console.log(`Cloudinary upload successful for profile image`, secure_url);
      if (secure_url) {
        const payload = {
          companyLogo: secure_url,
        };
        //update employer profile by adding the cloudinary url path
        await updateUserProfile({
          url: `${API_HOST_URL}/api/employers`,
          userId,
          payload,
        });

        if (isSuccess) {
          queryClient.invalidateQueries({ queryKey: ["employerData"] });
          toast({
            className: cn(
              "bg-gray-100 top-1/2 left-1/2 fixed max-w-[100px] md:max-w-[280px]"
            ),

            description: "Profile picture saved successfully",
            duration: 2500,
          });
        }
      }
    } catch (error) {
      console.log("failed to save image url", error);
    }
  };

  useEffect(() => {
    if (profilePicture) {
      setPreview(profilePicture);
    }
  }, [profilePicture]);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col bg-white rounded-md p-5 md:flex  md:shadow gap-5">
        <div className="flex ">
          <div className="flex justify-between gap-5">
            <div className="relative">
              <Avatar
                onClick={triggerFileInput}
                className="hover:cursor-pointer w-24 h-24 border-4 border-gray-200"
              >
                <AvatarImage
                  src={preview || undefined}
                  alt="Profile picture"
                  className="object-cover"
                />
                <AvatarFallback className="bg-gray-100">
                  <User className="w-12 h-12 text-gray-400" />
                </AvatarFallback>
              </Avatar>

              <Button
                type="button"
                onClick={triggerFileInput}
                className="border-none bg-cyan-500 hover:bg-cyan-500 absolute -bottom-1 -right-1 rounded-full w-7 h-7 p-0 shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div className="flex flex-col justify-center font-medium mr-auto">
              <EditComapnyOverviwe
                companyDescription={companyDescription}
                companyAddress={companyAddress}
                country={country}
                state={state}
                companyZipCode={companyZipCode}
              />
              <span className="text-sky-600">{companyName || ""}</span>
              {/* <div className="flex gap-5 md:self-end md:ml-auto">
                <Button
                  type="button"
                  className="text-sky-600 hover:text-sky-700"
                  variant="outline"
                  size="sm"
                  onClick={handleSaveProfileImage}
                >
                  <Upload className="h-4 w-4" />
                  Upload picture
                </Button>
                <Button
                  onClick={removeImage}
                  className="bg-red-50 hover:bg-red-400 text-red-500 hover:text-white gap-2 border-none"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                  Remove
                </Button>
              </div> */}
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h2 className="font-bold">Company description</h2>
          <p className="text-gray-500 text-sm leading-loose">
            {companyDescription}
          </p>
        </div>
      </div>
      <div className="flex flex-col bg-white rounded-md p-5 md:flex  md:shadow gap-5">
        <h2 className="font-bold">Company address</h2>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <MapPinned className="font-light h-5 w-5 text-gray-400" />
            <span className="text-gray-400 text-sm">Address:</span>
          </div>
          <span className="line-clamp-1 text-gray-500 text-sm">
            {companyAddress}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <Building2 className="font-light h-5 w-5 text-gray-400" />
            <span className="text-gray-400 text-sm">Country/State:</span>
          </div>
          <span className="line-clamp-1 text-gray-500 text-sm">
            {country} /{state}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2">
            <MapPin className="font-light h-5 w-5 text-gray-400" />
            <span className="text-gray-400 text-sm">Postal code:</span>
          </div>
          <span className="line-clamp-1 text-gray-500 text-sm">
            {companyZipCode}
          </span>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

const EditComapnyOverviwe = ({
  companyDescription,
  companyAddress,
  country,
  state,
  companyZipCode,
}) => {
  const formSchema = z.object({
    companyDescription: z
      .string()
      .min(50, "Description must be at least 50 characters."),
    country: z.string().min(1, "Country is required."),
    state: z.string().min(1, "State is required."),
    companyAddress: z.string().min(10, "Company address is required."),
    companyZipCode: z
      .string()
      .regex(/^\d{5,9}$/, "Must be a valid Zip/Postal Code."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyDescription: companyDescription || "",
      country: country || "",
      state: state || "",
      companyAddress: companyAddress || "",
      companyZipCode: companyZipCode || "",
    },
    mode: "onChange",
  });

  const { reset } = form;
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    reset({
      companyDescription: companyDescription,
      country: country,
      state: state,
      companyAddress: companyAddress,
      companyZipCode: companyZipCode,
    });
  }, [
    companyDescription,
    country,
    state,
    companyAddress,
    companyZipCode,
    reset,
  ]);

  const handleOpenChange = (newOpenState) => {
    setOpen(newOpenState);

    // If the dialog is CLOSING (newOpenState is false)
    if (!newOpenState) {
      // Reset the form to the LAST SAVED (prop) values
      reset({
        companyDescription: companyDescription,
        country: country,
        state: state,
        companyAddress: companyAddress,
        companyZipCode: companyZipCode,
      });
    }
  };

  const { mutate: updateEmployerProfile, isPending } = useUserProfileUpdate({
    onSuccess: (data) => {
      console.log(data);
      toast({
        className: cn(
          "bottom-10 right-4 flex fixed max-w-[400px] md:max-w-[420px]"
        ),
        title: "Profile setup completed",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-green-700 p-4">
            <p className="text-white">
              You have successfully setup your profile
            </p>
          </pre>
        ),
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      setOpen(false);
    },
    onError: (err) => {
      console.error("Updating profile error:", err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Error:</span>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                {err.response.data}
              </p>
            ),
          });
        } else if (err.request) {
          toast({
            className: cn(
              "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
            ),
            title: <span className="text-red-900">Network error:</span>,
            description: (
              <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
                Profile setup failed, please check your internet connection.
              </p>
            ),
          });
        }
      } else {
        toast({
          className: cn(
            "flex flex-col space-y-5 items-start bottom-10 right-4 flex fixed w-[360px] sm:max-w-[420px]"
          ),
          title: <span className="text-red-900">Failed:</span>,
          description: (
            <p className="text-gray-800 rounded-md bg-red-100 p-4 font-mono">
              Profile setup failed, please try again.
            </p>
          ),
        });
      }
    },
  });

  const handleEditProfile = async (values) => {
    console.log("--- FINAL SUBMISSION DATA ---");
    const payload = {
      companyDescription: values.companyDescription,
      country: values.country,
      state: values.state,
      companyAddress: values.companyAddress,
      companyZipCode: values.companyZipCode,
    };
    console.log(payload);

    const storeValueObj =
      localStorage.getItem("NXGJOBHUBLOGINKEYV1") ||
      sessionStorage.getItem("NXGJOBHUBLOGINKEYV1");

    const userId = storeValueObj ? JSON.parse(storeValueObj).id : null;

    updateEmployerProfile({
      url: `${API_HOST_URL}/api/employers/${userId}`,
      payload: payload,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className="border-[1px] border-gray-400 text-secondary hover:border-transparent hover:bg-primary hover:text-white"
        asChild // Add asChild for correct button styling
      >
        <Button
          className="ml-auto sm:w-2/5 border-transparent bg-cyan-500 text-white hover:bg-cyan-600 hover:text-white"
          variant="outline"
        >
          Edit
          <PencilLine className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form className="space-y-8 max-w-3xl py-10">
            <DialogHeader>
              <DialogTitle>Edit Profile </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="companyDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      Company Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe your company's mission and services (Min 50 chars)."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      Company Full Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Street, City,"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">Country</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="font-normal">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {countryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">State</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="font-normal">
                          <SelectValue placeholder="Select state  " />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {nigerianStates.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyZipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      Company Zip/Postal Code
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-400">
                      Company Phone
                    </FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="+1 555 123 4567"
                        {...field}
                        defaultCountry="NG"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
            {/* <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">
                    Company Website
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourcompany.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <DialogFooter className="flex justify-end gap-2">
              <Button
                type="button"
                className="border-none bg-sky-500 hover:bg-sky-600"
                onClick={form.handleSubmit(handleEditProfile)}
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center space-x-1">
                    <Loader2 className="animate-spin" />
                    <span>Please wait</span>
                  </div>
                ) : (
                  <span>Update Profile</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <Toaster />
      </DialogContent>
    </Dialog>
  );
};
