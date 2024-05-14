import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { CustomTableAntd } from "../../components";
const { Column } = Table;

interface Column {
  key: number;
  title: string;
  dataIndex: string;
  render?: any;
  filters?: any[];
  filterMode?: string;
  filterSearch?: boolean;
  onFilter?: any;
  width?: string;
  sorter?: any;
  sortDirections?: any;
}

const columnsData: Column[] = [
  {
    key: 1,
    title: "EVENT NAME",
    dataIndex: "EventName",
    sorter: (a: any, b: any) => a.EventName.localeCompare(b.EventName),
  },
  {
    key: 2,
    title: "EVENT TYPE",
    dataIndex: "EventType",
    sorter: (a: any, b: any) => a.EventType.localeCompare(b.EventType),
  },
  {
    key: 3,
    title: "SUBSCRIBER NAME",
    dataIndex: "SubscriberName",
    sorter: (a: any, b: any) =>
      a.SubscriberName.localeCompare(b.SubscriberName),
  },
  {
    key: 4,
    title: "TENANT NAME",
    dataIndex: "TenantName",
    sorter: (a: any, b: any) => a.TenantName.localeCompare(b.TenantName),
  },
  {
    key: 5,
    title: "MODULE",
    dataIndex: "Module",
    sorter: (a: any, b: any) => a.Module.localeCompare(b.Module),
  },
  {
    key: 6,
    title: "CREATED ON(CST)",
    dataIndex: "CreatedOn",
    sorter: (a: any, b: any) => a.CreatedOn.localeCompare(b.CreatedOn),
  },
  {
    key: 7,
    title: "MESSAGE",
    dataIndex: "Message",
    sorter: (a: any, b: any) => a.Message.localeCompare(b.Message),
  },
  {
    key: 8,
    title: "REQUESTED ID",
    dataIndex: "AggregateId",
    sorter: (a: any, b: any) => a.AggregateId.localeCompare(b.AggregateId),
  },
  {
    key: 9,
    title: "MODE",
    dataIndex: "Mode",
    sorter: (a: any, b: any) => a.Mode.localeCompare(b.Mode),
  },
  {
    key: 10,
    title: "DELIVERY METHOD",
    dataIndex: "DeliveryMethod",
    sorter: (a: any, b: any) =>
      a.DeliveryMethod.localeCompare(b.DeliveryMethod),
  },
  {
    key: 11,
    title: "TRANSACTION TYPE",
    dataIndex: "TransactionType",
    sorter: (a: any, b: any) =>
      a.TransactionType.localeCompare(b.TransactionType),
  },
  {
    key: 12,
    title: "CODE",
    dataIndex: "Code",
    sorter: (a: any, b: any) => a.Code.localeCompare(b.Code),
  },
];

interface Props {
  tableData: any[];
  setFilterList: any;
}

export const HomeScreen: React.FC<Props> = ({ tableData, setFilterList }) => {
  const [draggedItem, setDraggedItem] = useState<Column | null>(null);
  const [columns, setColumns] = useState<Column[]>(columnsData);
  const [draggedList, setDraggedList] = useState<Column[]>([]);
  const [dataSource, setDataSource] = useState<any[]>(tableData);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: Column
  ) => {
    setDraggedItem(item);
  };

  const handleRemoveItem = (item: Column) => {
    setDraggedList(draggedList?.filter((i: Column) => i.key !== item.key));
    const modifiedArray = columns.sort((a, b) => a.key - b.key);
    const removeCol: any = [];

    // modifiedArray.map((i: any) => {
    //   if (item.key !== i.key) {
    //     removeCol.push(i);
    //   } else {
    //     if (i.title !== "") {
    //       removeCol.push(i);
    //     }
    //   }
    // });
    // setDataSource([]);
    setDataSource(tableData);
    setColumns(modifiedArray);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedItem) {
      setDraggedList([...draggedList, draggedItem]);
      const filteredCol = columns.filter(
        (item) => item.title !== draggedItem.title
      );
      // setColumns(columns.filter((item) => item.title !== draggedItem.title));
      setColumns([draggedItem, ...filteredCol]);
      setDraggedItem(null);
    }
  };

  const [uniqDataArray, setUniqDataArray] = useState<any>({});
  useEffect(() => {
    if (tableData && tableData.length > 0) {
      setDataSource(tableData);
      createUniqElementsInArray();
    }
  }, [tableData]);

  useEffect(() => {
    if (uniqDataArray && draggedList.length > 0) {
      _handleModifyTableData();
    }
  }, [draggedList, uniqDataArray]);

  const createUniqElementsInArray = () => {
    var newArray: any = {};
    columns.map((col: any) => {
      const childArrayItems: any = [];
      const arrayUniqueByKey = Array.from(
        new Map(
          tableData.map((item: any) => [item[col.dataIndex], item])
        ).values()
      );

      arrayUniqueByKey.map((i: any) => {
        childArrayItems.push({
          key: i.key,
          [col.dataIndex]: i[col.dataIndex],
        });
      });
      newArray = {
        ...newArray,
        [col.dataIndex]: childArrayItems,
      };
    });
    setUniqDataArray(newArray);
  };

  const _handleModifyTableData = () => {
    const data: any = handleChildElemet(tableData, 0);

    setDataSource(data);
  };

  const handleChildElemet = (data: any, index: number) => {
    const newArray: any = [];
    const dt = draggedList[index];
    if (
      dt &&
      dt.dataIndex &&
      index < draggedList.length &&
      uniqDataArray[dt.dataIndex]
    ) {
      uniqDataArray[dt.dataIndex].map((uniqItem2: any, childIndex: number) => {
        const filterData = data.filter(
          (tableItem: any) => uniqItem2[dt.dataIndex] == tableItem[dt.dataIndex]
        );
        const res = handleChildElemet(filterData, index + 1);
        if (res && res.length > 0) {
          handleColumns(dt);
          newArray.push({
            ...uniqItem2,
            key: `Child${childIndex}`,
            children: res,
          });
        } else {
          if (filterData.length > 0) {
            handleColumns(dt);
            newArray.push({
              ...uniqItem2,
              key: `Parent_${childIndex}`,
              isExpandable: true,
              children: filterData,
            });
          }
        }
      });
    }
    return newArray;
  };

  const handleColumns = (dt: any) => {
    const colArray: any = [];
    // colArray.push({ dataIndex: dt.dataIndex, title: "" });
    for (var c = 0; c < columns.length; c++) {
      colArray.push({
        ...columns[c],
      });
    }
    setColumns(colArray);
  };

  const render = (value: any, row: any) => {
    return value;
  };
  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="p-5 border"
      >
        {draggedList && draggedList.length > 0 ? (
          <div className="flex">
            {draggedList.map((item: Column) => (
              <div key={item.key} className="border p-1 rounded bg-[#DEE2#6]">
                {item.title}{" "}
                <span
                  onClick={() => handleRemoveItem(item)}
                  className="ml-2 cursor-pointer"
                >
                  X
                </span>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="font-semibold text-[gray]">
            Drag a coumn header here to group its column
          </h3>
        )}
      </div>
      <CustomTableAntd
        dataSource={dataSource}
        columns={columns}
        handleDragStart={handleDragStart}
        render={render}
        setFilterList={setFilterList}
        uniqDataArray={uniqDataArray}
        draggedList={draggedList}
      />
    </div>
  );
};
