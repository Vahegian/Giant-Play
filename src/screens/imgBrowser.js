import React, { Component } from 'react'
import { ActivityIndicator, Text, View, Modal } from 'react-native'
import { FlatList, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import SqlStorage from '../supportLogic/sqlStorage';
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../config/colors';
import ImageViewer from 'react-native-image-zoom-viewer';
import DocumentPicker from 'react-native-document-picker';
import Conf from '../config/conf';
import * as RNFS from 'react-native-fs';

export default class ImgBrowser extends Component {
    static navigationOptions = {
        headerShown: false
    }
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            password: "",
            cur_pass: "",
            showData: false,
            data: null,
            showImg: false,
            imgs: [],
            rootDir: "",
            // files: [],
            // dirs: [],
            prevDir:"",
            newDir:"_",
            dirObjs:[]

        }
        this.Item = this.Item.bind(this);
        this.prepareImages = this.prepareImages.bind(this);
        this.sql = new SqlStorage()
        // this.getJsonStructFile().then(resp=>{
        //     resp = JSON.parse(resp)
        //     console.log(resp.root.dirs[0])
        // })
        this.sql.getData(Conf.pass_key).then((data) => {
            if (data != null) {
                this.setState({ cur_pass: data })
            }
        })
    }

    async getJsonStructFile() {
        try {
            let storages = await RNFS.getAllExternalFilesDirs();
            this.setState({ rootDir: storages[1] });
            return JSON.parse(await RNFS.readFile(`${storages[1]}/out/out.json`))
        } catch (err) {
            console.log("getJsonStructFile", err);
            return null
        }
    }

    async showData() {
        this.setState({ loading: true })
        let dirStructJson = await this.getJsonStructFile()
        if (dirStructJson === null) return
        this.setState({
            data: dirStructJson[Object.keys(dirStructJson)[0]],
            // files: dirStructJson[Object.keys(dirStructJson)[0]].files,
            // dirs: dirStructJson[Object.keys(dirStructJson)[0]].dirs,
            showData: true, loading: false, dirObjs:[]
        })

    }

    async prepareImages(files) {
        this.setState({loading:true})
        if (this.state.newDir===this.state.prevDir){
            this.setState({showImg:true, loading:false})
            return
        }

        try {
            let imgs = []
            for (var item of files) {
                let fileName = Object.keys(item)[0]
                let fileType = item[fileName]
                imgs.push({ url: `data:image/${fileType};base64,`+await RNFS.readFile(`${this.state.rootDir}/out/${fileName}`)})
            }
            this.setState({imgs:imgs, showImg:true, loading:false, prevDir:this.state.newDir})
        } catch (err) {
            console.log("prepareImages", err);
        }
    }

    Item({ item }) {
        let dir = Object.keys(item)[0];
        let prevDirObj = this.state.data;
        return (
            <View style={{ width: "48%", margin: "1%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => { this.setState({ data: item[dir], prevDir:this.state.newDir, newDir:dir, dirObjs:[...this.state.dirObjs, prevDirObj]})}}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Icon name="folder" size={50} color={colors.white} />
                    <Text style={{ color: colors.white }}>{dir}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: colors.black, height: "100%" }}>
                <View style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", marginTop: "15%" }}>
                    <TouchableOpacity onPress={async () => {
                        if (this.state.dirObjs.length==0){
                            if (this.state.password === this.state.cur_pass) { await this.showData() }
                        }else{
                            let prevDirObj = this.state.dirObjs.pop();
                            this.setState({ data: prevDirObj, prevDir:this.state.newDir, newDir:""});
                        }
                     }}>
                        <Icon name="arrow-left" size={30} color={colors.white} />
                    </TouchableOpacity>
                    <TextInput secureTextEntry={true} placeholder={"password"} selectionColor={colors.greenT}
                        style={{
                            width: "75%",
                            backgroundColor: colors.veryTransparentWhite,
                            borderRadius: 10,
                            marginRight: "3%",
                            marginLeft: "2%"
                        }}
                        onChangeText={(password) => this.setState({ password })} />

                    {
                        this.state.loading ? <ActivityIndicator size="large" color={colors.green} /> :
                            <TouchableOpacity onPress={async () => { if (this.state.password === this.state.cur_pass) { await this.showData() } }}>
                                <Icon name="install" size={30} color={colors.white} />
                            </TouchableOpacity>
                    }
                </View>

                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {this.state.showData ?
                        <View style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            {this.state.data.files.length > 0 ?
                                <TouchableOpacity onPress={async () => { await this.prepareImages(this.state.data.files) }}>
                                    <Text style={{ display: "flex", padding: "5%", justifyContent: "center", alignItems: "center", color: colors.white }}>Show Images</Text>
                                </TouchableOpacity>
                                :
                                <Text style={{ display: "flex", padding: "5%", justifyContent: "center", alignItems: "center", color: colors.white }}>No images in this folder</Text>
                            }
                            <FlatList numColumns={2}
                                data={this.state.data.dirs}
                                renderItem={({ item }) => <this.Item item={item} />}
                                keyExtractor={item => Object.keys(item)[0]}
                                contentContainerStyle={{ paddingTop: 50, paddingBottom: 100 }}
                                extraData={this.props} />
                        </View>
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

