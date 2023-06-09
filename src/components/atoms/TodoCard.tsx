import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState, useEffect, useContext} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThreeDot from 'react-native-vector-icons/Entypo';
import {deleteNote} from '../../apis/noteControllers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../context/appContext';

const TodoCard = ({todo, id, i,fetchNotesFunc}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [token, setToken] = useState(null);
  const animation = useRef(new Animated.Value(0)).current;
  const {delNote} = useContext(AppContext);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    let token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('login first....!');
    } else {
      setToken(JSON.parse(token));
    }
  };

  const deleteNoteHandler = async()=>{
    const res = await deleteNote(token, id);
    console.log({res});
    deleteNote(id);
    fetchNotesFunc(token)
  }

  const showOptionshandler = todo => {
    // Animated.spring(animation, {
    //   toValue: showOptions ? 0 : 1,
    //   useNativeDriver: true,
    // }).start();
    Alert.alert(
      todo.label.toUpperCase(),
      i + '. ' + todo.title,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'Edit',
          onPress: () => console.log('edit Pressed'),
        },
        {
          text: 'Delete',
          onPress: () => deleteNoteHandler(),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <View style={styles.noteBox}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            backgroundColor: '#000',
            padding: 5,
            borderRadius: 5,
            textAlignVertical: 'center',
            color: '#fff',
            textTransform: 'uppercase',
            fontSize: 12,
            alignSelf: 'flex-start',
          }}>
          {todo.label}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowOptions(!showOptions);
            showOptionshandler(todo);
          }}>
          <ThreeDot
            name="dots-three-vertical"
            size={20}
            color="#000"
            style={{alignSelf: 'flex-end', marginBottom: 5}}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: '#000',
          fontSize: 18,
          fontWeight: '600',
          textTransform: 'capitalize',
          // flex: 0.9,
        }}>
        {i + '. ' + todo.title}
      </Text>
      <View
        style={{
          backgroundColor: 'grey',
          height: 1,
          marginVertical: 8,
          zIndex: 0,
        }}
      />

      <Text
        style={{color: '#00000090', fontSize: 16, textTransform: 'capitalize'}}>
        {todo.description}
      </Text>
      {/* more options div */}
      {/* {showOptions && ( */}
      <Animated.View
        style={[
          {
            backgroundColor: '#000',
            flexDirection: 'column',
            alignItems: 'center',
            paddingVertical: 15,
            borderRadius: 15,
            paddingHorizontal: 10,
            justifyContent: 'space-evenly',
            position: 'absolute',
            borderTopRightRadius: 0,
            top: 25,
            right: 20,
            zIndex: 10,
          },
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                }),
              },
              {
                scale: animation,
              },
            ],
          },
        ]}>
        <TouchableOpacity>
          <Icon name="edit" size={22} color="#fff" style={{marginBottom: 15}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="trash-o" size={22} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      {/* )} */}
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  noteBox: {
    borderColor: '#000',
    borderWidth: 2,
    margin: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'relative',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    backgroundColor: '#9acee8',
  },
});
