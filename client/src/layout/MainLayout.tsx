import { Outlet } from "react-router-dom";
import { AppShell, Container } from "@mantine/core";

import { Header } from "@components";

export const MAX_WIDTH = "100rem";

export const MainLayout = () => {
  return (
    <AppShell
      padding="md"
      header={<Header height={60} />}
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      })}
    >
      <Container maw={MAX_WIDTH}>
        <Outlet />
      </Container>
    </AppShell>
  );
};
