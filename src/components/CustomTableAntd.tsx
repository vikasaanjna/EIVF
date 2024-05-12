import Column from "antd/es/table/Column";
import React, { useContext, useState } from "react";
import { Pagination, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { AuthContext } from "../context";

interface TableProps {
  dataSource: any[];
  columns: any[];
  handleDragStart: any;
  render?: any;
  setFilterList: any;
  uniqDataArray?: any;
  draggedList?: any;
}
export const CustomTableAntd: React.FC<TableProps> = ({
  dataSource,
  columns,
  handleDragStart,
  render,
  setFilterList,
  uniqDataArray,
  draggedList,
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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const onPageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    pageSize && setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const paginatedData = dataSource.slice(startIndex, endIndex);

  const addKeyToObjects = (data: any, parentKey = "") => {
    return data.map((item: any, index: any) => {
      const key = `${parentKey}${index}`;
      if (Array.isArray(item)) {
        return addKeyToObjects(item, `${key}_`);
      } else if (typeof item === "object" && item !== null) {
        const newItem = { ...item, key };
        if (Array.isArray(item.children)) {
          const dynamicKey = Object.keys(item).find(
            (key) => !["key", "isExpandable", "children"].includes(key)
          );
          if (dynamicKey && !item[dynamicKey]?.includes(item.children.length)) {
            item[
              dynamicKey
            ] = `${item[dynamicKey]} - ${item.children.length} items`;
          }
          newItem.children = addKeyToObjects(item.children, `${key}_child_`);
        }
        return newItem;
      } else {
        return item;
      }
    });
  };

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
    setPageSize(pagination.pageSize);
    setCurrentPage(pagination.current);
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
  const element2 = document.querySelectorAll(".ant-table-cell");
  element2.forEach((ele: any) => {
    if (draggedList?.length > 0) {
      ele.style.overflow = "inherit";
    }
  });

  return (
    <>
      <Table
        dataSource={addKeyToObjects(dataSource)}
        onChange={onTableChange}
        rowClassName={getRowClassName}
        expandable={{ expandIcon, expandedRowRender }}
        scroll={{ y: 350, x: 2500 }}
        loading={loading}
        virtual
      >
        {convertedColumns.map((item: any, index) => (
          <Column
            width={200}
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
      {/* <Pagination
        style={{ marginTop: "16px", textAlign: "right" }}
        total={dataSource.length}
        current={currentPage}
        pageSize={pageSize}
        showSizeChanger
        showQuickJumper
        onChange={onPageChange}
        onShowSizeChange={(current, size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      /> */}
    </>
  );
};
