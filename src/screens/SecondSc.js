/**
 * En esta pantalla se le pide una dirección escrita al usuario para guardar
 * Se llega mediante la MainSc y puede redirigir a MapSc
 */
import React from 'react';
import { StyleSheet, TextInput, Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {Button, Text, View, Input, Item, Label} from 'native-base';

export default class SecondSc extends React.Component {
    
    //Pregunta por permisos para el mapa y hubicación
    async grantPermisions() {
        const { navigation } = this.props  //Para navegación entre pantallas
        const { status } = await Permissions.askAsync(Permissions.LOCATION); //Petición de permisos
        
        if (status !== 'granted') {     //Compara si el permiso se garantizó
            this.permissionError();
        } else {
            navigation.navigate('Map')  //Envía al la pantalla de MAP una vez con el permiso de localización
            //return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
           Roboto: require('native-base/Fonts/Roboto.ttf'),
           Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
           ...Ionicons.font,
        })
    }

    permissionError = () => { 
        Alert.alert(
            "Permissions", //Titulo de la alerta
            "To see the map please allow the location on Permissions", //Body de la alerta
            [
                { text:"OK" } //Opciones del mensaje
            ],
            {cancelable:false}
        )
    }
    
    render(){
        const { navigation } = this.props  //Para navegación entre pantallas
        return (
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'space-around'}}>
                <View style={{flexDirection:'column',justifyContent:'flex-start', alignItems:'flex-start', height:'50%',margin:50}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>Ingresar Dirección</Text>
                    <View style={{justifyContent:'flex-start', alignItems:'flex-start',margin:10, width:"100%", height:"60%"}}>
                        <Item  floatingLabel underline style={{margin:5, borderBottomColor:"green"}}>
                            <Label>* Calle: </Label>
                            <Input 
                                onChangeText={this.props.addStreet}
                                defaultValue={this.props.street}
                            />
                        </Item>
                        <Item  floatingLabel underline style={{margin:5, borderBottomColor:"green"}}>
                            <Label>* Número: </Label>
                            <Input 
                                onChangeText={this.props.addNumber}
                                defaultValue={this.props.number}
                                keyboardType="numeric"
                                maxLength={5}
                            />
                        </Item>
                        <Item  floatingLabel underline style={{margin:5, borderBottomColor:"green"}}>
                            <Label>* Colónia</Label>
                            <Input 
                                onChangeText={this.props.addDistrict}
                                defaultValue={this.props.district}
                            />
                        </Item>
                        <Item  floatingLabel underline style={{margin:5, marginBottom:15, borderBottomColor:"green"}}>
                            <Label>* Ciudad: </Label>
                            <Input 
                                onChangeText={this.props.addCity}
                                defaultValue={this.props.city}
                            />
                        </Item>
                        <Button
                            disabled={this.props.disable}
                            style={{backgroundColor:'green'}}
                            onPress={()=>{
                                this.props.addToDireccion(), 
                                navigation.navigate('Main')
                            }}
                        >
                            <Text>Guardar</Text>
                        </Button>
                    </View>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Button disabled={this.props.disable} onPress={() => this.grantPermisions()}> 
                        <Text>Elegir desde el mapa</Text>
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
