/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {successImage} from './../../../assets/images/success.jpg';
import {Backdrop} from 'react-native-backdrop';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fumi} from 'react-native-textinput-effects';
import {Hoshi} from 'react-native-textinput-effects';
import {Kohana} from 'react-native-textinput-effects';
import {useValidation} from 'react-native-form-validator';
import api from '../../api';
import {
  Dimensions,
  Alert,
  Modal,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';

import {TextInput} from 'react-native-paper';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  errorMsg: {
    fontFamily: 'Raleway-Semibold',
    color: 'black',
    fontSize: 18,
  },

  label: {
    marginTop: 20,
    margin: 12,
    fontFamily: 'Raleway-Bold',
    fontSize: 22,
    fontWeight: 'normal',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
    height: 420,
    margin: 20,
    marginTop: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'left',
    fontFamily: 'Raleway-Regular',
    fontWeight: '700',
    fontSize: 22,
  },
  InputTitle: {
    fontFamily: 'Dosis-SemiBold',
    fontSize: 28,
    color: '#101e9e',
    marginLeft: 25,
    marginTop: 20,
    textAlign: 'left',
    marginBottom: 20,
  },

  AddReviewBtnContainer: {
    width: 110,
    height: 45,
    borderRadius: 10,
    margin: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    elevation: 8,
  },
  AddReviewBtnText: {
    color: '#e03436',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 5,
  },

  AddBtn: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    height: 52,
    marginTop: 20,
    marginBottom: 32,
  },
  ReviewerName: {
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#333333',
    marginLeft: 8,
  },
  CompanyName: {
    fontSize: 19,
    fontFamily: 'Roboto-Medium',
    color: '#333333',
    marginLeft: 10,
    marginBottom: 4,
  },
  details: {
    marginLeft: 15,
  },
  RecieptIcon: {
    fontSize: 28,
    color: '#363f4d',
  },
});

const Reciept = ({navigation, setModalVisible, modalVisible, tripID}) => {
  const [passengerCount, onChangePassengerCount] = useState(null);
  const [route, onChangeRoute] = useState(null);
  const [busNo, onChangeBusNo] = useState(null);
  const [remarks, onChangeRemarks] = useState(null);
  const [visible, setVisible] = useState(false);
  const [TripDetails, setTripDetails] = useState([]);

  useEffect(() => {
    if (modalVisible) {
      api
        .get(`/trip/${tripID}`)
        .then(res => {
          if (res) {
            setTripDetails(res.data[0]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [modalVisible]);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };
  const backgroundStyle = {
    backgroundColor: '#5956E9',
  };

  return (
    <SafeAreaProvider>
      <View
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.centeredView}>
            <View style={{backgroundColor: 'rgba(0,0,0,0.8)', height: height}}>
              <View style={styles.modalView}>
                <Text style={styles.InputTitle}>Trip Reciept</Text>
                <View style={styles.details}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginBottom: 5,
                    }}>
                    <MaterialCommunityIcons
                      style={styles.RecieptIcon}
                      name="bus-side"
                      color="#2b208a"
                      size={22}
                    />
                    <Text style={styles.CompanyName}>Bus Number: </Text>
                    <Text style={styles.ReviewerName}>{TripDetails.busNo}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginBottom: 5,
                    }}>
                    <MaterialCommunityIcons
                      style={styles.RecieptIcon}
                      name="clock-time-five-outline"
                      color="#2b208a"
                      size={22}
                    />
                    <Text style={styles.CompanyName}>Step In : </Text>
                    <Text style={styles.ReviewerName}>
                      {TripDetails.timeIn}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginBottom: 5,
                    }}>
                    <MaterialCommunityIcons
                      style={styles.RecieptIcon}
                      style={styles.RecieptIcon}
                      name="clock-time-five"
                      color="#2b208a"
                      size={22}
                    />
                    <Text style={styles.CompanyName}>Step Out : </Text>
                    <Text style={styles.ReviewerName}>
                      {TripDetails.timeOut}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginBottom: 5,
                    }}>
                    <MaterialCommunityIcons
                      style={styles.RecieptIcon}
                      style={styles.RecieptIcon}
                      name="routes"
                      color="#2b208a"
                      size={22}
                    />
                    <Text style={styles.CompanyName}>Bus Route : </Text>
                    <Text style={styles.ReviewerName}>{TripDetails.route}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginBottom: 5,
                    }}>
                    <MaterialCommunityIcons
                      style={styles.RecieptIcon}
                      name="calendar"
                      color="#2b208a"
                      size={22}
                    />
                    <Text style={styles.CompanyName}>Date : </Text>
                    <Text style={styles.ReviewerName}>
                      {' '}
                      {TripDetails.date}{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginBottom: 5,
                    }}>
                    <MaterialCommunityIcons
                      style={styles.RecieptIcon}
                      name="counter"
                      color="#2b208a"
                      size={22}
                    />
                    <Text style={styles.CompanyName}>
                      Number of terminal :{' '}
                    </Text>
                    <Text style={styles.ReviewerName}>
                      {' '}
                      {TripDetails.noOfTerminal}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginBottom: 5,
                    }}>
                    <MaterialIcons
                      style={styles.RecieptIcon}
                      name="attach-money"
                      color="#2b208a"
                      size={22}
                    />
                    <Text style={styles.CompanyName}>Total fair :</Text>
                    <Text style={styles.ReviewerName}>
                      LKR {TripDetails.totalFair}.00
                    </Text>
                  </View>
                </View>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.AddBtn}>
                  <View style={styles.AddReviewBtnContainer}>
                    <Text style={styles.AddReviewBtnText}>CLOSE </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
};

export default Reciept;
