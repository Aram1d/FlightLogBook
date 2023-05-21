import { Avatar, Button, Menu } from "@mantine/core";
import { useCurrentPilotQuery, useSignOutMutation } from "../../api/gqlTypes";
import { useNavigate } from "react-router-dom";
import { UrlRoutes } from "../../routes";
import { mutationPromiseHandler } from "../../utils/gqlHandlers";
import { useStore } from "../../utils/useStore";

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
      onClick={() => !currentUser && navigate(UrlRoutes.singnin)}
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
              mutationPromiseHandler("Good bye!", () => setToken(""))
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
