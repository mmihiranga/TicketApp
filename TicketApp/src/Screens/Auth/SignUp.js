/* eslint-disable */
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {Hoshi} from 'react-native-textinput-effects';
import Ant from 'react-native-vector-icons/AntDesign';
import bcrypt from 'react-native-bcrypt';
import api from '../../api';
import DatePicker from 'react-native-date-picker';
import {useValidation} from 'react-native-form-validator';
import {
  Dimensions,
  Alert,
  Modal,
  Pressable,
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
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';

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
    marginLeft: 8,
    paddingLeft: 6,
  },
  FeedbackAddIcon: {
    fontSize: 33,
    color: '#fff',
  },
  SignupBtnIcon: {
    fontSize: 33,
    color: '#fff',
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

  AddReviewBtnText: {
    color: '#fff',
    fontFamily: 'Raleway-Semibold',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: 6,
  },
  errorMsg: {
    fontFamily: 'Raleway-Semibold',
    color: 'red',
  },
  FeedbackAddIcon: {
    fontSize: 33,
    color: '#000',
  },
  TopImage: {
    height: 100,
    position: 'absolute',
    top: 100,
  },
});

const SignUp = ({navigation}) => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const user = {
      fullName: fullName,
      email: email,
      mobileNumber: phone,
      password: password,
      type: 'user',
      cardDetails: {
        amount: '00',
      },
    };
    console.log(user);
    setPassword(bcrypt.hashSync(user.password, bcrypt.genSaltSync()));

    api
      .post('/user/create/', user)
      .then(function (response) {
        console.log(response.data);
        if (response.data.message) {
          alert.info(response.data.message);
        }
        navigation.navigate('LogIn');
      })
      .catch(function (error) {
        console.log(error);
        console.log(user);
      });
  };

  const {validate, isFieldInError, getErrorsInField, getErrorMessages} =
    useValidation({
      state: {fullName, email, phone, password},
    });

  const _onPressButton = () => {
    if (!fullName || !email || !phone || !password)
      ToastAndroid.showWithGravityAndOffset(
        'Please fill all the fields',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    validate({
      fullName: {minlength: 3},
      email: {email: true},
      phone: {numbers: true},
      password: {minlength: 6, hasSpecialCharacter: true, hasNumber: true},
    });
    handleSubmit();
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
          height: 180,
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
        <Text style={styles.baseText}>Welcome</Text>
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
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            style={{marginTop: 1, marginRight: 7}}
            size={28}
            name="user-o"
          />
          <Text style={styles.label}>Full Name</Text>
        </View>
        <Hoshi
          borderColor={'#005CEE'}
          style={{marginTop: 0}}
          borderHeight={2}
          inputPadding={0}
          inputStyle={{borderColor: '#005CEE'}}
          value={fullName}
          onChangeText={setFullName}
        />
        {isFieldInError('fullName') &&
          getErrorsInField('fullName').map(errorMessage => (
            <Text style={styles.errorMsg}>Please enter a valid Name</Text>
          ))}
        <View style={{flexDirection: 'row', marginTop: 35}}>
          <Icon style={{marginTop: 1, marginRight: 7}} size={28} name="phone" />
          <Text style={styles.label}>Phone Number</Text>
        </View>

        <Hoshi
          borderColor={'#005CEE'}
          style={{marginTop: 0}}
          borderHeight={2}
          inputPadding={0}
          value={phone}
          onChangeText={setPhone}
        />
        {isFieldInError('phone') &&
          getErrorsInField('phone').map(errorMessage => (
            <Text style={styles.errorMsg}>
              Please enter a valid phone number
            </Text>
          ))}

        <View style={{flexDirection: 'row', marginTop: 35}}>
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
        {isFieldInError('password') &&
          getErrorsInField('password').map(errorMessage => (
            <Text style={styles.errorMsg}>{errorMessage}</Text>
          ))}

        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => _onPressButton()}
          style={styles.AddBtn}>
          <View style={styles.AddReviewBtnContainer}>
            <Ant style={styles.SignupBtnIcon} name="adduser" />
            <Text style={styles.AddReviewBtnText}>Sign Up</Text>
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
          onPress={() => navigation.navigate('LogIn')}
          style={styles.signupBtn}>
          <View style={styles.AddSignUpBtnContainer}>
            <Ant style={styles.FeedbackAddIcon} name="login" />
            <Text style={styles.AddSignUpBtnText}>Login</Text>
          </View>
        </TouchableHighlight>

        <ImageBackground
          source={{
            uri: 'https://i.ibb.co/s9KK8w2/clip-remote-work.png',
          }}
          style={{position: 'absolute', bottom: 203, height: 150, width: 350}}
          imageStyle={{}}></ImageBackground>

        <View
          style={{
            flexDirection: 'row',
            height: 350,
            padding: 20,
            marginTop: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
