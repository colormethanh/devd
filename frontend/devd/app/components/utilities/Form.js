import React from "react";

export default function Form({ onSubmit, title, children }) {
  return (
    <div className="min-h-80 w-full flex justify-center m-3">
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
        onSubmit={onSubmit}
      >
        <h1 className="text-2xl text-black font-bold text-center ">{title}</h1>
        {children}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
