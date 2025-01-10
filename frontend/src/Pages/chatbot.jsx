import React  from "react";


const Chatbot = () => {
  return (
    <div>
      <iframe
        src="https://console.dialogflow.com/api-client/demo/embedded/a98a78e6-4f84-4413-84ca-878a5ff114ab"
        width="350"
        height="500"
        style={{ border: 'none' }}
        title="Dialogflow Chatbot"
      />
    </div>
  );
};

export default Chatbot;