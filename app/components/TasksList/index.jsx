import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';

const DATA = [
  'Buy milk',
  'Walk the dog',
  'Do laundry',
  'Write the first chapter of my book',
];

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: DATA,
    };
  }

  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={({ item }) => item}
      />
    );
  }
}
