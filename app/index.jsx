import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './home';

export default function MainScreen() {
  return (
    <HomeScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});
