import * as React from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Switch } from 'react-native';
import { NativeBaseProvider, Box, Stack, HStack, VStack, Image, Pressable, Center, Container, Heading, Text } from "native-base";
import { LineChart } from 'react-native-chart-kit';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { useEffect, useState, useRef } from 'react';
import { Icon } from '@rneui/themed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { Card, Button, Icon } from '@rneui/base';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function PumpSwitch(){
  const [isEnabled, setIsEnabled] = useState(false);
  // const [text, setText] = useState('Press the button');

  const toggleSwitch = () => {
    if (isEnabled) {
      // setText("Inactive");
      fetch("https://io.adafruit.com/api/v2/webhooks/feed/DCFJ8CFBBUCkboeF91JbrvscTCGe", {
        method: 'POST',
        body: JSON.stringify({
          value: 0
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err))
    } else {
      // setText("Active");
      fetch("https://io.adafruit.com/api/v2/webhooks/feed/DCFJ8CFBBUCkboeF91JbrvscTCGe", {
        method: 'POST',
        body: JSON.stringify({
          value: 1
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err))
    }

    setIsEnabled(previousState => !previousState);
  }

  return (
    <Box>
      {/* <Text>{text}</Text> */}
      <Switch 
        trackColor={{false: 'grey', true: 'rgb(26, 255, 146)'}}
        thumbColor={isEnabled ? 'rgb(26, 255, 146)' : 'grey'}
        ios_backgroundColor={'grey'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Box>
  )
}

function LightChart(props) {
  const [fetchedData, setData] = useState([0, 0, 0, 0, 0]);

  const lightData = {
    datasets: [
      {
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0,
        borderDash: [8, 4],
        data: fetchedData
      }
    ]
  }

  async function fetchData() {
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-lightlevel");
      const data = await res.json();
      const temp = [...fetchedData];
      temp.push(data.last_value);
      setData(temp);

    } catch (error) {
      console.log(error);
    }
  }

  useInterval(fetchData, 3000);

  return (
      <View>
          <LineChart
            data={lightData}
            width={Dimensions.get('window').width}
            height={200}
            withDots={false}
            withInnerLines={false}
            // yAxisLabel={'lux'}
            yAxisSuffix={'lux'}
            chartConfig={{
              // backgroundGradientFrom: 'darkblue',
              // backgroundGradientTo: 'blue',
              // color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`
              backgroundGradientFrom: "#5F8D4E",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#A4BE7B",
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5,
              useShadowColorFromDataset: false
            }}
          />
      </View>
  )
}
function HumidChart(props) {
  const [fetchedData, setData] = useState([0, 0, 0, 0, 0]);

  const humidData = {
    datasets: [
      {
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0,
        borderDash: [8, 4],
        data: fetchedData
      }
    ]
  }

  async function fetchData() {
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-humidity");
      const data = await res.json();
      const temp = [...fetchedData];
      temp.push(data.last_value);
      setData(temp);

    } catch (error) {
      console.log(error);
    }
  }
  useInterval(fetchData, 3000);
  
  return (
      <View>
        <LineChart
          data={humidData}
          width={Dimensions.get('window').width}
          height={200}
          withDots={false}
          withInnerLines={false}
          // yAxisLabel={'%'}
          yAxisSuffix={'%'}
          chartConfig={{
            // backgroundGradientFrom: 'darkblue',
            // backgroundGradientTo: 'blue',
            // color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`
            backgroundGradientFrom: "#5F8D4E",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#A4BE7B",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false
          }}
        />
      </View>
  )
}
function TempChart(props) {
  const [fetchedData, setData] = useState([0, 0, 0, 0, 0]);

  const tempData = {
    datasets: [
      {
        label: "Dataset 1",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0,
        borderDash: [8, 4],
        data: fetchedData
      }
    ]
  }

  async function fetchData() {
    try {
      const res = await fetch("https://io.adafruit.com/api/v2/nquochuy137/feeds/yolofarm-temperature");
      const data = await res.json();
      const temp = [...fetchedData];
      temp.push(data.last_value);
      setData(temp);

    } catch (error) {
      console.log(error);
    }
  }
  useInterval(fetchData, 3000);
  
  return (
      <View>
        <LineChart
          data={tempData}
          width={Dimensions.get('window').width}
          height={200}
          withDots={false}
          withInnerLines={false}
          // yAxisLabel={'%'}
          yAxisSuffix={'°C'}
          chartConfig={{
            // backgroundGradientFrom: 'darkblue',
            // backgroundGradientTo: 'blue',
            // color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`
            backgroundGradientFrom: "#5F8D4E",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#A4BE7B",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false
          }}
        />
      </View>
  )
}

export default function Dashboard() {
    return (
      <ScrollView>
        <NativeBaseProvider>
          <View>
            <Box alignItems={"center"} justifyContent={"space-between"}>
              <Box rounded={"lg"} maxW={"300"} overflow={"hidden"} borderColor={"coolGray.200"} borderWidth={"1"} marginTop={"10px"} marginBottom={"10px"}>
                
                <Stack p="4" space={4}>
                  <Stack space={3}>
                    <HStack display={"flex"} justifyContent={'space-between'} width={"280"} alignItems={"center"} space={4}>
                      <Heading size="md" ml="-1">Turn on irrigation:</Heading>
                      <PumpSwitch/>
                    </HStack>
                  </Stack>
                </Stack>
              </Box>
              <Box rounded={"lg"} maxW={"300"} overflow={"hidden"} borderColor={"coolGray.200"} borderWidth={"1"} marginTop={"10px"} marginBottom={"10px"}>
                <LightChart/> 
                <Stack p="4" space={4}>
                  <Stack space={3}>
                    <Heading size="md" ml="-1">Light level</Heading>
                    <Text fontSize="xs" _light={{
                            color: "green.500"
                          }} _dark={{
                            color: "green.400"
                          }} fontWeight="500" ml="-0.5" mt="-1">
                      Recorded from light sensor
                    </Text>
                  </Stack>
                  <Text fontWeight="400">
                  Light is needed for photosynthesis and the right light levels for plants needs to be studied as it differs considerably from plant to plant. Light is needed for plants to conduct a chemical process that turns it into sugars using light, water and carbon dioxide. 
                  </Text>
                </Stack>
              </Box>
              <Box rounded={"lg"} maxW={"300"} overflow={"hidden"} borderColor={"coolGray.200"} borderWidth={"1"} marginTop={"10px"} marginBottom={"10px"}>
                <HumidChart/> 
                <Stack p="4" space={4}>
                  <Stack space={3}>
                    <Heading _text={{

                    }}
                    size="md" ml="-1">Humidity data</Heading>
                    <Text fontSize="xs" _light={{
                            color: "green.500"
                          }} _dark={{
                            color: "green.400"
                          }} fontWeight="500" ml="-0.5" mt="-1">
                      Recorded from DHT20
                    </Text>
                  </Stack>
                  <Text fontWeight="400">
                  Tomato plants can tolerate a wide range of humidity levels, but for optimum fruit quality humidity levels should not fluctuate greatly in a short amount of time. 
                  </Text>
                </Stack>
              </Box>
              <Box rounded={"lg"} maxW={"300"} overflow={"hidden"} borderColor={"coolGray.200"} borderWidth={"1"} marginTop={"10px"} marginBottom={"10px"}>
                <TempChart/> 
                <Stack p="4" space={4}>
                  <Stack space={3}>
                    <Heading _text={{

                    }}
                    size="md" ml="-1">Temperature data</Heading>
                    <Text fontSize="xs" _light={{
                            color: "green.500"
                          }} _dark={{
                            color: "green.400"
                          }} fontWeight="500" ml="-0.5" mt="-1">
                      Recorded from DHT20
                    </Text>
                  </Stack>
                  <Text fontWeight="400">
                  Weather has a significant impact on the prevalence of pests and diseases, the availability of water, and the amount of fertilizer needed to grow crops. Farmers rely on climate patterns and weather forecasting in agriculture to determine which crops to cultivate and when to sow them. 
                  </Text>
                </Stack>
              </Box>
            </Box>
          </View>
        </NativeBaseProvider> 
      </ScrollView>
    );
  }