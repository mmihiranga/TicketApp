import * as React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  InputTitle: {
    fontFamily: 'Dosis-SemiBold',
    fontSize: 24,
    color: '#000000',
    marginLeft: 25,
    marginTop: 20,
    textAlign: 'left',
    position: 'absolute',
    left: 5,
    top: 10,
  },
});
function NotificationsScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginTop: 20,
      }}>
      <Text style={styles.InputTitle}> Notifcations</Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderLeftWidth: 365,
          borderBottomColor: '#000',
          position: 'absolute',
          top: 75,
        }}
      />
      <ImageBackground
        source={{
          uri: 'https://www.linkpicture.com/q/clip-the-chem-homework.png',
        }}
        style={{height: 350, width: 360}}
        imageStyle={{}}></ImageBackground>
      <Text
        onPress={() => {
          navigation.navigate('ViewInspections');
        }}
        style={{fontSize: 22, fontFamily: 'Raleway-Semibold'}}>
        You don't have any Notification
      </Text>
    </View>
  );
}
export default NotificationsScreen;
