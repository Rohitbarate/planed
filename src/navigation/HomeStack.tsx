import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyNotes from '../screens/MyNotes'
import EditNote from '../screens/EditNote'

const HomeStack = () => {

const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
        initialRouteName='myNotes'
     screenOptions={{
        headerStyle:{
            backgroundColor:'#000',
          },
          headerTitleStyle:{
            color:'#fff'
          }
     }}
    >
        <Stack.Screen name='myNotes' component={MyNotes} options={{headerTitle:'My Notes'}} />
        <Stack.Screen name='editNote' component={EditNote} options={{headerTitle:'Edit Note'}} />
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})