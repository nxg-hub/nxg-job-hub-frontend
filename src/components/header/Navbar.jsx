import React from "react";
import { NavLink } from "react-router-dom";
import "../header/header.scss";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const NavLinks = [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "About", href: "/about" },
    { title: "Contact Us", href: "/contact" },
    { title: "Post Job", href: "/post-job-form" },
  ];

  return (
    <div className="hidden md:flex items-center gap-1">
      {NavLinks.map((link) => {
        return (
          <NavLink
            key={link.title}
            to={link.href}
            className={({ isActive }) =>
              cn(
                "px-3 py-2 rounded-md text-white hover:bg-primary transition text-sm font-medium",
                isActive ? "border-b-[3px] border-primary" : ""
              )
            }
          >
            {link.title}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navbar;
