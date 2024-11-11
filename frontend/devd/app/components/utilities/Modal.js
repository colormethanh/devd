import React from "react";
import Button from "./Button";

export default function Modal({ isOpen, openModal, closeModal, body }) {
  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-6 min-w-96 max-w-5/6 max-h-4/5">
            <div className="flex justify-end">
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
