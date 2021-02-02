/**
 * Este código es específicamente el encargado de guardar la información ingresada en el Input en el Store,
 * mediante la ayuda de Redux-Form en el envío de la información.
 * Este código se carga desde SecondSc 
 */
import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button, Text, View, Input, Item, Label} from 'native-base'

const Deshabilitado = false

//Aquí se encuentra el form a llenar
const fieldNombre = (props) => {
    console.log(props)
    return(
        <View style={{justifyContent:'flex-start', alignItems:'flex-start',margin:10, width:"95%", height:"60%"}}>
            <Item  floatingLabel underline style={{margin:15, borderBottomColor:"green", width:'95%'}}>
                <Label>{props.ph}</Label>
                <Input 
                    onChangeText={props.input.onChange} 
                    value={props.input.value}
                    onBlur={props.input.onBlur}
                />
            </Item>
            {props.meta.touched && props.meta.error && 
                <Text style={{color:'red'}}>{props.meta.error}</Text>
            }
        </View>
    )
}

//Esta función valida errores que puedan surgir con los valores del forms
const validate = (values) => { 
    const errors ={};
    if(!values.Direccion){
        errors.Direccion = 'Campo Requerido para Guardar. O eliga desde el Mapa'
    } /*else if (values.Direccion.length < 5){
        errors.Direccion = "Deben ser al menos 5 caracteres"
    }*/
    return errors;
}

//Se envía a llenar el form y guarda
const DirectionForm = (props) => {
    console.log(props)
    return(
        <View>
            <Field name="Direccion" component={fieldNombre} ph='* Dirección' />
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