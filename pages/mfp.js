import React, { Component } from 'react';
import {
    WebView
} from 'react-native';

export default class MFP extends Component<{}> {
  render() {
    return (
        <WebView source={{uri: 'http://www.myfitnesspal.com/food/calorie-chart-nutrition-facts'}}>
        </WebView>
    );   
  }
}
