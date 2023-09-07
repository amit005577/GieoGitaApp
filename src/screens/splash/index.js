import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React from 'react';
import mask from '../../../assets/images/Mask.png';
import logo from '../../../assets/images/Logo.png';

const SplashScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View style={{ flex: 1 }}>
        <ImageBackground
          resizeMode={'stretch'}
          source={mask}
          style={styles.imageContainer}>
          <Image
            source={logo}
            style={{
              height: 250,
              width: 250,
              marginTop: 100,
              alignSelf: 'center',
            }}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  imageContainer: {
    height: '100%',
    width: '100%',
  },
});
