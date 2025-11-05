import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import axios from "axios";

export default function PasswordCard() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const token =
    JSON.parse(window.localStorage.getItem("NXGJOBHUBLOGINKEYV1")) ||
    JSON.parse(window.sessionStorage.getItem("NXGJOBHUBLOGINKEYV1"));

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordUpdate = async () => {
    // Basic validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${API_HOST_URL}/api/v1/auth/update-password/in-app`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token.authKey,
          },
        }
      );

      setMessage("Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setMessage(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            id="current-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <div>
            {showPassword ? (
              <BsEye
                onClick={handleShowPassword}
                className="absolute top-[45px] right-[35px] cursor-pointer"
              />
            ) : (
              <BsEyeSlash
                onClick={handleShowPassword}
                className="absolute top-[45px] right-[35px] cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div>
            {showPassword ? (
              <BsEye
                onClick={handleShowPassword}
                className="absolute top-[45px] right-[10px] cursor-pointer"
              />
            ) : (
              <BsEyeSlash
                onClick={handleShowPassword}
                className="absolute top-[45px] right-[10px] cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div>
            {showPassword ? (
              <BsEye
                onClick={handleShowPassword}
                className="absolute top-[45px] right-[10px] cursor-pointer"
              />
            ) : (
              <BsEyeSlash
                onClick={handleShowPassword}
                className="absolute top-[45px] right-[10px] cursor-pointer"
              />
            )}
          </div>
        </div>

        {message && (
          <p
            className={`text-sm ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-500"
            }`}>
            {message}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={handlePasswordUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </CardFooter>
    </Card>
  );
}
