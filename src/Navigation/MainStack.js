/**
 * Codigo encargado de la navegación y enviar las referencias de los datos a las pantallas que los necesitan
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
//Vistas
import MainSc from '../screens/MainSc'
import SecondSc from '../screens/SecondSc'
import MapSc from '../screens/MapSc'
import DecitionSc from '../screens/DecitionSc'
import PaysSc from '../screens/PaysSc'

const Stack = createStackNavigator();

export default class MainStack extends React.Component {
    render(){
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" options={{title: 'Decition', headerShown:false}}>
                        {props => <DecitionSc 
                            {...props} 
                            
                            />}
                    </Stack.Screen>
                    <Stack.Screen name="Main" options={{title: 'Direcciones', headerShown:true}}>
                        {props => <MainSc 
                            {...props} 
                            direccion={this.props.direccion} 
                            disable={this.props.disable}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Second" options={{title: 'Nueva Dirección', headerShown:true}}>
                        {props => <SecondSc 
                            {...props} 
                            street={this.props.street}
                            number={this.props.number} 
                            district={this.props.district}  
                            city={this.props.city} 
                            addStreet={this.props.addStreet} 
                            addNumber={this.props.addNumber} 
                            addDistrict={this.props.addDistrict} 
                            addCity={this.props.addCity} 
                            addToDirections={this.props.addToDirections} 
                            disable={this.props.disable} />}
                    </Stack.Screen>
                    <Stack.Screen name="Map" options={{title: 'Mapa', headerShown:true}}>
                        {props => <MapSc 
                            {...props} 
                            userLat={this.props.userLat} 
                            userLon={this.props.userLon}
                            address={this.props.address}
                            />
                        }
                    </Stack.Screen>
                    <Stack.Screen name="Pays" options={{title: 'Sección de Pagos', headerShown:true}}>
                        {props => <PaysSc 
                            {...props} 
                            
                            />}
                    </Stack.Screen>
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