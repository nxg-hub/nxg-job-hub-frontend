import {
  Briefcase,
  Calendar,
  CircleUser,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import sarahicon from "@/static/images/admin-sarah.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ServiceProviderProfile() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Tabs
        defaultValue="personal"
        className="w-full">
        <TabsList className="mb-6 border-none">
          <TabsTrigger
            className="hover:bg-sky-600 border-none"
            value="personal">
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            className="hover:bg-sky-600 border-none"
            value="experience">
            Experience
          </TabsTrigger>
          <TabsTrigger
            className="hover:bg-sky-600 border-none"
            value="education">
            Education
          </TabsTrigger>
          <TabsTrigger
            className="hover:bg-sky-600 border-none"
            value="skills">
            Skills
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4 border-none">
                    <AvatarImage
                      src={sarahicon}
                      alt="Sarah"
                    />
                    <AvatarFallback>
                      <CircleUser className="h-12 w-12 border-none" />
                    </AvatarFallback>
                  </Avatar>
                  <Button className="bg-sky-500 border-none hover:bg-sky-600 w-full">
                    Change Photo
                  </Button>
                </div>

                <div className="flex-1 grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        defaultValue="Sarah"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        defaultValue="Johnson"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex">
                      <Mail className="mr-2 h-4 w-4 opacity-70 mt-3" />
                      <Input
                        id="email"
                        type="email"
                        defaultValue="sarah.johnson@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex">
                      <Phone className="mr-2 h-4 w-4 opacity-70 mt-3" />
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex">
                      <MapPin className="mr-2 h-4 w-4 opacity-70 mt-3" />
                      <Input
                        id="location"
                        defaultValue="New York, NY"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="Experienced fashion designer with a passion for sustainable fashion and innovative designs."
                    />
                  </div>

                  <Button className="w-fit bg-sky-500 hover:bg-sky-600 border-none">
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Work Experience</span>
                <Button className="bg-sky-700 hover:bg-sky-800">
                  Add Experience
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="border-b pb-6 last:border-0">
                    <div className="flex gap-4">
                      <Briefcase className="h-10 w-10 text-sky-700" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          Senior Fashion Designer
                        </h3>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <span>Fashion Forward Inc.</span>
                          <span>•</span>
                          <span>Full-time</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>Jan 2020 - Present</span>
                          <span>•</span>
                          <MapPin className="h-4 w-4" />
                          <span>New York, NY</span>
                        </div>
                        <p className="mt-2">
                          Led the design team in creating seasonal collections,
                          managed client relationships, and oversaw production
                          processes.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Education</span>
                <Button className="bg-sky-700 hover:bg-sky-800">
                  Add Education
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <GraduationCap className="h-10 w-10 text-sky-700" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      Bachelor of Fine Arts in Fashion Design
                    </h3>
                    <div className="text-sm text-gray-500">
                      Parsons School of Design
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>2012 - 2016</span>
                    </div>
                    <p className="mt-2">
                      Graduated with honors. Specialized in sustainable fashion
                      design and innovative textiles.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm">
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Skills</span>
                <Button className="bg-sky-700 hover:bg-sky-800">
                  Add Skill
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "Fashion Design",
                  "Pattern Making",
                  "Textile Design",
                  "Adobe Illustrator",
                  "Sustainable Fashion",
                  "Trend Forecasting",
                  "Garment Construction",
                  "Color Theory",
                  "Fashion Illustration",
                  "3D Modeling",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {skill}
                    <button className="text-gray-500 hover:text-gray-700">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
