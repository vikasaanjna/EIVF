import React, { useState } from "react";

import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import {
  ShopFilled,
  MedicineBoxFilled,
  ToolFilled,
  FileTextFilled,
  SettingFilled
} from '@ant-design/icons';


import { useNavigate } from "react-router-dom";
import { AppHeader } from "./Header";
type RouteProps = {
  children: JSX.Element;
  activeKey: string;
  title?: string;
  hideSideBar?: boolean | undefined;
};
const { Sider } = Layout;

export const AppLayout: React.FC<RouteProps> = ({
  children,
  activeKey,
  hideSideBar,
}) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "events",
      icon: <FileTextFilled />,
      label: `Events Monitor`,
    },
    {
      key: "subscribers",
      icon: <ShopFilled />,
      label: `Subscribers`,
    },
    {
      key: "clinics",
      icon: <MedicineBoxFilled />,
      label: `Clinics`,
    },
    {
      key: "drivers",
      icon: <ToolFilled />,
      label: `Drivers`,
    },
    {
      key: "reports",
      icon: <FileTextFilled />,
      label: `Reports`,
    },
    {
      key: "settings",
      icon: <SettingFilled />,
      label: `Settings`,
    },   
  ];

  return (
    <Layout className="h-[100vh]">
      <AppHeader
        activeKey={activeKey}
        toggleCollapse={() => setCollapsed(!collapsed)}
      />

      <Layout>
        {hideSideBar ? null : (
          <Sider width={200} trigger={null} collapsible collapsed={collapsed}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[activeKey]}
              defaultOpenKeys={[activeKey]}
              style={{ height: "100%", borderRight: 0 }}
              items={items}
              onClick={(e: any) => {
                navigate(`/${e.key}`);
              }}
            />
          </Sider>
        )}
        <Layout className="p-5">{children}</Layout>
      </Layout>
    </Layout>
  );
};
