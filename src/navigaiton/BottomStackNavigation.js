import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../screens/authScreen/loginScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen';
import ChantPage from '../screens/chantCount';
import ReadChantPage from '../screens/ReadChants';
import ChantCount from '../screens/chantCount';
import EIcon from 'react-native-vector-icons/Octicons';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import Sankh from '../../assets/images/Shankh.png'

const Tab = createBottomTabNavigator();

function BottomTabnavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'घर',
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                ...styles.bottomIconTopBar,
                borderColor: focused ? 'pink' : 'white',
              }}>
              <EIcon name="home" size={26} color={'red'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="chant"
        component={ChantCount}
        options={{
          headerShown: false,
          title: 'मंत्र',
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                ...styles.bottomIconTopBar,
                borderColor: focused ? 'white' : 'white',
              }}>
             <Image source={Sankh} style={{height:60,width:60,bottom:20,}} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="read"
        component={ReadChantPage}
        options={{
          headerShown: false,
          title: 'पढ़ना',
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                ...styles.bottomIconTopBar,
                borderColor: focused ? 'pink' : 'white',
              }}>
              <FA5 name="book-open" size={26} color={'red'} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabnavigator;
const styles = StyleSheet.create({
  bottomIconTopBar: {
    borderTopWidth: 3,
    height: '85%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
});
