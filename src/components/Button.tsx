import React from "react";

interface ButtonProps {
  type: "button" | "submit";
  variant: "primary" | "secondary" | "tertiary";
  padding?: "tight" | "loose";
  width?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  type, 
  variant, 
  padding, 
  width, 
  disabled, 
  onClick, 
  children
}) => {

  const paddingStyle = padding === "tight" ? "py-1.5 px-3" : "py-2 px-4"; 
  const baseStyles = `flex ${paddingStyle} items-center justify-center text-xl rounded-md ${width}`;
  const variantStyles = {
    primary:
      "font-semibold bg-green-700 hover:bg-green-800 border-b-4 border-green-900",
    secondary:
      "font-semibold bg-blue-700 hover:bg-blue-800 border-b-4 border-blue-900",
    tertiary:
      "bg-transparent hover:bg-transparent/10 gap-2.5 border border-neutral-500 rounded-md",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]}`}
      disabled={disabled ?? false}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
