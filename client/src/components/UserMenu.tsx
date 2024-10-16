import { useNavigate } from "react-router-dom";
import { Avatar, Button, Menu } from "@mantine/core";
import { UrlRoutes } from "@config";
import { useCurrentPilotQuery, useSignOutMutation } from "@api";
import { useStore } from "@hooks";
import { mutationPromiseHandler } from "@lib";

export const UserMenu = () => {
  const navigate = useNavigate();
  const [{ data }] = useCurrentPilotQuery();
  const setToken = useStore((state) => state.setLoginToken);

  const currentUser = data?.currentPilot ?? null;

  const [, signOut] = useSignOutMutation();

  const UserButton = (
    <Button
      variant="light"
      leftIcon={<Avatar size="sm" radius="xl" />}
      radius="xl"
      sx={{ transform: "none" }}
      onClick={() => !currentUser && navigate(UrlRoutes.signin)}
    >
      {data?.currentPilot
        ? `${data?.currentPilot.firstName} ${data?.currentPilot.lastName}`
        : "login"}
    </Button>
  );

  return currentUser ? (
    <Menu shadow="md" width={200}>
      <Menu.Target>{UserButton}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() =>
            signOut({}).then(
              mutationPromiseHandler("Good bye!", () => setToken("")),
            )
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    UserButton
  );
};
