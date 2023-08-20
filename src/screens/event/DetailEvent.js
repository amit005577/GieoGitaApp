import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Clipboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import Share from 'react-native-share';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconW from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import CustomeToast from '../../Components/CustomeToast';
import HeaderPage from '../../Components/header';
import {colors} from '../../helper/colors';
import {eventConfirmation, subscribeEvent} from '../../redux/actions';
import {ms} from 'react-native-size-matters';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const DetailEvent = ({route}) => {
  const item = route.params.data;
  const isCurrentUser = route.params.isCurrentUser
  console.log('show details item', item);
  // console.log('show props data', route.params);
  const url = item?.thumbnail;
  const message = item?.short_content;
  const title = 'Shared by ' + item?.organizer;
  const dispatch = useDispatch();
  const [isCopied, setisCopied] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [camerPhoto, setCamerPhoto] = useState(null);
  console.log('show cameraphoto', camerPhoto);
  const [galleryPhoto, setGalleryPhoto] = useState(null);
  const handleImagePick = val => {
    setModalVisible(true);
    // setImageId(val);
    // console.log('show val', val);
  };

  const subscribeResponse = useSelector(
    state => state.EventReducer.subscribeEventResponse,
  );
  const [subscription, setsubscription] = useState(item?.subscriptions);

  useEffect(() => {
    if (subscribeResponse.id == item.id) {
      setsubscription(subscribeResponse.subscriptions);
    }
  }, [subscribeResponse]);

  const onPressWhatsApp = async () => {
    const options = {
      title: title,
      message: message,
      url: url,
      social: Share.Social.WHATSAPP,
    };
    handleShare(options);
  };

  const onPressFacebook = async () => {
    const options = {
      title: title,
      message: message,
      url: url,
      social: Share.Social.FACEBOOK,
    };
    handleShare(options);
  };

  const onPressTwitter = async () => {
    const options = {
      title: title,
      message: message,
      url: url,
      social: Share.Social.TWITTER,
    };
    handleShare(options);
  };

  const handleShare = options => {
    Share.open(options)
      .then(res => {
        // console.log('::::::::', res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const email = `${message}: ${url}`;
  const onPressCopy = () => {
    Clipboard.setString(email);
    setisCopied(true);
  };

  const handleSubscrible = val => {
    // alert(val)
    dispatch(subscribeEvent(val));
  };

  useEffect(() => {
    setTimeout(() => {
      setisCopied(false);
    }, 2000);
  }, [isCopied]);

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const handleCamera = async () => {
    try {
      let result = await launchCamera(options);
      console.log('show result hhjhjh', result);
      let newData = result?.assets[0].uri;
      setCamerPhoto(newData);
      setModalVisible(false);
    } catch (error) {
      console.log('show error', error);
    }

    // setCameraPhoto(cameraPhoto);
  };

  const handleGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      // console.log('show result hhjhjh', result);
      let newData = result?.assets[0].uri;
      setCamerPhoto(newData);
      setModalVisible(false);
    } catch (error) {
      console.log('show error', error);
    }
  };
  const handleConfirmationEvent = () => {
    let data = {
      params: {
        image: camerPhoto,
        id: item.id,
      },
      callback: () => handleClearData(),
    };

    if (data.params.image != null && data.params.id != null) {
      const res = dispatch(eventConfirmation(data));
      console.log('show res;;;;;;;;;;', res);
    }
  };
  const handleClearData = () => {
    alert('Event confirmed successfully');
    setCamerPhoto(null);
  };
  return (
    <View style={styles.contaier}>
      <HeaderPage />
      {isCopied ? <CustomeToast /> : null}
      <View style={{paddingHorizontal: 10}}>
        <Text style={styles.idstyle}>Event ID:{item.id}</Text>
        <View style={styles.singleItem}>
          <IconV color="gray" name="globe" size={24} />
          <Text style={styles.textstyle}>{item.event_type}</Text>
        </View>

        <View style={styles.locationstyle}>
          <View style={styles.oneItem}>
            <Icon name="calendar" color="gray" size={25} />
            <Text style={{...styles.textstyle, fontSize: 14}}>
              {moment(item.start).format('ddd-mm-yy')}
            </Text>
          </View>
          <View style={styles.oneItem}>
            <IconE name="location" size={25} color={colors.black} />
            <Text style={{...styles.textstyle, fontSize: 14}}>{item.city}</Text>
          </View>
        </View>
        <Text
          style={{
            ...styles.textstyle,
            fontSize: 17,
            marginLeft: 0,
            marginTop: 10,
          }}>
          {item.content}
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
        <Text style={{fontSize: 18, color: 'black', marginTop: 10}}>
          Subscrptions:{item.subscriptions}
        </Text>
        <View style={styles.addresStyle}>
          <View style={{width: '50%', alignSelf: 'flex-end'}}>
            <Text style={{fontSize: 18, color: 'black'}}>
              Address: <Text style={{fontSize: 14}}>{item.address}</Text>{' '}
            </Text>
            <Text
              style={{
                ...styles.textstyle,
                fontSize: 14,
                marginLeft: 0,
                marginTop: 10,
                fontWeight: '400',
              }}>
              {item.country_id}
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
              {item.organizer}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <Text style={{fontSize: 18, color: 'black'}}>share:</Text>
        <IconW
          onPress={() => {
            onPressWhatsApp();
          }}
          name="whatsapp"
          color="#189633"
          size={30}
        />
        <IconV
          onPress={() => {
            onPressFacebook();
          }}
          name="facebook"
          color="#1b32a1"
          size={30}
        />
        <Icon
          onPress={() => {
            onPressTwitter();
          }}
          name="twitter"
          color="#119af5"
          size={30}
        />
        <IconIonic
          onPress={() => {
            onPressCopy();
          }}
          name="copy-outline"
          color="gray"
          size={30}
        />
        <TouchableOpacity
          style={styles.subscribecontainer}
          onPress={() => handleSubscrible(item.id)}>
          <Text style={{color: 'white'}}>
            {subscription == '1' ? 'Subscribed' : 'Subscribe'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
      {isCurrentUser ? (
        <TouchableOpacity
          style={styles.confimationContianer}
          onPress={() => handleImagePick()}>
          <Text style={styles.confirmbtn}>Event Confirmation</Text>
        </TouchableOpacity>
       ) : null}

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={{uri: camerPhoto}} style={styles.bigImagecontainer} />
      </TouchableOpacity>

      {camerPhoto && (
        <TouchableOpacity
          style={{...styles.confimationContianer, alignSelf: 'center'}}
          onPress={handleConfirmationEvent}>
          <Text style={styles.confirmbtn}>Submit Image </Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>───── </Text>
            </Pressable>
            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity
                onPress={() => handleCamera()}
                style={styles.cameracontainer}>
                <Icon name="camera" size={30} style={styles.iconStyle} />
                <Text style={styles.titleText}>Add pictures from camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleGallery()}
                style={{...styles.cameracontainer, marginTop: ms(15)}}>
                <FA5 name="images" size={30} style={styles.iconStyle} />
                <Text style={styles.titleText}>Add pictures from gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  confimationContianer: {
    marginTop: 20,
    alignSelf: 'flex-end',
    right: 10,
    backgroundColor: 'brown',
    padding: 10,
    borderRadius: 20,
  },
  confirmbtn: {
    color: colors.white,
  },
  textConainer: {
    marginTop: ms(20),
  },
  niceText: {
    color: colors.white,
    fontSize: ms(10),
  },
  addBesttext: {
    color: colors.white,
    fontSize: ms(16),
    marginTop: ms(5),
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: ms(30),
  },
  bigImagecontainer: {
    borderRadius: 20,
    height: ms(156),
    width: '95%',
    overflow: 'hidden', // Make sure the content within the container respects the border radius
    borderColor: colors.white,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
    // backgroundColor: colors.lavender,
  },
  smallImagecontainer: {
    borderRadius: ms(10),
    // borderWidth: 1,
    // borderColor: colors.white,
    height: ms(72),
    // width: ms(75),
    overflow: 'hidden', // Make sure the content within the container respects the border radius
    borderColor: colors.white,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lavender,
    margin: 2,
    // paddingLeft:5
    // marginLeft:3
  },
  arrowContainer: {
    // flex:1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    //
    backgroundColor: colors.white,
    height: ms(35),
    width: '20%',
    borderRadius: 40,
    marginTop: ms(200),
  },
  cameracontainer: {
    // backgroundColor: colors.grey,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    height: ms(40),
    borderRadius: ms(10),
    alignContent: 'center',
    alignItems: 'center',
    marginTop: ms(30),
  },
  titleText: {
    padding: 10,
    color: colors.black,
  },
  iconStyle: {
    marginRight: ms(20),
    color: colors.black,
  },
  modalView: {
    backgroundColor: 'white',
    // borderTopRadius: 20,
    // paddingHorizontal: 20,

    width: '100%',
    height: '30%',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  button: {
    // borderRadius: 20,
    width: '100%',
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: colors.pink,
  },
  buttonClose: {
    backgroundColor: colors.blue,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    // marginTop: "%",
  },
});
