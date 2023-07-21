import { useState } from 'react';

const customProgressBarHook = () => {
  const [progressBarTitle, setProgressBarTitle] = useState("");
  const [successStatusTitle, setSuccessStatusTitle] = useState("");
  const [failureTitle, setFailureTitle] = useState("");

  // ... and so on for other values

  return {
    progressBarTitle, 
    setProgressBarTitle,
    successStatusTitle, 
    setSuccessStatusTitle,
    failureTitle,
    setFailureTitle
    // ... and so on for other values
  };
};

export default customProgressBarHook;

