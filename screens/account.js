// import * as React from 'react';
// import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import {useNavigation} from '@react-navigation/native';
// import Login from './login';
// import { Row } from 'react-native-table-component';

// // const Drawer = createDrawerNavigator();

// export default function MyProfile() {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.container}>
//         <View style={styles.header}>
//             <View style={styles.outerline}>
//             <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/1532/1532731.png'}} style={styles.icon}/>
//             </View>
//             <View>
//                 <Text style={{fontSize: 20, marginTop:5}}>@username</Text>
//             </View>
//         </View>
//         <View>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
//                 <View style={{paddingLeft:50,flexDirection: 'row', backgroundColor: 'white', paddingVertical:3}}>
//                 <Ionicons name="exit-outline" size={34} color="black" />
//                 <Text style={{fontSize: 24, marginLeft: 18}}>Log out</Text>
//                 </View>
//             </TouchableOpacity>
//         </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#e6eee7',
//     },
//     header: {
//         height: '40%',
//         justifyContent: 'center', 
//         alignItems: 'center',
//         flexDirection: 'column',
//         // backgroundColor: 'pink',
//     },
//     icon: {
//         width: 140,
//         height: 140,
//         // backgroundColor: 'green',
//       },
//     outerline: {
//         width: 160,
//         height: 160,
//         justifyContent: 'center', 
//         alignItems: 'center',
//         borderRadius: 100,
//         borderWidth: 3,
//         borderColor: 'gray',
//     },
//     logout:{
//         fontSize: 20,
//     },
// });