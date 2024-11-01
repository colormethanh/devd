import React from "react";
import { useState } from "react";
import Button from "./Button";
import Image from "next/image";
import SideBarItem from "./SideBarItem";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`flex ${
        isOpen ? "w-60" : "w-20"
      } h-full bg-black text-white transition-all duration-300`}
    >
      <div className="flex flex-col items-center w-full h-full border border-white ">
        <div className="border border-white h-10 w-full text-center flex justify-center">
          {isOpen ? (
            <h3 className={`text-lg ${!isOpen && "hidden"}`}>
              {" "}
              Project Navigation{" "}
            </h3>
          ) : (
            <Image
              src={"/static/agile-Icon.png"}
              alt="app logo"
              height={"30"}
              width={"40"}
            />
          )}
        </div>

        <ul className="w-full">
          <SideBarItem
            src="/static/componentIcon-white.png"
            onHoverSrc={"/static/componentIcon.png"}
            isOpen={isOpen}
          >
            Components
          </SideBarItem>
          <SideBarItem
            src={"/static/pagesIcon-white.png"}
            onHoverSrc={"/static/pagesIcon.png"}
            isOpen={isOpen}
          >
            Pages
          </SideBarItem>
          <SideBarItem
            src={"/static/teamIcon-white.png"}
            onHoverSrc={"/static/teamIcon.png"}
            isOpen={isOpen}
          >
            Team
          </SideBarItem>
        </ul>
      </div>
      <div
        onClick={() => {
          console.log("nav toggle clicked");
          toggleNav();
        }}
        className="hover:cursor-pointer ms-3"
      >
        {isOpen ? "<<<" : ">>>"}
      </div>
    </div>
  );
}
