import { useState } from 'react';

const useCustomHook = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [textAreaRefEl, setTextAreaRefEl] = useState(null);
  const [timeInterval, setTimeInterval] = useState(1);
  const [timeIntervalRef, setTimeIntervalRef] = useState(null);

  // ... and so on for other values

  return {
    textAreaValue, 
    setTextAreaValue,
    textAreaRefEl,
    setTextAreaRefEl,
    timeInterval, 
    setTimeInterval,
    timeIntervalRef, 
    setTimeIntervalRef
    // ... and so on for other values
  };
};

export default useCustomHook;