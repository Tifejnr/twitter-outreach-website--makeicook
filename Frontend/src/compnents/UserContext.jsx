import { createContext, useState } from "react";

export const UserContext = createContext({loggedIn:false});

const Context = ({children}) => {
  const [userStatus, setUserStatus] = useState(()=> ({
    loggedIn: false,
})
    );
    return  <UserContext.Provider value={userStatus}>{children}</UserContext.Provider>
}


export default Context