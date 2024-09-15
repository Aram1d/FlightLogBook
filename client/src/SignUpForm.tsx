import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  PasswordInput,
  SimpleGrid,
  SimpleGridBreakpoint,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { PasswordField } from "./pages/components/PasswordField";
import { useSignUpMutation } from "./api/gqlTypes";
import { sha256 } from "js-sha256";
import { useStore } from "./utils/useStore";

export const simpleGridBreakpoints: SimpleGridBreakpoint[] = [
  { minWidth: 800, cols: 2, spacing: "sm" },
  { minWidth: 600, cols: 1, spacing: "sm" }
];
export const SignUpForm = () => {
  const navigate = useNavigate();
  const { values, getInputProps } = useForm<{
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    pwd: string;
    pwd2: string;
  }>({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      pwd: "",
      pwd2: ""
    }
  });

  const [{ fetching }, signUp] = useSignUpMutation();
  const setToken = useStore(s => s.setLoginToken);

  const onSubmit = () => {
    signUp({
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      pwdHash: sha256(values.pwd),
      pwdHash2: sha256(values.pwd2)
    }).then(res => {
      if (res.data?.signUp) {
        setToken(res.data.signUp);
        navigate("/");
      }
    });
  };

  return (
    <Card shadow="sm" p="lg" sx={{ maxWidth: 800, margin: "auto" }}>
      <LoadingOverlay visible={fetching} overlayBlur={2} />
      <Title align="center">Inscription</Title>
      <Stack>
        <SimpleGrid breakpoints={simpleGridBreakpoints}>
          <TextInput label="Nom" {...getInputProps("lastName")} />
          <TextInput label="Prénom" {...getInputProps("firstName")} />
          <TextInput label="Email" {...getInputProps("email")} />
          <TextInput label="Login" {...getInputProps("username")} />
          <PasswordField
            label="Mot de passe"
            {...getInputProps("pwd")}
            required
          />
          <PasswordInput
            label="Confirmation du mot de passe"
            {...getInputProps("pwd2")}
            required
          />
        </SimpleGrid>
        <Group>
          <Button>Annuler</Button>
          <Button onClick={onSubmit}>Valider</Button>
        </Group>
      </Stack>
    </Card>
  );
};
