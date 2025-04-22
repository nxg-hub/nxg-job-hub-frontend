import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AgentBio({ bio }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{bio}</p>
      </CardContent>
    </Card>
  );
}
