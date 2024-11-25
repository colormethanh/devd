import React from "react";
import { useState } from "react";
import Image from "next/image";
import SideBarItem from "./SideBarItem";

export default function SideBar({ onItemClick, isViewing, routeToShowcase }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`flex h-full bg-black text-white`}>
      <div
        className={`${
          isOpen ? "w-60" : "w-14"
        } flex flex-col items-center h-full border-r transition-all duration-200 `}
      >
        <div className="border-b border-white h-10 w-full text-center flex justify-center">
          <Image
            src={"/static/agile-Icon.png"}
            alt="app logo"
            height={30}
            width={40}
          />
        </div>

        <ul className="w-full">
          <SideBarItem
            src={"/static/projectIcon-white.png"}
            onHoverSrc={"/static/projectIcon.png"}
            onClickCallback={() => {
              onItemClick("project");
            }}
            isOpen={isOpen}
            isSelected={isViewing === "project"}
          >
            Project
          </SideBarItem>
          <SideBarItem
            src={"/static/taskIcon-white.png"}
            onHoverSrc={"/static/taskIcon.png"}
            onClickCallback={() => {
              onItemClick("tasks");
            }}
            isOpen={isOpen}
            isSelected={isViewing === "tasks"}
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
            isSelected={isViewing === "pages"}
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
            isSelected={isViewing === "components"}
          >
            Components
          </SideBarItem>
          <SideBarItem
            src="/static/showcaseIcon-white.png"
            onHoverSrc={"/static/showcaseIcon.png"}
            onClickCallback={routeToShowcase}
            isOpen={isOpen}
            isSelected={isViewing === "showcase"}
          >
            Showcase
          </SideBarItem>
        </ul>
      </div>
      <div
        onClick={() => {
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
