import React, {useState} from 'react';
import SplashImg from '../assets/Image/splash.png';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Splash = () => {
  return (
    <View>
      <StatusBar backgroundColor={'#F7F9FC'} barStyle={'dark-content'} />
      <Image style={styles.splashImage} source={SplashImg} />
    </View>
  );
};
export default Splash;

const styles = StyleSheet.create({
  splashImage: {
    width: width,
    height: height,
  },
});
