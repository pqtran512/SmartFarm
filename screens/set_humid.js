import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { Octicons, Ionicons  } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { auth } from '../fireBaseConfig';
import { db } from '../fireBaseConfig'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import {LinearGradient} from 'expo-linear-gradient';

export default function HumidSet() {
  const [checked, setChecked] = React.useState('first');
  const [moi, onChangeMoi] = React.useState('');
  const [min, onChangeMin] = React.useState('');
  const [sec, onChangeSec] = React.useState('');
  const [minTemp, onChangeMinTemp] = React.useState('');
  const [maxTemp, onChangeMaxTemp] = React.useState('');

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
  }, [])

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

    return (

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.main}>
          <Text style={[styles.title, {marginTop: 16}]}>Moisture regulation mode</Text>
          <View style={styles.row}>
            <RadioButton
            value="first"
            status={ checked === 'first' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('first')}
            />
            <Text style={styles.option}> Manual</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <RadioButton
              value="second"
              status={ checked === 'second' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('second')}
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