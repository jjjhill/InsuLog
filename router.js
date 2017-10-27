import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

import BurgerMenu from './components/burgermenu';
import New from './pages/new';
import Logs from './pages/logs';
import Settings from './pages/settings';



const Drawer = DrawerNavigator({
    New: {
      screen: New,
      navigationOptions: {
        tabBarLabel: 'New Log',
      },
    },
    Logs: {
      screen: Logs,
      navigationOptions: {
        title: 'View Logs',
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings',
      },
    },
});

export const Root = StackNavigator({
    Drawer: {
      screen: Drawer,
    },
}, 
{
    navigationOptions:(props) => ({
        headerTitle:'InsuLog',
        headerLeft:(
            <BurgerMenu onBurgerPress={() => props.navigation.navigate('DrawerOpen')}/>
        ),

    }),
});
