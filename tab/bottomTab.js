import React, { useState } from 'react';
import {Image, StyleSheet, Platform, TouchableOpacity, View, Text} from 'react-native';
import Homescreen from '../screens/homescreen';
import Dashboard from '../screens/dashboard';
// import MyProfile from '../screens/account';
import { Ionicons, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function LogoTitle() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  return (
    <View style={{flexDirection:'row'}}>
      <Image style={{ width: 50, height: 50, marginLeft:5 }} source={require('../assets/logo.png')}/>
      {/* <TouchableOpacity onPress={showMenu}>
        <View style={[{marginLeft:290, marginTop:10}]} >
        <FontAwesome name="user-circle" size={30} color="gray" />
        </View></TouchableOpacity> */}
        <View style={[{marginLeft:290, marginTop:10}]} >
        <Menu
          visible={visible}
          anchor={
            <TouchableOpacity onPress={showMenu}>
              <FontAwesome name="user-circle-o" size={30} color="#616161" />
            </TouchableOpacity>}
          onRequestClose={hideMenu}
        >
          <MenuItem onPress={hideMenu}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
            <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
              <Ionicons name="exit-outline" size={24} color="black" />
              <Text style={{fontSize: 14, marginLeft: 10}}>Log out</Text>
            </View>
            </TouchableOpacity>
          </MenuItem>
        </Menu>
      </View>
    </View>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'md-home' : 'home-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      } 
      // else if (route.name === 'Fruit Classification') {
      //   iconName = focused ? 'eye' : 'eye-outline';
      // } 
      else if (route.name === 'Dashboard') {
        iconName = focused ? 'dashboard' : 'dashboard';
        return <MaterialIcons name={iconName} size={size} color={color} />;
      } 
      // else if (route.name === 'MyProfile') {
      //   iconName = focused ? 'user-circle-o' : 'user-circle';
      //   return <FontAwesome name={iconName} size={size} color={color} />;
      // }
    },
    tabBarActiveTintColor: 'green',
    tabBarInactiveTintColor: 'gray',
  })}>
        <Tab.Screen name="Home" component={Homescreen} options={{
            headerStyle: {backgroundColor: '#e6eee7', height: 90,}, 
            headerTitle: (props) => <LogoTitle {...props}/>,
            headerTintColor: '#000',}}/>
        {/* <Tab.Screen name="Fruit Classification" component={FruitClassification} /> */}
        <Tab.Screen name="Dashboard" component={Dashboard} options={{
            headerStyle: {backgroundColor: '#e6eee7', height: 90,}, 
            headerTitle: (props) => <LogoTitle {...props}/>,
            headerTintColor: '#000',}}/>
        {/* <Tab.Screen name="MyProfile" component={MyProfile} /> */}
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  outerline: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'gray',
    marginLeft: 'auto',
  },
  icon: {
      width: 40,
      height: 40,
      // backgroundColor: 'green',
    },
});