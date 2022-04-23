import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { Container } from "./styles";

import LottieView from "lottie-react-native";
import loadanimated from "../../../assets/loadanimated.json";

export function LoadAnimation() {
  const theme = useTheme();

  return (
    <Container>
      <LottieView
        source={loadanimated}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
