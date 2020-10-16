import { Toast } from 'native-base'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import SimpleToast from 'react-native-simple-toast'
import colors from '../config/colors'
import Conf from '../config/conf'
import SqlStorage from '../supportLogic/sqlStorage'

export default class PassScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             old_pass:"",
             new_pass:"",
             cur_pass:""
        }

        this.sql = new SqlStorage()
        this.sql.getData(Conf.pass_key).then((data)=>{
            if (data!=null){
                this.setState({cur_pass:data})
            }
        })
    }
    
    async updatePass(){
        if (this.state.cur_pass==this.state.old_pass){
            await this.sql.storeData(Conf.pass_key, this.state.new_pass);
            SimpleToast.show("Password updated", 1000);
        }else{
            SimpleToast.show("Old Password is wrong", 1000);
        }
    }

    render() {
        return (
            <View>
                <TextInput placeholder="OLD PASSWORD" secureTextEntry={true} onChangeText={(old_pass) => this.setState({ old_pass })}></TextInput>
                <TextInput placeholder="NEW PASSWORD" secureTextEntry={true} onChangeText={(new_pass) => this.setState({ new_pass })}></TextInput>
                <TouchableOpacity style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center", backgroundColor:colors.red}}
                                    onPress={async ()=>{this.updatePass()}}>
                    <Text style={{color:colors.white, fontSize:24}}>Update</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
