"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, Trash2, Upload, X, Plus, Calendar, Briefcase, GraduationCap, Award, FolderPlus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function ProfilePage() {
  // Personal information state
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [location, setLocation] = useState("New York, NY")
  const [bio, setBio] = useState(
    "Experienced software developer with a passion for creating intuitive user interfaces and solving complex problems.",
  )

  // Social profiles state
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/johndoe")
  const [github, setGithub] = useState("https://github.com/johndoe")
  const [portfolio, setPortfolio] = useState("https://johndoe.dev")

  // Skills state
  const [skills, setSkills] = useState(["React", "JavaScript", "TypeScript", "Node.js", "CSS", "HTML"])
  const [newSkill, setNewSkill] = useState("")

  // Work experience state
  const [workExperiences, setWorkExperiences] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      startDate: "2020-01-01",
      endDate: "2023-01-01",
      description:
        "Led a team of 5 developers to build and maintain the company's main product. Implemented new features and improved performance by 40%.",
    },
  ])

  // Education state
  const [educations, setEducations] = useState([
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      location: "New York, NY",
      startDate: "2014-09-01",
      endDate: "2018-06-01",
    },
  ])

  // Certifications state
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022-05-15",
      file: "aws-cert.pdf",
      credentialId: "AWS-123456",
      expirationDate: "2025-05-15",
    },
    {
      id: 2,
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2021-11-10",
      file: "react-cert.pdf",
      credentialId: "META-789012",
      expirationDate: null,
    },
  ])

  // Portfolio items state
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: "E-commerce Website",
      description: "A full-stack e-commerce platform built with React and Node.js",
      link: "https://github.com/johndoe/ecommerce",
      image: "ecommerce.png",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A productivity app built with React Native",
      link: "https://github.com/johndoe/taskapp",
      image: "taskapp.png",
    },
  ])

  // New item states
  const [newWorkExperience, setNewWorkExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
  })

  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    credentialId: "",
    expirationDate: "",
  })

  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  })

  // Dialog states
  const [showWorkDialog, setShowWorkDialog] = useState(false)
  const [showEducationDialog, setShowEducationDialog] = useState(false)
  const [showCertificationDialog, setShowCertificationDialog] = useState(false)
  const [showPortfolioDialog, setShowPortfolioDialog] = useState(false)

  // Handlers
  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addWorkExperience = () => {
    if (newWorkExperience.title && newWorkExperience.company) {
      setWorkExperiences([
        ...workExperiences,
        {
          id: Date.now(),
          ...newWorkExperience,
        },
      ])
      setNewWorkExperience({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      })
      setShowWorkDialog(false)
    }
  }

  const removeWorkExperience = (id) => {
    setWorkExperiences(workExperiences.filter((exp) => exp.id !== id))
  }

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setEducations([
        ...educations,
        {
          id: Date.now(),
          ...newEducation,
        },
      ])
      setNewEducation({
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
      })
      setShowEducationDialog(false)
    }
  }

  const removeEducation = (id) => {
    setEducations(educations.filter((edu) => edu.id !== id))
  }

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      setCertifications([
        ...certifications,
        {
          id: Date.now(),
          ...newCertification,
          file: `cert-${Date.now()}.pdf`, // Placeholder for file
        },
      ])
      setNewCertification({
        name: "",
        issuer: "",
        date: "",
        credentialId: "",
        expirationDate: "",
      })
      setShowCertificationDialog(false)
    }
  }

  const removeCertification = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  const addPortfolioItem = () => {
    if (newPortfolioItem.title && newPortfolioItem.description) {
      setPortfolioItems([
        ...portfolioItems,
        {
          id: Date.now(),
          ...newPortfolioItem,
          image: newPortfolioItem.image || `project-${Date.now()}.png`, // Placeholder for image
        },
      ])
      setNewPortfolioItem({
        title: "",
        description: "",
        link: "",
        image: null,
      })
      setShowPortfolioDialog(false)
    }
  }

  const removePortfolioItem = (id) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id))
  }

  const handleSaveProfile = () => {
    // In a real app, this would save all profile data to the backend
    alert("Profile saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button onClick={handleSaveProfile}>Save Changes</Button>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
          <TabsTrigger value="portfolio">Certifications & Portfolio</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <h3 className="font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">Upload a professional photo for your profile</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Profiles</CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" value={github} onChange={(e) => setGithub(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio Website</Label>
                <Input id="portfolio" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills & Experience Tab */}
        <TabsContent value="skills" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add your technical and professional skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                    <button className="ml-2" onClick={() => removeSkill(skill)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill}>Add</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Add your previous work experience</CardDescription>
              </div>
              <Dialog open={showWorkDialog} onOpenChange={setShowWorkDialog}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Work Experience</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        placeholder="e.g. Senior Frontend Developer"
                        value={newWorkExperience.title}
                        onChange={(e) => setNewWorkExperience({ ...newWorkExperience, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="e.g. TechCorp Inc."
                        value={newWorkExperience.company}
                        onChange={(e) => setNewWorkExperience({ ...newWorkExperience, company: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workLocation">Location</Label>
                      <Input
                        id="workLocation"
                        placeholder="e.g. Remote, New York, NY"
                        value={newWorkExperience.location}
                        onChange={(e) => setNewWorkExperience({ ...newWorkExperience, location: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newWorkExperience.startDate}
                          onChange={(e) => setNewWorkExperience({ ...newWorkExperience, startDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={newWorkExperience.endDate}
                          onChange={(e) => setNewWorkExperience({ ...newWorkExperience, endDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        rows={3}
                        placeholder="Describe your responsibilities and achievements"
                        value={newWorkExperience.description}
                        onChange={(e) => setNewWorkExperience({ ...newWorkExperience, description: e.target.value })}
                      />
                    </div>

                    <Button className="w-full" onClick={addWorkExperience}>
                      Add Work Experience
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
              {workExperiences.length > 0 ? (
                <div className="space-y-4">
                  {workExperiences.map((experience) => (
                    <div key={experience.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">{experience.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {experience.company} • {experience.location}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeWorkExperience(experience.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(experience.startDate).toLocaleDateString()} -
                        {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : "Present"}
                      </div>
                      {experience.description && <p className="text-sm">{experience.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No work experience added yet. Click the button above to add your work history.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Education</CardTitle>
                <CardDescription>Add your educational background</CardDescription>
              </div>
              <Dialog open={showEducationDialog} onOpenChange={setShowEducationDialog}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Education</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree</Label>
                      <Input
                        id="degree"
                        placeholder="e.g. Bachelor of Science in Computer Science"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        placeholder="e.g. University of Technology"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eduLocation">Location</Label>
                      <Input
                        id="eduLocation"
                        placeholder="e.g. New York, NY"
                        value={newEducation.location}
                        onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="eduStartDate">Start Date</Label>
                        <Input
                          id="eduStartDate"
                          type="date"
                          value={newEducation.startDate}
                          onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eduEndDate">End Date</Label>
                        <Input
                          id="eduEndDate"
                          type="date"
                          value={newEducation.endDate}
                          onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button className="w-full" onClick={addEducation}>
                      Add Education
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
              {educations.length > 0 ? (
                <div className="space-y-4">
                  {educations.map((education) => (
                    <div key={education.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">{education.degree}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {education.institution} • {education.location}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeEducation(education.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(education.startDate).toLocaleDateString()} -
                        {education.endDate ? new Date(education.endDate).toLocaleDateString() : "Present"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No education added yet. Click the button above to add your educational background.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications & Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Certifications</CardTitle>
                <CardDescription>Upload and manage your professional certifications</CardDescription>
              </div>
              <Dialog open={showCertificationDialog} onOpenChange={setShowCertificationDialog}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Certification</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="certName">Certification Name</Label>
                      <Input
                        id="certName"
                        placeholder="e.g. AWS Certified Developer"
                        value={newCertification.name}
                        onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issuer">Issuing Organization</Label>
                      <Input
                        id="issuer"
                        placeholder="e.g. Amazon Web Services"
                        value={newCertification.issuer}
                        onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issueDate">Issue Date</Label>
                      <Input
                        id="issueDate"
                        type="date"
                        value={newCertification.date}
                        onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiration">Expiration Date (Optional)</Label>
                      <Input
                        id="expiration"
                        type="date"
                        value={newCertification.expirationDate || ""}
                        onChange={(e) => setNewCertification({ ...newCertification, expirationDate: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="credentialId">Credential ID (Optional)</Label>
                      <Input
                        id="credentialId"
                        placeholder="e.g. ABC123XYZ"
                        value={newCertification.credentialId || ""}
                        onChange={(e) => setNewCertification({ ...newCertification, credentialId: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certFile">Certificate File</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your certificate file or click to browse
                        </p>
                        <Input type="file" className="hidden" id="cert-file-upload" />
                        <Label
                          htmlFor="cert-file-upload"
                          className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md mt-4"
                        >
                          Select File
                        </Label>
                      </div>
                    </div>

                    <Button className="w-full" onClick={addCertification}>
                      Add Certification
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
              {certifications.length > 0 ? (
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{cert.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {cert.issuer} • Issued on {new Date(cert.date).toLocaleDateString()}
                          </p>
                          {cert.credentialId && (
                            <p className="text-xs text-muted-foreground">Credential ID: {cert.credentialId}</p>
                          )}
                          {cert.expirationDate && (
                            <p className="text-xs text-muted-foreground">
                              Expires: {new Date(cert.expirationDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => removeCertification(cert.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No certifications added yet. Click the button above to add your certifications.
                </div>
              )}

              <Card className="border-dashed">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">Upload a new certification</h3>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your certification file or click to browse
                      </p>
                    </div>
                    <Input type="file" className="hidden" id="certification-upload" />
                    <Label
                      htmlFor="certification-upload"
                      className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md"
                    >
                      Select File
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Portfolio</CardTitle>
                <CardDescription>Showcase your projects and work</CardDescription>
              </div>
              <Dialog open={showPortfolioDialog} onOpenChange={setShowPortfolioDialog}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Portfolio Project</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectTitle">Project Title</Label>
                      <Input
                        id="projectTitle"
                        placeholder="e.g. E-commerce Website"
                        value={newPortfolioItem.title}
                        onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectDesc">Description</Label>
                      <Textarea
                        id="projectDesc"
                        placeholder="Brief description of your project"
                        value={newPortfolioItem.description}
                        onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, description: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectLink">Project Link</Label>
                      <Input
                        id="projectLink"
                        placeholder="e.g. https://github.com/yourusername/project"
                        value={newPortfolioItem.link}
                        onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, link: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectImage">Project Image</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Drag and drop an image or click to browse</p>
                        <Input type="file" className="hidden" id="project-image-upload" accept="image/*" />
                        <Label
                          htmlFor="project-image-upload"
                          className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md mt-4"
                        >
                          Select Image
                        </Label>
                      </div>
                    </div>

                    <Button className="w-full" onClick={addPortfolioItem}>
                      Add Portfolio Item
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioItems.map((item) => (
                  <Card key={item.id}>
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=200&width=400&text=${item.title}`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          View Project
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => removePortfolioItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {portfolioItems.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No portfolio items added yet. Click the button above to showcase your work.
                </div>
              )}

              <Card className="border-dashed">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <FolderPlus className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">Add a new portfolio item</h3>
                      <p className="text-sm text-muted-foreground">Showcase your best work to potential employers</p>
                    </div>
                    <Button onClick={() => setShowPortfolioDialog(true)}>Add Project</Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
