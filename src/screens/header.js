import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';

import colors from '../config/colors';
import { CastButton } from 'react-native-google-cast';
import imgResources from '../config/imgResources';

export default class GPHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={"rgba(0,0,0,0.0)"} translucent={true} barStyle="dark-content" ></StatusBar>
        <ImageBackground source={imgResources.logo} style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // resizeMode:'cover'
          // backgroundColor: colors.primaryColor,
        }}
          blurRadius={8}>
            <View style={{marginTop: StatusBar.currentHeight, width:"100%"}}>
                {this.props.children}
            </View>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              backgroundColor: colors.transparent,
              alignItems: "center",
              justifyContent: "center",
              top: "3%",
              zIndex: 999,
              marginTop: StatusBar.currentHeight
            }}>
            <View style={{
              flexDirection: "row",
              // width: 75, height: 75,
              borderRadius: 24,
              backgroundColor: colors.greenT,
              justifyContent: "center", alignItems: "center"
            }}>
              <CastButton style={{ width: 50, height: 50, tintColor: 'black' }} />
              <TouchableOpacity style={{margin:5,padding:10, backgroundColor: colors.veryTransparentWhite, borderRadius:25}}
                                onPress={()=>{this.props.navigation.navigate('Server')}}>
                <Text>Server</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </>
    );
  }
}
