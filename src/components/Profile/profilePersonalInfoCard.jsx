import { CalendarIcon, Pencil, Save, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { PhoneInput } from "../ui/phone-input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import parsePhoneNumberFromString, {
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
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const personalInfoFormSchema = z.object({
  firstName: z
    .string()
    .min(3, "Name cannot be less than 3 characters")
    .nonempty()
    .regex(/^[A-Za-z]+$/i, "Name can only contain letter"),

  lastName: z
    .string()
    .min(3, "Name cannot be less than 3 characters")
    .nonempty()
    .regex(/^[A-Za-z]+$/i, "Name can only contain letter"),

  phoneNumber: z.string().transform((value, ctx) => {
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
});

export default function ProfilePersonInfoCard({ profileData }) {
  const { firstName, lastName, email, phoneNumber, dateOfBirth, userType } =
    profileData;
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const { reset } = form;

  const [formData, setFormData] = useState(profileData);
  //   const [phoneNumber, setPhoneNumber] = useState("");
  const [defaultCountry, setDefaultCountry] = useState(undefined);
  const [date, setDate] = useState();

  const toggleSetEdit = () => {
    setIsEditing((prev) => !prev);
  };
  useEffect(() => {
    const handleSetDefaultCountry = () => {
      reset({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
      });
      setDefaultCountry(
        parsePhoneNumberFromString(formData.phoneNumber).country
      );
    };

    handleSetDefaultCountry();
  }, [reset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function onSubmit(values) {
    onSave(values);
  }

  return (
    <div className="p-8 bg-white shadow rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="flex items-center justify-between">
            <p className="font-medium text-sky-600">Personal Information</p>
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  className="text-red-400 hover:text-red-600 hover:bg-red-50"
                  variant="outline"
                  size="sm"
                  onClick={toggleSetEdit}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white hover:text-white"
                  size="sm"
                  type="submit"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="bg-cyan-500 hover:bg-cyan-600 text-white hover:text-white"
                size="sm"
                onClick={toggleSetEdit}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>

          <Separator />
          <div className="grid grid-cols-3 gap-20">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-400">
                    First name
                  </FormLabel>
                  <FormControl>
                    <>
                      {isEditing ? (
                        <Input
                          placeholder="Enter your first name"
                          type=""
                          {...field}
                        />
                      ) : (
                        <span className="block font-medium text-gray-700">
                          {firstName}
                        </span>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-400">
                    Last name
                  </FormLabel>
                  <FormControl>
                    <>
                      {isEditing ? (
                        <Input
                          placeholder="Enter your last name"
                          type=""
                          {...field}
                        />
                      ) : (
                        <span className="block font-medium text-gray-700">
                          {lastName}
                        </span>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {dateOfBirth ? (
              <div className="flex flex-col gap-3">
                <Label className="font-medium text-gray-400" htmlFor="dob">
                  Date of Birth
                </Label>
                {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover> */}
                <>
                  {isEditing ? (
                    <Input
                      id="dob"
                      name="dob"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="block font-medium text-gray-700">
                      {dateOfBirth}
                    </span>
                  )}
                </>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-20">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-400">
                    Email
                  </FormLabel>
                  <FormControl>
                    <>
                      {isEditing ? (
                        <Input
                          placeholder="example@mail.com"
                          type=""
                          {...field}
                        />
                      ) : (
                        <span className="block font-medium text-gray-700">
                          {email}
                        </span>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-400">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={isEditing ? null : "border-none p-0 text-xl"}
                      placeholder="Your phone number"
                      type=""
                      {...field}
                    />
                    {/* <PhoneInput
                      className={isEditing ? null : "border-none p-0 text-xl"}
                      placeholder="Your phone number"
                      {...field}
                      defaultCountry={defaultCountry}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-3">
              <Label className="font-medium text-gray-400" htmlFor="role">
                Role
              </Label>
              <span className="block font-medium text-gray-700">
                {userType}
              </span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
