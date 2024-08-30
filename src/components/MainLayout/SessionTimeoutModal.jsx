import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Modal, ModalBody } from "reactstrap";
import {
    loginRequest,
    logoutRequest,
    setCountDown,
    setSessionExpiring,
    setSessionTimeStart,
    setTimerColor,
} from '../../store/SessionStore/slice';

const SessionTimeoutModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isSessionExpiring, countDown, timerColor, isSessionTimeStart } = useSelector((state) => state?.sessionStoreSlice);

    const sessionTimeoutInMiliSec = 45 * 60 * 1000;

    useEffect(() => {
        if (isSessionTimeStart) {
            let timerId = setTimeout(() => {
                dispatch(setSessionExpiring(true));
                dispatch(setSessionTimeStart(false));
                dispatch(setCountDown(300)) // 5 mins countdown
                dispatch(setTimerColor("#52B74E"))
            }, sessionTimeoutInMiliSec);
            return () => clearTimeout(timerId);
        }
    }, [isSessionTimeStart]);

    useEffect(() => {
        if (isSessionExpiring && countDown > 0) {
            const intervalId = setInterval(() => {
                dispatch(setCountDown(countDown - 1));

                if (countDown <= 180) {
                    dispatch(setTimerColor("#F0BE47"));
                }
                if (countDown <= 60) {
                    dispatch(setTimerColor("#EC5858"));
                }
                if (countDown <= 1) {
                    clearInterval(intervalId);
                    logoutHandle();
                }
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [isSessionExpiring, countDown]);

    const logoutHandle = () => {
        dispatch(setSessionExpiring(false));
        dispatch(logoutRequest());
        navigate("/signin");
    };

    const reLoginHandle = () => {
        dispatch(setSessionExpiring(false));
        dispatch(loginRequest());
    };

    const seconds = String(countDown % 60).padStart(2, '0');
    const minutes = String(Math.floor(countDown / 60)).padStart(2, '0');

    return (
        <>
            {isSessionExpiring && (
                <Modal
                    isOpen={true}
                    className="al_session_modal"
                    wrapClassName="al_outerparentwp"
                >
                    <ModalBody>
                        <h5 className="text-wrap al_modal_heading">
                            <i className='icon_alfred_timer' style={{ fontSize: '1.2rem', color: timerColor }}></i> Attention
                        </h5>
                        <h5 className="text-center text-wrap al_modal_subheading">
                            Oops! Your session is about to expire. Please select an option to continue.
                        </h5>
                        <h5 className='justify-content-center text-wrap d-flex gap-2'><span>Hurry up! You will be automatically logged out in</span><span className={countDown <= 60 ? 'al_zoom-text' : ""} style={{ color: timerColor }}>{minutes} : {seconds}</span></h5>
                    </ModalBody>

                    <div className="modelFooter text-center mt-2">
                        <Button
                            type="button"
                            className="text-capitalize al_button_cancel al_timerbutton_cancel"
                            onClick={logoutHandle}
                        >
                            Logout
                        </Button>
                        <Button
                            type="button"
                            className="text-capitalize al_button_save al_timerbutton_save"
                            onClick={reLoginHandle}
                        >
                            Continue
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default SessionTimeoutModal;
