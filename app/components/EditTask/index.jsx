/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import { View } from 'react-native';
import DateTimePicker from 'react-native-datepicker';
import moment from 'moment';
import styles from './styles';
import ExpandableCell from '../ExpandableCell';

class EditTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  _onDateChange = (date) => {
    this.setState({
      date,
      dateSelected: true,
      formattedDate: this._formatDate(date),
    });
  };

  _formatDate = (date) => moment(date).format('MMMM Do YYYY');

  render() {
    const noDueDateTitle = 'Set Reminder';
    const dueDateSetTitle = `Due On ${this.state.formattedDate}`;

    return (
      <View style={styles.editTaskContainer}>
        <ExpandableCell
          title={
            this.state.dateSelected
              ? dueDateSetTitle
              : noDueDateTitle
          }
        >
          <DateTimePicker
            style={{ width: 'auto' }}
            date={this.state.date}
            onDateChange={this._onDateChange}
          />
        </ExpandableCell>
      </View>
    );
  }
}

export default EditTask;
