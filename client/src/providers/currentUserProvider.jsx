import React from "react";

const CurrentUserContext = React.createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);

export default CurrentUserProvider;
