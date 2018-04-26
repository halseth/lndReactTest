/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules
} from 'react-native';

var Lnd = NativeModules.LndReactModule;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button
            onPress={buttonClick}
            title="Start lnd"
            color="#841584"
        />
        <Button
            onPress={getInfo}
            title="Get info"
            color="#841584"
        />
      </View>
    );
  }
}

function buttonClick() {
    console.log("start clicked")
    Lnd.start((error, events) => {
         if (error) {
            console.error(error);
         } else {
             console.log(events)
         }
    });
}

function getInfo() {
    console.log("getInfo clicked")
    Lnd.getInfo((error, events) => {
         if (error) {
            console.error(error);
         } else {
             console.log(events)
         }
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
