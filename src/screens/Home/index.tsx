import React, { useEffect, useState } from "react";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

import { StatusBar, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car";

import {
  Container,
  CardList,
  Header,
  MyCarsButton,
  TotalCars,
  ButtonStyleContainer,
} from "./styles";
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { api } from "../../service/api";
import { LoadAnimation } from "../../components/LoadAnimation";
import { CarProps } from "../@types/CarProps";
import { useTheme } from "styled-components";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";

export function Home() {
  const navigation = useNavigation<any>();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      // positionX.value = withSpring(0);
      // positionY.value = withSpring(0);
    },
  });

  function handleCarDetails(item: CarProps) {
    navigation.navigate("CarDetails", item);
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent //começa tamanho do header do começo da tela
      />

      <Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CardList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              size={32}
              name="ios-car-sport"
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,

    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",
  },
});
