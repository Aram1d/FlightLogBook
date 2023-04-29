import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <AppShell
      padding="md"
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
};
