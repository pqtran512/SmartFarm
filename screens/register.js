//import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Text, SafeAreaView, ScrollView, StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import Input from './input_register';
import Button from './Button_register';
import { useNavigation } from '@react-navigation/native';

export default function Register() { 
  const [inputs, setInputs] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
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
    if (valid){
      register();
    }
  };

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