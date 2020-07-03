/* eslint-disable react/no-access-state-in-setstate */
import PropTypes from 'prop-types';
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
    // AsyncStorage.clear();
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
      onLongPress={() => this._editTask(item)}
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

  _editTask = (rowData) => {
    this.props.navigation.push('EditTask', {
      completed: rowData.completed,
      due: rowData.due,
      formattedDate: rowData.formattedDate,
      text: rowData.text,
    });
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
          style={styles.textInput}
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

TasksList.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func),
};

TasksList.defaultProps = {
  navigation: {},
};
