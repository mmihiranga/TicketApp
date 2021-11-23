import React, {useState, useEffect, useRef} from 'react';
import {useKeyboard} from '@react-native-community/hooks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../../api';
import Master from '../../assets/Image/Mastercard.png';
import Visa from '../../assets/Image/Visa.png';
import applePay from '../../assets/Image/applePay.png';
import googlePay from '../../assets/Image/googlePay.png';
import bitcoin from '../../assets/Image/bitcoinCash.png';
import payPal from '../../assets/Image/payPal.png';

import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
  Dimensions,
  TextInput,
  StatusBar,
  Pressable,
  ToastAndroid,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const CardRecharge = ({route, navigation}) => {
  const response = route.params.userID;
  // const user  =( JSON.parse(response));

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const [text, onChangeText] = React.useState('');
  const [ExDate, SetExDate] = React.useState('');
  const [CVV, SetCVV] = React.useState('');
  const [cardNumber, setcardNumber] = useState();
  const [cardName, setcardName] = useState();
  const [amount, setAmount] = useState();
  let recharge = '';

  // useEffect(() => {

  //     if(id){
  //         api.get(`/user/${type.id}`)
  //         .then(res => {
  //             setUserDetails(res.data)
  //         })
  //         .catch(err => {
  //             console.log(err)
  //         });

  //     }
  // }, [])

  const handlingSubmit = () => {
    if (!amount) {
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter Amount',

        ToastAndroid.LONG,

        ToastAndroid.BOTTOM,

        25,

        50,
      );
    } else {
      recharge = parseFloat(response.cardDetails.amount) + parseFloat(amount);
      if (response._id) {
        const payment = {
          id: response._id,
          cardDetails: {
            cardNo: response.cardDetails.cardNo,
            amount: recharge,
            status: 'Active',
            expiryDate: response.cardDetails.expiryDate,
            cardType: response.cardDetails.cardType,
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

      navigation.navigate('PaySuccess', {result: cardName});
    }
  };

  const handlingName = name => {
    setcardName(name);
  };
  const handlingCardNumber = number => {
    setcardNumber(
      number
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim(),
    );
  };

  return (
    <View style={{backgroundColor: '#FFFFFF', height: height, marginTop: 30}}>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <ScrollView>
          <View style={styles.InputTitleFlex}>
            <Pressable onPress={() => navigation.navigate('Homepage')}>
              <MaterialIcons style={styles.backIcon} name="arrow-back-ios" />
            </Pressable>
            <Text style={styles.InputTitle}>Recharge Center</Text>
          </View>
          <Text style={styles.InputLable}>Accepted cards</Text>
          <View style={styles.cardAcceptedView}>
            <Image style={styles.cardAccepted} source={Master} />
            <Image style={styles.cardAccepted} source={Visa} />
          </View>
          <SafeAreaView>
            <TextInput
              style={styles.cardInput}
              value={cardName}
              onChangeText={name => handlingName(name)}
              placeholder="Name on card"
            />

            <TextInput
              style={styles.cardInput}
              onChangeText={no => handlingCardNumber(no)}
              value={cardNumber}
              placeholder="Card number"
            />

            <View style={styles.cardInputFlex}>
              <View>
                <TextInput
                  style={styles.cardInputHalf}
                  onChangeText={onChangeText}
                  placeholder="Expiry date"
                />
              </View>
              <View>
                <TextInput
                  style={styles.cardInputHalf}
                  onChangeText={onChangeText}
                  placeholder="CVV"
                />
              </View>
            </View>
            <Text style={styles.amountLbl}>Recharge amount</Text>
            <TextInput
              style={styles.cardInput}
              onChangeText={setAmount}
              placeholder="Amount"
            />
            <Text style={styles.paymentMethodLbl}>Other payment method</Text>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentMethodImg} source={applePay} />
              <Image style={styles.paymentMethodImg} source={googlePay} />
              <Image style={styles.paymentMethodImg} source={bitcoin} />
              <Image style={styles.paymentMethodImg} source={payPal} />
            </View>
          </SafeAreaView>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => handlingSubmit()}>
            <View style={styles.PaymentBtnContainer}>
              <Text style={styles.PaymentBtnText}>Pay Now</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default CardRecharge;

const styles = StyleSheet.create({
  cardAcceptedView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 18,
    elevation: 3,
  },
  cardAccepted: {
    marginVertical: 5,
    marginHorizontal: 6,
    marginBottom: 5,
    width: 50,
    height: 35,
  },
  PaymentBtnContainer: {
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
    marginTop: 40,
  },
  PaymentBtnText: {
    color: '#F6F6F9',
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: 6,
    color: '#FFFFFF',
  },
  InputTitle: {
    fontFamily: 'Dosis-Bold',
    fontSize: 25,
    color: '#424347',
    marginLeft: 5,
  },
  InputTitleFlex: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 18,
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#424347',
  },
  InputLable: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 24,
    fontFamily: 'Roboto-Regular',
    color: '#666666',
  },
  cardInput: {
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
  cardInputFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  cardInputHalf: {
    height: 55,
    width: width - 227,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#F2F2F2',
    padding: 10,
    backgroundColor: '#F2F2F2',
    marginBottom: 12,
    color: '#1A1A1A',
    fontSize: 17,
    fontFamily: 'Raleway-Medium',
    marginRight: 6,
    marginLeft: 6,
  },
  amountLbl: {
    fontSize: 17,
    textAlign: 'left',
    marginLeft: 24,
    fontFamily: 'Roboto-Regular',
    color: '#1A1A1A',
    marginTop: 8,
  },

  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
  },
  paymentMethodImg: {
    width: 75,
    height: 43,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 8,
  },
  paymentMethodLbl: {
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 26,
    fontFamily: 'Roboto-Regular',
    color: '#666666',
    marginTop: 8,
    marginBottom: 4,
  },
});
