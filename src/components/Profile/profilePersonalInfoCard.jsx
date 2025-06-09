import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default function ProfilePersonInfoCard({ profileData }) {
  const { firstName, lastName, email, phoneNumber, dateOfBirth, userType } =
    profileData;

  return (
    <div className="p-8 bg-white shadow rounded-md">
      <div className="flex flex-col gap-10 mb-10">
        <p className="font-medium text-sky-600">Personal Information</p>
        <Separator />
        <div className="grid grid-cols-3 gap-8">
          <div>
            <Label htmlFor="fname">First name</Label>
            <Input type="text" value={firstName} />
          </div>
          <div>
            <Label htmlFor="lname">Last name</Label>
            <Input type="text" value={lastName} />
          </div>
          <div>
            {userType === "TalentUser" ? (
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input type="text" value={dateOfBirth} />
              </div>
            ) : (
              <div>
                <Label htmlFor="role">Role</Label>
                <Input type="text" value={userType} />
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex gap-8">
          <div className="w-1/2">
            <Label htmlFor="email">Email</Label>
            <Input type="text" value={email} />
          </div>
          <div className="w-1/2">
            <Label htmlFor="number">Phone number</Label>
            <Input type="text" value={phoneNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}
