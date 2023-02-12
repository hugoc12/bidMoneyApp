import styled from 'styled-components/native';
import { TextInput, Button } from 'react-native';

const colors = {
    color1:"#112B3C",
    color2:"#205375",
    color3:"#F66B0E",
    color4:"#EFEFEF",
}

export const ContainerScrollView = styled.ScrollView`
    background-color: ${colors.color1};
`

export const TxtSaldo = styled.Text`
    color: ${colors.color4};
    font-size: 48px;
    text-align: center;
    margin: 30px 0px;
`

export const TextInputText = styled.Text`
    border-bottom-width: 1px;
    border-bottom-color: #fff;
    color: ${colors.color4};
    font-size: 24px;
    width: 70%;
    margin:0px auto 30px auto;
    padding-bottom: 10px;
    text-align: center;
`

export const InputTxt = styled.TextInput`
    color: ${colors.color4};
    font-size: 24px;
    width: 70%;
    margin:0px auto 30px auto;
    text-align: center;
    opacity: 0;
    position: absolute;
    left: 60px;
    top: 102px;
`

export const Btt = styled.Text`
    width: 40%;
    padding: 10px 0px;
    border-radius: 20px;
    text-align: center;
    background-color: ${(props)=>props.colorBtt};
    margin:0px auto 30px auto;
    color: ${colors.color4};
    font-weight: bold;
    font-size: 20px;
`

export const Card = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.color4};
    
`
export const TxtValor = styled.Text`
    color: ${(props)=>props.colorValor ? "#37ed2a": "#f23a3a"};
    font-size: 24px;
    font-weight: bold;
`