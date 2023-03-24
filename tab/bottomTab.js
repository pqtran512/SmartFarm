import React from 'react';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
import Homescreen from '../screens/homescreen';
import FruitClassification from '../screens/fruit-class';
import Dashboard from '../screens/dashboard';
import SettingsScreen from '../screens/settings';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'md-home' : 'home-outline';
      } else if (route.name === 'Fruit Classification') {
        iconName = focused ? 'eye' : 'eye-outline';
      } else if (route.name === 'Dashboard') {
        iconName = focused ? 'dashboard' : 'dashboard';
        return <MaterialIcons name={iconName} size={size} color={color} />;
      } else if (route.name === 'Settings') {
        iconName = focused ? 'settings' : 'settings-outline';
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'green',
    tabBarInactiveTintColor: 'gray',
  })}>
        <Tab.Screen name="Home" component={Homescreen} />
        <Tab.Screen name="Fruit Classification" component={FruitClassification} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}