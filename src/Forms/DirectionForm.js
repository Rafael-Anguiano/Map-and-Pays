import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import { Field, reduxForm } from 'redux-form'
import {Button, Text, View, Input, Item, Label} from 'native-base';
import { concat } from 'react-native-reanimated';

const Deshabilitado = false
const colorBorde = "green"

const fieldNombre = (props) => {
    console.log(props)
    return(
        <View style={{justifyContent:'flex-start', alignItems:'flex-start',margin:10, width:"95%", height:"60%"}}>
            <Item  floatingLabel underline style={{margin:15, borderBottomColor:colorBorde, width:'95%'}}>
                <Label>{props.ph}</Label>
                <Input 
                    onChangeText={props.input.onChange} 
                    value={props.input.value}
                />
            </Item>
            {props.meta.touched && props.meta.error && 
                <Text style={{color:'red'}}>{props.meta.error}</Text>
            }
        </View>
    )
}

const validate = (values) => {
    const errors ={};
    if(!values.Direccion){
        errors.Direccion = 'Campo Requerido para Guardar. O eliga desde el Mapa'
    } /*else if (values.Direccion.length < 5){
        errors.Direccion = "Deben ser al menos 5 caracteres"
    }*/
    return errors;
}

const DirectionForm = (props) => {
    console.log(props)
    return(
        <View>
            <Field name="Direccion" component={fieldNombre} ph='Dirección' />
            {/*<Field name="Numero" component={fieldNombre} ph='Número' />
            <Field name="Colonia" component={fieldNombre} ph='Colonia' />*/}
            <Button 
                disabled={Deshabilitado}
                style={{backgroundColor:'green'}}
                onPress={props.handleSubmit((values)=>{
                    console.log(values)
                })}
            >
                <Text>Guardar</Text>
            </Button>
        </View>
    )
}

export default reduxForm({form: 'DirectionForm', validate,})(DirectionForm)