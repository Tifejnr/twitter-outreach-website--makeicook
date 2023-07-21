// MyContext.js
import React, { createContext } from 'react';
import useCustomHook from '../CustomHooks/CustomHooks';

const MyContext = createContext();

const MyProvider = ({ children }) => {
   const contextValue = useCustomHook();

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
  
};

export { MyContext, MyProvider };
