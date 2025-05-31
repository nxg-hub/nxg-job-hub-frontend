import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Trash, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import sarahicon from "@/static/images/john.png";

export default function AgentProfileHeader({ profileData }) {
  const { firstName, lastName, userType, location } = profileData;
  return (
    <div className="flex gap-10 item-center bg-white shadow rounded-md p-5">
      <Avatar className="h-28 w-28">
        <AvatarImage src={sarahicon} alt="Sarah" />
        <AvatarFallback className="text-2xl">AC</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center font-medium mr-auto">
        <span className="text-sky-600">
          {firstName} {lastName}
        </span>
        <span className="text-gray-600">{userType}</span>
        {location !== null ? (
          <span className="text-gray-600">
            {location.city}, {location.nationality}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 justify-end">
        <div className="flex gap-5">
          <Button
            className="text-sky-600 hover:text-sky-700"
            variant="outline"
            size="sm"
          >
            <Upload className="h-4 w-4" />
            Change picture
          </Button>
          <Button
            className="bg-red-50 hover:bg-red-400 text-red-500 hover:text-white gap-2 border-none"
            size="sm"
          >
            <Trash className="h-4 w-4" />
            Delete picture
          </Button>
        </div>
      </div>
    </div>
  );
}

// export default function AgentProfileHeader({ profileData }) {
// const {
//   name,
//   avatar,
//   role,
//   location,
//   email,
//   phone,
//   socialLinks,
//   status,
//   availableForNewClients,
// } = profileData;

//   return (
// <Card>
//   <CardContent className="p-6">
//     <div className="flex flex-col gap-6 md:flex-row md:items-center">
//       <Avatar className="h-24 w-24 border-4 border-background">
//         <AvatarImage
//           src={avatar || "/placeholder.svg"}
//           alt={name}
//         />
//         <AvatarFallback className="text-2xl">
//           {name.charAt(0)}
//         </AvatarFallback>
//       </Avatar>

//       <div className="space-y-1.5 flex-1">
//         <div className="flex items-center gap-2">
//           <h2 className="text-2xl font-bold">{name}</h2>
//           <Badge
//             className={
//               availableForNewClients
//                 ? "bg-sky-500 hover:bg-sky-600 text-white"
//                 : undefined
//             }
//             variant={availableForNewClients ? "default" : "outline"}>
//             {availableForNewClients
//               ? "Available for clients"
//               : "Fully booked"}
//           </Badge>
//         </div>
//         <p className="text-muted-foreground">{role}</p>

//         <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
//           <div className="flex items-center gap-1">
//             <MapPin className="h-4 w-4" />
//             <span>{location}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Mail className="h-4 w-4" />
//             <span>{email}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Phone className="h-4 w-4" />
//             <span>{phone}</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-2 self-start md:self-center">
//         {socialLinks?.linkedin && (
//           <Button
//             variant="outline"
//             size="icon"
//             asChild>
//             <a
//               href={socialLinks.linkedin}
//               target="_blank"
//               rel="noopener noreferrer">
//               <Linkedin className="h-4 w-4" />
//             </a>
//           </Button>
//         )}
//         {socialLinks?.twitter && (
//           <Button
//             variant="outline"
//             size="icon"
//             asChild>
//             <a
//               href={socialLinks.twitter}
//               target="_blank"
//               rel="noopener noreferrer">
//               <Twitter className="h-4 w-4" />
//             </a>
//           </Button>
//         )}
//         {socialLinks?.website && (
//           <Button
//             variant="outline"
//             size="icon"
//             asChild>
//             <a
//               href={socialLinks.website}
//               target="_blank"
//               rel="noopener noreferrer">
//               <Globe className="h-4 w-4" />
//             </a>
//           </Button>
//         )}
//       </div>
//     </div>

//     <div className="mt-4 flex items-center gap-2">
//       <Badge
//         variant={status === "Active" ? "default" : "secondary"}
//         className="bg-sky-500 hover:bg-sky-600 px-2 py-0.5">
//         {status}
//       </Badge>
//     </div>
//   </CardContent>
// </Card>
//   );
// }
