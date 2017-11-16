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
  ScrollView
} from 'react-native';
import Log from '../components/log';

export default class Logs extends Component<{}> {
  state = {
    logs: [],
  }
  componentWillMount() {
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
      this.state.logs.map( (log) => 
        <Log
          key={log.id}
          log={log}
        />
      )
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
          <View style={{flex:2, backgroundColor:'black', alignItems:'center', justifyContent:'center',marginHorizontal:2,}}>
            <Text style={styles.headerText}>Note</Text>
          </View>
        </View>
        <View style={{flex:10}}>
          <ScrollView style={styles.logRows}>
            {this.renderLogs()}
          </ScrollView>
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
  logRows: {
    flex:1,
  },
  headerText: {
    color:'white',
    fontSize:16,
    fontFamily:'franklin',
  }
});
