import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import styles from './styles';

class TasksListCell extends React.Component {
  _getDueDate = () => {
    if (this.props.formattedDate && !this.props.completed) {
      return `Due ${this.props.formattedDate}`;
    }
    return '';
  };

  render() {
    const isCompleted = this.props.completed
      ? 'line-through'
      : 'none';

    return (
      <View
        key={this.props.id}
        style={styles.tasksListCellContainer}
      >
        <TouchableHighlight
          onLongPress={() => this.props.onLongPress()}
          onPress={() => this.props.onPress(this.props.id)}
          underlayColor="#D5DBDE"
        >
          <View style={styles.tasksListCellTextRow}>
            <Text
              style={[
                styles.taskNameText,
                { textDecorationLine: isCompleted },
              ]}
            >
              {this.props.text}
            </Text>
            <Text style={styles.dueDateText}>
              {this._getDueDate()}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default TasksListCell;

TasksListCell.propTypes = {
  completed: PropTypes.bool,
  id: PropTypes.number.isRequired,
  onLongPress: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string,
};

TasksListCell.defaultProps = {
  completed: false,
  text: '',
};
