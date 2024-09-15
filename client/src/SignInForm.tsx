import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { sha256 } from "js-sha256";
import { useCurrentPilotQuery, useSignInMutation } from "./api/gqlTypes";
import { mutationPromiseHandler } from "./utils/gqlHandlers";
import { useStore } from "./utils/useStore";

export const SignInForm = () => {
  const [{ data }] = useCurrentPilotQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.currentPilot) navigate("/");
  }, [data?.currentPilot]); // eslint-disable-line react-hooks/exhaustive-deps

  const setLoginToken = useStore(s => s.setLoginToken);

  const { getInputProps, onSubmit, reset } = useForm<{
    email: string;
    pwd: string;
  }>({
    initialValues: { email: "", pwd: "" }
  });

  const [{ fetching }, signIn] = useSignInMutation();

  return (
    <Card shadow="sm" p="lg" sx={{ maxWidth: 800, margin: "auto" }}>
      <LoadingOverlay visible={fetching} overlayBlur={2} />
      <form
        onSubmit={onSubmit(values => {
          signIn({ email: values.email, pwdHash: sha256(values.pwd) }).then(
            mutationPromiseHandler("Welcome back", ({ signIn }) =>
              setLoginToken(signIn)
            )
          );
        })}
      >
        <Stack>
          <Title order={4}>Sign in on FLB</Title>
          <TextInput label="Email / login" {...getInputProps("email")} />
          <PasswordInput label="Password" {...getInputProps("pwd")} />

          <Group position="right">
            <Button onClick={reset}>Reset</Button>
            <Button type="submit">Login</Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
};
