import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';

import Ant from 'react-native-vector-icons/AntDesign';
import {Hoshi} from 'react-native-textinput-effects';
// import { Kohana } from 'react-native-textinput-effects';
import bcrypt from 'react-native-bcrypt';
import api from '../../api';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-date-picker';
import {useTheme} from 'react-native-paper';
import {AuthContext} from './context';

import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
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
import SpinnerLoad from '../Common/spinnerLoad';

import {useValidation} from 'react-native-form-validator';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginLeft: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
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
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
    fontWeight: 'normal',
  },
  baseText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 40,
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
    alignSelf: 'center',
    height: 52,
    marginTop: 20,
    marginBottom: 32,
  },
  signupBtn: {
    alignSelf: 'center',
    height: 52,
    marginTop: 20,
    marginBottom: 50,
  },
  AddBtnContainer: {
    width: 0,
    height: 52,
    borderRadius: 10,
    margin: 8,
    borderColor: '#000',
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
    height: 200,
    margin: 20,
    marginTop: 220,
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
  AddSignUpBtnContainer: {
    width: 330,
    height: 52,
    borderColor: '#747474',
    borderWidth: 1,
    borderRadius: 10,
    margin: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  AddSignUpBtnText: {
    color: '#000',
    fontFamily: 'Raleway-Semibold',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: 6,
  },
  FeedbackAddIcon: {
    fontSize: 33,
    color: '#fff',
  },
  SignupBtnIcon: {
    fontSize: 33,
    color: '#000',
  },
  TopImage: {
    height: 100,
    position: 'absolute',
    top: 100,
  },
  errorMsg: {
    fontFamily: 'Raleway-Semibold',
    color: 'red',
  },
});

const LogIn = ({navigation}) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = React.useContext(AuthContext);

  const handleLogin = () => {
    setIsLoading(true);

    const user = {
      email: email,
      password: password,
    };

    api.post('/user/validate', user).then(res => {
      if (res.data) {
        let hashPass = res.data.password;
        const isValid = bcrypt.compareSync(password, hashPass);
        if (isValid) {
          const token = {
            id: res.data._id,
            fullName: res.data.fullName,
            email: res.data.email,
            mobileNumber: res.data.mobileNumber,
            type: res.data.type,
          };
          signIn(token);
          console.log('Login.');
          setIsLoading(false);
        } else {
          console.log('pass');
          setIsLoading(false);
        }
      } else {
        console.log('email', isValid);
        setIsLoading(false);
      }
    });
  };

  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {email, password},
    });

  const _onPressButton = () => {
    if (!email || !password)
      ToastAndroid.showWithGravityAndOffset(
        'Please fill all the fields',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    validate({
      email: {email: true},
    });
    handleLogin();
  };

  const backgroundStyle = {
    backgroundColor: '#005CEE',
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar backgroundColor={'#005CEE'} barStyle={'dark-content'} />

      <View
        style={{
          flexDirection: 'row',
          height: 160,
          padding: 20,
          marginTop: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={{
            uri: 'https://www.linkpicture.com/q/MicrosoftTeams-image-542.png',
          }}
          style={{position: 'absolute', top: 0, height: 180, width: 400}}
          imageStyle={{}}></ImageBackground>
        <Text style={styles.baseText}>Login</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        style={{
          backgroundColor: '#fff',
          padding: 20,
          marginTop: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Ionicons
            style={{marginTop: 1, marginRight: 7}}
            size={28}
            name="mail-outline"
          />
          <Text style={styles.label}>E-mail</Text>
        </View>
        <Hoshi
          type
          borderColor={'#005CEE'}
          style={{marginTop: 0}}
          borderHeight={2}
          inputPadding={0}
          value={email}
          onChangeText={setEmail}
        />
        {isFieldInError('email') &&
          getErrorsInField('email').map(errorMessage => (
            <Text style={styles.errorMsg}>
              Please enter a valid e-mail address
            </Text>
          ))}
        <View style={{flexDirection: 'row', marginTop: 35}}>
          <MaterialCI
            style={{marginTop: 1, marginRight: 7}}
            size={28}
            name="onepassword"
          />
          <Text style={styles.label}>Password</Text>
        </View>
        <Hoshi
          type
          borderColor={'#005CEE'}
          style={{marginTop: 0}}
          borderHeight={2}
          inputPadding={0}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => _onPressButton()}
          style={styles.AddBtn}>
          <View style={styles.AddReviewBtnContainer}>
            <Ant style={styles.FeedbackAddIcon} name="login" />
            <Text style={styles.AddReviewBtnText}>Login</Text>
          </View>
        </TouchableHighlight>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: '#7a7a7a'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center'}}>OR</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#7a7a7a'}} />
        </View>

        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.navigate('SignUp')}
          style={styles.signupBtn}>
          <View style={styles.AddSignUpBtnContainer}>
            <Ant style={styles.SignupBtnIcon} name="adduser" />
            <Text style={styles.AddSignUpBtnText}>Sign Up</Text>
          </View>
        </TouchableHighlight>
        {IsLoading ? (
          <SpinnerLoad />
        ) : (
          <ImageBackground
            source={{
              uri: 'https://i.ibb.co/1TP2Lys/cherry-virtual-bank2.png',
            }}
            style={{position: 'absolute', bottom: 146, height: 150, width: 360}}
            imageStyle={{}}></ImageBackground>
        )}

        <View
          style={{
            flexDirection: 'row',
            height: 80,
            padding: 20,
            marginTop: 0,
            marginBottom: 150,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </ScrollView>
    </View>
  );
};

export default LogIn;
