import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef, useContext, useEffect} from 'react';
import {AppContext} from '../../context/appContext';

const CustomAlert = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);
  const {alert,setAlertMsg} = useContext(AppContext);

  useEffect(() => {
    // showView();
    // setIsVisible(true);
    // return () => {
      setTimeout(() => {
        setAlertMsg(null)
        // setIsVisible(false);
      }, 2000);
    // };
  }, []);

//   const showView = () => {
//     console.log('animation start');
//     Animated.spring(animation, {
//       toValue: 1,
//       useNativeDriver: true,
//     }).start();
//   };

  return (
    <Animated.View
      style={{
        height: 50,
        backgroundColor: 'red',
        width: 340,
        position: 'absolute',
        top: 5,
        borderRadius: 8,
        zIndex: 100,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        // transform: [
        //   {
        //     translateY: animation.interpolate({
        //       inputRange: [0, 1],
        //       outputRange: [0, -100],
        //     }),
        //   },
        // ],
      }}>
      <Text style={{color: '#fff', fontWeight: '500'}}>{alert}</Text>
    </Animated.View>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({});
