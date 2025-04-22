// Mock data for the agent dashboard

export const matchesData = [
  {
    id: 1,
    candidate: { name: "John Doe", avatar: "/placeholder.svg", type: "Tech Talent", skills: ["React", "Node.js"] },
    employer: { name: "Acme Inc", avatar: "/placeholder.svg" },
    job: "Senior Frontend Developer",
    status: "In Progress",
    progress: 65,
    date: "2023-04-15",
  },
  {
    id: 2,
    candidate: { name: "Jane Smith", avatar: "/placeholder.svg", type: "Artisan", skills: ["Carpentry", "Woodwork"] },
    employer: { name: "BuildRight Co", avatar: "/placeholder.svg" },
    job: "Master Carpenter",
    status: "Matched",
    progress: 25,
    date: "2023-04-18",
  },
  {
    id: 3,
    candidate: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg",
      type: "Service Provider",
      skills: ["Plumbing", "Electrical"],
    },
    employer: { name: "HomeServices Ltd", avatar: "/placeholder.svg" },
    job: "Maintenance Specialist",
    status: "Completed",
    progress: 100,
    date: "2023-04-10",
  },
  {
    id: 4,
    candidate: { name: "Sarah Williams", avatar: "/placeholder.svg", type: "Tech Talent", skills: ["UI/UX", "Figma"] },
    employer: { name: "DesignHub", avatar: "/placeholder.svg" },
    job: "UI/UX Designer",
    status: "In Progress",
    progress: 45,
    date: "2023-04-20",
  },
]

export const messagesData = [
  {
    id: 1,
    from: { name: "Acme Inc", avatar: "/placeholder.svg", type: "Employer" },
    preview: "We need to discuss the candidate you sent us last week...",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    from: { name: "John Doe", avatar: "/placeholder.svg", type: "Candidate" },
    preview: "Thank you for matching me with Acme Inc! I had my interview yesterday...",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    from: { name: "BuildRight Co", avatar: "/placeholder.svg", type: "Employer" },
    preview: "Do you have any carpenters available for a 3-month project?",
    time: "Yesterday",
    unread: true,
  },
]

export const candidatesData = [
  {
    id: 1,
    name: "Alex Turner",
    avatar: "/placeholder.svg",
    type: "Tech Talent",
    skills: ["Python", "Data Science", "ML"],
    location: "San Francisco, CA",
    currentRole: "Data Scientist",
    availability: "2 weeks notice",
    email: "alex.turner@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Experienced data scientist with a passion for machine learning and AI. Looking for challenging projects in the tech industry.",
    skillAssessments: [
      { name: "Python", level: 9 },
      { name: "Machine Learning", level: 8 },
      { name: "Data Analysis", level: 9 },
      { name: "SQL", level: 7 },
    ],
    preferences: {
      jobTypes: ["Full-time", "Remote"],
      industries: ["Technology", "Finance", "Healthcare"],
      salary: "$120,000 - $150,000",
      locations: ["San Francisco", "Remote"],
    },
    experience: [
      {
        title: "Senior Data Scientist",
        company: "TechCorp",
        period: "2020 - Present",
        description: "Leading data science initiatives and machine learning projects.",
      },
      {
        title: "Data Analyst",
        company: "DataInsights",
        period: "2018 - 2020",
        description: "Analyzed large datasets to provide business insights and recommendations.",
      },
    ],
    education: [
      {
        degree: "M.S. in Computer Science",
        institution: "Stanford University",
        year: "2018",
      },
      {
        degree: "B.S. in Statistics",
        institution: "UC Berkeley",
        year: "2016",
      },
    ],
    certifications: [
      { name: "TensorFlow Developer Certificate", year: "2021" },
      { name: "AWS Certified Machine Learning", year: "2020" },
    ],
    matchHistory: [
      {
        jobTitle: "Data Scientist",
        company: "AI Solutions Inc.",
        status: "Hired",
        date: "Jan 15, 2023",
        feedback: "Perfect match for our team. Alex has been an excellent addition.",
      },
      {
        jobTitle: "ML Engineer",
        company: "TechStart",
        status: "Rejected",
        date: "Nov 10, 2022",
        feedback: "Good technical skills but not enough experience with our specific tech stack.",
      },
    ],
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "/placeholder.svg",
    type: "Artisan",
    skills: ["Painting", "Decoration", "Interior Design"],
    location: "Portland, OR",
    currentRole: "Freelance Painter",
    availability: "Immediately",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 234-5678",
    bio: "Creative artisan with 10+ years of experience in painting and decoration. Specialized in interior design and custom murals.",
  },
  {
    id: 3,
    name: "David Chen",
    avatar: "/placeholder.svg",
    type: "Service Provider",
    skills: ["Consulting", "Project Management", "Business Analysis"],
    location: "Chicago, IL",
    currentRole: "Business Consultant",
    availability: "1 month notice",
    email: "david.chen@example.com",
    phone: "+1 (555) 345-6789",
    bio: "Experienced business consultant helping companies optimize their operations and increase profitability.",
  },
  {
    id: 4,
    name: "Lisa Wong",
    avatar: "/placeholder.svg",
    type: "Tech Talent",
    skills: ["Java", "Spring", "Microservices", "AWS"],
    location: "Boston, MA",
    currentRole: "Senior Backend Developer",
    availability: "2 weeks notice",
    email: "lisa.wong@example.com",
    phone: "+1 (555) 456-7890",
    bio: "Backend developer with expertise in Java and cloud technologies. Looking for remote opportunities.",
  },
]

export const newCandidateRequests = [
  {
    id: 101,
    name: "Ryan Mitchell",
    avatar: "/placeholder.svg",
    type: "Tech Talent",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    location: "Denver, CO",
    currentRole: "Frontend Developer",
    availability: "Immediately",
    email: "ryan.mitchell@example.com",
    phone: "+1 (555) 987-6543",
    bio: "Frontend developer with 4 years of experience building modern web applications. Looking for new challenges.",
    isNewRequest: true,
    requestDate: "2023-05-01",
  },
  {
    id: 102,
    name: "Sophia Lee",
    avatar: "/placeholder.svg",
    type: "Service Provider",
    skills: ["Marketing", "Social Media", "Content Creation"],
    location: "New York, NY",
    currentRole: "Marketing Specialist",
    availability: "2 weeks notice",
    email: "sophia.lee@example.com",
    phone: "+1 (555) 876-5432",
    bio: "Marketing professional with a focus on digital strategies and content creation.",
    isNewRequest: true,
    requestDate: "2023-05-02",
  },
]

export const employersData = [
  {
    id: 1,
    name: "TechCorp",
    avatar: "/placeholder.svg",
    industry: "Technology",
    location: "San Francisco, CA",
    description: "Leading technology company specializing in AI and machine learning solutions.",
    contactPerson: "Sarah Johnson (HR Director)",
    website: "https://techcorp-example.com",
    previousPlacements: [
      { position: "Senior Developer", date: "March 2023", status: "Active" },
      { position: "UX Designer", date: "January 2023", status: "Completed" },
    ],
  },
  {
    id: 2,
    name: "BuildMaster",
    avatar: "/placeholder.svg",
    industry: "Construction",
    location: "Portland, OR",
    description: "Construction company focused on residential and commercial building projects.",
    contactPerson: "Mike Peterson (Talent Acquisition)",
  },
  {
    id: 3,
    name: "ServiceNow",
    avatar: "/placeholder.svg",
    industry: "Services",
    location: "Chicago, IL",
    description: "Professional services firm providing consulting and business solutions.",
    contactPerson: "Jennifer Adams (Recruiting Manager)",
  },
  {
    id: 4,
    name: "DesignWorks",
    avatar: "/placeholder.svg",
    industry: "Design",
    location: "Remote",
    description: "Creative design agency working with clients worldwide on branding and digital design.",
    contactPerson: "Michael Chen (Creative Director)",
  },
]

export const employerRequests = [
  {
    id: 201,
    employer: {
      id: 1,
      name: "TechCorp",
      avatar: "/placeholder.svg",
      description: "Leading technology company specializing in AI and machine learning solutions.",
    },
    jobTitle: "Senior Machine Learning Engineer",
    industry: "Technology",
    location: "San Francisco, CA",
    jobType: "Full-time",
    salary: "$140,000 - $180,000",
    datePosted: "April 28, 2023",
    deadline: "May 30, 2023",
    status: "New",
    urgency: "High",
    positions: 2,
    description:
      "We're looking for an experienced Machine Learning Engineer to join our AI team. The ideal candidate will have strong experience in developing and deploying machine learning models at scale.",
    requiredSkills: ["Python", "TensorFlow", "PyTorch", "ML Ops", "Cloud Platforms"],
    preferredSkills: ["Kubernetes", "MLflow", "Computer Vision"],
    experience: "5+ years of experience in machine learning engineering",
    education: "Master's or PhD in Computer Science, Machine Learning, or related field",
    additionalRequirements: "Experience with large language models and generative AI is a plus.",
    contactPerson: {
      name: "Sarah Johnson",
      position: "HR Director",
      email: "sarah.johnson@techcorp-example.com",
      phone: "+1 (555) 123-4567",
    },
  },
  {
    id: 202,
    employer: {
      id: 4,
      name: "DesignWorks",
      avatar: "/placeholder.svg",
      description: "Creative design agency working with clients worldwide on branding and digital design.",
    },
    jobTitle: "Senior UI/UX Designer",
    industry: "Design",
    location: "Remote",
    jobType: "Full-time",
    salary: "$100,000 - $130,000",
    datePosted: "April 30, 2023",
    status: "New",
    urgency: "Medium",
    positions: 1,
    description:
      "We're seeking a talented UI/UX Designer to create beautiful and functional interfaces for our clients. The ideal candidate will have a strong portfolio showcasing their design process and outcomes.",
    requiredSkills: ["Figma", "UI Design", "User Research", "Prototyping"],
    preferredSkills: ["Motion Design", "Design Systems", "Front-end Development"],
    experience: "4+ years of experience in UI/UX design",
    education: "Bachelor's degree in Design, HCI, or related field",
    contactPerson: {
      name: "Michael Chen",
      position: "Creative Director",
      email: "michael.chen@designworks-example.com",
      phone: "+1 (555) 987-6543",
    },
  },
  {
    id: 203,
    employer: {
      id: 2,
      name: "BuildMaster",
      avatar: "/placeholder.svg",
      description: "Construction company focused on residential and commercial building projects.",
    },
    jobTitle: "Senior Carpenter",
    industry: "Construction",
    location: "Portland, OR",
    jobType: "Full-time",
    salary: "$35 - $45 per hour",
    datePosted: "April 25, 2023",
    status: "Active",
    urgency: "Medium",
    positions: 3,
    description:
      "We're looking for experienced carpenters to join our team for upcoming residential projects. Must have experience with finish carpentry and custom installations.",
    requiredSkills: ["Carpentry", "Woodworking", "Blueprint Reading", "Finishing"],
    preferredSkills: ["Cabinet Making", "Custom Furniture", "Project Management"],
    experience: "5+ years of professional carpentry experience",
    education: "Vocational training in carpentry or related field",
    contactPerson: {
      name: "Mike Peterson",
      position: "Talent Acquisition",
      email: "mike.peterson@buildmaster-example.com",
      phone: "+1 (555) 234-5678",
    },
  },
  {
    id: 204,
    employer: {
      id: 3,
      name: "ServiceNow",
      avatar: "/placeholder.svg",
      description: "Professional services firm providing consulting and business solutions.",
    },
    jobTitle: "Business Analyst",
    industry: "Services",
    location: "Chicago, IL",
    jobType: "Full-time",
    salary: "$80,000 - $100,000",
    datePosted: "April 20, 2023",
    status: "Active",
    urgency: "Low",
    positions: 1,
    description:
      "We're seeking a detail-oriented Business Analyst to help our clients optimize their operations and implement new business solutions.",
    requiredSkills: ["Business Analysis", "Requirements Gathering", "Process Mapping", "Documentation"],
    preferredSkills: ["SQL", "Agile Methodologies", "BPMN"],
    experience: "3+ years of business analysis experience",
    education: "Bachelor's degree in Business, IT, or related field",
    contactPerson: {
      name: "Jennifer Adams",
      position: "Recruiting Manager",
      email: "jennifer.adams@servicenow-example.com",
      phone: "+1 (555) 345-6789",
    },
  },
]

export const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Acme Inc",
    companyLogo: "/placeholder.svg",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    industry: "Technology",
    postedDate: "2023-04-10",
    description: "We're looking for a senior frontend developer with React experience to join our team.",
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    id: 2,
    title: "Master Carpenter",
    company: "BuildRight Co",
    companyLogo: "/placeholder.svg",
    location: "Portland, OR",
    type: "Contract",
    salary: "$45 - $60 per hour",
    industry: "Construction",
    postedDate: "2023-04-12",
    description: "Experienced carpenter needed for high-end residential projects.",
    skills: ["Carpentry", "Woodworking", "Blueprint Reading"],
  },
  {
    id: 3,
    title: "Maintenance Specialist",
    company: "HomeServices Ltd",
    companyLogo: "/placeholder.svg",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$60,000 - $75,000",
    industry: "Services",
    postedDate: "2023-04-15",
    description: "Looking for a maintenance specialist with plumbing and electrical experience.",
    skills: ["Plumbing", "Electrical", "HVAC"],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "DesignHub",
    companyLogo: "/placeholder.svg",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $110,000",
    industry: "Design",
    postedDate: "2023-04-18",
    description: "Join our team as a UI/UX designer to create beautiful and functional interfaces.",
    skills: ["Figma", "UI Design", "User Research"],
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "DataCorp",
    companyLogo: "/placeholder.svg",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    industry: "Technology",
    postedDate: "2023-04-05",
    description: "Seeking a data scientist with machine learning experience to join our AI team.",
    skills: ["Python", "Machine Learning", "SQL"],
  },
  {
    id: 6,
    title: "Marketing Manager",
    company: "GrowthCo",
    companyLogo: "/placeholder.svg",
    location: "New York, NY",
    type: "Full-time",
    salary: "$85,000 - $105,000",
    industry: "Marketing",
    postedDate: "2023-04-08",
    description: "Lead our marketing efforts and drive growth for our B2B SaaS product.",
    skills: ["Digital Marketing", "Content Strategy", "Analytics"],
  },
  {
    id: 7,
    title: "Electrician",
    company: "PowerWorks",
    companyLogo: "/placeholder.svg",
    location: "Denver, CO",
    type: "Contract",
    salary: "$40 - $55 per hour",
    industry: "Construction",
    postedDate: "2023-04-14",
    description: "Licensed electrician needed for commercial and residential projects.",
    skills: ["Electrical Systems", "Wiring", "Troubleshooting"],
  },
  {
    id: 8,
    title: "Customer Success Manager",
    company: "SupportHero",
    companyLogo: "/placeholder.svg",
    location: "Remote",
    type: "Full-time",
    salary: "$70,000 - $90,000",
    industry: "Customer Service",
    postedDate: "2023-04-17",
    description: "Help our customers succeed with our product and drive retention.",
    skills: ["Customer Support", "Account Management", "Communication"],
  },
]

export const employerRequestsData = [
  {
    id: 1,
    jobId: 1,
    requestType: "Candidate Requirement",
    description:
      "We need candidates with at least 5 years of React experience and strong TypeScript skills. Team collaboration skills are essential as they'll be working in an agile environment.",
    priority: "High",
    date: "2023-04-12",
    status: "Open",
  },
  {
    id: 2,
    jobId: 1,
    requestType: "Timeline",
    description:
      "We're looking to fill this position within the next 3 weeks. Please prioritize candidates who can start immediately or with short notice periods.",
    priority: "Medium",
    date: "2023-04-13",
    status: "Open",
  },
  {
    id: 3,
    jobId: 2,
    requestType: "Portfolio Requirement",
    description:
      "Candidates must have a portfolio showcasing high-end carpentry work. Experience with custom furniture and architectural elements is preferred.",
    priority: "High",
    date: "2023-04-14",
    status: "Open",
  },
  {
    id: 4,
    jobId: 3,
    requestType: "Certification Requirement",
    description:
      "All candidates must have valid plumbing and electrical certifications. HVAC experience is a plus but not required.",
    priority: "High",
    date: "2023-04-16",
    status: "Open",
  },
  {
    id: 5,
    jobId: 4,
    requestType: "Work Sample",
    description:
      "Please have candidates prepare a small design challenge response before the interview. We'll provide the brief upon scheduling.",
    priority: "Medium",
    date: "2023-04-19",
    status: "Open",
  },
  {
    id: 6,
    jobId: 5,
    requestType: "Technical Assessment",
    description:
      "Candidates will need to complete a technical assessment focusing on machine learning algorithms and data processing. Please prepare them accordingly.",
    priority: "High",
    date: "2023-04-07",
    status: "Open",
  },
  {
    id: 7,
    jobId: 1,
    requestType: "Interview Process",
    description:
      "Our interview process consists of an initial screening, technical interview, and final panel interview with the team. The entire process typically takes 2 weeks.",
    priority: "Low",
    date: "2023-04-14",
    status: "Open",
  },
]

export const jobRequirementsData = {
  1: {
    essentialSkills: ["React", "TypeScript", "CSS", "State Management", "API Integration"],
    desirableSkills: ["Next.js", "GraphQL", "Testing (Jest/RTL)", "CI/CD"],
    experience: "5+ years of frontend development experience",
    education: "Bachelor's degree in Computer Science or equivalent experience",
    additionalInfo:
      "This role will involve mentoring junior developers and collaborating closely with the design team.",
  },
  2: {
    essentialSkills: ["Carpentry", "Woodworking", "Blueprint Reading", "Finishing Techniques"],
    desirableSkills: ["CAD Software", "Project Management", "Custom Furniture Design"],
    experience: "7+ years of professional carpentry experience",
    education: "Vocational training in carpentry or related field",
    additionalInfo:
      "This position requires occasional travel to client sites and the ability to work with high-end materials.",
  },
  3: {
    essentialSkills: ["Plumbing", "Electrical", "HVAC", "Troubleshooting"],
    desirableSkills: ["Building Codes Knowledge", "Preventative Maintenance", "Smart Home Systems"],
    experience: "3+ years in maintenance or related field",
    education: "Technical certification in plumbing and electrical systems",
    additionalInfo: "Must have own tools and reliable transportation. On-call rotation required.",
  },
  4: {
    essentialSkills: ["Figma", "UI Design", "User Research", "Prototyping"],
    desirableSkills: ["Motion Design", "Design Systems", "Accessibility", "Front-end Development"],
    experience: "3+ years in UI/UX design",
    education: "Degree in Design, HCI, or related field",
    additionalInfo:
      "Portfolio showcasing end-to-end design process is required. Must be comfortable presenting work to stakeholders.",
  },
  5: {
    essentialSkills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    desirableSkills: ["Cloud Platforms (AWS/GCP)", "Big Data Technologies", "Deep Learning"],
    experience: "4+ years in data science or related field",
    education: "Master's or PhD in Computer Science, Statistics, or related field",
    additionalInfo: "Experience with NLP and computer vision projects preferred. Publication history is a plus.",
  },
  6: {
    essentialSkills: ["Digital Marketing", "Content Strategy", "Analytics", "Campaign Management"],
    desirableSkills: ["SEO/SEM", "Marketing Automation", "CRM Experience", "B2B Marketing"],
    experience: "5+ years in marketing roles",
    education: "Bachelor's degree in Marketing, Business, or related field",
    additionalInfo: "Experience with SaaS products and technical audiences is highly desired.",
  },
  7: {
    essentialSkills: ["Electrical Systems", "Wiring", "Troubleshooting", "Code Compliance"],
    desirableSkills: ["Commercial Experience", "Low Voltage Systems", "Solar Installation"],
    experience: "5+ years as a licensed electrician",
    education: "Journeyman or Master Electrician license",
    additionalInfo: "Must be comfortable working in various environments and weather conditions.",
  },
  8: {
    essentialSkills: ["Customer Support", "Account Management", "Communication", "Problem Solving"],
    desirableSkills: ["SaaS Experience", "Technical Background", "CRM Software", "Data Analysis"],
    experience: "3+ years in customer success or account management",
    education: "Bachelor's degree preferred but not required",
    additionalInfo:
      "Strong communication skills and ability to translate technical concepts to non-technical users is essential.",
  },
}

export const industryOptions = [
  "All Industries",
  "Technology",
  "Construction",
  "Services",
  "Design",
  "Marketing",
  "Customer Service",
]

export const locationOptions = [
  "All Locations",
  "San Francisco, CA",
  "Portland, OR",
  "Chicago, IL",
  "Remote",
  "Boston, MA",
  "New York, NY",
  "Denver, CO",
]

export const typeOptions = ["All Types", "Full-time", "Part-time", "Contract", "Internship"]

export const notificationsData = [
  {
    id: 301,
    type: "new_candidate",
    title: "New Candidate Request",
    message: "Ryan Mitchell has requested to be added to your talent pool.",
    timestamp: "2023-05-01T10:30:00Z",
    read: false,
    data: {
      candidateId: 101,
      candidateName: "Ryan Mitchell",
    },
  },
  {
    id: 302,
    type: "new_employer_request",
    title: "New Employer Request",
    message: "TechCorp is looking for a Senior Machine Learning Engineer.",
    timestamp: "2023-04-28T14:45:00Z",
    read: false,
    data: {
      requestId: 201,
      employerId: 1,
      employerName: "TechCorp",
    },
  },
  {
    id: 303,
    type: "match_confirmed",
    title: "Match Confirmed",
    message: "John Doe has been hired by Acme Inc for the Senior Frontend Developer position.",
    timestamp: "2023-04-25T09:15:00Z",
    read: true,
    data: {
      matchId: 1,
      candidateId: 1,
      employerId: 1,
    },
  },
  {
    id: 304,
    type: "new_candidate",
    title: "New Candidate Request",
    message: "Sophia Lee has requested to be added to your talent pool.",
    timestamp: "2023-05-02T11:20:00Z",
    read: false,
    data: {
      candidateId: 102,
      candidateName: "Sophia Lee",
    },
  },
  {
    id: 305,
    type: "new_employer_request",
    title: "New Employer Request",
    message: "DesignWorks is looking for a Senior UI/UX Designer.",
    timestamp: "2023-04-30T16:10:00Z",
    read: false,
    data: {
      requestId: 202,
      employerId: 4,
      employerName: "DesignWorks",
    },
  },
]

// Helper functions
export const getEmployerRequestsForJob = (jobId) => {
  return employerRequestsData.filter((request) => request.jobId === jobId)
}

export const getJobRequirements = (jobId) => {
  return jobRequirementsData[jobId] || null
}

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const getStatusColor = (status) => {
  switch (status) {
    case "Matched":
      return "bg-blue-500"
    case "In Progress":
      return "bg-yellow-500"
    case "Completed":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

export const agentData = {
  name: "Alex Morgan",
  avatar: "/placeholder.svg",
  role: "Senior Recruitment Agent",
  location: "San Francisco, CA",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 123-4567",
  status: "Active",
  availableForNewClients: true,
  socialLinks: {
    linkedin: "https://linkedin.com/in/alexmorgan",
    twitter: "https://twitter.com/alexmorgan",
    website: "https://alexmorgan.example.com",
  },
  bio: "Experienced recruitment agent with over 8 years of experience connecting top talent with leading companies. Specializing in tech and creative industries, I pride myself on understanding both client needs and candidate aspirations to create lasting professional relationships.",
  expertiseAreas: [
    "Technical Recruitment",
    "Executive Search",
    "Creative Talent",
    "Remote Work Placement",
    "Diversity Hiring",
  ],
  preferredIndustries: ["Technology", "Design", "Marketing", "Finance", "Healthcare"],
  skills: [
    "Candidate Screening",
    "Negotiation",
    "Market Research",
    "Relationship Building",
    "Talent Assessment",
    "Interview Techniques",
  ],
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Fluent" },
    { language: "French", proficiency: "Intermediate" },
  ],
  experience: [
    {
      title: "Senior Recruitment Agent",
      company: "TalentMatch Inc.",
      period: "2020 - Present",
      description:
        "Leading a team of 5 recruiters specializing in tech placements with a 95% client satisfaction rate.",
    },
    {
      title: "Recruitment Specialist",
      company: "Global Staffing Solutions",
      period: "2017 - 2020",
      description: "Focused on creative industry placements, exceeding placement targets by 30% year-over-year.",
    },
    {
      title: "Junior Recruiter",
      company: "First Hire Agency",
      period: "2015 - 2017",
      description:
        "Started as an assistant and was promoted within 6 months due to exceptional candidate sourcing abilities.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Business Administration",
      institution: "University of California, Berkeley",
      year: "2015",
    },
    {
      degree: "Certified Professional Recruiter (CPR)",
      institution: "American Staffing Association",
      year: "2016",
    },
  ],
  certifications: [
    { name: "Professional in Human Resources (PHR)", year: "2018" },
    { name: "Certified Diversity Recruiter", year: "2019" },
    { name: "Advanced LinkedIn Recruiter Certification", year: "2020" },
  ],
  metrics: {
    successfulMatches: 187,
    successRate: 92,
    rating: 4.8,
    activeClients: 14,
    totalMatches: 203,
  },
  testimonials: [
    {
      name: "Sarah Johnson",
      company: "TechCorp",
      avatar: "/placeholder.svg",
      text: "Alex found us the perfect developer in just two weeks when we had been searching for months. Incredible understanding of our needs.",
    },
    {
      name: "Michael Chen",
      company: "DesignWorks",
      avatar: "/placeholder.svg",
      text: "Working with Alex was a game-changer for our hiring process. The candidates were perfectly pre-screened and matched to our culture.",
    },
    {
      name: "Jessica Williams",
      company: "HealthInnovate",
      avatar: "/placeholder.svg",
      text: "Alex has an uncanny ability to match not just skills but personalities. Our new hires have integrated seamlessly.",
    },
  ],
}
