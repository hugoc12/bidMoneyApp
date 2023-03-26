import React, {useEffect, useState, useCallback} from "react";
import { View, Modal, FlatList} from "react-native";
import { TxtSaldo, Btt, BttReset, ViewModal, InputTxt } from "./styles";
import Card from "./components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

let formatNumber = new Intl.NumberFormat('pt-BR', {
    style:'currency',
    currency:'BRL',
})

let numbers = [];

export default function App(){
    const [vlInput, setVlInput] = useState('R$ 0,00');
    const [vlInputReset, setVlReset] = useState('R$ 0,00');
    const [vlSaldo, setVlSaldo] = useState(formatNumber.format('-250.00'));
    const [modalReset, setModalReset] = useState(false);
    const [postedValues, setPostedValues] = useState([]);

    useEffect(()=>{
        async function findData(){
            try{
                const saldo = await AsyncStorage.getItem('@saldo');
                const extratoStr = await AsyncStorage.getItem('@extrato');
                const extratoArr = extratoStr.split('|').map((el)=>JSON.parse(el));
                setVlSaldo(saldo);
                setPostedValues(extratoArr);
            }catch(err){
                console.log('err');
            }
        }
        findData()
    }, [])

    function defValueReset(number){ 
        let date = new Date();
    
        setVlSaldo(number);
        setPostedValues([]);
        setVlReset('R$ 0,00');
        setModalReset(false);
        
        
        saveData(number, [{type:true, value:`${number}`, date:`${date.getHours(date)}h${date.getMinutes(date)}m - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}]);
        setPostedValues([{type:true, value:`${number}`, date:`${date.getHours(date)}h${date.getMinutes(date)}m - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}]);
        numbers = [];
    }

    const defineNewValue = useCallback((number, type)=>{
        let valorSaldo = vlSaldo.replace(/-{0,1}R\$/, '').replace(/\./g, '').replace(',', '.').replace(/\s/, '');
        let valorInput = number.replace(/-{0,1}R\$/, '').replace(/\./g, '').replace(',', '.').replace(/\s/, '');
        
        let date = new Date();
        if(vlSaldo[0] == '-'){
            valorSaldo = Number(valorSaldo) * -1; // Negativando o valor antes do calculo, caso o saldo seja negativo.
        }

        if(type){
            setVlSaldo(formatNumber.format(Number(valorSaldo) + Number(valorInput)));
            saveData(formatNumber.format(Number(valorSaldo) + Number(valorInput)), [{type:type, value:`${formatNumber.format(valorInput)}`, date:`${date.getHours(date)}h${date.getMinutes(date)}m - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}, ...postedValues]);
        }else{
            setVlSaldo(formatNumber.format(Number(valorSaldo) - Number(valorInput)));
            saveData(formatNumber.format(Number(valorSaldo) - Number(valorInput)), [{type:type, value:`${formatNumber.format(valorInput)}`, date:`${date.getHours(date)}h${date.getMinutes(date)}m - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}, ...postedValues]);
        }

        setPostedValues([{type:type, value:`${formatNumber.format(valorInput)}`, date:`${date.getHours(date)}h${date.getMinutes(date)}m - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}, ...postedValues])
        setVlInput('R$ 0,00');
        numbers = [];
    })

    const formatingCurrency = useCallback((key, setValue)=>{
        if(key == 'Backspace'){
            numbers.pop();
        }else if(RegExp(/[0-9]/g).test(key)){
            if(key == '0' && numbers.length == 0){
                return // não adicionar
            }else{
                numbers.push(key);
            }
        }

        if(numbers.length <= 8){
            switch(numbers.length){
                case 0:
                    setValue('R$ 0,00');
                    break;
                case 1:
                    setValue(`R$ 0,0${numbers[0]}`);
                    break;
                case 2:
                    setValue(`R$ 0,${numbers.join('')}`);
                    break;
                case 3:
                    setValue(`R$ ${numbers[0]},${numbers.slice(1).join('')}`);
                    break;
                case 4:
                    setValue(`R$ ${numbers.slice(0, 2).join('')},${numbers.slice(2).join('')}`);
                    break;
                case 5:
                    setValue(`R$ ${numbers.slice(0, 3).join('')},${numbers.slice(3).join('')}`);
                    break;
                case 6:
                    setValue(`R$ ${numbers[0]}.${numbers.slice(1,4).join('')},${numbers.slice(4).join('')}`);
                    break;
                case 7:
                    setValue(`R$ ${numbers.slice(0, 2).join('')}.${numbers.slice(2,5).join('')},${numbers.slice(5).join('')}`);
                    break;
                case 8:
                    setValue(`R$ ${numbers.slice(0,3).join('')}.${numbers.slice(3,6).join('')},${numbers.slice(6).join('')}`);
                    break;
            }
        }else{
            numbers.pop()
        }
    })

    async function saveData(saldo, extrato){
        let arrExtrato = extrato.map((el)=>JSON.stringify(el)); // "{\"key\":data}" -> Retorna o formato de objString que o JSON.parse irá permitir ("key")
        try{
            await AsyncStorage.setItem('@saldo', saldo);
            await AsyncStorage.setItem('@extrato', arrExtrato.join('|'));
        }catch(err){
            console.log('Erro ao salvar dado!');
        }
        
    }

    return(
        <View style={{flex: 1, backgroundColor:'#112B3C'}}>

            <Modal visible={modalReset} animationType='slide' transparent={true}>
                <ViewModal>
                    <InputTxt maxLength={vlInputReset.length} value={vlInputReset} placeholder='R$ 0,00' placeholderTextColor='#fff' keyboardType="numeric" onKeyPress={(e)=>formatingCurrency(e.nativeEvent.key, setVlReset)}></InputTxt>
                    <Btt colorBtt={'#F66B0E'} style={{marginTop:20}} onPress={(e)=>defValueReset(vlInputReset)}>OK</Btt>
                </ViewModal>
            </Modal>

            <TxtSaldo>{vlSaldo}</TxtSaldo>
            <InputTxt maxLength={vlInput.length} value={vlInput} placeholder='R$ 0,00' placeholderTextColor='#fff' keyboardType="number-pad" onKeyPress={(e)=>{e.stopPropagation(); formatingCurrency(e.nativeEvent.key, setVlInput)}}></InputTxt>

            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Btt colorBtt={"#157347"} onPress={()=>defineNewValue(vlInput, true)}>ADICIONAR</Btt>
                <Btt colorBtt={"#BB2D3B"} onPress={()=>defineNewValue(vlInput, false)}>REMOVER</Btt>
            </View>

            <FlatList data={postedValues} renderItem={({item})=><Card obj={item}></Card>} style={{backgroundColor:"#205375", paddingHorizontal:20, paddingVertical:20}}/>

            <BttReset onPress={(e)=>{setModalReset(true); numbers = []}}>RESET</BttReset> 
        </View>
    )
}