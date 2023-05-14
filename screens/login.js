import * as React from 'react';
import { Image, StyleSheet, Text, View,  TextInput, SafeAreaView, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Input from './input';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../fireBaseConfig";

export default function Login() {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });
  const navigation = useNavigation();
  const [errors, setErrors] = React.useState({});
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

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
          <Input
              placeholder="Enter your email" 
              iconName="email-outline"
              label="Email" 
              error={errors.email}
              onFocus={() => {
                handleError(null, 'email');
              }}
              value={inputs.email}
              onChangeText={text => handleOnChange(text, 'email')}
            />
          <Input
            placeholder="Enter your password"
            iconName="lock-outline"
            label="Password"
            onFocus={() => {
              handleError(null, 'password');
            }}
            value={inputs.password}
            onChangeText={text => handleOnChange(text, 'password')} 
            password
          /> 

          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={['#13552c', '#729642']}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                onPress={() => {
                  handleLogin(inputs.email, inputs.password);
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
    padding: 15,
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
  // input: {
  //   borderWidth: 1,
  //   borderColor: 'white',
  //   padding: 15,
  //   marginVertical: 10,
  //   borderRadius: 5,
  //   height: 55,
  //   paddingVertical: 0,
  //   backgroundColor: 'white',
  //   paddingLeft: 25,
  // },
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