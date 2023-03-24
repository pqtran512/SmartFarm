import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import AuthNav from './tab/authNav';
import { NavigationContainer } from '@react-navigation/native';

import { Header } from '@rneui/themed';

export default function App() {
  return (
    <NavigationContainer>
      <AuthNav/>
    </NavigationContainer>  
  );
}