/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import {
  AsyncStorage,
  FlatList,
  TextInput,
  View,
} from 'react-native';
import styles from './styles';
import TasksListCell from '../TasksListCell';

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
    const singleTask = {
      completed: false,
      text: this.state.text,
    };

    const listOfTasks = [
      ...this.state.listOfTasks,
      singleTask,
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

  _renderRowData = (item, index) => (
    <TasksListCell
      completed={item.completed}
      id={index}
      onPress={(index) => this._completeTask(index)}
      text={item.text}
    />
  );

  _completeTask = async (index) => {
    const singleUpdatedTask = {
      ...this.state.listOfTasks[index],
      completed: !this.state.listOfTasks[index].completed,
    };

    const listOfTasks = this.state.listOfTasks.slice();
    listOfTasks[index] = singleUpdatedTask;

    await AsyncStorage.setItem(
      'listOfTasks',
      JSON.stringify(listOfTasks),
    );

    this._updateList();
  };

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
          renderItem={({ item, index }) => this._renderRowData(item, index)}
          keyExtractor={(item) => item.index}
        />
      </View>
    );
  }
}
