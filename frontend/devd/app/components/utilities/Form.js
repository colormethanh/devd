import React from "react";

export default function Form({
  onSubmit,
  title,
  submitButtonStyle = "",
  submitText = "Submit",
  children,
  error,
}) {
  return (
    <div className="min-h-20 h-full  w-full flex justify-center text-white ">
      <form
        className="bg-black p-4 w-full h-full space-y-6 flex flex-col justify-between"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {title !== undefined && (
          <h1 className="text-2xl text-white font-bold">{title}</h1>
        )}
        {error && <p className="text-red-500"> Oh No! {error}. Try again. </p>}
        {children}
        <div className="w-full flex justify-end">
          <button
            className={`bg-[#000000] 
                text-white border 
                border-green-500 
                hover:bg-green-500
                hover:border-green-800
                hover:text-white
                focus:outline-green-500 
                w-48 
                p-3 py-0 ${submitButtonStyle}`}
            type="submit"
          >
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
}
