import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import { Header, Left, Right, Body } from 'native-base'
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleCast, { CastButton } from 'react-native-google-cast';
import imgResources from '../config/imgResources';

export default class GPHeader extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.veryTransparentWhite} barStyle="dark-content" ></StatusBar>
        <ImageBackground source={imgResources.logo} style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primaryColor,
        }}
          blurRadius={8}>
          {this.props.children}
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              backgroundColor: colors.transparent,
              alignItems: "center",
              justifyContent: "center",
              top: "3%",
              zIndex: 999
            }}>
            <View style={{
              flexDirection: "column",
              width: 75, height: 75,
              borderRadius: 50,
              backgroundColor: colors.greenT,
              justifyContent: "center", alignItems: "center"
            }}>
              <CastButton style={{ width: 50, height: 50, tintColor: 'black' }} />
            </View>
          </View>
        </ImageBackground>
      </>
    );
  }
}
