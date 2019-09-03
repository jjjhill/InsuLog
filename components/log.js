import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import moment from 'moment';
import axios from 'axios';

export default class Log extends Component<{}> {
  logLongPress() {
      Alert.alert(
          'Delete',
          'Do you want to delete this log?',
          [
            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            {text: 'Delete', onPress: () => 
              axios.delete('http://ec2-18-223-110-67.us-east-2.compute.amazonaws.com:3000/logs', { params: { id: this.props.log.id } })
                  .then(() => this.props.deleteLog())
              }
          ]
        )
  }
  render() {
    return (
        <TouchableOpacity style={styles.row} onLongPress={() => this.logLongPress()} activeOpacity={0.8}>
          <View style={{flex:2, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.logText}>{String(moment(this.props.log.timeLogged).fromNow())}</Text>
          </View>
          <View style={{flex:1, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.logText}>{this.props.log.glucose}</Text>
          </View>
          <View style={{flex:1, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.logText}>{this.props.log.carbs}</Text>
          </View>
          <View style={{flex:1, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.logText}>{this.props.log.dose}</Text>
          </View>
          <View style={{flex:3, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.logText}>{this.props.log.note}</Text>
          </View>
        </TouchableOpacity>
    );   
  }
}

const styles = StyleSheet.create({
  row: {
    height:80,
    flexDirection:'row',
    marginVertical:2,
  },
  logText: {
    color:'white',
    fontSize:14,
    fontFamily:'franklin',
  }
});