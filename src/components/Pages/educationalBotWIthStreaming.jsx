import React, { useState, useEffect } from 'react';
import EducationalBotHTMLcontent from '../Utilities/EducationalBotHTMLcontent';

const StreamingComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Prevent empty input submission

    setChatHistory((prevHistory) => [...prevHistory, { content: inputValue, role: 'User' }]);
    setInputValue(''); // Clear input after submitting
    setIsLoading(true);
    const data = {
      id: '1234-9876-54321',
      message: inputValue,
    };
    const apiUrl = 'http://4.246.143.7:3001/education_bot_home';
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const responseStream = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (responseStream) {
        const reader = responseStream.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let tempStr = '';

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunk = decoder.decode(value, { stream: true });

          tempStr += chunk;
          setChatHistory((prevHistory) => {
            // Create a new message object with the received chunk
            const updatedHistory = [...prevHistory];
            const lastMessage = updatedHistory[updatedHistory.length - 1];
            // Check if the last message is from 'Bot' and update it
            if (lastMessage && lastMessage.role === 'Bot') {
              updatedHistory[updatedHistory.length - 1].content += chunk;
            } else {
              updatedHistory.push({ content: chunk, role: 'Bot' });
            }
            return updatedHistory;
          });
        }
      }
    } catch (error) {
      console.error('Error streaming response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.role}>
            {/* {message.content} */}
            <EducationalBotHTMLcontent props={message.content} />
          </div>
        ))}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default StreamingComponent;
