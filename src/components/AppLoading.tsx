import React, { ReactNode } from "react";
import { Alert, Flex, Spin } from "antd";
import { useAuth } from "../context/AuthContext";

interface SpinProps {
  children: ReactNode;
}

export const AppLoader: React.FC<SpinProps> = ({ children }) => {
  const { loading } = useAuth();

  return (
    <div className="apploader">
      <Spin size="large" spinning={loading}>
        {children}
      </Spin>
    </div>
  );
};
