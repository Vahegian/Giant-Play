import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import GPHeader from './header';
import colors from '../config/colors';
import GoogleCast from 'react-native-google-cast';


class Channels extends Component {
    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.state = { ch: this.props.navigation.state.params, curCastCh: "" }
        this.Item = this.Item.bind(this);
    }

    castCh(title, url) {
        GoogleCast.castMedia({
            mediaUrl: url,
            imageUrl:
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/480x270/BigBuckBunny.jpg',
            title: title,
            subtitle:
                'Giant Play',
            studio: '',
            streamDuration: 15000, // seconds
            contentType: 'video/mp4', // Optional, default is "video/mp4"
            playPosition: 0, // seconds
            customData: {
                // Optional, your custom object that will be passed to as customData to reciever
                customKey: '',
            },
        })
        return true
    }

    Item({ ch }) {
        return (

            <View style={{
                width: "46%", padding: "5%",
                justifyContent: "center", alignItems: "center",
                backgroundColor: colors.veryTransparentWhite,
                borderColor: colors.green,
                borderWidth: 2,
                borderRadius: 10,
                marginBottom: "3%", marginRight: "1%", marginLeft: "1%",

            }}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('VideoPlay', {url:ch.link});}}>
                    <Text style={{ fontSize: 16 }} >{ch.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { if (this.castCh(ch.title, ch.link)) this.setState({ "curCastCh": ch.title }) }}>
                    <Text style={{ fontSize: 24, color: colors.green }} >Cast</Text>
                </TouchableOpacity>
            </View>

        )
    }

    render() {
        return (
            <View>
                <GPHeader {...this.props}></GPHeader>
                <FlatList numColumns={2}
                    data={this.state.ch}
                    renderItem={({ item }) => <this.Item ch={item} />}
                    keyExtractor={item => item.title}
                    contentContainerStyle={{ flexDirection: "column", justifyContent: "center" }}
                    extraData={this.props} />
                <View style={{
                    position: "absolute", zIndex: 999,
                    alignSelf: "center", bottom: "2%",
                    backgroundColor: colors.green,
                    borderRadius:12,
                    width:"50%",
                    justifyContent:"center", alignItems:"center",
                }}>

                    <Text style={{fontSize:18, color: colors.white}} >{this.state.curCastCh}</Text>
                </View>
            </View>
        );
    }
}

export default Channels;
