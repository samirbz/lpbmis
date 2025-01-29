import React, { forwardRef } from "react";
import clsx from "clsx";

const Button = forwardRef((props, ref) => {
  const { variant = "outlined", className, children, ...rest } = props;

  const defaultStyles =
    "flex items-center justify-center rounded-3xl px-2 py-1 whitespace-nowrap m3-body-medium rounded-full ";
  const variantStyles = {
    outlined: "border border-primary text-bue-fair-800 rounded-3xl",
    filled:
      "bg text-white bg-primary hover:bg-surface border border-transparent hover:border-primary hover:text-primary active:bg-secondary",
    text: "bg-transparent text-blue-600 hover:bg-surface-variant hover:text-blue-600",
    elevated: "shadow-md bg-white text-gray-800",
    tonal: "bg-gray-200 text-gray-800",
  };

  const buttonStyle = variantStyles[variant] || variantStyles.outlined; // Fallback if `variant` is invalid

  return (
    <button
      ref={ref}
      className={clsx(defaultStyles, buttonStyle, className)}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
