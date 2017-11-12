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
  Alert,
  ScrollView,
} from 'react-native';
import Fuse from 'fuse.js';
import ModalDropdown from 'react-native-modal-dropdown';
import Display from 'react-native-display';
import SavedList from '../components/savedlist';
import SavedItem from '../components/saveditem';

var ratio = 18.0;
var correction = 3.5;
var target = 5.0;
class New extends Component<{}> {

  state = {
    savedItems: [],
    selectedItems: [],
    carbSelected: 0,
    showSaved:false,
    carbInput: 0,
    currentBS:0.0,
    dosageText:'',
    custom:'',
  };

  componentWillMount() {
    let savedItems =
    [
      {
        id:1,
        name:'1/4 cup dry rice',
        carbs:35,
        multiplier:1,
      },
      {
        id:2,
        name:'1 cup french fries',
        carbs:30,
        multiplier:1,
      },
      {
        id:3,
        name:'pretzel',
        carbs:70,
        multiplier:1,
      },
      {
        id:4,
        name:'rockets',
        carbs:7,
        multiplier:1,
      },
      {
        id:5,
        name:'milk',
        carbs:18,
        multiplier:1,
      },
      {
        id:6,
        name:'chocolate brownies',
        carbs:100,
        multiplier:1,
      },

    ];
    this.setState({
      savedItems: savedItems,
      subItems: savedItems,
    })
  }
  toggleSavedList() {
    this.setState({showSaved: !this.state.showSaved});
  }
  onItemPress(item){
    let selectedItems = this.state.selectedItems;
    let currentIndex = 0;
    let index = 0;
    let found=false;
    selectedItems.forEach(function(element) {
      if (element.id == item.id) {
        index = currentIndex;
        found=true;
      }
      currentIndex++;
    }, this);
    if (found){
      selectedItems.splice(index, 1);
    }
    else {
      selectedItems.push(item);
    }
    console.log(selectedItems);
    let total = this.calculateTotalSelected();
    this.setState({
      selectedItems: selectedItems,
      carbSelected: total,
    });
  }
  calculateTotalSelected() {
    let selected = this.state.selectedItems;
    let total=0;
    selected.forEach(function(element) {
      total += (element.carbs * element.multiplier);
    }, this);
    return total;
  }
  renderSavedItems() {
    return (
      this.state.subItems.map((item) => 
        <SavedItem key={item.id} item={item} onItemPress={this.onItemPress.bind(this)} selected={this.state.selectedItems} onMultiplierChange={this.onMultiplierChange.bind(this)}/>
      )
    );
  }
  onMultiplierChange(item) {
    let savedItems = this.state.savedItems;
    savedItems.forEach(function(element) {
      if (element.id == item.id) {
        element.multiplier = item.multiplier;
      }
    }, this);
    let total = this.calculateTotalSelected();
    this.setState({savedItems: savedItems, carbSelected: total});
  }
  openMFP(){

  }
  searchSaved(search) {
    if (search==''){
      this.setState({subItems: this.state.savedItems});
    }
    else {
      var options = {
        keys: ['name'],
        threshold: 0.6,
        minMatchCharLength: 2,
      };
      var fuse = new Fuse(this.state.savedItems, options);
      this.setState({subItems: fuse.search(search)});
    }
  }
  getDose() {
    if (this.state.currentBS == '') {
      alert('Enter Blood Sugar');
    }
    else {
      let bs = this.state.currentBS;
      let carbs = parseFloat(this.state.carbInput) + parseFloat(this.state.carbSelected);
      let total = carbs/ratio + (bs-target)/correction;
      this.setState({dosageText: 'Take ' + total + ' units.'});
    }
  }
  render() {
    return (
      <ScrollView>
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
            <View style={{flexDirection:'row', alignSelf:'stretch', alignItems:'center', justifyContent:'center'}}>
              <Text>Search: </Text>
              <TextInput value={this.state.savedSearch} onChangeText={(value) => this.searchSaved(value)} style={styles.savedSearch}/>
            </View>
            <SavedList>
              {this.renderSavedItems()}
            </SavedList>
          </Display>
          <View style={styles.carbRow}>
            <Text>Carbs:  {this.state.carbSelected} + </Text>
            <TextInput keyboardType='numeric' value={String(this.state.carbInput)} onChangeText={(value) => this.setState({carbInput: value})} style={{width:40}}/>
          </View>
          <View style={styles.bsRow}>
            <Text>Current Blood Sugar: </Text>
            <TextInput keyboardType='numeric' value={String(this.state.currentBS)} onChangeText={(value) => this.setState({currentBS: value})} style={{width:40}}/>
          </View>
          <TouchableOpacity style={styles.getDoseRow} onPress={() => this.getDose()} activeOpacity={0.8}>
            <Text>Get Dose</Text>
          </TouchableOpacity>
          <View style={styles.dosageRow}>
            <Text>{this.state.dosageText}</Text>
          </View>
          <View style={styles.saveRow}>
            <View style={styles.customColumn}>
              <Text>Custom Dose</Text>
              <TextInput keyboardType='numeric' value={String(this.state.custom)} onChangeText={(value) => this.setState({custom: value})} style={{width:80}}/>
            </View>
            <View style={styles.buttonColumn}>
              <TouchableOpacity style={styles.saveButton} onPress={() => this.saveRecommended()} activeOpacity={0.8} >
                <Text>Save Recommended</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={() => this.saveCustom()} activeOpacity={0.8} >
                <Text>Save Custom</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding:10,
  },
  upperButtons: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  savedListStyle: {
    alignSelf:'stretch',
    height:300,
  },
  mfpButton: {
    backgroundColor:'red',
    alignItems:'center',
    flex:1,
    marginRight:10,
    marginLeft:10,
  },
  carbRow: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',

  },
  bsRow: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',

  },
  savedSearch: {
    flex:1,
  },
  getDoseRow: {
    marginHorizontal:40,
    marginVertical:20,
    backgroundColor:'lightblue',
    height:40,
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center',
  },
  dosageRow: {
    alignItems:'center',
  },
  saveRow: {
    margin:10,
    flexDirection:'row',
  },
  customColumn: {
    flex:1,
    flexDirection:'column',
    height:60,
  },
  buttonColumn: {
    flex:1,
    flexDirection:'column',
    height:60,
  },
  saveButton: {
    flex:1,
    margin:2,
    backgroundColor:'lightblue',
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center',
  }
});

export default New;