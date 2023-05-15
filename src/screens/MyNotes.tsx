import {StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
import React, {useContext, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const MyNotes = (): JSX.Element => {
  // const {notes} = useContext(AppContext);
  const [notes, setNote] = useState([]);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} showHideTransition="fade"  />
      {/* <FlatList
        data={note}
        renderItem={({item}) => {
          return (
            <View style={styles.noteBox}>
              <Text style={{color: Colors.dark}}>{item.title}</Text>
            </View>
          );
        }}
      /> */}
    </View>
  );
};

export default MyNotes;

const styles = StyleSheet.create({
  noteBox: {
    borderColor: '#000',
    borderWidth: 2,
    margin: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
