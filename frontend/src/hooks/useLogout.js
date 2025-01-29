// src/utils/logout.js
import { useSetRecoilState } from "recoil";
import { jwtTokenState } from "../store/states";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const setJwtToken = useSetRecoilState(jwtTokenState);
  const navigate = useNavigate();

  const logout = () => {
    // Clear the JWT token from Recoil
    setJwtToken(null);

    // Optionally clear any other state or perform other cleanup tasks

    // Redirect the user to the login page or any other page after logout
    navigate("/login"); // Replace "/login" with your actual login route
  };

  return logout;
};
