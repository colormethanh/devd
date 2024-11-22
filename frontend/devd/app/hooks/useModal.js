import React, { useState } from "react";
import ModalTemplate from "../components/utilities/Modal";

export default function useModal(title, body, onCloseCallback = () => {}) {
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsOpen(true);

  // Function to close the modal
  const closeModal = () => {
    onCloseCallback();
    setIsOpen(false);
  };

  const Modal = (
    <ModalTemplate
      openModal={openModal}
      closeModal={closeModal}
      isOpen={isOpen}
      title={title}
      body={body}
    />
  );
  return { Modal, openModal, closeModal };
}
