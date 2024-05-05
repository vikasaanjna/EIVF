import Column from "antd/es/table/Column";
import React from "react";
import { Table } from "antd";

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
  return (
    <Table
      dataSource={dataSource}
      onChange={onTableChange}
      rowClassName={getRowClassName}
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
          defaultFilteredValue={item.filters?.map(
            (filter: any) => filter.value
          )}
        />
      ))}
    </Table>
  );
};
