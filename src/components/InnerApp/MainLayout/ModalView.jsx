import React from "react";
import { useNavigate } from "react-router";
import { Modal, ModalBody } from "reactstrap";

export default function ModalView(props) {
  const navigate = useNavigate();
  const handleClose = () => {
    props?.handleClose(!props?.isModalVisible);
  };
  const handleRedirect = () => {
    props?.handleClose(!props?.isModalVisible);
    let routePath = (props?.route === 'home') ? (props?.route, { state: { activeTab: "3" } }) : (props?.route)
    navigate(`/${routePath}`)
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
            className="btn al_button_add"
            onClick={() => handleRedirect()}
          >
            Complete Now
          </button>
        </ModalBody>
      </Modal>
    </>
  );
}
