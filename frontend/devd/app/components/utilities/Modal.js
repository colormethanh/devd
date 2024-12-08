import React from "react";

export default function Modal({ isOpen, closeModal, body, title }) {
  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 w-full h-full">
          <div className="bg-black p-3 rounded-md">
            <div className="flex justify-between border-b py-1">
              <span className="text-lg"> {title}</span>
              <button
                className="w-6 h-6 border border-red-500 hover:bg-red-500"
                onClick={closeModal}
              >
                {"X"}
              </button>
            </div>
            {body}
          </div>
        </div>
      )}
    </div>
  );
}
