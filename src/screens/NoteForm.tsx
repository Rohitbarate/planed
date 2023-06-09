import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';

const NoteForm = () => {
  const [note, setNote] = useState({
    title: '',
    description: '',
    label: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView>
        <Text
          style={{
            color: '#000',
            fontWeight: '600',
            fontSize: 26,
            marginVertical: 20,
          }}>
          Add Note
        </Text>
        <View style={styles.form}>
          <View style={{position: 'relative'}}>
            <TextInput
              placeholder="label e.g. WORK"
              placeholderTextColor={'grey'}
              value={note.label}
              keyboardType="default"
              autoCapitalize="none"
              // onBlur={}
              textAlignVertical={note.label.length !== 0 ? 'bottom' : 'center'}
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
            {note.label.length !== 0 && <Text style={styles.label}>label</Text>}
          </View>
          <View style={{position: 'relative'}}>
            <TextInput
              placeholder="title e.g. Complete home work"
              placeholderTextColor={'grey'}
              value={note.title}
              keyboardType="default"
              autoCapitalize="none"
              // onBlur={}
              textAlignVertical={note.title.length !== 0 ? 'bottom' : 'center'}
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
            {note.title.length !== 0 && <Text style={styles.label}>title</Text>}
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
          <TouchableOpacity style={styles.BTN} onPress={() => {}}>
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
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoteForm;

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
  },
});
