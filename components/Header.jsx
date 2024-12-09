"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);

  const pathname = usePathname();

  // Function to determine if a link is active
  const isActive = (path) => pathname === path;

  const adoptButtonClass = (route) => {
    if (isActive(route)) {
      return "bg-[rgb(184,209,209)]";
    }
    return "";
  };

  return (
    <div className="bg-[rgb(239,204,210)] h-[60px] flex top-0 justify-between items-center z-[9999] fixed w-full">
      <button className="w-[200px] ml-[20px] min-w-[200px]">
        <a href="/">
          <img
            className="w-[65px] flex-shrink-0"
            src="/images/icon.png"
            alt="Icon"
          />
        </a>
      </button>
      <div className="hidden flex-grow max-w-[400px] md:flex items-center mx-5">
        <input
          className="flex-1 pl-3 text-lg rounded-l-lg border-none placeholder-gray-500 h-[30px]"
          type="text"
          placeholder="Search"
        />
        <button className="bg-[rgb(184,209,209)] px-3 rounded-r-lg flex items-center justify-center h-[30px] w-[55px]">
          <img
            className="h-full w-full pt-[2px]"
            src="/images/search-icon.png"
            alt="Search Icon"
          />
        </button>
      </div>
      <div className="hidden lg:flex items-center space-x-3 mr-5">
        <a href="/adoption">
          <button className="btn btn-outline border-[3px] bg-[rgb(235,232,233)] border-[rgb(184,209,209)] text-black rounded-full h-[35px] px-4">
            Adopt
          </button>
        </a>
        <a href="/donations">
          <button className="btn btn-outline border-[3px] bg-[rgb(235,232,233)] border-[rgb(184,209,209)] text-black rounded-full h-[35px] px-4">
            Donate
          </button>
        </a>
        <a href="/perfect-match">
          <button className="btn btn-outline border-[3px] bg-[rgb(235,232,233)] border-[rgb(184,209,209)] text-black rounded-full h-[35px] px-4">
            Perfect Match
          </button>
        </a>
        <a href="/shelters">
          <button className="btn btn-outline border-[3px] bg-[rgb(235,232,233)] border-[rgb(184,209,209)] text-black rounded-full h-[35px] px-4">
            Shelters
          </button>
        </a>
        <a href="/ui">
          <button className="btn btn-outline border-[3px] bg-[rgb(235,232,233)] border-[rgb(184,209,209)] text-black rounded-full h-[35px] px-4">
            Log In
          </button>
        </a>
        <a href="/register">
          <button className="btn btn-outline border-[3px] bg-[rgb(235,232,233)] border-[rgb(184,209,209)] text-black rounded-full h-[35px] px-4">
            Register
          </button>
        </a>
      </div>
      <div className=" flex items-center">
        <div className="w-[200px] ml-20px">
          <button>
            <img
              className="w-[65px]"
              src="/images/hamburger-menu.png"
              alt="hamburger-icon"
              onClick={() => setIsClicked(!isClicked)}
            />
          </button>
        </div>
        {isClicked && (
          <div className="absolute top-[65px] right-0 w-[300px] bg-[rgb(246,217,221)] rounded-lg">
            <div className="flex flex-col space-y-2 p-4">
              <a
                href="/"
                className={`text-black hover:bg-gray-200 p-2 ${adoptButtonClass(
                  "/"
                )}`}
              >
                Home
              </a>
              <a
                href="/adoption"
                className={`text-black hover:bg-gray-200 p-2 ${adoptButtonClass(
                  "/adoption"
                )}`}
              >
                Adopt
              </a>
              <a
                href="/donations"
                className={`text-black hover:bg-gray-200 p-2 ${adoptButtonClass(
                  "/donations"
                )}`}
              >
                Donate
              </a>
              <a
                href="/perfect-match"
                className={`text-black hover:bg-gray-200 p-2 ${adoptButtonClass(
                  "/perfect-match"
                )}`}
              >
                Perfect Match
              </a>
              <a
                href="/shelters"
                className={`text-black hover:bg-gray-200 p-2 ${adoptButtonClass(
                  "/shelters"
                )}`}
              >
                Shelters
              </a>
              <a
                href="/ui"
                className={`text-black hover:bg-gray-200 p-2 ${adoptButtonClass(
                  "/ui"
                )}`}
              >
                Log In
              </a>
              <a
                href="/register"
                className={`text-black hover:bg-gray-200 p-2 ${adoptButtonClass(
                  "/register"
                )}`}
              >
                Register
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
