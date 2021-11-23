import React, {useState, useEffect} from 'react';
import card from '../../assets/Image/userCard.png';
import Apply from '../../assets/Image/applyCard.png';
import Block from '../../assets/Image/blockCard.png';
import Remove from '../../assets/Image/deleteCard.png';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-community/async-storage';
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
} from 'react-native';

const {width, height} = Dimensions.get('window');

function CardCenter({navigation}) {
  const [id, setID] = React.useState();
  const [cardDetails, setCardDetails] = React.useState({
    amount: '00.00',
    cardNo: '-',
    status: '-',
    cardType: '-',
    expiryDate: '-',
  });

  useEffect(() => {
    AsyncStorage.getItem('token', (err, result) => {
      const data = JSON.parse(result);
      setID(data.id);
    });
  }, []);
  useEffect(() => {
    if (id) {
      api
        .get(`/user/${id}`)
        .then(res => {
          if (res.data[0].cardDetails.cardNo) {
            setCardDetails(res.data[0].cardDetails);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id]);

  const handleDeactivate = () => {};

  return (
    <View
      style={{
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <ScrollView>
        <Text style={styles.InputTitle}>Card Center</Text>

        <Image source={card} style={styles.headerImage} />

        <Text style={styles.Lbl}>Your card details</Text>

        <View style={styles.amountFlex}>
          <View>
            <Text style={styles.amountLbl}>Active Balance</Text>
            <Text style={styles.amount}>LKR {cardDetails.amount}.00 </Text>
          </View>
          <View style={styles.activeFlex}>
            <Octicons style={styles.activeIcon} name="primitive-dot" />
            <Text style={styles.activeLbl}>{cardDetails.status}</Text>
          </View>
        </View>

        <View>
          <View style={styles.hr}></View>

          <Text style={styles.cardDetailsLable}>Card number</Text>
          <Text style={styles.cardDetails}>
            {cardDetails.cardNo.substring(0, 4) + ' '}
            {cardDetails.cardNo.substring(4, 8) + ' '}
            {cardDetails.cardNo.substring(8, 12) + ' '}
            {cardDetails.cardNo.substring(12, 16) + ' '}
          </Text>

          <View style={styles.hr}></View>

          <Text style={styles.cardDetailsLable}>Expiry date</Text>
          <Text style={styles.cardDetails}>{cardDetails.expiryDate}</Text>

          <View style={styles.hr}></View>

          <Text style={styles.cardDetailsLable}>Card type</Text>
          <Text style={styles.cardDetails}>{cardDetails.cardType}</Text>

          <View style={styles.hr}></View>

          <Text style={styles.Lbl}>Other option</Text>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => handleRoute()}>
            <View style={styles.cardCenterBtnContainer}>
              <View style={styles.BtnImageContainer}>
                <Image style={{width: 30, height: 30}} source={Apply} />
              </View>
              <Text style={styles.cardCreateBtnText}>Apply new card </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.hr}></View>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => handleDeactivate()}>
            <View style={styles.cardCenterBtnContainer}>
              <View style={styles.BtnImageContainer}>
                <Image style={styles.BtnImage} source={Block} />
              </View>
              <Text style={styles.cardCreateBtnText}>Deactivate </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.hr}></View>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => handleRoute()}
            style={{marginBottom: 25}}>
            <View style={styles.cardCenterBtnContainer}>
              <View style={styles.BtnImageContainer}>
                <Image style={styles.BtnImage} source={Remove} />
              </View>
              <Text style={styles.cardCreateBtnText}>Delete card</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}
export default CardCenter;

const styles = StyleSheet.create({
  InputTitle: {
    fontFamily: 'Dosis-SemiBold',
    fontSize: 24,
    color: '#000000',
    marginTop: 40,
    textAlign: 'left',
    marginLeft: 10,
  },

  headerImage: {
    width: width - 30,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  Lbl: {
    marginTop: 22,
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
    marginBottom: 10,
  },
  amountFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  amount: {
    fontFamily: 'Roboto-Medium',
    fontSize: 23,
    color: '#000000',
    marginLeft: 15,
    textAlign: 'left',
    marginBottom: 10,
  },
  amountLbl: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    color: '#717E95',
    marginLeft: 15,
    textAlign: 'left',
  },
  activeFlex: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: `auto`,
  },
  activeIcon: {
    color: '#10c200',
    fontSize: 18,
  },
  activeLbl: {
    fontSize: 16,
    marginBottom: 3,
    marginLeft: 5,
  },
  cardDetailsLable: {
    alignSelf: 'flex-start',
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: '#717E95',
    opacity: 0.7,
    letterSpacing: 1,
    marginLeft: 20,
    marginTop: 12,
  },
  cardDetails: {
    color: '#1A1A1A',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 12,
  },

  cardCenterBtnContainer: {
    width: 200,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 20,
  },
  cardCreateBtnText: {
    color: '#F6F6F9',
    fontSize: 17,
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    marginLeft: 8,
    color: '#000000',
    lineHeight: 20,
  },
  BtnImageContainer: {
    borderRadius: 8,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2F8',
    marginRight: 10,
  },
  BtnImage: {
    width: 23,
    height: 23,
  },
  temporaryText: {
    color: '#f53d3d',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  hr: {
    width: width - 50,

    alignSelf: 'center',
    borderBottomColor: '#EEF2F8',
    borderBottomWidth: 1,
  },
});
