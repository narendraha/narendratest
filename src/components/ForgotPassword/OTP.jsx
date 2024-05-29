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
    let data = {
      username: props?.data?.username,
      email: props?.data?.email,
    };
    props?.resendOtp(data);
  };

  return (
    <div className="text-end">
      <p
        className={`mb-0 ${isDisabled ? "disabled" : ""}`}
        onClick={!isDisabled ? handleResendClick : null}
        style={{
          cursor: isDisabled ? "default" : "pointer",
          color: isDisabled ? "grey" : "inherit",
        }}
      >
        Resend OTP {isDisabled ? `(${seconds}s)` : ""}
      </p>
    </div>
  );
};

export default ResendOTP;
