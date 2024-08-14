import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import approvalsent from "../../../images/approvalsent.svg";
import { setAccountCreateConfirmationRequest } from '../../../store/SessionStore/slice';

const SetConfirmationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        dispatch(setAccountCreateConfirmationRequest({navigate}))
    }

    return (
        <React.Fragment>
            <div className="wflexLayout al_mx-auto">
                <div className="wflex-items-center wflexLayout">
                    <div className="al_login-form al_registrationform wflexScroll">
                        <div className="text-center mb-4">
                            <img src={approvalsent} alt="approval" height={85} />
                            <div className="mt-4">You have registered</div>
                            <h4 className="text-success">successfully</h4>
                            <p className="mb-0 textLight">
                                Your account is currently under review. You will receive an email notification once it’s approved. Thank you
                            </p>
                        </div>
                    </div>
                    <div className="al_login_footer mt-3">
                        <button
                            type="button"
                            className="al_login_button"
                            onClick={handleSubmit}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SetConfirmationForm