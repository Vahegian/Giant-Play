import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import GPHeader from './header';
import colors from '../config/colors';
import castVid from '../supportLogic/cast';
import Icon from 'react-native-vector-icons/Entypo';


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
                <View style={{
                    width: "100%", justifyContent: "center", alignItems: "flex-end", marginBottom: "3%",
                    display: "flex", position: "absolute", top: 5
                }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('VideoPlay', { url: ch.link }); }}
                                      style={{borderColor:colors.black, borderWidth:1, borderRadius:20}}
                    >
                        {/* <Text style={{ fontSize: 18, color: colors.black }} >{ch.title}</Text> */}
                        <Icon name="controller-play" size={20}></Icon>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => { if (castVid(ch.title, ch.link, 'application/x-mpegurl', true)) this.setState({ "curCastCh": ch.title }) }}
                    style={{
                        width: "100%", justifyContent: "center", alignItems: "flex-start"
                    }}
                >
                    <Text style={{ fontSize: 18, color: colors.green }} >{ch.title}</Text>
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
                        contentContainerStyle={{ paddingBottom: "15%", paddingTop: "3%", paddingTop:"20%" }}
                        extraData={this.props} />
                    <View style={{
                        position: "absolute", zIndex: 999,
                        alignSelf: "center", bottom: "2%",
                        backgroundColor: colors.greenT,
                        borderColor: colors.veryTransparentWhite,
                        borderRadius: 12,
                        borderWidth: 3,
                        width: "50%",
                        justifyContent: "center", alignItems: "center",
                    }}>
                        <Text style={{ fontSize: 18, color: colors.white }} >{this.state.curCastCh}</Text>
                    </View>
                </GPHeader>
            </>
        );
    }
}

export default Channels;
