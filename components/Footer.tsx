import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="50px"
          viewBox="0 -960 960 960"
          width="50px"
          fill="#000"
        >
          <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm200-500 54-18 16-54q-32-48-77-82.5T574-786l-54 38v56l160 112Zm-400 0 160-112v-56l-54-38q-54 17-99 51.5T210-652l16 54 54 18Zm-42 308 46-4 30-54-58-174-56-20-40 30q0 65 18 118.5T238-272Zm242 112q26 0 51-4t49-12l28-60-26-44H378l-26 44 28 60q24 8 49 12t51 4Zm-90-200h180l56-160-146-102-144 102 54 160Zm332 88q42-50 60-103.5T800-494l-40-28-56 18-58 174 30 54 46 4Z" />
        </svg>
        <p>TrainSmartCoach</p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover" href="#">
          Branding
        </a>
        <a className="link link-hover" href="#">
          Design
        </a>
        <a className="link link-hover" href="#">
          Marketing
        </a>
        <a className="link link-hover" href="#">
          Advertisement
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover" href="#">
          About us
        </a>
        <a className="link link-hover" href="#">
          Contact
        </a>
        <a className="link link-hover" href="#">
          Jobs
        </a>
        <a className="link link-hover" href="#">
          Press kit
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover" href="#">
          Terms of use
        </a>
        <a className="link link-hover" href="#">
          Privacy policy
        </a>
        <a className="link link-hover" href="#">
          Cookie policy
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
