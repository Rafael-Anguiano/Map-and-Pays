import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainSc from './src/screens/MainSc';

export default class App extends React.Component {
  render(){
    return (
      <MainSc/>
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
