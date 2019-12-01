import React, { useState } from "react";

const EventForm = () => {
  let [fbType, setFbType] = useState("");
  let [feedback, setFeedback] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    setFbType("");
    setFeedback("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Event</h1>
      <input
        type="text"
        value={fbType}
        onChange={setFbType}
        placeholder="type"
      />
      <input
        type="textarea"
        value={feedback}
        onChange={setFeedback}
        placeholder="feedback"
      />
    </form>
  );
};

export default EventForm;
