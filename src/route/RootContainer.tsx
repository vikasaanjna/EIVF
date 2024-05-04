import React from "react";
import { AppLayout } from "../layout";
// import { Header } from "../layouts/Header";

type RouteProps = {
  children: JSX.Element;
  activeKey: string;
  title?: string;
  hideSideBar?: boolean | undefined;
};

export const RootContainer: React.FC<RouteProps> = (props) => {
  const { children, activeKey, title, hideSideBar } = props;

  return (
    <AppLayout activeKey={activeKey} hideSideBar={hideSideBar} title={title}>
      {children}
    </AppLayout>
  );
};
