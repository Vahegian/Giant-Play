import React, { Component } from 'react';
import { Text, View, StatusBar, ActivityIndicator } from 'react-native';
import GPHeader from './header';
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import colors from '../config/colors';
// import GoogleCast from 'react-native-google-cast';
import Icon from 'react-native-vector-icons/Entypo';
import SqlStorage from '../supportLogic/sqlStorage';
import castVid from '../supportLogic/cast';

export default class server extends Component {
    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            url: "",
            ip: null,
            path: "",
            loading: false
        }
        this.sql = new SqlStorage();
        this.Item = this.Item.bind(this);
        this.sql.getData("ip").then(ip => this.getData(ip))
    }

    getData(url) {
        // this.setState({ loading: true })
        fetch(url, {
            method: 'GET'
            //Request Type 
        }).then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success 
                // alert(JSON.stringify(responseJson));

                this.setState({ data: responseJson, url: url, ip: url, loading: false })
            })
            //If response is not in json then in error
            .catch((error) => {
                //Error 
                console.error(error);
                this.setState({ loading: false })
            });
    }

    getPost(url, dataToSend) {
        this.setState({ loading: true })
        fetch(url, {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson, url: url, path: dataToSend.path, loading: false })
            })
            .catch((error) => {
                console.error(error);
                this.setState({ loading: false })
            });

    }



    Item({ cat }) {
        return (
            <View style={{ width: "48%", margin: "1%" }}>
                <TouchableOpacity style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "5%",
                    justifyContent: "center", alignItems: "center",
                    backgroundColor: colors.veryTransparentWhite,
                    borderRadius: 10,
                    marginBottom: "3%",

                }}
                    onPress={() => {
                        cat.type === "dir" ? this.getPost(this.state.ip + "/content", { path: cat.path })
                            :
                            castVid(cat.name, this.state.ip + "/stream" + cat.path.substring(1), "video/mp4")
                    }}
                >
                    {
                        cat.type === "dir" ? <Icon name="folder" size={50} />
                            : <Icon name="video" size={50} />
                    }
                    <Text style={{ fontSize: 22 }} >{cat.name}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    serverNavi() {
        return (
            <View style={{
                display: "flex", flexDirection: "row", width: "100%", marginBottom: "15%",
                borderRadius: 12, borderColor: colors.transparentWhite, borderWidth: 1
            }}>

                <View style={{ display: "flex", width: "50%", justifyContent: "center" }}>
                    <TouchableOpacity style={{
                        display: "flex", flexDirection: "row", justifyContent: "center",
                        alignItems: "center"
                    }}

                        onPress={() => { this.goBack() }}          >
                        <Icon name="back" size={30} />
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ display: "flex", flexDirection: "row", width: "50%", alignItems: "center" }}>
                    <TextInput secureTextEntry={false} placeholder={"ip:port"} selectionColor={colors.greenT}
                        style={{
                            width: "70%",
                            backgroundColor: colors.veryTransparentWhite,
                            borderRadius: 10,
                            marginRight: "3%"
                        }}
                        onChangeText={(ip) => this.setState({ ip: "http://" + ip })} />

                    {
                        this.state.loading? <ActivityIndicator size="large" color="#0000ff" /> :
                            <TouchableOpacity onPress={async () => { await this.sql.storeData("ip", this.state.ip); this.getData(this.state.ip) }}>
                                <Icon name="tv" size={30} />
                            </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    render() {
        // console.log(this.state.data);
        return (
            <GPHeader {...this.props}>
                <FlatList numColumns={2}
                    data={this.state.data}
                    renderItem={({ item }) => <this.Item cat={item} />}
                    keyExtractor={item => item.name}
                    contentContainerStyle={{ paddingTop: 50, paddingBottom: 100 }}
                    extraData={this.props} />
                {this.serverNavi()}
            </GPHeader>
        )
    }

    goBack() {
        // console.log(this.state.path)
        let url_beg = "";
        let url_path = this.state.path.split("/");
        if (url_path[url_path.length - 1] === "") {
            url_path.pop()
        }
        url_path.pop()

        for (var path of url_path) {
            url_beg += (path + "/")
        }
        url_beg=url_beg.substring(0, url_beg.length-1)
        // console.log("final", url_beg)
        this.getPost(this.state.ip+"/content", { path: url_beg })

    }
}
