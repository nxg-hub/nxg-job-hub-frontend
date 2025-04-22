import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Linkedin, Twitter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AgentProfileHeader({ profileData }) {
  const {
    name,
    avatar,
    role,
    location,
    email,
    phone,
    socialLinks,
    status,
    availableForNewClients,
  } = profileData;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage
              src={avatar || "/placeholder.svg"}
              alt={name}
            />
            <AvatarFallback className="text-2xl">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{name}</h2>
              <Badge
                className={
                  availableForNewClients
                    ? "bg-sky-500 hover:bg-sky-600 text-white"
                    : undefined
                }
                variant={availableForNewClients ? "default" : "outline"}>
                {availableForNewClients
                  ? "Available for clients"
                  : "Fully booked"}
              </Badge>
            </div>
            <p className="text-muted-foreground">{role}</p>

            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 self-start md:self-center">
            {socialLinks?.linkedin && (
              <Button
                variant="outline"
                size="icon"
                asChild>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            )}
            {socialLinks?.twitter && (
              <Button
                variant="outline"
                size="icon"
                asChild>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            )}
            {socialLinks?.website && (
              <Button
                variant="outline"
                size="icon"
                asChild>
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Badge
            variant={status === "Active" ? "default" : "secondary"}
            className="bg-sky-500 hover:bg-sky-600 px-2 py-0.5">
            {status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
