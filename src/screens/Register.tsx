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
  Image,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {AppContext} from '../context/appContext';
import {findUser, getUser, loginUser} from '../apis/userControllers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/atoms/CustomAlert';

const Register = ({navigation}) => {
  const [regUser, setRegUser] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const {user, login, alert, setAlertMsg,logout} = useContext(AppContext);
  const {width} = useWindowDimensions();

  useEffect(() => {
    // setAlertMsg('nice its awesome');
    // GoogleSignin.configure({
    //   webClientId:
    //     '368860883862-ubfirn2urs8lr6kor75gruntdoubmhh9.apps.googleusercontent.com',
    // });
    // signOut();
  }, []);

  const signInWithEmail = async () => {
    try {
      setLoading(true);
      const res = await findUser({email: regUser.email});
      // Alert.alert(JSON.stringify(res))
      if (res.user) {
        if (res.user.provider == 'google') {
          setLoading(false);
          navigation.navigate('userExist', {
            userInfo: {...res.user},
          });
        } else {
          setLoading(false);
          navigation.navigate('checkpass', {
            userInfo: {...res.user},
          });
        }
      } else {
        setLoading(false);
        navigation.navigate('getOtherData', {
          userInfo: {email: regUser.email, provider: 'email'},
        });
      }
    } catch (error) {
      setLoading(false);
      console.log('frt : ', error);
    }
  };

  const signIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const Data = await GoogleSignin.signIn();
      const res = await findUser({email: Data.user.email});
      // setUserInfo(Data.user);
      if (res.user) {
        if (res.user.provider == 'email') {
          setLoading(false);
          navigation.navigate('checkpass', {
            userInfo: {...res.user},
          });
        } else {
          const loggedUser = await loginUser(res.user);
          login(loggedUser.user,loggedUser.token);
          // console.log({loggedUser});
          setLoading(false);
          await AsyncStorage.setItem('user', JSON.stringify(loggedUser.user));
          await AsyncStorage.setItem('token', JSON.stringify(loggedUser.token));
        }
      } else {
        setLoading(false);
        navigation.navigate('getOtherData', {
          userInfo: {...Data.user, provider: 'google'},
        });
      }
      setLoading(false);
      // navigation.navigate('getOtherData', {
      //   userInfo: {...Data.user,provider:'google'},
      // });
      // console.log(Data.user);
    } catch (error) {
      setLoading(false);
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
      logout(null);
      console.log('sign out successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#fff',
        position: 'relative',
        justifyContent: 'center',
      }}>
      {loading && (
        <>
          <StatusBar barStyle="light-content" backgroundColor="#00000050" />
          <View
            style={{
              flex: 1,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00000050',
              alignSelf: 'center',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}>
            <ActivityIndicator color={'red'} size={30} collapsable={true} />
          </View>
        </>
      )}
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{flex: 1, paddingHorizontal: width / 20}}>
        <View style={[styles.form]}>
          <Animated.View>
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
              keyboardType="email-address"
              autoCapitalize="none"
              // onBlur={}
              textAlignVertical={regUser.email.length !== 0?"bottom":"center"}
              // selectTextOnFocus={true}
              // defaultValue={user.givenName}
              onChangeText={email => setRegUser({...regUser, email})}
              style={[
                styles.input,
                {
                  borderRadius: 10,
                },
              ]}
            />
            {regUser.email.length !== 0 && (
              <Text style={styles.label}>Email Id</Text>
            )}
          </View>
          {/* <View style={{position: 'relative'}}>
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
          </View> */}
          <Text
            style={{
              color: '#00000070',
              fontSize: 13,
              paddingTop: 5,
              alignSelf: 'center',
              paddingBottom: 15,
              paddingHorizontal: 5,
            }}>
            We'll not send your email anywhere,and we'll confirm it soon.
          </Text>
          <TouchableOpacity
            style={styles.BTN}
            onPress={() => {
              signInWithEmail();
            }}>
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
          <Text
            style={{
              color: '#00000050',
              alignSelf: 'center',
              marginVertical: 15,
              fontSize: 18,
            }}>
            OR
          </Text>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={[styles.BTN]}
              onPress={() => {
                setAlertMsg('its working');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flex: 1,
                }}>
                <Image
                  source={require('../assets/images/phone.png')}
                  style={{
                    aspectRatio: 1,
                    height: 30,
                    width: 30,
                    marginRight: width / 9,
                  }}
                />

                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                    alignSelf: 'center',
                    fontWeight: '400',
                  }}>
                  Continue with phone
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.BTN]}
              onPress={() => {
                signIn();
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flex: 1,
                }}>
                <Image
                  source={require('../assets/images/google.png')}
                  style={{
                    aspectRatio: 1,
                    height: 30,
                    width: 30,
                    marginRight: width / 9,
                  }}
                />

                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                    alignSelf: 'center',
                    fontWeight: '400',
                  }}>
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
  BTN: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
