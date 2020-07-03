import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

function TasksListCell(props) {
  const isCompleted = props.completed
    ? 'line-through'
    : 'none';
  const textStyle = {
    fontSize: 20,
    textDecorationLine: isCompleted,
  };

  return (
    <View key={props.id}>
      <TouchableHighlight
        onLongPress={() => props.onLongPress()}
        onPress={() => props.onPress(props.id)}
        underlayColor="#D5DBDE"
      >
        <Text style={textStyle}>{props.text}</Text>
      </TouchableHighlight>
    </View>
  );
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
