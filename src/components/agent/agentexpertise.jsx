import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AgentExpertise({
  expertiseAreas,
  preferredIndustries,
  languages,
  certifications,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expertise & Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Areas of Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {expertiseAreas.map((area) => (
              <Badge
                key={area}
                variant="secondary">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Preferred Industries</h3>
          <div className="flex flex-wrap gap-2">
            {preferredIndustries.map((industry) => (
              <Badge
                key={industry}
                variant="outline">
                {industry}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <Badge
                key={language}
                variant="secondary">
                {language}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Certifications</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
