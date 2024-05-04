import React, { ReactNode } from "react";

interface Props {
  children: ReactNode | any;
  authenticated: boolean;
}

export const PrivateRoutes: React.FC<Props> = ({ children, authenticated }) => {
  // return authenticated ? children : <Navigate to="/login" />;
  return children;
};
