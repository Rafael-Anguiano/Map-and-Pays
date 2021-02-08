/**
 * Primera pantalla en cargarse, aquí se encuentran todas las variables de las direcciones
 * Para poder realizar cambios en las variables desde toda pantalla siguiente
 * Esta pantalla envía a MainStack
 */
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';
import * as firebase from 'firebase'
import 'firebase/firestore';
//Views Importadas
import MainStack from './src/Navigation/MainStack';

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

export default class App extends React.Component {
  
  constructor(){
    super()
    this.state = {
        //Variables para SecundSc y map
        direccion: "",  //Variable Final
        street: "",     //Calle de direccion
        number: "",     //Número de dirección
        district: "",   //Colónia de dirección
        city: "",       //Ciudad de dirección
        disable: false, //Estado de los botones
        //Variables para Map
        userLat: null, //
        userLon: null,
        //Variables para carga
        appIsReady: false,
        timer: false
    }
  }

  //Primero en cargar
  async componentDidMount() {
    //Componentes de carga de las pestañas
    const doc = await consulta.get();
    if (!doc.exists) { //Busca existencia de información en base de datos
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
    //Componentes de carga de la pantalla de carga
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
    //Fonts para botones
    await Font.loadAsync({
       Roboto: require('native-base/Fonts/Roboto.ttf'),
       Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
       ...Ionicons.font,
    })
  }

  //En caso de actualización de estado
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

  //Prepara todo antes de quitar la pantalla de carga
  prepareResources = async () => {
    try {
      await performAPICalls();
      await downloadAssets();
    } catch (e) {
      console.warn(e);
    } finally {
      this.setState({ appIsReady: true }, async () => {
        await SplashScreen.hideAsync();
      });
    }
  };

  //RENDER
  render(){
    if (!this.state.appIsReady) {
      return (
        <View style={{flex:1, backgroundColor:"gray", alignItems:'center', justifyContent:'center'}}>
          <Text>Soy la pantalla de carga 👋</Text>
        </View>
      );
    }

    return (
      <MainStack
        //Para Main
        direccion={this.state.direccion} 
        disable={this.state.disable}
        //Para Secund
        street={this.state.street}
        number={this.state.number} 
        district={this.state.district}  
        city={this.state.city} 
        addStreet={this.addStreet} 
        addNumber={this.addNumber} 
        addDistrict={this.addDistrict} 
        addCity={this.addCity} 
        addToDireccion={this.addToDirections}
        //Para Map
        userLat={this.state.userLat} 
        userLon={this.state.userLon}
        address={this.address}
      />
    );
  }
  
}

async function performAPICalls() {}
async function downloadAssets() {}

