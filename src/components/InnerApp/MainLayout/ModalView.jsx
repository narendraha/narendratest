import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Modal, ModalBody } from "reactstrap";

export default function ModalView(props) {
  const navigate = useNavigate();
  const handleClose = () => {
    props?.handleClose(!props?.isModalVisible);
  };
  const handleRedirect = (item = true) => {
    props?.handleClose(!props?.isModalVisible);
    if (item) {
      navigate("/profile");
    } else {
      navigate("/home", { state: { activeTab: "3" } });
    }
  };

  return (
    <>
      <Modal
        isOpen={props?.isModalVisible ? true : false}
        className="al_confirm_modal"
        wrapClassName="al_outerparentwp"
      >
        <ModalBody className="text-center">
          <h6>{props?.msg}</h6>
          <button
            type="submit"
            className="btn al_button_cancel mx-2"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn al_savebtn"
            onClick={() => handleRedirect()}
          >
            Complete Now
          </button>
        </ModalBody>
      </Modal>
    </>
  );
}
