import moment from 'moment';
import React from 'react';
import { Clipboard, Dimensions, Linking, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconW from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';
import HeaderPage from '../../Components/header';
import { colors } from '../../helper/colors';

const windowWidth = Dimensions.get('window').width;
const DetailEvent = ({ route }) => {
  const item = route.params;
  // console.log('show props data', route.params);
  const url = 'https://img.freepik.com/premium-vector/torn-ripped-paper-hole-transparent-background_755228-1779.jpg'
  const message = "Some message"

  const onPressWhatsApp = async () => {
    const options = {
      title: 'Share via',
      message: message,
      url: url,
      social: Share.Social.WHATSAPP,
    };
    handleShare(options)
  }

  const onPressFacebook = async () => {
    const options = {
      title: 'Share via',
      message: message,
      url: url,
      social: Share.Social.FACEBOOK,
    };
    handleShare(options)
  }

  const onPressTwitter = async () => {
    const options = {
      title: 'Share via',
      message: message,
      url: url,
      social: Share.Social.TWITTER,
    };
    handleShare(options)
  }

  const handleShare = (options) => {
    Share.open(options)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }

  const email = `${message}: ${url}`
  const onPressCopy = () => {

    Clipboard.setString(email)
    showToastWithGravity()
  }

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Copied to clipboard!',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };


  return (
    <View style={styles.contaier}>
      <HeaderPage />
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.idstyle}>Event ID:{item.id}</Text>
        <View style={styles.singleItem}>
          <IconV color='gray' name="globe" size={24} />
          <Text style={styles.textstyle}>{item.event_type}</Text>
        </View>

        <View style={styles.locationstyle}>
          <View style={styles.oneItem}>
            <Icon name="calendar" color='gray' size={25} />
            <Text style={{ ...styles.textstyle, fontSize: 14 }}>{moment(item.start).format('ddd-mm-yy')}</Text>
          </View>
          <View style={styles.oneItem}>
            <IconE name="location" size={25} />
            <Text style={{ ...styles.textstyle, fontSize: 14 }}>bhopal</Text>
          </View>
        </View>
        <Text
          style={{
            ...styles.textstyle,
            fontSize: 17,
            marginLeft: 0,
            marginTop: 10,
          }}>
          Description
        </Text>
        <Text
          style={{
            ...styles.textstyle,
            fontSize: 14,
            marginLeft: 0,
            marginTop: 10,
            fontWeight: '400',
          }}>
          {item.instraction}
        </Text>
        <View style={styles.addresStyle}>
          <View style={{ width: '50%', alignSelf: 'flex-end' }}>
            <Text style={{ fontSize: 18, color: 'black' }}>Address:</Text>
            <Text
              style={{
                ...styles.textstyle,
                fontSize: 14,
                marginLeft: 0,
                marginTop: 10,
                fontWeight: '400',
              }}>
              centeral jail, bhopal madhy pradesh mp{' '}
            </Text>
          </View>
          <View>
            <Text
              style={{
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                fontSize: 18,
                color: 'black',
              }}>
              Organizer:
            </Text>
            <Text
              style={{
                ...styles.textstyle,
                fontSize: 14,
                marginLeft: 0,
                marginTop: 10,
                fontWeight: '400',
              }}>
              {item.name}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20, flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, color: 'black' }}>share:</Text>
          <IconW onPress={() => { onPressWhatsApp() }} name="whatsapp" color='#189633' size={30} />
          <IconV onPress={() => { onPressFacebook() }} name="facebook" color='#1b32a1' size={30} />
          <Icon onPress={() => { onPressTwitter() }} name="twitter" color='#119af5' size={30} />
          <IconIonic onPress={() => { onPressCopy() }} name="copy-outline" color='gray' size={30} />
          <View style={styles.subscribecontainer}>
            <Text style={{ color: 'white' }}>{'Subscrible'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailEvent;

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    // paddingHorizontal:20
  },
  idstyle: {
    color: colors.black,
    marginTop: 10,
  },
  singleItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textstyle: {
    fontSize: 22,
    color: colors.black,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  oneItem: {
    // width:windowWidth/3-25,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    // justifyContent:'space-around'
    paddingHorizontal: 10,
  },
  locationstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: 'lightgrey',
    marginTop: 10,

    //
  },
  addresStyle: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    marginTop: 20,
  },
  subscribecontainer: {
    backgroundColor: 'brown',
    width: 100,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
