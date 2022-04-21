import React, { useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButon";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

import ArrowSvg from "../../assets/arrow.svg";
import { Alert, StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
import { DateData } from "react-native-calendars";
import { generateInterval } from "../../components/Calendar/generateInterval";
import moment from "moment";

export interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}
interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}
export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>(
    {} as DateData
  );
  const [maskedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();

  const navigation = useNavigation<any>();
  const route = useRoute();

  const car = route.params;

  function handleConfirm() {
    navigation.navigate("SchedulingDetails", {
      car,
      dates: Object.keys(maskedDates),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: moment(firstDate, "YYYY-MM-DD").format("DD/MM/YYYY"),
      endFormatted: moment(endDate, "YYYY-MM-DD").format("DD/MM/YYYY"),
    });
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} onPress={handleBack} />

        <Title>
          Escolha uma {"\n"}data de início e{"\n"}fim de aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={maskedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirm}
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>
    </Container>
  );
}
