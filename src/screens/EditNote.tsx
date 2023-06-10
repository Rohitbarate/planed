import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {addNotes, editNote} from '../apis/noteControllers';
import {AppContext} from '../context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditNote = ({navigation, route}) => {
  const {preNote, ID} = route.params;

  const [note, setNote] = useState({
    title: preNote.title,
    description: preNote.description,
    label: preNote.label,
  });
  // const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const {token} = useContext(AppContext);

  const editNoteHandler = async () => {
    setLoading(true);
    try {
      console.log({token, ID, note});
      const res = await editNote(token, ID, note);
      if (res) {
        console.log({res});
        ToastAndroid.show('Note Edited Successfully..!', ToastAndroid.SHORT);
        navigation.goBack();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log({error});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView>
          <View style={styles.form}>
            <View style={{position: 'relative'}}>
              <TextInput
                placeholder="label e.g. WORK"
                placeholderTextColor={'grey'}
                value={note.label}
                keyboardType="default"
                autoCapitalize="none"
                // onBlur={}
                textAlignVertical={
                  note.label.length !== 0 ? 'bottom' : 'center'
                }
                // selectTextOnFocus={true}
                // defaultValue={user.givenName}
                onChangeText={label => setNote({...note, label})}
                style={[
                  styles.input,
                  {
                    borderRadius: 10,
                  },
                ]}
              />
              {note.label.length !== 0 && (
                <Text style={styles.label}>label</Text>
              )}
            </View>
            <View style={{position: 'relative'}}>
              <TextInput
                placeholder="title e.g. Complete home work"
                placeholderTextColor={'grey'}
                value={note.title}
                keyboardType="default"
                autoCapitalize="none"
                // onBlur={}
                textAlignVertical={
                  note.title.length !== 0 ? 'bottom' : 'center'
                }
                // selectTextOnFocus={true}
                // defaultValue={user.givenName}
                onChangeText={title => setNote({...note, title})}
                style={[
                  styles.input,
                  {
                    borderRadius: 10,
                  },
                ]}
              />
              {note.title.length !== 0 && (
                <Text style={styles.label}>title</Text>
              )}
            </View>
            <View style={{position: 'relative'}}>
              <TextInput
                placeholder="description"
                placeholderTextColor={'grey'}
                value={note.description}
                keyboardType="default"
                autoCapitalize="none"
                // onBlur={}
                textAlignVertical={
                  note.description.length !== 0 ? 'bottom' : 'center'
                }
                // selectTextOnFocus={true}
                // defaultValue={user.givenName}
                onChangeText={description => setNote({...note, description})}
                style={[
                  styles.input,
                  {
                    borderRadius: 10,
                  },
                ]}
              />
              {note.description.length !== 0 && (
                <Text style={styles.label}>description</Text>
              )}
            </View>
            <TouchableOpacity
              disabled={
                (note.title.length !== 0 &&
                  note.description.length !== 0 &&
                  note.label.length !== 0 &&
                  note.title !== preNote.title) ||
                note.description !== preNote.description ||
                note.label !== preNote.label
                  ? false
                  : true
              }
              style={[
                styles.BTN,
                {
                  opacity:
                    (note.title.length >= 2 &&
                      note.description.length >= 2 &&
                      note.label.length >= 2 &&
                      note.title !== preNote.title) ||
                    note.description !== preNote.description ||
                    note.label !== preNote.label
                      ? 1
                      : 0.3,
                },
              ]}
              onPress={() => {
                editNoteHandler();
              }}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    alignSelf: 'center',
                    fontWeight: '500',
                  }}>
                  Edit Note
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2dfee',
    paddingHorizontal: 16,
  },
  inputBox: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  form: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    paddingTop: 10,
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    color: '#000',
    paddingHorizontal: 10,
    height: 60,
    fontSize: 18,
    marginVertical: 10,
  },
  label: {
    color: '#00000070',
    position: 'absolute',
    top: 12,
    left: 10,
    fontSize: 14,
  },
  BTN: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#58abd4',
  },
});
