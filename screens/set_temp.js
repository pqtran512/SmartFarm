import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Octicons, Ionicons  } from '@expo/vector-icons';

export default function TempSet() {
  const [min, onChangeMin] = useState('');
  const [sec, onChangeSec] = useState('');
  const [minTemp, onChangeMinTemp] = useState('');
  const [maxTemp, onChangeMaxTemp] = useState('');

    return (
      <View style={styles.main}>
        <Text style={[styles.title, {marginTop: 16}]}>Automatic mode setting</Text>
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
        <Text  style={styles.title}>Safety fallback mode</Text>
        <View style={styles.row}>
          <Ionicons name="warning-outline" size={20} color="black" />
          <Text>  Lower temperature limit</Text>
          <View style={styles.info}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeMinTemp}
                value={minTemp}
                placeholder="15"
                keyboardType="numeric"
              />
            <Text style={{fontSize: 16, color:'gray'}}> °C</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Ionicons name="warning-outline" size={20} color="black" />
          <Text>  Upper temperature limit</Text>
          <View style={styles.info}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeMaxTemp}
                value={maxTemp}
                placeholder="40"
                keyboardType="numeric"
              />
            <Text style={{fontSize: 16, color:'gray'}}> °C</Text>
          </View>
        </View>
      </View>
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
      marginBottom: 8
    },
    row:{
      flexDirection:'row', 
      marginVertical: 10,
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