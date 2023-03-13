import React, {useState, useRef} from "react";
import { View, Text, Modal} from "react-native";
import { ContainerScrollView, TxtSaldo, TxtValor, InputTxt, InputTxt2, Btt, Card, BttReset, ViewModal } from "./styles";

let numbers = [];

const formatNumber = new Intl.NumberFormat('pt-BR', {
    style:'currency',
    currency:'BRL',
})

export default function App(){
    
    const [vlInput, setVlInput] = useState('R$ 0,00');
    const [vlSaldo, setVlSaldo] = useState(formatNumber.format('200'));
    const [vlInputReset, setVlReset] = useState(null);
    const [modalReset, setModalReset] = useState(false);

    const inputVlRef = useRef(null);
    const inputVlResetRef = useRef(null);

    const [postedValues, setPostedValues] = useState([]);

    function editValue(key){

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
                    setVlInput('R$ 0,00');
                    break;
                case 1:
                    setVlInput(`R$ 0,0${numbers[0]}`);
                    break;
                case 2:
                    setVlInput(`R$ 0,${numbers.join('')}`);
                    break;
                case 3:
                    setVlInput(`R$ ${numbers[0]},${numbers.slice(1).join('')}`);
                    break;
                case 4:
                    setVlInput(`R$ ${numbers.slice(0, 2).join('')},${numbers.slice(2).join('')}`);
                    break;
                case 5:
                    setVlInput(`R$ ${numbers.slice(0, 3).join('')},${numbers.slice(3).join('')}`);
                    break;
                case 6:
                    setVlInput(`R$ ${numbers[0]}.${numbers.slice(1,4).join('')},${numbers.slice(4).join('')}`);
                    break;
                case 7:
                    setVlInput(`R$ ${numbers.slice(0, 2).join('')}.${numbers.slice(2,5).join('')},${numbers.slice(5).join('')}`);
                    break;
                case 8:
                    setVlInput(`R$ ${numbers.slice(0,3).join('')}.${numbers.slice(3,6).join('')},${numbers.slice(6).join('')}`);
                    break;
            }
        }else{
            numbers.pop()
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

            <InputTxt  value={vlInput} keyboardType="numeric" onKeyPress={(e)=>editValue(e.nativeEvent.key)}/>

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