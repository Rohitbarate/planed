import {StyleSheet, Text, View} from 'react-native';
import React,{useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyNotes from '../screens/MyNotes';
import NoteForm from '../screens/NoteForm';
import Icon from 'react-native-vector-icons/Feather';
import Settings from '../screens/Settings';

const RootStack = () => {
    const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="MyNotes"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'grey',
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="MyNotes"
        component={MyNotes}
        options={{
          headerTitle: 'My Notes',
          tabBarLabel: 'My Notes',
          tabBarIcon: ({color, size}) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddNote"
        component={NoteForm }
        options={{
          headerTitle: 'Add Note',
          tabBarLabel: 'Add Note',
          tabBarIcon: ({color, size}) => (
            <Icon name="plus-square" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          headerTitle: 'Settings',
          tabBarLabel: 'settings',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
