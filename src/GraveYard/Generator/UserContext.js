import React, { useState, useContext, createContext } from "react";

// Create Context
const UserLoginContext = createContext();
const UpdateUserContext = createContext();

/// Hooks
export const useUserLogin = () => {
  return useContext(UserLoginContext);
};
export const useUpdateUserLogin = () => {
  return useContext(UpdateUserContext);
};

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: false });
  return (
    <UserLoginContext.Provider value={user}>
      <UpdateUserContext.Provider value={setUser}>
        {children}
      </UpdateUserContext.Provider>
    </UserLoginContext.Provider>
  );
};

export default UserContext;
