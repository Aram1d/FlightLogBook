import { RouteObject } from "react-router";
import { SignUpForm } from "@components";
import { SignInForm } from "@components";
import { MainLayout } from "@layouts";
import {
  AircraftsManager,
  FlightManager,
  PilotsManager,
  FlightStats
} from "@pages";

export enum UrlRoutes {
  signup = "/signup",
  signin = "/signin",

  flights = "/flights",
  aircrafts = "/aircrafts",

  pilots = "/pilots",
  dummy = "/dummy"
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/:tabId?", element: <FlightStats /> },
      {
        path: UrlRoutes.flights,
        element: <FlightManager />
      },
      { path: UrlRoutes.aircrafts, element: <AircraftsManager /> },
      { path: UrlRoutes.pilots, element: <PilotsManager /> },
      {
        path: UrlRoutes.signup,
        element: <SignUpForm />
      },
      { path: UrlRoutes.signin, element: <SignInForm /> }
    ]
  },
  {
    path: UrlRoutes.signup,
    element: <SignUpForm />
  }
];
