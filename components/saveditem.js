import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';

class SavedItem extends Component {
    
    state = {
        selected: false,
        multiplier: this.props.item.multiplier,
    }
    componentDidMount() {
        this.props.selected.forEach(function(element) {
            if (element.id == this.props.item.id)
                this.setState({selected:true});
        }, this);
    }
    render() {
        return (
            <TouchableOpacity style={[styles.itemBackground, {backgroundColor: this.state.selected?'lawngreen':'green'}]} activeOpacity={0.8} onPress={() => this.itemPress()}>
                <View style={{flex:1}}>
                    <Text>{this.props.item.name}</Text>
                </View>
                <Text>{this.props.item.carbs}</Text>
                <Text style={{fontSize:20}}> (</Text>
                <Text>x</Text>
                <TextInput style={{width:35}} keyboardType={'numeric'} onChangeText={(value) => this.onMultiplierChange(value)} value={this.state.multiplier == 1 ? '' : String(this.state.multiplier)}/>
                <Text style={{fontSize:20}}> )</Text>
            </TouchableOpacity>
        );
    }
    onMultiplierChange(value) {
        this.setState({multiplier: value})
        let item = this.props.item;
        item.multiplier = value == '' ? 1 : parseInt(value);
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