import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Octicons, Ionicons  } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';

export default function HumidSet() {
  const [checked, setChecked] = React.useState('first');
  const [min, onChangeMin] = React.useState('');
  const [sec, onChangeSec] = React.useState('');
  const [minTemp, onChangeMinTemp] = React.useState('');
  const [maxTemp, onChangeMaxTemp] = React.useState('');

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
                  onChangeText={onChangeMaxTemp}
                  value={maxTemp}
                  placeholder="30"
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
                placeholder="00"
                keyboardType="numeric"
              />
              <Text style={styles.unit}>min</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeSec}
                value={sec}
                placeholder="00"
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
                  placeholder="15"
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
                  placeholder="40"
                  keyboardType="numeric"
                />
              <Text style={styles.unit}>%</Text>
            </View>
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
    }
  });