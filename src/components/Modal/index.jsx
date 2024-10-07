import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./index.css";

const ModalComponent = ({ ModalHeading, ModalBody, handleClose, show, customClass }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} className={customClass}>
        <Modal.Header closeButton>
          <Modal.Title className="text-4xl leading-11 font-bold text-[#230c4c]">
            {ModalHeading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{ModalBody}</Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComponent;
