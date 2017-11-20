/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';

export default class Settings extends Component<{}> {
  state = {
    ratio: -1,
    correction: -1,
    target: -1,
  }
  componentWillMount() {
    this.getSettings();
  }
  async getSettings() { 
    let ratio = await AsyncStorage.getItem('ratio'); 
    let parsedRatio = await JSON.parse(ratio) || ''; 
    
    let correction = await AsyncStorage.getItem('correction'); 
    let parsedCorrection = await JSON.parse(correction) || ''; 
    
    let target = await AsyncStorage.getItem('target'); 
    let parsedTarget = await JSON.parse(target) || '';

  
    this.setState({ 
      ratio: parsedRatio,
      correction: parsedCorrection,
      target: parsedTarget,
    });
  }
  set(key, value) {
    AsyncStorage.setItem(key, value);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', height:100, alignItems:'center'}}>
          <Text style={styles.textStyle}>Carbohydrate to Insulin Ratio</Text>
          <TextInput keyboardType={'numeric'} value={String(this.state.ratio)} onChangeText={(value) => this.setState({ratio:value})} onEndEditing={() => this.set('ratio', String(this.state.ratio))} style={styles.input}/>
        </View>
        <View style={{flexDirection:'row', height:100, alignItems:'center'}}>
          <Text style={styles.textStyle}>Correction Factor</Text>
          <TextInput keyboardType={'numeric'} value={String(this.state.correction)} onChangeText={(value) => this.setState({correction: value})} onEndEditing={() => this.set('correction', String(this.state.correction))} style={styles.input}/>
        </View>
        <View style={{flexDirection:'row', height:100, alignItems:'center'}}>
          <Text style={styles.textStyle}>Target Blood Glucose</Text>
          <TextInput keyboardType={'numeric'} value={String(this.state.target)} onChangeText={(value) => this.setState({target: value})} onEndEditing={() => this.set('target', String(parseFloat(this.state.target).toFixed(1)))} style={styles.input}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    flex:1,
    margin:10,
  },
  input: {
    flex:1,
    alignSelf:'stretch',
    margin:10,
  },
});
