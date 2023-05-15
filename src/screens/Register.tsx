import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  Button,
  ScrollView,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { AppContext } from '../context/appContext';

const Register = ({navigation}) => {
  const [regUser, setRegUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const {user, login} = useContext(AppContext);
  const {width} = useWindowDimensions();

  useEffect(() => {
    // GoogleSignin.configure({
    //   webClientId:
    //     '368860883862-ubfirn2urs8lr6kor75gruntdoubmhh9.apps.googleusercontent.com',
    // });
    // signOut();
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const Data = await GoogleSignin.signIn();
      // setUserInfo(Data.user);
      setLoading(false);
      navigation.replace('getOtherData', {
        userInfo: {...Data.user,googleUser:true},
      });
      console.log(Data.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the Register flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      console.log('sign out successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
      <ScrollView keyboardShouldPersistTaps='always' style={{flex: 1}}>
        <View style={[styles.form, {paddingHorizontal: width / 20}]}>
          <Animated.View
          
          >
            <Text
              style={{
                fontSize: 20,
                color: '#000',
                fontWeight: '600',
                marginVertical: 20,
              }}>
             Log in or sign up to Planed
            </Text>
          </Animated.View>
          <View style={{position: 'relative'}}>
            <TextInput
              placeholder="Email Id"
              placeholderTextColor={'grey'}
              value={regUser.email}
              // selectTextOnFocus={true}
              // defaultValue={user.givenName}
              onChangeText={email => setRegUser({...regUser, email})}
              style={[
                styles.input,
                {
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  paddingTop: regUser.email.length !== 0 ? 30 : 10,
                },
              ]}
            />
            {regUser.email.length !== 0 && (
              <Text style={styles.label}>Email Id</Text>
            )}
          </View>
          <View style={{position: 'relative'}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'grey'}
              value={regUser.password}
              onChangeText={password => setRegUser({...regUser, password})}
              // defaultValue={user.familyName}
              style={[
                styles.input,
                {
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderTopWidth: 0,
                  paddingTop: regUser.password.length !== 0 ? 30 : 10,
                },
              ]}
            />
            {regUser.password.length !== 0 && (
              <Text style={styles.label}>Password</Text>
            )}
          </View>
          <Text
            style={{
              color: '#00000070',
              fontSize: 13,
              paddingTop: 5,
              alignSelf: 'center',
              paddingBottom: 15,
              paddingHorizontal: 5,
            }}>
            Password should minimum 8 letters long and it consist of atleast 1
            symbol,number and Capital Letter.
          </Text>
          <TouchableOpacity
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 10,
            }}
            onPress={()=>{navigation.replace('getOtherData', {
              userInfo: regUser,
            });}}
          >
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                alignSelf: 'center',
                fontWeight: '500',
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#00000050',
            alignSelf: 'center',
            marginVertical: 15,
            fontSize: 18,
          }}>
          OR
        </Text>
        <View style={{alignItems: 'center'}}>
          {!loading ? (
            <GoogleSigninButton
              style={{width: 192, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
              // disabled={this.state.isSigninInProgress}
            />
          ) : (
            <ActivityIndicator size={30} color={'red'} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 20,
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    color: '#000',
    paddingHorizontal: 10,
    height: 60,
    fontSize: 16,
    // paddingTop:30
  },
  label: {
    color: '#00000070',
    position: 'absolute',
    top: 5,
    left: 10,
    fontSize: 12,
  },
});
