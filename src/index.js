import React, {useState, useEffect, useRef} from "react";
import { View, Text, Modal, TextInput} from "react-native";
import { ContainerScrollView, TxtSaldo, TxtValor, InputTxt, InputTxt2, Btt, Card, TextInputText, BttReset, ViewModal } from "./styles";


export default function App(){

    useEffect(()=>{
        const formatNumber = new Intl.NumberFormat('pt-BR', {
            style:'currency',
            currency:'BRL',
        })

        setVlInput(formatNumber.format('0'));
        setVlSaldo(formatNumber.format('200'));
    }, []);

    const [vlInput, setVlInput] = useState(null);
    const [vlSaldo, setVlSaldo] = useState(null);
    const [vlInputReset, setVlReset] = useState(null);
    const [modalReset, setModalReset] = useState(false);

    const inputVlRef = useRef(undefined);
    const inputVlResetRef = useRef(undefined);

    const [postedValues, setPostedValues] = useState([]);

    const formatNumber = new Intl.NumberFormat('pt-BR', {
        style:'currency',
        currency:'BRL',
    })

    function editValue(numberTyped, setValue){

        if(numberTyped.length >= 3){
            setValue(formatNumber.format(`${numberTyped.slice(-numberTyped.length, -2)}.${numberTyped.slice(-2)}`));
        }else if(numberTyped.length == 1){
            setValue(formatNumber.format(`0.0${numberTyped}`));
        }else if(numberTyped.length == 2){
            setValue(formatNumber.format(`0.${numberTyped}`));
        }else{
            setValue(formatNumber.format(0));
        }
    }

    function defValueSaldo(number){
        setVlSaldo(number);
        setPostedValues([]);
        setVlReset(formatNumber.format('0'));
        inputVlResetRef.current.clear();
        setModalReset(false);
    }

    function addValue(number){
        let date = new Date();
        let value = number ? number.replace(/\D/g, '').replace(/\s/g, '') : false;
        let value2 = vlSaldo ? vlSaldo.replace(/\D/g, '').replace(/\s/g, '') : false;

        value = `${value.slice(-value.length, -2)}.${value.slice(-2)}`;
        value2 = `${value2.slice(-value2.length, -2)}.${value2.slice(-2)}`;

        if(vlSaldo[0] == '-'){
            value2 = Number(value2) * -1;
        }

        setVlSaldo(formatNumber.format(Number(value2) + Number(value)));
        setPostedValues([{type:true, value:`${value}`, date:`${date.getHours(date)}h${date.getMinutes(date)}m - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}, ...postedValues])
        setVlInput(formatNumber.format('0'));
        inputVlRef.current.clear();
    }

    function removeValue(number){
        let date = new Date();
        let value = number ? number.replace(/\D/g, '').replace(/\s/g, '') : false;
        let value2 = vlSaldo ? vlSaldo.replace(/\D/g, '').replace(/\s/g, '') : false;

        value = `${value.slice(-value.length, -2)}.${value.slice(-2)}`;
        value2 = `${value2.slice(-value2.length, -2)}.${value2.slice(-2)}`;

        if(vlSaldo[0] == '-'){
            value2 = Number(value2) * -1;
        }

        setVlSaldo(formatNumber.format(Number(value2) - Number(value)));
        setPostedValues([{type:false, value:`${value}`, date:`${date.getHours(date)}h${date.getMinutes(date)}m - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}, ...postedValues])
        setVlInput(formatNumber.format('0'));
        inputVlRef.current.clear();
    }

    return(
        <ContainerScrollView>

            <Modal visible={modalReset} animationType='slide' transparent={true}>
                <ViewModal>
                    <Text style={{color:'#EFEFEF', fontSize:30, width:250, borderBottomWidth:1, borderBottomColor:'#fff', textAlign:'center'}}>{vlInputReset}</Text>
                    <InputTxt2 ref={inputVlResetRef} placeholder="R$" placeholderTextColor='#EFEFEF' keyboardType="numeric" onChangeText={(text)=>editValue(text, setVlReset)}/>
                    <Btt colorBtt={'#F66B0E'} style={{marginTop:20}} onPress={(e)=>defValueSaldo(vlInputReset)}>OK</Btt>
                
                </ViewModal>
            </Modal>

            <TxtSaldo>{vlSaldo}</TxtSaldo>

            <TextInputText>{vlInput}</TextInputText>
            <InputTxt ref={inputVlRef} keyboardType="numeric" onChangeText={(txt)=>editValue(txt, setVlInput)}/>

            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Btt colorBtt={"#157347"} onPress={()=>addValue(vlInput)}>ADICIONAR</Btt>
                <Btt colorBtt={"#BB2D3B"} onPress={()=>removeValue(vlInput)}>REMOVER</Btt>
            </View>
            <View style={{backgroundColor:"#205375", paddingHorizontal:20, paddingVertical:20}}>
                {postedValues.map((el, index)=>{
                    return <Card key={index}><TxtValor colorValor={el.type}>{el.type ? '+':'-'} {el.value}</TxtValor><Text style = {{color:"#EFEFEF", fontSize:18}}>{el.date}</Text></Card>
                })}
            </View>

            <BttReset onPress={(e)=>setModalReset(true)}>RESET</BttReset>
        </ContainerScrollView>
    )
}