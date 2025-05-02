"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Search,
  Star,
  ChevronRight,
  CheckCircle2,
  Clock4,
  Calendar,
  XCircle,
  AlertCircle,
  UserCheck,
  Users,
  Building2,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function TalentJobsTab() {
  
  // Main tab state (Job Listings, Job Requests, Jobs Applied)
  const [mainTab, setMainTab] = useState("listings")

  // States for different job types
  const [availableJobs, setAvailableJobs] = useState([])
  const [jobRequests, setJobRequests] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])

  const [selectedJob, setSelectedJob] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter states
  const [jobTypes, setJobTypes] = useState({
    "full-time": true,
    "part-time": false,
    contract: false,
    freelance: false,
  })
  const [locations, setLocations] = useState({
    remote: true,
    onsite: false,
    hybrid: false,
  })
  const [salaryRange, setSalaryRange] = useState([50000, 150000])

  useEffect(() => {
    // Simulate loading jobs from an API
    setTimeout(() => {
      // Available jobs based on talent's skills and location
      setAvailableJobs([
        {
          id: 1,
          title: "Senior React Developer",
          company: "TechCorp Inc.",
          companyLogo: "/placeholder.svg?height=40&width=40&text=TC",
          location: "Remote",
          salary: "$120k - $150k",
          type: "Full-time",
          match: 95,
          posted: "2 days ago",
          category: "tech",
          description:
            "TechCorp is looking for a senior React developer to join our growing team. You'll be working on our flagship product and collaborating with a team of experienced developers.",
          requirements: [
            "5+ years of experience with React",
            "Strong knowledge of JavaScript and TypeScript",
            "Experience with state management libraries (Redux, MobX, etc.)",
            "Experience with responsive design and CSS frameworks",
            "Familiarity with testing frameworks (Jest, React Testing Library)",
          ],
          benefits: [
            "Competitive salary and equity",
            "Health, dental, and vision insurance",
            "Flexible work hours and remote work options",
            "Professional development budget",
            "Regular team events and retreats",
          ],
          contact: {
            name: "Sarah Johnson",
            position: "Technical Recruiter",
            avatar: "/placeholder.svg?height=40&width=40&text=SJ",
          },
        },
        {
          id: 2,
          title: "Frontend Engineer",
          company: "InnovateTech",
          companyLogo: "/placeholder.svg?height=40&width=40&text=IT",
          location: "New York, NY",
          salary: "$100k - $130k",
          type: "Full-time",
          match: 90,
          posted: "1 week ago",
          category: "tech",
          description:
            "InnovateTech is seeking a talented Frontend Engineer to help build our next-generation web applications. You'll be working with the latest technologies and frameworks.",
          requirements: [
            "3+ years of experience with modern JavaScript frameworks",
            "Experience with HTML, CSS, and responsive design",
            "Knowledge of web performance optimization",
            "Experience with version control systems (Git)",
            "Bachelor's degree in Computer Science or related field",
          ],
          benefits: [
            "Competitive salary and benefits",
            "Flexible work schedule",
            "Modern office in downtown New York",
            "Regular team building activities",
            "Career growth opportunities",
          ],
          contact: {
            name: "Michael Chen",
            position: "Hiring Manager",
            avatar: "/placeholder.svg?height=40&width=40&text=MC",
          },
        },
        {
          id: 3,
          title: "React Native Developer",
          company: "MobileApps Co.",
          companyLogo: "/placeholder.svg?height=40&width=40&text=MA",
          location: "Remote",
          salary: "$110k - $140k",
          type: "Contract",
          match: 85,
          posted: "3 days ago",
          category: "tech",
          description:
            "MobileApps Co. is looking for a React Native developer to help build cross-platform mobile applications. This is a 6-month contract with possibility of extension.",
          requirements: [
            "3+ years of experience with React Native",
            "Experience with native modules and third-party libraries",
            "Knowledge of iOS and Android platforms",
            "Experience with state management in React Native",
            "Understanding of RESTful APIs and GraphQL",
          ],
          benefits: [
            "Competitive hourly rate",
            "Flexible working hours",
            "Remote work",
            "Possibility of contract extension",
            "Opportunity to work on cutting-edge mobile applications",
          ],
          contact: {
            name: "Emily Rodriguez",
            position: "Tech Recruiter",
            avatar: "/placeholder.svg?height=40&width=40&text=ER",
          },
        },
        {
          id: 4,
          title: "UI/UX Designer",
          company: "DesignStudio",
          companyLogo: "/placeholder.svg?height=40&width=40&text=DS",
          location: "San Francisco, CA",
          salary: "$90k - $120k",
          type: "Full-time",
          match: 80,
          posted: "5 days ago",
          category: "tech",
          description:
            "DesignStudio is looking for a talented UI/UX Designer to join our creative team. You'll be working on designing user interfaces for web and mobile applications.",
          requirements: [
            "3+ years of experience in UI/UX design",
            "Proficiency in design tools (Figma, Sketch, Adobe XD)",
            "Strong portfolio showcasing your design process",
            "Experience with user research and usability testing",
            "Knowledge of design systems and component libraries",
          ],
          benefits: [
            "Competitive salary and benefits",
            "Creative work environment",
            "Professional development opportunities",
            "Health and wellness programs",
            "Flexible work arrangements",
          ],
          contact: {
            name: "Alex Thompson",
            position: "Creative Director",
            avatar: "/placeholder.svg?height=40&width=40&text=AT",
          },
        },
        {
          id: 5,
          title: "Project Manager",
          company: "ManageCorp",
          companyLogo: "/placeholder.svg?height=40&width=40&text=MC",
          location: "Chicago, IL",
          salary: "$100k - $130k",
          type: "Full-time",
          match: 75,
          posted: "1 week ago",
          category: "non-tech",
          description:
            "ManageCorp is seeking an experienced Project Manager to oversee the development and implementation of software projects.",
          requirements: [
            "5+ years of experience in project management",
            "PMP certification preferred",
            "Experience with Agile methodologies",
            "Strong communication and leadership skills",
            "Experience in the software industry",
          ],
          benefits: [
            "Competitive salary and bonuses",
            "Comprehensive benefits package",
            "Professional development opportunities",
            "Work-life balance",
            "Career advancement paths",
          ],
          contact: {
            name: "Jennifer Lee",
            position: "HR Manager",
            avatar: "/placeholder.svg?height=40&width=40&text=JL",
          },
        },
      ])

      // Job requests from employers and agents
      setJobRequests([
        {
          id: 101,
          title: "Senior Frontend Developer",
          company: "Global Tech Solutions",
          companyLogo: "/placeholder.svg?height=40&width=40&text=GT",
          location: "Remote",
          salary: "$130k - $160k",
          type: "Full-time",
          match: 92,
          requestType: "employer",
          requestDate: "2023-05-01",
          status: "Pending Review",
          description:
            "We found your profile and believe you'd be a perfect fit for our frontend team. We're building a next-generation SaaS platform and need someone with your React expertise.",
          contact: {
            name: "David Wilson",
            position: "CTO",
            avatar: "/placeholder.svg?height=40&width=40&text=DW",
          },
        },
        {
          id: 102,
          title: "React Developer for Fintech Project",
          company: "TechTalent Agency",
          companyLogo: "/placeholder.svg?height=40&width=40&text=TT",
          location: "Remote",
          salary: "$110k - $140k",
          type: "Contract (6 months)",
          match: 88,
          requestType: "agent",
          requestDate: "2023-05-03",
          status: "Pending Review",
          description:
            "One of our clients, a leading fintech company, is looking for a React developer with your skill set. This is a 6-month contract with possibility of extension or conversion to full-time.",
          contact: {
            name: "Jessica Martinez",
            position: "Tech Recruiter",
            avatar: "/placeholder.svg?height=40&width=40&text=JM",
          },
        },
        {
          id: 103,
          title: "Lead Frontend Engineer",
          company: "StartupX",
          companyLogo: "/placeholder.svg?height=40&width=40&text=SX",
          location: "Hybrid (New York)",
          salary: "$140k - $170k",
          type: "Full-time",
          match: 94,
          requestType: "employer",
          requestDate: "2023-05-02",
          status: "Pending Review",
          description:
            "We're a fast-growing startup in the AI space and we're impressed by your portfolio. We'd like to discuss a lead frontend engineer position where you'd help shape our product and team.",
          contact: {
            name: "Ryan Park",
            position: "Co-founder & CEO",
            avatar: "/placeholder.svg?height=40&width=40&text=RP",
          },
        },
        {
          id: 104,
          title: "Senior React Developer for Healthcare Project",
          company: "DevTalent Recruiters",
          companyLogo: "/placeholder.svg?height=40&width=40&text=DR",
          location: "Remote",
          salary: "$120k - $150k",
          type: "Contract (12 months)",
          match: 85,
          requestType: "agent",
          requestDate: "2023-04-28",
          status: "Pending Review",
          description:
            "We represent a healthcare technology company that's building a patient management platform. They're looking for someone with your React and TypeScript experience.",
          contact: {
            name: "Thomas Brown",
            position: "Senior Tech Recruiter",
            avatar: "/placeholder.svg?height=40&width=40&text=TB",
          },
        },
      ])

      // Jobs the talent has applied to
      setAppliedJobs([
        {
          id: 201,
          title: "Senior React Developer",
          company: "TechCorp Inc.",
          companyLogo: "/placeholder.svg?height=40&width=40&text=TC",
          location: "Remote",
          salary: "$120k - $150k",
          type: "Full-time",
          applied: "2023-04-15",
          status: "Shortlisted",
          progress: 50,
          nextStep: "Technical Interview",
          nextDate: "2023-05-25",
          description:
            "TechCorp is looking for a senior React developer to join our growing team. You'll be working on our flagship product and collaborating with a team of experienced developers.",
          recruiter: {
            name: "Sarah Johnson",
            position: "Technical Recruiter",
            avatar: "/placeholder.svg?height=40&width=40&text=SJ",
          },
        },
        {
          id: 202,
          title: "Frontend Engineer",
          company: "InnovateTech",
          companyLogo: "/placeholder.svg?height=40&width=40&text=IT",
          location: "New York, NY",
          salary: "$100k - $130k",
          type: "Full-time",
          applied: "2023-04-10",
          status: "Interview Scheduled",
          progress: 75,
          nextStep: "Final Interview",
          nextDate: "2023-05-22",
          description:
            "InnovateTech is seeking a talented Frontend Engineer to help build our next-generation web applications. You'll be working with the latest technologies and frameworks.",
          recruiter: {
            name: "Michael Chen",
            position: "Hiring Manager",
            avatar: "/placeholder.svg?height=40&width=40&text=MC",
          },
        },
        {
          id: 203,
          title: "React Native Developer",
          company: "MobileApps Co.",
          companyLogo: "/placeholder.svg?height=40&width=40&text=MA",
          location: "Remote",
          salary: "$110k - $140k",
          type: "Contract",
          applied: "2023-04-05",
          status: "Pending",
          progress: 25,
          nextStep: "Application Review",
          nextDate: null,
          description:
            "MobileApps Co. is looking for a React Native developer to help build cross-platform mobile applications. This is a 6-month contract with possibility of extension.",
          recruiter: {
            name: "Emily Rodriguez",
            position: "Tech Recruiter",
            avatar: "/placeholder.svg?height=40&width=40&text=ER",
          },
        },
        {
          id: 204,
          title: "UI/UX Designer",
          company: "DesignStudio",
          companyLogo: "/placeholder.svg?height=40&width=40&text=DS",
          location: "San Francisco, CA",
          salary: "$90k - $120k",
          type: "Full-time",
          applied: "2023-03-28",
          status: "Hired",
          progress: 100,
          nextStep: "Onboarding",
          nextDate: "2023-06-01",
          description:
            "DesignStudio is looking for a talented UI/UX Designer to join our creative team. You'll be working on designing user interfaces for web and mobile applications.",
          recruiter: {
            name: "Alex Thompson",
            position: "Creative Director",
            avatar: "/placeholder.svg?height=40&width=40&text=AT",
          },
          rated: false,
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const handleApply = (jobId) => {
    // In a real app, this would send an application to the backend
    console.log(`Applied for job ${jobId}`)

    // Find the job in available jobs
    const jobToApply = availableJobs.find((job) => job.id === jobId)

    if (jobToApply) {
      // Create a new applied job entry
      const newAppliedJob = {
        ...jobToApply,
        applied: new Date().toISOString().split("T")[0],
        status: "Pending",
        progress: 25,
        nextStep: "Application Review",
        nextDate: null,
      }

      // Add to applied jobs
      setAppliedJobs([...appliedJobs, newAppliedJob])

      // Show confirmation
      alert(`Application submitted for: ${jobToApply.title} at ${jobToApply.company}`)
    }
  }

  const handleAcceptRequest = (requestId) => {
    // In a real app, this would send an acceptance to the backend
    console.log(`Accepted job request ${requestId}`)

    // Find the request
    const request = jobRequests.find((req) => req.id === requestId)

    if (request) {
      // Update the request status
      const updatedRequests = jobRequests.map((req) => (req.id === requestId ? { ...req, status: "Accepted" } : req))
      setJobRequests(updatedRequests)

      // Show confirmation
      alert(`You've accepted the request for: ${request.title} at ${request.company}`)
    }
  }

  const handleDeclineRequest = (requestId) => {
    // In a real app, this would send a decline to the backend
    console.log(`Declined job request ${requestId}`)

    // Find the request
    const request = jobRequests.find((req) => req.id === requestId)

    if (request) {
      // Update the request status
      const updatedRequests = jobRequests.map((req) => (req.id === requestId ? { ...req, status: "Declined" } : req))
      setJobRequests(updatedRequests)

      // Show confirmation
      alert(`You've declined the request for: ${request.title} at ${request.company}`)
    }
  }

  const handleSearch = () => {
    // In a real app, this would filter jobs based on search query
    console.log(`Searching for: ${searchQuery}`)
  }

  const handleFilterChange = () => {
    // In a real app, this would filter jobs based on selected filters
    console.log("Filters applied:", { jobTypes, locations, salaryRange })
  }

  const filteredAvailableJobs = availableJobs.filter((job) => {
    // Filter by category
    if (activeCategory !== "all" && job.category !== activeCategory) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const filteredJobRequests = jobRequests.filter((request) => {
    // Filter by search query
    if (
      searchQuery &&
      !request.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.company.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock4 className="h-5 w-5 text-yellow-500" />
      case "Shortlisted":
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />
      case "Interview Scheduled":
        return <Calendar className="h-5 w-5 text-purple-500" />
      case "Hired":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "Rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
      case "Pending Review":
        return "secondary"
      case "Shortlisted":
        return "default"
      case "Interview Scheduled":
        return "default"
      case "Hired":
      case "Accepted":
        return "success"
      case "Rejected":
      case "Declined":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getProgressColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500"
      case "Shortlisted":
        return "bg-blue-500"
      case "Interview Scheduled":
        return "bg-purple-500"
      case "Hired":
        return "bg-green-500"
      case "Rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderJobDetails = () => {
    if (!selectedJob) {
      return (
        <Card className="sticky top-20">
          <CardContent className="p-6 text-center">
            <div className="py-12 space-y-3">
              <div className="bg-muted/50 mx-auto rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg">Select a job</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">Click on any job listing to view details</p>
            </div>
          </CardContent>
        </Card>
      )
    }

    // For available jobs
    if (mainTab === "listings") {
      return (
        
        <Card className="sticky top-20">
          <CardHeader
            className={`h-1 p-0 ${selectedJob.match >= 90 ? "bg-green-500" : selectedJob.match >= 80 ? "bg-yellow-500" : "bg-blue-500"}`}
          />
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={selectedJob.companyLogo || "/placeholder.svg"} alt={selectedJob.company} />
                <AvatarFallback>{selectedJob.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-bold text-xl">{selectedJob.title}</h2>
                <p className="text-muted-foreground">{selectedJob.company}</p>
              </div>
            </div>

            <Badge variant={selectedJob.match >= 90 ? "default" : "secondary"} className="w-full justify-center py-1.5">
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>{selectedJob.match}% Match to Your Profile</span>
              </span>
            </Badge>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{selectedJob.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{selectedJob.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{selectedJob.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Posted {selectedJob.posted}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Job Description</h3>
              <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Requirements</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                {selectedJob.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Benefits</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                {selectedJob.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Contact</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedJob.contact.avatar || "/placeholder.svg"} alt={selectedJob.contact.name} />
                  <AvatarFallback>{selectedJob.contact.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedJob.contact.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedJob.contact.position}</p>
                </div>
              </div>
              <Button className="w-full mt-4 border-none bg-sky-500 hover:bg-sky-600" onClick={() => handleApply(selectedJob.id)} >
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    // For job requests
    if (mainTab === "requests") {
      return (
        <Card className="sticky top-20 ">
          <CardHeader
            className={`h-1 p-0 ${selectedJob.match >= 90 ? "bg-green-500" : selectedJob.match >= 80 ? "bg-yellow-500" : "bg-blue-500"}`}
          />
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={selectedJob.companyLogo || "/placeholder.svg"} alt={selectedJob.company} />
                <AvatarFallback>{selectedJob.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-bold text-xl">{selectedJob.title}</h2>
                <p className="text-muted-foreground">{selectedJob.company}</p>
              </div>
            </div>

            <Badge variant={selectedJob.match >= 90 ? "default" : "secondary"} className="w-full justify-center py-1.5">
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>{selectedJob.match}% Match to Your Profile</span>
              </span>
            </Badge>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{selectedJob.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{selectedJob.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{selectedJob.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Requested on {new Date(selectedJob.requestDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center gap-2 font-medium">
                {selectedJob.requestType === "employer" ? (
                  <Building2 className="h-5 w-5 text-primary" />
                ) : (
                  <Users className="h-5 w-5 text-primary" />
                )}
                <span>
                  {selectedJob.requestType === "employer" ? "Direct Employer Request" : "Agency Recruiter Request"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 pl-7">
                This opportunity was sent directly to you based on your profile
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Request Message</h3>
              <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Contact</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedJob.contact.avatar || "/placeholder.svg"} alt={selectedJob.contact.name} />
                  <AvatarFallback>{selectedJob.contact.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedJob.contact.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedJob.contact.position}</p>
                </div>
              </div>

              {selectedJob.status === "Pending Review" && (
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1" onClick={() => handleAcceptRequest(selectedJob.id)}>
                    Accept Request
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => handleDeclineRequest(selectedJob.id)}>
                    Decline
                  </Button>
                </div>
              )}

              {selectedJob.status === "Accepted" && (
                <div className="mt-4">
                  <Badge variant="success" className="w-full justify-center py-1.5">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    You've accepted this request
                  </Badge>
                </div>
              )}

              {selectedJob.status === "Declined" && (
                <div className="mt-4">
                  <Badge variant="destructive" className="w-full justify-center py-1.5">
                    <XCircle className="h-4 w-4 mr-2" />
                    You've declined this request
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )
    }

    // For applied jobs
    if (mainTab === "applied") {
      return (
        <Card className="sticky top-20">
          <CardHeader className={`h-1 p-0 ${getProgressColor(selectedJob.status)}`} />
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={selectedJob.companyLogo || "/placeholder.svg"} alt={selectedJob.company} />
                <AvatarFallback>{selectedJob.company.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-bold text-xl">{selectedJob.title}</h2>
                <p className="text-muted-foreground">{selectedJob.company}</p>
              </div>
            </div>

            <Badge variant={getStatusBadge(selectedJob.status)} className="w-full justify-center py-1.5">
              <span className="flex items-center gap-2">
                {getStatusIcon(selectedJob.status)}
                <span>Application Status: {selectedJob.status}</span>
              </span>
            </Badge>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Application Progress</span>
                <span className="text-sm text-muted-foreground">{selectedJob.progress}%</span>
              </div>
              <Progress value={selectedJob.progress} className="h-2" />
            </div>

            {selectedJob.nextStep && (
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center gap-2 font-medium">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Next Step: {selectedJob.nextStep}</span>
                </div>
                {selectedJob.nextDate && (
                  <p className="text-sm text-muted-foreground mt-1 pl-7">
                    Scheduled for {new Date(selectedJob.nextDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <h3 className="font-medium">Job Description</h3>
              <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Job Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedJob.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedJob.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Applied {new Date(selectedJob.applied).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Recruiter Contact</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={selectedJob.recruiter.avatar || "/placeholder.svg"}
                    alt={selectedJob.recruiter.name}
                  />
                  <AvatarFallback>{selectedJob.recruiter.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedJob.recruiter.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedJob.recruiter.position}</p>
                </div>
              </div>
              <Button className="w-full mt-4 border-none bg-sky-500 hover:bg-sky-600">Contact Recruiter</Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  return (
    <div className="space-y-6 ">
      <h1 className="text-3xl font-bold mx-12">Jobs</h1>

      {/* Main tabs for Job Listings, Job Requests, Jobs Applied */}
      <Tabs defaultValue="listings" onValueChange={setMainTab} className="mx-8">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="listings">
            <Briefcase className="h-4 w-4 mr-2" />
            Job Listings
          </TabsTrigger>
          <TabsTrigger value="requests">
            <UserCheck className="h-4 w-4 mr-2" />
            Job Requests
          </TabsTrigger>
          <TabsTrigger value="applied">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Jobs Applied
          </TabsTrigger>
        </TabsList>

        {/* Job Listings Tab Content */}
        <TabsContent value="listings" className="space-y-4 mt-4">
          <div className="space-y-4">
            {/* Horizontal filter bar */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  {/* Search bar */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search job title, company, or keywords"
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>
                    <Select defaultValue="relevance">
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="salary-high">Highest Salary</SelectItem>
                        <SelectItem value="match">Best Match</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleSearch} className="border-none bg-sky-500 hover:bg-sky-600">Search</Button>
                  </div>

                  {/* Horizontal filters */}
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    {/* Job Type Dropdown */}
                    <div className="w-full md:w-auto">
                      <Label htmlFor="job-type" className="text-sm mb-2 block">
                        Job Type
                      </Label>
                      <Select>
                        <SelectTrigger id="job-type" className="w-full md:w-[180px]">
                          <SelectValue placeholder="Select job types" />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="filter-full-time"
                                checked={jobTypes["full-time"]}
                                onCheckedChange={(checked) => {
                                  setJobTypes({ ...jobTypes, "full-time": checked })
                                }}
                              />
                              <Label htmlFor="filter-full-time" className="font-normal">
                                Full-time
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="filter-part-time"
                                checked={jobTypes["part-time"]}
                                onCheckedChange={(checked) => {
                                  setJobTypes({ ...jobTypes, "part-time": checked })
                                }}
                              />
                              <Label htmlFor="filter-part-time" className="font-normal">
                                Part-time
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="filter-contract"
                                checked={jobTypes["contract"]}
                                onCheckedChange={(checked) => {
                                  setJobTypes({ ...jobTypes, contract: checked })
                                }}
                              />
                              <Label htmlFor="filter-contract" className="font-normal">
                                Contract
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="filter-freelance"
                                checked={jobTypes["freelance"]}
                                onCheckedChange={(checked) => {
                                  setJobTypes({ ...jobTypes, freelance: checked })
                                }}
                              />
                              <Label htmlFor="filter-freelance" className="font-normal">
                                Freelance
                              </Label>
                            </div>
                          </div>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location Dropdown */}
                    <div className="w-full md:w-auto">
                      <Label htmlFor="location" className="text-sm mb-2 block">
                        Location
                      </Label>
                      <Select>
                        <SelectTrigger id="location" className="w-full md:w-[180px]">
                          <SelectValue placeholder="Select locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="filter-remote"
                                checked={locations["remote"]}
                                onCheckedChange={(checked) => {
                                  setLocations({ ...locations, remote: checked })
                                }}
                              />
                              <Label htmlFor="filter-remote" className="font-normal">
                                Remote
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="filter-onsite"
                                checked={locations["onsite"]}
                                onCheckedChange={(checked) => {
                                  setLocations({ ...locations, onsite: checked })
                                }}
                              />
                              <Label htmlFor="filter-onsite" className="font-normal">
                                On-site
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="filter-hybrid"
                                checked={locations["hybrid"]}
                                onCheckedChange={(checked) => {
                                  setLocations({ ...locations, hybrid: checked })
                                }}
                              />
                              <Label htmlFor="filter-hybrid" className="font-normal">
                                Hybrid
                              </Label>
                            </div>
                          </div>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Salary Range */}
                    <div className="w-full md:w-auto md:flex-1">
                      <Label className="text-sm mb-2 block">
                        Salary Range: ${(salaryRange[0] / 1000).toFixed(0)}k - ${(salaryRange[1] / 1000).toFixed(0)}k
                      </Label>
                      <Slider
                        value={salaryRange}
                        min={0}
                        max={200000}
                        step={10000}
                        onValueChange={setSalaryRange}
                        className="w-full"
                      />
                    </div>

                    {/* Apply Filters Button */}
                    <Button onClick={handleFilterChange} className="border-none bg-sky-500 hover:bg-sky-600">Apply Filters</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job listings grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs defaultValue="all" onValueChange={setActiveCategory}>
                  <TabsList>
                    <TabsTrigger value="all">All Jobs</TabsTrigger>
                    <TabsTrigger value="tech">Tech</TabsTrigger>
                    <TabsTrigger value="non-tech">Non-Tech</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-4">
                    {loading ? (
                      // Loading state
                      Array(3)
                        .fill(0)
                        .map((_, index) => (
                          <Card key={`loading-${index}`} className="overflow-hidden animate-pulse">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-2 w-full">
                                  <div className="h-6 bg-muted rounded w-3/4"></div>
                                  <div className="h-4 bg-muted rounded w-1/2"></div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="h-4 bg-muted rounded w-24"></div>
                                    <div className="h-4 bg-muted rounded w-32"></div>
                                    <div className="h-4 bg-muted rounded w-28"></div>
                                  </div>
                                </div>
                                <div className="h-9 bg-muted rounded w-28"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : filteredAvailableJobs.length > 0 ? (
                      filteredAvailableJobs.map((job) => (
                        <Card
                          key={job.id}
                          className={`overflow-hidden cursor-pointer transition-all ${selectedJob?.id === job.id && mainTab === "listings" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                          onClick={() => {
                            setSelectedJob(job)
                            setMainTab("listings")
                          }}
                        >
                          <div
                            className={`h-1 ${job.match >= 90 ? "bg-green-500" : job.match >= 80 ? "bg-yellow-500" : "bg-blue-500"}`}
                          />
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12 hidden sm:flex">
                                  <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                                  <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                    <Badge variant={job.match >= 90 ? "default" : "secondary"}>
                                      {job.match}% Match
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{job.company}</p>
                                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {job.location}
                                    </div>
                                    <div className="flex items-center">
                                      <DollarSign className="h-4 w-4 mr-1" />
                                      {job.salary}
                                    </div>
                                    <div className="flex items-center">
                                      <Briefcase className="h-4 w-4 mr-1" />
                                      {job.type}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      {job.posted}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                      }}
                                     className="border-none bg-sky-500 hover:bg-sky-600">
                                      Apply Now
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Apply for {job.title}</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <div className="flex items-start gap-4 mb-4">
                                        <Avatar className="h-12 w-12">
                                          <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                                          <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="font-medium">{job.title}</h3>
                                          <p className="text-sm text-muted-foreground">
                                            {job.company} • {job.location}
                                          </p>
                                        </div>
                                      </div>
                                      <p className="text-sm mb-4">
                                        Your profile will be sent to {job.company}. You can customize your application
                                        below.
                                      </p>
                                      <Button
                                        className="w-full border-none bg-sky-500 hover:bg-sky-600"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleApply(job.id)
                                        }}
                                      >
                                        Submit Application
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center py-12">
                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-muted rounded-full p-4 mb-4">
                              <Search className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                            <p className="text-muted-foreground mb-4">
                              Try adjusting your search or filters to find more opportunities
                            </p>
                            <Button
                              onClick={() => {
                                setSearchQuery("")
                                setJobTypes({
                                  "full-time": true,
                                  "part-time": false,
                                  contract: false,
                                  freelance: false,
                                })
                                setLocations({
                                  remote: true,
                                  onsite: false,
                                  hybrid: false,
                                })
                                setSalaryRange([50000, 150000])
                                setActiveCategory("all")
                              }}
                            >
                              Reset Filters
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="tech" className="space-y-4 mt-4">
                    {loading ? (
                      // Loading state
                      Array(2)
                        .fill(0)
                        .map((_, index) => (
                          <Card key={`loading-tech-${index}`} className="overflow-hidden animate-pulse">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-2 w-full">
                                  <div className="h-6 bg-muted rounded w-3/4"></div>
                                  <div className="h-4 bg-muted rounded w-1/2"></div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="h-4 bg-muted rounded w-24"></div>
                                    <div className="h-4 bg-muted rounded w-32"></div>
                                    <div className="h-4 bg-muted rounded w-28"></div>
                                  </div>
                                </div>
                                <div className="h-9 bg-muted rounded w-28"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : filteredAvailableJobs.filter((job) => job.category === "tech").length > 0 ? (
                      filteredAvailableJobs
                        .filter((job) => job.category === "tech")
                        .map((job) => (
                          <Card
                            key={job.id}
                            className={`overflow-hidden cursor-pointer transition-all ${selectedJob?.id === job.id && mainTab === "listings" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                            onClick={() => {
                              setSelectedJob(job)
                              setMainTab("listings")
                            }}
                          >
                            <div
                              className={`h-1 ${job.match >= 90 ? "bg-green-500" : job.match >= 80 ? "bg-yellow-500" : "bg-blue-500"}`}
                            />
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-12 w-12 hidden sm:flex">
                                    <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                                    <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h3 className="font-semibold text-lg">{job.title}</h3>
                                      <Badge variant={job.match >= 90 ? "default" : "secondary"}>
                                        {job.match}% Match
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{job.company}</p>
                                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {job.location}
                                      </div>
                                      <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        {job.salary}
                                      </div>
                                      <div className="flex items-center">
                                        <Briefcase className="h-4 w-4 mr-1" />
                                        {job.type}
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {job.posted}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleApply(job.id)
                                    }}
                                  className="border-none bg-sky-500 hover:bg-sky-600">
                                    Apply Now
                                  </Button>
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center py-12">
                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-muted rounded-full p-4 mb-4">
                              <Search className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No tech jobs found</h3>
                            <p className="text-muted-foreground mb-4">
                              Try adjusting your search or filters to find more opportunities
                            </p>
                            <Button
                              onClick={() => {
                                setSearchQuery("")
                                setJobTypes({
                                  "full-time": true,
                                  "part-time": false,
                                  contract: false,
                                  freelance: false,
                                })
                                setLocations({
                                  remote: true,
                                  onsite: false,
                                  hybrid: false,
                                })
                                setSalaryRange([50000, 150000])
                              }}
                            >
                              Reset Filters
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="non-tech" className="space-y-4 mt-4">
                    {loading ? (
                      // Loading state
                      Array(1)
                        .fill(0)
                        .map((_, index) => (
                          <Card key={`loading-non-tech-${index}`} className="overflow-hidden animate-pulse">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-2 w-full">
                                  <div className="h-6 bg-muted rounded w-3/4"></div>
                                  <div className="h-4 bg-muted rounded w-1/2"></div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="h-4 bg-muted rounded w-24"></div>
                                    <div className="h-4 bg-muted rounded w-32"></div>
                                    <div className="h-4 bg-muted rounded w-28"></div>
                                  </div>
                                </div>
                                <div className="h-9 bg-muted rounded w-28"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : filteredAvailableJobs.filter((job) => job.category === "non-tech").length > 0 ? (
                      filteredAvailableJobs
                        .filter((job) => job.category === "non-tech")
                        .map((job) => (
                          <Card
                            key={job.id}
                            className={`overflow-hidden cursor-pointer transition-all ${selectedJob?.id === job.id && mainTab === "listings" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                            onClick={() => {
                              setSelectedJob(job)
                              setMainTab("listings")
                            }}
                          >
                            <div
                              className={`h-1 ${job.match >= 90 ? "bg-green-500" : job.match >= 80 ? "bg-yellow-500" : "bg-blue-500"}`}
                            />
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-12 w-12 hidden sm:flex">
                                    <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                                    <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h3 className="font-semibold text-lg">{job.title}</h3>
                                      <Badge variant={job.match >= 90 ? "default" : "secondary"}>
                                        {job.match}% Match
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{job.company}</p>
                                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {job.location}
                                      </div>
                                      <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        {job.salary}
                                      </div>
                                      <div className="flex items-center">
                                        <Briefcase className="h-4 w-4 mr-1" />
                                        {job.type}
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {job.posted}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleApply(job.id)
                                    }}
                                   className="border-none bg-sky-500 hover:bg-sky-600">
                                    Apply Now
                                  </Button>
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center py-12">
                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-muted rounded-full p-4 mb-4">
                              <Search className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No non-tech jobs found</h3>
                            <p className="text-muted-foreground mb-4">
                              Try adjusting your search or filters to find more opportunities
                            </p>
                            <Button
                              onClick={() => {
                                setSearchQuery("")
                                setJobTypes({
                                  "full-time": true,
                                  "part-time": false,
                                  contract: false,
                                  freelance: false,
                                })
                                setLocations({
                                  remote: true,
                                  onsite: false,
                                  hybrid: false,
                                })
                                setSalaryRange([50000, 150000])
                              }}
                            >
                              Reset Filters
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Job details panel */}
              <div className="hidden lg:block lg:col-span-1">{renderJobDetails()}</div>
            </div>
          </div>
        </TabsContent>

        {/* Job Requests Tab Content */}
        <TabsContent value="requests" className="space-y-4 mt-4">
          <div className="space-y-4">
            {/* Search bar */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search job requests"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="match">Best Match</SelectItem>
                      <SelectItem value="salary-high">Highest Salary</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch} className="border-none bg-sky-500 hover:bg-sky-600">Search</Button>
                </div>
              </CardContent>
            </Card>

            {/* Job requests grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Requests</TabsTrigger>
                    <TabsTrigger value="employer">Employer Requests</TabsTrigger>
                    <TabsTrigger value="agent">Agent Requests</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-4">
                    {loading ? (
                      // Loading state
                      Array(3)
                        .fill(0)
                        .map((_, index) => (
                          <Card key={`loading-request-${index}`} className="overflow-hidden animate-pulse">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-2 w-full">
                                  <div className="h-6 bg-muted rounded w-3/4"></div>
                                  <div className="h-4 bg-muted rounded w-1/2"></div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="h-4 bg-muted rounded w-24"></div>
                                    <div className="h-4 bg-muted rounded w-32"></div>
                                    <div className="h-4 bg-muted rounded w-28"></div>
                                  </div>
                                </div>
                                <div className="h-9 bg-muted rounded w-28"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : filteredJobRequests.length > 0 ? (
                      filteredJobRequests.map((request) => (
                        <Card
                          key={request.id}
                          className={`overflow-hidden cursor-pointer transition-all ${selectedJob?.id === request.id && mainTab === "requests" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                          onClick={() => {
                            setSelectedJob(request)
                            setMainTab("requests")
                          }}
                        >
                          <div
                            className={`h-1 ${request.match >= 90 ? "bg-green-500" : request.match >= 80 ? "bg-yellow-500" : "bg-blue-500"}`}
                          />
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12 hidden sm:flex">
                                  <AvatarImage src={request.companyLogo || "/placeholder.svg"} alt={request.company} />
                                  <AvatarFallback>{request.company.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-semibold text-lg">{request.title}</h3>
                                    <Badge variant={request.match >= 90 ? "default" : "secondary"}>
                                      {request.match}% Match
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{request.company}</p>
                                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {request.location}
                                    </div>
                                    <div className="flex items-center">
                                      <DollarSign className="h-4 w-4 mr-1" />
                                      {request.salary}
                                    </div>
                                    <div className="flex items-center">
                                      <Briefcase className="h-4 w-4 mr-1" />
                                      {request.type}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Requested {new Date(request.requestDate).toLocaleDateString()}
                                    </div>
                                  </div>
                                  <div className="flex items-center mt-2">
                                    <Badge variant="outline" className="mr-2">
                                      {request.requestType === "employer" ? (
                                        <Building2 className="h-3 w-3 mr-1" />
                                      ) : (
                                        <Users className="h-3 w-3 mr-1" />
                                      )}
                                      {request.requestType === "employer" ? "Direct Employer" : "Agency"}
                                    </Badge>
                                    <Badge variant={getStatusBadge(request.status)}>{request.status}</Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {request.status === "Pending Review" && (
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleAcceptRequest(request.id)
                                      }}
                                    className="border-none bg-sky-500 hover:bg-sky-600">
                                      Accept
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeclineRequest(request.id)
                                      }}
                                    className="border-none hover:bg-red-600">
                                      Decline
                                    </Button>
                                  </div>
                                )}
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center py-12">
                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-muted rounded-full p-4 mb-4">
                              <UserCheck className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No job requests found</h3>
                            <p className="text-muted-foreground mb-4">
                              You don't have any job requests at the moment. When employers or agents are interested in
                              your profile, their requests will appear here.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="employer" className="space-y-4 mt-4">
                    {loading ? (
                      // Loading state
                      Array(2)
                        .fill(0)
                        .map((_, index) => (
                          <Card key={`loading-employer-${index}`} className="overflow-hidden animate-pulse">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-2 w-full">
                                  <div className="h-6 bg-muted rounded w-3/4"></div>
                                  <div className="h-4 bg-muted rounded w-1/2"></div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="h-4 bg-muted rounded w-24"></div>
                                    <div className="h-4 bg-muted rounded w-32"></div>
                                    <div className="h-4 bg-muted rounded w-28"></div>
                                  </div>
                                </div>
                                <div className="h-9 bg-muted rounded w-28"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : filteredJobRequests.filter((req) => req.requestType === "employer").length > 0 ? (
                      filteredJobRequests
                        .filter((req) => req.requestType === "employer")
                        .map((request) => (
                          <Card
                            key={request.id}
                            className={`overflow-hidden cursor-pointer transition-all ${selectedJob?.id === request.id && mainTab === "requests" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                            onClick={() => {
                              setSelectedJob(request)
                              setMainTab("requests")
                            }}
                          >
                            <div
                              className={`h-1 ${request.match >= 90 ? "bg-green-500" : request.match >= 80 ? "bg-yellow-500" : "bg-blue-500"}`}
                            />
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-12 w-12 hidden sm:flex">
                                    <AvatarImage
                                      src={request.companyLogo || "/placeholder.svg"}
                                      alt={request.company}
                                    />
                                    <AvatarFallback>{request.company.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h3 className="font-semibold text-lg">{request.title}</h3>
                                      <Badge variant={request.match >= 90 ? "default" : "secondary"}>
                                        {request.match}% Match
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{request.company}</p>
                                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {request.location}
                                      </div>
                                      <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        {request.salary}
                                      </div>
                                      <div className="flex items-center">
                                        <Briefcase className="h-4 w-4 mr-1" />
                                        {request.type}
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        Requested {new Date(request.requestDate).toLocaleDateString()}
                                      </div>
                                    </div>
                                    <div className="flex items-center mt-2">
                                      <Badge variant="outline" className="mr-2">
                                        <Building2 className="h-3 w-3 mr-1" />
                                        Direct Employer
                                      </Badge>
                                      <Badge variant={getStatusBadge(request.status)}>{request.status}</Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {request.status === "Pending Review" && (
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleAcceptRequest(request.id)
                                        }}
                                       className="border-none bg-sky-500 hover:bg-sky-600">
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleDeclineRequest(request.id)
                                        }}
                                      className="border-none hover:bg-sky-600">
                                        Decline
                                      </Button>
                                    </div>
                                  )}
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center py-12">
                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-muted rounded-full p-4 mb-4">
                              <Building2 className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No employer requests found</h3>
                            <p className="text-muted-foreground mb-4">
                              You don't have any direct employer requests at the moment. When employers are interested
                              in your profile, their requests will appear here.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="agent" className="space-y-4 mt-4">
                    {loading ? (
                      // Loading state
                      Array(2)
                        .fill(0)
                        .map((_, index) => (
                          <Card key={`loading-agent-${index}`} className="overflow-hidden animate-pulse">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-2 w-full">
                                  <div className="h-6 bg-muted rounded w-3/4"></div>
                                  <div className="h-4 bg-muted rounded w-1/2"></div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="h-4 bg-muted rounded w-24"></div>
                                    <div className="h-4 bg-muted rounded w-32"></div>
                                    <div className="h-4 bg-muted rounded w-28"></div>
                                  </div>
                                </div>
                                <div className="h-9 bg-muted rounded w-28"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : filteredJobRequests.filter((req) => req.requestType === "agent").length > 0 ? (
                      filteredJobRequests
                        .filter((req) => req.requestType === "agent")
                        .map((request) => (
                          <Card
                            key={request.id}
                            className={`overflow-hidden cursor-pointer transition-all ${selectedJob?.id === request.id && mainTab === "requests" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                            onClick={() => {
                              setSelectedJob(request)
                              setMainTab("requests")
                            }}
                          >
                            <div
                              className={`h-1 ${request.match >= 90 ? "bg-green-500" : request.match >= 80 ? "bg-yellow-500" : "bg-blue-500"}`}
                            />
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-12 w-12 hidden sm:flex">
                                    <AvatarImage
                                      src={request.companyLogo || "/placeholder.svg"}
                                      alt={request.company}
                                    />
                                    <AvatarFallback>{request.company.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h3 className="font-semibold text-lg">{request.title}</h3>
                                      <Badge variant={request.match >= 90 ? "default" : "secondary"}>
                                        {request.match}% Match
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{request.company}</p>
                                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                      <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {request.location}
                                      </div>
                                      <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        {request.salary}
                                      </div>
                                      <div className="flex items-center">
                                        <Briefcase className="h-4 w-4 mr-1" />
                                        {request.type}
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        Requested {new Date(request.requestDate).toLocaleDateString()}
                                      </div>
                                    </div>
                                    <div className="flex items-center mt-2">
                                      <Badge variant="outline" className="mr-2">
                                        <Users className="h-3 w-3 mr-1" />
                                        Agency
                                      </Badge>
                                      <Badge variant={getStatusBadge(request.status)}>{request.status}</Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {request.status === "Pending Review" && (
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleAcceptRequest(request.id)
                                        }}
                                      >
                                        Accept
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleDeclineRequest(request.id)
                                        }}
                                      >
                                        Decline
                                      </Button>
                                    </div>
                                  )}
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center py-12">
                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-muted rounded-full p-4 mb-4">
                              <Users className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No agent requests found</h3>
                            <p className="text-muted-foreground mb-4">
                              You don't have any recruitment agency requests at the moment. When agencies are interested
                              in your profile, their requests will appear here.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Job details panel */}
              <div className="hidden lg:block lg:col-span-1">{renderJobDetails()}</div>
            </div>
          </div>
        </TabsContent>

        {/* Jobs Applied Tab Content */}
        <TabsContent value="applied" className="space-y-4 mt-4">
          <div className="space-y-4">
            {/* Search bar */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search your applications"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="status">Application Status</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch} className="border-none bg-sky-500 hover:bg-sky-600">Search</Button>
                </div>
              </CardContent>
            </Card>

            {/* Applied jobs grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Applications ({appliedJobs.length})</TabsTrigger>
                    <TabsTrigger value="active">
                      Active (
                      {
                        appliedJobs.filter((job) =>
                          ["Pending", "Shortlisted", "Interview Scheduled"].includes(job.status),
                        ).length
                      }
                      )
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Completed ({appliedJobs.filter((job) => ["Hired", "Rejected"].includes(job.status)).length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-4">
                    {loading ? (
                      // Loading state
                      Array(3)
                        .fill(0)
                        .map((_, index) => (
                          <Card key={`loading-applied-${index}`} className="overflow-hidden animate-pulse">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-2 w-full">
                                  <div classNameclassName="h-6 bg-muted rounded w-3/4"></div>
                                  <div className="h-4 bg-muted rounded w-1/2"></div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="h-4 bg-muted rounded w-24"></div>
                                    <div className="h-4 bg-muted rounded w-32"></div>
                                    <div className="h-4 bg-muted rounded w-28"></div>
                                  </div>
                                </div>
                                <div className="h-9 bg-muted rounded w-28"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : appliedJobs.length > 0 ? (
                      appliedJobs.map((job) => (
                        <Card
                          key={job.id}
                          className={`overflow-hidden cursor-pointer transition-all ${selectedJob?.id === job.id && mainTab === "applied" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                          onClick={() => {
                            setSelectedJob(job)
                            setMainTab("applied")
                          }}
                        >
                          <div className={`h-1 ${getProgressColor(job.status)}`} />
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12 mt-1">
                                <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                                <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">{job.title}</h3>
                                  <Badge variant={getStatusBadge(job.status)} className="ml-auto">
                                    <span className="flex items-center gap-1">
                                      {getStatusIcon(job.status)}
                                      <span>{job.status}</span>
                                    </span>
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{job.company}</p>
                                <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {job.location}
                                  </div>
                                  <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    {job.salary}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    Applied on {new Date(job.applied).toLocaleDateString()}
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium">Application Progress</span>
                                    <span className="text-xs text-muted-foreground">{job.progress}%</span>
                                  </div>
                                  <Progress value={job.progress} className="h-1.5" />
                                </div>

                                {job.nextStep && (
                                  <div className="flex items-center gap-1 mt-2 text-xs">
                                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span>
                                      Next: {job.nextStep}
                                      {job.nextDate && ` on ${new Date(job.nextDate).toLocaleDateString()}`}
                                    </span>
                                  </div>
                                )}

                                {job.status === "Hired" && job.rated === false && (
                                  <div className="flex items-center gap-1 mt-2">
                                    <div className="flex">
                                      {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                          <Star key={i} className="h-5 w-5 text-yellow-500" />
                                        ))}
                                    </div>
                                    <Button variant="link">Rate your experience</Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center py-12">
                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-muted rounded-full p-4 mb-4">
                              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No applications found</h3>
                            <p className="text-muted-foreground mb-4">
                              You haven't applied for any jobs yet. Start browsing job listings and apply to the ones
                              that match your skills and interests.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="active" className="space-y-4 mt-4">
                    {loading ? (
                      // Loading state
                      Array(2)
                        .fill(0)
                        .map((_, index) => (
                          <Card key={`loading-active-${index}`} className="overflow-hidden animate-pulse">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-2 w-full">
                                  <div className="h-6 bg-muted rounded w-3/4"></div>
                                  <div className="h-4 bg-muted rounded w-1/2"></div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="h-4 bg-muted rounded w-24"></div>
                                    <div className="h-4 bg-muted rounded w-32"></div>
                                    <div className="h-4 bg-muted rounded w-28"></div>
                                  </div>
                                </div>
                                <div className="h-9 bg-muted rounded w-28"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : appliedJobs.filter((job) =>
                        ["Pending", "Shortlisted", "Interview Scheduled"].includes(job.status),
                      ).length > 0 ? (
                      appliedJobs
                        .filter((job) => ["Pending", "Shortlisted", "Interview Scheduled"].includes(job.status))
                        .map((job) => (
                          <Card
                            key={job.id}
                            className={`overflow-hidden cursor-pointer transition-all ${selectedJob?.id === job.id && mainTab === "applied" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                            onClick={() => {
                              setSelectedJob(job)
                              setMainTab("applied")
                            }}
                          >
                            <div className={`h-1 ${getProgressColor(job.status)}`} />
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12 mt-1">
                                  <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                                  <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                    <Badge variant={getStatusBadge(job.status)} className="ml-auto">
                                      <span className="flex items-center gap-1">
                                        {getStatusIcon(job.status)}
                                        <span>{job.status}</span>
                                      </span>
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{job.company}</p>
                                  <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {job.location}
                                    </div>
                                    <div className="flex items-center">
                                      <DollarSign className="h-4 w-4 mr-1" />
                                      {job.salary}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Applied on {new Date(job.applied).toLocaleDateString()}
                                    </div>
                                  </div>

                                  <div className="mt-3">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-xs font-medium">Application Progress</span>
                                      <span className="text-xs text-muted-foreground">{job.progress}%</span>
                                    </div>
                                    <Progress value={job.progress} className="h-1.5" />
                                  </div>

                                  {job.nextStep && (
                                    <div className="flex items-center gap-1 mt-2 text-xs">
                                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                      <span>
                                        Next: {job.nextStep}
                                        {job.nextDate && ` on ${new Date(job.nextDate).toLocaleDateString()}`}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center py-12">
                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-muted rounded-full p-4 mb-4">
                              <Clock className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No active applications</h3>
                            <p className="text-muted-foreground mb-4">
                              You don't have any active applications at the moment. Check back later for updates on your
                              submitted applications.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4 mt-4">
                    {loading ? (
                      // Loading state
                      Array(1)
                        .fill(0)
                        .map((_, index) => (
                          <Card key={`loading-completed-${index}`} className="overflow-hidden animate-pulse">
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-2 w-full">
                                  <div className="h-6 bg-muted rounded w-3/4"></div>
                                  <div className="h-4 bg-muted rounded w-1/2"></div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="h-4 bg-muted rounded w-24"></div>
                                    <div className="h-4 bg-muted rounded w-32"></div>
                                    <div className="h-4 bg-muted rounded w-28"></div>
                                  </div>
                                </div>
                                <div className="h-9 bg-muted rounded w-28"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : appliedJobs.filter((job) => ["Hired", "Rejected"].includes(job.status)).length > 0 ? (
                      appliedJobs
                        .filter((job) => ["Hired", "Rejected"].includes(job.status))
                        .map((job) => (
                          <Card
                            key={job.id}
                            className={`overflow-hidden cursor-pointer transition-all ${selectedJob?.id === job.id && mainTab === "applied" ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
                            onClick={() => {
                              setSelectedJob(job)
                              setMainTab("applied")
                            }}
                          >
                            <div className={`h-1 ${getProgressColor(job.status)}`} />
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12 mt-1">
                                  <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                                  <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                    <Badge variant={getStatusBadge(job.status)} className="ml-auto">
                                      <span className="flex items-center gap-1">
                                        {getStatusIcon(job.status)}
                                        <span>{job.status}</span>
                                      </span>
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{job.company}</p>
                                  <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {job.location}
                                    </div>
                                    <div className="flex items-center">
                                      <DollarSign className="h-4 w-4 mr-1" />
                                      {job.salary}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-1" />
                                      Applied on {new Date(job.applied).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center py-12">
                          <div className="flex flex-col items-center justify-center">
                            <div className="bg-muted rounded-full p-4 mb-4">
                              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">No completed applications</h3>
                            <p className="text-muted-foreground mb-4">
                              You don't have any completed applications. Once your applications are processed, they will
                              appear here.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Job details panel */}
              <div className="hidden lg:block lg:col-span-1">{renderJobDetails()}</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
