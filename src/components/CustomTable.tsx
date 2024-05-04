import { Table } from "antd";
import Column from "antd/es/table/Column";
import React from "react";

interface TableProps {
  dataSource: any[];
  columns: any[];
  handleDragStart: any;
  render?: any;
}
export const CustomTable: React.FC<TableProps> = ({
  dataSource,
  columns,
  handleDragStart,
  render,
}) => {
  const getTdData = () => {
    const ele: any = [];
    dataSource.map((item: any, rowKey: number) => {
      console.log("#data---", item);

      if (!item.children) {
        ele.push(
          <tr key={rowKey}>
            {columns.map((col: any, key: number) => {
              return (
                <td key={key} className="p-2 border font-bold">
                  {item[col.dataIndex]}
                </td>
              );
            })}
          </tr>
        );
      } else {
        ele.push(
          <tr key={rowKey}>
            {columns.map((col: any, key: number) => {
              return key == 0 ? (
                <td
                  key={key}
                  colSpan={
                    item?.isExpandable ? (key == 0 ? columns.length : 1) : 1
                  }
                  className="p-2 border font-bold"
                >
                  {item[col.dataIndex]}
                </td>
              ) : null;
            })}
          </tr>
        );
        item.children.map((ch: any, chKey: number) => {
          ele.push(
            <tr key={chKey}>
              {columns.map((col: any, key: number) => {
                return (
                  <td key={key} className="p-2 border">
                    {ch[col.dataIndex]}
                  </td>
                );
              })}
            </tr>
          );
        });
      }
    });
    // dataSource.map((item: any, key: number) => (

    // columns.map((col: any, key: number) => {
    //   ele.push(
    //     <td key={key} className="p-2 border">
    //       {item[col.dataIndex]}
    //     </td>
    //   );
    // })

    // ))
    return ele;
  };
  return (
    <table className="table-auto w-full text-left border">
      <thead>
        <tr>
          {columns.map((item, key) => (
            <th key={key} className="border p-2">
              <div draggable onDragStart={(e) => handleDragStart(e, item)}>
                {item.title}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{getTdData()}</tbody>
    </table>
  );
};
