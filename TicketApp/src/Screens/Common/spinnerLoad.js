import React from 'react';
import {ActivityIndicator, StyleSheet, StatusBar, View} from 'react-native';

const spinnerLoad = () => (
  <View style={[styles.container, styles.horizontal]}>
    <StatusBar
      translucent={true}
      backgroundColor={'transparent'}
      barStyle={'dark-content'}
    />
    <ActivityIndicator size="large" color="#2F75FD" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default spinnerLoad;
