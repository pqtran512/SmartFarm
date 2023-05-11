import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function TreeSet() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>     add tree type and quantity</Text>
        </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#e6eee7',
},
})