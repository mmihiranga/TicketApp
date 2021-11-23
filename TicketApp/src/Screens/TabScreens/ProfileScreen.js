import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-datepicker';
import Avatar from '../../assets/Image/avatar1.png';
import api from '../../api';
import {AuthContext} from '../Auth/context';
import AsyncStorage from '@react-native-community/async-storage';
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

function ProfileScreen({navigation}) {
  const [text, onChangeText] = React.useState('');
  const [date, setDate] = React.useState('');
  const [rows, setRows] = useState('');
  const [type, setType] = useState(true);
  const {signOut} = React.useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [userDetails, setUserDetails] = useState([
    {email: '-', fullName: '-', mobileNumber: '-', city: '-', dob: '-'},
  ]);

  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      const data = JSON.parse(result);
      setUserData(data);
    });
  }, []);

  useEffect(() => {
    if (userData) {
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
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginTop: 20,
      }}>
      <View>
        <Text style={styles.InputTitle}>Account Details</Text>
        <View style={styles.headerFlex}>
          <Image source={Avatar} style={styles.headerImage} />
          <View>
            <Text style={styles.headerName}>{userDetails[0].fullName}</Text>
            <Text style={styles.headerEmail}>
              @{userDetails[0].fullName.toLowerCase()}
            </Text>
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
              <Text style={styles.topBtnText}>Profile </Text>
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
              <Text style={styles.topBtnText}>Settings</Text>
            </View>
          </TouchableHighlight>
        </View>

        {type ? (
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
            <View>
              <Text style={styles.labelTitle}>Personal Information</Text>

              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>Full Name</Text>
                <Text style={styles.labelText}>{userDetails[0].fullName}</Text>
              </View>
              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>E-mail</Text>
                <Text style={styles.labelText}>{userDetails[0].email}</Text>
              </View>
              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>Phone Number</Text>
                <Text style={styles.labelText}>
                  {userDetails[0].mobileNumber}
                </Text>
              </View>
              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>City</Text>
                <Text style={styles.labelText}>
                  {userDetails[0].city ? userDetails[0].city : '-'}
                </Text>
              </View>
              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>Date of Birth</Text>
                <Text style={styles.labelText}>
                  {userDetails[0].dob ? userDetails[0].dob : '-'}
                </Text>
              </View>
              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                  signOut();
                }}>
                <View style={styles.cardCreateBtnContainer}>
                  {/* <Image style = {styles.cardCreateBtnImage} source = {TimeTable}/> */}
                  <Text style={styles.cardCreateBtnText}>Log out </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: 100,
                padding: 20,
                marginTop: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </ScrollView>
        ) : (
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
            <View>
              <Text style={styles.labelTitle}>App Information</Text>

              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>App Version</Text>
                <Text style={styles.labelText}>1.0.0</Text>
              </View>
              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>Privacy Policy</Text>
                <Text style={styles.labelText}>Available</Text>
              </View>
              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>License</Text>
                <Text style={styles.labelText}>NIR-89556</Text>
              </View>
              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>App By</Text>
                <Text style={styles.labelText}>CODE 365</Text>
              </View>
              <View
                style={{
                  borderColor: '#b1b1b1',
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                }}></View>

              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => navigation.navigate('cardCenter')}>
                <View style={styles.cardCreateBtnContainer}>
                  {/* <Image style = {styles.cardCreateBtnImage} source = {TimeTable}/> */}
                  <Text style={styles.cardCreateBtnText}>Give Feedback </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: 140,
                padding: 20,
                marginTop: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
export default ProfileScreen;

const styles = StyleSheet.create({
  labelTitle: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 14,
    color: '#7f7f7f',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  label: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    color: '#606060',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  labelText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    color: '#383838',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 15,
    textAlign: 'left',
    alignSelf: 'flex-end',
  },
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
