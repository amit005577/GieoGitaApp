import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View ,Text, TouchableOpacity, Modal, StyleSheet, FlatList, Pressable, ActivityIndicator} from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from '../utills.js/translation-hook';


const CustomPicker = ({data, selectedValue, setSelectedValue,modalVisible,setModelVisiblity,onclose}) => {
   const { Translation,} =  useTranslation()
  return (
    <TouchableOpacity style={{backgroundColor:'white'}}>

      <Text>{selectedValue}</Text>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.textStyle, { fontSize: 26, }]}>{Translation.select_language} </Text>
              {/* Close button */}


              <View style={{ flex: 1 }}>
                <FlatList
                  data={data}
                  contentContainerStyle={{ paddingBottom: 100 }}
                  keyExtractor={item => item.id}
                  ListEmptyComponent={() => {
                    return (
                      <ActivityIndicator size={'small'} color={'blue'} />
                    )
                  }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setSelectedValue(item)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                          paddingHorizontal: 20,
                        }}>
                        <View>
                          <Text style={styles.modalText}>{item.name}</Text>
                        </View>
                        <FIcon
                          name="check-circle"
                          size={20}
                          color={
                            item.isSelected
                              ? 'green'
                              : 'lightgray'
                          }
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <TouchableOpacity
                style={[styles.buttonClose]}
                onPress={()=>onclose()}
                // onPress={() => setModelVisiblity(!modalVisible)}
                >
                <Text style={styles.textStyle}>{Translation.close} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>



      {/* <Picker
      // enabled={true}

        placeholder='select value'
        selectedValue={selectedValue}
        selectionColor={"black"}
        dropdownIconColor={"black"}
        backgroundColor={'white'}
        themeVariant={'light'}
        style={{color:'black',backgroundColor:'white'}}
        
        itemStyle={{  color: "blue", fontFamily:"Ebrima", fontSize:17 }}
        
        onValueChange={itemValue => setSelectedValue(itemValue)}>
        {data?.map(item => (
          <Picker.Item  key={item.id} label={item.name} value={item.id}  />
        ))}
      </Picker> */}
    </TouchableOpacity>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backContainer: {
    height: 35,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  texttitle: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  onecontainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    height: 40,
  },
  textCotaier: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    left: 20,
  },
  iconStylecontainer: {
    width: '10%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  texstyle: {
    fontSize: 18,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '93%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'orange',
    alignSelf: 'center',
    right: 10,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 7,
    elevation: 5,
    zIndex: 10
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 20,
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

