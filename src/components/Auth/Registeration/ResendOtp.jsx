import React, { useState, useEffect, useRef } from "react";

const ResendOTP = (props) => {
  const [seconds, setSeconds] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setIsDisabled(false);
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [seconds]);

  const handleResendClick = () => {
    setSeconds(30);
    setIsDisabled(true);
    props?.resendOtp();
  };

  return (
    <div className="text-end">
      <p
        className={`mb-0 mt-2 al_forgot_pw ${isDisabled ? "disabled" : ""}`}
        onClick={!isDisabled ? handleResendClick : null}
        style={{
          cursor: isDisabled ? "default" : "pointer"
        }}
      >
        Resend OTP {isDisabled ? `(${seconds}s)` : ""}
      </p>
    </div>
  );
};

export default ResendOTP;
