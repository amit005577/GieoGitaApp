import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import user from '../../assets/images/user.png';
import logo from '../../assets/images/Logo.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {targetChantData} from '../redux/actions';
// import useTranslation from 'react-i18next';

const HeaderPage = () => {
  // const {t} =  useTranslation()
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const datapledge = useSelector(state => state.AppReducers.getTargetpledge);
  console.log("show data pledge data ",datapledge)
  useEffect(() => {
    dispatch(targetChantData());
  }, []);
  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeStack')}
          style={{left: 10}}>
          <Image
            source={logo}
            style={{height: 55, width: 55, left: 0, borderRadius: 100}}
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={{...styles.textStyle, fontSize: 36, color: 'white'}}>
            गीता जीवन गीत
          </Text>
          <Text
            style={{
              ...styles.textStyle,
              fontSize: 13,
              color: 'black',
              fontWeight: 'bold',
            }}>
            अष्टादश श्लोकी गीता पाठ महाअभियान
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('setting')}
          // style={{}}
          style={{
            height: 55,
            width: 55,
            right: 0,
            borderRadius: 100,
            backgroundColor: 'white',
            right: 10,
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center',

          }}
          >
          {datapledge[0]?.name == null || datapledge[0]?.name == '' ? (
            <Image
              source={user}
              style={{height: 55, width: 55, right: 0, borderRadius: 100}}
            />
          ) : (
            <View
            >
              <Text style={{fontSize:18,color:'black'}}>{datapledge[0]?.name[0]}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'orange',
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    alignSelf: 'center',
  },
  titleStyle: {
    alignSelf: 'center',
    marginTop: 18,
    fontSize: 22,
  },
});
