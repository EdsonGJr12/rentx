import React from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButon";
import { ImageSlider } from "../../components/ImageSlider";

import {
  Container,
  Header,
  CarImages,
  Content,
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

interface CarAccessoriesProps {
  type: string;
  name: string;
}

interface RouteParams {
  id: string;
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  accessories: CarAccessoriesProps[];
  about: string;
  photos: string[];
}
export function CarDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { brand, name, rent, accessories, about, photos } =
    route.params as RouteParams;

  function handleConfirm() {
    navigation.navigate("Scheduling");
  }

  function handleBack() {
    console.log("aqui");
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={photos} />
      </CarImages>

      <Content>
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

        <About>{about}</About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
