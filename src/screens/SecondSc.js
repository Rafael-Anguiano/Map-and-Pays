/**
 * En esta pantalla se le pide una dirección escrita al usuario para guardar
 * Se llega mediante la MainSc y puede redirigir a MapSc
 */
import React from 'react';
import { StyleSheet, TextInput} from 'react-native';
import {Button, Text, View, Input, Item, Label} from 'native-base';

export default class SecondSc extends React.Component {
    render(){
        const { navigation } = this.props
        return (
            <View style={{flex:1, backgroundColor:'#fff', justifyContent:'space-around'}}>
                <View style={{flexDirection:'column',justifyContent:'flex-start', alignItems:'flex-start', height:'50%',margin:50}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>Ingresar Dirección</Text>
                    <Item  floatingLabel underline style={{margin:15, borderBottomColor:'green', width:'95%'}}>
                        <Label>Dirección</Label>
                        <Input name="adios" onEndEditing={this.props.hola}/>
                    </Item>
                    <Button style={{backgroundColor:'green'}}>
                        <Text>Guardar</Text>
                    </Button>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Button onPress={() => navigation.navigate('Map')}> 
                        <Text>Elegir desde el mapa</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

/*
<Item  floatingLabel underline style={{margin:15, borderBottomColor:'green', width:'95%'}}>
                        <Label>Dirección</Label>
                        <Input onChange={this.props.wDirection}/>
                    </Item>

                    <TextInput 
                        placeholder='Hola'
                        onChangeText={()=>{this.props.wDirection}}
                    />

                    <TextInput 
                        placeholder='Dirección:'
                        onChangeText={this.props.wDirection}
                        style={{fontSize:18}}
                    />


    writeDirection = (value) => {
        alert("Estoy imprimiendo el objeto"+ {value})
        console.log(value)
        //this.setState({texto: value})
        //alert(this.state.texto)
    }
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
