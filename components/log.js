import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import moment from 'moment';

export default class Log extends Component<{}> {
  render() {
    return (
        <View style={styles.row}>
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
          <View style={{flex:2, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.logText}>{this.props.log.note}</Text>
          </View>
        </View>
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