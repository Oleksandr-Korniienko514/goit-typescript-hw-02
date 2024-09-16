import React, { useState, useEffect } from 'react';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100) || 0;


  useEffect(() => {
    const storedFeedback = localStorage.getItem('feedback');
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  return (
    <div>
      <h1 style={{
        margin: 8,
        padding: "12px 16px",
      }}>Sip Happens Café</h1>
      <p style={{
        margin: 8,
        padding: "12px 16px",
        fontSize: "20px"

      }}>Please leave your feedback about our service by selecting one of the options below.</p>
      <Options onLeaveFeedback={updateFeedback} onReset={resetFeedback} total={totalFeedback} />
      {
        totalFeedback > 0 ? (
          <Feedback feedback={feedback} total={totalFeedback} positive={positiveFeedback} />
        ) : (
          <Notification message="No feedback provided yet" />
        )
      }
    </div >
  );
};

export default App;
