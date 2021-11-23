import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-datepicker';
import Avatar from '../../assets/Image/avatar1.png';
import AsyncStorage from '@react-native-community/async-storage';
import CardCenter from '../Card/CardCenter';
import api from '../../api';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  StatusBar,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

const {width, height} = Dimensions.get('window');

function CardScreen({navigation}) {
  const [text, onChangeText] = React.useState('');
  const [date, setDate] = React.useState('');
  const [Tempdate, setTempdate] = React.useState('');
  const [rows, setRows] = useState('');
  const [type, setType] = useState(true);
  const [Identity, SetIdentity] = React.useState('');
  const [Address, SetAddress] = React.useState('');
  const [City, SetCity] = React.useState('');
  const [PCode, SetPcode] = React.useState('');
  const [TempIdentity, SetTempIdentity] = React.useState('');
  const [TempAddress, SetTempAddress] = React.useState('');
  const [userID, SetUserID] = React.useState();
  const [email, SetEmail] = React.useState('');
  const [name, SetName] = React.useState('');
  const [userData, setUserData] = useState();
  const [userDetails, setUserDetails] = useState();
  const [Iscard, setIsCard] = React.useState();
  const [toggle, setToggle] = React.useState(false);

  const now = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
  let year = new Date().getFullYear() + 1;
  const day = new Date().getDay();
  const month = new Date().getMonth() + 1;
  let card = '';

  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      const data = JSON.parse(result);
      setUserData(data);
      SetUserID(data.id);
    });
  }, []);

  useEffect(() => {
    if (userData != null) {
      api
        .get(`/user/${userData.id}`)
        .then(res => {
          setUserDetails(res.data[0]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [userData, toggle]);
  useEffect(() => {
    if (userDetails) {
      SetName(userDetails.fullName);
      SetEmail(userDetails.email);

      card = userDetails.cardDetails.cardNo;
      if (card) {
        setIsCard(false);
      } else {
        setIsCard(true);
      }
    }
  }, [userDetails]);

  const hadleLocalCardSubmit = () => {
    year++;
    if (userID) {
      const createLocalCard = {
        id: userID,
        nic: Identity,
        dob: date,
        address: Address,
        city: City,
        postalCode: PCode,
        cardDetails: {
          cardNo: now,
          amount: '00.00',
          expiryDate: day + '/' + month + '/' + year,
          status: 'Active',
          cardType: 'local',
        },
      };

      api
        .put('/user/update', createLocalCard)
        .then(function (response) {
          if (response.data.message) {
            alert.info(response.data.message);
          }
          setDate('');
          SetAddress('');
          SetIdentity('');
          SetCity('');
          SetPcode('');
          setToggle(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    navigation.push('Homepage');
  };

  const hadleTempCardSubmit = () => {
    year++;
    if (userID) {
      const createTempCard = {
        id: userID,
        nic: TempIdentity,
        dob: Tempdate,
        address: TempAddress,
        cardDetails: {
          cardNo: now,
          amount: '00.00',
          expiryDate: day + '/' + month + '/' + year,
          status: 'Active',
          cardType: 'Temp',
        },
      };

      api
        .put('/user/update', createTempCard)
        .then(function (response) {
          if (response.data.message) {
            alert.info(response.data.message);
          }
          setTempdate('');
          SetTempAddress('');
          SetTempIdentity('');
          setToggle(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    navigation.push('Homepage');
  };

  return (
    <View>
      {Iscard ? (
        <View
          style={{
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          <ScrollView>
            <Text style={styles.InputTitle}>Create your card</Text>
            <View style={styles.headerFlex}>
              <Image source={Avatar} style={styles.headerImage} />
              <View>
                <Text style={styles.headerName}>{name}</Text>
                <Text style={styles.headerEmail}>{email}</Text>
              </View>
            </View>

            <View style={styles.topBtnContainerFlex}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => setType(true)}
                style={
                  type
                    ? {borderBottomColor: '#005CEE', borderBottomWidth: 3}
                    : {borderBottomColor: '#fff', borderBottomWidth: 3}
                }>
                <View style={styles.topBtnContainer}>
                  {/* <Image style = {styles.cardCreateBtnImage} source = {TimeTable}/> */}
                  <Text style={styles.topBtnText}>Local card </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => setType(false)}
                style={
                  !type
                    ? {borderBottomColor: '#005CEE', borderBottomWidth: 3}
                    : {borderBottomColor: '#fff', borderBottomWidth: 3}
                }>
                <View style={styles.topBtnContainer}>
                  {/* <Image style = {styles.cardCreateBtnImage} source = {TimeTable}/> */}
                  <Text style={styles.topBtnText}>Temporary card</Text>
                </View>
              </TouchableHighlight>
            </View>

            {type ? (
              <View>
                <TextInput
                  placeholder="NIC/Passport"
                  value={Identity}
                  onChangeText={SetIdentity}
                  style={styles.cardCreateInput}
                />

                <DatePicker
                  style={styles.datePicker}
                  placeholder="Date of birth"
                  date={date}
                  mode="date"
                  format="YYYY-MM-DD"
                  showIcon={false}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: '#F2F2F2',
                      backgroundColor: '#F2F2F2',
                      fontSize: 17,
                      fontFamily: 'Raleway-Medium',
                      alignItems: 'flex-start',
                      height: 55,
                      padding: 10,
                    },
                    placeholderText: {
                      fontSize: 17,
                      fontFamily: 'Raleway-Medium',
                      color: '#999999',
                    },
                    dateText: {
                      color: '#1A1A1A',
                      fontSize: 17,
                      fontFamily: 'Raleway-Medium',
                    },
                  }}
                  onDateChange={date => {
                    setDate(date);
                  }}
                />

                <TextInput
                  placeholder="Address"
                  value={Address}
                  onChangeText={SetAddress}
                  style={styles.cardCreateInput}
                />
                <TextInput
                  placeholder="City"
                  value={City}
                  onChangeText={SetCity}
                  style={styles.cardCreateInput}
                />
                <TextInput
                  placeholder="Postal code"
                  value={PCode}
                  onChangeText={SetPcode}
                  style={styles.cardCreateInput}
                />

                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => hadleLocalCardSubmit()}>
                  <View style={styles.cardCreateBtnContainer}>
                    {/* <Image style = {styles.cardCreateBtnImage} source = {TimeTable}/> */}
                    <Text style={styles.cardCreateBtnText}>Create </Text>
                  </View>
                </TouchableHighlight>
              </View>
            ) : (
              <View>
                <TextInput
                  placeholder="NIC/Passport"
                  value={TempIdentity}
                  onChangeText={SetTempIdentity}
                  style={styles.cardCreateInput}
                />

                <DatePicker
                  style={styles.datePicker}
                  placeholder="Date of birth"
                  date={Tempdate}
                  mode="date"
                  format="YYYY-MM-DD"
                  showIcon={false}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: '#F2F2F2',
                      backgroundColor: '#F2F2F2',
                      fontSize: 17,
                      fontFamily: 'Raleway-Medium',
                      alignItems: 'flex-start',
                      height: 55,
                      padding: 10,
                    },
                    placeholderText: {
                      fontSize: 17,
                      fontFamily: 'Raleway-Medium',
                      color: '#999999',
                    },
                    dateText: {
                      color: '#1A1A1A',
                      fontSize: 17,
                      fontFamily: 'Raleway-Medium',
                    },
                  }}
                  onDateChange={date => {
                    setTempdate(date);
                  }}
                />

                <TextInput
                  placeholder="Address"
                  value={TempAddress}
                  onChangeText={SetTempAddress}
                  style={styles.cardCreateInput}
                />

                <Text style={styles.temporaryText}>
                  Temporary cards are expired in two week{' '}
                </Text>

                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => hadleTempCardSubmit()}>
                  <View style={styles.cardCreateBtnContainer}>
                    {/* <Image style = {styles.cardCreateBtnImage} source = {TimeTable}/> */}
                    <Text style={styles.cardCreateBtnText}>Create </Text>
                  </View>
                </TouchableHighlight>
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <CardCenter />
      )}
    </View>
  );
}
export default CardScreen;

const styles = StyleSheet.create({
  InputTitle: {
    fontFamily: 'Dosis-SemiBold',
    fontSize: 24,
    color: '#000000',
    marginLeft: 25,
    marginTop: 20,
    textAlign: 'left',
  },
  headerFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  headerImage: {
    width: 65,
    height: 65,
    borderRadius: 100,
  },
  headerName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 21,
    color: '#000000',
    marginLeft: 15,
    textAlign: 'left',
  },
  headerEmail: {
    fontFamily: 'Raleway-Medium',
    fontSize: 15,
    color: '#000000',
    marginLeft: 15,
    textAlign: 'left',
  },

  cardCreateInput: {
    height: 55,
    width: width - 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#F2F2F2',
    padding: 10,
    backgroundColor: '#F2F2F2',
    marginBottom: 12,
    color: '#1A1A1A',
    fontSize: 17,
    fontFamily: 'Raleway-Medium',
    alignSelf: 'center',
    marginTop: 5,
  },
  datePicker: {
    height: 55,
    width: width - 50,
    marginBottom: 5,
    marginTop: 12,
    alignSelf: 'center',
  },
  topBtnContainerFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    elevation: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: 0,
    marginTop: 15,
    marginBottom: 10,
  },
  topBtnContainer: {
    width: width / 2,
    height: 63,
    backgroundColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',
  },
  topBtnText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 17,
    textAlign: 'center',
    paddingLeft: 6,
    color: '#000000',
  },
  cardCreateBtnContainer: {
    width: 300,
    height: 60,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#005CEE',
    borderColor: '#005CEE',
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#005CEE',
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    elevation: 5,
    marginTop: 18,
    // marginBottom:370
  },
  cardCreateBtnText: {
    color: '#F6F6F9',
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: 6,
    color: '#FFFFFF',
  },
  temporaryText: {
    color: '#f53d3d',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
});
