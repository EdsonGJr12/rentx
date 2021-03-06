import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import GasolineSvg from "../../assets/gasoline.svg";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

interface CardData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
  fuel_type: string;
}
interface CardProps extends RectButtonProps {
  data: CardData;
}

export function Car({ data, ...rest }: CardProps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}
