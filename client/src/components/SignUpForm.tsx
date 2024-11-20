import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  PasswordInput,
  SimpleGrid,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { sha256 } from "js-sha256";
import { useSignUpMutation } from "@api";
import { PasswordField } from "@components";
import { useStore } from "@hooks";

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
    <Card shadow="sm" p="lg" maw={800} m="auto">
      <LoadingOverlay visible={fetching} />
      <Title>Inscription</Title>
      <Stack>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput label="Nom" {...getInputProps("lastName")} />
          <TextInput label="Prénom" {...getInputProps("firstName")} />
          <TextInput label="Email" {...getInputProps("email")} />
          <TextInput label="Login" {...getInputProps("username")} />
          <PasswordField
            label="Mot de passe"
            value=""
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
