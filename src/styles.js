import styled from 'styled-components/native';

const colors = {
    color1:"#112B3C",
    color2:"#205375",
    color3:"#F66B0E",
    color4:"#EFEFEF",
}

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
    font-size: 24px;
    color: #fff;
    width: 300px;
    margin: 10px auto;
    border-bottom-width: 1px;
    border-bottom-color: #fff;
    text-align: center;
`

export const InputTxt2 = styled.TextInput`
    color: ${colors.color4};
    font-size: 30px;
    width: 70%;
    text-align: center;
    opacity: 0;
    position: absolute;
    top: 25px;
    border-bottom-width: 2px;
    border-bottom-color: #fff;
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

export const TxtValor = styled.Text`
    color: ${(props)=>props.colorValor ? "#37ed2a": "#f23a3a"};
    font-size: 20px;
    font-weight: bold;
`

export const BttReset = styled.Text`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    width: 80%;
    margin:20px auto;
    padding: 10px 0px;
    border-radius: 20px;
    background-color: ${colors.color3};
`

export const ViewModal = styled.View`
    width: 100%;
    height: 200px;
    background-color: ${colors.color1};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top: 100px;
    padding-top: 10px;

    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: ${colors.color4};
`