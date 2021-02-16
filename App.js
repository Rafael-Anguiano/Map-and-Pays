/**
 * Primera pantalla en cargarse, aquí se encuentran todas las variables de las direcciones
 * Para poder realizar cambios en las variables desde toda pantalla siguiente
 * Esta pantalla envía a MainStack
 */
import React from 'react';
import { Text, View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';
import * as firebase from 'firebase'
import 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
//Views Importadas
import MainStack from './src/Navigation/MainStack';

//Configuración para firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjlhxDov6xAApWujA1eBooKTum_Yuvkjs",
  authDomain: "hk-directions.firebaseapp.com",
  databaseURL: "https://hk-directions-default-rtdb.firebaseio.com",
  projectId: "hk-directions",
  storageBucket: "hk-directions.appspot.com",
  messagingSenderId: "115579744590",
  appId: "1:115579744590:web:809f51b091efffae80ae1f"
}
firebase.initializeApp(firebaseConfig); //Inicialización de firebase
//Variables para base de datos en firebase
const dbh = firebase.firestore();
const consulta = dbh.collection('direccion').doc('iP2Kd5R7KkWt5SQzzdwo');

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
        //Variable Final
        direccion: "", 
        //Variables para SecundSc y map
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
        timer: false,
        //Notificaciones
        expoPushToken: null,
        timeinterval: 2000,
        //Pagos
        amount: null
    }
  }

  //Primero en cargar
  async componentDidMount() {
      //Consulta en base de datos
    const doc = await consulta.get();
    if (!doc.exists) { //Busca existencia de información en base de datos
        console.log('No such document!');
        alert("No hay conexión a internet")
    } else {
        console.log('Document data:', doc.data().place);
    }
    this.setState({direccion: doc.data().place})
    console.log("Acabó consulta de datos")
      //Ubicación
    const {coords} = await Location.getCurrentPositionAsync();  //Consiguiendo ubicación del usuario
    this.setState({ //Definiendo las coordenadas iniciales
        userLat: coords.latitude, 
        userLon: coords.longitude
    })
    console.log("Acabó Ubicacion del Usuario")
      //Notificaciones
    await this.prepareNotification();
    console.log("Acabó Notificaciones")
      //Pagos
    this.gettingAmount()
      //Componentes de carga de la pantalla de carga
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    await this.prepareResources();
    console.log("Acabó Splash Screen")
  }

  //En caso de actualización de estado
  async componentDidUpdate(prevState){
      // Pregunto si la dirección cambio
      if(prevState.direccion !== this.state.direccion){
          // Verifico que la dirección no sea vacía
          if(this.state.direccion !== ""){
              // Consulto en la base de datos que sea diferente
              const doc = await consulta.get();
              if(this.state.direccion !== doc.data().place){
                //Realizar cambio
                await  consulta.set({ //Guardo en base de datos la dirección
                  place: this.state.direccion
                })
                console.log("Voy a enviar notificación")
                this.sendPushNotification() //Envío a función para mandar notificación
              }
          }
      }
    console.log("DidUpdate")
  }

  //Guarda la calle ingresada en la segunda pantalla
  addStreet = (value)=>{
    if(!value.exists){
      value = ""
    }
  this.setState({street: value})
  }
  //Guarda el número ingresado en la segunda pantalla
  addNumber = (value)=>{
    if(!value.exists){
      value = ""
    }
    this.setState({number: value})
  }
  //Guarda la colonia ingresada en la segunda pantalla
  addDistrict = (value)=>{
    if(!value.exists){
      value = ""
    }
    this.setState({district: value})
  }
  //Guarda la ciudad ingresada en la segunda pantalla
  addCity = (value)=>{
    if(!value.exists){
      value = ""
    }
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
    //Verificando que existan los datos y si no guardar vacío
    if (addss[0].street == null) {
      addss[0].street = ""      
    }
    if (addss[0].name == null) {
      addss[0].name = ""      
    }
    if (addss[0].district == null) {
      addss[0].district = ""      
    }
    if (addss[0].city == null) {
      addss[0].city = ""      
    }
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

  gettingAmount(){
    let random = Math.floor(Math.random()*1000)+1
    this.setState({amount: random})
  }

  //Preparando para notificationes
  async prepareNotification() {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Se necesitan permisos para recibir notificaciones');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      this.setState({expoPushToken: token.data})
    } else {
      alert('Estas usando un emulador, por favor usa un dispositivo físico');
    }
    console.log("Token en state: ", this.state.expoPushToken)
  };

  //Enviando Notificaciones
  async sendPushNotification() {
    //Envío una primera notificación de la enviada a base de datos
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Guardado exitoso",
        body: 'Se guardó exitosamente la ubicación: '+this.state.direccion,
      },
      trigger: {
        seconds: 2,
      },
    });
    //Segunda notificación del envío a base de datos
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Recordatorio",
        body: 'Se guardó exitosamente la ubicación: '+this.state.direccion,
      },
      trigger: {
        seconds: 30,
      },
    });
    console.log("Envío notificación")
  }

  //RENDER
  render(){
    if (!this.state.appIsReady) {
      return (
        <View style={{flex:1, backgroundColor:"gray", alignItems:'center', justifyContent:'center'}}>
          <Text>Cargando</Text>
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
        addToDirections={this.addToDirections}
        //Para Map
        userLat={this.state.userLat} 
        userLon={this.state.userLon}
        address={this.address}
        amount={this.state.amount}
      />
    );
  }
  
}

async function performAPICalls() {}
async function downloadAssets() {}

/*const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Guardado exitoso',
      body: 'Se guardó con exito la ubicación:'+ direccion ,
      //data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });*/