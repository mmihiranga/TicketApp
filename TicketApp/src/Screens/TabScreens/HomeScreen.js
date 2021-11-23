import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import HomeBg from '../../assets/Image/homeBgWhite.jpg';
import Share from '../../assets/Image/shareEd.png';
import TransactionModal from '../Recharge/TransactionModal';
import TimeTable from '../../assets/Image/timeTable.png';
import Money from '../../assets/Image/recharge.png';
import userCard from '../../assets/Image/userCard.png';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../Auth/context';
import Reciept from '../Card/Reciept';
import moment from 'moment';
import api from '../../api';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Pressable,
  ImageBackground,
  ToastAndroid,
} from 'react-native';

const {width, height} = Dimensions.get('window');

function HomeScreen({navigation}) {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let currentDate = moment().format('DD/MM/YYYY');

  const {signOut} = React.useContext(AuthContext);
  const [userData, setUserData] = useState({fullName: 'User'});
  const [userDetails, setUserDetails] = useState([
    {cardDetails: {amount: '00.00'}},
  ]);
  const [active, setActive] = useState(false);
  const [tripID, settripID] = useState();
  const [noOFTerminal, setnoOFTerminal] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const [UID, setUID] = useState();
  const [Fare, setFare] = useState('00');
  let recharge = '';
  let amount = '00';

  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      const data = JSON.parse(result);
      setUserData(data);
    });
  }, []);

  useEffect(() => {
    if (userData.id) {
      api
        .get(`/user/${userData.id}`)
        .then(res => {
          console.log(res.data[0].cardDetails.amount);
          amount = res.data[0].cardDetails.amount;
          setUserDetails(res.data);
          setUID(res.data[0]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [userData, modalVisible]);

  const handleUserIn = () => {
    if (parseFloat(userDetails[0].cardDetails.amount) > 50) {
      const trip = {
        userID: userData.id,
        startTerminal: '2',
        busNo: 'LD-5489',
        route: 'Matara Colombo',
        timeIn: hours + ':' + minutes + ':' + seconds,
        timeOut: '-',
        noOfTerminal: 0,
        totalFair: 0.0,
        date: currentDate,
      };
      api
        .post('/trip/create/', trip)
        .then(function (response) {
          console.log(response.data);
          if (response.data.message) {
            console.log(response.data.message);
          }
          setActive(true);
          settripID(response.data._id);
          ToastAndroid.showWithGravityAndOffset(
            'You have stepped into the bus',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        })
        .catch(function (error) {
          console.log(error);
          console.log(user);
        });
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Please Recharge Your Account',

        ToastAndroid.LONG,

        ToastAndroid.BOTTOM,

        25,

        50,
      );
    }
  };
  const handleUserOut = () => {
    if (active == true) {
      const trip = {
        id: tripID,
        endTerminal: '6',
        timeOut: hours + ':' + minutes + ':' + seconds,
        noOfTerminal: noOFTerminal,
        totalFair: noOFTerminal * 10,
      };

      if (trip != null) {
        setFare(noOFTerminal * 10);
        api
          .put('/trip/update', trip)
          .then(function (response) {
            if (response.data.message) {
              console.log(response.data.message);
            }
            setModalVisible(true);
            setActive(false);
          })
          .catch(function (error) {
            console.log(error);
          });

        if (UID._id) {
          recharge = parseFloat(UID.cardDetails.amount) - parseFloat(Fare);
          const payment = {
            id: UID._id,
            cardDetails: {
              cardNo: UID.cardDetails.cardNo,
              amount: recharge,
              status: 'Active',
              expiryDate: UID.cardDetails.expiryDate,
              cardType: UID.cardDetails.cardType,
            },
          };

          api
            .put('/user/update', payment)
            .then(function (response) {
              if (response.data.message) {
                alert.info(response.data.message);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Please use your card first',

          ToastAndroid.LONG,

          ToastAndroid.BOTTOM,

          25,

          50,
        );
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#EEF2F8',
      }}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <Reciept
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        tripID={tripID}
      />
      <Image
        style={styles.imageHomeTop}
        source={{uri: 'https://www.linkpicture.com/q/homeBgWhite.jpg'}}
      />

      <View style={styles.UserDetailsView}>
        <Text style={styles.UserNameTxt}>
          Hey {userData.fullName.split(' ', 1)}{' '}
        </Text>
        <Ionicons style={styles.SettingIcon} name="settings-outline" />
      </View>

      <View style={styles.SummaryView}>
        <View style={styles.amountViewFlex}>
          <View>
            <Text style={styles.amountBottomTxt}> Active Balance</Text>
            <Text style={styles.amountTxt}>
              {' '}
              LKR : {userDetails[0].cardDetails.amount}.00
            </Text>
          </View>
          <View>
            <TransactionModal />
          </View>
        </View>

        <Text style={styles.amountHeaderTxt}>
          {' '}
          Here's Info as at {hours}:{minutes},Today
        </Text>
      </View>
      <Text style={styles.LableTxt}>Card Center</Text>
      <View style={styles.UserCardView}>
        <Image style={styles.userCardImage} source={userCard} />

        <View style={styles.userInputFlex}>
          {active ? (
            <View style={styles.userInputBtnActive}>
              <Feather style={styles.iconUserInputActive} name="user-check" />
            </View>
          ) : (
            <Pressable
              style={styles.userInputBtn}
              onPress={() => handleUserIn()}>
              <Feather style={styles.iconUserInputIN} name="user-plus" />
            </Pressable>
          )}
          <Pressable
            style={styles.userInputBtn}
            onPress={() => handleUserOut()}>
            <Feather style={styles.iconUserInputOUT} name="user-minus" />
          </Pressable>
        </View>
      </View>
      <Text style={styles.LableTxt}>Things You can Do</Text>

      <View style={styles.BottomBtnView}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.navigate('UserTimetableScreen')}>
          <View style={styles.TimeTblBtnContainer}>
            <Image style={styles.TimeTblBtnImage} source={TimeTable} />
            <Text style={styles.TimeTblBtnText}>Time Table</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.push('Recharge', {userID: UID})}>
          <View style={styles.RechargeBtnContainer}>
            <Image style={styles.RechargeBtnImage} source={Money} />
            <Text style={styles.RechargeBtnText}>Recharge</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.HomeBottomContainer}>
        <View style={styles.ViewHomeBottom}>
          <Text style={styles.shareTxtTitle}>Share with friends</Text>
          <Text style={styles.shareTxtDesc}>
            Help your friends fall in love with learning through ____’s!
          </Text>
        </View>
        <Image style={styles.imageHomeBottom} source={Share} />
      </View>
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  UserDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 45,
  },
  imageHomeTop: {
    position: 'absolute',
    width: width,
    height: 183,
  },
  UserNameTxt: {
    fontFamily: 'Dosis-Bold',
    fontSize: 25,
    color: '#2d3138',
    letterSpacing: 1,
    marginLeft: 15,
  },
  SettingIcon: {
    fontSize: 28,
    color: '#2d3138',
    marginRight: 20,
  },
  SummaryView: {
    width: width - 10,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  amountViewFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  amountTxt: {
    fontFamily: 'Dosis-Regular',
    fontSize: 25,
    color: '#2d3138',
    letterSpacing: 2,
    marginLeft: 25,
  },
  amountHeaderTxt: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#2d3138',
    opacity: 0.8,
    letterSpacing: 1,
    marginRight: 2,
    textAlign: 'right',
    marginTop: 14,
  },
  amountBottomTxt: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#2d3138',
    opacity: 0.6,
    letterSpacing: 1,
    marginLeft: 27,
  },
  HisButton: {
    width: 48,
    alignSelf: 'flex-end',
    height: 46,
    marginRight: 35,
    borderRadius: 100,
    backgroundColor: '#F7F9FC',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.6,
    elevation: 10,
    marginTop: 5,
  },
  HisIcon: {
    color: '#2870fc',
    fontSize: 32,
    opacity: 0.8,
  },
  LableTxt: {
    marginLeft: 10,
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#222B45',
    marginBottom: 12,
  },
  UserCardView: {
    width: width - 30,
    height: 180,
    backgroundColor: '#2C2749',
    alignSelf: 'center',
    borderRadius: 12,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    elevation: 5,
    shadowColor: 'black',
    shadowRadius: 10,
    marginBottom: 22,
  },
  userInputFlex: {
    width: width - 30,
    height: 180,
    borderRadius: 12,
    backgroundColor: 'transparent',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  userInputBtn: {
    width: 55,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: 'black',
    shadowRadius: 10,
  },
  iconUserInputIN: {
    textAlign: 'center',
    fontSize: 27,
    color: 'blue',
  },
  iconUserInputOUT: {
    textAlign: 'center',
    fontSize: 27,
    color: 'red',
  },
  userInputBtnActive: {
    width: 55,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#696969',
    marginBottom: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: 'black',
    shadowRadius: 10,
  },
  iconUserInputActive: {
    textAlign: 'center',
    fontSize: 27,
    color: '#0dd606',
  },
  userCardImage: {
    width: width - 30,
    height: 180,
    borderRadius: 12,
  },
  BottomBtnView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  RechargeBtnContainer: {
    width: 170,
    height: 85,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#f5f9ff',
    borderColor: '#f5f9ff',
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
  RechargeBtnText: {
    color: '#F6F6F9',
    fontFamily: 'Raleway-Bold',
    fontSize: 17,
    textAlign: 'center',
    paddingLeft: 6,
    color: '#000',
  },
  RechargeBtnIcon: {
    fontSize: 33,
    color: '#2870fc',
  },
  RechargeBtnImage: {
    width: 45,
    height: 50,
  },

  TimeTblBtnContainer: {
    width: 170,
    height: 85,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#f5f9ff',
    borderColor: '#f5f9ff',
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
  TimeTblBtnText: {
    color: '#F6F6F9',
    fontFamily: 'Raleway-Bold',
    fontSize: 17,
    textAlign: 'center',
    paddingLeft: 6,
    color: 'black',
  },

  TimeTblBtnImage: {
    width: 55,
    height: 53,
  },
  HomeBottomContainer: {
    height: 150,
    padding: 15,
    marginTop: 10,
  },
  imageHomeBottom: {
    alignSelf: 'flex-end',
    position: 'absolute',
    height: 100,
    width: 178,
    right: 20,
    marginTop: 5,
  },
  ViewHomeBottom: {
    backgroundColor: '#D0EBFF',
    height: 100,
    borderRadius: 10,
    padding: 10,
  },
  shareTxtTitle: {
    marginTop: 6,
    marginLeft: 10,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  shareTxtDesc: {
    marginTop: 6,
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#8A96AD',
    width: 200,
    lineHeight: 18,
  },
});
