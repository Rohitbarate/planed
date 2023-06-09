import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import RootStack from './src/navigation/RootStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './src/context/appContext';
import CustomAlert from './src/components/atoms/CustomAlert';
// const baseUrl = process.env.BASE_URL

import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

function App(): JSX.Element {
  const [loading, setLoading] = useState(false);
  // const {user} = useContext(AppContext)
  const {user, logout, login, alert} = useContext(AppContext);

  console.log('app => ', user);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '368860883862-ubfirn2urs8lr6kor75gruntdoubmhh9.apps.googleusercontent.com',
    });

    const getUser = async () => {
      setLoading(true);
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        setLoading(false);
        return logout();
      }
      login(JSON.parse(userData));
      setLoading(false);
    };
    getUser();
  }, []);

  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-9923230267052642/1773924431';

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        // onAdFailedToLoad={}
      />
      {alert && <CustomAlert />}
      {!loading ? (
        user === null ? (
          <AuthStack />
        ) : (
          <RootStack />
        )
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={34} color="red" />
        </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
