import React from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TasksList from './TasksListContainer';
import EditTask from '../components/EditTask';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
});

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <TasksList {...props} />
    </View>
  );
}

function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="EditTask"
          component={EditTask}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
