import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';


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
    }
});

export default SavedList;