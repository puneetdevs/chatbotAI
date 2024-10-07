import React, { useEffect } from 'react';

function VapiComponent({ assistant, title }) { // accept assistant as a prop
  useEffect(() => {
    const apiKey = "5324b794-67f6-48e4-a0d4-1504e2f7d206"; // Substitute with your Public key from Vapi Dashboard.

    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
    script.defer = true;
    script.async = true;

    const buttonConfig = {
      position: "top", // "bottom" | "top" | "left" | "right" | "top-right" | "top-left" | "bottom-left" | "bottom-right"
      offset: "540px", // decide how far the button should be from the edge
      width: "50px", // min-width of the button
      height: "50px", // height of the button
      idle: { // button state when the call is not active.
        color: `rgb(93, 254, 202)`, 
        type: "pill", // or "round"
        title: "Try Appointment Assistant?", // only required in case of Pill
        subtitle: "Talk with AI assistant to setup appointment", // only required in case of pill
        icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone.svg`,
      },
      loading: { // button state when the call is connecting
        color: `rgb(93, 124, 202)`,
        type: "pill", // or "round"
        title: "Connecting...", // only required in case of Pill
        subtitle: "Please wait", // only required in case of pill
        icon: `https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg`,
      },
      active: { // button state when the call is in progress or active.
        color: `rgb(255, 0, 0)`,
        type: "pill", // or "round"
        title: "Call is in progress...", // only required in case of Pill
        subtitle: "End the call.", // only required in case of pill
        icon: `https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg`,
      },
    };

    document.body.appendChild(script);

    script.onload = () => {
      if (window.vapiSDK) {
        const vapiInstance = window.vapiSDK.run({
          apiKey: apiKey,
          assistant: assistant, // Use prop value
          title: title, // Use prop value
          config: buttonConfig,
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [assistant]); // Add assistant to dependency array to re-run effect if assistant changes

  return (
    <div>
      <h2>{title} </h2>
    </div>
  );
}

export default VapiComponent;
