import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Filter,
  Mail,
  MapPin,
  Phone,
  Search,
  Tag,
  User,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tabs as InnerTabs,
  TabsContent as InnerTabsContent,
  TabsList as InnerTabsList,
  TabsTrigger as InnerTabsTrigger,
} from "@/components/ui/tabs";
import { useOutletContext } from "react-router-dom";
import {
  employerRequestsNew,
  openJobEmployers,
  matchedEmployers,
} from "@/utils/data/agent-mock-data";

export default function EmployerTab() {
  const { setPageTitle } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter function for search

  const filterEmployers = employerRequestsNew.filter(
    (employer) =>
      employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const filterOpenEmployerJob = openJobEmployers.filter(
    (employer) =>
      employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const filterEmployerMatched = matchedEmployers.filter(
    (employer) =>
      employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  useEffect(() => {
    setPageTitle("Employers");
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between space-x-4 mb-14">
        <div className="relative w-[70%]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employers, positions, or skills..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        defaultValue="requests"
        className="w-full space-y-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="requests"
            className="flex items-center gap-2 border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950">
            <Tag className="h-4 w-4" />
            <span>Tagged Requests</span>
          </TabsTrigger>
          <TabsTrigger
            value="openings"
            className="flex items-center gap-2 border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950">
            <Briefcase className="h-4 w-4" />
            <span>Open Jobs</span>
          </TabsTrigger>
          <TabsTrigger
            value="matched"
            className="flex items-center gap-2 border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950">
            <CheckCircle className="h-4 w-4" />
            <span>Matched Employers</span>
          </TabsTrigger>
        </TabsList>

        {/* Tagged Requests Tab */}
        <TabsContent value="requests">
          <h2 className="text-xl font-semibold mb-4">
            Employer Requests Tagged to You
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filterEmployers.length > 0 ? (
              filterEmployers.map((employer) => (
                <EmployerRequestCard employer={employer} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">
                  No employers found matching your search criteria
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Open Jobs Tab */}
        <TabsContent value="openings">
          <h2 className="text-xl font-semibold mb-4">
            Employers with Open Jobs
          </h2>
          <OpenJobsTable filterOpenEmployerJob={filterOpenEmployerJob} />
        </TabsContent>

        {/* Matched Employers Tab */}
        <TabsContent value="matched">
          <h2 className="text-xl font-semibold mb-4">
            Employers Matched with Talents
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <MatchedEmployersCard
              filterEmployerMatched={filterEmployerMatched}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const MatchedEmployersCard = ({ filterEmployerMatched }) => {
  return (
    <>
      {filterEmployerMatched.map((employer) => (
        <Card key={employer.id}>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={employer.logo || "/placeholder.svg"}
                    alt={employer.name}
                  />
                  <AvatarFallback>
                    {employer.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{employer.name}</CardTitle>
                  <CardDescription>{employer.location}</CardDescription>
                </div>
              </div>
              <Badge
                variant={employer.status === "Hired" ? "success" : "secondary"}
                className={
                  employer.status === "Hired"
                    ? "bg-green-100 text-green-800"
                    : ""
                }>
                {employer.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium">{employer.position}</div>
                <div className="text-sm text-muted-foreground">
                  {employer.salary}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Matched with:</span>
                <span className="font-medium">{employer.matchedWith}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Match Date:</span>
                <span>{new Date(employer.matchDate).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {employer.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm">
                  View Match Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Match Details</DialogTitle>
                  <DialogDescription>
                    Details about the match between {employer.name} and{" "}
                    {employer.matchedWith}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-6 py-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={employer.logo || "/placeholder.svg"}
                          alt={employer.name}
                        />
                        <AvatarFallback>
                          {employer.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium">Employer Details</h3>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Company:</span>{" "}
                        {employer.name}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Industry:</span>{" "}
                        {employer.industry}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Size:</span>{" "}
                        {employer.companySize}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Position:</span>{" "}
                        {employer.position}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Salary:</span>{" "}
                        {employer.salary}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>{" "}
                        {employer.location}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Contact:</span>{" "}
                        {employer.contactPerson}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>{" "}
                        {employer.contactEmail}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={
                            employer.matchDetails.talentInfo.photo ||
                            "/placeholder.svg"
                          }
                          alt={employer.matchDetails.talentInfo.name}
                        />
                        <AvatarFallback>
                          {employer.matchDetails.talentInfo.name.substring(
                            0,
                            2
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium">Talent Details</h3>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Name:</span>{" "}
                        {employer.matchDetails.talentInfo.name}
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Previous Role:
                        </span>{" "}
                        {employer.matchDetails.talentInfo.previousRole}
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Experience:
                        </span>{" "}
                        {employer.matchDetails.talentInfo.experience}
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Education:
                        </span>{" "}
                        {employer.matchDetails.talentInfo.education}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>{" "}
                        {employer.matchDetails.talentInfo.location}
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Start Date:
                        </span>{" "}
                        {employer.matchDetails.talentInfo.startDate}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Salary:</span>{" "}
                        {employer.matchDetails.talentInfo.salary}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">
                        Skills:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {employer.matchDetails.talentInfo.skills.map(
                          (skill, index) => (
                            <Badge
                              key={index}
                              variant="outline">
                              {skill}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="py-4">
                  <h3 className="font-medium mb-2">Match Timeline</h3>
                  <div className="space-y-2">
                    {employer.matchDetails.matchHistory.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm">
                        <div className="min-w-[100px] text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex-1">{event.event}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline">Export Details</Button>
                  <Button className="border-none bg-sky-500 hover:bg-sky-600">
                    Schedule Follow-up
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              className="border-none bg-sky-500 hover:bg-sky-600"
              size="sm">
              Follow Up
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

const OpenJobsTable = ({ filterOpenEmployerJob }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employer</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Salary Range</TableHead>
          <TableHead>Openings</TableHead>
          <TableHead>Posted</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterOpenEmployerJob.map((employer) => (
          <TableRow key={employer.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={employer.logo || "/placeholder.svg"}
                    alt={employer.name}
                  />
                  <AvatarFallback>
                    {employer.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span>{employer.name}</span>
              </div>
            </TableCell>
            <TableCell>{employer.position}</TableCell>
            <TableCell>{employer.location}</TableCell>
            <TableCell>{employer.salary}</TableCell>
            <TableCell>
              <Badge variant="outline">{employer.openings}</Badge>
            </TableCell>
            <TableCell>
              {new Date(employer.datePosted).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline">
                      Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact {employer.name}</DialogTitle>
                      <DialogDescription>
                        Choose how you would like to contact this employer
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Contact Person</h3>
                        <p className="text-sm">{employer.contactPerson}</p>
                      </div>

                      <div className="grid gap-3">
                        <Button
                          variant="outline"
                          className="justify-start">
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email: {employer.contactEmail}</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="justify-start">
                          <Phone className="mr-2 h-4 w-4" />
                          <span>Phone: {employer.contactPhone}</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="justify-start">
                          <svg
                            className="mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect
                              x="2"
                              y="9"
                              width="4"
                              height="12"
                            />
                            <circle
                              cx="4"
                              cy="4"
                              r="2"
                            />
                          </svg>
                          <span>LinkedIn: {employer.contactLinkedIn}</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="justify-start">
                          <svg
                            className="mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M22 3H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2 12H4v-2h16v2zm0-5H4V8h16v2z" />
                          </svg>
                          <span>Slack: {employer.contactSlack}</span>
                        </Button>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Send Message</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="border-none bg-sky-500 hover:bg-sky-600"
                      size="sm">
                      Suggest Talent
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-custom">
                    <DialogHeader>
                      <DialogTitle>
                        Recommended Talents for {employer.name}
                      </DialogTitle>
                      <DialogDescription>
                        The following talents match the requirements for the{" "}
                        {employer.position} position
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {employer.recommendedTalents.map((talent) => (
                        <div
                          key={talent.id}
                          className="flex gap-4 p-4 border rounded-lg">
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={talent.photo || "/placeholder.svg"}
                              alt={talent.name}
                            />
                            <AvatarFallback>
                              {talent.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg">
                                  {talent.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {talent.currentRole}
                                </p>
                              </div>
                              <Badge className="bg-green-100 text-green-800">
                                {talent.matchPercentage}% Match
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  Experience:
                                </span>{" "}
                                {talent.experience}
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Location:
                                </span>{" "}
                                {talent.location}
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Availability:
                                </span>{" "}
                                {talent.availability}
                              </div>
                            </div>

                            <div>
                              <span className="text-sm text-muted-foreground">
                                Skills:
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {talent.skills.map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <DialogFooter>
                      <Button variant="outline">Export List</Button>
                      <Button className="border-none bg-sky-500 hover:bg-sky-600">
                        Contact Selected Talents
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const EmployerRequestCard = ({ employer }) => {
  return (
    <Card key={employer.id}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={employer.logo || "/placeholder.svg"}
                alt={employer.name}
              />
              <AvatarFallback>{employer.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{employer.name}</CardTitle>
              <CardDescription>{employer.location}</CardDescription>
            </div>
          </div>
          <Badge
            className={
              employer.status === "Urgent"
                ? "bg-red-600"
                : employer.status === "New"
                ? "bg-sky-400"
                : "bg-slate-200 text-slate-900"
            }>
            {employer.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="font-medium">{employer.position}</div>
          <div className="text-sm text-muted-foreground">{employer.salary}</div>
          <p className="text-sm">{employer.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {employer.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1 h-3 w-3" />
          Posted {new Date(employer.datePosted).toLocaleDateString()}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="border-none bg-sky-500 hover:bg-sky-600"
              size="sm">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={employer.logo || "/placeholder.svg"}
                    alt={employer.name}
                  />
                  <AvatarFallback>
                    {employer.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {employer.name} - {employer.position}
              </DialogTitle>
              <DialogDescription>
                <Badge
                  variant={
                    employer.status === "Urgent"
                      ? "destructive"
                      : employer.status === "New"
                      ? "default"
                      : "secondary"
                  }
                  className="mt-2">
                  {employer.status}
                </Badge>
              </DialogDescription>
            </DialogHeader>

            <InnerTabs defaultValue="employer">
              <InnerTabsList className="grid w-full grid-cols-2">
                <InnerTabsTrigger
                  className="space-x-3 border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
                  value="employer">
                  Employer Details
                </InnerTabsTrigger>
                <InnerTabsTrigger
                  className="space-x-3 border-none data-[state=active]:bg-sky-500 data-[state=active]:text-sky-50 hover:bg-white hover:text-slate-950"
                  value="job">
                  Job Details
                </InnerTabsTrigger>
              </InnerTabsList>
              <InnerTabsContent
                value="employer"
                className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Company
                    </h3>
                    <p className="text-base">{employer.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Industry
                    </h3>
                    <p className="text-base">{employer.industry}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Size
                    </h3>
                    <p className="text-base">{employer.companySize}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Website
                    </h3>
                    <p className="text-base">{employer.website}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{employer.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{employer.contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{employer.contactPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{employer.location}</span>
                    </div>
                  </div>
                </div>
              </InnerTabsContent>

              <InnerTabsContent
                value="job"
                className="space-y-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Position Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Title
                      </h4>
                      <p className="text-base">{employer.position}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Salary Range
                      </h4>
                      <p className="text-base">{employer.salary}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Posted Date
                      </h4>
                      <p className="text-base">
                        {new Date(employer.datePosted).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Location
                      </h4>
                      <p className="text-base">{employer.location}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {employer.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Job Description</h3>
                  <p className="text-sm">{employer.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {employer.jobDetails.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {employer.jobDetails.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Benefits</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {employer.jobDetails.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </InnerTabsContent>
            </InnerTabs>

            <DialogFooter className="flex justify-between mt-4">
              <Button variant="outline">Contact Employer</Button>
              <Button className="border-none bg-sky-500 hover:bg-sky-600">
                Find Matching Talents
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
