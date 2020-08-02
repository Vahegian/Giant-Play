import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import GPHeader from './header';
import channels from '../raw/private/ch.json'

class MainScreen extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props);
    this.state = {
    };
    this.Item = this.Item.bind(this);
  }

  Item({ cat }) {
    return(
  
        <TouchableOpacity style={{width:"46%", padding:"5%",
                    justifyContent: "center", alignItems:"center",
                    backgroundColor:colors.veryTransparentWhite,
                    borderColor: colors.green,
                    borderWidth:2,
                    borderRadius:10,
                    marginBottom:"3%", marginRight:"1%", marginLeft:"1%",
                    
                    }}
                    onPress={()=>{this.props.navigation.navigate('Channels', channels[cat]);}}
                    >
            <Text style={{fontSize:22}} >{cat}</Text>
        </TouchableOpacity>

    )
  }

  render() {
    return (
      <View>
        <GPHeader {...this.props}></GPHeader>
        <FlatList numColumns={2}
                  data={Object.keys(channels)}
                  renderItem={({ item }) => <this.Item cat={item} />}
                  keyExtractor={item => item}
                  contentContainerStyle={{flexDirection: "column", justifyContent: "center"}}
                  extraData={this.props} />
      </View>
    );
  }
}

export default MainScreen;
