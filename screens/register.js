//import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Text, SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import Input from './input';
import Button from './Button_register';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../fireBaseConfig';
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

export default function Register() { 
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
    tree_name: '',
    quantity: '',
  });
  const [errors, setErrors] = React.useState({});
  const navigation = useNavigation();
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError('Please input email', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)){
      handleError('Please input valid email', 'email');
      valid = false;
    }
    if (!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      valid = false;
    } 
    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      valid = false;
    }
    if (!inputs.tree_name) {
      handleError('Please input your first tree name', 'tree_name');
      valid = false;
    } 
    if (!inputs.quantity) {
      handleError('Please input your first tree quantity', 'quantity');
      valid = false;
    }
    if (valid){
      createUser(inputs.email, inputs.password, inputs.tree_name, inputs.quantity);
      register();
    }
  };

  function createUser(email, password, tree_name, quantity) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
        })
      
      const data = {
        user_email: email.toLowerCase(),
        upper: 40,
        lower: 15,
        min: 5,
        sec: 0
      };

      const data1 = {
        user_email: email.toLowerCase(),
        moisture: 40,
        upper: 40,
        lower: 15,
        min: 5,
        sec: 0
      };

      const data2 = {
        user_email: email.toLowerCase(),
        tree_name: tree_name.toLowerCase(),
        quantity: quantity
      }
      
      setDoc(doc(db, "fruit", email.toLowerCase() + tree_name.toLowerCase()), data2);
      setDoc(doc(db, "temp", email.toLowerCase()), data);
      setDoc(doc(db, "humid", email.toLowerCase()), data1);
      setDoc(doc(db, "bright", email.toLowerCase()), data); 
       
  }

  const register = () => {navigation.navigate('Login')};
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };
  return (
      <SafeAreaView style={{color: '#fff', flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 50,
            paddingHorizontal: 20,
          }}>
          <Text style={{color: 'black', fontSize: 40, fontWeight: 'bold'}}>
            Register
          </Text>
          <Text style={{color: 'grey', fontSize: 18, marginVertical: 10}}>
            Enter Your Details to Register
          </Text>
          <View style={{marginVertical: 20}}>
            <Input
              placeholder="Enter your email address" 
              iconName="email-outline" 
              label="Email" 
              error={errors.email}
              onFocus={() => {
                handleError(null, 'email');
              }}
              onChangeText={text => handleOnChange(text, 'email')} 
            />
            <Input
              placeholder="Enter your fullname" 
              iconName="account-outline" 
              label="Fullname" 
              error={errors.fullname}
              onFocus={() => {
                handleError(null, 'fullname');
              }}
              onChangeText={text => handleOnChange(text, 'fullname')}
            />
            <Input
              keyboardType="numeric"
              placeholder="Enter your phone number" 
              iconName="phone-outline" 
              label="Phone Number"
              error={errors.phone}
              onFocus={() => {
                handleError(null, 'phone');
              }}
              onChangeText={text => handleOnChange(text, 'phone')} 
            />
            <Input
              placeholder="Enter your password" 
              iconName="lock-outline" 
              label="Password"
              error={errors.password}
              onFocus={() => {
                handleError(null, 'password');
              }}
              onChangeText={text => handleOnChange(text, 'password')} 
              password
            />
            <Input
              placeholder="Enter your first tree" 
              iconName="account-outline" 
              label="TreeName" 
              error={errors.tree_name}
              onFocus={() => {
                handleError(null, 'tree_name');
              }}
              onChangeText={text => handleOnChange(text, 'tree_name')}
            />
            <Input
              keyboardType="numeric"
              placeholder="Enter your tree quantity" 
              iconName="account-outline" 
              label="TreeQuantity" 
              error={errors.quantity}
              onFocus={() => {
                handleError(null, 'quantity');
              }}
              onChangeText={text => handleOnChange(text, 'quantity')}
            />
          <Button title="Register" onPress={validate}/>
          <View 
            style={{
              justifyContent: 'center',
              textAlign: 'center', 
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: 'grey', 
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Already have account? </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: 'green', 
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Login
              </Text>
            </TouchableOpacity> 
          </View> 
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };