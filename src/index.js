import React, {useEffect, useState} from "react";
import { View, Text, Modal } from "react-native";
import { ContainerScrollView, TxtSaldo, TxtValor, Btt, Card, BttReset, ViewModal } from "./styles";
import CurrencyInput from "react-native-currency-input";
import AsyncStorage from "@react-native-async-storage/async-storage";

let formatNumber = new Intl.NumberFormat('pt-BR', {
    style:'currency',
    currency:'BRL',
})

export default function App(){
    const [vlInput, setVlInput] = useState(0);
    const [vlSaldo, setVlSaldo] = useState(formatNumber.format('-250.00'));
    const [vlInputReset, setVlReset] = useState(0);
    const [modalReset, setModalReset] = useState(false);
    const [postedValues, setPostedValues] = useState([]);

    useEffect(()=>{
        async function findData(){

            const saldo = await AsyncStorage.getItem('@saldo');
            const extratoStr = await AsyncStorage.getItem('@extrato');
            const extratoArr = extratoStr.split('|').map((el)=>JSON.parse(el));

            setVlSaldo(formatNumber.format(saldo));
            setPostedValues(extratoArr);
            
        }

        findData()
    }, [])

    async function saveData(saldo, extrato){
        let valueSaldo = saldo.replace(/\D/g, '').replace(/\s/g, '');
        valueSaldo = `${valueSaldo.slice(-valueSaldo.length, -2)}.${valueSaldo.slice(-2)}`;

        let arrExtrato = extrato.map((el)=>JSON.stringify(el)); // "{\"key\":data}" -> Retorna o formato de objString que o JSON.parse irá permitir ("key")

        try{
            await AsyncStorage.setItem('@saldo', valueSaldo);
            await AsyncStorage.setItem('@extrato', arrExtrato.join('|'));
        }catch(err){
            console.log('Erro ao salvar dado!');
        }
        
    }

    function defValueSaldo(number){
        setVlSaldo(formatNumber.format(number));
        setPostedValues([]);
        setVlReset(0);
        setModalReset(false);
        saveData(formatNumber.format(number), []);
    }

    function editValue(number , type){
        let date = new Date();
        let valueSaldo = vlSaldo.replace(/\D/g, '').replace(/\s/g, '');
        valueSaldo = `${valueSaldo.slice(-valueSaldo.length, -2)}.${valueSaldo.slice(-2)}`;
        if(vlSaldo[0] == '-'){
            valueSaldo = Number(valueSaldo) * -1; // Negativando o valor antes do calculo, caso o saldo seja negativo.
        }

        if(type){
            setVlSaldo(formatNumber.format(Number(valueSaldo) + Number(number)));
            saveData(formatNumber.format(Number(valueSaldo) + Number(number)), [{type:type, value:`${formatNumber.format(number)}`, date:`${date.getHours(date)}h${date.getMinutes(date)}m - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}, ...postedValues]);
        }else{
            setVlSaldo(formatNumber.format(Number(valueSaldo) - Number(number)));
            saveData(formatNumber.format(Number(valueSaldo) - Number(number)), [{type:type, value:`${formatNumber.format(number)}`, date:`${date.getHours(date)}h${date.getMinutes(date)}m - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}, ...postedValues]);
        }

        setPostedValues([{type:type, value:`${formatNumber.format(number)}`, date:`${date.getHours(date)}h${date.getMinutes(date)}m - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}, ...postedValues])
        setVlInput(0);
    }

    return(
        <ContainerScrollView>

            <Modal visible={modalReset} animationType='slide' transparent={true}>
                <ViewModal>
                    <CurrencyInput value={vlInputReset} onChangeValue={setVlReset} prefix='R$ ' separator="," delimiter="." minValue={0} placeholder='R$ 0,00' placeholderTextColor='#fff'
                    style={{fontSize:25, color:'#fff',width:300, alignSelf:'center', marginBottom:20 , borderBottomWidth:1, borderBottomColor:'#fff', textAlign:'center'}}/>
                    <Btt colorBtt={'#F66B0E'} style={{marginTop:20}} onPress={(e)=>defValueSaldo(vlInputReset)}>OK</Btt>
                </ViewModal>
            </Modal>

            <TxtSaldo>{vlSaldo}</TxtSaldo>
            <CurrencyInput value={vlInput} onChangeValue={setVlInput} prefix='R$ ' separator="," delimiter="." minValue={0} placeholder='R$ 0,00' placeholderTextColor='#fff'
                style={{fontSize:25, color:'#fff',width:300, alignSelf:'center', marginBottom:20 , borderBottomWidth:1, borderBottomColor:'#fff', textAlign:'center'}}/>

            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Btt colorBtt={"#157347"} onPress={()=>editValue(vlInput, true)}>ADICIONAR</Btt>
                <Btt colorBtt={"#BB2D3B"} onPress={()=>editValue(vlInput, false)}>REMOVER</Btt>
            </View>
            <View style={{backgroundColor:"#205375", paddingHorizontal:20, paddingVertical:20}}>
                {postedValues.map((el, index)=>{
                    return <Card key={index}><TxtValor colorValor={el.type}>{el.type ? '+ ':'- '} {el.value}</TxtValor><Text style = {{color:"#EFEFEF", fontSize:18}}>{el.date}</Text></Card>
                })}
            </View>

            <BttReset onPress={(e)=>setModalReset(true)}>RESET</BttReset>
        </ContainerScrollView>
    )
}