import Column from "antd/es/table/Column";
import React from "react";
import { Table } from "antd";

interface TableProps {
  dataSource: any[];
  columns: any[];
  handleDragStart: any;
  render?: any;
  setFilterList: any;
}
export const CustomTableAntd: React.FC<TableProps> = ({
  dataSource,
  columns,
  handleDragStart,
  render,
  setFilterList,
}) => {
  const getUniqueValues = (data: any[], dataIndex: string) => {
    const uniqueValues: any[] = [];
    data.forEach((item) => {
      const value = item[dataIndex];
      if (!uniqueValues.includes(value)) {
        uniqueValues.push(value);
      }
    });
    uniqueValues.sort();
    return uniqueValues.map((value) => ({ text: value, value }));
  };

  const convertedColumns = columns.map((column) => {
    const { dataIndex } = column;
    return {
      ...column,
      filters: getUniqueValues(dataSource, dataIndex),
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
  return (
    <Table dataSource={dataSource} onChange={onTableChange}>
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
        />
      ))}
    </Table>
  );
};
