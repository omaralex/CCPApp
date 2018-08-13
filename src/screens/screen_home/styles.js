const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  homeContainer: {
  },
  SectionHeaderStyle:{
 
    backgroundColor : '#CDDC39',
    fontSize : 20,
    padding: 5,
    color: '#fff',
  },
 
  SectionListItemStyle:{
 
    fontSize : 15,
    padding: 5,
    color: '#000',
    backgroundColor : '#F5F5F5'
 
  }
};
