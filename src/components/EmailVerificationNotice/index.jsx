import React from "react";
import Mail from "../../static/icons/mail.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const EmailVerificationNotice = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleCancelClick = () => {
    navigate("/login");
  };
  const handleResendEmail = () => {};

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="flex flex-col items-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center" asChild>
            <div>
              <h1 className="text-2xl">Email Verification</h1>
              <p className="text-sm font-normal">Let's verify your account</p>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription
            asChild
            className="flex flex-col items-center py-6 space-y-8"
          >
            <div>
              <img className="w-32" src={Mail} alt="Mail-icon" />
              <p className="text-center text-sm px-5">
                An activation link has been sent to your email. This link will
                expire after 24 hours Click on the link to activate your
                account.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel onClick={handleCancelClick} className="sm:w-1/2">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="sm:w-1/2 bg-sky-600 border-0 hover:bg-sky-700">
            Resend e-mail
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmailVerificationNotice;
