import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import sarahicon from "@/static/images/john.png";
import { Separator } from "../ui/separator";

export default function SuggestedCandidates() {
  return (
    <div className="bg-white shadow-md flex flex-col p-8 rounded-md">
      <div className="flex justify-between">
        <h1>Suggested Candidates</h1>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col">
        {[1, 2, 3, 4].map((id) => (
          <div
            key={id}
            className="flex items-center gap-2 p-3 rounded hover:bg-sky-50 hover:cursor-pointer"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={sarahicon} alt="Sarah" />
              <AvatarFallback className="text-2xl">AC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-slate-900 font-medium text-sm">Oluwaseun</p>
              <p className="text-slate-500 text-xs">Opeyemi</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
