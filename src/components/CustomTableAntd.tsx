import Column from "antd/es/table/Column";
import React, { useContext } from "react";
import { Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { AuthContext } from "../context";

interface TableProps {
  dataSource: any[];
  columns: any[];
  handleDragStart: any;
  render?: any;
  setFilterList: any;
  uniqDataArray?: any;
}
export const CustomTableAntd: React.FC<TableProps> = ({
  dataSource,
  columns,
  handleDragStart,
  render,
  setFilterList,
  uniqDataArray,
}) => {
  const { loading } = useContext<any>(AuthContext);
  const convertedColumns = columns.map((column) => {
    const { dataIndex } = column;
    return {
      ...column,
      filters: uniqDataArray[dataIndex]?.map((value: any) => ({
        text: value[dataIndex],
        value: value[dataIndex],
      })),
      onFilter: (value: any, record: any) => record[dataIndex] === value,
    };
  });

  const onTableChange = (pagination: any, filters: any, sorter: any) => {
    const newList: any = [];
    columns.forEach((item) => {
      if (filters[item.key]) {
        const data = {
          [item.dataIndex]: filters[item.key],
        };
        newList.push(data);
      }
    });
    setFilterList(newList);
  };

  const getRowClassName = (record: any) =>
    record["EventType"] === "Error" ? "error-row" : "";

  const expandIcon = ({ expanded, onExpand, record }: any) => (
    <div
      onClick={(e) => onExpand(record, e)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <RightOutlined
        style={{
          marginRight: "5px",
          transform: expanded ? "rotate(90deg)" : "rotate(0)",
          transition: "transform 0.3s ease-in-out",
        }}
      />
    </div>
  );

  return (
    <Table
      dataSource={dataSource}
      onChange={onTableChange}
      rowClassName={getRowClassName}
      expandable={{ expandIcon }}
      scroll={{ y: 350, x: 2500 }}
      loading={loading}
      virtual
    >
      {convertedColumns.map((item: any, index: number) => (
        <Column
          key={item.key}
          title={
            <div
              key={item.key + index}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
            >
              {item.title}
            </div>
          }
          dataIndex={item.dataIndex}
          render={render}
          filters={item.filters}
          onFilter={item.onFilter}
          filterSearch={true}
          filterMode="tree"
          // defaultFilteredValue={["Select all items "]}
        />
      ))}
    </Table>
  );
};
