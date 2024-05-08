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

  const addKeyToObjects = (data: any, parentKey = "") => {
    return data.map((item: any, index: any) => {
      const key = `${parentKey}${index}`;
      if (Array.isArray(item)) {
        return addKeyToObjects(item, `${key}_`);
      } else if (typeof item === "object" && item !== null) {
        const newItem = { ...item, key };
        if (item.children && Array.isArray(item.children)) {
          newItem.children = addKeyToObjects(item.children, `${key}_child_`);
        }
        return newItem;
      } else {
        return item;
      }
    });
  };

  console.log(addKeyToObjects(dataSource));
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

  const applyPaddingToEmptyCells = () => {
    const elements = document.querySelectorAll(
      ".ant-table-cell.ant-table-expanded-row-cell"
    );
    elements.forEach((element) => {
      if (!element.innerHTML.trim()) {
        element.classList.add("empty-cell");
      } else {
        element.classList.remove("empty-cell");
      }
    });
  };

  const expandIcon = ({ expanded, onExpand, record }: any) => (
    <div
      onClick={(e) => {
        applyPaddingToEmptyCells();
        onExpand(record, e);
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <RightOutlined
        className={!record.children ? "expand-icon" : ""}
        style={{
          marginRight: "5px",
          transform: expanded ? "rotate(90deg)" : "rotate(0)",
          transition: "transform 0.3s ease-in-out",
        }}
      />
    </div>
  );

  const expandedRowRender = (record: any) => {
    const elements = document.querySelectorAll(
      ".ant-table-cell.ant-table-expanded-row-cell"
    );
    elements.forEach((element: any) => {
      if (!element.innerHTML.trim()) {
        element.style.padding = "0";
      }
    });
    if (record.children && record.children.length > 0) {
      return null;
    } else {
      return <span>{JSON.stringify(record, null, 2)}</span>;
    }
  };

  return (
    <Table
      dataSource={addKeyToObjects(dataSource)}
      onChange={onTableChange}
      rowClassName={getRowClassName}
      expandable={{ expandIcon, expandedRowRender }}
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
        />
      ))}
    </Table>
  );
};
