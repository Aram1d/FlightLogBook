import { Outlet } from "react-router-dom";
import { AppShell, Container } from "@mantine/core";
import { Header } from "@layouts";
import classes from "./MainLayout.module.css";

export const MAX_WIDTH = "100rem";

export const MainLayout = () => {
  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      classNames={{ main: classes.main }}
    >
      <Header />
      <AppShell.Main>
        <Container maw={MAX_WIDTH} px={0} h="100%">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
