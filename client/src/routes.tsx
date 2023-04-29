import { RouteObject } from "react-router";
import { SignUpForm } from "./pages/SignUpForm";
import { MainLayout } from "./layout/MainLayout";
import { FlightRecordForm } from "./pages/Flights/FlightRecordForm";

export enum UrlRoutes {
  signup = "/signup",
  recordFlight = "/record-flight",
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: UrlRoutes.recordFlight,
        element: <FlightRecordForm />,
      },
      {
        path: UrlRoutes.signup,
        element: <SignUpForm />,
      },
    ],
  },
  {
    path: UrlRoutes.signup,
    element: <SignUpForm />,
  },
];
