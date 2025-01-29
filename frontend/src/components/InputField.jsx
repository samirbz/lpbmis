import clsx from "clsx";
import React, { forwardRef } from "react";

const InputField = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      className={clsx(
        "border p-1 rounded-sm outline-none focus:outline-none focus:border-blue-fair-900",
        className
      )}
      {...rest}
    />
  );
});

InputField.displayName = "InputField";

export default InputField;
