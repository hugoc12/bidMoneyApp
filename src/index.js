import React, {useState, useEffect} from "react";
import { View, Text, Modal, TextInput} from "react-native";
import { ContainerScrollView, TxtSaldo, TxtValor, InputTxt, InputTxt2, Btt, Card, TextInputText, BttReset, ViewModal } from "./styles";


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
    const [vlInputReset, setVlReset] = useState(null);
    const [modalReset, setModalReset] = useState(false);

    const [postedValues, setPostedValues] = useState([
        {type:false, value:'R$ 1.250,25', date:'22/02/23'},
        {type:true, value:'R$ 800,20', date:'22/02/23'},
        {type:false, value:'R$ 20,30', date:'22/02/23'},
        {type:false, value:'R$ 130,20', date:'22/02/23'},
        {type:true, value:'R$ 200,00', date:'22/02/23'}
    ])

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

    function editValueReset(numberTyped){
        const formatNumber = new Intl.NumberFormat('pt-BR', {
            style:'currency',
            currency:'BRL'
        })

        if(numberTyped.length >= 3){
            setVlReset(formatNumber.format(`${numberTyped.slice(-numberTyped.length, -2)}.${numberTyped.slice(-2)}`));
        }else if(numberTyped.length == 1){
            setVlReset(formatNumber.format(`0.0${numberTyped}`));
        }else if(numberTyped.length == 2){
            setVlReset(formatNumber.format(`0.${numberTyped}`));
        }else{
            setVlReset(formatNumber.format(0));
        }
    }

    function defValue(number){
        setVlSaldo(number);
        setModalReset(false);
    }

    function addValue(number){
        const formatNumber = new Intl.NumberFormat('pt-BR', {
            style:'currency',
            currency:'BRL'
        })

        let value = number ? number.replace(/\D/g, '').replace(/\s/g, '') : false;
        let value2 = vlSaldo ? vlSaldo.replace(/\D/g, '').replace(/\s/g, '') : false;

        value = `${value.slice(-value.length, -2)}.${value.slice(-2)}`;
        value2 = `${value2.slice(-value2.length, -2)}.${value2.slice(-2)}`;

        setVlSaldo(formatNumber.format(Number(value2) + Number(value)));
        
    }

    function removeValue(number){
        const formatNumber = new Intl.NumberFormat('pt-BR', {
            style:'currency',
            currency:'BRL'
        })

        let value = number ? number.replace(/\D/g, '').replace(/\s/g, '') : false;
        let value2 = vlSaldo ? vlSaldo.replace(/\D/g, '').replace(/\s/g, '') : false;

        value = `${value.slice(-value.length, -2)}.${value.slice(-2)}`;
        value2 = `${value2.slice(-value2.length, -2)}.${value2.slice(-2)}`;

        setVlSaldo(formatNumber.format(Number(value2) - Number(value)));
        
    }

    return(
        <ContainerScrollView>

            <Modal visible={modalReset} animationType='slide' transparent={true}>
                <ViewModal>
                    <Text style={{color:'#EFEFEF', fontSize:30, width:250, borderBottomWidth:1, borderBottomColor:'#fff', textAlign:'center'}}>{vlInputReset}</Text>
                    <InputTxt2 placeholder="R$" placeholderTextColor='#EFEFEF' keyboardType="numeric" onChangeText={(text)=>editValueReset(text)}/>
                    <Btt colorBtt={'#F66B0E'} style={{marginTop:20}} onPress={(e)=>defValue(vlInputReset)}>OK</Btt>
                
                </ViewModal>
            </Modal>

            <TxtSaldo>{vlSaldo}</TxtSaldo>

            <TextInputText>{vlInput}</TextInputText>
            <InputTxt keyboardType="numeric" onChangeText={(txt)=>editValue(txt)}/>

            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Btt colorBtt={"#157347"} onPress={()=>addValue(vlInput)}>ADICIONAR</Btt>
                <Btt colorBtt={"#BB2D3B"} onPress={()=>removeValue(vlInput)}>REMOVER</Btt>
            </View>
            <View style={{backgroundColor:"#205375", paddingHorizontal:20, paddingVertical:20}}>
                {postedValues.map((el, index)=>{
                    console.log(el.type);
                    return <Card key={index}><TxtValor colorValor={el.type}>{el.type ? '+':'-'} {el.value}</TxtValor><Text style = {{color:"#EFEFEF", fontSize:20}}>{el.date}</Text></Card>
                })}
            </View>

            <BttReset onPress={(e)=>setModalReset(true)}>RESET</BttReset>
        </ContainerScrollView>
    )
}