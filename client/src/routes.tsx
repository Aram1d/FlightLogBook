import { RouteObject } from "react-router";
import { SignUpForm } from "./SignUpForm";
import { MainLayout } from "./layout/MainLayout";
import { AircraftsManager } from "./pages/Aircrafts/AircraftManager";
import { PilotsManager } from "./pages/Pilots/PilotsManager";
import { SignInForm } from "./SignInForm";
import { FlightManager } from "./pages/Flights/FlightManager";
import { FlightStats } from "./pages/Stats";

import { List, Stack, Pagination } from "@mantine/core";
import { useState } from "react";

export enum UrlRoutes {
  signup = "/signup",
  singnin = "/signin",

  flights = "/flights",
  aircrafts = "/aircrafts",

  pilots = "/pilots",
  dummy = "/dummy",
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/:tabId?", element: <FlightStats /> },
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
      {
        path: UrlRoutes.dummy,
        element: <Dummy />,
      },
    ],
  },
  {
    path: UrlRoutes.signup,
    element: <SignUpForm />,
  },
];

function Dummy() {
  const [pager, setPager] = useState<{ i: number; pz: number }>({
    i: 0,
    pz: 5,
  });

  return (
    <Stack>
      <List>
        {pageFibo(pager).map((t, index) => (
          <List.Item key={index}>{t}</List.Item>
        ))}
      </List>
      <Pagination
        value={pager.i + 1}
        onChange={(i) => setPager((old) => ({ ...old, i: i - 1 }))}
        total={2023}
      />
    </Stack>
  );
}

function fibo(n: number) {
  const sqRootOf5 = Math.sqrt(5);

  const Phi = (1 + sqRootOf5) / 2;
  const phi = (1 - sqRootOf5) / 2;

  return Math.round((Math.pow(Phi, n) - Math.pow(phi, n)) / sqRootOf5);
}
type Pager = {
  i: number;
  pz: number;
};

function pageFibo({ i, pz }: Pager) {
  const tMin = i * pz + 1;
  const array: number[] = [];

  for (let t = tMin; t < tMin + 5; t++) {
    array.push(fibo(t));
  }
  return array;
}
