import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { Ionicons, Fontisto, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const data = [
  { label: 'Mango Tree', value: '1' },
  { label: 'Sunflower', value: '2' },
  { label: 'Guava Tree', value: '3' },
];

export default function Homescreen() {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);
  const [index, setIndex] = useState(1);
  const iconSmile = () => {
    return (
      <View>
        <AntDesign name="smile-circle" size={90} color="#b2df00" style={[styles.icon, {padding: 7}]}/>
      </View>
    );
  }
  const iconNeutral = () => {
    return (
      <View>
        <MaterialCommunityIcons name="emoticon-neutral" size={100} color="#b2df00" style={styles.icon} />
      </View>
    );
  }
  const iconSad = () => {
    return (
      <View>
        <Ionicons name="sad" size={100} color="red" style={styles.icon}/>
      </View>
    );
  }
  // const renderIcon = () => {}
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.summary}>
        <View style={[{justifyContent: 'center', alignItems: 'center', marginTop: 5}]}>
          {index == 1? iconSmile(): index == 2? iconNeutral(): iconSad()}
        </View>
          {/* emoji-happy, emoji-sad */}
        <View style={{marginTop:25, marginLeft:50}}>
          <View style={styles.row}>
            <View style={styles.column}>
                <Text style={{fontWeight: 'bold', marginBottom: 25, fontSize:17}}>Date: </Text>
                <Text style={{fontWeight: 'bold', marginBottom: 10, fontSize:17}}>Tree: </Text>
            </View>
            <View style={[styles.column, {marginLeft: 15}]}>
                <Text style={{marginBottom:15, fontSize:17}}>{currentDate}</Text>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.d_placeholderStyle}
                  selectedTextStyle={styles.d_selectedTextStyle}
                  inputSearchStyle={styles.d_inputSearchStyle}
                  data={data}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={data[0].label}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
            </View>
            <View style={styles.addtree}>
              <TouchableOpacity style={styles.settingIcon} onPress={() => navigation.navigate('Tree Settings')} >
                <Ionicons name="add-circle" size={28} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
        
      <View
        style={[{flexDirection: 'column', padding: 50, paddingTop:40}]}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/1684/1684375.png'}} style={styles.cardicon}/>
            <View style={styles.column}>
              <Text style={styles.cardtitle}>Temperature</Text>
              <Text style={styles.cardinfo}>27 <Text style={styles.unit}>°C</Text></Text>
            </View>
            <View style={styles.columnLeft}>
              <TouchableOpacity style={styles.settingIcon} onPress={() => navigation.navigate('Temperature Settings')} >
                <Ionicons name="settings" size={23} color="#BBBBBB" />
              </TouchableOpacity>
              <Text style={styles.cardtext}>11:18 30/03/2023</Text>
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.row}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/6566/6566344.png'}} style={styles.cardicon}/>
            <View style={styles.column}>
              <Text style={styles.cardtitle}>Humidity</Text>
              <Text style={styles.cardinfo}>35 <Text style={styles.unit}>%</Text></Text>
            </View>
            <View style={styles.columnLeft}>
              <TouchableOpacity style={styles.settingIcon} onPress={() => navigation.navigate('Humidity Settings')} >
                <Ionicons name="settings" size={23} color="#BBBBBB" />
              </TouchableOpacity>
              <Text style={[styles.cardtext, {color: '#2c94fa', marginLeft:'auto', fontWeight: 'bold'}]}>above 30%</Text>
              <Text style={styles.cardtext}>11:20 30/03/2023</Text>
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.row}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/427/427735.png'}} style={styles.cardicon}/>
            <View style={styles.column}>
              <Text style={styles.cardtitle}>Brightness</Text>
              <Text style={styles.cardinfo}>170 <Text style={styles.unit}>%</Text></Text>
            </View>
            <View style={styles.columnLeft}>
              <TouchableOpacity style={styles.settingIcon} onPress={() => navigation.navigate('Brightness Settings')} >
                <Ionicons name="settings" size={23} color="#BBBBBB" />
              </TouchableOpacity>
              <Text style={styles.cardtext}>11:19 30/03/2023</Text>
            </View>
          </View>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6eee7',
  },
  summary: {
    backgroundColor: 'white',
    height: 240,
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
  },
  icon: {backgroundColor: 'black', borderRadius: 50},
  info: {
    fontWeight: 'bold', 
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#fff',
    width: 320,
    height: 93,
    marginBottom: 30,
    borderRadius: 30,
    position: 'relative',
    padding: 10,
    paddingHorizontal: 20,
    shadowColor: '#171717',
    elevation: 9,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
    marginLeft: 8,
  },
  columnLeft: {
    flexDirection: 'column',
    marginLeft: 'auto',
  },
  cardicon: {
    width: 35,
    height: 45,
    margin: 10,
    marginLeft:5,
  },
  addtree: {
    marginTop:40,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  cardtitle: {
    fontSize: 14,
  },
  cardtext: {
    fontSize: 10,
    marginTop: 'auto',
    color: 'gray',
  },
  cardinfo: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  unit: {
    marginLeft:10,
    fontSize: 14,
    fontWeight: 'normal',
    color: 'gray',
  },
  settingIcon: {
    marginLeft: 'auto',
    // marginTop: 20,
  },
  dropdown: {
    height: 45,
    fontSize: 17,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor:'white',
  },
  d_icon: {
    marginRight: 5,
  },
  d_placeholderStyle: {
    fontSize: 16,
  },
  d_selectedTextStyle: {
    fontSize: 16,
  },
});