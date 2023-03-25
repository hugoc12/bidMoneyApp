import {View} from 'react-native';
import { styleCard } from './style';
import { TxtValor } from '../../styles';
import { Text } from 'react-native';
import { memo } from 'react';

function Card(props){

    return(
        <View style={styleCard}>
            <TxtValor colorValor={props.obj['type']}>{props.obj['type'] ? '+ ':'- '} {props.obj['value']}</TxtValor><Text style = {{color:"#EFEFEF", fontSize:18}}>{props.obj['date']}</Text>
        </View>
    )
}

export default memo(Card);