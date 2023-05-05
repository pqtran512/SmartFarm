import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useInterval } from './dashboard';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function TemperatureValue(){
  const [temp, setTemp] = useState(0);

  async function fetchData(){
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-temperature");
      const data = await res.json();
      setTemp(data.last_value);
    } catch (err) {
      console.log(err);
    }
  }

  useInterval(fetchData, 3000);

  return (
    <Text style={styles.cardinfo}>{temp} <Text style={styles.unit}>°C</Text></Text>
  )
}
function HumidityValue(){
  const [humid, setHumid] = useState(0);

  async function fetchData(){
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-humidity");
      const data = await res.json();
      setHumid(data.last_value);
    } catch (err) {
      console.log(err);
    }
  }

  useInterval(fetchData, 3000);

  return (
    <Text style={styles.cardinfo}>{humid} <Text style={styles.unit}>%</Text></Text>
  )
}
function LightValue(){
  const [light, setLight] = useState(0);

  async function fetchData(){
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-lightlevel");
      const data = await res.json();
      setLight(data.last_value);
    } catch (err) {
      console.log(err);
    }
  }

  useInterval(fetchData, 3000);

  return (
    <Text style={styles.cardinfo}>{light} <Text style={styles.unit}>lux</Text></Text>
  )
}

export default function Homescreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.summary}>
        <View style={[{justifyContent: 'center', alignItems: 'center', marginTop: 20}]}>
          <Fontisto name="neutral" size={100} color="#000" style={[{backgroundColor: '#ffcf1a', borderRadius: 50}]}/></View>
          {/* emoji-happy, emoji-sad */}
        <View style={{marginTop:20, marginLeft:50}}>
          <View style={styles.row}>
            <View style={styles.column}>
                <Text style={{fontWeight: 'bold', marginBottom: 10, fontSize:17}}>Tree: </Text>
                <Text style={{fontWeight: 'bold', marginBottom: 10, fontSize:17}}>Date: </Text>
                <Text style={{fontWeight: 'bold', marginBottom: 10, fontSize:17}}>Time: </Text>
            </View>
            <View style={[styles.column, {marginLeft: 15}]}>
                <Text style={{marginBottom: 10, fontSize:17}}>Mango </Text>
                <Text style={{marginBottom: 10, fontSize:17}}>30/03/2023 </Text>
                <Text style={{marginBottom: 10, fontSize:17}}>11:20 </Text>
            </View>
          </View>
        </View>
      </View>
        
      <View
        style={[{flexDirection: 'column', padding: 50}]}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/1684/1684375.png'}} style={styles.cardicon}/>
            <View style={styles.column}>
              <Text style={styles.cardtitle}>Temperature</Text>
              {/* <Text style={styles.cardinfo}>27 <Text style={styles.unit}>°C</Text></Text> */}
              <TemperatureValue></TemperatureValue>
            </View>
            <View style={styles.columnLeft}>
              <TouchableOpacity style={styles.settingIcon}>
                <Ionicons name="settings" size={23} color="#BBBBBB" />
              </TouchableOpacity>
              <Text style={styles.cardtext}>11:18 30/03/2023</Text>
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.row}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/6566/6566344.png'}} style={styles.cardicon}/>
            <View style={styles.column}>
              <Text style={styles.cardtitle}>Humidity</Text>
              {/* <Text style={styles.cardinfo}>35 <Text style={styles.unit}>ml/m³</Text></Text> */}
              <HumidityValue></HumidityValue>
            </View>
            <View style={styles.columnLeft}>
              <TouchableOpacity style={styles.settingIcon}>
                <Ionicons name="settings" size={23} color="#BBBBBB" />
              </TouchableOpacity>
              <Text style={[styles.cardtext, {color: '#2c94fa', marginLeft:'auto', fontWeight: 'bold'}]}>above 30 ml/m³</Text>
              <Text style={styles.cardtext}>11:20 30/03/2023</Text>
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.row}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/427/427735.png'}} style={styles.cardicon}/>
            <View style={styles.column}>
              <Text style={styles.cardtitle}>Lighting</Text>
              {/* <Text style={styles.cardinfo}>170 <Text style={styles.unit}>W/m²</Text></Text> */}
              <LightValue></LightValue>
            </View>
            <View style={styles.columnLeft}>
              <TouchableOpacity style={styles.settingIcon}>
                <Ionicons name="settings" size={23} color="#BBBBBB" />
              </TouchableOpacity>
              <Text style={styles.cardtext}>11:19 30/03/2023</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6eee7',
  },
  summary: {
    // backgroundColor: '#fff',
    height: 240,
  },
  info: {
    fontWeight: 'bold', 
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#fff',
    width: 320,
    height: 93,
    marginBottom: 30,
    borderRadius: 30,
    position: 'relative',
    padding: 10,
    paddingHorizontal: 20,
    shadowColor: '#171717',
    elevation: 9,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
    marginLeft: 8,
  },
  columnLeft: {
    flexDirection: 'column',
    marginLeft: 'auto',
  },
  cardicon: {
    width: 35,
    height: 45,
    margin: 10,
    marginLeft:5,
  },
  cardtitle: {
    fontSize: 14,
  },
  cardtext: {
    fontSize: 10,
    marginTop: 'auto',
    color: 'gray',
  },
  cardinfo: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  unit: {
    marginLeft:10,
    fontSize: 14,
    fontWeight: 'normal',
    color: 'gray',
  },
  settingIcon: {
    marginLeft: 'auto',
    // marginTop: 20,
  }
});