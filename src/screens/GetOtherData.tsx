import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/appContext';

const GetOtherData = ({navigation, route}) => {
  const userInfo = route.params.userInfo;
  const [finalUser, setFinalUser] = useState({
    fName: userInfo.givenName || '',
    lName: userInfo.familyName || '',
    email: userInfo.email,
    mobileNo:userInfo.phone || '',
    // dob: '',
    photo: userInfo.photo,
    password:userInfo.password || ''
  });
  const {width} = useWindowDimensions();
  // const {user,setUser}= useContext(AppContext)
  const {user, login} = useContext(AppContext);


  const registerUser = async ()=>{
      login(finalUser)
     await AsyncStorage.setItem('user',JSON.stringify(finalUser))
      // console.log({user});
      
  }

  return (
    // <KeyboardAvoidingView >
    <View style={{flex: 1, paddingTop: 20, backgroundColor: '#fff'}}>
      <TouchableOpacity 
        onPress={()=>navigation.replace('register')}
        style={{alignSelf:'flex-start',marginLeft:10,padding:5 }}
      >
        <Icon name={'arrowleft'} size={24} color={'#000'} />
      </TouchableOpacity>
      <ScrollView 
      keyboardShouldPersistTaps='always'
       showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={[styles.form, {paddingHorizontal: width / 20}]}>
          <Text
            style={{
              fontSize: 24,
              color: '#000',
              fontWeight: '600',
              marginBottom: 20,
            }}>
            Add your info
          </Text>
          <View style={{position: 'relative'}}>
            <TextInput
              placeholder="First name"
              placeholderTextColor={'grey'}
              value={finalUser.fName}
              selectTextOnFocus={true}
              // defaultValue={user.givenName}
              onChangeText={fName => setFinalUser({...finalUser, fName})}
              style={[
                styles.input,
                {
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  paddingTop: finalUser.fName.length !== 0 ? 30 : 10,
                },
              ]}
            />
            {finalUser.fName.length !== 0 && (
              <Text style={styles.label}>First name</Text>
            )}
          </View>
          <View style={{position: 'relative'}}>
            <TextInput
              placeholder="Last name"
              placeholderTextColor={'grey'}
              value={finalUser.lName}
              onChangeText={lName => setFinalUser({...finalUser, lName})}
              // defaultValue={user.familyName}
              style={[
                styles.input,
                {
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderTopWidth: 0,
                  paddingTop: finalUser.lName.length !== 0 ? 30 : 10,
                },
              ]}
            />
            {finalUser.lName.length !== 0 && (
              <Text style={styles.label}>Last name</Text>
            )}
          </View>
          <Text
            style={{
              color: '#00000070',
              fontSize: 13,
              paddingTop: 5,
              alignSelf: 'center',
              paddingBottom: 15,
            }}>
            Make sure it matches the name on your government ID.
          </Text>
          <View style={{position: 'relative'}}>
            <TextInput
              style={[
                styles.input,
                {
                  borderRadius: 10,
                  backgroundColor: '#00000010',
                  color: '#00000050',
                  borderColor: '#00000030',
                  paddingTop: finalUser.email.length !== 0 ? 30 : 10,
                },
              ]}
              value={finalUser.email}
              placeholder="Email Id"
              placeholderTextColor={'grey'}
              // onChangeText={(email)=>setFinalUser({...finalUser,email})}
              // defaultValue={user.email}
              editable={false}
              selectTextOnFocus={false}
            />
            {finalUser.email.length !== 0 && (
              <Text style={styles.label}>Email Id</Text>
            )}
          </View>
          <View style={{position: 'relative', marginVertical: 15}}>
            <TextInput
              style={[
                styles.input,
                {
                  borderRadius: 10,
                  paddingTop: finalUser.mobileNo.length !== 0 ? 30 : 10,
                },
              ]}
              value={finalUser.mobileNo}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={mobileNo => setFinalUser({...finalUser, mobileNo})}
              // defaultValue={user.email}
              placeholder="Phone number"
              placeholderTextColor={'#00000050'}
            />
            {finalUser.mobileNo.length !== 0 && (
              <Text style={styles.label}>Phone number</Text>
            )}
          </View>
          {/* <View style={{position: 'relative', marginVertical: 15}}>
            <TextInput
              style={[
                styles.input,
                {
                  borderRadius: 10,
                  paddingTop: finalUser.dob.length !== 0 ? 30 : 10,
                },
              ]}
              value={finalUser.dob}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={dob => setFinalUser({...finalUser, dob})}
              // defaultValue={user.email}
              placeholder="Birthday"
              placeholderTextColor={'#00000050'}
            />
            {finalUser.dob.length !== 0 && (
              <Text style={styles.label}>Birthday</Text>
            )}
          </View> */}
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              paddingTop: 5,
              alignSelf: 'center',
              paddingBottom: 15,
            }}>
            By selecting <Text style={{fontWeight:'600'}}>Agree and continue</Text>, I agree to Planed's <Text style={{textDecorationStyle:'dashed',textDecorationLine:'underline'}} >Terms of services, payments Terms of Service </Text>and acknowledge the <Text style={{textDecorationStyle:'dashed',textDecorationLine:'underline'}}>Privacy Policy</Text>
          </Text>
          <TouchableOpacity
        style={{paddingVertical:15,paddingHorizontal:10,borderWidth:1,borderColor:'#000',borderRadius:10,marginBottom:10}}
        onPress={registerUser}
        >
          <Text style={{color:'#000',fontSize:18,alignSelf:'center',fontWeight:'500'}}>Agree and continue</Text>
        </TouchableOpacity>
        </View>
        
      </ScrollView>
    </View>
    // </KeyboardAvoidingView>
  );
};

export default GetOtherData;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop:20
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
});
