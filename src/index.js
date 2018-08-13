/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Stack, } from 'react-native-router-flux';
import { StackNavigator } from 'react-navigation';
import SplashScreen from './screens/screen_splash/splashScreen'
import Login from "./screens/screen_login/login";
import Home from "./screens/screen_home/home";
 
export default class index extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      timePassed: false
    };
  }

  componentDidMount() {
    let that=this
    setTimeout(function(){
        that.setState({timePassed: true});
    }, 3000);
  }

  render() {
    if (!this.state.timePassed){
        return (<SplashScreen />);
    }else{
        return (
          <Root>
            <Router >
              <Scene key="root">
                <Scene key="login" component={Login} hideNavBar initial />
                <Scene key="home" component={Home} hideNavBar/>
              </Scene>
            </Router>
          </Root>
          );
    }
  }
}

