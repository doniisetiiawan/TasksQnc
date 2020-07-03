/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TasksList from './app/components/TasksList';
import EditTask from './app/components/EditTask';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
});

const Stack = createStackNavigator();

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <TasksList {...props} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="EditTask"
          component={EditTask}
          options={{ title: 'Edit' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
