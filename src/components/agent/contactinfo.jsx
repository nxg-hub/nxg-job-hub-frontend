import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin } from "lucide-react";

export default function AgentContactInfo({ email, phone, linkedin }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <a
            href={`mailto:${email}`}
            className="text-sm hover:underline">
            {email}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="text-sm hover:underline">
            {phone}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Linkedin className="h-5 w-5 text-muted-foreground" />
          <a
            href={`https://${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline">
            {linkedin}
          </a>
        </div>
        <Button
          className="w-full mt-4 hover:text-white hover:border-none  hover:bg-sky-600"
          variant="outline">
          Schedule Meeting
        </Button>
      </CardContent>
    </Card>
  );
}
