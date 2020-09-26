import React, { Component } from 'react';
import { Text, View, StatusBar, ActivityIndicator } from 'react-native';
import GPHeader from './header';
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/Entypo';
import SqlStorage from '../supportLogic/sqlStorage';
import castVid from '../supportLogic/cast';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ALLOWED_IMGS = ["png", "jpg", "jpeg", "gif"];
const SECURE_FOLDER = "server@i"

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
            loading: false,
            imgUrl: "",
            showImg: false,
            pass: ""
        }
        this.sql = new SqlStorage();
        this.Item = this.Item.bind(this);
        this.sql.getData("ip").then(ip => this.getData(ip))
    }

    getData(url) {
        fetch(url, {
            method: 'GET'
            //Request Type 
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson, url: url, ip: url, loading: false })
            })
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

    dealWithFiles(cat) {
        let file_ext = cat.name.split(".").pop()
        if (ALLOWED_IMGS.includes(file_ext)) {
            this.setState({ imgUrl: [{ url: this.state.ip + "/img" + cat.path.substring(1) }], showImg: true });
        }
        castVid(cat.name, this.state.ip + "/stream" + cat.path.substring(1), "video/mp4")
    }

    dealWithFolders(cat, require_pass) {
        if (!require_pass) {
            this.getPost(this.state.ip + "/content", { path: cat.path })
        } else {
            if (this.state.pass === "araqu") {
                this.getPost(this.state.ip + "/content", { path: cat.path })
            }
        }
    }

    Item({ cat }) {
        let require_pass = cat.name === SECURE_FOLDER
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
                        cat.type === "dir" ? this.dealWithFolders(cat, require_pass)
                            :
                            this.dealWithFiles(cat)
                    }}
                >
                    {
                        cat.type === "dir" ? (require_pass ? <TextInput secureTextEntry={true} placeholder={""} selectionColor={colors.greenT}
                            style={{
                                width: "70%",
                                backgroundColor: colors.veryTransparentWhite,
                                borderRadius: 10,
                            }}
                            onChangeText={(pass) => this.setState({ pass })} /> :

                            <Icon name="folder" size={50} />)
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
                        this.state.loading ? <ActivityIndicator size="large" color={colors.green} /> :
                            <TouchableOpacity onPress={async () => { await this.sql.storeData("ip", this.state.ip); this.getData(this.state.ip) }}>
                                <Icon name="tv" size={30} />
                            </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    render() {
        // console.log(this.state.imgUrl);
        return (
            <GPHeader {...this.props}>
                {this.state.showImg ?
                    <Modal visible={this.state.showImg} transparent={true}>
                        <ImageViewer imageUrls={this.state.imgUrl} onSwipeDown={() => this.setState({ showImg: false })} enableSwipeDown={true} />
                    </Modal>
                    :
                    <>
                        <FlatList numColumns={2}
                            data={this.state.data}
                            renderItem={({ item }) => <this.Item cat={item} />}
                            keyExtractor={item => item.name}
                            contentContainerStyle={{ paddingTop: 50, paddingBottom: 100 }}
                            extraData={this.props} />
                        {this.serverNavi()}
                    </>
                }
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
        url_beg = url_beg.substring(0, url_beg.length - 1)
        // console.log("final", url_beg)
        this.getPost(this.state.ip + "/content", { path: url_beg })

    }
}
