import React, { useState } from "react";

const EventForm = () => {
  const [fbType, setFbType] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFbType('');
    setFeedback('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Event</h1>
      <input
        type="text"
        value={fbType}
        onChange={e => setFbType(e.target.value)}
        placeholder="type"
      />
      <input
        type="textarea"
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        placeholder="feedback"
      />
    </form>
  );
};

export default EventForm;
