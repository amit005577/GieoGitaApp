import React, {useState, useRef, useDebugValue, useEffect} from 'react';
import Pdf from 'react-native-pdf';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';

import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getPdfData, languageList} from '../../../redux/actions';
import {colors} from '../../../helper/colors';
import WebView from 'react-native-webview';
// import TelguPdf from '../../../../assets/pdf/Telgu.pdf';
// import EnglishPdf from '../../../../assets/pdf/English.pdf';
// import banglaPdf from '../../../../assets/pdf/Bangla.pdf';
// import Gujrati from '../../../../assets/pdf/Gujrati.pdf';

const ReadPdfScreen = () => {
  const [todaysDate, setTodaysDate] = React.useState(moment().format('DD MMM'));
  const [modalVisible, setModalVisible] = React.useState(false);
  const pdfRef = useRef(null);
  const [totalPage, setTotalPage] = React.useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState({
    id: 17,
    title: 'App PDF Setting',
    short_content: '21',
    file_short_content:
      'https://projects.cityinnovates.in/gieo_gita/public/uploads/all/21/Single-Page-Setting-English.pdf',
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
  // console.log('show pdflist data', JSON.stringify(completeList));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPdfData());
  }, []);
  // console.log('show page', page);
  const handleOnpressLanguage = _item => {
    // console.log(_item, '-->>>>>>>>');
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
  const pageDecrease = () => {
    if (currentPage == 1) {
      return currentPage;
    } else {
      setCurrentPage(x => {
        let y = x - 1;

        pdfRef.current?.setPage(y);
        return y;
      });
    }
  };
  const pageIncrease = () => {
    if (totalPage == currentPage) {
      return currentPage;
    } else {
      setCurrentPage(x => {
        let y = x + 1;
        pdfRef.current?.setPage(y);
        return y;
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{paddingHorizontal: 0}}>
        <View style={styles.monthContainer}>
          <TouchableOpacity
            style={styles.monthContentStyle}
            // setDisable(true);
            onPress={() => handleOnpress()}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>भाषा चुनें</Text>
            {/* <Text style={{color: 'black', fontWeight: 'bold'}}> भाषा</Text> */}
          </TouchableOpacity>

          {/* <View style={styles.monthContentStyle}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              {todaysDate}
            </Text>
          </View> */}
          {/* 
          <View>
            <TouchableOpacity onPress={() => dateIncrement()}>
              <FIcon
                name="arrow-right-circle"
                size={30}
                style={{...styles.iconStyle}}
              />
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity onPress={() => handleOnpress()}>
            <Icon name="language" size={40} style={{...styles.iconStyle}} />
          </TouchableOpacity>
        </View>
        {/* <WebView
          source={{
            // uri: `http://docs.google.com/gview?embedded=true&url=${'https://drive.google.com/file/d/1jEGCvlJAszVRYVTejiUCYe3D05LAxq5Z/view?usp=sharing'}`,
            // uri: `https://drive.google.com/file/d/1jEGCvlJAszVRYVTejiUCYe3D05LAxq5Z/view?usp=sharing`,
            uri: selected?.file_short_content,
          }}
          style={{height: 400, width: Dimensions.get('window').width}}
          nestedScrollEnabled
        /> */}
        {/* <WebView
          style={{height: 500, width: 350}}
          nestedScrollEnabled={true}
          source={{
            uri: selected?.file_short_content,
            // uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=http://www.africau.edu/images/default/sample.pdf',
          }}
        /> */}

        <Pdf
          trustAllCerts={false}
          source={{
            // uri: `http://docs.google.com/gview?embedded=true&url=${'https://drive.google.com/file/d/1jEGCvlJAszVRYVTejiUCYe3D05LAxq5Z/view?usp=sharing'}`,
            uri: selected?.file_short_content,
            // uri:
            //   pdflist.length > 0 &&
            //   pdflist[0]?.translations[0]?.file_short_content,
            // 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
          }}
          page={currentPage}
          fitPolicy={Dimensions.get('window').width}
          // scale={.3}
          renderActivityIndicator={() => (
            <ActivityIndicator color="black" size="large" />
          )}
          enablePaging={true}
          onLoadProgress={percentage => console.log(`Loading :${percentage}`)}
          onLoadComplete={numberOfPages => {
            setTotalPage(numberOfPages);
          }}
          onError={error => console.log('show error', error)}
          // onPageSingleTap={page => alert(page)}
          onPressLink={link => Linking.openURL(link)}
          spacing={10}
          style={{height: 590, width: Dimensions.get('window').width}}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => pageDecrease()}>
            <FIcon name="arrow-left-circle" size={41} color={colors.black} />
          </TouchableOpacity>
          <Text style={{fontSize: 18, color: '#F7941C'}}>
            {currentPage}/{totalPage}
          </Text>
          <TouchableOpacity onPress={() => pageIncrease()}>
            <FIcon name="arrow-right-circle" size={41} color={colors.black} />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 0}}>
          {/* <TouchableOpacity style={styles.submitstyle}>
            <Text style={{color: 'white'}}>Complete</Text>
          </TouchableOpacity> */}
          {/* <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <View
              style={{...styles.insideContainer, backgroundColor: '#C7E9C9'}}>
              <Text style={styles.numberText}>24</Text>
              <Text style={styles.currentText}>Current Week</Text>
            </View>
            <View
              style={{...styles.insideContainer, backgroundColor: '#E9E1C7'}}>
              <Text style={styles.numberText}>24</Text>
              <Text style={styles.currentText}>Current Week</Text>
            </View>
            <View
              style={{...styles.insideContainer, backgroundColor: '#C7DBE9'}}>
              <Text style={styles.numberText}>24</Text>
              <Text style={styles.currentText}>Current Week</Text>
            </View>
          </View> */}
        </View>
        <View style={{height: 100}} />
      </ScrollView>
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
    justifyContent: 'center',
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
    borderWidth: 2,
    fontWeight: 'bold',
    height: 53,
    width: 90,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'orange',
    margin: 20,
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
