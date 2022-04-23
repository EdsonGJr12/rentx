import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'; 
import { CarProps } from '../@types/CarProps';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 113px;

    background-color: ${({ theme }) => theme.colors.header}; 
    
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end; 
    
    padding: 32px 24px;
`;

export const TotalCars = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`;

export const CardList = styled(FlatList as new () => FlatList<CarProps>).attrs({
    contentContainerStyle: {
        padding: 24
    },
    showsVerticalScrollIndicator: false
})`
     
`;

export const MyCarsButton = styled(RectButton)`
    width: 60px;
    height: 60px;

    border-radius: 30px;

    background-color: ${({ theme }) => theme.colors.main};

    justify-content: center;
    align-items: center;
`;

export const ButtonStyleContainer = styled(Animated.View)`
    position: absolute;
    bottom: ${RFValue(13)}px;
    right: ${RFValue(22)}px;
`;

