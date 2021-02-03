/**
 * Primera pantalla en cargarse, aquí se encuentran todas las variables de las direcciones
 * Para poder realizar cambios en las variables desde toda pantalla siguiente
 * Esta pantalla envía a MainStack
 */
import React from 'react';
import { StyleSheet, Alert} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';

//Views Importadas
import MainStack from './src/Navigation/MainStack';

export default class App extends React.Component {

  async componentDidMount() {
    await Font.loadAsync({
       Roboto: require('native-base/Fonts/Roboto.ttf'),
       Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
       ...Ionicons.font,
    })
}

  render(){
    return (
      <MainStack/>
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
