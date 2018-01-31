/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import Log from '../components/log';

export default class Logs extends Component {
  state = {
    logs: [],
  }
  componentWillMount() {
    this.getLogs();
  }
  getLogs() {
    try {
      fetch('http://ec2-35-182-90-15.ca-central-1.compute.amazonaws.com:3000/logs')
      .then(response => {
        let json = response.json();
        json.then(res => {
          this.setState({logs: res})
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
  renderLogs() {
    return (
      <FlatList
        data={this.state.logs}
        renderItem={({item}) => 
          <Log
            key={item.id}
            log={item}
            deleteLog={this.getLogs.bind(this)}
          />
        }
        keyExtractor={(item, index) => item.id}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={{flex:2, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.headerText}>Time</Text>
          </View>
          <View style={{flex:1, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.headerText}>B.S.</Text>
          </View>
          <View style={{flex:1, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.headerText}>Carbs</Text>
          </View>
          <View style={{flex:1, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.headerText}>Dose</Text>
          </View>
          <View style={{flex:3, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.headerText}>Note</Text>
          </View>
        </View>
        <View style={{flex:10}}>
          {this.renderLogs()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf:'stretch',
    backgroundColor: 'white',
    padding:2,
  },
  headerRow: {
      flex:1,
      flexDirection:'row',
      marginBottom:2,
  },
  headerText: {
    color:'white',
    fontSize:16,
    fontFamily:'franklin',
  }
});
