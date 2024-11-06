import React from "react";
import { useState } from "react";
import Image from "next/image";
import SideBarItem from "./SideBarItem";

export default function SideBar({ onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`flex h-full bg-black text-white`}>
      <div
        className={`${
          isOpen ? "w-60" : "w-20"
        } flex flex-col items-center h-full border border-white transition-all duration-200 `}
      >
        <div className="border border-white h-10 w-full text-center flex justify-center">
          <Image
            src={"/static/agile-Icon.png"}
            alt="app logo"
            height={30}
            width={40}
          />
        </div>

        <ul className="w-full">
          <SideBarItem
            src={"/static/taskIcon-white.png"}
            onHoverSrc={"/static/taskIcon.png"}
            onClickCallback={() => {
              onItemClick("tasks");
            }}
            isOpen={isOpen}
          >
            Tasks
          </SideBarItem>
          <SideBarItem
            src={"/static/pagesIcon-white.png"}
            onHoverSrc={"/static/pagesIcon.png"}
            onClickCallback={() => {
              onItemClick("pages");
            }}
            isOpen={isOpen}
          >
            Pages
          </SideBarItem>
          <SideBarItem
            src="/static/componentIcon-white.png"
            onHoverSrc={"/static/componentIcon.png"}
            onClickCallback={() => {
              onItemClick("components");
            }}
            isOpen={isOpen}
          >
            Components
          </SideBarItem>
          <SideBarItem
            src={"/static/teamIcon-white.png"}
            onHoverSrc={"/static/teamIcon.png"}
            onClickCallback={() => {
              onItemClick("team");
            }}
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
        className="hover:cursor-pointer ms-3 w-12"
      >
        <Image
          className="transition-all duration-300"
          src={"/static/sidebar-toggle.png"}
          height={30}
          width={30}
          alt={"sidebar toggle"}
          style={{ transform: `rotate(${isOpen ? "0" : "180"}deg)` }}
        />
      </div>
    </div>
  );
}
