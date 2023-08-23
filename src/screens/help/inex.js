import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import HeaderPage from '../../Components/header';
import Loader from '../../Components/Loader';
import { useTranslation } from '../../utills.js/translation-hook';

const HelpScreen = () => {
  const { Translation, isLoading } = useTranslation()

  return (
    <View style={styles.container}>
      {isLoading ?
        <Loader /> : null
      }
      <HeaderPage />
      <Text style={styles.title}>सहायता</Text>
      <Text style={{ ...styles.title, fontSize: 16 }}>संस्करण जानकारी</Text>
      <View>
        <View
          style={{ ...styles.graph1line, marginTop: 20, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>
              मेज़बान
            </Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>मेज़बान</Text>
          </View>
        </View>
        <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>ओएस</Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>एंड्रॉयड</Text>
          </View>
        </View>
        <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>
              ओएस संस्करण
            </Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>22</Text>
          </View>
        </View>
        <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>
              एप्लिकेशन वेरीज़न
            </Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>1.2220.120</Text>
          </View>
        </View>
        <View style={{ ...styles.graph1line, borderBottomWidth: 0 }}>
          <View style={styles.graphinside}>
            <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>
              सेटिंग संस्करण
            </Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>51.20.03</Text>
          </View>
        </View>
        <View style={styles.graph1line}>
          <View style={styles.graphinside}>
            <Text style={{ ...styles.graphText, fontWeight: 'bold' }}>
              पृष्ठ संस्करण
            </Text>
          </View>
          <View style={styles.graphinside}>
            <Text style={styles.graphText}>5web/p.12.3.4.5</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: '#EF4136',
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 40,
          borderRadius: 10,
        }}>
        <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>
          मुद्दों/प्रतिक्रिया की रिपोर्ट करें
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 30,
  },
  graph1line: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#F7941C',
    borderRightWidth: 0,
    // width: '100%',
    //
  },
  graphinside: {
    width: 140,
    borderRightWidth: 1,
    // borderWidth: 2,
    borderColor: 'orange',
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems: 'center',
  },
  graphText: {
    fontSize: 16,
    color: 'black',
    left: 5,
  },
});
