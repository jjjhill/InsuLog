import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';


const SavedItem = (props) => {
  
    return (
        <View style = {styles.itemBackground}>
            <Text>{props.item}</Text>
        </View>
    );

};

const styles = StyleSheet.create({
    itemBackground: {
        flex:1,
    }
});

export default SavedItem;