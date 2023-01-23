import React, {useState, useEffect} from "react";
import { View, Text, TextInput } from "react-native";
import { ContainerScrollView, TxtSaldo, TxtValor, InputTxt, Btt, Card } from "./styles";


export default function App(){
    useEffect(()=>{
        const formatNumber = new Intl.NumberFormat('pt-BR', {
            style:'currency',
            currency:'BRL',
        })

        setVlInput(formatNumber.format("0"));
    }, [])

    const [vlInput, setVlInput] = useState(null);

    function editValue(number){
        const formatNumber = new Intl.NumberFormat('pt-BR', {
            style:'currency',
            currency:'BRL',
        })

        //PROCESSO DE DESCONVERTER E CONVERTER EM MONETÁRIO, PARA QUE A TEXT DO INPUT SEJA CONSTRUÍDA ENQUANTO O USUÁRIO DIGITA

        let strNumber = "0";
        let rgxp = /[0-9]/g;
        let numbers = number.match(rgxp);
        if(numbers){
            strNumber = numbers.join('');
        }
        
        if(strNumber.length == 0){
            setVlInput(formatNumber.format("0"));
        }else if(strNumber.length == 1){
            setVlInput(formatNumber.format(`0.0${strNumber}`));
        }else if(strNumber.length == 2){
            setVlInput(formatNumber.format(`0.${strNumber}`));
        }else{
            setVlInput(formatNumber.format(`${strNumber.slice(0, -2)}.${strNumber.slice(-2)}`));
        }
    }

    return(
        <ContainerScrollView>
            

            <TxtSaldo>R$2.500,00</TxtSaldo>
            <Text style={{fontSize:30, color:"#fff"}}>{vlInput}</Text>
            
            <InputTxt value={vlInput} placeholder={"R$"} placeholderTextColor={"#fff"} keyboardType="numeric" onChangeText={(txt)=>editValue(txt)}/>

            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Btt colorBtt={"#157347"} onPress={(e)=>editValue(previewVl)}>ADICIONAR</Btt>
                <Btt colorBtt={"#BB2D3B"}>REMOVER</Btt>
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