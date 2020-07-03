/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StyleSheet, View, Platform, Text, StatusBar,
} from 'react-native';
import TasksList from './app/components/TasksList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <TasksList />
    </View>
  );
}
