import React from "react";
import styles from "./Loader.module.scss";
import classNames from "classnames/bind";
import clsx from "clsx";

const cx = classNames.bind(styles);

const Loader = () => {
  return (
    <div className="inline-block w-14 h-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={clsx("h-full w-full", cx("loader"))}
      >
        <g className="g-group">
          <circle className={cx("dot")} cx="30vw" />
          <circle className={cx("dot")} cx="40vw" />
          <circle className={cx("dot")} cx="50vw" />
          <circle className={cx("dot")} cx="60vw" />
          <circle className={cx("dot")} cx="70vw" />
        </g>
      </svg>
    </div>
  );
};

export default Loader;
