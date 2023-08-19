import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, {useDebugValue, useEffect,useState} from 'react';
import {videoJson} from '../../../Components/videoJson';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import {useDispatch, useSelector} from 'react-redux';
import {getVideoData} from '../../../redux/actions';
import arjun from '../../../../assets/images/arjun.jpg';
import {WebView} from 'react-native-webview';
import bhawan from '../../../../assets/images/patanjali.jpeg';

const VideoScreen = () => {
  const dispatch = useDispatch();
  const videoData = useSelector(state => state.AppReducers.videoData);
  // console.log(JSON.stringify(videoData), 'show datat from videojf');
  const [videoId, setVideoId] = useState(videoJson[0])
  // console.log("show content data",videoData)
  useEffect(() => {
    dispatch(getVideoData());
  }, []);
 const handleOnpressVideo=(el)=>{
  // console.log("show url",el)
  setVideoId(el)
 }
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>handleOnpressVideo(item)}  style={{width: '100%', marginTop: 10,borderWidth:2,
      borderColor:item.videoUrl==videoId.videoUrl?"red":'white'
    }}>
        <ImageBackground
          resizeMode="cover"
          source={item.thumbnailUrl}
          style={styles.thumnailstyle}>
          
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const [error, setError] = React.useState('');
  // console.log(error);
  // let videoId ="https://youtu.be/-nKlaiMSdag";
  // const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
  let idd = 'yCTpMpyEpUg';
  return (
    <View style={{marginTop: 20, paddingHorizontal: 20, flex: 1}}>
      <View style={{flex: .5}}>
      <WebView
        // style={{width: 320, maxHeight: 400}}
        style={{flex:1}}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={true}
        androidLayerType= 'hardware'
        mixedContentMode='always'
        
        domStorageEnabled={true}
        androidHardwareAccelerationDisabled={false}
        source={{uri: 'https://www.youtube.com/embed/' +`${videoId.videoUrl}`}}
      />
      
       
      </View>
      <View style={{flex: 0.7, marginTop: 20}}>
        <FlatList
          data={videoJson}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  thumnailstyle: {
    height: 130,
    width: '100%',
  },
  backgroundVideo: {
    // flex: 1,
    height: 200,
    width: '100%',
    borderWidth: 1,
  },
});

// <VideoPlayer
// video={{
//   uri: 'https://projects.cityinnovates.in/gieo_gita/public/uploads/video/gieo_gita_video.mp4',
// }}
// videoWidth={1700}
// videoHeight={900}
// thumbnail={()=>{
//   <ActivityIndicator size={'small'} color={'red'} />
// }}
// />
