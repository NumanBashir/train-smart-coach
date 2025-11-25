"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const guestLinks = [
    { label: "Login", href: "/login" },
    { label: "Create Account", href: "/register" },
  ];

  const authLinks = [
    { label: "Home", href: "/home" },
    { label: "Sessions", href: "/sessions" },
  ];

  return (
    <div className="navbar shadow-sm z-100">
      {/* This is for mobile view only */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>{" "}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {(isAuthenticated ? authLinks : guestLinks).map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut({ callbackUrl: "/login" });
                  }}
                >
                  Log out
                </a>
              </li>
            )}
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          TrainSmartCoach
        </a>
      </div>

      {/* This is for desktop view only */}
      <div className="navbar-end hidden lg:flex">
        {" "}
        <ul className="menu menu-horizontal px-1">
          {(isAuthenticated ? authLinks : guestLinks).map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          {isAuthenticated && (
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: "/login" });
                }}
              >
                Log out
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
