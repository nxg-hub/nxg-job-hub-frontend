import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AgentProfileDetails({ profileData }) {
  const {
    bio,
    expertiseAreas,
    preferredIndustries,
    experience,
    skills,
    languages,
    certifications,
    education,
  } = profileData;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {bio}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expertise & Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Expertise Areas</h4>
            <div className="flex flex-wrap gap-1.5">
              {expertiseAreas.map((area, index) => (
                <Badge
                  key={index}
                  variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Preferred Industries</h4>
            <div className="flex flex-wrap gap-1.5">
              {preferredIndustries.map((industry, index) => (
                <Badge
                  key={index}
                  variant="outline">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
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
            <h4 className="font-medium mb-2">Languages</h4>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((language, index) => (
                <Badge
                  key={index}
                  variant="outline">
                  {language.language} ({language.proficiency})
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience & Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Work Experience</h4>
            <div className="space-y-3">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="space-y-1">
                  <div className="flex justify-between">
                    <h5 className="font-medium">{exp.title}</h5>
                    <span className="text-sm text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Education</h4>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="space-y-1">
                  <div className="flex justify-between">
                    <h5 className="font-medium">{edu.degree}</h5>
                    <span className="text-sm text-muted-foreground">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-sm">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Certifications</h4>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex justify-between">
                  <span>{cert.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
