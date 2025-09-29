import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
  Backpack,
  Building2,
  CalendarRange,
  Hash,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function JobPreview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("jobPreview");
    if (saved) setData(JSON.parse(saved));
  }, []);

  return (
    <div className="py-10">
      <div className="shadow rounded-md mx-auto px-8 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2 text-balance text-secondary">
                {data?.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  <span className="text-base font-medium capitalize">
                    {data?.companyName}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Backpack className="h-5 w-5 text-gray-300" />
                <div>
                  <p className="text-sm text-muted-foreground ">Job Type</p>
                  <p className="font-semibold capitalize">{data?.job_type}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <ArrowUpRight className="h-5 w-5 text-gray-300" />
                <div>
                  <p className="text-sm text-muted-foreground">Salary Range</p>
                  <p className="font-semibold">{data?.salary}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <CalendarRange className="h-5 w-5 text-gray-300" />
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="font-semibold">{data?.deadline}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {data?.description}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  {data?.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            {/* Company Overview */}
            <Card className="bg-sidebar border-sidebar-border">
              <CardHeader>
                <CardTitle className="text-sidebar-foreground">
                  About TechCorp Solutions
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sidebar-foreground">
                <p className="text-sm leading-relaxed mb-4">
                  {data?.companyBio}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country:</span>
                    <span className="capitalize">{data?.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Number of employees:
                    </span>
                    <span>{data?.companySize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry:</span>
                    <span className="capitalize">{data?.industryType}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* tags */}
            <div className="flex border-[1px] rounded gap-2 p-4 pb-3 bg-sidebar border-sidebar-border">
              <Hash className="w-6 h-6 text-sky-200" />
              <div className="flex text-secondary gap-3">
                {data?.tags.map((tag, index) => (
                  <p key={index} className="text-base mb-4">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
