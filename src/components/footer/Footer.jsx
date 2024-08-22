import React, { useState } from "react";
import "./footer.scss";
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
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrors({ email: "Valid email is required" });
    } else {
      // console.log(`Form from ${email} submitted successfully.`);
      setIsOpen(true);
    }
  };

  return (
    <div>
      <div className="footer-main-container">
        <div className="footer-contents">
          <div className="footer-nav-section">
            <div className="company">
              <h6>Company</h6>
              <div className="foot-links">
                {CompanyFooterLinks.map((companylink) => {
                  return (
                    <NavLink key={companylink.title} to={companylink.href}>
                      {companylink.title}
                    </NavLink>
                  );
                })}
              </div>
            </div>
            <div className="get-help">
              <h6>Get Help</h6>
              <div className="foot-links">
                {HelpFooterLinks.map((helplink) => {
                  return (
                    <NavLink key={helplink.title} to={helplink.href}>
                      {helplink.title}
                    </NavLink>
                  );
                })}
              </div>
            </div>
            <div className="quick-links">
              <h6>Quick Links</h6>
              <div className="foot-links">
                {QuickFooterLinks.map((quicklink) => {
                  return (
                    <NavLink key={quicklink.title} to={quicklink.href}>
                      {quicklink.title}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="news-letter">
            <div className="news-content">
              <h5>Subscribe To Our Newsletter</h5>
              <p>
                Subscribe to get job notifications and other useful updates in
                your inbox.
              </p>
            </div>
            {/*<form*/}
            {/*  className="form-body"*/}
            {/*  name="newsletter"*/}
            {/*  method="POST"*/}
            {/*  onSubmit={handleSubmit}>*/}
            {/*   <input type="hidden" name='form-name' value='newsletter' />*/}
            {/*  <div className="input-container" style={{ width: "100%" }}>*/}
            {/*    {errors.email && (*/}
            {/*      <p*/}
            {/*        style={{*/}
            {/*          color: "red",*/}
            {/*          marginTop: "-.95rem",*/}
            {/*          fontSize: ".8rem",*/}
            {/*        }}>*/}
            {/*        {errors.email}*/}
            {/*      </p>*/}
            {/*    )}*/}
            {/*    <input*/}
            {/*      type="email"*/}
            {/*      name="email"*/}
            {/*      autoComplete="off"*/}
            {/*      id="email"*/}
            {/*      placeholder="Email address"*/}
            {/*      value={email}*/}
            {/*      onChange={(e) => {*/}
            {/*        setEmail(e.target.value);*/}
            {/*        setErrors({ email: "" });*/}
            {/*      }}*/}
            {/*      className={*/}
            {/*        errors.email === "setErrors" ? "error-input" : "sub-input"*/}
            {/*      }*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  <input type="submit" value="Submit" />*/}
            {/*</form>*/}
            <form
                className="form-body"
                name="newsletter"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="newsletter"/>
              <div className="input-container" style={{width: "100%"}}>
                {errors.email && (
                    <p
                        style={{
                          color: "red",
                          marginTop: "-.95rem",
                          fontSize: ".8rem",
                        }}
                    >
                      {errors.email}
                    </p>
                )}
                <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    id="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({email: ""});
                    }}
                    className={
                      errors.email === "setErrors" ? "error-input" : "sub-input"
                    }
                />
              </div>
              <input type="submit" value="Submit"/>
            </form>

            {isOpen
                && (
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    style={{
                      position: "fixed",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "100%",
                      maxWidth: "40rem",
                      height: "25rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#ffffff",
                      border: "0.06rem solid #d9d9d9",
                      borderRadius: "30px",
                      zIndex: "100",
                    }}>
                  <Dialog.Panel>
                    <Dialog.Title
                        style={{
                          fontFamily: "Manrope",
                          marginBottom: "2rem",
                          color: "#000000",
                          textAlign: "center",
                        }}>
                      <div>
                        <h2
                            style={{
                              fontSize: "2rem",
                              fontWeight: "700",
                              lineHeight: "2.5rem",
                              color: "#2596BE",
                              marginBottom: "1.5rem",
                            }}>
                          Thank You !
                        </h2>
                        <p
                            style={{
                              fontSize: "1rem",
                              fontWeight: "400",
                              lineHeight: "22px",
                            }}>
                          `Thank you for subscribing to the newsletter.
                          <br/>
                          You should receive a confirmation email soon.`
                        </p>
                      </div>
                      <div style={{marginTop: "3rem"}}>
                        <Link
                            style={{
                              background: "#2596BE",
                              padding: "10px",
                              display: "block",
                              color: "#ffffff",
                              borderRadius: "0.6rem",
                              textAlign: "center",
                              fontSize: "1rem",
                              fontWeight: "400",
                            }}
                            to={"/login"}>
                          Login to your account
                        </Link>
                      </div>
                    </Dialog.Title>
                  </Dialog.Panel>
                </Dialog>
            )}
          </div>
          <div className="footer-social-acct">
            <h6>Follow us</h6>
            <div className="media-handles">
              <div className="facebk">
                <Link
                    to={
                      "https://www.facebook.com/nxgjobhub"
                    }
                    target="_blank">
                  <BiLogoFacebook
                      style={{
                        width: "1.1rem",
                        height: "1.1rem",
                        color: "#2596be",
                        marginTop: ".3rem",
                      }}
                  />
                </Link>
              </div>
              <div className="google">
                <Link to={"#"}>
                  <BiLogoGoogle
                      style={{
                        width: "1.1rem",
                        height: "1.1rem",
                      color: "#2596be",
                      marginTop: ".3rem",
                    }}
                  />
                </Link>
              </div>
              <div className="linkedin">
                <Link
                  to={"https://www.linkedin.com/showcase/nxg-job-hub"}
                  target="_blank">
                  <BiLogoLinkedin
                    style={{
                      width: "1.1rem",
                      height: "1.1rem",
                      color: "#2596be",
                      marginTop: ".2rem",
                    }}
                  />
                </Link>
              </div>
              <div className="twit">
                <Link to={"#"}>
                  <RiTwitterXFill
                    style={{
                      width: "1.1rem",
                      height: "1.1rem",
                      color: "#2596be",
                      marginTop: ".3rem",
                    }}
                  />
                </Link>
              </div>
              <div className="insta">
                <Link to={"#"}>
                  <SiInstapaper
                    style={{
                      width: "1.1rem",
                      height: "1.1rem",
                      color: "#2596be",
                      marginTop: ".3rem",
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
