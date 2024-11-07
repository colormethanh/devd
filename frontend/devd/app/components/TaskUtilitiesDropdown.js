import React from "react";
import Dropdown from "./utilities/Dropdown";
import Image from "next/image";

export default function TaskUtilitiesDropdown() {
  const items = [
    {
      text: "Add relevant content",
      callback: () => {
        console.log("Adding relevant class");
      },
    },
  ];

  return (
    <Dropdown
      toggleText={
        <Image
          src={"/static/ellipseIcon-white.png"}
          alt={"Ellipse icon"}
          height={10}
          width={10}
        />
      }
      items={items}
    />
  );
}
