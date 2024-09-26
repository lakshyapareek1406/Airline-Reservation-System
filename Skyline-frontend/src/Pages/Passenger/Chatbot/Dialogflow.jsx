import React, { useEffect } from 'react';

const Dialogflow = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <df-messenger
        intent="WELCOME"
        chat-title="Skyline"
        agent-id="19bbae63-c642-4029-b3ba-7b810f369512"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default Dialogflow;
