import React, { Component, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Video from 'react-native-video';
import GPHeader from './header';
import colors from '../config/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

class VidPlay extends Component {
    static navigationOptions = {
        headerShown: false
    }
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params
        this.player = null
        this.isFull = false
    }

    useVideoPlayer() {
        return (
            <>
                <Video source={{ uri: this.params.url }}   
                    ref={(ref) => {
                        this.player = ref
                    }}                                  
                    style={{
                        position: "absolute",
                        // flex:1
                        width: "100%",
                        height: "100%",
                        zIndex: 998,
                        top: 0,
                        backgroundColor: colors.black
                    }}
                    resizeMode="contain"
                />

                <View style={{
                    position: "absolute",
                    alignSelf: "center", justifyContent: "center", alignItems: "center",
                    width: "25%",
                    zIndex: 999,
                    bottom: 0
                }}>
                    <TouchableOpacity onPress={() => {
                        if (!this.isFull) {
                            this.player.presentFullscreenPlayer()
                        } else {
                            this.player.dismissFullscreenPlayer()
                        }
                        this.isFull = !this.isFull
                        this.setState({ "rx": this.isFull })
                    }
                    }
                        style={{
                            backgroundColor: colors.veryTransparentWhite,
                            borderRadius: 10,
                        }}>
                        <Text> {this.isFull ? "  Exit  " : "  Full Screen  "}</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={true}></StatusBar>
                {
                    this.useVideoPlayer()
                }
            </View>
        );
    }
}

export default VidPlay;
