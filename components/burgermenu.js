import React from 'react';
import {Component, StyleSheet, Image, TouchableOpacity} from 'react-native';


const BurgerMenu = (props) => {
  
    return (
        <TouchableOpacity onPress={props.onBurgerPress} style={styles.iconStyle}>
            <Image source={require('../icon.png')} style={styles.iconStyle} />
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    iconStyle: {
        width:24,
        height:24,
    },
});

export default BurgerMenu;