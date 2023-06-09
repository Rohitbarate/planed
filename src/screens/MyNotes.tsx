import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getNotes} from '../apis/noteControllers';
import {AppContext} from '../context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoCard from '../components/atoms/TodoCard';
// import Icon from 'react-native-vector-icons/FontAwesome'

const MyNotes = (): JSX.Element => {
  const {user, fetchAllNotes,notes} = useContext(AppContext);
  const [token, setToken] = useState();
  // const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log({token});
      setToken(JSON.parse(token));
      fetchNotes(JSON.parse(token));
    };
    getToken();
  }, []);

  const fetchNotes = async token => {
    try {
      setLoading(true);
      const res = await getNotes(token);
      console.log({res});
      if (res.notes) {
        fetchAllNotes(res.notes);
        // await AsyncStorage.setItem('notes', res.notes);
        setLoading(false);
        // setNotes(res.notes);
        console.log({notes: res.notes});
      } else {
        setLoading(false);
        console.log({msg: res.message});
        Alert.alert(res.message);
      }
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  return (
    <View style={{flex: 1,backgroundColor:'#c2dfee'}}>
      <StatusBar
        backgroundColor={'#58abd4'}
        barStyle={'light-content'}
        showHideTransition="fade"
      />
      {
      // !loading ? 
      (
        notes ? (
          <View style={{flex:1,position:'relative'}}>
          <FlatList
            data={notes}
            // refreshControl={
            //   // fetchNotes(token);
            // }
            bounces={true}
            onRefresh={()=>fetchNotes(token)}
            refreshing={loading}
            keyExtractor={(item)=>item._id}
            renderItem={({item,index}) => {
              return <TodoCard todo={item.note} id={item._id} i={index+1} fetchNotesFunc={fetchNotes} />
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
  addNoteBtn:{
    position:'absolute',
    backgroundColor:'#000',
    height:60,
    width:60,
    alignItems:'center',
    justifyContent:"center",
    borderRadius:50,
    bottom:20,
    right:20
  }
});
