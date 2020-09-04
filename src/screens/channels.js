import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import GPHeader from './header';
import colors from '../config/colors';
import castVid from '../supportLogic/cast';


class Channels extends Component {
    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.state = { ch: this.props.navigation.state.params, curCastCh: "" }
        this.Item = this.Item.bind(this);
    }
    Item({ ch }) {
        return (
            <View style={{
                width: "48%", padding: "5%",
                justifyContent: "center", alignItems: "center",
                backgroundColor: colors.veryTransparentWhite,
                borderRadius: 10,
                marginBottom: "3%", marginRight: "1%", marginLeft: "1%",
            }}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('VideoPlay', {url:ch.link});}}
                                  style={{borderColor:colors.black, width:"100%", borderWidth:0,
                                          justifyContent:"center", alignItems:"center",
                                         borderTopLeftRadius:12, borderTopRightRadius:12, marginBottom:"3%"}}
                >
                    <Text style={{ fontSize: 18, color: colors.black }} >{ch.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { if (castVid(ch.title, ch.link, 'application/x-mpegurl', true)) this.setState({ "curCastCh": ch.title }) }}
                                  style={{borderColor:colors.greenT, width:"100%", borderWidth:3, 
                                  justifyContent:"center", alignItems:"center", 
                                 borderBottomLeftRadius:12, borderBottomRightRadius:12}}
                >
                    <Text style={{ fontSize: 18, color: colors.green }} >Cast</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <>
                <GPHeader {...this.props}>
                    <FlatList numColumns={2}
                        data={this.state.ch}
                        renderItem={({ item }) => <this.Item ch={item} />}
                        keyExtractor={item => item.title}
                        contentContainerStyle={{  paddingBottom:"15%", paddingTop:"3%" }}
                        extraData={this.props} />
                    <View style={{
                        position: "absolute", zIndex: 999,
                        alignSelf: "center", bottom: "2%",
                        backgroundColor: colors.greenT,
                        borderColor:colors.veryTransparentWhite,
                        borderRadius:12,
                        borderWidth:3,
                        width:"50%",
                        justifyContent:"center", alignItems:"center", 
                    }}>
                        <Text style={{fontSize:18, color: colors.white}} >{this.state.curCastCh}</Text>
                    </View>
                </GPHeader>
            </>
        );
    }
}

export default Channels;
