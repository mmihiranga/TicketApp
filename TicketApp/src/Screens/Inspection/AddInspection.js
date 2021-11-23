/* eslint-disable */
import React, {useState} from 'react';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {successImage} from './../../../assets/images/success.jpg';
import {Backdrop} from 'react-native-backdrop';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
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
    color: 'red',
  },
  input: {
    fontSize: 25,
  },
  inputMultiline: {
    display: 'flex',
    alignItems: 'flex-start',
    height: 100,
    marginLeft: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
  },
  label: {
    marginTop: 20,
    margin: 12,
    fontFamily: 'Raleway-Bold',
    fontSize: 22,
    fontWeight: 'normal',
  },
  baseText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 40,
    marginTop: 40,
    color: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  AddBtn: {
    width: 120,
    alignSelf: 'center',
    height: 52,
    marginRight: 20,
    marginTop: 20,
  },
  AddBtnContainer: {
    backgroundColor: '#5956E9',
    width: 120,
    height: 52,
    borderRadius: 10,
    margin: 8,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    elevation: 5,
  },
  AddBtnText: {
    color: '#fff',
    fontFamily: 'Raleway-Bold',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    paddingLeft: 6,
  },
  AddIcon: {
    fontSize: 33,
    color: '#fff',
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
    height: 500,
    margin: 20,
    marginTop: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
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
    marginBottom: 25,
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    fontWeight: '700',
    fontSize: 22,
  },
  AddReviewBtn: {
    width: 230,
    alignSelf: 'flex-end',
    height: 52,
    marginRight: 20,
  },
  AddReviewBtnContainer: {
    width: 150,
    height: 52,
    borderRadius: 10,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    elevation: 5,
  },
  AddReviewBtnText: {
    color: '#F6F6F9',
    fontFamily: 'Raleway-Bold',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
    paddingLeft: 6,
    color: '#343333',
  },
  FeedbackAddIcon: {
    fontSize: 33,
    color: '#343333',
  },
  TopImage: {
    height: 100,
    position: 'absolute',
    top: 100,
  },
  InputTitle: {
    fontFamily: 'Dosis-SemiBold',
    fontSize: 24,
    color: '#000000',
    marginLeft: 25,
    marginTop: 20,
    textAlign: 'left',
    position: 'absolute',
    left: 100,
    top: 10,
  },
  AddReviewBtnContainer: {
    width: 330,
    height: 52,
    borderRadius: 10,
    margin: 8,
    backgroundColor: '#005CEE',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    elevation: 5,
  },
  AddReviewBtnText: {
    color: '#fff',
    fontFamily: 'Raleway-Semibold',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: 6,
    marginLeft: 5,
  },
  AddBtn: {
    alignSelf: 'center',
    height: 52,
    marginTop: 20,
    marginBottom: 32,
  },
});

const AddInspection = ({navigation, setModalVisible, modalVisible}) => {
  const [passengerCount, onChangePassengerCount] = useState(null);
  const [route, onChangeRoute] = useState(null);
  const [busNo, onChangeBusNo] = useState(null);
  const [remarks, onChangeRemarks] = useState(null);

  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };
  const backgroundStyle = {
    backgroundColor: '#5956E9',
  };

  const handleSubmit = () => {
    let paidCount = 5;

    const inspections = {
      passengerCount: passengerCount,
      paidPCount: 5,
      unpaidPCount: passengerCount - 5,
      busNo: busNo,
      route: route,
      remarks: remarks,
    };
    console.log(inspections);

    api
      .post('/inspections/create/', inspections)
      .then(function (response) {
        console.log(response.data);
        if (response.data.message) {
          alert.info(response.data.message);
        }
        ToastAndroid.showWithGravityAndOffset(
          'Succesfully Added',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        setModalVisible(!modalVisible);
        onChangePassengerCount(null);
        onChangeRoute(null);
        onChangeBusNo(null);
        onChangeRemarks(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {passengerCount, route, busNo, remarks},
    });

  const _onPressButton = () => {
    if (!passengerCount || !route || !busNo || !remarks)
      ToastAndroid.showWithGravityAndOffset(
        'Please fill all the fields',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    validate({
      passengerCount: {numbers: true},
      route: {minlength: 3},
      busNo: {minlength: 3},
      remarks: {minlength: 3},
    });
    handleSubmit();
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
                <Ionicons
                  style={{
                    fontSize: 30,
                    position: 'absolute',
                    top: 10,
                    right: 20,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}
                  name="close-circle-outline"
                />
                <Text style={styles.InputTitle}>Inspections</Text>
                <TextInput
                  label="Passenger Count"
                  value={passengerCount}
                  onChangeText={passengerCount =>
                    onChangePassengerCount(passengerCount)
                  }
                  mode="outlined"
                  style={{width: 350, marginTop: 35, fontSize: 20}}
                  left={<TextInput.Icon name="counter" />}
                />
                {isFieldInError('passengerCount') &&
                  getErrorsInField('passengerCount').map(errorMessage => (
                    <Text style={styles.errorMsg}>
                      Please enter a valid Passenger Count
                    </Text>
                  ))}
                <TextInput
                  label="Route"
                  value={route}
                  onChangeText={route => onChangeRoute(route)}
                  mode="outlined"
                  style={{width: 350, marginTop: 10, fontSize: 20}}
                  left={<TextInput.Icon name="routes" />}
                />
                {isFieldInError('route') &&
                  getErrorsInField('route').map(errorMessage => (
                    <Text style={styles.errorMsg}>
                      Please enter a valid route
                    </Text>
                  ))}
                <TextInput
                  label="Bus No"
                  value={busNo}
                  onChangeText={busNo => onChangeBusNo(busNo)}
                  mode="outlined"
                  style={{width: 350, marginTop: 10, fontSize: 20}}
                  left={<TextInput.Icon name="bus" />}
                />
                {isFieldInError('busNo') &&
                  getErrorsInField('busNo').map(errorMessage => (
                    <Text style={styles.errorMsg}>
                      Please enter a valid bus No
                    </Text>
                  ))}
                <TextInput
                  label="Remarks"
                  value={remarks}
                  onChangeText={remarks => onChangeRemarks(remarks)}
                  mode="outlined"
                  style={{width: 350, marginTop: 10, fontSize: 20}}
                  multiline={true}
                  left={<TextInput.Icon name="card-text" />}
                />
                {isFieldInError('remarks') &&
                  getErrorsInField('remarks').map(errorMessage => (
                    <Text style={styles.errorMsg}>
                      Please enter a valid Text
                    </Text>
                  ))}

                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => _onPressButton()}
                  style={styles.AddBtn}>
                  <View style={styles.AddReviewBtnContainer}>
                    <Text style={styles.AddReviewBtnText}>Add Details</Text>
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

export default AddInspection;
