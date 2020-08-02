import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Video from 'react-native-video';
import GPHeader from './header';
import colors from '../config/colors';

class VidPlay extends Component {
    static navigationOptions = {
        headerShown: false
    }
    constructor(props) {
        super(props);
        this.state = this.props.navigation.state.params
        console.log(this.state)
    }

    render() {
        return (
            
            <View style={{flex: 1}}>
                <StatusBar translucent={true}></StatusBar>
                <Video source={{ uri: this.state.url }}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                        // ref.presentFullscreenPlayer()
                    }}                                       // Callback when video cannot be loaded
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
            </View>
        );
    }
}

export default VidPlay;
