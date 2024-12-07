"use client";
import React, { useState, useRef } from "react";
import Form from "./utilities/Form";
import { useRouter } from "next/navigation";

export default function ImageForm({ handleSubmit }) {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setImageName(e.target.value);
  };

  return (
    <div className="overflow-auto">
      <Form
        onSubmit={() => {
          handleSubmit(imageName, image);
          setImageName("");
          setImage(null);
          fileInputRef.current.value = "";
        }}
        submitText="Upload Image"
      >
        <input
          ref={fileInputRef}
          type="file"
          id="image"
          name="task-image"
          accept="image/png, image/jpeg"
          className="text-sm"
          required
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Image Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={imageName}
            onChange={handleInputChange}
            required
            className="indent-2 mt-1 w-full py-1 text-xs border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
      </Form>
    </div>
  );
}
