import React  from 'react'
import MapView, { Marker} from 'react-native-maps';
import {View, StyleSheet, Dimensions} from 'react-native'
import * as Location from 'expo-location';
import { Button , Text} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

export default class MapSc extends React.Component {
  
  constructor() {
    super()
    this.state = {
      userLat: 1, //Latitud del usuario
      userLon: 1, //longitud del usuario
      // marker: {
      //  latitude: null,
      //  longitude: null,
      //}, 
      mkLat: 20.6357732, //latitud del marcador
      mkLon: -103.4295029, //longitud del marcador
      aLat: null, //Latitud punto A
      aLon: null, //Longitud punto A
      bLat: null, //Latitud punto B
      bLon: null, //Longitud punto B
      status: "Please select the Start Point"
    };
  }
  async componentDidMount() {
    const {coords} = await Location.getCurrentPositionAsync();  //Consiguiendo ubicación del usuario
    this.setState({ userLat: coords.latitude, userLon: coords.longitude, mkLat: coords.latitude, mkLon: coords.longitude}) //Definiendo las coordenadas
    this.setState({mkLat: this.state.userLat, mkLon: this.state.userLon})
  }

  Apoint(h, l){  //Esta función hace el set de el punto A en el constructor
    this.setState({ aLat: h, aLon: l , status:"Now select the End Point"}) 
  }

  Bpoint(h, l){  //Esta función hace el set de el punto A en el constructor
    this.setState({ bLat: h, bLon: l})

  }


  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container} >
        <MapView 
          provider="google"
          initialRegion={{
            latitude: this.state.userLat,
            longitude: this.state.userLon,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          }}
          region={{
            latitude: this.state.mkLat,
            longitude: this.state.mkLon,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          }}
          followsUserLocation = {true}
          showsUserLocation = {true}
          showsCompass={true} //Brujula
          showsMyLocationButton = {true}
          showsPointsOfInterest={true} 
          showsBuildings={true} //Edificios
          showsTraffic={false} //Trafico
          zoomControlEnabled={true}
          onPoiClick={(e) => this.setState({mkLat: e.nativeEvent.coordinate.latitude, mkLon: e.nativeEvent.coordinate.longitude})}
          style={{flex: 9, width:Dimensions.get('window').width, height:Dimensions.get('window').height}} ///*6/10
        >
          <Marker
            coordinate={{latitude: this.state.mkLat, longitude: this.state.mkLon}} //Posición del marcador
            title="Start Point" //titulo del marcador
            //description="This is your location"   //Mensaje del marcador
            image={require('./images/marker.png')} //Imagen del marcador
            draggable={true} //desplazable
            onDragEnd={(e) => this.setState({mkLat: e.nativeEvent.coordinate.latitude, mkLon: e.nativeEvent.coordinate.longitude})} 
          />
        </MapView>
        <View style={{flex:1, margin:15}}>
          <Button success rounded onPress={()=>navigation.navigate('Main')}>
            <Text>Guardar ubicación</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
