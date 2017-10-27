import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';


const SavedList = (props) => {
  
    return (
        <View style = {styles.listBackground}>
            {props.children}
        </View>
    );

};

const styles = StyleSheet.create({
    listBackground: {
        flex:1,
        backgroundColor:'green',
    }
});

export default SavedList;