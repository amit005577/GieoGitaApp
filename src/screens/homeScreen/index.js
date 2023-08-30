import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import HeaderPage from '../../Components/header';
import { useHomeHooks } from '../../utills.js/hooke/home-hooks';
import { useTranslation } from '../../utills.js/translation-hook';

const windowWidth = Dimensions.get('window').width - 70;
const HomeScreen = () => {
  const { Translation, isLoading, handleGetHomeData, homePageData } =
    useHomeHooks();
  const { handleDefaultLanguage } = useTranslation()
  const [sourceHtml, setSourceHtml] = useState('')
  const selectedLang = useSelector(state => state.AppReducers.selectedLangCode);

  useEffect(() => {
    handleGetHomeData();
  }, []);


  useEffect(() => {
    const updateHtmlContent = async () => {
      const curLang = await handleDefaultLanguage()
      if (homePageData?.data?.length > 0) {
        const currentUrl = homePageData?.data[0]?.translations.find((item) => item.lang == curLang.code)
        setSourceHtml(currentUrl?.content)
      }
    }
    updateHtmlContent()
  }, [homePageData, selectedLang])

  const IndicatorLoadingView=()=> {
    return (
      <ActivityIndicator
        color="#3235fd"
        size="large"
        style={styles.IndicatorStyle}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? <Loader /> : null}
      <HeaderPage />

      <WebView
        originWhitelist={['*']}
        source={{ html: sourceHtml }}
        style={{ ...StyleSheet.absoluteFill }}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={true}
        androidLayerType='hardware'
        mixedContentMode='always'
        domStorageEnabled={true}
        androidHardwareAccelerationDisabled={false}
        scalesPageToFit={false}
        renderLoading={IndicatorLoadingView}
        startInLoadingState={true}
      />

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  IndicatorStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
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
  imagestyle: { height: 100, width: windowWidth / 3, resizeMode: 'stretch' },
  listItem: {
    color: '#2A2A2A',
    fontSize: 12,
    marginTop: 10,

    fontWeight: 'bold',
    textAlign: 'justify',
  },
});
