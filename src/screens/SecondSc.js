/**
 * En esta pantalla se le pide una dirección escrita al usuario para guardar
 * Se llega mediante la MainSc y puede redirigir a MapSc
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SecondSc extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Here you are in the Second View</Text>
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
