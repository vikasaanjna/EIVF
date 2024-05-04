import React, { ReactNode } from "react";
import { Tooltip } from 'antd';

interface Props {
    tooltip?: string;
    icon: ReactNode;
    onClick?: () => void;
}

export const IconButton: React.FC<Props> = ({ tooltip, icon, onClick }) => {

    return (
        <Tooltip title={tooltip}>
            <button onClick={onClick}>
                {icon}
            </button>
        </Tooltip>
    );
};
