// import React, { useState } from "react";
// import "./footer.scss";
// import { Dialog } from "@headlessui/react";
// import { NavLink, Link } from "react-router-dom";
// import { BiLogoFacebook, BiLogoGoogle, BiLogoLinkedin } from "react-icons/bi";
// import { RiTwitterXFill } from "react-icons/ri";
// import { SiInstapaper } from "react-icons/si";

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [errors, setErrors] = useState({ email: "" });

//   const CompanyFooterLinks = [
//     { title: "About us", href: "/about" },
//     { title: "Our services", href: "/services" },
//     { title: "Privacy policy", href: "/privacy" },
//     { title: "Terms and conditions", href: "/terms" },
//     { title: "Our alliances", href: "#" },
//   ];
//   const HelpFooterLinks = [
//     { title: "FAQs", href: "/faqs" },
//     { title: "Send us a message", href: "/contact" },
//   ];
//   const QuickFooterLinks = [
//     { title: "Get started", href: "/register" },
//     { title: "Post a job", href: "/login" },
//     { title: "Find a job", href: "/login" },
//   ];

//   const handleSubmit = (e) => {
//     if (!email) {
//       e.preventDefault(); // Prevent form submission if email is missing
//       setErrors({ email: "Valid email is required" });
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
//       e.preventDefault(); // Prevent form submission if email format is invalid
//       setErrors({ email: "Valid email is required" });
//     } else {
//       // Remove e.preventDefault() to allow form submission to Netlify
//       setIsOpen(true); // Show the dialog or perform any other action
//     }
//   };

//   return (
//     <div>
//       <div className="footer-main-container">
//         <div className="footer-contents">
//           <div className="footer-nav-section">
//             <div className="company">
//               <h6>Company</h6>
//               <div className="foot-links">
//                 {CompanyFooterLinks.map((companylink) => {
//                   return (
//                     <NavLink key={companylink.title} to={companylink.href}>
//                       {companylink.title}
//                     </NavLink>
//                   );
//                 })}
//               </div>
//             </div>
//             <div className="get-help">
//               <h6>Get Help</h6>
//               <div className="foot-links">
//                 {HelpFooterLinks.map((helplink) => {
//                   return (
//                     <NavLink key={helplink.title} to={helplink.href}>
//                       {helplink.title}
//                     </NavLink>
//                   );
//                 })}
//               </div>
//             </div>
//             <div className="quick-links">
//               <h6>Quick Links</h6>
//               <div className="foot-links">
//                 {QuickFooterLinks.map((quicklink) => {
//                   return (
//                     <NavLink key={quicklink.title} to={quicklink.href}>
//                       {quicklink.title}
//                     </NavLink>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//           <div className="news-letter">
//             <div className="news-content">
//               <h5>Subscribe To Our Newsletter</h5>
//               <p>
//                 Subscribe to get job notifications and other useful updates in
//                 your inbox.
//               </p>
//             </div>

//             <form
//               className="form-body"
//               name="newsletter"
//               method="POST"
//               data-netlify="true"
//               onSubmit={handleSubmit}>
//               <input type="hidden" name="form-name" value="newsletter" />
//               <div className="input-container" style={{ width: "100%" }}>
//                 {errors.email && (
//                   <p
//                     style={{
//                       color: "red",
//                       marginTop: "-.95rem",
//                       fontSize: ".8rem",
//                     }}>
//                     {errors.email}
//                   </p>
//                 )}
//                 <input
//                   type="email"
//                   name="email"
//                   autoComplete="off"
//                   id="email"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     setErrors({ email: "" });
//                   }}
//                   className={
//                     errors.email === "setErrors" ? "error-input" : "sub-input"
//                   }
//                 />
//               </div>
//               <input type="submit" value="Submit" />
//             </form>

//             {isOpen && (
//               <Dialog
//                 open={isOpen}
//                 onClose={() => setIsOpen(false)}
//                 style={{
//                   position: "fixed",
//                   left: "50%",
//                   top: "50%",
//                   transform: "translate(-50%, -50%)",
//                   width: "100%",
//                   maxWidth: "40rem",
//                   height: "25rem",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   background: "#ffffff",
//                   border: "0.06rem solid #d9d9d9",
//                   borderRadius: "30px",
//                   zIndex: "100",
//                 }}>
//                 <Dialog.Panel>
//                   <Dialog.Title
//                     style={{
//                       fontFamily: "Manrope",
//                       marginBottom: "2rem",
//                       color: "#000000",
//                       textAlign: "center",
//                     }}>
//                     <div>
//                       <h2
//                         style={{
//                           fontSize: "2rem",
//                           fontWeight: "700",
//                           lineHeight: "2.5rem",
//                           color: "#2596BE",
//                           marginBottom: "1.5rem",
//                         }}>
//                         Thank You !
//                       </h2>
//                       <p
//                         style={{
//                           fontSize: "1rem",
//                           fontWeight: "400",
//                           lineHeight: "22px",
//                         }}>
//                         `Thank you for subscribing to the newsletter.
//                         <br />
//                         You should receive a confirmation email soon.`
//                       </p>
//                     </div>
//                     <div style={{ marginTop: "3rem" }}>
//                       <Link
//                         style={{
//                           background: "#2596BE",
//                           padding: "10px",
//                           display: "block",
//                           color: "#ffffff",
//                           borderRadius: "0.6rem",
//                           textAlign: "center",
//                           fontSize: "1rem",
//                           fontWeight: "400",
//                         }}
//                         to={"/login"}>
//                         Login to your account
//                       </Link>
//                     </div>
//                   </Dialog.Title>
//                 </Dialog.Panel>
//               </Dialog>
//             )}
//           </div>
//           <div className="footer-social-acct">
//             <h6>Follow us</h6>
//             <div className="media-handles">
//               <div className="facebk">
//                 <Link to={"https://www.facebook.com/nxgjobhub"} target="_blank">
//                   <BiLogoFacebook
//                     style={{
//                       width: "1.1rem",
//                       height: "1.1rem",
//                       color: "#2596be",
//                       marginTop: ".3rem",
//                     }}
//                   />
//                 </Link>
//               </div>
//               <div className="google">
//                 <Link to={"#"}>
//                   <BiLogoGoogle
//                     style={{
//                       width: "1.1rem",
//                       height: "1.1rem",
//                       color: "#2596be",
//                       marginTop: ".3rem",
//                     }}
//                   />
//                 </Link>
//               </div>
//               <div className="linkedin">
//                 <Link
//                   to={"https://www.linkedin.com/showcase/nxg-job-hub"}
//                   target="_blank">
//                   <BiLogoLinkedin
//                     style={{
//                       width: "1.1rem",
//                       height: "1.1rem",
//                       color: "#2596be",
//                       marginTop: ".2rem",
//                     }}
//                   />
//                 </Link>
//               </div>
//               <div className="twit">
//                 <Link to={"#"}>
//                   <RiTwitterXFill
//                     style={{
//                       width: "1.1rem",
//                       height: "1.1rem",
//                       color: "#2596be",
//                       marginTop: ".3rem",
//                     }}
//                   />
//                 </Link>
//               </div>
//               <div className="insta">
//                 <Link to={"#"}>
//                   <SiInstapaper
//                     style={{
//                       width: "1.1rem",
//                       height: "1.1rem",
//                       color: "#2596be",
//                       marginTop: ".3rem",
//                     }}
//                   />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { NavLink, Link } from "react-router-dom";
import { BiLogoFacebook, BiLogoGoogle, BiLogoLinkedin } from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";
import { SiInstapaper } from "react-icons/si";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({ email: "" });

  const CompanyFooterLinks = [
    { title: "About us", href: "/about" },
    { title: "Our services", href: "/services" },
    { title: "Privacy policy", href: "/privacy" },
    { title: "Terms and conditions", href: "/terms" },
    { title: "Our alliances", href: "#" },
  ];
  const HelpFooterLinks = [
    { title: "FAQs", href: "/faqs" },
    { title: "Send us a message", href: "/contact" },
  ];
  const QuickFooterLinks = [
    { title: "Get started", href: "/register" },
    { title: "Post a job", href: "/login" },
    { title: "Find a job", href: "/findjob" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: "Valid email is required" });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setErrors({ email: "Valid email is required" });
    } else {
      setErrors({ email: "" });
      setIsOpen(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#006a90] text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Links */}
        <div>
          <h5 className="font-semibold text-lg mb-4">Company</h5>
          <ul className="space-y-2">
            {CompanyFooterLinks.map((link) => (
              <li key={link.title}>
                <NavLink
                  to={link.href}
                  className="hover:text-sky-500 transition-colors duration-200">
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Links */}
        <div>
          <h5 className="font-semibold text-lg mb-4">Get Help</h5>
          <ul className="space-y-2">
            {HelpFooterLinks.map((link) => (
              <li key={link.title}>
                <NavLink
                  to={link.href}
                  className="hover:text-sky-500 transition-colors duration-200">
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-semibold text-lg mb-4">Quick Links</h5>
          <ul className="space-y-2">
            {QuickFooterLinks.map((link) => (
              <li key={link.title}>
                <NavLink
                  to={link.href}
                  className="hover:text-sky-500 transition-colors duration-200">
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="font-semibold text-lg mb-4">
            Subscribe to our Newsletter
          </h5>
          <p className="text-sm mb-4">
            Get job notifications and useful updates directly in your inbox.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={handleSubmit}>
            <div className="flex-1">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ email: "" });
                }}
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black ${
                  errors.email ? "border border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#2B749A] border-none text-white hover:bg-sky-600 px-4 py-2 rounded-lg transition-colors duration-200">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} NXG Job Hub. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/nxgjobhub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition-colors duration-200">
            <BiLogoFacebook size={24} />
          </a>
          <a
            href="#"
            className="hover:text-sky-500 transition-colors duration-200">
            <BiLogoGoogle size={24} />
          </a>
          <a
            href="https://www.linkedin.com/showcase/nxg-job-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500 transition-colors duration-200">
            <BiLogoLinkedin size={24} />
          </a>
          <a
            href="#"
            className="hover:text-sky-500 transition-colors duration-200">
            <RiTwitterXFill size={24} />
          </a>
          <a
            href="#"
            className="hover:text-sky-500 transition-colors duration-200">
            <SiInstapaper size={24} />
          </a>
        </div>
      </div>

      {/* Subscription Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <Dialog.Panel className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <Dialog.Title className="text-2xl font-bold text-sky-500 mb-4">
            Thank You!
          </Dialog.Title>
          <p className="text-gray-700 mb-6">
            Thank you for subscribing to the newsletter. You should receive a
            confirmation email soon.
          </p>
          <Link
            to="/login"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-colors duration-200">
            Login to your account
          </Link>
        </Dialog.Panel>
      </Dialog>
    </footer>
  );
};

export default Footer;
