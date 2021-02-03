/**
 * Codigo encargado de la navegación y enviar las referencias de los datos a las pantallas que los necesitan
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';
//Vistas
import MainSc from '../screens/MainSc'
import SecondSc from '../screens/SecondSc'
import MapSc from '../screens/MapSc'

const Stack = createStackNavigator();

export default class MainStack extends React.Component {

    constructor(){
        super()
        this.state = {
            //Variables para SecundSc
            direccion: "",
            disable: false,
            texto: "",
            //Variables para Map
            userLat: null, //
            userLon: null
        }
    }

    async componentDidMount() {
        const {coords} = await Location.getCurrentPositionAsync();  //Consiguiendo ubicación del usuario
        this.setState({ //Definiendo las coordenadas iniciales
            userLat: coords.latitude, 
            userLon: coords.longitude
        }) 
    }

    addDirection = (value)=>{
        this.setState({texto: value})
    }

    addToDirections = () => {
        this.setState({
            direccion: this.state.texto,
            disable: true,
            texto: ""
        })
    }
    
    address = async (lat, lon) =>{
        let addss = await Location.reverseGeocodeAsync({
            latitude: lat, 
            longitude: lon
        })
        console.log(addss[0])
        this.setState({direccion: addss[0].street+" "+addss[0].name+", "+addss[0].district})
    }

    render(){
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Main" options={{title: 'Main Screen', headerShown:false}}>
                        {props => <MainSc 
                            {...props} 
                            direccion={this.state.direccion} 
                            disable={this.state.disable}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Second" options={{title: 'Nueva Direccións', headerShown:true}}>
                        {props => <SecondSc 
                            {...props} 
                            texto={this.state.texto} 
                            addDireccion={this.addDirection} 
                            addToDireccion={this.addToDirections} 
                            disable={this.state.disable} />}
                    </Stack.Screen>
                    <Stack.Screen name="Map" options={{title: 'Map Screen', headerShown:true}}>
                        {props => <MapSc 
                            {...props} 
                            userLat={this.state.userLat} 
                            userLon={this.state.userLon}
                            address={this.address}
                            />
                        }
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