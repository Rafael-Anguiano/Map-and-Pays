/**
 * Primera pantalla en cargarse, aquí se encuentran todas las variables de las direcciones
 * Para poder realizar cambios en las variables desde toda pantalla siguiente
 * Esta pantalla envía a MainStack
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
//Views Importadas
import MainStack from './src/Navigation/MainStack';

export default class App extends React.Component {
  //Aquí están todas las variables globales utilizadas para las direcciones
  constructor(){
    super();
    this.state = { 
      direcciones: [],
      direccion:"",
    }
  }

  async componentDidMount() {
    //Estos estilos de "Font" no son necesarios, pero el no tenerlos genera un "warning" en expo.
    //await Font.loadAsync({
    //  Roboto: require('native-base/Fonts/Roboto.ttf'),
    //  Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    //  ...Ionicons.font,
    //});
  }

  writeDirection = (value) => {
    alert("Estoy imprimiendo el objeto"+ {value})
    console.log("Aquí está el valor: " + {value})
    //this.setState({texto: value})
    //alert(this.state.texto)
  }

  render(){
    return (
      <MainStack eDireccion= {this.writeDirection}/>
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
