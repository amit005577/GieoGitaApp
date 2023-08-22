import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
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
import { useHomeHooks } from '../../utills.js/hooke/home-hooks';

const windowWidth = Dimensions.get('window').width - 70;
const HomeScreen = () => {

  const { Translation, handleGetHomeData, homePageData } = useHomeHooks()

  useEffect(() => {
    handleGetHomeData()
  }, []);

  return (
    <ScrollView style={styles.container}>
      <HeaderPage />
      <ScrollView contentContainerStyle={{}}>
        <ImageBackground
          resizeMode="cover"
          source={ArjunImage}
          style={{ height: 330, width: '100%' }}>
          <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
            <Image
              source={maharaj}
              style={{
                height: 80,
                width: 80,
              }}
            />
          </View>
        </ImageBackground>
        <View style={{ marginHorizontal: 20 }}>
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
              अभियान के बारे में
            </Text>

            <Text
              style={{
                ...styles.titleStyle,
                color: '#963632',
                fontWeight: '900',
                fontSize: 17,
                marginTop: 4,
              }}>
              हम एक बनें-हम नेक बने
            </Text>
            <Text
              style={{
                ...styles.titleStyle,
                color: '#963632',
                fontWeight: '900',
                fontSize: 17,
                marginTop: 4,
              }}>
              साकार वैश्विक अभिव्यक्ति
            </Text>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ color: '#2A2A2A', fontSize: 12, fontWeight: 'bold' }}>
                जय श्री कृष्ण,
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
                {'                    '}गीता केवल पाठ्य या पूज्य ग्रन्थ ही नहीं
                अपितु जीवन को आनन्दमय, प्रेममय, भक्तिमय बनाने के साथ-साथ व्यवहार
                कुशलता व आत्म उत्थान की विशिष्ट जीवन शैली भी है ! गीता अमृत है
                और अमृत का एक कण भी मिल जाने से भी अमृततत्व तो मिलेगा ही।
                भगवत्पाद शंकराचार्य जी ने जो यह कहा कि ”भगवद्गीता-किंचिद्धीता
                गंगा जल लव कणिका पीता“ किंचित् मात्र भी, कण भर भी पर्याप्त है
                हमारे कल्याण के लिये-इसी भाव से पूज्य गुरुदेव गीता मनीषी स्वामी
                श्रीज्ञानानन्द जी महाराज ने श्रीमद्भगवद्गीता के 18 अध्यायों में
                से प्रत्येक अध्याय के सार रूप एक-एक श्लोक का चयन कर पूरे विश्व
                के लिये गीता जी का सरल-सुगम आवाहन् किया कि किस प्रकार हम गीता के
                माध्यम से अपनी भावनाओं को आकार दे सकते है, किस प्रकार रंग भर
                सकते है अपने सपनों के भविष्य में, किस प्रकार उड़ सकते है स्वछन्द
                आकाश में, किस तरह पहुँच सकते है अपने गन्तव्य तक, जहाँ हमें
                मिलेगी असीम शान्ति, स्फूर्ति, कार्यकुशलता, उच्च भाव-मृदुल स्वभाव
                और स्वाभाविक आत्मिक प्रसन्नता।
              </Text>
              <Text
                style={{
                  color: '#2A2A2A',
                  fontSize: 12,
                  textAlign: 'justify',
                  fontWeight: 'bold',
                }}>
                {'      '} आइये, मिलकर संकल्प लें जीओ गीता द्वारा प्रेरित
                अष्टादश श्लोकी गीता पाठ के इस वैश्विक अभियान में जुड़कर
                नित्यप्रति अधिकाधिक पाठ करने - करवाने का, तथा सबल स्वस्थ राष्ट्र
                निर्माण, समस्याओं के समाधान और मानवता की मुस्कान के इस विराट्
                यज्ञ में सहभागी बनकर, प्रभु की असीम कृपा व गुरुवर के आशीर्वाद
                पाने का।
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
                धर्ममय यह संवाद हम दोनों का, करे जो पुरुष पाठ इसका सदा। मत मेरे
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
                मत मेरे में पाठ उसका यही, है ज्ञान-यज्ञ से ही पूजा मेरी।।
              </Text>
              <Text
                style={{
                  color: '#2A2A2A',
                  fontSize: 15,
                  marginTop: 10,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                विशेष निर्देश:
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
                    18 श्लोकी गीता पाठ 18 श्लोकों तक सीमित रखने हेतु नहीं अपितु
                    इस माध्यम से सम्पूर्ण गीता को समझने समझाने की प्रारम्भिक पहल
                    है
                  </Text>
                  <Text
                    style={{
                      color: '#2A2A2A',
                      fontSize: 15,
                      marginTop: 10,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    विशेष संकेत:
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
                    निर्देश जीओ गीता एप्लिकेशन का उपयोग करने के लिए:
                  </Text>
                  <Text
                    style={{
                      color: '#2A2A2A',
                      fontSize: 12,
                      marginTop: 10,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      textAlign: 'justify',
                    }}>
                    1. यह वैश्विक अभियान एक श्रेष्ठतम् यज्ञ है संकल्प पूर्वक आगे
                    आयें। {'\n'} {'\n'}
                    2. प्रोफाइल पेज पर अपना कुल संकल्प रजिस्टर करें।{'\n'}{' '}
                    {'\n'}
                    3. शंख पर क्लिक करें और प्रतिदिन के पाठ को अंकित करें।{
                      '\n'
                    }{' '}
                    {'\n'}
                    4. संख्या टाइप करके अथवा + - बटन का उपयोग करके अंकित की जा
                    सकती है।{'\n'} {'\n'}
                    5. 23 जुलाई से आज तक किए गए अष्टादश श्लोकी गीता पाठ की
                    संख्या एक बार में अंकित करने की सुविधा। {'\n'} {'\n'}
                    6. डेटा /वाईफाई चालू होने पर ही ऐप पर संख्या अर्पण हो सकती
                    है।
                    {'\n'} {'\n'}
                    7. ऐप के लाइब्रेरी बटन पर जाकर अष्टादश श्लोकी गीता पाठ अर्थ
                    भी सभी भाषाओं में उपलब्ध हैं।{'\n'} {'\n'}
                    यदि इस ऐप का उपयोग करने से सम्बन्धित कोई समस्या/प्रश्न हों
                    तो कृपया Feedback अवश्य दीजिए।{'\n'} {'\n'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.titleStyle}>हमारे प्रायोजक</Text>
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
          <View style={{ ...styles.rowImage, paddingHorizontal: 20 }}>
            <View>
              <Image
                source={logo2}
                style={{ ...styles.imagestyle, width: windowWidth / 2.3 }}
              />
            </View>
            <View>
              <Image
                source={logo5}
                style={{ ...styles.imagestyle, width: windowWidth / 2.3 }}
              />
            </View>
          </View>

          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    </ScrollView>
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
  imagestyle: { height: 100, width: windowWidth / 3, resizeMode: 'stretch' },
});
