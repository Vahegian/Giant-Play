import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, StatusBar, PermissionsAndroid} from 'react-native';
import colors from '../config/colors';
import ImgResources from '../config/imgResources'
import Helpers from '../supportLogic/helpers';

export default class Splash extends Component {
  async componentDidMount() {
    let helpers = new Helpers();
    await helpers.wait(500);

    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Giant Play Permission To read/write to storage",
          message:
            "Giant Play App needs access to your phone storage " +
            "to continue working.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted
        this.props.navigation.navigate('Home');
      } else {
        // Permission Denied
        alert('EXTERNAL STORAGE Permission Denied');
      }
    }
    

  }

  render() {
    return (
      <>
      <StatusBar backgroundColor={colors.white}></StatusBar>
      <View style={styles.container}>
        <Image style={styles.logo} source={ImgResources.logo} />
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  logo: {
    width: 180,
    height: 180,
  },
});
