import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import sarahicon from "@/static/images/john.png";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

export default function SuggestedCandidates() {
  return (
    <div className="w-1/4 bg-white shadow-md flex flex-col py-4 border rounded-lg">
      <h1 className="text-gray-500 text-sm px-5">Suggested Candidates</h1>
      <Separator className="mt-5" />
      <div className="flex flex-col">
        {[1, 2, 3].map((id) => (
          <div key={id} className="hover:bg-sky-50 hover:cursor-pointer py-5">
            <div className="flex items-center gap-2 px-5 rounded ">
              <Avatar className="h-12 w-12">
                <AvatarImage src={sarahicon} alt="Sarah" />
                <AvatarFallback className="text-2xl">AC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-slate-900 font-medium text-sm">Oluwaseun</p>
                <p className="text-slate-500 text-xs">Opeyemi</p>
              </div>
            </div>
            <Separator />
          </div>
        ))}
        <Link className="mx-auto text-primary">See all</Link>
      </div>
    </div>
  );
}
