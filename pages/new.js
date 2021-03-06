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
  AsyncStorage,
  FlatList,
  Keyboard
} from 'react-native';
import Fuse from 'fuse.js';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios';
import moment from 'moment';
import Display from 'react-native-display';
import SavedList from '../components/savedlist';
import SavedItem from '../components/saveditem';

var url = 'http://ec2-18-223-110-67.us-east-2.compute.amazonaws.com:3000/';
class New extends Component {

  state = {
    savedItems: [], //all saved items
    subItems: [], //what is displayed in the list
    selectedItems: [], //highlighted
    orderedItems: [], //selected items are first in the list
    carbSelected: 0,
    showSaved:true,
    showAdd:false,
    carbInput: 0,
    currentBS:0.0,
    dosageText:'',
    recommended:'',
    custom:'',
    savedSearch: '',
    savedName:'',
    savedCarbs:'',
    ratio: -1,
    correction: -1,
    target: -1,
    searching: false,
  };

  componentWillMount() {
    this.getSettings();
    this.getSaved();
  }
  async getSettings() { 
    let ratio = await AsyncStorage.getItem('ratio'); 
    let parsedRatio = await JSON.parse(ratio) || ''; 
    
    let correction = await AsyncStorage.getItem('correction'); 
    let parsedCorrection = await JSON.parse(correction) || ''; 
    
    let target = await AsyncStorage.getItem('target'); 
    let parsedTarget = await JSON.parse(target) || '';
    
    if (!parsedRatio || !parsedCorrection || !parsedTarget) {
      alert("Please first set your personal configuration.");
      this.props.navigation.navigate("Settings");
    }

    this.setState({ 
      ratio: parsedRatio,
      correction: parsedCorrection,
      target: parsedTarget,
    });
  }
  getSaved() {
    try {
      fetch(url + 'saved')
      .then(response => {
        let json = response.json();
        json.then(res => {
          //add multiplier property to each element (because it's not stored in DB)
          res.forEach(function(element) {
            element.multiplier = 1;
          }, this);
          this.setState({
            savedItems: res, 
            subItems: res,
            orderedItems: res,
          })
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
  toggleSavedList() {
    this.setState({showSaved: !this.state.showSaved});
  }
  onItemPress(item) {
    let selectedItems = this.state.selectedItems;
    let currentIndex = 0;
    let index = 0;
    let found=false;
    selectedItems.forEach(function(element) {
      if (element.id === item.id) {
        index = currentIndex;
        found=true;
      }
      currentIndex++;
    }, this);
    if (found){ //then remove it
      selectedItems.splice(index, 1);
    }
    else { //then add it
      selectedItems.push(item);
    }
    let total = this.calculateTotalSelected();

    let newOrder = selectedItems.slice();

    this.state.savedItems.forEach(savedItem => {
      if (newOrder.indexOf(savedItem) == -1) {
        newOrder.push(savedItem);
      }
    });


    this.setState({
      selectedItems: selectedItems,
      carbSelected: total,
      savedSearch:'',
      subItems: newOrder,
      orderedItems: newOrder,
      searching: false,
    });
  }
  calculateTotalSelected() {
    let selected = this.state.selectedItems;
    let total = 0;
    let mult;
    selected.forEach(function(element) {
      mult = element.multiplier === '' ? 1 : parseFloat(element.multiplier);
      total += (element.carbs * mult);
    }, this);
    return total;
  }
  renderSavedItems() {
    return (
      <FlatList
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode={'on-drag'}
        data={this.state.subItems}
        renderItem={({item}) => 
          <SavedItem 
            item={item} 
            onItemPress={this.onItemPress.bind(this)}
            selected={this.state.selectedItems} 
            onMultiplierChange={this.onMultiplierChange.bind(this)}
            deleteSaved={this.getSaved.bind(this)}
          />}
        keyExtractor={(item, index) => item.id}
      />
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
    this.props.navigation.navigate("MFP");
  }
  searchSaved(search) {
    if (search==''){
      this.setState({
        savedSearch: search,
        searching: false,
        subItems: this.state.orderedItems,
      });
    }
    else {
      var options = {
        keys: ['name'],
        threshold: 0.6,
        minMatchCharLength: 2,
      };
      var fuse = new Fuse(this.state.savedItems, options);
      this.setState({
        subItems: fuse.search(search),
        savedSearch: search,
        searching: true,
      });
    }
  }
  getDose() {
    let ratio = this.state.ratio;
    let correction = this.state.correction;
    let target = this.state.target;
    if (this.state.currentBS == '') {
      alert('Enter Blood Sugar');
    }
    else {
      let bs = this.state.currentBS;
      let carbs = this.state.carbInput === '' ? parseFloat(this.state.carbSelected) : parseFloat(this.state.carbInput) + parseFloat(this.state.carbSelected);
      let total = carbs/ratio + (bs-target)/correction;
      this.setState({recommended: total, dosageText: 'Take ' + parseFloat(total).toFixed(1) + ' units.'});
    }
  }
  multiButtonPress() {
    if (this.state.searching) { //clear search bar
      this.setState({
        savedSearch:'',
        searching: false,
        subItems: this.state.orderedItems,
      });
    }
    else {
      if (!this.state.showAdd) {
        this.setState({showAdd: true});
      }
      else {
        if (this.state.savedName != '' && this.state.savedCarbs != '') {
          this.addSaved();        
        }
        this.setState({
          showAdd:false, 
          savedName:'', 
          savedCarbs:'',
          subItems: this.state.orderedItems,
        });
      }
    }
  }
  addSaved() {
    let name = this.state.savedName;
    let carbs = this.state.savedCarbs;
    axios.post(url + 'saved', {name: name, carbs: carbs})
    .then(() => this.getSaved());
  }
  saveLog(mode) {
    var dose;
    if (mode==0)
      dose = parseFloat(this.state.recommended).toFixed(1);
    else {
      dose = parseFloat(this.state.custom).toFixed(1);
    }

    let carbs = parseFloat(this.state.carbInput) + parseFloat(this.state.carbSelected);
    carbs = Math.round(carbs);
    let bs = parseFloat(this.state.currentBS).toFixed(1);
    let notes = '';
    
    this.state.selectedItems.forEach(item => {
      notes=notes+item.name+"(x"+item.multiplier+"), ";
      axios.put(url + 'saved', {
        id: item.id,
      }).then((res) => console.log(res));
    });
    notes=notes.slice(0,-1);
    notes=notes.slice(0,-1);

    axios.post(url + 'logs', {glucose: bs, dose: dose, carbs: carbs, isCustomDose: mode, notes: notes})
    .then(() => this.props.navigation.navigate("Logs"));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperButtons}>
          <TouchableOpacity style={styles.mfpButton} onPress={this.toggleSavedList.bind(this)}>
            <Text style={{fontSize:25, color:'white'}}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mfpButton} onPress={this.openMFP.bind(this)}>
            <Text style={{fontSize:25, color:'white'}}>MFP</Text>
          </TouchableOpacity>
        </View>
        <Display style={styles.savedListStyle} enable={this.state.showSaved}>
          <View style={{flexDirection:'row', alignSelf:'stretch', alignItems:'center', justifyContent:'center'}}>
            <Text>Search: </Text>
            <TextInput value={this.state.savedSearch} onChangeText={(value) => this.searchSaved(value)} style={styles.savedSearch}/>
            <TouchableOpacity style={styles.addButton} onPress={() => this.multiButtonPress()}>
              <Text style={{fontSize:20, color:'white'}}>{this.state.searching ? 'x' : '+'}</Text>
            </TouchableOpacity>
          </View>
          <Display style={styles.addSavedRow} enable={this.state.showAdd}>
            <Text>Name: </Text>
            <TextInput value={this.state.savedName} onChangeText={(value) => this.setState({savedName: value})} style={{flex:3}}/>
            <Text>Carbs: </Text>
            <TextInput keyboardType='numeric' value={this.state.savedCarbs} onChangeText={(value) => this.setState({savedCarbs: value})} style={{flex:1}}/>
          </Display>
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
          <Text style={{fontSize:16, color:'white'}}>Get Dose</Text>
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
            <TouchableOpacity style={styles.saveButton} onPress={() => this.saveLog(0)} activeOpacity={0.8} >
              <Text style={{color:'white'}}>Save Recommended</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={() => this.saveLog(1)} activeOpacity={0.8} >
              <Text style={{color:'white'}}>Save Custom</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    flex:1,
    alignSelf:'stretch',
  },
  mfpButton: {
    backgroundColor:'black',
    alignItems:'center',
    flex:1,
    marginHorizontal:2,
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
    backgroundColor:'black',
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
    height:70,
  },
  saveButton: {
    flex:1,
    margin:2,
    backgroundColor:'black',
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center',
  },
  addSavedRow: {
    flexDirection:'row',
    alignItems:'center',
  },
  addButton: {
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
    height:30,
    width:30,
  },
});

export default New;