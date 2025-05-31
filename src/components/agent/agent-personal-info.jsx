import {
  CalendarIcon,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Save,
  Twitter,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";
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
import TextArea from "../TextArea";

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

const addressFormSchema = z.object({
  nationality: z.string().nonempty(),

  city: z
    .string()
    .min(3, "Name cannot be less than 3 characters")
    .nonempty()
    .regex(/^[A-Za-z]+$/i, "Name can only contain letter"),

  capital: z
    .string()
    .min(3, "Name cannot be less than 3 characters")
    .nonempty()
    .regex(/^[A-Za-z]+$/i, "Name can only contain letter"),

  postalCode: z
    .string()
    .min(3, "Name cannot be less than 3 characters")
    .nonempty()
    .regex(/^[A-Za-z]+$/i, "Name can only contain letter"),
});

const bioFormSchema = z.object({
  bio: z.string().min(3, "Name cannot be less than 3 characters").nonempty(),
});

const AgentPersonInfoCard = ({ onEditClick, profileData }) => {
  const { firstName, lastName, email, phoneNumber, dateOfBirth, userType } =
    profileData;
  return (
    <div className="p-8 space-y-8 bg-white shadow rounded-md">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sky-600">Personal Information</p>
        <Button
          variant="outline"
          className="bg-cyan-500 hover:bg-cyan-600 text-white hover:text-white"
          onClick={onEditClick}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-3">
            <span className="font-medium text-gray-400">First Name</span>
            <span className="font-medium text-gray-700">{firstName}</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-base text-gray-400">
              Last Name
            </span>
            <span className="font-medium text-gray-700">{lastName}</span>
          </div>
          {dateOfBirth ? (
            <div className="flex flex-col gap-3">
              <span className="font-medium text-base text-gray-400">
                Date of Birth
              </span>
              <span className="font-medium text-gray-700">{dateOfBirth}</span>
            </div>
          ) : (
            <div className="flex flex-col gap-3"></div>
          )}
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-3">
            <span className="font-medium text-base text-gray-400">Email</span>
            <span className="font-medium text-gray-700">{email}</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-base text-gray-400">Phone</span>
            <span className="font-medium text-gray-700">{phoneNumber}</span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-base text-gray-400">Role</span>
            <span className="font-medium text-gray-700">{userType}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditAgentPersonInfoCard = ({ onCancleClick, profileData, onSave }) => {
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [defaultCountry, setDefaultCountry] = useState(undefined);
  const [date, setDate] = useState();

  useEffect(() => {
    const handleSetDefaultCountry = () => {
      reset({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
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
            <div className="flex gap-2">
              <Button
                className="text-red-400 hover:text-red-600 hover:bg-red-50"
                variant="outline"
                size="sm"
                onClick={onCancleClick}
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
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-400">
                    Last name
                  </FormLabel>
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

            {formData.dateOfBirth ? (
              <div className="flex flex-col gap-3">
                <Label className="font-medium text-gray-400" htmlFor="dob">
                  Date of Birth
                </Label>
                <Popover>
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
                </Popover>
                <Input
                  id="dob"
                  name="dob"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="Your last name"
                />
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
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-400">
                    Email
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Your phone number"
                      {...field}
                      defaultCountry={defaultCountry}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-3">
              <Label className="font-medium text-gray-400" htmlFor="role">
                Role
              </Label>

              <Input disabled id="role" name="role" value={formData.userType} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

const AgentAddressCard = ({ onEditClick, profileData }) => {
  const { location } = profileData;
  return (
    <div className="p-8 space-y-8 bg-white shadow rounded-md">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sky-600">Address</p>
        <Button variant="outline" onClick={onEditClick}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-3">
            <span className="font-medium text-gray-400">Country</span>
            <span className="font-medium text-gray-700">
              {location.nationality}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-base text-gray-400">City</span>
            <span className="font-medium text-gray-700">
              {location.capital},{location.city}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-base text-gray-400">
              Postal Code
            </span>
            <span className="font-medium text-gray-700">
              {location.postalCode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditAgentAddressCard = ({ onCancleClick, profileData, onSave }) => {
  const { location } = profileData;
  const form = useForm({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      nationality: "",
      city: "",
      capital: "",
      postalCode: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    const handleSetDefaultCountry = () => {
      reset({
        nationality: location.nationality,
        city: location.city,
        capital: location.capital,
        postalCode: location.postalCode,
      });
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
            <p className="font-medium text-sky-600">Address</p>
            <div className="flex gap-2">
              <Button
                className="text-red-400 hover:text-red-600 hover:bg-red-50"
                variant="outline"
                size="sm"
                onClick={onCancleClick}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 text-white hover:text-white"
                variant="outline"
                size="sm"
                type="submit"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-4 gap-20">
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-400">
                    Country
                  </FormLabel>
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
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-400">
                    City
                  </FormLabel>
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
            <FormField
              control={form.control}
              name="capital"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-400">
                    Capital
                  </FormLabel>
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
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-400">
                    Postal code
                  </FormLabel>
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
        </form>
      </Form>
    </div>
  );
};

const AgentBioCard = ({ onEditClick, profileData }) => {
  const { agentUser } = profileData;
  return (
    <div className="w-8/12 p-8 space-y-8 bg-white shadow rounded-md">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sky-600">Bio</p>
        <Button variant="outline" onClick={onEditClick}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>
      <Separator />

      <p className="font-medium text-gray-700">{agentUser.bio}</p>
    </div>
  );
};

const EditAgentBioCard = ({ onCancleClick, profileData, onSave }) => {
  const { agentUser } = profileData;
  const form = useForm({
    resolver: zodResolver(bioFormSchema),
    defaultValues: {
      bio: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    const handleSetDefaultCountry = () => {
      reset({
        bio: agentUser.bio,
      });
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
    <div className="w-8/12 p-8 bg-white shadow rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="flex items-center justify-between">
            <p className="font-medium text-sky-600">Bio</p>
            <div className="flex gap-2">
              <Button
                className="text-red-400 hover:text-red-600 hover:bg-red-50"
                variant="outline"
                size="sm"
                onClick={onCancleClick}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 text-white hover:text-white"
                variant="outline"
                size="sm"
                type="submit"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
          <Separator />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <TextArea
                    className="w-full"
                    placeholder="Enter your bio here."
                    type=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

const AgentExpertisePreferencesCard = ({ onEditClick, profileData }) => {
  const { expertiseAreas, preferredIndustries, skills, languages } =
    profileData;
  return (
    <Card>
      <CardContent className="p-8 space-y-5">
        <section className="flex items-center justify-between">
          <p className="font-semibold text-lg">Expertise & Preferences</p>
          <Button
            className="border-none bg-sky-500 hover:bg-sky-600"
            onClick={onEditClick}
          >
            <Pencil className=" h-4 w-4" />
            Edit
          </Button>
        </section>
        <section className="flex flex-col gap-8">
          <div>
            <h4 className="font-medium text-base text-gray-400 my-5">
              Expertise Areas
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-10">
              {expertiseAreas.map((area, index) => (
                <Badge key={index} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
            <Separator />
          </div>

          <div>
            <h4 className="font-medium text-base text-gray-400 my-5">
              Preferred Industries
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-10">
              {preferredIndustries.map((industry, index) => (
                <Badge key={index} variant="outline">
                  {industry}
                </Badge>
              ))}
            </div>
            <Separator />
          </div>

          <div>
            <h4 className="font-medium text-base text-gray-400 my-5">Skills</h4>
            <div className="flex flex-wrap gap-1.5 mb-10">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <Separator />
          </div>

          <div>
            <h4 className="font-medium text-base text-gray-400 my-5">
              Languages
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((language, index) => (
                <Badge key={index} variant="outline">
                  {language.language} ({language.proficiency})
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

const EditAgentExpertisePreferencesCard = ({
  onCancleClick,
  profileData,
  onSave,
}) => {
  const [formData, setFormData] = useState(profileData);
  return (
    <Card className="p-8">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">Personal Info</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onCancleClick}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              className="border-none bg-sky-500 hover:bg-sky-600"
              size="sm"
              type="submit"
              form="profile-edit-form"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Expertise Areas</Label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {formData.expertiseAreas.map((expertise, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="pl-2 pr-1 py-1 gap-1"
              >
                {expertise}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="border-none bg-sky-500 hover:bg-red-600 text-white hover:text-sky-50 h-4 w-4 rounded-full"
                  onClick={() => handleRemoveExpertise(expertise)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {expertise}</span>
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newExpertise}
              onChange={(e) => setNewExpertise(e.target.value)}
              placeholder="Add expertise area"
              className="flex-1"
            />
            <Button
              className="border-none bg-sky-500 hover:bg-sky-600"
              type="button"
              onClick={handleAddExpertise}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Preferred Industries</Label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {formData.preferredIndustries.map((industry, index) => (
              <Badge
                key={index}
                variant="outline"
                className="pl-2 pr-1 py-1 gap-1"
              >
                {industry}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="border-none bg-sky-500 hover:bg-red-600 text-white hover:text-sky-50 h-4 w-4 rounded-full"
                  onClick={() => handleRemoveIndustry(industry)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {industry}</span>
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newIndustry}
              onChange={(e) => setNewIndustry(e.target.value)}
              placeholder="Add preferred industry"
              className="flex-1"
            />
            <Button
              className="border-none bg-sky-500 hover:bg-sky-600"
              type="button"
              onClick={handleAddIndustry}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {formData.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="pl-2 pr-1 py-1 gap-1"
              >
                {skill}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="border-none bg-sky-500 hover:bg-red-600 text-white hover:text-sky-50 h-4 w-4 rounded-full"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {skill}</span>
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill"
              className="flex-1"
            />
            <Button
              className="border-none bg-sky-500 hover:bg-sky-600"
              type="button"
              onClick={handleAddSkill}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Languages</Label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {formData.languages.map((lang, index) => (
              <Badge
                key={index}
                variant="outline"
                className="pl-2 pr-1 py-1 gap-1"
              >
                {lang.language} ({lang.proficiency})
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="border-none bg-sky-500 hover:bg-red-600 text-white hover:text-sky-50 h-4 w-4 rounded-full"
                  onClick={() => handleRemoveLanguage(lang)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {lang.language}</span>
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newLanguage.language}
              onChange={(e) =>
                setNewLanguage({ ...newLanguage, language: e.target.value })
              }
              placeholder="Language"
              className="flex-1"
            />
            <select
              value={newLanguage.proficiency}
              onChange={(e) =>
                setNewLanguage({
                  ...newLanguage,
                  proficiency: e.target.value,
                })
              }
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option>Fluent</option>
              <option>Advanced</option>
              <option>Intermediate</option>
              <option>Basic</option>
            </select>
            <Button
              className="border-none bg-sky-500 hover:bg-sky-600"
              type="button"
              onClick={handleAddLanguage}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export {
  AgentPersonInfoCard,
  EditAgentPersonInfoCard,
  AgentAddressCard,
  EditAgentAddressCard,
  AgentBioCard,
  EditAgentBioCard,
  AgentExpertisePreferencesCard,
  EditAgentExpertisePreferencesCard,
};
