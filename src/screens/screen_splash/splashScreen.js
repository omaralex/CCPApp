
import React, { Component } from 'react';
import { AppRegistry, StyleSheet,Text, View, Image,StatusBar } from 'react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';


const splashImage = require("../../img/logo.png");

class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor="#0d2937" barStyle="light-content"/>
        <Image style={{width: 200, height: 200}} source={splashImage} />
        <Bubbles size={8} color="#FFF" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d2937',
  },
  splash: {
    textAlign: 'center',
    color: 'rgb(236, 236, 236)',
    marginBottom: 10,
    fontSize: 30,
  },
});

export default SplashScreen
