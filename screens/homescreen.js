import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Ionicons, Fontisto, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import { doc, getDocs, collection, query, where, getDoc } from "firebase/firestore"
import { auth } from '../fireBaseConfig';
import { db } from '../fireBaseConfig';
import { useInterval } from './dashboard';

const Stack = createNativeStackNavigator();

var data = [
  { label: 'Mango Tree', value: '1' },
  { label: 'Sunflower', value: '2' },
  { label: 'Guava Tree', value: '3' },
];

function TempTime() {
  const user = auth.currentUser;
  const email = user.email;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [interval, setInterval] = useState(3000);

  async function fetchTime(){
    const docRef = doc(db, "temp", email);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    const min = data["min"];
    const sec = data["sec"];
    const res = (min*60 + sec)*1000;
    // console.log(res);
    setInterval(res);
    // return Number((min * 60 + sec) * 1000);
  }

  async function fetchData(){
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-temperature");
      const data = await res.json();
      const str = data.updated_at;
      const array = str.split('T');
      const final_time = array[1].slice(0, -1);

      setDate(array[0]);
      setTime(final_time);
    } catch (err) {
      console.log(err);
    }
  }

  // fetchTime();
  useInterval(fetchData, 3000);

  return (
    <Text style={styles.cardtext}>{date} {time}</Text>
  )
}

function HumidTime() {
  const user = auth.currentUser;
  const email = user.email;
  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [interval, setInterval] = useState(3000);

  async function fetchTime(){
    const docRef = doc(db, "humid", email);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    const min = data["min"];
    const sec = data["sec"];
    const res = (min*60 + sec)*1000;
    // console.log(res);
    setInterval(res);
    // return Number((min * 60 + sec) * 1000);
  }

  async function fetchData() {
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-humidity");
      const data = await res.json();
      const str = data.updated_at;
      const array = str.split('T');
      const final_time = array[1].slice(0, -1);

      setDate(array[0]);
      setTime(final_time);
    } catch (err) {
      console.log(err);
    }
  }

  // fetchTime();
  useInterval(fetchData, 3000);

  return (
    <Text style={styles.cardtext}>{date} {time}</Text>
  )
}

function BrightTime() {
  const user = auth.currentUser;
  const email = user.email;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [interval, setInterval] = useState(3000);

  async function fetchTime(){
    const docRef = doc(db, "bright", email);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    const min = data["min"];
    const sec = data["sec"];
    const res = (min*60 + sec)*1000;
    // console.log(res);
    setInterval(res);
    // return Number((min * 60 + sec) * 1000);
  }

  async function fetchData(){
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-lightlevel");
      const data = await res.json();
      const str = data.updated_at;
      const array = str.split('T');
      const final_time = array[1].slice(0, -1);
      
      setDate(array[0]);
      setTime(final_time);
    } catch (err) {
      console.log(err);
    }
  }

  // fetchTime();
  useInterval(fetchData, 3000);

  return (
    <Text style={styles.cardtext}>{date} {time}</Text>
  )
}

function TemperatureValue() {
  const user = auth.currentUser;
  const email = user.email;

  const [time, setTime] = useState(3000);
  const [temp, setTemp] = useState(0);

  async function fetchTime(){
    const docRef = doc(db, "temp", email);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    const min = data["min"];
    const sec = data["sec"];
    const res = (min*60 + sec)*1000;
    // console.log(res);
    setTime(res);
    // return Number((min * 60 + sec) * 1000);
  }

  async function fetchData(){
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-temperature");
      const data = await res.json();
      setTemp(data.last_value);
    } catch (err) {
      console.log(err);
    }
  }

  // fetchTime();
  useInterval(fetchData, 3000);

  return (
    <Text style={styles.cardinfo}>{temp} <Text style={styles.unit}>°C</Text></Text>
  )
}
function HumidityValue() {
  const user = auth.currentUser;
  const email = user.email;

  const [time, setTime] = useState(3000);
  const [humid, setHumid] = useState(0);

  async function fetchData() {
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-humidity");
      const data = await res.json();
      setHumid(data.last_value);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchTime(){
    const docRef = doc(db, "humid", email);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    const min = data["min"];
    const sec = data["sec"];
    const res = (min*60 + sec)*1000;
    // console.log(res);
    setTime(res);
    // return Number((min * 60 + sec) * 1000);
  }

  // fetchTime();
  useInterval(fetchData, 3000);

  return (
    <Text style={styles.cardinfo}>{humid} <Text style={styles.unit}>%</Text></Text>
  )
}
function LightValue() {
  const user = auth.currentUser;
  const email = user.email;

  const [light, setLight] = useState(0);
  const [time, setTime] = useState(3000);

  async function fetchTime(){
    const docRef = doc(db, "bright", email);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    const min = data["min"];
    const sec = data["sec"];
    const res = (min*60 + sec)*1000;
    // console.log(res);
    setTime(res);
    // return Number((min * 60 + sec) * 1000);
  }

  async function fetchData(){
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-lightlevel");
      const data = await res.json();
      setLight(data.last_value);
    } catch (err) {
      console.log(err);
    }
  }

  // fetchTime();
  useInterval(fetchData, 3000);

  return (
    <Text style={styles.cardinfo}>{light} <Text style={styles.unit}>lux</Text></Text>
  )
}

export default function Homescreen() {
  const [fresh, setFresh] = useState(false);
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [fruits, setFruits] = useState('');

  const [temp, setTemp] = useState('');
  const [humid, setHumid] = useState('');
  const [bright, setBright] = useState('');

  const [check, setCheck] = useState(0);

  const user = auth.currentUser;
  const email = user.email;

  function handleChangeTree() {
    navigation.navigate('Tree Settings')
  }

  const pullMe = () => {
    setFresh(true)
    setTimeout(() => {
      setFresh(false)
    }, 3000)
    
    setCheck(check + 1)
  }

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

    async function fetchData() {
      const colRef = query(collection(db, 'fruit'), where("user_email", "==", email))
      const doc_snap = await getDocs(colRef)
      const docs = doc_snap.docs.map((doc) => {
        const data = doc.data()
        return data
      })

      setFruits(docs)
    }

    async function fetchTemp() {
      if (!email) return false
      const docRef = doc(db, 'temp', email)
      const doc_snap = await getDoc(docRef)

      data = doc_snap.data()
      setTemp(data)
    }

    async function fetchHumid() {
      if (!email) return false
      const docRef = doc(db, 'humid', email)
      const doc_snap = await getDoc(docRef)

      data = doc_snap.data()
      setHumid(data)
    }

    async function fetchBright() {
      if (!email) return false
      const docRef = doc(db, 'bright', email)
      const doc_snap = await getDoc(docRef)

      data = doc_snap.data()
      setBright(data)
    }
    
    fetchData()
    fetchTemp()
    fetchHumid()
    fetchBright()

  }, [check]);

  console.log(humid)
  console.log(bright)

  if (fruits.length != 0) {
    data = fruits
  }

  var temp_upper;
  var temp_lower;
  var bright_upper;
  var bright_lower;
  var humid_upper;
  var humid_lower;
  var idx = 0;

  if (temp != "") {
    temp_upper = temp.upper
    temp_lower = temp.lower
  }

  if (humid != "") {
    humid_upper = humid.upper
    humid_lower = humid.lower
  }

  if (bright != "") {
    bright_upper = bright.upper
    bright_lower = bright.lower
  }

  function handleIcon(temp_lower, temp_upper, bright_lower, bright_upper, humid_lower, humid_upper, idx) {
    const [temp, setTemp] = useState(0);

    async function fetchData0(){
      try {
        const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-temperature");
        const data = await res.json();
        setTemp(data.last_value);
      } catch (err) {
        console.log(err);
      }
    }

    const [humid, setHumid] = useState(0);

    async function fetchData1() {
      try {
        const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-humidity");
        const data = await res.json();
        setHumid(data.last_value);
      } catch (err) {
        console.log(err);
      }
    }

    const [light, setLight] = useState(0);

    async function fetchData2(){
      try {
        const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-lightlevel");
        const data = await res.json();
        setLight(data.last_value);
      } catch (err) {
        console.log(err);
      }
    }

    useInterval(fetchData2, 3000);
    useInterval(fetchData0, 3000);
    useInterval(fetchData1, 3000);

    /*
    if (temp >= temp_lower && temp <= temp_upper) {
      idx = idx + 1;
      console.log("index: here1")
      console.log(idx)
    }
    if (humid >= humid_lower && humid <= humid_upper) {
      idx = idx + 1;
      console.log("index: here2")
      console.log(humid)
    }
    if (light >= bright_lower && light <= bright_upper) {
      idx = idx + 1;
      console.log("index: here3")
      console.log(idx)
    }
    console.log(humid, light, temp) */

    if (humid != 0 && light != 0 && temp != 0) {
      if (temp >= parseInt(temp_lower) && temp <= parseInt(temp_upper)) {
        idx = idx + 1;
      }
      if (humid >= parseInt(humid_lower) && humid <= parseInt(humid_upper)) {
        idx = idx + 1;
      }
      if (light >= parseInt(bright_lower) && light <= parseInt(bright_upper)) {
        idx = idx + 1;
      }
      console.log(idx)
      return idx == 3? iconSmile(): idx == 2? iconNeutral(): iconSad()
    } 
  }

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
      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing = {fresh}
            onRefresh = {() => pullMe()}
          />
        }
      >
      <View style={styles.summary}>
        <View style={[{justifyContent: 'center', alignItems: 'center', marginTop: 5}]}>
          {handleIcon(temp_lower, temp_upper, bright_lower, bright_upper, humid_lower, humid_upper, idx)}
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
                  labelField="tree_name"
                  valueField="quantity"
                  placeholder={data[0].tree_name}
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
              <TouchableOpacity style={styles.settingIcon} onPress={() => {handleChangeTree()}} >
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
              <TemperatureValue></TemperatureValue>
            </View>
            <View style={styles.columnLeft}>
              <TouchableOpacity style={styles.settingIcon} onPress={() => navigation.navigate('Temperature Settings')} >
                <Ionicons name="settings" size={23} color="#BBBBBB" />
              </TouchableOpacity>
              <TempTime></TempTime>
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.row}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/6566/6566344.png'}} style={styles.cardicon}/>
            <View style={styles.column}>
              <Text style={styles.cardtitle}>Humidity</Text>
              <HumidityValue></HumidityValue>
            </View>
            <View style={styles.columnLeft}>
              <TouchableOpacity style={styles.settingIcon} onPress={() => navigation.navigate('Humidity Settings')} >
                <Ionicons name="settings" size={23} color="#BBBBBB" />
              </TouchableOpacity>
              <Text style={[styles.cardtext, {color: '#2c94fa', marginLeft:'auto', fontWeight: 'bold'}]}>above {humid_lower}%</Text>
              <HumidTime></HumidTime>
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.row}>
            <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/427/427735.png'}} style={styles.cardicon}/>
            <View style={styles.column}>
              <Text style={styles.cardtitle}>Brightness</Text>
              <LightValue></LightValue>
            </View>
            <View style={styles.columnLeft}>
              <TouchableOpacity style={styles.settingIcon} onPress={() => navigation.navigate('Brightness Settings')} >
                <Ionicons name="settings" size={23} color="#BBBBBB" />
              </TouchableOpacity>
              <BrightTime></BrightTime>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
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

