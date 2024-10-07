import React, { useState } from "react";
import LogoNew from "../../assets/logo/logo-flow.png";
import "./navbar.css";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom"; 
import ContactFormModal from "../../components/ContactFormModal";

const Navbar = () => {
  const {  isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  return (
    <header className="max-w-[1300px] mx-auto">
      <nav className="text-[1rem] pt-3 pb-3 sm:px-4 flex justify-between items-center">
        <div className="navbar-cont">
          <div className="pl-4 mt-2">
            <Link to="https://voagents.ai/">
              <img
                src={LogoNew}
                alt="Logo"
                className="w-32 h-10 object-contain sm:w-auto sm:h-auto"
              />
            </Link>
          </div>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="sm:hidden hamburger">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2z"
              />
            </svg>
          </button>
        </div>
        <div
          className={`flex items-right justify-end w-25 mobile_nav ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex gap-4">
            {/* <li>
            <a href="/aboutus">About us</a>
          </li> */}
            {/* <li className={`dropdown_menu ${click ? "show" : "hide"}`}>
              <a className="dropdown_label" onClick={handleClick}>
                Industries
              </a>
              <div className="dropdown_items absolute bg-white p-3 gap-3 top-38 w-200 border rounded-4 flex flex-col">
                <Link to="/real-estate">Real Estate</Link>
                <Link to="/healthcare">Healthcare</Link>
                <Link to="/recruitment">Recruitment</Link>
                <Link to="/restaurants">Restaurants</Link>
              </div>
            </li> */}
            {/* <li>
              <Link to="/#testimonials"></Link>
            </li> */}
            {/* <li>
              <Link to="/#faq">FAQ</Link>
            </li> */}
            <li>
              <ContactFormModal/>
            </li>
          </ul>

          {/* <div className="flex items-center ">
            {!isSignedIn ? (
            <>
              <SignInButton redirectUrl={"/dashboard"}>
                <button className="block py-2 px-4 mt-2 text-md text-grayText loginBtn">
                  Login
                </button>
              </SignInButton>
              <SignUpButton redirectUrl={"/dashboard"}>
                <button className="block py-2 px-4 mt-2 text-md text-grayText loginBtn">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          ) : (
            <>
              <button>
                <Link to="/dashboard">Dashboard</Link>
              </button>
              <div className="hidden sm:block">
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          )}
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
