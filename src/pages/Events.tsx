import React, { useEffect, useState } from "react";
import {
  FilterFilled,
  RetweetOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { IconButton, PageHeader, RangePicker } from "../components";
import { HomeScreen } from "../screens";
import { subDays, formatISO } from "date-fns";
import instace from "../config/axios.instace";
import { apiUrls } from "../constants/api.constants";
import { Card } from "antd";

const defaultStartDate = subDays(new Date(), 1);
const defaultEndDate = new Date();

export const Events: React.FC = () => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [eventsData, setEventsData] = useState([]);
  const [tooltip, setTooltip] = useState(false);
  const [filterlist, setFilterList] = useState<any>();

  const handleDateChange = (val: [Date, Date]) => {
    setStartDate(val[0]);
    setEndDate(val[1]);
  };

  const getEvents = () => {
    const payload = {
      StartTime: formatISO(startDate),
      EndTime: formatISO(endDate),
    };
    instace
      .post(apiUrls.getEvents, payload)
      .then((val) => {
        setEventsData(val.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getEvents();
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
            onClick={getEvents}
          />
        </>
      </PageHeader>
      <HomeScreen tableData={eventsData} setFilterList={setFilterList} />
    </>
  );
};
