import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';


const SavedList = (props) => {
  
    return (
        <View style = {styles.listBackground}>
            <ScrollView>
                {props.children}
            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    listBackground: {
        flex:1,
    }
});

export default SavedList;