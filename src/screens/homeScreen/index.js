import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import maharaj from '../../../assets/images/Magaraj.png';
import ArjunImage from '../../../assets/images/arjun.jpg';
import logo1 from '../../../assets/images/logo1.jpg';
import logo2 from '../../../assets/images/logo2.jpg';
import logo3 from '../../../assets/images/logo3.jpg';
import logo4 from '../../../assets/images/logo4.jpg';
import logo5 from '../../../assets/images/logo5.jpg';
import HeaderPage from '../../Components/header';
import {useHomeHooks} from '../../utills.js/hooke/home-hooks';
import Loader from '../../Components/Loader';

const windowWidth = Dimensions.get('window').width - 70;
const HomeScreen = () => {
  const {Translation, isLoading, handleGetHomeData, homePageData} =
    useHomeHooks();

  useEffect(() => {
    handleGetHomeData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? <Loader /> : null}

      <ScrollView style={styles.container}>
        <HeaderPage />

        <ScrollView contentContainerStyle={{}}>
          <ImageBackground
            resizeMode="cover"
            source={ArjunImage}
            style={{height: 330, width: '100%'}}>
            <View style={{position: 'absolute', right: 0, bottom: 0}}>
              <Image
                source={maharaj}
                style={{
                  height: 80,
                  width: 80,
                }}
              />
            </View>
          </ImageBackground>
          <View style={{marginHorizontal: 20}}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'baseline',
              }}>
              <Text
                style={{
                  ...styles.titleStyle,
                  color: '#963632',
                  fontWeight: '600',
                  fontSize: 17,
                  marginTop: 10,
                  textAlign: 'justify',
                }}>
                {Translation.about_the_campaign}
              </Text>

              <Text
                style={{
                  ...styles.titleStyle,
                  color: '#963632',
                  fontWeight: '900',
                  fontSize: 17,
                  marginTop: 4,
                }}>
                {Translation.homepage_let_be_one}
              </Text>
              <Text
                style={{
                  ...styles.titleStyle,
                  color: '#963632',
                  fontWeight: '900',
                  fontSize: 17,
                  marginTop: 4,
                }}>
                {Translation.homepage_global_expression}
              </Text>
              <View style={{marginTop: 10}}>
                <Text
                  style={{color: '#2A2A2A', fontSize: 12, fontWeight: 'bold'}}>
                  {Translation.homepage_jai_krishna}
                </Text>
                <Text
                  style={{
                    color: '#2A2A2A',
                    fontSize: 12,
                    textAlign: 'justify',
                    flexWrap: 'wrap',
                    fontWeight: 'bold',
                  }}>
                  {/* {Translation.long_live_shri_krishna_description} */}
                  {'                    '}
                  {Translation.home_worship_book_description}
                </Text>
                <Text
                  style={{
                    color: '#2A2A2A',
                    fontSize: 12,
                    textAlign: 'justify',
                    fontWeight: 'bold',
                  }}>
                  {'      '} {Translation.homepage_let_pledge}
                </Text>
                <Text
                  style={{
                    color: '#2A2A2A',
                    fontSize: 10,
                    marginTop: 10,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  {Translation.homepage_whosoever_will_recite}
                </Text>
                <Text
                  style={{
                    color: '#2A2A2A',
                    fontSize: 10,
                    // marginTop: 10,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  {Translation.homepage_worship_me}
                </Text>
                <Text
                  style={{
                    color: '#2A2A2A',
                    fontSize: 15,
                    marginTop: 10,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  {Translation.instructions}
                </Text>

                <View>
                  <View>
                    <Text
                      style={{
                        color: '#2A2A2A',
                        fontSize: 12,
                        marginTop: 10,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                      }}>
                      {Translation.homepage_shloki_gita}
                    </Text>
                    <Text
                      style={{
                        color: '#2A2A2A',
                        fontSize: 15,
                        marginTop: 10,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                      }}>
                      {Translation.special_indications}
                    </Text>
                    <Text
                      style={{
                        color: '#2A2A2A',
                        fontSize: 14,
                        marginTop: 10,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        textAlign: 'justify',
                      }}>
                      {' '}
                      {Translation.homepage_instruction_to_use}
                    </Text>
                    <Text style={styles.listItem}>
                      {Translation.homepage_instruction_1}
                    </Text>
                    <Text style={styles.listItem}>
                      {Translation.homepage_inst_2}
                    </Text>
                    <Text style={styles.listItem}>
                      {Translation.homepage_instruction3}
                    </Text>
                    <Text style={styles.listItem}>
                      {Translation.homepage_instruction_4}
                    </Text>
                    <Text style={styles.listItem}>
                      {Translation.homepage_instruction_5}
                    </Text>
                    <Text style={styles.listItem}>
                      {' '}
                      {Translation.homepage_instruction_6}
                    </Text>
                    <Text style={styles.listItem}>
                    {Translation.homepage_instruction_7}
                    </Text>
                    <Text  style={styles.listItem}>
                    {Translation.homepage_feedback}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.titleStyle}>{Translation.our_sponsors}</Text>
            <View style={styles.rowImage}>
              <View style={styles.imagecontaier}>
                <Image source={logo4} style={styles.imagestyle} />
              </View>
              <View style={styles.imagecontaier}>
                <Image source={logo3} style={styles.imagestyle} />
              </View>
              <View>
                <Image source={logo1} style={styles.imagestyle} />
              </View>
            </View>
            <View style={{...styles.rowImage, paddingHorizontal: 20}}>
              <View>
                <Image
                  source={logo2}
                  style={{...styles.imagestyle, width: windowWidth / 2.3}}
                />
              </View>
              <View>
                <Image
                  source={logo5}
                  style={{...styles.imagestyle, width: windowWidth / 2.3}}
                />
              </View>
            </View>

            <View style={{height: 50}} />
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: 'orange',
  },
  textContainer: {
    display: 'flex',
  },
  textStyle: {
    alignSelf: 'center',
  },
  titleStyle: {
    alignSelf: 'center',
    marginTop: 18,
    fontSize: 22,
    color: '#F7941C',
  },
  rowImage: {
    flexDirection: 'row',
    marginH: 20,
    justifyContent: 'space-around',
    marginTop: 30,
  },
  imagestyle: {height: 100, width: windowWidth / 3, resizeMode: 'stretch'},
  listItem: {
    color: '#2A2A2A',
    fontSize: 12,
    marginTop: 10,

    fontWeight: 'bold',
    textAlign: 'justify',
  },
});
