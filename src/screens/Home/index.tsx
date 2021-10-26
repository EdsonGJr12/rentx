import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import Car from '../../components/Car';

import { 
    Container, 
    Header,
    TotalCars
} from './styles';

const Home: React.FC = () => {

    return (
        <Container>
            <StatusBar 
                barStyle='light-content' 
                backgroundColor='transparent' 
                translucent
            />
            <Header>
                <Logo 
                    width={RFValue(108)}
                    height={RFValue(12)}
                />
                <TotalCars>
                    Total de 12 carros
                </TotalCars>
            </Header>

            <Car />
        </Container>
    )
}

export default Home;