import React from "react";
import { Box, PasswordInput, Popover, Progress, Text } from "@mantine/core";
import type { PasswordInputProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX, IconCheck } from "@tabler/icons-react";
import { compact } from "lodash-es";

function PasswordRequirement({
  meets,
  label
}: {
  meets: boolean;
  label: React.ReactNode;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      display="flex"
      //justify="center"
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

export const PasswordField = ({
  value,
  ...restProps
}: PasswordInputProps & { value: string }) => {
  const [isPwdTooltipOpened, { open, close }] = useDisclosure(false);

  const pwdValidationState = validatePwdStrength(value);
  const { satisfiedRules, ...pwdRules } = pwdValidationState;
  const pwdOk = satisfiedRules === 1;

  const color = pwdOk ? "teal" : satisfiedRules > 0.5 ? "yellow" : "red";

  return (
    <Popover
      opened={isPwdTooltipOpened}
      position="bottom"
      width="target"
      withinPortal
    >
      <Popover.Target>
        <div onFocusCapture={open} onBlurCapture={close}>
          <PasswordInput value={value} {...restProps} />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress
          color={color}
          value={satisfiedRules * 100}
          size={5}
          style={{ marginBottom: 10 }}
        />
        {Object.entries(pwdRules).map(([rule, meets], index) => (
          <PasswordRequirement
            key={index}
            meets={meets}
            label={pwdValidationLabelsMap[rule as keyof PwdStrengthValidation]}
          />
        ))}
      </Popover.Dropdown>
    </Popover>
  );
};

export type PwdStrengthValidation = {
  hasLowerCaseValid: boolean;
  hasUpperCaseValid: boolean;
  hasNumbersValid: boolean;
  hasSpecialCharsValid: boolean;
  hasMinimumChars: boolean;
  satisfiedRules: number;
};

export const pwdValidationLabelsMap: Record<
  keyof PwdStrengthValidation,
  React.ReactNode
> = {
  hasLowerCaseValid: "Inclus des lettres minuscules",
  hasUpperCaseValid: "Inclus des lettres majuscules",
  hasSpecialCharsValid: "Inclus des caractères spéciaux",
  hasMinimumChars: "Longueur minimale atteinte",
  hasNumbersValid: "Inclus des chiffres",
  satisfiedRules: "Toutes les règles sont satisfaites"
};

export const validatePwdStrength = (pwd: string): PwdStrengthValidation => {
  const hasLowerCaseLetters = pwd.match(/(?=.*[a-z])/g)?.length ?? 0;
  const hasUpperCaseLetters = pwd.match(/(?=.*[A-Z])/g)?.length ?? 0;
  const hasNumbers = pwd.match(/(?=.*[0-9])/g)?.length ?? 0;
  const hasSpecialChars = pwd.match(/(?=.*[^A-Za-z0-9])/)?.length ?? 0;
  const numOfChars = pwd.length;

  const validationObj = {
    hasLowerCaseValid: Boolean(hasLowerCaseLetters),
    hasUpperCaseValid: Boolean(hasUpperCaseLetters),
    hasNumbersValid: Boolean(hasNumbers),
    hasSpecialCharsValid: Boolean(hasSpecialChars),
    hasMinimumChars: numOfChars >= 8
  };

  return {
    ...validationObj,
    satisfiedRules:
      compact(Object.values(validationObj)).length /
      Object.keys(validationObj).length
  };
};
