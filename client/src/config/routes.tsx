import { useMemo } from "react";
import { RouteObject, useRoutes } from "react-router";
import { useCurrentPilotQuery } from "@api";
import { SignInForm, SignUpForm } from "@components";
import { MainLayout } from "@layouts";
import {
  AircraftsManager,
  FlightManager,
  Home,
  PilotsManager,
  FlightStats
} from "@pages";

export enum UrlRoutes {
  signup = "/signup",
  signin = "/signin",

  flights = "/flights",
  aircrafts = "/aircrafts",

  pilots = "/pilots",
  dummy = "/dummy",
  stats = "/stats"
}

export const useAppRoutes = () => {
  const [{ data, fetching }] = useCurrentPilotQuery();

  const routes = useMemo<RouteObject[]>(
    () => [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/:tabId?",
            element: fetching ? null : data?.currentPilot ? (
              <FlightStats />
            ) : (
              <Home />
            )
          },
          { path: `${UrlRoutes.stats}/:tabId?`, element: <FlightStats /> },
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
    ],
    [data?.currentPilot, fetching]
  );

  return useRoutes(routes);
};
