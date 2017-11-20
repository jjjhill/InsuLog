import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

import BurgerMenu from './components/burgermenu';
import New from './pages/new';
import Logs from './pages/logs';
import Settings from './pages/settings';
import MFP from './pages/mfp';


const Drawer = DrawerNavigator({
    New: {
      screen: New,
      navigationOptions: {
        title: 'New',
      },
    },
    Logs: {
      screen: Logs,
      navigationOptions: {
        title: 'Logs',
      },
    },
    MFP: {
      screen: MFP,
      navigationOptions: {
        title: 'My Fitness Pal Search',
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
    Logs: {
      screen: Logs,
    },
    MFP: {
      screen: MFP,
    }
}, 
{
    navigationOptions:(props) => ({
        headerTitle:'InsuLog',
        headerLeft:(
            <BurgerMenu onBurgerPress={() => props.navigation.navigate('DrawerOpen')}/>
        ),

    }),
});
