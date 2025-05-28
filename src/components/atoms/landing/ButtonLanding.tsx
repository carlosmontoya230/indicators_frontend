import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function ButtonLanding({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
