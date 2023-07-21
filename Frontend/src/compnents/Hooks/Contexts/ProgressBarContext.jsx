// progressbarcontext.js
import React, { createContext } from 'react';
import customProgressBarHook from '../CustomHooks/ProgressBarHooks';

const ProgressBarContext = createContext();

const ProgressBarProvider = ({ children }) => {
   const contextValue = customProgressBarHook();

  return (
    <ProgressBarContext.Provider value={contextValue}>
      {children}
    </ProgressBarContext.Provider>
  );
  
};

export { ProgressBarContext,ProgressBarProvider };
