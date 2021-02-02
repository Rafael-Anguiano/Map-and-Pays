/**
 * Esta es la Primera pantalla, donde se mostrarán las direcciones agregadas por el usuario,
 * Se reciben las direcciones del MainStack y este a su vez del App.js.
 * Esta pantalla es la primera en mostrarse y redirige a SecondSc.js
 */
import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {Button, Text, View} from 'native-base'

export default class MainSc extends React.Component {
    render(){
        const { navigation } = this.props  //Para navegación entre pantallas
        const ubicación = ' nueva'
        return (
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'space-around'}}>
                <View style={{justifyContent:'center', alignItems:'flex-start', marginHorizontal:50}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>Mi Dirección</Text> 
                </View>
                <View style={{justifyContent:'flex-start', alignItems:'flex-start', marginHorizontal:50}}>
                    <Text>{this.props.direccion}</Text>
                </View>
                
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Button disabled={this.props.disable} onPress={() => navigation.navigate('Second')}> 
                        <Text>Agregar{ubicación} ubicación</Text>
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
