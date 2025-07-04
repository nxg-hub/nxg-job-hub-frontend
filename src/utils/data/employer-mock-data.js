export const employerData = {
  firstName: "Oluwaseun",
  lastName: "Opeyemi",
  profilePicture: "/placeholder.svg",
  gender: "Male",
  phoneNumber: "+449050015079",
  email: "interchisety02@gmail.com",
  dateOfBirth: "24 January 2000",
  userType: "Employer",
  location: {
    address: "3 Malas Street off Liasu road Idimu, Lagos",
    city: "Lagos",
    capital: "Lagos",
    postalCode: "237891",
    nationality: "Nigeria",
  },
};

export const sampleJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    description:
      "We are looking for an experienced Frontend Developer to join our team...",
    location: "San Francisco, CA",
    jobType: "Full-time",
    salary: "$80,000 - $120,000",
    postedDate: "2 weeks ago",
    status: "active",
    applicants: [
      {
        id: 1,
        name: "John Doe",
        position: "Frontend Developer",
        experience: "5 years",
        rating: 5,
        status: "review",
        location: "San Francisco",
      },
      {
        id: 2,
        name: "Jane Smith",
        position: "UI Developer",
        experience: "4 years",
        rating: 4,
        status: "review",
        location: "New York",
      },
    ],
  },
  {
    id: 2,
    title: "UX Designer",
    description:
      "Looking for a talented UX Designer with experience in product design...",
    location: "Remote",
    jobType: "Full-time",
    salary: "$70,000 - $90,000",
    postedDate: "1 week ago",
    status: "active",
    applicants: [],
  },
];
