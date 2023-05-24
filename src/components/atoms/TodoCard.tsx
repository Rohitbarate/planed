import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ThreeDot from 'react-native-vector-icons/Entypo';

const TodoCard = ({todo, id, i}) => {
  const [showOptions, setShowOptions] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const showOptionshandler = () => {
    Animated.spring(animation, {
      toValue: showOptions ? 0 : 1,
      useNativeDriver: true,
    }).start();
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
            showOptionshandler();
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
  },
});
