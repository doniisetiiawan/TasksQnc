/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  TextInput,
  AsyncStorage,
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

  componentDidMount = () => {
    this._updateList();
  };

  _addTask = async () => {
    const listOfTasks = [
      ...this.state.listOfTasks,
      this.state.text,
    ];

    await AsyncStorage.setItem(
      'listOfTasks',
      JSON.stringify(listOfTasks),
    );

    this._updateList();
  };

  _updateList = async () => {
    const response = await AsyncStorage.getItem(
      'listOfTasks',
    );
    const listOfTasks = (await JSON.parse(response)) || [];

    this.setState({
      listOfTasks,
    });

    this._changeTextInputValue('');
  };

  _changeTextInputValue = (text) => {
    this.setState({
      text,
    });
  };

  _renderRowData = (rowData) => <Text>{rowData}</Text>;

  render() {
    const dataSource = this.state.listOfTasks;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          onChangeText={(text) => this._changeTextInputValue(text)}
          onSubmitEditing={() => this._addTask()}
          returnKeyType="done"
          value={this.state.text}
        />
        <FlatList
          enableEmptySections
          data={dataSource}
          renderItem={({ item }) => this._renderRowData(item)}
          keyExtractor={(item) => item}
        />
      </View>
    );
  }
}
