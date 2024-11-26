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
    <div className="min-h-20 w-full flex justify-center text-white ">
      <form
        className="bg-black p-4 w-full space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <h1 className="text-2xl text-white font-bold">{title}</h1>
        {<p className="text-red-500"> {error} </p>}
        {children}
        <div className="w-full flex justify-end">
          <button
            className={`bg-[#000000] 
                text-white border 
                border-white 
                hover:bg-white 
                hover:text-black 
                focus:outline-black 
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
