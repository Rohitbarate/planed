import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppContext} from '../context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const {user, logout, token} = useContext(AppContext);
  // const [token,setToken] = useState('')

  useEffect(() => {
    // getUser();
    // console.log({user});
  }, []);

  // const getUser = async () => {
  //   let userData = await AsyncStorage.getItem('user');
  //   let token = await AsyncStorage.getItem('token');
  //   if (userData) {
  //     // console.log({userData: JSON.parse(userData)});
  //   }
  //   if (token) {
  //     // console.log({token: JSON.parse(token)});
  //     setToken(token)
  //   }
  // };

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
      ToastAndroid.show('sign out successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      <Text
        style={{
          color: '#000',
          fontWeight: '600',
          fontSize: 26,
          marginVertical: 10,
        }}>
        Profile
      </Text>
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          paddingVertical: 10,
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={
            user.photo
              ? {uri: user.photo}
              : require('../assets/images/defaultProfile.png')
          }
          resizeMode="cover"
          style={{
            aspectRatio: 1,
            width: 70,
            borderRadius: 50,
            borderWidth: 4,
            borderColor: '#58abd4',
            marginRight: 10,
          }}
        />
        <View>
          <Text style={{color: '#000', fontSize: 20}}>{user.name}</Text>
          <Text style={{color: 'grey'}}>{user.email}</Text>
        </View>
      </View>

      <Text style={{color: '#000'}}>Mobile No :{user.mobileNo}</Text>
      {/* <Text style={{color: '#000'}}>token :{token}</Text> */}
      <TouchableOpacity style={styles.BTN} onPress={signOut}>
        {loading ? (
          <ActivityIndicator size={20} color="red" />
        ) : (
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              alignSelf: 'center',
              fontWeight: '500',
            }}>
            Sign out
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  BTN: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#58abd4',
  },
});
