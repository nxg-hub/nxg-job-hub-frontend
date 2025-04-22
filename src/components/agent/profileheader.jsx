import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function AgentProfileHeader({ name, title, photo, location }) {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={photo} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-2 text-center md:text-left">
          <CardTitle className="text-2xl">{name}</CardTitle>
          <CardDescription className="text-lg">{title}</CardDescription>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle
                cx="12"
                cy="10"
                r="3"
              />
            </svg>
            <span>{location}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
