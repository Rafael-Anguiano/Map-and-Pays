/**
 * En esta pantalla se le pide una dirección escrita al usuario para guardar
 * Se llega mediante la MainSc y puede redirigir a MapSc
 */
import React from 'react';
import { StyleSheet, TextInput, Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import {Button, Text, View, Input, Item, Label} from 'native-base';
import {connect} from 'react-redux'
import DirectionForm from '../Forms/DirectionForm'

class SecondSc extends React.Component {
    
    async grantPermisions() {
        const { navigation } = this.props  //Para navegación entre pantallas
        const { status } = await Permissions.askAsync(Permissions.LOCATION); //Petición de permisos
        
        if (status !== 'granted') {     //Compara si el permiso se garantizó
            this.permissionError();
        } else {
            navigation.navigate('Map')  //Envía al la pantalla de MAP una vez con el permiso de localización
            //return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        }
    }

    permissionError = () => { 
        Alert.alert(
            "Permissions", //Titulo de la alerta
            "To see the map please allow the location on Permissions", //Body de la alerta
            [
                { text:"OK" } //Opciones del mensaje
            ],
            {cancelable:false}
        )
    }
    
    render(){
        console.log(this.props.numero)
        return (
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'space-around'}}>
                <View style={{flexDirection:'column',justifyContent:'flex-start', alignItems:'flex-start', height:'50%',margin:50}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>Ingresar Dirección</Text>
                    <DirectionForm/>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Button onPress={() => this.grantPermisions()}> 
                        <Text>Elegir desde el mapa</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    numero: state.reducerPrueba
})

const mapDispatchToProps = (dispatch) => {
    return{
        aumentar: () => {
            dispatch({type: 'AUMENTAR_REDUCER_PRUEBA'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondSc);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
