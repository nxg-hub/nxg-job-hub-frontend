import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Key,
  Lock,
  Shield,
  User,
  Check,
  ChevronDown,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PasswordCard from "./PasswordCard";
import { useSelector } from "react-redux";
import { formatFullDate } from "@/lib/utils";

export default function EmployerSettingTab() {
  const sub = useSelector((state) => state.AllUserReducer.subData);
  // console.log(sub);
  return (
    <div className="flex flex-col gap-6  ">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        {/* <Button>Save Changes</Button> */}
      </div>

      <Tabs defaultValue="security" className="space-y-4 border-none">
        <TabsList>
          {/* <TabsTrigger value="account" >Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          {/* <TabsTrigger value="team">Team</TabsTrigger> */}
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account information and email address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Smith" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.smith@acmecorp.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" defaultValue="HR Manager" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="pst">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                    <SelectItem value="cst">Central Time (CST)</SelectItem>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="utc">
                      Coordinated Universal Time (UTC)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="dark-mode" />
                <Label htmlFor="dark-mode">Enable dark mode</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-application">New Application</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive an email when a new candidate applies
                    </p>
                  </div>
                  <Switch id="new-application" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="interview-reminder">
                      Interview Reminder
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a reminder before scheduled interviews
                    </p>
                  </div>
                  <Switch id="interview-reminder" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="job-expiry">Job Expiry</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a notification when a job posting is about to
                      expire
                    </p>
                  </div>
                  <Switch id="job-expiry" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  <Switch id="marketing-emails" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-new-application">New Application</Label>
                    <p className="text-sm text-muted-foreground">
                      Show a notification when a new candidate applies
                    </p>
                  </div>
                  <Switch id="app-new-application" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-messages">Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Show a notification for new messages
                    </p>
                  </div>
                  <Switch id="app-messages" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-updates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Show a notification for system updates
                    </p>
                  </div>
                  <Switch id="app-updates" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Current Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      {sub.planType}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      sub.subscriptionStatus === "ACTIVE"
                        ? "bg-secondary"
                        : "bg-gray-400"
                    }`}>
                    {sub.subscriptionStatus === "ACTIVE" ? "Active" : "Expired"}
                  </Badge>
                </div>
                <Separator className="my-4" />
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="text-2xl font-bold">
                      {sub.planType === "PLATINUM"
                        ? "₦90,000/Yearly"
                        : sub.planType === "SILVER"
                        ? "₦25,000/3months"
                        : sub.planType === "GOLD"
                        ? "₦70,000/6months"
                        : sub.planType === "TEST"
                        ? "100/day"
                        : ""}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Due on {formatFullDate(sub?.subscriptionDues)}
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Plan Features:</h4>
                  {sub.planType === "PLATINUM" ? (
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        The Platinum plan caters to users seeking an even longer
                        commitment with added features.
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Access to unlimited vetted and featured tech talents
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        fast job application
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Tech talent profile matching mechanism and NXG hub
                        customer support
                      </li>
                    </ul>
                  ) : sub.planType === "SILVER" ? (
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        The Silver plan is designed for tech agent organizations
                        and employers to have access to all basic features on
                        this personalized job platform and provide a solid
                        foundation for limited posting
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        10 vetted job posting throughout the entire 3 months
                        period.
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        fast job application
                      </li>
                    </ul>
                  ) : sub.planType === "GOLD" ? (
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        The Gold plan offers extended benefits for users looking
                        for more flexibiity and a longer commitment
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        Unlimited vetted job listing, posting and Tech talent
                        search support
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        fast job application
                      </li>
                    </ul>
                  ) : (
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        As a way to welcome new users and allow them to explore
                        our platform, the first month of usage is completely
                        free. During this period, users will have access to all
                        basic features
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              {/* <div className="space-y-2">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 12/2024
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Update Payment Method</Button>
                  <Button variant="outline">View Billing History</Button>
                </div>
              </div> */}
            </CardContent>
            {/* <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel Subscription</Button>
              <Button>Upgrade Plan</Button>
            </CardFooter> */}
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <PasswordCard />
          {/* <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Update Password</Button>
            </CardFooter>
          </Card> */}

          {/* <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require a verification code when signing in
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recovery Codes</h3>
                <p className="text-sm text-muted-foreground">
                  Recovery codes can be used to access your account if you lose
                  your two-factor authentication device.
                </p>
                <Button variant="outline" className="gap-2">
                  <Key className="h-4 w-4" />
                  Generate Recovery Codes
                </Button>
              </div>
            </CardContent>
          </Card> */}

          {/* <Card>
            <CardHeader>
              <CardTitle>Login Sessions</CardTitle>
              <CardDescription>Manage your active sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">
                          San Francisco, CA • Chrome on macOS
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      Active
                    </Badge>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Mobile Session</p>
                        <p className="text-sm text-muted-foreground">
                          San Francisco, CA • iOS App
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Lock className="h-4 w-4" />
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="gap-2">
                <Lock className="h-4 w-4" />
                Revoke All Sessions
              </Button>
            </CardFooter>
          </Card> */}
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button className="gap-2">
                  <User className="h-4 w-4" />
                  Invite Team Member
                </Button>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">John Smith</p>
                        <p className="text-sm text-muted-foreground">
                          HR Manager • Admin
                        </p>
                      </div>
                    </div>
                    <Badge>Admin</Badge>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">
                          Recruiter • Member
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Member
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Admin</DropdownMenuItem>
                        <DropdownMenuItem>Member</DropdownMenuItem>
                        <DropdownMenuItem>Viewer</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Michael Chen</p>
                        <p className="text-sm text-muted-foreground">
                          Hiring Manager • Member
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Member
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Admin</DropdownMenuItem>
                        <DropdownMenuItem>Member</DropdownMenuItem>
                        <DropdownMenuItem>Viewer</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>
                Configure roles and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Admin</h3>
                  <p className="text-sm text-muted-foreground">
                    Full access to all features and settings
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Manage team members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Create and manage job postings
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Access to all applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Billing and subscription management
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Member</h3>
                  <p className="text-sm text-muted-foreground">
                    Access to job postings and applicants
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Create and manage job postings
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Access to all applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Manage team members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm">
                        Billing and subscription management
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Viewer</h3>
                  <p className="text-sm text-muted-foreground">
                    View-only access to job postings and applicants
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">View job postings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">View applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm">
                        Create or edit job postings
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Manage team members</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Customize Roles</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
