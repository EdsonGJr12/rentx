import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car";

import { CardList, Container, Header, MyCarsButton, TotalCars } from "./styles";
import { api } from "../../service/api";
import { Load } from "../../components/Load";
import { CarProps } from "../@types/CarProps";
import { useTheme } from "styled-components";

export function Home() {
  const navigation = useNavigation<any>();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

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
        <TotalCars>Total de {cars.length} carros</TotalCars>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CardList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons size={32} name="ios-car-sport" color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
}
