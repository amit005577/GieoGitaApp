import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Animated,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {SceneMap, TabView} from 'react-native-tab-view';
import HeaderPage from '../../Components/header';
import ReadPdfScreen from './component/ReadPdf';
import VideoScreen from './component/Viedo';
import {useDispatch} from 'react-redux';
import {getAllpdfData, getVideoData} from '../../redux/actions';
// import HeaderPage from '../../components/header';

const ReadChantPage = () => {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoData());
    dispatch(getAllpdfData());
  }, []);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'पढ़ना'},
    {key: 'second', title: 'विडियो'},
  ]);
  const renderScene = SceneMap({
    first: ReadPdfScreen,
    second: VideoScreen,
  });
  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              style={{
                ...styles.tabItem,
                backgroundColor: index == i ? '#EF4136' : 'white',
                // borderRadius: 20,
                borderTopLeftRadius: route.title == 'Read' ? 0 : 10,
                borderTopRightRadius: route.title == 'Read' ? 0 : 10,
                borderBottomLeftRadius: route.title == 'Read' ? 10 : 10,
                borderBottomRightRadius: route.title == 'Read' ? 0 : 10,
              }}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={{
                  opacity,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderPage />
      {/* <Text
        style={{
          alignSelf: 'center',
          fontSize: 30,
          color: 'black',
          marginTop: 10,
        }}>
        Archive
      </Text> */}
      <View style={{flex: 1, marginTop: 10}}>
        <TabView
          style={{flex: 1}}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

export default ReadChantPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,

    // marginTop: 15,
    borderWidth: 1,
    height: 55,
  },
  tabItem: {
    // flex: 1,
    // borderTopRadius: 20,
    alignItems: 'center',
    width: '50%',
    height: '100%',
    // marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // marginTop: 14,
    // borderWidth: 1,

    // backgroundColor: 'white',
  },
});
