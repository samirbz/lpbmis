import NiceModal, { useModal } from "@ebay/nice-modal-react";
import clsx from "clsx";
import React from "react";

function ModalOverlay(props) {
  const {
    children,
    closeOnOverlay,
    onClick,
    className,
    extraClassName,
    contentWrapperClassName,
    zIndexClass = "z-500",
    ...rest
  } = props;
  const modal = useModal();

  const handleOnClickOverlay = () => {
    if (onClick) onClick();

    if (closeOnOverlay) {
      modal.remove();
      modal.hide();
    }
  };

  return (
    <div
      className={clsx(
        className
          ? className
          : "fixed inset-0  bg-black p-10 bg-opacity-50 flex justify-center items-center",
        zIndexClass,
        extraClassName || ""
      )}
      onClick={handleOnClickOverlay}
      {...rest}
    >
      <div
        className={
          contentWrapperClassName
            ? contentWrapperClassName
            : "_content-wrapper h-full flex items-center justify-center"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalOverlay;
