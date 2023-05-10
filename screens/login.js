import * as React from 'react';
import { Image, StyleSheet, Text, View,  TextInput, SafeAreaView, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../fireBaseConfig";

export default function Login() {
  const navigation = useNavigation();
  const [username, onChangeUser] = React.useState('');
  const [password, onChangePass] = React.useState('');

  // const [email, setEmail] = useState('');
  // const [testPassword, setPassword] = React.useState('');

  const [data, setdata] = React.useState({
    username: '',
    password: ''
  });

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch("http://127.0.0.1:5000/get-user/mykhanh/1234");
  //       const data = await res.json();
  //       console.log(data);
  //       setdata(data);
  //     } catch (err) {
  //       // console.log(err);
  //     }
  //   }
  //   fetchData();
  // });
  function handleLogin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        navigation.navigate('Homescreen');
      })
      .catch((e) => {
        alert("Invalid user");
      })
  }

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <View style={styles.row}>
            <Image source={require('../assets/logo.png')} style={styles.mr7} />
            <Text style={styles.brandName}>SmartFarm</Text>
          </View>

          <Text style={styles.loginContinueTxt}>Login in to continue</Text>
          <TextInput name="username" onChangeText={text => {onChangeUser(text)}} value={username} style={styles.input} placeholder="Email" />
          <TextInput name="password" onChangeText={text => {onChangePass(text)}} value={password} style={styles.input} placeholder="Password" />
          
          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={['#13552c', '#729642']}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                onPress={() => {
                  handleLogin(username, password);
                }}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/***************** FORGOT PASSWORD BUTTON *****************/}
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                userId: 'X0001',
              })
            }
            style={styles.forgotPassBtn}>
            <Text style={styles.forgotPassText}>Forgot Password?</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}> Don't have an account? </Text>
          {/******************** REGISTER BUTTON *********************/}
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#623b2c',
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
    backgroundColor: 'white',
  },
  // Login Btn Styles
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
  },
  forgotPassText: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  signupBtn: {
    color: 'green',
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    height: 55,
    width: 55,
    marginRight: 7,
  },
});