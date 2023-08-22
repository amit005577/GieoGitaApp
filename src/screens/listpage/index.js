import moment from 'moment/moment';
import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import HeaderPage from '../../Components/header';
import { colors } from '../../helper/colors';
import { chantHistory, setPreviousChant } from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';

const ListPageScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const historydata = useSelector(state => state.AppReducers.chantHistory);
  const monthlyData = useSelector(
    state => state.AppReducers.getCurrentCountData,
  );
  const datapledge = useSelector(state => state.AppReducers.getTargetpledge);
  useEffect(() => {
    dispatch(chantHistory());
  }, []);
  const { Translation} = useTranslation()

  const handleChantCountEdit = (val) => {
    dispatch(setPreviousChant(val))
    navigation.navigate("chant")
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 0,
        }}>
        <View
          style={{
            borderWidth: 1,
            width: '40%',
            justifyContent: 'center',
            alignContent: 'center',
            borderTopWidth: 0,
            height: 46,
            borderColor: '#F7941C',
          }}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 10,
              color: colors.black,
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
            style={{ fontSize: 18, marginTop: 10, color: colors.black, width: '50%' }}>
            {item.count}
          </Text>
          <EIcon
            name="pencil"
            style={{
              color: colors.black,
              fontSize: 18,
              marginTop: 10,
              left: 3,
              with: '50%',
            }}
            onPress={() => handleChantCountEdit(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderPage />
     
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
          style={{ marginLeft: 10, color: colors.black }}
        />
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 18,
          color: colors.black,
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
        <View style={{ ...styles.insideContainer, backgroundColor: '#C7E9C9' }}>
          <Text style={styles.numberText}>{monthlyData?.weekly_count}</Text>
          <Text style={styles.currentText}>वर्तमान सप्ताह</Text>
        </View>
        <View style={{ ...styles.insideContainer, backgroundColor: '#E9E1C7' }}>
          <Text style={styles.numberText}>{monthlyData?.month_count}</Text>
          <Text style={styles.currentText}>वर्तमान माह</Text>
        </View>
        <View style={{ ...styles.insideContainer, backgroundColor: '#C7DBE9' }}>
          <Text style={styles.numberText}>{monthlyData?.life_time_count}</Text>
          <Text style={styles.currentText}>कुल</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30,borderRadius:10, marginBottom: 100 }}>
        <FlatList
          data={historydata}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: 100,
            marginBottom: 100

          }}
          style={{ paddingHorizontal: 0, marginTop: 20, borderWidth: 0 }}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 0,
                }}>
                <View
                  style={{
                    borderTopLeftRadius:10,
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
                      color: colors.black,
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
                    height: 46,
                    borderColor: '#F7941C',
                    borderTopRightRadius:10,

                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: colors.black,
                      marginLeft: 20,
                    }}>
                    संख्या
                  </Text>
                </View>

              </View>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 0,
                  paddingBottom: 100,
                  marginBottom: 50
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
                    borderBottomLeftRadius:10
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.black,
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
                    height: 46,
                    borderBottomRightRadius:10,
                    borderColor: '#F7941C',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: colors.black,
                      marginLeft: 20,
                    }}>
                    {monthlyData?.life_time_count}
                  </Text>
                </View>

              </View>
            );
          }}
        />
      </View>
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
    borderColor: colors.black,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 15,
    padding:8,
  },

  userText: {
    fontSize: 23,

    color: colors.black,

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
    color: colors.black,
  },
  currentText: {
    fontSize: 12,
    color: colors.black,
  },
});
