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
import { useCurrentPilotQuery, useSignInMutation } from "@api";
import { useStore } from "@hooks";
import { handleMutation } from "@lib";

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
    <Card shadow="sm" p="lg" m="auto" maw={800}>
      <LoadingOverlay visible={fetching} />
      <form
        onSubmit={onSubmit(values => {
          handleMutation(
            signIn({ email: values.email, pwdHash: sha256(values.pwd) }),
            {
              successMsg: "Welcome back",
              onSuccess: ({ signIn }) => setLoginToken(signIn)
            }
          );
        })}
      >
        <Stack>
          <Title order={4}>Sign in on FLB</Title>
          <TextInput label="Email / login" {...getInputProps("email")} />
          <PasswordInput label="Password" {...getInputProps("pwd")} />

          <Group justify="right">
            <Button onClick={reset}>Reset</Button>
            <Button type="submit">Login</Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
};
