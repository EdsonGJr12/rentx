import React from "react";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButon";
import { ImageSlider } from "../../components/ImageSlider";

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from "./styles";
import { Button } from "../../components/Button";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { CarProps } from "../@types/CarProps";
import { StatusBar, StyleSheet } from "react-native";

export function CarDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  const car = route.params as CarProps;
  const { brand, name, rent, accessories, about, photos } = car;

  function handleConfirm() {
    navigation.navigate("Scheduling", car);
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View style={[headerStyleAnimation]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View style={[sliderCarsStyleAnimation]}>
          <ImageSlider imagesUrl={photos} />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{brand}</Brand>
            <Name>{name}</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ {rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {accessories.map((accessorie) => (
            <Acessory
              key={accessorie.type}
              name={accessorie.name}
              icon={getAccessoryIcon(accessorie.type)}
            />
          ))}
        </Accessories>

        <About>
          {about}
          {about}
          {about}
          {about}
          {about}
          {about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
  },
});
