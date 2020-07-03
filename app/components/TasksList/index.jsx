/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  TextInput,
} from 'react-native';
import styles from './styles';

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfTasks: [],
      text: '',
    };
  }

  _addTask = () => {
    const newListOfTasks = [...this.state.listOfTasks, this.state.text];

    this.setState({
      listOfTasks: newListOfTasks,
    });

    this._changeTextInputValue('');
  };

  _changeTextInputValue = (text) => {
    this.setState({
      text,
    });
  };

  _renderRowData = (rowData) => (
    <Text>{rowData}</Text>
  );

  render() {
    const dataSource = this.state.listOfTasks;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          onChangeText={(text) => this._changeTextInputValue(text)}
          onSubmitEditing={() => this._addTask()}
          returnKeyType="done"
          style={styles.textInput}
          value={this.state.text}
        />
        <FlatList
          enableEmptySections
          data={dataSource}
          renderItem={({ item }) => this._renderRowData(item)}
          keyExtractor={({ item }) => item}
        />
      </View>
    );
  }
}
