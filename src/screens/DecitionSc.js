/**
 * Esta es la Primera pantalla, donde se mostrarán las direcciones agregadas por el usuario,
 * Se reciben las direcciones del MainStack y este a su vez del App.js.
 * Esta pantalla es la primera en mostrarse y redirige tanto a MainSc.js como a PaysSc.js
 */
import React from 'react'
import {StyleSheet} from 'react-native'
import {Button, Text, View} from 'native-base'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';

export default class DecitionSc extends React.Component {
    
    async componentDidMount() {
        await Font.loadAsync({
           Roboto: require('native-base/Fonts/Roboto.ttf'),
           Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
           ...Ionicons.font,
        })
    }

    render(){
        const { navigation } = this.props  //Para navegación entre pantallas
        return (
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'space-around'}}>
                <View style={{justifyContent:'center', alignItems:'flex-start', marginHorizontal:50}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>¿Qué gusta hacer?</Text> 
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}> 
                    <Button onPress={() => navigation.navigate('Main')}> 
                        <Text>Sección Direcciones</Text>
                    </Button>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Button> 
                        <Text>Sección Pagos</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
