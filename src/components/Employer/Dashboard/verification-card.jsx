import { NavLink } from "react-router-dom";
import verifiedImageMobile from "@/static/images/verified-mobile.png";

export default function EmployerVerificationCard({
  taxCertificate,
  companyMemorandum,
  cacCertificate,
  verified,
}) {
  return (
    <>
      {!taxCertificate && !companyMemorandum && !cacCertificate ? (
        <div className="">
          <div className="flex bg-red-100 rounded-xl p-3 text-base gap-2 item-center mb-3 mt-2 md:hidden">
            <img
              src={verifiedImageMobile}
              alt="Complete profile illustration"
              className="object-contain w-10 h-10"
            />
            <div className="flex flex-col gap-1">
              <span>Your account is not yet verified, please</span>
              <NavLink
                className="bg-primary text-sky-100 w-fit py-1 px-2 rounded text-sm "
                to={"/employer/verified-document"}
              >
                complete your profile
              </NavLink>
            </div>
          </div>

          <div className="hidden md:flex w-full bg-red-100 p-3 px-10 rounded italic font-medium text-base mb-5">
            <div className="flex items-center gap-8">
              <img
                src={verifiedImageMobile}
                alt="Complete profile illustration"
                className="object-contain w-10 h-10"
              />
              <div className="flex gap-3 items-center">
                <span className="bg-red-700 p-1 rounded text-white">
                  Action required:
                </span>
                <span>
                  Your account is not yet verified, please
                  <NavLink
                    className="underline text-secondary w-fit py-1 px-2 "
                    to={"/employer/verified-document"}
                  >
                    complete your profile
                  </NavLink>
                  to continue using all features
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : taxCertificate && companyMemorandum && cacCertificate && !verified ? (
        <div className="">
          <div className="flex bg-primary/30 rounded-xl p-3 px-4 text-base gap-2 item-center mb-3 mt-2">
            <img
              src={verifiedImageMobile}
              alt="Complete profile illustration"
              className="object-contain w-8 h-8 md:w-10 md:h-10"
            />
            <span className="pt-1 text-yellow-950 text-sm md:text-base">
              We’re verifying your account now. No action needed — this should
              be completed shortly.
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}
