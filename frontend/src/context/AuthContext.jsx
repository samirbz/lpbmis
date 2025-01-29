import React, { createContext } from "react";
const AuthContext = createContext({
  jwtToken: localStorage.getItem("jwtToken"),
  user: {},
  setJwtToken: () => {},
  setUser: () => {},
  userRole: null,
  setUserRole: () => {},
});
export default AuthContext;
