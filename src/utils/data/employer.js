const recruiterPosition = [
  { value: "c-level", label: "C-Level (C.O.O, C.E.O, C.F.O, C.T.O)" },
  {
    value: "senior-mgt",
    label: "Senior Management (Head of Department/Team Lead)",
  },
  { value: "middle-mgt", label: "Middle Management (Supervisor/Unit Head)" },
  { value: "junior-level", label: "Junior Level (Assosiate/Officer)" },
];
const jobVacancy = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "internship", label: "Internship" },
  { value: "volunteer", label: "Volunteer" },
  { value: "freelance", label: "Freelance" },
];
const industry = [
  "Advertising",
  "EdTech",
  "Cloud Computing",
  "Data Storage and Management",
  "Telecom",
  "Robotics",
  "Software",
  "Telecom",
  "Travel and Tourism",
];
const companyIndusrty = [
  { id: 0, value: "", title: "Choose Industry" },
  { id: 1, value: "Advertising", title: "Advertising" },
  { id: 2, value: "EdTech", title: "EdTech" },
  { id: 3, value: "Cloud Computing", title: "Cloud Computing" },
  {
    id: 4,
    value: "Data Storage and Management",
    title: "Data Storage and Management",
  },
  { id: 5, value: "Telecom", title: "Telecom" },
  { id: 6, value: "Robotics", title: "Robotics" },
  { id: 7, value: "Software", title: "Software" },
  { id: 8, value: "Telecom", title: "Telecom" },
  { id: 9, value: "Travel and Tourism", title: "Travel and Tourism" },
];
const employerJobType = [
  { id: 0, value: "", title: "Choose job type" },
  { id: 1, value: "contract", title: "contract" },
  { id: 2, value: "part-time", title: "part-time" },
  { id: 3, value: "full-time", title: "full-time" },
  { id: 4, value: "volunteer", title: "volunteer" },
];

const compSize = ["10-30", "31-60", "61-100", "101-300+"];
const boards = [
  "Twitter",
  "Facebook",
  "Google Jobs",
  "LinkedIn",
  "Instagram",
  "Indeed",
  "Jobberman",
  "Others",
];
const genderOption = ["Male", "Female", "Other"];
export {
  recruiterPosition,
  jobVacancy,
  boards,
  genderOption,
  industry,
  compSize,
  companyIndusrty,
  employerJobType,
};
