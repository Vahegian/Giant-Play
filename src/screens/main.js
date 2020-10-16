import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import colors from '../config/colors';
import GPHeader from './header';
import Conf from '../config/conf';
import Icon from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import SqlStorage from '../supportLogic/sqlStorage';

class MainScreen extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props);
    this.state = {
      chPass: "",
      channels: {},
      cur_pass:""
    };
    this.Item = this.Item.bind(this);
    this.sql = new SqlStorage()
    
    this.sql.getData(Conf.pass_key).then((data)=>{
        if (data!=null){
            this.setState({cur_pass:data})
        }
    })

    this.sql.getData(Conf.CHKEY).then(async (data) => {
      if (data != null) {
        this.setState({ channels: data })
      } else {
        await this.openFile()
      }
    })
  }

  Item({ cat }) {
    if (cat === "взрослые\n" || cat === "взрослые") {
      return (
        <View style={{
          width: "48%", padding: "5%",
          justifyContent: "center", alignItems: "center",
          backgroundColor: colors.veryTransparentWhite,
          borderRadius: 10,
          marginBottom: "3%", marginRight: "1%", marginLeft: "1%",

        }} >
          <TouchableOpacity onPress={() => { if (this.state.chPass === this.state.cur_pass) this.props.navigation.navigate('Channels', this.state.channels[cat]); }}>
            <Text style={{ fontSize: 16 }}>@Server</Text>
          </TouchableOpacity>

          <TextInput secureTextEntry={true} placeholder={""} selectionColor={colors.greenT}
            style={{
              width: "70%",
              backgroundColor: colors.veryTransparentWhite,
              borderRadius: 10,
            }}
            onChangeText={(chPass) => this.setState({ chPass })} />
        </View>
      )
    } else {

      return (

        <TouchableOpacity style={{
          width: "48%", padding: "5%",
          justifyContent: "center", alignItems: "center",
          backgroundColor: colors.veryTransparentWhite,
          borderRadius: 10,
          marginBottom: "3%", marginRight: "1%", marginLeft: "1%",

        }}
          onPress={() => { this.props.navigation.navigate('Channels', this.state.channels[cat]); }}
        >
          <Text style={{ fontSize: 22 }} >{cat}</Text>
        </TouchableOpacity>

      )
    }
  }

  render() {
    return (
      <>
        <GPHeader {...this.props}>
          <FlatList numColumns={2}
            data={Object.keys(this.state.channels)}
            renderItem={({ item }) => <this.Item cat={item} />}
            keyExtractor={item => item}
            contentContainerStyle={{ flexDirection: "column", justifyContent: "center", paddingTop: "15%", paddingBottom: 100 }}
            extraData={this.props} />

          <View style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "flex-end", justifyContent: "flex-end", paddingBottom: 50, paddingRight: 10 }}>
            <TouchableOpacity style={{
              display: "flex", flexDirection: "row", justifyContent: "flex-end",
              alignItems: "flex-end", marginLeft: "2%"
            }}

              onPress={async () => { this.props.navigation.navigate("PassScreen") }}>
              <Icon name="lock" size={30} />
            </TouchableOpacity>

            <TouchableOpacity style={{
              display: "flex", flexDirection: "row", justifyContent: "center",
              alignItems: "center", marginLeft: "2%"
            }}

              onPress={async () => { await this.openFile() }}>
              <Icon name="save" size={30} />
              <Text>File</Text>
            </TouchableOpacity>
          </View>
        </GPHeader>
      </>
    );
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
    }).then((response) => response.json())
      .then(async (responseJson) => {
        await this.sql.storeData(Conf.CHKEY, responseJson)
        this.setState({ channels: responseJson })
      })
      .catch((error) => {
        //Error 
        console.error(error);
      });
  }
}

export default MainScreen;
