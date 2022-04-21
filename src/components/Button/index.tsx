import React from "react";
import { ActivityIndicator } from "react-native";

import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
}
export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container
      enabled={loading ? false : enabled}
      color={color ? color : theme.colors.main}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
