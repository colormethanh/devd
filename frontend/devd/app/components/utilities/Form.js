import React from "react";
import Button from "./Button";

export default function Form({ onSubmit, title, children }) {
  return (
    <div className="min-h-80 w-full flex justify-center text-white ">
      <form className="bg-black p-4 w-full space-y-6" onSubmit={onSubmit}>
        <h1 className="text-2xl text-white font-bold">{title}</h1>
        {children}
        <div className="w-full flex justify-end">
          <Button type="submit" clickCallback={onSubmit} addStyle=" py-0">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
