// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/homeScreen';
import BottomTabnavigator from './BottomStackNavigation';
import SankalpScreen from '../screens/sankalp.js/index.js';
import ListPageScreen from '../screens/listpage';
import SettingScreen from '../screens/setting';
import HelpScreen from '../screens/help/inex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  pledgeConditionalStatus,
  sigingStatus,
  statusOfPledge,
} from '../redux/reducers/selectors/userSelector';
import {useSelector} from 'react-redux';
import UpdatePledge from '../screens/updatePledge';
import Register from '../screens/resisterpage';
import EventPage from '../screens/event';
import DetailEvent from '../screens/event/DetailEvent';
import EventForm from '../screens/forms';
import LocationForm from '../screens/locationForm';
import MyEvent from '../screens/event/MyEvent';
import UpdatedEvent from '../screens/event/updatedEvent';

const HomeStack = createNativeStackNavigator();

function HomeStackNavigation() {
  const [pledgeStatus, setpledgeStatus] = React.useState(true);
  // console.log('show pledge status', pledgeStatus);
  // const data = useSelector(pledgeConditionalStatus);
  // console.log('show data pledge status', data);
  // let resStatus = useSelector(statusOfPledge);
  let resss = useSelector(state => state.AuthReducer);
  // console.log(resss, 'Use Selector Value');
  React.useEffect(() => {
    asyncFunction();
  }, [resss]);

  const asyncFunction = async () => {
    const data = await AsyncStorage.getItem('pledge');
    let res = await JSON.parse(data);
    // console.log('show data parsse', res);
    setpledgeStatus(res);
  };
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      {pledgeStatus == null || pledgeStatus == '' ? (
        <HomeStack.Screen name="sankalp" component={SankalpScreen} />
      ) : (
        [
          <HomeStack.Screen name="HomeStack" component={BottomTabnavigator} />,
          <HomeStack.Screen name="listpage" component={ListPageScreen} />,
          <HomeStack.Screen name="setting" component={SettingScreen} />,
          <HomeStack.Screen name="help" component={HelpScreen} />,
          <HomeStack.Screen name="update" component={UpdatePledge} />,
          <HomeStack.Screen name="register" component={Register} />,
          <HomeStack.Screen name="event" component={EventPage} />,
          <HomeStack.Screen name="details" component={DetailEvent} />,
          <HomeStack.Screen name="form" component={EventForm} />,
          <HomeStack.Screen name="formPlace" component={LocationForm} />,
          <HomeStack.Screen name="myEvent" component={MyEvent} />,
          <HomeStack.Screen name="updatedEvent" component={UpdatedEvent} />,
        ]
      )}
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigation;
