import React from "react";

export default function Modal({ isOpen, closeModal, body, title }) {
  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-3 min-w-96 max-w-7xl min-h-96">
            <div className="flex justify-end">
              <button
                className="w-6 h-6 border border-red-500 hover:bg-red-500"
                onClick={closeModal}
              >
                {"X"}
              </button>
            </div>
            <h1 className="text-xl"> {title}</h1>
            {body}
          </div>
        </div>
      )}
    </div>
  );
}
