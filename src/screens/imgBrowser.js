import React, { Component } from 'react'
import { ActivityIndicator, Text, View, Modal } from 'react-native'
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import SqlStorage from '../supportLogic/sqlStorage';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../config/colors';
import ImageViewer from 'react-native-image-zoom-viewer';
import DocumentPicker from 'react-native-document-picker';
import Conf from '../config/conf';

export default class ImgBrowser extends Component {
    static navigationOptions = {
        headerShown: false
    }
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            password: "",
            showData: false,
            data: null,
            showImg: false,
            imgs:[]
        }
        this.Item = this.Item.bind(this);
        this.sql = new SqlStorage();
    }

    async showData() {
        this.setState({ loading: true })
        let data = await this.openFile()
        if (!data) {
            this.sql.getData("ip").then(ip => this.getData(ip + "/lol"))
        }
    }

    async openFile() {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            
            this.getData(res.uri)

            return true
          } catch (err) {
            return false
          }
    }

    getData(url) {
        fetch(url, {
            method: 'GET'
            //Request Type 
        }).then((response) => response.json())
            .then(async (responseJson) => {
                // console.log(responseJson["server@i"].dirs[0])
                // await this.sql.storeData("imgs", responseJson);
                this.setState({ loading: false, showData: true, data: responseJson })
            })
            .catch((error) => {
                //Error 
                console.error(error);
                this.setState({ loading: false })
            });
    }

    Item({ item }) {
        let dir = Object.keys(item)[0]
        return (
            <View style={{ width: "48%", margin: "1%", display: "flex", justifyContent:"center", alignItems:"center" }}>
                <TouchableOpacity onPress={() => {this.setState({ showImg: true, imgs:item[dir].files }) }}
                style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                    <Icon name="folder" size={50}  color={colors.white}/>
                    <Text style={{ color: colors.white }}>{dir}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: colors.black, height: "100%" }}>
                <View style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", marginTop: "15%" }}>
                    <TextInput secureTextEntry={true} placeholder={"password"} selectionColor={colors.greenT}
                        style={{
                            width: "85%",
                            backgroundColor: colors.veryTransparentWhite,
                            borderRadius: 10,
                            marginRight: "3%",
                            marginLeft: "2%"
                        }}
                        onChangeText={(password) => this.setState({ password })} />

                    {
                        this.state.loading ? <ActivityIndicator size="large" color={colors.green} /> :
                            <TouchableOpacity onPress={async () => { if (this.state.password === Conf.default_sec_pass) { await this.showData() } }}>
                                <Icon name="install" size={30} color={colors.white} />
                            </TouchableOpacity>
                    }
                </View>

                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {this.state.showData ?
                        <FlatList numColumns={2}
                            data={this.state.data[Object.keys(this.state.data)[0]].dirs}
                            renderItem={({ item }) => <this.Item item={item} />}
                            keyExtractor={item => Object.keys(item)[0]}
                            contentContainerStyle={{ paddingTop: 50, paddingBottom: 100 }}
                            extraData={this.props} />
                        :
                        <Text style={{ color: colors.white }}>Unlock For Data</Text>
                    }
                </View>
                {/* {
                    this.state.showImg? */}
                    <Modal visible={this.state.showImg} transparent={true}>
                        <ImageViewer imageUrls={this.state.imgs} onSwipeDown={() => this.setState({ showImg: false })} enableSwipeDown={true} />
                    </Modal>
                    {/* :
                    <></>
                } */}
            </View>
        )
    }
}

