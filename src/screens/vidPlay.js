import React, { Component } from 'react';
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
        this.state = this.props.navigation.state.params
        // console.log(this.state)
        this.player = null
        this.isFull = false
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar translucent={true}></StatusBar>
                <Video source={{ uri: this.state.url }}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                        // ref.presentFullscreenPlayer()
                    }}                                    // Callback when video cannot be loaded
                    style={{
                        position: "absolute",
                        // flex:1
                        width: "100%",
                        height:"100%",
                        zIndex:998,
                        top:0
                    }} 
                    resizeMode="stretch"
                    />

                <View style = {{position: "absolute",
                        // flex:1

                        alignSelf: "center", justifyContent: "center", alignItems: "center",
                        width: "25%",
                        // // height:"100%",
                        // // padding:"2%",
                        // backgroundColor:colors.veryTransparentWhite,
                        // borderRadius: 24,
                        zIndex:999,
                        bottom:0}}>
                    <TouchableOpacity onPress={()=>{
                                                        if (!this.isFull){
                                                            this.player.presentFullscreenPlayer()
                                                        }else{
                                                            this.player.dismissFullscreenPlayer()
                                                        }
                                                        this.isFull = !this.isFull
                                                        this.setState({"rx": this.isFull}) 
                                                    }
                                                }
                                      style={{
                                        //   width: "100%",
                                      // height:"100%",
                                      // padding:"2%",
                                      backgroundColor:colors.veryTransparentWhite,
                                      borderRadius: 10,}}>
                        <Text> {this.isFull? "  Exit  ": "  Full Screen  "}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default VidPlay;
