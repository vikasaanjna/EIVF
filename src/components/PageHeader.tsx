import React, { ReactNode } from "react";
import { Flex, Typography } from 'antd';

interface Props {
    title: string;
    children?: ReactNode;
}

export const PageHeader: React.FC<Props> = ({ title, children }) => {

    return (
        <Flex justify="space-between" className="py-2 px-4">
            <Typography.Title level={4}>{title}</Typography.Title>
            <Flex gap={16} align="center">
                {children}
            </Flex>
        </Flex>
    );
};
