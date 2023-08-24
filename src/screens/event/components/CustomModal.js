import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from '../../../utills.js/translation-hook';

const CustomModal = ({
  handleSelectedItem,
  selectedItem,
  setselectedItem,
  showModal,
  setShowModal,
  data,
}) => {
  // console.log("show selected item",selectedItem)
  const { Translation, isLoading } = useTranslation()
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowModal(!showModal)}>
              <Text style={styles.textStyle}>{Translation.close}</Text>
            </Pressable>
            <View style={{marginTop: 20}}>
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                ListFooterComponent={() => <View style={{height: 200}} />}
                ListEmptyComponent={() => {
                  return <ActivityIndicator size={'small'} color={'blue'} />;
                }}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleSelectedItem(item)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // width: '100%',
                      }}>
                      <View style={{width:"90%",alignSelf:'flex-start'}}>
                        <Text style={styles.modalText}>{item.value}</Text>
                      </View>
                      <View style={{width:"10%"}}>
                      <FIcon
                        name="check-circle"
                        size={20}
                        color={
                          item.name == selectedItem ? 'green' : 'orange'
                        }
                      />
                      </View>
                     
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    // marginHorizontal:20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingTop:30,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    alignSelf:'flex-start'
  },
});
