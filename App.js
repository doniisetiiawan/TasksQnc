/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import TasksList from './app/components/TasksList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Platform.OS === 'ios' ? 18 : 0,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <TasksList />
    </View>
  );
}
