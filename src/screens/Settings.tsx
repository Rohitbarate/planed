import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppContext} from '../context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const {user, logout} = useContext(AppContext);
  const [token,setToken] = useState('')

  useEffect(() => {
    getUser();
    // console.log({user});
  }, []);

  const getUser = async () => {
    let userData = await AsyncStorage.getItem('user');
    let token = await AsyncStorage.getItem('token');
    if (userData) {
      // console.log({userData: JSON.parse(userData)});
    }
    if (token) {
      // console.log({token: JSON.parse(token)});
      setToken(token)
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // if (user.password.length === 0) {
      await GoogleSignin.signOut();
      // }
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      logout();
      setLoading(false);
      console.log('sign out successfully');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{color: '#000'}}>{user.name}</Text>
      <Text style={{color: '#000'}}>{user.email}</Text>
      <Text style={{color: '#000'}}>{user.mobileNo}</Text>
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#000',
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={signOut}>
        {loading ? (
          <ActivityIndicator size={20} color="red" />
        ) : (
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              alignSelf: 'center',
              fontWeight: '500',
            }}>
            Sign out
          </Text>
        )}
      </TouchableOpacity>
      {/* {userData && (
        <>
          <Text style={{color: '#000'}}>
            {userData.} {userData.lName}
          </Text>
          <Text style={{color: '#000'}}>{user.email}</Text>
          <Text style={{color: '#000'}}>{user.phoneNo}</Text>
        </>
      )} */}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
