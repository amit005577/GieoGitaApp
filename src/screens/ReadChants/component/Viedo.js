import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { videoJson } from '../../../Components/videoJson';
import { getVideoData } from '../../../redux/actions';
import Constants from '../../../utills.js/Constants';
import { colors } from '../../../helper/colors';

const VideoScreen = () => {
  const dispatch = useDispatch();
  const videoData = useSelector(state => state.AppReducers.videoData);
  const [videoId, setVideoId] = useState(videoJson[0])
  useEffect(() => {
    dispatch(getVideoData());
  }, []);
  const handleOnpressVideo = (el) => {
    setVideoId(el)
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleOnpressVideo(item)} style={{
        width: '100%', marginTop: 10, borderWidth: 2,
        borderColor: item.videoUrl == videoId.videoUrl ? "red" : 'white'
      }}>
        <ImageBackground
          resizeMode="cover"
          source={{ uri: `${Constants.YOUTUBE_THUMBNAIL_URL}${item.videoUrl}/0.jpg` }}
          style={styles.thumnailstyle}>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
     <SafeAreaView style={{ flex: 1,}} >  
      <View style={{ marginTop: 20, paddingHorizontal: 20, flex: 1 }}>
        <View style={{ flex: .5 }}>
          <WebView
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            mediaPlaybackRequiresUserAction={true}
            androidLayerType='hardware'
            mixedContentMode='always'

            domStorageEnabled={true}
            androidHardwareAccelerationDisabled={false}
            source={{ uri: 'https://www.youtube.com/embed/' + `${videoId.videoUrl}` }}
          />

        </View>
        <View style={{ flex: 0.7, marginTop: 20 }}>
          <FlatList
            data={videoJson}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  thumnailstyle: {
    height: 130,
    width: '100%',
  },
  backgroundVideo: {
    height: 200,
    width: '100%',
    borderWidth: 1,
  },
});
