import { RouteObject } from "react-router";
import { SignUpForm } from "./SignUpForm";
import { MainLayout } from "./layout/MainLayout";
import { AircraftsManager } from "./pages/Aircrafts/AircraftManager";
import { PilotsManager } from "./pages/Pilots/PilotsManager";
import { SignInForm } from "./SignInForm";
import { FlightManager } from "./pages/Flights/FlightManager";
import { FlightStats } from "./pages/Stats";

export enum UrlRoutes {
  signup = "/signup",
  singnin = "/signin",

  flights = "/flights",
  aircrafts = "/aircrafts",

  pilots = "/pilots",
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <FlightStats /> },
      {
        path: UrlRoutes.flights,
        element: <FlightManager />,
      },
      { path: UrlRoutes.aircrafts, element: <AircraftsManager /> },
      { path: UrlRoutes.pilots, element: <PilotsManager /> },
      {
        path: UrlRoutes.signup,
        element: <SignUpForm />,
      },
      { path: UrlRoutes.singnin, element: <SignInForm /> },
    ],
  },
  {
    path: UrlRoutes.signup,
    element: <SignUpForm />,
  },
];
