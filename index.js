import { AppRegistry } from 'react-native';
import React, {Component} from 'react';

import {Root} from './router';

class MyApp extends Component {
    render() {
        return <Root />;
    }
}
AppRegistry.registerComponent('InsuLog', () => MyApp);
