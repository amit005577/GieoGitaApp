import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Pdf from 'react-native-pdf';
import FIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getPdfData, languageList } from '../../../redux/actions';
import Constants from '../../../utills.js/Constants';
import { useTranslation } from '../../../utills.js/translation-hook';

const ReadPdfScreen = () => {
  const [todaysDate, setTodaysDate] = React.useState(moment().format('DD MMM'));
  const [modalVisible, setModalVisible] = React.useState(false);
  const pdfRef = useRef(null);
  const [totalPage, setTotalPage] = React.useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { Translation } = useTranslation()
  const [selected, setSelected] = useState({
    id: 17,
    title: 'App PDF Setting',
    short_content: '21',
    file_short_content:
      `${Constants.READ_PDF_URL}/public/uploads/all/21/Single-Page-Setting-English.pdf`,
    content: null,
    lang: 'en',
    create_at: '2023-07-18T12:47:47.000000Z',
    updated_at: '2023-07-20T09:22:33.000000Z',
  });
  // const pdflist = useSelector(state => state.AppReducers.pdfData);
  const pdfList = useSelector(state => state.AppReducers.pdfList);
  const completeList = useSelector(state => state.AppReducers.languageList);
  useEffect(() => {
    dispatch(languageList());
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPdfData());
  }, []);
  const handleOnpressLanguage = _item => {
    let _data = '';
    pdfList[0].translations.map(item => {
      item.lang == _item.code && (_data = item);
    });
    setSelected(_data);
    setModalVisible(false);
  };
  const handleOnpress = () => {
    setModalVisible(true);
  };

  const [zoom, setZoom] = useState(1);
  const zoomIncrease = () => {
    setZoom(zoom + 0.1);
  };

  const zoomdecrease = () => {
    setZoom(zoom - 0.1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1}}>
        <View style={styles.monthContainer}>
          <TouchableOpacity onPress={zoomdecrease}>
            <FIcon
              name="minus-circle"
              size={40}
              style={{...styles.iconStyle}}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={styles.monthContentStyle}
              onPress={() => handleOnpress()}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
              {Translation.select_language}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                color: 'red',
                alignSelf: 'center',
                marginTop: 2,
              }}>
              {currentPage}/{totalPage}
            </Text>
          </View>
          <TouchableOpacity onPress={zoomIncrease}>
            <FIcon name="plus-circle" size={40} style={{...styles.iconStyle}} />
          </TouchableOpacity>
        </View>

          <Pdf
            trustAllCerts={false}
            source={{
              uri: selected?.file_short_content,
            }}
            page={currentPage}
            onPageChanged={(page, numberOfPages) => {
              setCurrentPage(page);
              console.log(`Current page: ${page}`);
            }}
            fitPolicy={Dimensions.get('window').width}
            scale={zoom}
            renderActivityIndicator={() => (
              <ActivityIndicator color="black" size="large" />
            )}
            // onScaleChanged={.1}
            // enablePaging={true}
            onLoadProgress={percentage => console.log(`Loading :${percentage}`)}
            onLoadComplete={numberOfPages => {
              setTotalPage(numberOfPages);
            }}
            onError={error => console.log('show error', error)}
            // onPageSingleTap={page => alert(page)}
            onPressLink={link => Linking.openURL(link)}
            spacing={30}
            style={{
              height: 590,
              width: Dimensions.get('window').width,
              marginBottom: 100,
            }}
          />
      </View>

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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>cancel</Text>
            </Pressable>
            <View style={{marginTop: 20}}>
              <FlatList
                data={completeList}
                keyExtractor={item => item.id}
                ListFooterComponent={() => <View style={{height: 200}} />}
                renderItem={({item}) => {
                  // console.log('show item data ddkfdk', item);
                  return (
                    <TouchableOpacity
                      onPress={() => handleOnpressLanguage(item)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingHorizontal: 20,
                      }}>
                      <View>
                        <Text style={styles.modalText}>{item.name}</Text>
                      </View>
                      <Icon
                        name="check-circle"
                        size={20}
                        color={
                          // item.language == selected.language
                          //   ? 'green'
                          // :
                          'orange'
                        }
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReadPdfScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
    // paddingHorizontal: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    height: 100,
    // left: -10,
  },
  iconStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: '#BB6646',
    opacity: 0.7,
  },
  monthContentStyle: {
     minWidth:"40%",
    borderWidth: 2,
    fontWeight: 'bold',
    height: 53,
    // width: 90,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'orange',
   
    // margin: 20,
  },
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  submitstyle: {
    marginTop: 20,
    backgroundColor: '#F7941C',
    width: '85%',
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    // marginTop: 300,
    backgroundColor: '#ffffffff',
    // borderRadius: 20,
    // padding: 35,
    height: '100%',
    width: '100%',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    bottom: 0,
  },
  button: {
    // borderRadius: 20,
    padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: 'orange',
    alignSelf: 'center',
    right: 10,
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    // marginTop: 20,
    marginBottom: 20,
    // textAlign: 'center',
    fontSize: 22,
    color: '#434343',
  },
  eventstyle: {
    backgroundColor: '#434343',
    width: 240,
    height: 53,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  countBtn: {
    position: 'absolute',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 100,
    // right:10,
    // top:90
  },
});

const languageData = [
  {
    id: 1,
    language: 'Hindi',
  },
  {
    id: 2,
    language: 'Englist',
  },
  {
    id: 3,
    language: 'Marathi',
  },
  {
    id: 4,
    language: 'Gujrati',
  },
  {
    id: 5,
    language: 'Telgu',
  },
  {
    id: 6,
    language: 'Bangla',
  },
  {
    id: 7,
    language: 'Odia',
  },
  {
    id: 8,
    language: 'Tamil',
  },
  {
    id: 9,
    language: 'Bangla',
  },
  {
    id: 10,
    language: 'Odia',
  },
  {
    id: 11,
    language: 'Tamil',
  },
];
