/* eslint-disable react/no-access-state-in-setstate */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  AsyncStorage,
  FlatList,
  TextInput,
  View,
} from 'react-native';
import hash from 'object-hash';
import styles from './styles';
import TasksListCell from '../TasksListCell';

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEditedTaskObject: undefined,
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
      due: new Date(),
      formattedDate: undefined,
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
      formattedDate={item.formattedDate}
      id={index}
      onPress={(index) => this.props.changeCompletionStatus(index)}
      text={item.text}
      onLongPress={() => alert('placeholder')}
    />
  );

  _completeTask = (index) => {
    const singleUpdatedTask = {
      ...this.state.listOfTasks[index],
      completed: !this.state.listOfTasks[index].completed,
    };

    this._saveAndUpdateSelectedTask(
      singleUpdatedTask,
      index,
    );
  };

  _saveAndUpdateSelectedTask = async (
    newTaskObject,
    rowID,
  ) => {
    const listOfTasks = this.state.listOfTasks.slice();
    listOfTasks[rowID] = newTaskObject;

    await AsyncStorage.setItem(
      'listOfTasks',
      JSON.stringify(listOfTasks),
    );

    this._updateList();
  };

  _editTask = (rowData, index) => {
    this.setState({
      currentEditedTaskObject: rowData,
    });

    this.props.navigation.push('EditTask', {
      onRightButtonPress: () => this._saveCurrentEditedTask(index),
      changeTaskCompletionStatus: (status) => this._updateCurrentEditedTaskObject(
        'completed',
        status,
      ),
      changeTaskDueDate: (date, formattedDate) => this._updateCurrentEditedTaskDueDate(
        date,
        formattedDate,
      ),
      changeTaskName: (name) => this._updateCurrentEditedTaskObject('text', name),
      clearTaskDueDate: () => this._updateCurrentEditedTaskDueDate(
        undefined,
        undefined,
      ),
      index,
      completed: this.state.currentEditedTaskObject
        .completed,
      due: this.state.currentEditedTaskObject.due,
      formattedDate: this.state.currentEditedTaskObject
        .formattedDate,
      text: this.state.currentEditedTaskObject.text,
    });
  };

  _updateCurrentEditedTaskDueDate = (
    date,
    formattedDate,
  ) => {
    this._updateCurrentEditedTaskObject('due', date);
    this._updateCurrentEditedTaskObject(
      'formattedDate',
      formattedDate,
    );
  };

  _updateCurrentEditedTaskObject = (key, value) => {
    const newTaskObject = {
      ...this.state.currentEditedTaskObject,
    };
    newTaskObject[key] = value;
    this.setState({
      currentEditedTaskObject: newTaskObject,
    });
  };

  _saveCurrentEditedTask = (rowID) => {
    this._saveAndUpdateSelectedTask(
      this.state.currentEditedTaskObject,
      rowID,
    );
    this.props.navigation.pop();
  };

  render() {
    const dataSource = this.props.listOfTasks;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          onChangeText={(text) => this.props.onChangeText(text)}
          onSubmitEditing={() => this.props.addTask(this.props.text)}
          returnKeyType="done"
          style={styles.textInput}
          value={this.props.text}
        />
        <FlatList
          enableEmptySections
          data={dataSource}
          renderItem={({ item, index }) => this._renderRowData(item, index)}
          keyExtractor={(item, index) => hash(index)}
        />
      </View>
    );
  }
}

TasksList.propTypes = {
  addTask: PropTypes.func.isRequired,
  changeCompletionStatus: PropTypes.func.isRequired,
  listOfTasks: PropTypes.objectOf(PropTypes.object),
  navigation: PropTypes.objectOf(PropTypes.func),
  onChangeText: PropTypes.func.isRequired,
  text: PropTypes.string,
};

TasksList.defaultProps = {
  listOfTasks: {},
  navigation: {},
  text: '',
};
