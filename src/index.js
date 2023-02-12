import React, {useState, useEffect} from "react";
import { View, Text} from "react-native";
import { ContainerScrollView, TxtSaldo, TxtValor, InputTxt, Btt, Card, TextInputText } from "./styles";


export default function App(){

    useEffect(()=>{
        const formatNumber = new Intl.NumberFormat('pt-BR', {
            style:'currency',
            currency:'BRL',
        })

        setVlInput(formatNumber.format('0'));
        setVlSaldo(formatNumber.format('2000'));
    }, []);

    const [vlInput, setVlInput] = useState(null);
    const [vlSaldo, setVlSaldo] = useState(null);

    function editValue(numberTyped){
        const formatNumber = new Intl.NumberFormat('pt-BR', {
            style:'currency',
            currency:'BRL',
        })

        if(numberTyped.length >= 3){
            setVlInput(formatNumber.format(`${numberTyped.slice(-numberTyped.length, -2)}.${numberTyped.slice(-2)}`));
        }else if(numberTyped.length == 1){
            setVlInput(formatNumber.format(`0.0${numberTyped}`));
        }else if(numberTyped.length == 2){
            setVlInput(formatNumber.format(`0.${numberTyped}`));
        }else{
            setVlInput(formatNumber.format(0));
        }
    }

    function addValue(number){
        console.log(number);
    }

    function removeValue(number){
        console.log(number);
    }

    return(
        <ContainerScrollView>

            <TxtSaldo>{vlSaldo}</TxtSaldo>

            <TextInputText>{vlInput}</TextInputText>
            <InputTxt keyboardType="numeric" onChangeText={(txt)=>editValue(txt)}/>

            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Btt colorBtt={"#157347"} onPress={()=>addValue(vlInput)}>ADICIONAR</Btt>
                <Btt colorBtt={"#BB2D3B"} onPress={()=>removeValue(vlInput)}>REMOVER</Btt>
            </View>
            <View style={{backgroundColor:"#205375", paddingHorizontal:20, paddingVertical:20}}>
                <Card><TxtValor colorValor={false}>- R$ 145,00</TxtValor><Text style = {{color:"#EFEFEF", fontSize:20}}>15/01/2022</Text></Card>
                <Card><TxtValor colorValor={true}>+ R$ 1.000,50</TxtValor><Text style = {{color:"#EFEFEF", fontSize:20}}>15/01/2022</Text></Card>
                <Card><TxtValor colorValor={true}>+ R$ 1.200,00</TxtValor><Text style = {{color:"#EFEFEF", fontSize:20}}>15/01/2022</Text></Card>
                <Card><TxtValor colorValor={false}>- R$ 22,45</TxtValor><Text style = {{color:"#EFEFEF", fontSize:20}}>15/01/2022</Text></Card>
                
            </View>
        </ContainerScrollView>
    )
}