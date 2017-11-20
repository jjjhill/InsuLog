import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, WebView} from 'react-native';
import axios from 'axios';

class SavedItem extends Component {
    
    state = {
        selected: false,
    }
    componentDidMount() {
        this.props.selected.forEach(function(element) {
            if (element.id == this.props.item.id)
                this.setState({selected:true});
        }, this);
    }
    itemLongPress() {
        Alert.alert(
            'Delete',
            'Do you want to delete this saved item?',
            [
              {text: 'Cancel', onPress: () => {}, style: 'cancel'},
              {text: 'Delete', onPress: () => 
                axios.delete('http://ec2-35-182-90-15.ca-central-1.compute.amazonaws.com:3000/saved', { params: { id: this.props.item.id } })
                    .then(() => this.props.deleteSaved())
                }
            ]
          )
    }
    render() {
        return (
            <TouchableOpacity style={[styles.itemBackground, {backgroundColor: this.state.selected?'darkblue':'black'}]} activeOpacity={0.8} onPress={() => this.itemPress()} onLongPress={() => this.itemLongPress()}>
                <View style={{flex:1}}>
                    <Text style={{color:'white'}}>{this.props.item.name}</Text>
                </View>
                <Text style={{color:'white'}}>{this.props.item.carbs}</Text>
                <Text style={{fontSize:20, color:'white'}}> (</Text>
                <Text style={{color:'white'}}>x</Text>
                <TextInput style={{width:35, color:'white'}} keyboardType={'numeric'} onChangeText={(value) => this.onMultiplierChange(value)} value={String(this.props.item.multiplier)}/>
                <Text style={{fontSize:20, color:'white'}}> )</Text>
            </TouchableOpacity>
        );
    }
    onMultiplierChange(value) {
        let item = this.props.item;
        item.multiplier = value;
        this.props.onMultiplierChange(item);
    }
    itemPress() {
        this.setState({selected: !this.state.selected});
        this.props.onItemPress(this.props.item);
    }

};

const styles = StyleSheet.create({
    itemBackground: {
        flexDirection:'row',
        height:50,
        padding:3,
        margin:2,
        alignItems:'center',
    }
});

export default SavedItem;