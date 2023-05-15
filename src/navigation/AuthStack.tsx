import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Register from '../screens/Register';
import GetOtherData from '../screens/GetOtherData';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="register" screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen
        name="register"
        component={Register}
       
      />
      <Stack.Screen
        name='getOtherData'
        component={GetOtherData}
        // options={{
        //   headerShown:true,
        //   headerTitle:'',
        //   headerShadowVisible:false,
        //   animation:'slide_from_bottom'
        // }}
        
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
