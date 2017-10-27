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
  Slider,
  Picker,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Display from 'react-native-display';
import SavedList from '../components/savedlist';
import SavedItem from '../components/saveditem';


class New extends Component<{}> {

  state = {
    savedItems: [],
    showSaved:false,
    carbInput: 0,
    bs1:0,
    bs2:0,
  };

  componentWillMount() {
    let savedItems =
    [
      {
        id:1,
        item:'1/4 cup dry rice',
        carbs:35
      },
      {
        id:2,
        item:'1 cup french fries',
        carbs:30
      },
      {
        id:3,
        item:'pretzel',
        carbs:70
      },
      {
        id:4,
        item:'rockets',
        carbs:7
      },

    ];
    this.setState({savedItems: savedItems})
  }
  toggleSavedList() {
    this.setState({showSaved: !this.state.showSaved});
  }
  renderSavedItems() {
    return (
      this.state.savedItems.map((item) => 
        <SavedItem key={item.id} item={item.item}/>
      )
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperButtons}>
          <TouchableOpacity style={styles.mfpButton} onPress={this.toggleSavedList.bind(this)}>
            <Text style={{fontSize:25}}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mfpButton} onPress={this.openMFP.bind(this)}>
            <Text style={{fontSize:25}}>MFP</Text>
          </TouchableOpacity>
        </View>
        <Display style={styles.savedListStyle} enable={this.state.showSaved}>
          <SavedList>
            {this.renderSavedItems()}
          </SavedList>
        </Display>
        <View style={styles.carbRow}>
          <Text>Carbs</Text>
          <TextInput keyboardType='numeric' value={String(this.state.carbInput)} onChangeText={(value) => this.setState({carbInput: value})}/>
        </View>
        <View style={styles.bsRow}>
        </View>
      </View>
    );
  }

  openMFP(){

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding:10,
  },
  upperButtons: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  savedListStyle: {
    marginRight:10,
    marginLeft:10,
    flex:1,
  },
  mfpButton: {
    backgroundColor:'red',
    alignItems:'center',
    flex:1,
    marginRight:10,
    marginLeft:10,
  },
  carbRow: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',

  },
  bsRow: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',

  },
});

export default New;