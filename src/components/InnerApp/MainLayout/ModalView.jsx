import React from "react";
import { useNavigate } from "react-router";
import { Modal, ModalBody } from "reactstrap";

export default function ModalView(props) {
  const navigate = useNavigate();
  const handleClose = () => {
    props?.handleClose(!props?.isModalVisible);
    navigate("/home")
  };
  const handleRedirect = () => {
    let { link, route } = props?.path;
    if (route === "home") {
      navigate(`/${route}`, { state: { activeTab: "3" }, replace: true })
      props?.handleClose(!props?.isModalVisible);
    } else if (route === "historychat" && link === "transcriptsummary") {
      props?.modelVisibleProp({ isModalVisible: true, path: route })
    } else {
      navigate(`/${route}`, { replace: true })
      props?.handleClose(!props?.isModalVisible);
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
