import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

function EditTask() {
  return (
    <View style={styles.editTaskContainer}>
      <Text style={styles.editTaskText}>Editing Task</Text>
    </View>
  );
}

export default EditTask;
