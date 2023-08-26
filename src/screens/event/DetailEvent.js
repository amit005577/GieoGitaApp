import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Clipboard,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Share from 'react-native-share';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/Entypo';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconW from 'react-native-vector-icons/FontAwesome';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import CustomeToast from '../../Components/CustomeToast';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { colors } from '../../helper/colors';
import { eventConfirmation, subscribeEvent } from '../../redux/actions';
import { useTranslation } from '../../utills.js/translation-hook';

const DetailEvent = ({ route }) => {
  const { Translation, isLoading } = useTranslation()

  const item = route.params.data;
  const isCurrentUser = route.params.isCurrentUser
  const url = item?.thumbnail;
  const message = item?.short_content;
  const title = Translation.shared_by + ' ' + item?.organizer;
  const dispatch = useDispatch();
  const [isCopied, setisCopied] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [localImage, setLocalImage] = useState(null);

  const handleImagePick = val => {
    setModalVisible(true);
  };

  const subscribeResponse = useSelector(
    state => state.EventReducer.subscribeEventResponse,
  );
  const [subscription, setsubscription] = useState(item?.subscriptions);

  useEffect(() => {
    if (subscribeResponse.id == item?.id) {
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
      let newData = result?.assets[0].uri;
      setLocalImage(newData);
      setModalVisible(false);
    } catch (error) {
      // console.log('show error', error);
    }
  };

  const handleGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      let newData = result?.assets[0].uri;
      setLocalImage(newData);
      setModalVisible(false);
    } catch (error) {
      // console.log('show error', error);
    }
  };

  const handleConfirmationEvent = () => {
    let data = {
      params: {
        image: localImage,
        id: item?.id,
      },
      callback: () => handleClearData(),
    };

    if (data.params.image != null && data.params.id != null) {
      const res = dispatch(eventConfirmation(data));
    }
  };

  const handleClearData = () => {
    alert('Event confirmed successfully');
    setLocalImage(null);
  };

  return (
    <View style={styles.contaier}>
      {isLoading ?
        <Loader /> : null
      }
      <HeaderPage />
      {isCopied ? <CustomeToast /> : null}
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.idstyle}>{Translation.event_id + ':'}{item?.id}</Text>
        <View style={styles.singleItem}>
          <IconV color="gray" name="globe" size={24} />
          <Text style={styles.textstyle}>{item?.event_type}</Text>
        </View>

        <View style={styles.locationstyle}>
          <View style={styles.oneItem}>
            <Icon name="calendar" color="gray" size={25} />
            <Text style={{ ...styles.textstyle, fontSize: 14 }}>
              {moment(item?.create_at).format('ddd-mm-yy')}
            </Text>
          </View>
          <View style={styles.oneItem}>
            <IconE name="location" size={25} color={colors.black} />
            <Text style={{ ...styles.textstyle, fontSize: 14 }}>{item?.city}</Text>
          </View>
        </View>
        <Text
          style={{
            ...styles.textstyle,
            fontSize: 17,
            marginLeft: 0,
            marginTop: 10,
          }}>
          {item?.content}
        </Text>
        <Text
          style={{
            ...styles.textstyle,
            fontSize: 14,
            marginLeft: 0,
            marginTop: 10,
            fontWeight: '400',
          }}>
          {item?.instraction}
        </Text>
        <Text style={{ fontSize: 18, color: 'black', marginTop: 10 }}>
          {Translation.subscrptions + ":"}{item?.subscriptions}
        </Text>
        <View style={styles.addresStyle}>
          <View style={{ width: '50%', alignSelf: 'flex-end' }}>
            <Text style={{ fontSize: 18, color: 'black' }}>
              {Translation.Address + ':'} <Text style={{ fontSize: 14 }}>{item?.address}</Text>{' '}
            </Text>
            <Text
              style={{
                ...styles.textstyle,
                fontSize: 14,
                marginLeft: 0,
                marginTop: 10,
                fontWeight: '400',
              }}>
              {item?.country_id}
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
              {Translation.organizer + ':'}
            </Text>
            <Text
              style={{
                ...styles.textstyle,
                fontSize: 14,
                marginLeft: 0,
                marginTop: 10,
                fontWeight: '400',
              }}>
              {item?.organizer}
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
        <Text style={{ fontSize: 18, color: 'black' }}>{Translation.share+':'}</Text>
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
          onPress={() => handleSubscrible(item?.id)}>
          <Text style={{ color: 'white' }}>
            {subscription == '1' ? Translation.subscribed : Translation.subscribe}
          </Text>
        </TouchableOpacity>
      </View>
      {isCurrentUser ? (
        <TouchableOpacity
          style={styles.confimationContianer}
          onPress={() => handleImagePick()}>
          <Text style={styles.confirmbtn}>{Translation.event_confirmation}</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={{ uri: localImage }} style={styles.bigImagecontainer} />
      </TouchableOpacity>

      {localImage && (
        <TouchableOpacity
          style={{ ...styles.confimationContianer, alignSelf: 'center' }}
          onPress={handleConfirmationEvent}>
          <Text style={styles.confirmbtn}>{Translation.submit_image} </Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>───── </Text>
            </Pressable>
            <View style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity
                onPress={() => handleCamera()}
                style={styles.cameracontainer}>
                <Icon name="camera" size={30} style={styles.iconStyle} />
                <Text style={styles.titleText}>{Translation.add_pictures_from_camera}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleGallery()}
                style={{ ...styles.cameracontainer, marginTop: ms(15) }}>
                <FA5 name="images" size={30} style={styles.iconStyle} />
                <Text style={styles.titleText}>{Translation.add_pictures_from_gallery}</Text>
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

  oneItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  locationstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: 'lightgrey',
    marginTop: 10,
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
    marginTop: 10,
  },
  smallImagecontainer: {
    borderRadius: ms(10),
    height: ms(72),
    overflow: 'hidden', // Make sure the content within the container respects the border radius
    borderColor: colors.white,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lavender,
    margin: 2,
  },
  arrowContainer: {
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
    flexDirection: 'row',
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

    width: '100%',
    height: '30%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button: {
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
  },
});
