import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Switch } from 'react-native';
import { NativeBaseProvider, Box, HStack } from 'native-base';
import { Octicons, Ionicons  } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { auth } from '../fireBaseConfig';
import { db } from '../fireBaseConfig'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import {LinearGradient} from 'expo-linear-gradient';
import { useInterval } from './dashboard';

function PumpSwitch(props){
  const [isEnabled, setIsEnabled] = useState(false);
  // const [text, setText] = useState('Press the button');

  const toggleSwitch = () => {
    if (isEnabled) {
      // setText("Inactive");
      fetch("https://io.adafruit.com/api/v2/webhooks/feed/DCFJ8CFBBUCkboeF91JbrvscTCGe", {
        method: 'POST',
        body: JSON.stringify({
          value: 0
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
      .catch(err => console.error(err))
    } else {
      // setText("Active");
      fetch("https://io.adafruit.com/api/v2/webhooks/feed/DCFJ8CFBBUCkboeF91JbrvscTCGe", {
        method: 'POST',
        body: JSON.stringify({
          value: 1
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
      .catch(err => console.error(err))
    }

    setIsEnabled(previousState => !previousState);
  }

  return (
    <Box>
      {/* <Text>{text}</Text> */}
      <Switch 
        trackColor={{false: 'grey', true: 'rgb(26, 255, 146)'}}
        thumbColor={isEnabled ? 'rgb(26, 255, 146)' : 'grey'}
        ios_backgroundColor={'rgb(26, 255, 146)'}
        onValueChange={toggleSwitch}
        value={isEnabled}
        disabled={!props.isManual}
      />
    </Box>
  )
}

export default function HumidSet() {
  const [checked, setChecked] = React.useState('first');
  const [moi, onChangeMoi] = React.useState('');
  const [min, onChangeMin] = React.useState('');
  const [sec, onChangeSec] = React.useState('');
  const [minTemp, onChangeMinTemp] = React.useState('');
  const [maxTemp, onChangeMaxTemp] = React.useState('');
  const [manual, setManual] = React.useState(true);

  const user = auth.currentUser;
  const email = user.email;

  const [humids, setHumids] = useState([])

  useEffect(() => {
    ; (async () => {
      if (!email) return false
      const docRef = doc(db, 'humid', email)
      const doc_snap = await getDoc(docRef)

      data = doc_snap.data()
      setHumids(data)
    })()
  }, [moi])

  console.log(humids)

  var tmpMin = ""
  var tmpSec = ""
  var tmpLower = ""
  var tmpUpper = ""
  var tmpMoisture = ""

  if (typeof humids.length == "undefined") {
    tmpMin = humids.min.toString()
    tmpSec = humids.sec.toString()
    tmpLower = humids.lower.toString()
    tmpUpper = humids.upper.toString()
    tmpMoisture = humids.moisture.toString()
  }

  function updateMoi(moi) {
    const minRef = doc(db, 'humid', email)
    updateDoc(minRef, {
      moisture: moi
    })
  }

  function updateMin(min) {
    const minRef = doc(db, 'humid', email)
    updateDoc(minRef, {
      min: min
    })
  }

  function updateSec(sec) {
    const minRef = doc(db, 'humid', email)
    updateDoc(minRef, {
      sec: sec
    })
  }

  function updateUpper(upper) {
    const minRef = doc(db, 'humid', email)
    updateDoc(minRef, {
      upper: upper
    })
  }

  function updateLower(lower) {
    const minRef = doc(db, 'humid', email)
    updateDoc(minRef, {
      lower: lower
    })
  }

  async function autoPump(){
    const humid_feed = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-humidity");
    const data = await humid_feed.json();
    let currentValue = data.last_value;
    console.log("This is moi: ", humids.moisture);
    if (currentValue >= Number(humids.moisture)){
      const servo_feed = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/servo-test");
      const data = await servo_feed.json();
      let last_value = data.last_value;

      let interval = setInterval(() => {
        fetch("https://io.adafruit.com/api/v2/webhooks/feed/DCFJ8CFBBUCkboeF91JbrvscTCGe", {
          method: 'POST',
          body: JSON.stringify({
            value: last_value
          }),
          headers: {
            "Content-type": "application/json"
          }
        });
        if (last_value === 1) last_value = 0;
        else last_value = 1;
        if (manual === true) clearInterval(interval);
      }, 4000)
    }
  }

    return (
      <NativeBaseProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.main}>
            <Text style={[styles.title, {marginTop: 16}]}>Moisture regulation mode</Text>
            <HStack style={styles.row} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <HStack>
                <RadioButton
                value="first"
                status={ checked === 'first' ? 'checked' : 'unchecked' }
                onPress={() => {
                  setChecked('first');
                  setManual(true);
                }}
                />
                <Text marginTop={5}> Manual</Text>
              </HStack>
              <PumpSwitch isManual={manual}></PumpSwitch>
            </HStack>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="second"
                status={ checked === 'second' ? 'checked' : 'unchecked' }
                onPress={() => {
                  setChecked('second');
                  setManual(false);
                  autoPump();
                }}
              />
              <Text style={styles.option}> Automatic</Text>
              <View style={styles.info}>
                <Text style={styles.unit}>over </Text>
                <TextInput
                    style={[styles.input,{height: '70%'}]}
                    onChangeText={onChangeMoi}
                    value={moi}
                    placeholder={tmpMoisture}
                    keyboardType="numeric"
                  />
                <Text style={styles.unit}>%</Text>
              </View>
            </View>
            <Text style={styles.title}>Automatic mode setting</Text>
            <View style={styles.row}>
              <Octicons name="stopwatch" size={24} color="gray" />
              <Text>   Polling interval</Text>
              <View style={styles.info}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeMin}
                  value={min}
                  placeholder={tmpMin}
                  keyboardType="numeric"
                />
                <Text style={styles.unit}>min</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeSec}
                  value={sec}
                  placeholder={tmpSec}
                  keyboardType="numeric"
                />
                <Text style={styles.unit}>sec</Text>
              </View>
              
            </View>
            <Text style={styles.title}>Safety fallback mode</Text>
            <View style={styles.row}>
              <Ionicons name="warning-outline" size={20} color="black" />
              <Text>  Lower humidity limit</Text>
              <View style={styles.info}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeMinTemp}
                    value={minTemp}
                    placeholder={tmpLower}
                    keyboardType="numeric"
                  />
                <Text style={styles.unit}>%</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Ionicons name="warning-outline" size={20} color="black" />
              <Text>  Upper humidity limit</Text>
              <View style={styles.info}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeMaxTemp}
                    value={maxTemp}
                    placeholder={tmpUpper}
                    keyboardType="numeric"
                  />
                <Text style={styles.unit}>%</Text>
              </View>
            </View>
            <View style={styles.loginBtnWrapper}>
              <LinearGradient
                colors={['#13552c', '#729642']}
                style={styles.linearGradient}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}>
                {/******************** LOGIN BUTTON *********************/}
                <TouchableOpacity
                  onPress={() => {
                    if (moi != "") updateMoi(moi)
                    if (min != "") updateMin(min)
                    if (sec != "") updateSec(sec)
                    if (minTemp != "") updateLower(minTemp)
                    if (maxTemp != "") updateUpper(maxTemp)
                    alert("Update successfully!")
                  }}
                  activeOpacity={0.7}
                  style={styles.loginBtn}>
                  <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </NativeBaseProvider>
    );
  }

  const styles = StyleSheet.create({
    main: {
      backgroundColor: '#e6eee7',
      paddingHorizontal: 24,
      paddingTop: 24,
      height: '100%',
    },
    title: {
      fontWeight: 'bold', 
      fontSize: 17, 
      marginTop: 24,
      marginBottom: 8,
    },
    row:{
      flexDirection:'row', 
      marginVertical: 10,
    },
    option: {
      marginTop: 6,
    },
    info: {
      marginLeft: 'auto',
      flexDirection:'row',
    },
    input: {
      fontWeight: 'bold', 
      fontSize: 15, 
      backgroundColor: 'white', 
      color: 'black', 
      paddingHorizontal: 3
    },
    unit: {
      marginTop: 3,
      marginHorizontal: 6,
      color: 'gray',
    },
    loginBtnWrapper: {
      height: 55,
      marginTop: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    linearGradient: {
      width: '100%',
      borderRadius: 50,
    },
    loginBtn: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 55,
    },
    loginText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '400',
    }
  });