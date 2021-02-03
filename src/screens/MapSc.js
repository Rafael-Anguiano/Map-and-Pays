import React  from 'react'
import MapView, { Marker} from 'react-native-maps';
import {View, StyleSheet, Dimensions} from 'react-native'
import * as Location from 'expo-location';
import { Button , Text} from 'native-base';

export default class MapSc extends React.Component {
  
  constructor() {
    super()
    this.state = { 
      mkLat: 0, //latitud del marcador
      mkLon: 0, //longitud del marcador
      aLat: null, //Latitud punto A
      aLon: null, //Longitud punto A
    };
  }
  async componentDidMount() {
    this.setState({ //Definiendo las coordenadas iniciales
        mkLat: this.props.userLat, 
        mkLon: this.props.userLon
    }) 
  }

  Apoint(h, l){  //Esta función hace el set de el punto A en el constructor
    this.setState({ aLat: h, aLon: l }) 
  }

  prueba(){
    var result = Location.reverseGeocodeAsync({latitude: this.state.mkLat, longitude: this.state.mkLon})
    console.log(result.country)
  }


  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container} >
        <MapView 
          provider="google"
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
          <Button success rounded onPress={()=>{this.prueba()}}>
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
