import React from "react";
import Mail from "../../static/icons/mail.png";
import { Link } from "react-router-dom";
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

const EmailVerificationNotice = ({ isOpen, onClose }) => {
  const handleResendEmail = () => {};

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onClose}>
      <AlertDialogContent className="flex flex-col items-center">
        <AlertDialogHeader>
          <AlertDialogTitle
            className="flex flex-col items-center"
            asChild>
            <div>
              <h1 className="text-2xl">Email Verification</h1>
              <p className="text-sm font-normal">Let's verify your account</p>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription
            asChild
            className="flex flex-col items-center py-6 space-y-8">
            <div>
              <img
                className="w-32"
                src={Mail}
                alt="Mail-icon"
              />
              <p className="text-center text-sm px-5">
                An activation link has been sent to your email. This link will
                expire after 24 hours Click on the link to activate your
                account.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel className="sm:w-1/2">Cancel</AlertDialogCancel>
          <AlertDialogAction className="sm:w-1/2 bg-sky-600 border-0 hover:bg-sky-700">
            Resend e-mail
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    // <div
    //   onClick={onClick}
    //   title={"close"}
    //   style={{
    //     background: "#00000065",
    //     height: "100%",
    //     width: "100%",
    //     position: "fixed",
    //     inset: "0",
    //   }}
    // >
    //   <div
    //     className="verify-main"
    //     style={{
    //       width: "30%",
    //       minWidth: "250px",
    //       padding: "1rem",
    //       border: "none",
    //       borderRadius: "0.8rem",
    //       boxShadow: ".2rem 0.2rem 0.2rem #8e8e8e",
    //       background: "#fff",
    //     }}
    //   >
    //     <div>
    //       <h2
    //         style={{
    //           fontFamily: "Inter",
    //           fontSize: "1.3rem",
    //           fontWeight: "600",
    //           lineHeight: "2.5rem",
    //         }}
    //       >
    //         Email Verification
    //       </h2>
    //       <p
    //         style={{
    //           fontFamily: "Inter",
    //           fontSize: ".8rem",
    //           fontWeight: "500",
    //         }}
    //       >
    //         Let's verify your account
    //       </p>
    //     </div>
    //     <div style={{ width: "5rem", height: "3rem", margin: "2rem auto" }}>
    //       <img
    //         className="mail-img"
    //         src={Mail}
    //         alt="Mail-icon"
    //         style={{
    //           width: "100%",
    //           height: "100%",
    //           objectFit: "contain",
    //           margin: "auto",
    //         }}
    //       />
    //     </div>
    //     <div style={{ textAlign: "center" }}>
    //       <pre
    //         style={{
    //           fontSize: ".7rem",
    //           marginBottom: ".4rem",
    //           lineHeight: "1rem",
    //           fontWeight: "500",
    //         }}
    //       >
    //         An activation link has been sent to your email.
    //       <br />
    //         This link will expire after 24 hours
    //        <br />
    //         Click on the link to activate your account.
    //       </pre>
    //       <Link
    //         onClick={handleResendEmail}
    //         style={{
    //           fontSize: ".7rem",
    //           fontWeight: "400",
    //           color: "#8e8e8e",
    //           textDecoration: "underline",
    //         }}
    //       >
    //         Resend e-mail
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default EmailVerificationNotice;
