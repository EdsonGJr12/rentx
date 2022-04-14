import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary}; 
    padding: 18px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
`;

export const CarImages = styled.View` 
`;

export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        padding: 24,
        alignItems: 'center'
    },
    showsVerticalScrollIndicator: false
})``;

export const Details = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: 38px;
`;

export const Description = styled.View``;
export const Brand = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
`;
export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(25)}px;

    text-transform: uppercase;
`;
export const Rent = styled.View``;

export const Period = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;

    text-transform: uppercase;
`;
export const Price = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(25)}px;

    text-transform: uppercase;
`;

export const About = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(15)}px; 

    text-align: justify;

    margin-top: 23px;
    line-height: ${RFValue(25)}px; 
`;

export const Accessories = styled.View`
    width: 100%;

    flex-direction: row;
    flex-wrap: wrap;  
    justify-content: space-between;
    align-items: center;
`;

export const Footer = styled.View`
    width: 100%;
`;