import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../screens/login';
import Register from '../screens/register';
import BottomTabNavigator from './bottomTab';
import TempSet from '../screens/set_temp';
import HumidSet from '../screens/set_humid';
import BrightSet from '../screens/set_bright';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function AuthNav() {
    console.log(Stack);
    return (
        <Stack.Navigator
        screenOptions={{}} initialRouteName={'Login'}>
            <Stack.Screen name={'Login'} component={Login} options={{headerShown: false}}/>
            <Stack.Screen name={'Register'} component={Register} />
            <Stack.Screen
                name={'Homescreen'}
                component={BottomTabNavigator}
                options={{headerShown: false}}
            />
            <Stack.Screen name={'Temperature Settings'} component={TempSet} />
            <Stack.Screen name={'Humidity Settings'} component={HumidSet} />
            <Stack.Screen name={'Brightness Settings'} component={BrightSet} />
        </Stack.Navigator>
    );
}