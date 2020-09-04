import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, StatusBar} from 'react-native';
import colors from '../config/colors';
import ImgResources from '../config/imgResources'
import Helpers from '../supportLogic/helpers';

export default class Splash extends Component {
  async componentDidMount() {

    let helpers = new Helpers();
    await helpers.wait(500);
    this.props.navigation.navigate('Home');

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
