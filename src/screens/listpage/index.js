import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useDebugValue, useEffect} from 'react';
import HeaderPage from '../../Components/header';
import Icon from 'react-native-vector-icons/Feather';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {chantHistory} from '../../redux/actions';
import moment from 'moment/moment';

const ListPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const historydata = useSelector(state => state.AppReducers.chantHistory);
  // console.log('show history data', historydata);
  const monthlyData = useSelector(
    state => state.AppReducers.getCurrentCountData,
  );
  const datapledge = useSelector(state => state.AppReducers.getTargetpledge);
  useEffect(() => {
    dispatch(chantHistory());
  }, []);

const handleChantCountEdit =(val)=>{
  navigation.navigate("chant",val)
}

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          //   paddingHorizontal: 30,
          // justifyContent: 'space-around',
          // borderWidth: 1,
          borderBottomWidth: 0,
        }}>
        <View
          style={{
            borderWidth: 1,
            width: '40%',
            justifyContent: 'center',
            alignContent: 'center',
            // alignItems: 'center',

            borderTopWidth: 0,
            height: 46,
            borderColor: '#F7941C',
          }}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 10,
              color: 'black',
              marginLeft: 10,
            }}>
            {moment(item?.create_at).format('DD-MMM-YYYY')}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderTopWidth: 0,
            width: '60%',
            justifyContent: 'space-around',
            alignContent: 'center',
            alignItems: 'center',
            height: 46,
            borderColor: '#F7941C',
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{fontSize: 18, marginTop: 10, color: 'black', width: '50%'}}>
            {item.count}
          </Text>
          <EIcon
            name="pencil"
            style={{
              color: 'black',
              fontSize: 18,
              marginTop: 10,
              left: 3,
              with: '50%',
            }}
            onPress={()=>handleChantCountEdit(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderPage />
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('home')}
        style={styles.backContainer}>
        <Icon name="arrow-left-circle" size={34} color={'black'} />
        <Text style={{color: 'black', fontSize: 18, left: 10}}>Back</Text>
      </TouchableOpacity> */}
      {/* <ScrollView style={{fontSize: 18, marginTop: 20}}> */}
      <TouchableOpacity
        style={styles.userNameContainer}
        onPress={() => navigation.navigate('register')}>
        <Text style={styles.userText}>
          {' '}
          {datapledge[0]?.name == null || datapledge[0]?.name == ''
            ? 'नाम'
            : datapledge[0]?.name}
        </Text>

        <AIcon
          name={'caretdown'}
          size={12}
          style={{marginLeft: 10, color: 'black'}}
        />
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 18,
          color: 'black',
          marginTop: 20,
        }}>
        पूर्ण अर्पण सूची
      </Text>

      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <View style={{...styles.insideContainer, backgroundColor: '#C7E9C9'}}>
          <Text style={styles.numberText}>{monthlyData?.weekly_count}</Text>
          <Text style={styles.currentText}>वर्तमान सप्ताह</Text>
        </View>
        <View style={{...styles.insideContainer, backgroundColor: '#E9E1C7'}}>
          <Text style={styles.numberText}>{monthlyData?.month_count}</Text>
          <Text style={styles.currentText}>वर्तमान माह</Text>
        </View>
        <View style={{...styles.insideContainer, backgroundColor: '#C7DBE9'}}>
          <Text style={styles.numberText}>{monthlyData?.life_time_count}</Text>
          <Text style={styles.currentText}>कुल</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 30,marginBottom:100}}>
        <FlatList
          data={historydata}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom:100,
            marginBottom:100

          }}
          // horizontal
          style={{paddingHorizontal: 0, marginTop: 20, borderWidth: 0}}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-around',
                  // borderWidth: 1,
                  borderBottomWidth: 0,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    width: '40%',
                    height: 46,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderColor: '#F7941C',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    दिनांक
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    width: '60%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    // alignItems: 'center',
                    height: 46,
                    borderColor: '#F7941C',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'black',
                      marginLeft: 20,
                    }}>
                    संख्या
                  </Text>
                </View>

                {/* <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Edit
              </Text> */}
              </View>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                
                  borderBottomWidth: 0,
                  paddingBottom:100,
                  marginBottom:50
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    width: '40%',
                    height: 46,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderColor: '#F7941C',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      // fontWeight: 'bold',
                      color: 'black',
                    }}>
                    पुरानी संख्या
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    width: '60%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    // alignItems: 'center',
                    height: 46,
                    borderColor: '#F7941C',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'black',
                      marginLeft: 20,
                    }}>
                    {monthlyData?.life_time_count}
                  </Text>
                </View>

                {/* <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
              Edit
            </Text> */}
              </View>
            );
          }}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default ListPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backContainer: {
    height: 50,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },

  userNameContainer: {
    borderWidth: 1,

    borderColor: 'black',

    alignContent: 'center',

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    width: '40%',

    height: 55,

    borderRadius: 30,

    alignSelf: 'center',

    marginTop: 15,
  },

  userText: {
    fontSize: 23,

    color: 'black',

    fontWeight: '500',
  },
  insideContainer: {
    // borderWidth: 1,
    height: 70,
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  numberText: {
    fontSize: 18,
    color: 'black',
  },
  currentText: {
    fontSize: 12,
    color: 'black',
  },
});
