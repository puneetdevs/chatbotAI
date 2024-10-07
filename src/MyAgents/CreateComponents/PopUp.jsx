import React, { useState } from 'react';
import "../../index.css";

const PopupComponent = ({ agentId,Title,Content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = `https://api.Voagents.ai/inbound_call?agent_id=${agentId}&ws_url=wss://ws.bolna.dev&user_id=cccacd93-18f1-49d6-912c-45fdaac60086`;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div >
      <button className="main-btn rounded-full" onClick={togglePopup}>Set Inbound Agent</button>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>&times;</span>
            <div className="popup-header">{Title}</div>
            <div className="popup-description">
                 {Content}
            </div>
            <div className="popup-input-wrapper">
              <input type="text" value={url} readOnly className="popup-input" />
              <button
                className={`copy-button ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? '  ' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupComponent;
