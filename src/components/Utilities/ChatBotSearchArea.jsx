import React, { useEffect, useRef, useState } from 'react';

export default function ChatBotSearchArea({ handleFormSubmit, isInputDisable }) {
  const inputRef = useRef();

  const [inputValue, setInputValue] = useState(""); // chat search field(user entered value) stored in this state
  const [isShowSendBtn, setIsShowSendBtn] = useState(false); // Show Send button if input is not empty else Hide it.

  useEffect(() => { inputRef.current?.focus() });

  const handleInputChange = (e) => {
    setIsShowSendBtn(true)
    setInputValue(e);
  }

  const getIconClassName = () => {
    return isShowSendBtn ? "icon_alfred_sendmsg h-auto" : "icon_alfred_speech h-auto"
  }

  const handleIconSubmit = () => {
    if (isShowSendBtn)
      handleFormSubmit(inputValue)
    handleInputChange("")
  }

  return (
    <div className="cs_mainsearch mb-2">
      <form action="#">
        <i className="icon_alfred_search h-auto"></i>
        <input
          type="text"
          placeholder="Ask a question"
          name="message"
          value={inputValue}
          onChange={(e) => handleInputChange(e?.target?.value)}
          disabled={isInputDisable} //Disabled once input value is submitted
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setInputValue("")
              e.preventDefault(); // Prevent default form submission behavior
              handleFormSubmit(e); // Call handleFormSubmit when Enter is pressed
            }
          }}
        />
        {isShowSendBtn && inputValue &&
          <i
            className="icon_alfred_close"
            onClick={() => setInputValue("")}
          />
        }
        <i
          className={getIconClassName()}
          onClick={handleIconSubmit}
        />
      </form>
    </div >
  );
}
