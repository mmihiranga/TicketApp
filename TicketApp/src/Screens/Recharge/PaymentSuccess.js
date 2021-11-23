import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PayError from '../../assets/Image/paymentError.png';
import PaySucces from '../../assets/Image/paymentSuccess.png';
import applePay from '../../assets/Image/applePay.png';
import googlePay from '../../assets/Image/googlePay.png';
import bitcoin from '../../assets/Image/bitcoinCash.png';
import payPal from '../../assets/Image/payPal.png';

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const PaymentSuccess = ({route, navigation}) => {
  const re = route.params.result;
  const res = JSON.stringify(re);

  return (
    <View style={styles.mainContainer}>
      {res != '"fail"' ? (
        <View style={styles.bodyContainer}>
          <Image style={styles.image} source={PaySucces} />
          <Text style={styles.mainTxt}>
            Payment successfully completed {res}
          </Text>
          <Pressable
            style={styles.backFlex}
            onPress={() => navigation.push('Homepage')}>
            <MaterialIcons style={styles.backIcon} name="arrow-back-ios" />
            <Text style={styles.backTxt}>Go back to the Home</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.bodyContainer}>
          <Image style={styles.image} source={PayError} />
          <Text style={styles.mainTxt}> Payment failed {res} </Text>
          <Text style={styles.bodyTxt}>Something wrong</Text>
          <Pressable
            style={styles.backFlex}
            onPress={() => navigation.navigate('Recharge')}>
            <MaterialIcons style={styles.backIcon} name="arrow-back-ios" />
            <Text style={styles.backTxt}>Try again</Text>
          </Pressable>

          <View
            style={{
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 1,
              width: width - 40,
              marginTop: 30,
            }}
          />

          <View style={{alignItems: 'center'}}>
            <Text style={styles.paymentMethodLbl}>
              Or pay by another method
            </Text>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentMethodImg} source={applePay} />
              <Image style={styles.paymentMethodImg} source={googlePay} />
              <Image style={styles.paymentMethodImg} source={bitcoin} />
              <Image style={styles.paymentMethodImg} source={payPal} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
    backgroundColor: '#FFFFFF',
  },
  bodyContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: 272,
    marginTop: 235,
  },
  mainTxt: {
    fontFamily: 'Roboto-Medium',
    fontSize: 25,
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: 0.5,
    marginTop: 15,
  },
  backTxt: {
    color: '#007AFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    marginLeft: 4,
  },
  backFlex: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  backIcon: {
    color: '#007AFF',
    fontSize: 18,
  },
  bodyTxt: {
    color: '#4D4D4D',
    fontFamily: 'Roboto-Regular',
    marginTop: 5,
    fontSize: 17,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  paymentMethodImg: {
    width: 80,
    height: 43,
    marginRight: 4,
    marginLeft: 4,
    marginTop: 5,
    borderRadius: 8,
  },
  paymentMethodLbl: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: '#666666',
    marginTop: 30,
    marginBottom: 4,
  },
});
