import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyNotes from '../screens/MyNotes';
import NoteForm from '../screens/NoteForm';
import Icon from 'react-native-vector-icons/Feather';
import Settings from '../screens/Settings';
import HomeStack from './HomeStack';
import MyTabBar from './MyTabBar';

const RootStack = () => {
  const Tab = createBottomTabNavigator();
  const {height, width} = useWindowDimensions();

  return (
    <Tab.Navigator
      // tabBar={props => <MyTabBar {...props} />}
      initialRouteName="MyNotes"
      screenOptions={{
        tabBarHideOnKeyboard:true,
        tabBarStyle: {
          backgroundColor: '#58abd4',
          
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ffffff80',
        headerStyle: {
          backgroundColor: '#58abd4',
        },
        headerTitleStyle: {
          color: '#fff',
        },
      }}>
      <Tab.Screen
        name="MyNotes"
        component={HomeStack}
        options={{
          headerShown: false,
          headerTitle: 'My Notes',
          tabBarLabel: 'My Notes',
          tabBarIcon: ({color, size}) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddNote"
        component={NoteForm}
        options={{
          headerShown: false,
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
