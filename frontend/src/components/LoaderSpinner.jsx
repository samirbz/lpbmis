import React, { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./LoaderSpinner.module.scss";

const cx = classNames.bind(styles);

function LoaderSpinner({ state, hideAfter }) {
  const circleLoaderRef = useRef(null);
  const checkmarkRef = useRef(null);

  // Dynamically assign classNames based on the state
  const classObject = {
    "circle-loader": true,
    "load-complete": state === "success" || state === "error",
    "load-success": state === "success",
    "load-failure": state === "error",
    idle: state === "idle",
  };
  if (hideAfter) {
    classObject["hide-after"] = state === "success" || state === "error";
  }
  const loaderClasses = cx(classObject);

  useEffect(() => {
    const circleLoader = circleLoaderRef.current;
    const checkmark = checkmarkRef.current;

    // Reset the classes on state change
    if (state === "idle") {
      circleLoader.classList.remove(
        cx("load-complete"),
        cx("load-success"),
        cx("load-failure")
      );
      checkmark.classList.remove("draw");
    }

    // Success state
    if (state === "success") {
      circleLoader.classList.add(cx("load-complete"), cx("load-success"));
      checkmark.classList.add("draw");
    }

    // Failure state
    if (state === "error") {
      circleLoader.classList.add(cx("load-complete"), cx("load-failure"));
      checkmark.classList.remove("draw");
    }
  }, [state]);

  return (
    <>
      <div className={loaderClasses} ref={circleLoaderRef}>
        {/* Display checkmark only in success state */}
        <div
          className={cx("checkmark", {
            draw: state === "success",
          })}
          ref={checkmarkRef}
        ></div>
      </div>
    </>
  );
}

export default LoaderSpinner;
