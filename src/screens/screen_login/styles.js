const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    width: null,
    height: null,
  },

  logoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  containerLogin: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: deviceHeight/10
  },

  imageLogo: {
    width: deviceWidth/4,
    height: deviceHeight/6,
  },
};
