import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"

export default function EmployerCompanyProfileTab() {
     const { setPageTitle } = useOutletContext();
        useEffect(() => {
            setPageTitle("Company Profile");
          }, []);
  return (
    <div className="p-8">
     
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company details and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg" alt="Company Logo" />
                <AvatarFallback className="text-2xl">AC</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Logo
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Technology" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-description">Company Description</Label>
                <Textarea
                  id="company-description"
                  rows={4}
                  defaultValue="Acme Corporation is a leading technology company specializing in innovative software solutions for businesses of all sizes."
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="founded">Founded</Label>
                  <Input id="founded" type="number" defaultValue="2010" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-size">Company Size</Label>
                  <Input id="company-size" defaultValue="50-100 employees" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button  className="border-none bg-sky-500 hover:bg-sky-600">Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update your company contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="contact@acmecorp.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="123 Tech Street, San Francisco, CA 94105" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" defaultValue="https://www.acmecorp.com" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="border-none bg-sky-500 hover:bg-sky-600">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
