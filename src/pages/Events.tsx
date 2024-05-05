import React, { useContext, useEffect, useState } from "react";
import {
  FilterFilled,
  RetweetOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { IconButton, PageHeader, RangePicker } from "../components";
import { HomeScreen } from "../screens";
import { subDays } from "date-fns";
import { Card } from "antd";
import { AuthContext } from "../context";
import { getEvents } from "../service/apiService";

const defaultStartDate = subDays(new Date(), 1);
const defaultEndDate = new Date();

export const Events: React.FC = () => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [eventsData, setEventsData] = useState([]);
  const [tooltip, setTooltip] = useState(false);
  const [filterlist, setFilterList] = useState<any>();
  const { loading, setLoading } = useContext<any>(AuthContext);

  const handleDateChange = (val: [Date, Date]) => {
    setStartDate(val[0]);
    setEndDate(val[1]);
  };

  const handleGetEvents = async () => {
    setLoading(true);
    try {
      const response = await getEvents(startDate, endDate);
      setEventsData(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    handleGetEvents();
  }, [endDate]);

  return (
    <>
      <PageHeader title="Events Monitor">
        <>
          <RangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
          />
          <button
            className="border border-gray-300 p-2 rounded-md relative"
            onClick={() => handleDateChange([defaultStartDate, defaultEndDate])}
          >
            Reset Filter |{" "}
            <FilterFilled
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
            />
            {tooltip && (
              <Card
                title={`Applied Filters: ${filterlist?.length || 0}`}
                className="absolute z-10 bg-white right-0 top-10 border border-gray-300 shadow-lg break-words"
                style={{ width: 200 }}
              >
                {filterlist?.map((item: any) => {
                  return Object.keys(item).map((key) => (
                    <span>
                      <h5 className="text-xs">{key}:</h5>
                      <p className="mb-6 text-xs">
                        {item[key].map((i: any) => (
                          <b>{i}, </b>
                        ))}
                      </p>
                    </span>
                  ));
                })}
              </Card>
            )}
          </button>
          <IconButton tooltip="Export" icon={<DownloadOutlined />} />
          <IconButton
            tooltip="Refresh"
            icon={<RetweetOutlined />}
            onClick={handleGetEvents}
          />
        </>
      </PageHeader>
      {!loading && (
        <HomeScreen tableData={eventsData} setFilterList={setFilterList} />
      )}
    </>
  );
};
