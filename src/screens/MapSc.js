import React  from 'react'
import MapView, { Marker} from 'react-native-maps';
import {View, StyleSheet, Dimensions} from 'react-native'
import * as Location from 'expo-location';
import { Button , Text} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class MapSc extends React.Component {
  
  constructor() {
    super()
    this.state = { 
      mkLat: 0, //latitud del marcador
      mkLon: 0, //longitud del marcador
    };
  }
  async componentDidMount() {   //posición inicial del marcador
    Location.setGoogleApiKey("AIzaSyBWsGlLDk-R4fpSNKYIt4zzN5tF5nH22QU")
    this.setState({ //Definiendo las coordenadas iniciales
        mkLat: this.props.userLat, 
        mkLon: this.props.userLon
    })
    Font.loadAsync({ 
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
   });
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container} >
        <MapView //Mapa y sus atributos
          provider={null}
          initialRegion={{
            latitude: this.props.userLat,
            longitude: this.props.userLon,
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
          onPoiClick={(e) => 
            {this.setState({
              mkLat: e.nativeEvent.coordinate.latitude, 
              mkLon: e.nativeEvent.coordinate.longitude
            })
          }}
          style={{flex: 9, width:Dimensions.get('window').width, height:Dimensions.get('window').height}} ///*6/10
        >
          <Marker //Marcador del mapa
            coordinate={{latitude: this.state.mkLat, longitude: this.state.mkLon}} //Posición del marcador
            title="Start Point" //titulo del marcador
            //description="This is your location"   //Mensaje del marcador
            image={require('./images/marker.png')} //Imagen del marcador
            draggable={true} //desplazable
            onDragEnd={(e) => this.setState({mkLat: e.nativeEvent.coordinate.latitude, mkLon: e.nativeEvent.coordinate.longitude})} 
          />
        </MapView>
        <View style={{flex:1, margin:15}}>
          <Button success rounded onPress={()=>{this.props.address(this.state.mkLat, this.state.mkLon), navigation.navigate('Main')}}>
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
      flex:9,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
