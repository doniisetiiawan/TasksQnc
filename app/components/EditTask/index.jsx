/* eslint-disable react/no-access-state-in-setstate */
import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Button,
  TextInput,
  Text,
  Switch,
} from 'react-native';
import DateTimePicker from 'react-native-datepicker';
import moment from 'moment';
import styles from './styles';
import ExpandableCell from '../ExpandableCell';

class EditTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: this.props.route.params.completed,
      date: new Date(this.props.route.params.due),
      dateSelected: this.props.route.params.formattedDate,
      formattedDate: this.props.route.params.formattedDate,
      expanded: false,
      text: this.props.route.params.text,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Edit',
      headerRight: () => (
        <Button
          onPress={
            this.props.route.params.onRightButtonPress
          }
          title="Save"
        />
      ),
    });
  }

  _onDateChange = (date) => {
    const formattedDate = this._formatDate(date);

    this.setState({
      date,
      dateSelected: true,
      formattedDate,
    });

    this.props.route.params.changeTaskDueDate(
      date,
      formattedDate,
    );
  };

  _formatDate = (date) => moment(date).format('MMMM Do YYYY');

  _onExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  _clearDate = () => {
    this.setState({
      dateSelected: false,
    });

    this.props.route.params.clearTaskDueDate();
  };

  _changeTextInputValue = (text) => {
    this.setState({
      text,
    });

    this.props.route.params.changeTaskName(text);
  };

  _onSwitchToggle = (completed) => {
    this.setState({
      completed,
    });

    this.props.route.params.changeTaskCompletionStatus(
      completed,
    );
  };

  render() {
    const noDueDateTitle = 'Set Reminder';
    const dueDateSetTitle = `Due On ${this.state.formattedDate}`
      || this.props.route.params.formattedDate;

    return (
      <View style={styles.editTaskContainer}>
        <View>
          <TextInput
            autoCorrect={false}
            onChangeText={(text) => this._changeTextInputValue(text)}
            returnKeyType="done"
            style={styles.textInput}
            value={this.state.text}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Completed</Text>
          <Switch
            onValueChange={(value) => this._onSwitchToggle(value)}
            value={this.state.completed}
          />
        </View>
        <View
          style={[
            styles.expandableCellContainer,
            {
              maxHeight: this.state.expanded
                ? this.state.datePickerHeight
                : 40,
            },
          ]}
        >
          <ExpandableCell
            title={
              this.state.dateSelected
                ? dueDateSetTitle
                : noDueDateTitle
            }
            expanded={this.state.expanded}
            onPress={() => this._onExpand()}
          >
            <DateTimePicker
              style={{ width: 'auto' }}
              date={this.state.date}
              onDateChange={this._onDateChange}
            />
          </ExpandableCell>
        </View>
        <View style={styles.clearDateButtonContainer}>
          <Button
            color="#B44743"
            disabled={!this.state.dateSelected}
            onPress={() => this._clearDate()}
            title="Clear Date"
          />
        </View>
      </View>
    );
  }
}

export default EditTask;

EditTask.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};
