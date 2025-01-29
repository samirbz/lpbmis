import React, { forwardRef } from 'react';


const Textfield = forwardRef((props, ref) => {
  const {
    variant = 'outlined',
    label,
    supportingText,
    className,
    hasLeadingIcon,
    hasTrailingIcon,
    trailingIcon,
    trailingButtonIcon,
    leadingIcon,
    leadingButtonIcon,
    ...rest
  } = props;

  const CustomInput =
    variant === 'outlined' ? 'md-outlined-text-field' : 'md-filled-text-field';

  return (
    <CustomInput
      ref={ref} // Ref is now fully flexible
      label={label}
      supporting-text={supportingText}
      class={className}
      {...rest}
    >
      {leadingButtonIcon && (
        <md-icon-button slot="leading-icon">
          <md-icon>{leadingButtonIcon}</md-icon>
        </md-icon-button>
      )}
      {leadingIcon && <md-icon slot="leading-icon">{leadingIcon}</md-icon>}

      {trailingIcon && <md-icon slot="trailing-icon">{trailingIcon}</md-icon>}
      {trailingButtonIcon && (
        <md-icon-button slot="trailing-icon">
          <md-icon>{trailingButtonIcon}</md-icon>
        </md-icon-button>
      )}
    </CustomInput>
  );
});

Textfield.displayName = 'Textfield';

export default Textfield;
