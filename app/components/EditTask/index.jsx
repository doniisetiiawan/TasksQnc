/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from 'react-native-datepicker';
import moment from 'moment';
import styles from './styles';
import ExpandableCell from '../ExpandableCell';

class EditTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      expanded: false,
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

  _onExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  _clearDate = () => {
    this.setState({
      dateSelected: false,
    });
  };

  render() {
    const noDueDateTitle = 'Set Reminder';
    const dueDateSetTitle = `Due On ${this.state.formattedDate}`;

    return (
      <View style={styles.editTaskContainer}>
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
