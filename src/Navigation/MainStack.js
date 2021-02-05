/**
 * Codigo encargado de la navegación y enviar las referencias de los datos a las pantallas que los necesitan
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as firebase from 'firebase'
import 'firebase/firestore';
//Vistas
import MainSc from '../screens/MainSc'
import SecondSc from '../screens/SecondSc'
import MapSc from '../screens/MapSc'

const Stack = createStackNavigator();
const firebaseConfig = {
    apiKey: "AIzaSyBjlhxDov6xAApWujA1eBooKTum_Yuvkjs",
    authDomain: "hk-directions.firebaseapp.com",
    databaseURL: "https://hk-directions-default-rtdb.firebaseio.com",
    projectId: "hk-directions",
    storageBucket: "hk-directions.appspot.com",
    messagingSenderId: "115579744590",
    appId: "1:115579744590:web:809f51b091efffae80ae1f"
}
firebase.initializeApp(firebaseConfig);

const dbh = firebase.firestore();
const consulta = dbh.collection('direccion').doc('LsMRnWB2pIUhxgMbeD54');

export default class MainStack extends React.Component {
    constructor(){
        super()
        this.state = {
            //Variables para SecundSc
            direccion: "",  //Variable Final
            street: "",     //Calle de direccion
            number: "",     //Número de dirección
            district: "",   //Colónia de dirección
            city: "",       //Ciudad de dirección
            disable: false, //Estado de los botones
            //Variables para Map
            userLat: null, //
            userLon: null
        }
    }

    async componentDidMount() {
        const doc = await consulta.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            console.log('Document data:', doc.data().place);
        }
        this.setState({direccion: doc.data().place })
        const {coords} = await Location.getCurrentPositionAsync();  //Consiguiendo ubicación del usuario
        this.setState({ //Definiendo las coordenadas iniciales
            userLat: coords.latitude, 
            userLon: coords.longitude
        })
    }

    async componentDidUpdate(prevState){
        if(prevState.direccion !== this.state.direccion){
            console.log("Enviar a DB")
            if(this.state.direccion !== ""){
                await  consulta.set({
                    place: this.state.direccion,
                })
            }
            
        }
        console.log("Actualicé la db")
    }

    //Guarda la calle ingresada en la segunda pantalla
    addStreet = (value)=>{
        this.setState({street: value})
    }
    //Guarda el número ingresado en la segunda pantalla
    addNumber = (value)=>{
        this.setState({number: value})
    }
    //Guarda la colonia ingresada en la segunda pantalla
    addDistrict = (value)=>{
        this.setState({district: value})
    }
    //Guarda la ciudad ingresada en la segunda pantalla
    addCity = (value)=>{
        this.setState({city: value})
    }

    //Agrega la información de "texto" a "direccion", limpia "texto" y deshabilita botones
    addToDirections = () => { 
        this.setState({
            direccion: this.state.street+" "+this.state.number +", "+this.state.district+", "+this.state.city,
            //disable: true, //Deshabilita botones
        })
    }
    
    //Consiguiendo los datos de ubicación desde lat y lon. Provenientes de MapSc
    address = async (lat, lon) =>{
        let addss = await Location.reverseGeocodeAsync({
            latitude: lat, 
            longitude: lon
        })
        console.log(addss[0])
        this.setState({     //Guarda la información del lugar en "direccion"
            direccion: addss[0].street+" "+addss[0].name+", "+addss[0].district+", "+addss[0].city,
            street: addss[0].street,
            number: addss[0].name,
            district: addss[0].district,
            city: addss[0].city,
            //disable: true //Deshabilita botones
        })
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
                            street={this.state.street}
                            number={this.state.number} 
                            district={this.state.district}  
                            city={this.state.city} 
                            addStreet={this.addStreet} 
                            addNumber={this.addNumber} 
                            addDistrict={this.addDistrict} 
                            addCity={this.addCity} 
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