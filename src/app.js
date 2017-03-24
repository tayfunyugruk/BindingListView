import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Image
} from 'react-native';
import _ from 'lodash';
import BindingListView from './BindingListView';
import TestRow from "./TestRow";

const images = [
  'https://i.imgur.com/GCBVgXDb.jpg',
  'https://i.imgur.com/EXQVxqQb.jpg',
  'https://i.imgur.com/zADtGy9b.jpg',
  'https://i.imgur.com/EZDQNshb.jpg',
  'https://i.imgur.com/Jvh1OQmb.jpg',
  'https://i.imgur.com/tqZm14Rb.jpg',
  'https://i.imgur.com/9NltrAUb.jpg',
  'https://i.imgur.com/t6X0wXBb.jpg',
  'https://i.imgur.com/w7L7Rdkb.jpg',
  'https://i.imgur.com/JhkYX7Ob.jpg'
];

const names = require('./names.json');
const contacts = [];
for (let i=0 ; i<10 ; i++) {
  const first = _.sample(names);
  const last = _.sample(names);
  contacts.push({
    name: `${first} ${last}`,
    initials: `${first.charAt(0)}${last.charAt(0)}`,
    image: [{uri: images[i%10]}]
  });
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BindingListView
          rows={contacts}
          rowHeight={100}
          poolSize={20}
          style={{flex: 1}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  rowBody: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: 'white'
  },
  initialsCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#49bed8',
    borderRadius: 25,
    width: 50,
    height: 50,
    marginRight: 15
  },
  imageCircle: {
    width: 50,
    height: 50
  },
  initials: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  name: {
    fontSize: 20,
    backgroundColor: 'white',
    flex: 1
  }
});

AppRegistry.registerComponent('TestRow', () => TestRow);
AppRegistry.registerComponent('BindingListView', () => App);
