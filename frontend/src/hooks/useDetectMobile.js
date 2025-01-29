import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isOnMobileState } from "../store/states.js";

const useDetectMobile = () => {
  const setIsOnMobile = useSetRecoilState(isOnMobileState);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Tailwind's 'md' breakpoint (default 768px)

    const handleChange = () => {
      setIsOnMobile(mediaQuery.matches);
    };

    handleChange(); // Set initial value
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setIsOnMobile]);
};

export default useDetectMobile;
