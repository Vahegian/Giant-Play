import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, StatusBar, TextInput } from 'react-native';
import colors from '../config/colors';
import GPHeader from './header';
import channels from '../raw/private/ch.json'
import imgResources from '../config/imgResources';


class MainScreen extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props);
    this.state = {
      username:""
    };
    this.Item = this.Item.bind(this);
  }

  Item({ cat }) {
    if (cat === "взрослые\n") {
      return (
        <View style={{
          width: "48%", padding: "5%",
          justifyContent: "center", alignItems: "center",
          backgroundColor: colors.veryTransparentWhite,
          borderRadius: 10,
          marginBottom: "3%", marginRight: "1%", marginLeft: "1%",

        }} >
          <TouchableOpacity onPress={()=>{ if (this.state.username==="araqu") this.props.navigation.navigate('Channels', channels[cat]); }}>
              <Text style={{fontSize:16}}>@Server</Text>
          </TouchableOpacity>

          <TextInput secureTextEntry={true} placeholder={""} selectionColor={colors.greenT}
            style={{
              width: "70%", 
              backgroundColor: colors.veryTransparentWhite,
              borderRadius: 10,
            }}
            onChangeText={(username) => this.setState({username})} />
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
          onPress={() => {this.props.navigation.navigate('Channels', channels[cat]); }}
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
            data={Object.keys(channels)}
            renderItem={({ item }) => <this.Item cat={item} />}
            keyExtractor={item => item}
            contentContainerStyle={{ flexDirection: "column", justifyContent: "center", paddingTop: "2%", paddingBottom: 100 }}
            extraData={this.props} />
        </GPHeader>
      </>
    );
  }
}

export default MainScreen;
