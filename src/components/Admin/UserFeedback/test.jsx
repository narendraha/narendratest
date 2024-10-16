import React, { useState } from 'react';

export default function Test() {
  const [sentence, setSentence] = useState('Can you hear me?');

  function handleSayClicked() {
    const utterance = new SpeechSynthesisUtterance(sentence);
    speechSynthesis.speak(utterance);
  }

  function handleInputChange(event) {
    setSentence(event.target.value);
  }

  return (
    <div className="main">
      <input value={sentence} onChange={handleInputChange} />

      <button onClick={handleSayClicked}>Say it!</button>

    </div>
  );
}
