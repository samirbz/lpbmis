import { useCallback, useEffect, useState } from "react";

const useSize = (ref) => {
  const [size, setSize] = useState([0, 0]);

  const handleResize = useCallback(
    (entries) => {
      if (!ref?.current) {
        setSize([window.innerWidth, window.innerHeight]);
        return;
      }

      const entry = entries[0];
      setSize([entry.contentRect.width, entry.contentRect.height]);
    },
    [ref]
  );

  useEffect(() => {
    if (!ref?.current) {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }

    let RO = new ResizeObserver((entries) => handleResize(entries));
    RO.observe(ref.current);

    return () => {
      RO?.disconnect();
      RO = null;
    };
  }, [ref, handleResize]);

  return size;
};

export default useSize;
