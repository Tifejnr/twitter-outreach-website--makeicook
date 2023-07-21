import { useState } from 'react';

const useCustomHook = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [textAreaRefEl, setTextAreaRefEl] = useState(null);

  // ... and so on for other values

  return {
    textAreaValue, 
    setTextAreaValue,
    textAreaRefEl,
    setTextAreaRefEl,
    // ... and so on for other values
  };
};

export default useCustomHook;