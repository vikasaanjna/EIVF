import React from "react";
import src from "../assets/eivflogo-lg.png";
import { Typography, Flex, Layout, Dropdown, Space } from "antd";
import { DownOutlined, MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const menuProps = {
  items: [{
    key: '1',
    label: 'Logout',
  }],
  onClick: () => {
    console.log('clicked logout');
  },
};

type AppHeaderProps = {
  activeKey: string;
  toggleCollapse: () => void;
};

export const AppHeader: React.FC<AppHeaderProps> = ({toggleCollapse}) => {
  return (
    <Header className="bg-customPrimary p-4">
      <Flex justify="space-between" className="h-full">
        <Flex align="center" gap={16} className="h-full">
          <div className="p-6 -ml-4 bg-customSecondary">
            <MenuOutlined className="text-white" onClick={toggleCollapse} />
          </div>
          <img src={src} width={85} />
          <div className="h-full bg-EerieBlack w-px" />
          <Title level={5}>Back Office</Title>
        </Flex>
        <Dropdown menu={menuProps} trigger={['click']}>
            <Space>
              eIVF Support User
              <DownOutlined />
            </Space>
        </Dropdown>
      </Flex>
    </Header>
  );
};
