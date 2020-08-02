import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Body } from 'native-base'
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import GoogleCast, { CastButton } from 'react-native-google-cast';

export default class GPHeader extends Component {

  constructor(props) {
    super(props);
  }

 

  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.veryTransparentWhite} barStyle="dark-content" ></StatusBar>
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            backgroundColor: colors.transparent,
            alignItems: "center",
            justifyContent: "center",
            marginTop:"2%",
            zIndex:999
          }}>
          <View style={{flexDirection: "column",
                        width:75, height:75, 
                        borderRadius: 50,
                        backgroundColor: colors.greenT,
                        justifyContent: "center", alignItems:"center"}}>
            <CastButton style={{ width: 50, height: 50, tintColor: 'black' }} />
          </View>

        </View>
      </>
    );
  }
}
