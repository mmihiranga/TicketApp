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
import LinearGradient from 'react-native-linear-gradient';
import AddInspection from './AddInspection';
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

function InspectionHome({navigation}) {
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
  const [noOFTerminal, setnoOFTerminal] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);

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
          setUserDetails(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [userData]);

  return (
    <View
      style={{
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#EEF2F8',
      }}>
      <LinearGradient
        colors={['#79e3fe', '#635df8', '#42385D']}
        style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
      </LinearGradient>
      <AddInspection
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Image
        style={styles.imageHomeTop}
        source={{uri: 'https://www.linkpicture.com/q/Rectangle-87-1.png'}}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.UserDetailsView}>
          <Text style={styles.UserNameTxt}>
            Hey {userData.fullName.split(' ', 1)}{' '}
          </Text>
          <Feather
            style={styles.SettingIcon}
            name="log-out"
            onPress={() => signOut()}
          />
        </View>

        <Text style={styles.amountHeaderTxt}>
          {' '}
          Here's Info as at {hours}:{minutes},Today
        </Text>

        <Text style={styles.LableTxt}>Things You can Do</Text>
        <View style={styles.UserCardView}>
          <Image
            style={styles.userCardImage}
            source={{uri: 'https://www.linkpicture.com/q/Group-116.png'}}
          />
          <View style={styles.imageTxtView}>
            <Text style={styles.imageTitle}>Add Inspection</Text>
            <Text style={styles.imageDesc}>
              You can add your inspection from here
            </Text>
            <Pressable
              style={styles.imageBtn}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.imageBtnTxt}>Add</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.UserCardView}>
          <Image
            style={styles.userCardImage}
            source={{uri: 'https://www.linkpicture.com/q/Group_6.png'}}
          />
          <View style={styles.imageTxtViewTwo}>
            <Text style={styles.imageTitleTwo}>View Inspections</Text>
            <Text style={styles.imageDescTwo}>
              You can view all the inspections from here
            </Text>
            <Pressable
              style={styles.imageBtn}
              onPress={() => navigation.navigate('ViewInspectionsScreen')}>
              <Text style={styles.imageBtnTxt}>View</Text>
            </Pressable>
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate('TimetableScreen')}>
          <View style={styles.HomeBottomContainer}>
            <Image
              style={styles.imageHomeBottom}
              source={{uri: 'https://www.linkpicture.com/q/Nerd-amico_4.png'}}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
export default InspectionHome;

const styles = StyleSheet.create({
  bodyContainer: {
    height: height - 45,
    width: width,
  },
  UserDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageHomeTop: {
    position: 'absolute',
    width: width,
    height: 133,
  },
  UserNameTxt: {
    fontFamily: 'Dosis-Bold',
    fontSize: 25,
    color: '#fff',
    letterSpacing: 1,
    marginLeft: 15,
  },
  SettingIcon: {
    fontSize: 28,
    color: '#fff',
    marginRight: 20,
  },

  amountHeaderTxt: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
    letterSpacing: 1,
    marginRight: 2,
    textAlign: 'right',
    marginBottom: 20,
    marginTop: 35,
    marginRight: 8,
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
    marginBottom: 15,
  },

  userCardImage: {
    width: width - 30,
    height: 180,
    borderRadius: 12,
  },
  imageTxtViewTwo: {
    position: 'absolute',
    marginTop: 30,
    width: 200,
    alignSelf: 'flex-end',
  },
  imageTitleTwo: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    marginRight: 20,
  },
  imageDescTwo: {
    fontSize: 14,
    color: 'white',
    opacity: 0.6,
    marginTop: 6,
    marginRight: 20,
  },
  imageTxtView: {
    position: 'absolute',
    marginTop: 30,
    width: 200,
  },
  imageTitle: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    marginLeft: 25,
  },
  imageDesc: {
    fontSize: 14,
    color: 'white',
    opacity: 0.6,
    marginTop: 6,
    marginLeft: 25,
  },
  imageBtnTxt: {
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
  imageBtn: {
    width: 142,
    height: 44,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  HomeBottomContainer: {
    height: 150,
    width: width,
    marginTop: 5,
  },
  imageHomeBottom: {
    alignSelf: 'center',
    position: 'absolute',
    height: 186,
    width: width - 40,
    borderRadius: 12,
  },
});
