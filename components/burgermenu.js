import React from 'react';
import {Component, StyleSheet, Image, TouchableOpacity} from 'react-native';


const BurgerMenu = (props) => {
  
    return (
        <TouchableOpacity onPress={props.onBurgerPress} style={styles.touchableStyle}>
            <Image source={require('../icon.png')} style={styles.iconStyle} />
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    touchableStyle: {
        height:40,
        width:40,
        alignItems:'center',
        justifyContent:'center',
    },
    iconStyle: {
        width:24,
        height:24,
    },
});

export default BurgerMenu;