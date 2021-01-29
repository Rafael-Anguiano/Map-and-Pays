/**
 * Codigo encargado de la navegación y enviar las referencias de los datos a las pantallas que los necesitan
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainSc from '../screens/MainSc'
import SecondSc from '../screens/SecondSc'
import MapSc from '../screens/MapSc'

const Stack = createStackNavigator();

export default class MainStack extends React.Component {
    render(){
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Main" component={MainSc} options={{title: 'Main Screen', headerShown:false}}/>
                    <Stack.Screen name="Second" component={SecondSc} options={{title: 'Second Screen', headerShown:true}}/>
                    <Stack.Screen name="Map" component={MapSc} options={{title: 'Map Screen', headerShown:true}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
//wDirection={this.props.escribirDireccion}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*                  <Stack.Screen 
                        name="Second" 
                        component={SecondSc} 
                        options={{title: 'Second Screen'}} 
                        wDirection={this.props.eDireccion}
                    />
*/