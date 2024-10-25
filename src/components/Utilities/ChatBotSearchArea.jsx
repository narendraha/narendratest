import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function ChatBotSearchArea({ handleFormSubmit, isInputDisable }) {
  const inputRef = useRef();
  const { transcript, listening, resetTranscript, finalTranscript } = useSpeechRecognition();

  const [inputValue, setInputValue] = useState("");
  const [isShowSendBtn, setIsShowSendBtn] = useState(false);
  const [spechBtn, setSpechBtn] = useState(true);

  useEffect(() => {
    inputRef.current?.focus();
    return resetTranscript; // Clean up on unmount
  }, []);

  useEffect(() => {
    if (finalTranscript) {
      setInputValue((prev) => prev + finalTranscript);
      updateButtonVisibility(finalTranscript);
      resetTranscript();
    }
  }, [finalTranscript]);

  const updateButtonVisibility = (value) => {
    const isEmpty = !value.trim();
    setIsShowSendBtn(!isEmpty);
    setSpechBtn(isEmpty);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    updateButtonVisibility(value);
  };

  const getIconClassName = () => {
    let baseClass = isShowSendBtn ? "icon_alfred_sendmsg h-auto" : (spechBtn && !listening) ? "icon_alfred_speech h-auto" : listening ? "icon_alfred_audiostop pointer text-danger mt-0" : "icon_alfred_speech h-auto";
    return isInputDisable ? `${baseClass} disabled pointer` : baseClass;
  };

  const handleIconSubmit = () => {
    if (isShowSendBtn) {
      handleFormSubmit(inputValue);
      resetInput();
    } else {
      toggleSpeechRecognition();
    }
  };

  const toggleSpeechRecognition = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setSpechBtn(true);
    } else {
      SpeechRecognition.startListening();
      setSpechBtn(false);
    }
  };

  const resetInput = () => {
    setInputValue("");
    setIsShowSendBtn(false);
  };

  const clearInputValue = () => {
    resetTranscript();
    resetInput();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFormSubmit(inputValue);
      resetInput();
    }
    if (e.key === "Backspace" && inputValue.length === 0) {
      resetTranscript();
      resetInput();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <i className="icon_alfred_search h-auto"></i>
      <input
        type="text"
        placeholder="Ask a question about Atrial Fibrillation"
        name="message"
        value={transcript || inputValue}
        onChange={handleInputChange}
        disabled={isInputDisable}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      {isShowSendBtn && inputValue && (
        <i className="icon_alfred_close" onClick={clearInputValue} />
      )}
      <i className={getIconClassName()} onClick={isInputDisable ? null : handleIconSubmit} />
    </form>
  );
}
