/**
 * Esta es la Primera pantalla de la sección de pagos.
 */
import React from 'react'
import {StyleSheet} from 'react-native'
import {Button, Text, View} from 'native-base'
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import stripe from 'tipsi-stripe'

const params = {
            // mandatory
            number: '4242424242424242',
            expMonth: 11,
            expYear: 23,
            cvc: '223',
            // optional
            name: 'Test User',
            currency: 'usd',
            addressLine1: '123 Test Street',
            addressLine2: 'Apt. 5',
            addressCity: 'Test City',
            addressState: 'Test State',
            addressCountry: 'Test Country',
            addressZip: '55555',
          };

export default class PaysSc extends React.Component {
    constructor(){
        super()
        this.state = {
            StpToken: null
        }
      }
    
    async componentDidMount() {
        Stripe.setOptionsAsync({
            publishableKey: 'pk_test_51ILAJZFlD97kQstqrEtiXdgH9fcUXllFnuUFe8MB8usKfYzKS7kmzxGZlDLnIuEjD41zwWW5uvEJGdyCyXmX80hR009tcuy6to', // Your key
            androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
            //merchantId: 'your_merchant_id', // [optional] used for payments with ApplePay
        })
        
        const token = await Stripe.createTokenWithCardAsync(params);
        console.log("CompDMount, Token: ",token)
        this.setState({StpToken: token})
    }

    async conseguirToken(){
        const options = {
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
                billingAddress: {
                    name: 'Gunilla Haugeh',
                    addressLine1: 'Canary Place',
                    addressLine2: '3',
                    addressCity: 'Macon',
                    addressState: 'Georgia',
                    addressCountry: 'US',
                    postalCode: '31217',
                    cardId: this.state.StpToken.cardId
                },
            },
        };
          
        const token = await Stripe.paymentRequestWithCardFormAsync(options);
        console.log(token)
        alert(token.tokenId)
    }
        
    render(){
        return (
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'space-around'}}>
                <View style={{justifyContent:'center', alignItems:'flex-start', marginHorizontal:50}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>Entramos a pagos</Text> 
                    
                </View>
                    <Button style={{alignSelf:'center'}} onPress={() => {this.conseguirToken()}}>
                        <Text>Añadir Tarjeta</Text>
                    </Button>
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

/* 
//Usando react-native conekta
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
*/