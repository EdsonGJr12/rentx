import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";

import { Car } from "../../components/Car";

import { CardList, Container, Header, TotalCars } from "./styles";
import { api } from "../../service/api";
import { isLoading } from "expo-font";
import { Load } from "../../components/Load";

export interface CarProps {
  id: string;
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
  fuel_type: string;
}
export function Home() {
  const navigation = useNavigation<any>();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(item: CarProps) {
    navigation.navigate("CarDetails", item);
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
        <TotalCars>Total de 12 carros</TotalCars>
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
    </Container>
  );
}
