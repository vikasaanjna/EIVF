import { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RootContainer } from "./RootContainer";
import { Events, Subscribers, Clinics, Drivers, Reports, Settings } from "../pages";

interface RoutesObj {
  path: string;
  key: string;
  title: string;
  componenet: ReactNode | any;
  hideSideBar?: boolean;
}
export const Routing = () => {
  const routes: RoutesObj[] = [
    {
      path: "/events",
      key: "events",
      title: "Events",
      componenet: <Events/>,
    },
    {
      path: "/subscribers",
      key: "subscribers",
      title: "Subscribers",
      componenet: <Subscribers/>,
    },
    {
      path: "/clinics",
      key: "clinics",
      title: "Clinics",
      componenet: <Clinics/>,
    },
    {
      path: "/drivers",
      key: "drivers",
      title: "Drivers",
      componenet: <Drivers/>,
    },
    {
      path: "/reports",
      key: "reports",
      title: "Reports",
      componenet: <Reports/>,
    },
    {
      path: "/settings",
      key: "settings",
      title: "Settings",
      componenet: <Settings/>,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((i: RoutesObj, k: number) => (
          <Route
            key={k}
            path={i.path}
            element={
              // <PrivateRoutes authenticated={authenticated}>
              <RootContainer
                hideSideBar={i.hideSideBar}
                activeKey={i.key}
                title={i.title}
              >
                {i.componenet}
              </RootContainer>
              // </PrivateRoutes>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
