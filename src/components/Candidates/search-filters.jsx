import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C#",
  "TypeScript",
  "Angular",
  "Vue.js",
  "PHP",
  "Ruby",
  "Go",
  "AWS",
  "Azure",
  "DevOps",
  "UI/UX",
  "Product Management",
  "Data Science",
  "Machine Learning",
  "Blockchain",
];

export function SearchFilters({ onSearch, searchParams }) {
  const [query, setQuery] = useState(searchParams.query || "");
  const [location, setLocation] = useState(searchParams.location || "");
  const [experience, setExperience] = useState(searchParams.experience || "");
  const [jobType, setJobType] = useState(searchParams.jobType || "");
  const [selectedSkills, setSelectedSkills] = useState(
    searchParams.skills || []
  );
  const [skillInput, setSkillInput] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);

  useEffect(() => {
    if (skillInput) {
      setFilteredSkills(
        skillOptions.filter(
          (skill) =>
            skill.toLowerCase().includes(skillInput.toLowerCase()) &&
            !selectedSkills.includes(skill)
        )
      );
    } else {
      setFilteredSkills([]);
    }
  }, [skillInput, selectedSkills]);

  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleSearch = () => {
    onSearch({
      query,
      skills: selectedSkills,
      location,
      experience,
      jobType,
    });
  };

  const handleReset = () => {
    setQuery("");
    setSelectedSkills([]);
    setLocation("");
    setExperience("");
    setJobType("");
    onSearch({
      query: "",
      skills: [],
      location: "",
      experience: "",
      jobType: "",
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, title, or keywords"
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label
                htmlFor="location"
                className="mb-1.5 block">
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Any location"
                  className="pl-8"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="experience"
                className="mb-1.5 block">
                Experience
              </Label>
              <Select
                value={experience}
                onValueChange={setExperience}>
                <SelectTrigger
                  id="experience"
                  className="hover:bg-slate-100">
                  <SelectValue placeholder="Any experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any experience</SelectItem>
                  <SelectItem value="1">1+ years</SelectItem>
                  <SelectItem value="3">3+ years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                  <SelectItem value="10">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="jobType"
                className="mb-1.5 block">
                Job Type
              </Label>
              <Select
                value={jobType}
                onValueChange={setJobType}>
                <SelectTrigger
                  id="jobType"
                  className="hover:bg-slate-100">
                  <SelectValue placeholder="Any job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any job type</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="skills"
                className="mb-1.5 block">
                Skills
              </Label>
              <div className="relative">
                <Input
                  id="skills"
                  type="text"
                  placeholder="Add skills"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                {filteredSkills.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill}
                        className="px-3 py-2 hover:bg-accent cursor-pointer"
                        onClick={() => handleAddSkill(skill)}>
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-2 py-1">
                  {skill}
                  <button
                    className="ml-1 text-muted-foreground hover:text-foreground"
                    onClick={() => handleRemoveSkill(skill)}>
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button
          variant="outline"
          onClick={handleReset}>
          Reset
        </Button>
        <Button
          className="bg-sky-500 border-none"
          onClick={handleSearch}>
          Search Candidates
        </Button>
      </CardFooter>
    </Card>
  );
}
