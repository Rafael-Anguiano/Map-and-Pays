/**
 * Esta es la Primera pantalla de la sección de pagos.
 */
import React from 'react'
import {StyleSheet} from 'react-native'
import {Button, Text, View} from 'native-base'

export default class PaysSc extends React.Component {
    constructor(){
        super()
        this.state = {
            
        }
      }
    
    async componentDidMount() {
        var conektaApi = new Conekta();
        conektaApi.setPublicKey( 'key_eYvWV7gUaMyaN4iD' );

        conektaApi.createToken({
        cardNumber: '4242424242424242',
        name: 'Manolo Virolo',
        cvc: '111',
        expMonth: '11',
        expYear: '21',
        }, function(data){
        console.log( 'DATA:', data ); // data.id to get the Token ID
        }, function(){
        console.log( 'Error!' );
        });
    }
        
    render(){
        const { navigation } = this.props  //Para navegación entre pantallas
        return (
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'space-around'}}>
                <View style={{justifyContent:'center', alignItems:'flex-start', marginHorizontal:50}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>Entramos a pagos</Text> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
