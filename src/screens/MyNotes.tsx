import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getNotes} from '../apis/noteControllers';
import {AppContext} from '../context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoCard from '../components/atoms/TodoCard';
// import Icon from 'react-native-vector-icons/FontAwesome'
import {useFocusEffect} from '@react-navigation/native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const MyNotes = ({navigation}): JSX.Element => {
  const {user, fetchAllNotes, notes, token} = useContext(AppContext);
  const [tkn, setToken] = useState(null);
  // const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes(token);
    }, []),
  );

  const fetchNotes = async token => {
    try {
      setLoading(true);
      const res = await getNotes(token);
      // console.log({res});
      ToastAndroid.show('Note Fetched Successfully..!',ToastAndroid.SHORT)
      if (res.notes) {
        fetchAllNotes(res.notes);
        // await AsyncStorage.setItem('notes', res.notes);
        setLoading(false);
        // setNotes(res.notes);
        console.log({notes: res.notes});
      } else {
        setLoading(false);
        
      }
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-9923230267052642/1773924431';

  return (
    <View style={{flex: 1, backgroundColor: '#c2dfee'}}>
      <StatusBar
        backgroundColor={'#58abd4'}
        barStyle={'light-content'}
        showHideTransition="fade"
      />
      <View style={{paddingVertical:10}}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          // onAdFailedToLoad={}
        />
      </View>
      {
        // !loading ?
        notes ? (
          <View style={{flex: 1, position: 'relative'}}>
            <FlatList
              data={notes}
              // refreshControl={
              //   // fetchNotes(token);
              // }
              bounces={true}
              onRefresh={() => fetchNotes(token)}
              refreshing={loading}
              keyExtractor={item => item._id}
              renderItem={({item, index}) => {
                return (
                  <TodoCard
                    todo={item.note}
                    id={item._id}
                    i={index + 1}
                    fetchNotesFunc={fetchNotes}
                    setLoading={setLoading}
                    navigation={navigation}
                  />
                );
              }}
            />

            {/* Add note button */}
            {/* <TouchableOpacity
              style={styles.addNoteBtn}
            >
              <Icon name='plus' size={30} color="#fff" />
            </TouchableOpacity> */}
          </View>
        ) : (
          <Text style={{color: '#000'}}>Notes you add appear here</Text>
        )
        // : (
        //   <ActivityIndicator color={'red'} size={28} style={{marginTop: 20}} />
        // )
      }
    </View>
  );
};

export default MyNotes;

const styles = StyleSheet.create({
  addNoteBtn: {
    position: 'absolute',
    backgroundColor: '#000',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    bottom: 20,
    right: 20,
  },
});
