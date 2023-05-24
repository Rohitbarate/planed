import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {findUser, loginUser} from '../apis/userControllers';
import {AppContext, login} from '../context/appContext';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserExist = ({navigation, route}) => {
  const userInfo = route.params.userInfo;
  const [loading, setLoading] = useState(false);
  const {login} = useContext(AppContext);
  const {name, email, image} = userInfo;

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
          login(loggedUser.user);
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

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text style={styles.heading}>Account exists</Text>
        <Text style={styles.desc}>Looks like you already have an account.</Text>
      </View>

      <Image
        style={styles.img}
        source={image ? image : require('../assets/images/defaultProfile.png')}
      />
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity
        style={{
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderWidth: 1,
          borderColor: '#000',
          borderRadius: 10,
          flexDirection: 'row',
          marginVertical: 20,
        }}
        onPress={() => {
          signIn();
        }}>
        {loading ? (
          <ActivityIndicator color={'red'} size={30} />
        ) : (
          <>
            <Image
              source={require('../assets/images/google.png')}
              style={{aspectRatio: 1, height: 30, width: 30, marginRight: 30}}
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
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('register')}
        style={{alignSelf: 'flex-start'}}>
        <Text
          style={{
            textDecorationLine: 'underline',
            color: '#000',
            fontSize: 16,
          }}>
          Log in with a different account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserExist;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  heading: {
    color: '#000',
    fontWeight: '400',
    fontSize: 26,
  },
  desc: {
    color: '#00000050',
    fontWeight: '300',
  },
  img: {
    height: 180,
    width: 180,
  },
  name: {
    color: '#000',
    fontWeight: '400',
    marginVertical: 10,
    fontSize: 18,
  },
});
