import React, { useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  Acessories,
  Footer,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { CarProps } from "../@types/CarProps";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import moment from "moment";
import { api } from "../../service/api";
import { Alert } from "react-native";

interface RouteParamsProps {
  car: CarProps;
  dates: string[];
}
export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const navigation = useNavigation<any>();
  const route = useRoute();

  const { car, dates } = route.params as RouteParamsProps;
  const start = moment(dates[0], "YYYY-MM-DD").format("DD/MM/yyyy");
  const end = moment(dates[dates.length - 1], "YYYY-MM-DD").format(
    "DD/MM/yyyy"
  );

  const rentTotal = dates.length * car.rent.price;

  async function handleConfirm() {
    try {
      setLoading(true);
      const schedularByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedularByCar.data.unavailable_dates,
        ...dates,
      ];

      await api.post(`/schedules_byuser`, {
        user_id: 1,
        car,
        startDate: start,
        endDate: end,
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      });

      navigation.navigate("SchedulingComplete");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível realizar o agendamento");
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {car.accessories.map((accessory) => (
            <Acessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x ${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleConfirm}
          color={theme.colors.success}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
