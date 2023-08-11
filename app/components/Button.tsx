import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

const Button = ({children, ...props}: Props) => {
  return <button {...props}>{children}</button>;
};

export default Button;
