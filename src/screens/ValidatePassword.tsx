import {
  ActivityIndicator,
  Alert,
  Animated,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {loginUser} from '../apis/userControllers';
import {AppContext} from '../context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ValidatePassword = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {user, login, alert, setAlertMsg, logout} = useContext(AppContext);
  const [showPass, setShowPass] = useState(true);
  const {email, provider} = route.params.userInfo;

  const loginHandler = async () => {
    try {
      setLoading(true);
      const loggedUser = await loginUser({
        email,
        password,
        provider,
      });
      console.log({loggedUser});

      if (loggedUser.user && loggedUser.token) {
        await AsyncStorage.setItem('user', JSON.stringify(loggedUser.user));
        await AsyncStorage.setItem('token', JSON.stringify(loggedUser.token));
        login(loggedUser.user, loggedUser.token);
        setLoading(false);
      }
      setLoading(false);
      console.log({msg: loggedUser.message});
      // Alert.alert(loggedUser.message.msg);
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        // justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}>
      <Text style={styles.title}>Log in</Text>
      <View style={{position: 'relative', marginVertical: 20}}>
        <TextInput
          textAlignVertical={password.length !== 0 ? 'bottom' : 'center'}
          onChangeText={pass => {
            setPassword(pass);
          }}
          secureTextEntry={showPass}
          maxLength={15}
          placeholder="Password"
          placeholderTextColor={'grey'}
          style={styles.input}
        />
        {password.length !== 0 && <Text style={styles.label}>Password</Text>}
        <Text onPress={() => setShowPass(!showPass)} style={styles.ShowBtn}>
          {showPass ? 'Show' : 'Hide'}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: '#000',
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => {
          // setLoading(!loading)
          loginHandler();
        }}>
        {!loading ? (
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              alignSelf: 'center',
              fontWeight: '500',
            }}>
            Continue
          </Text>
        ) : (
          <ActivityIndicator color={'red'} size={24} collapsable={true} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // add forgot password screen
          Alert.alert('add forgot password screen');
        }}>
        <Text
          style={{
            textDecorationLine: 'underline',
            color: '#000',
            fontSize: 18,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          Forgot password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          // await GoogleSignin.signOut();
          // navigation.navigate('register');
        }}
        style={{alignSelf: 'flex-start'}}>
        <Text
          style={{
            textDecorationLine: 'underline',
            color: '#000',
            fontSize: 18,
            fontWeight: '500',
          }}>
          Log in with a different account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ValidatePassword;

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    color: '#000',
    paddingHorizontal: 10,
    height: 60,
    fontSize: 16,
    borderRadius: 10,
    // marginVertical: 20,
  },
  label: {
    color: '#00000070',
    position: 'absolute',
    top: 5,
    left: 10,
    fontSize: 12,
  },
  ShowBtn: {
    color: '#000',
    position: 'absolute',
    right: 15,
    top: 20,
    fontWeight: '600',
  },
});
