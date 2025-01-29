import { useEffect, useState } from "react";

const usePosition = (ref) => {
  const [position, setPosition] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          right: rect.right + window.scrollX,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updatePosition(); // Update position initially

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [ref]);

  return position;
};

export default usePosition;
