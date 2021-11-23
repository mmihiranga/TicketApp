import React, {useEffect} from 'react';
import {Button} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import Star from 'react-native-star-view';
import {Card, ListItem} from 'react-native-elements';
import {Avatar} from 'react-native-paper';
import {
  FacebookLoader,
  InstagramLoader,
} from 'react-native-easy-content-loader';
import api from '../../api';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../Auth/context';
const {width, height} = Dimensions.get('window');
import SpinnerLoad from '../Common/spinnerLoad';

const styles = StyleSheet.create({
  CompanyListBody: {},
  CompanyListTitle: {
    fontFamily: 'Raleway-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    color: '#000000',
    marginLeft: 12,
  },
  AddReviewBtn: {
    width: 230,
    alignSelf: 'flex-end',
    height: 52,
    marginRight: 20,
  },
  AddReviewBtnContainer: {
    width: 220,
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
  CompanyListCard: {
    overflow: 'hidden',
    shadowRadius: 10,
    borderRadius: 8,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 12,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#Fff',
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  CompanyListCardHeader: {
    flexDirection: 'row',
  },
  Image: {
    width: 100,
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ReviewerName: {
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#333333',
    marginLeft: 8,
  },
  CompanyName: {
    fontSize: 15,
    fontFamily: 'Raleway-Bold',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 8,
  },
  ReviewDate: {
    textAlign: 'right',
    color: '#333333',
    fontFamily: 'Raleway-Regular',
    fontSize: 13,
    opacity: 0.7,
  },
  ReviewDesc: {
    fontSize: 15,
    marginTop: 18,
    paddingRight: 15,
    paddingLeft: 15,
    color: '#666666',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    lineHeight: 20,
    fontWeight: '400',
  },
  rating: {
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  starStyle: {
    width: 100,
    height: 20,
    marginBottom: 8,
    marginLeft: 6,
  },

  baseText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 30,
    paddingTop: 50,
    fontWeight: 'bold',
    color: '#000',
  },
  AddButton: {
    marginBottom: 0,
    height: 140,
  },
  InputTitle: {
    fontFamily: 'Dosis-SemiBold',
    fontSize: 28,
    color: '#000000',
    marginLeft: 25,
    marginTop: 60,
    textAlign: 'left',
  },
  BackBtn: {
    marginLeft: 25,
    marginTop: 65,
    textAlign: 'left',
  },
  imageHomeTop: {
    position: 'absolute',
    width: width,
    height: 133,
  },
  backIcon: {
    fontSize: 28,
    color: '#424347',
  },
});

const ViewInspections = ({navigation}) => {
  const [toggle, setToggle] = React.useState(false);
  const {signOut} = React.useContext(AuthContext);
  const [activeE, SetActive] = React.useState(true);
  const [rows, setRows] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  setTimeout(() => SetActive(false), 1000);

  useEffect(() => {
    api
      .get(`/inspections`)
      .then(res => {
        setRows(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [toggle]);

  return (
    <View style={styles.ReviewBody}>
      <Image
        style={styles.imageHomeTop}
        source={{uri: 'https://www.linkpicture.com/q/Rectangle-87_1.png'}}
      />
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={styles.BackBtn}
          onPress={() => navigation.navigate('InspectionHome')}>
          <MaterialIcons style={styles.backIcon} name="arrow-back-ios" />
        </Pressable>
        <Text style={styles.InputTitle}>Inspections</Text>
      </View>
      {isLoading ? (
        <View style={{height: height}}>
          <SpinnerLoad />
        </View>
      ) : (
        <ScrollView
          style={{marginTop: 40}}
          contentInsetAdjustmentBehavior="automatic">
          <View>
            {rows.length > 0 &&
              rows.map(row => {
                return (
                  <View
                    onPress={() => navigation.navigate('CompanyView')}
                    style={styles.CompanyListCard}>
                    <View style={styles.CompanyListCardHeader}>
                      <View style={{marginTop: 5}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 10,
                            marginBottom: 5,
                          }}>
                          <MaterialCommunityIcons
                            name="bus"
                            color="#2b208a"
                            size={22}
                          />
                          <Text style={styles.CompanyName}>Bus No : </Text>
                          <Text style={styles.ReviewerName}>{row.busNo}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 10,
                            marginBottom: 5,
                          }}>
                          <MaterialCommunityIcons
                            name="routes"
                            color="#2b208a"
                            size={22}
                          />
                          <Text style={styles.CompanyName}>Bus Route : </Text>
                          <Text style={styles.ReviewerName}>{row.route} </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 10,
                            marginBottom: 5,
                          }}>
                          <MaterialCommunityIcons
                            name="account-group"
                            color="#2b208a"
                            size={22}
                          />
                          <Text style={styles.CompanyName}>
                            Paid Passenger Count :{' '}
                          </Text>
                          <Text style={styles.ReviewerName}>
                            {row.paidPCount}{' '}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 10,
                            marginBottom: 5,
                          }}>
                          <MaterialCommunityIcons
                            name="account-group-outline"
                            color="#2b208a"
                            size={22}
                          />
                          <Text style={styles.CompanyName}>
                            Unpaid Passenger Count :{' '}
                          </Text>
                          <Text style={styles.ReviewerName}>
                            {row.unpaidPCount}{' '}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 10,
                            marginBottom: 5,
                          }}>
                          <MaterialCommunityIcons
                            name="counter"
                            color="#2b208a"
                            size={22}
                          />
                          <Text style={styles.CompanyName}>
                            Paid Passenger Precentage :{' '}
                          </Text>
                          <Text style={styles.ReviewerName}>
                            {Number.parseFloat(
                              (row.paidPCount * 100) / row.passengerCount,
                            ).toFixed(2)}{' '}
                            %{' '}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 10,
                            marginBottom: 5,
                          }}>
                          <MaterialCommunityIcons
                            name="card-text"
                            color="#2b208a"
                            size={22}
                          />
                          <Text style={styles.CompanyName}>Remarks : </Text>
                          <Text style={styles.ReviewerName}>
                            {row.remarks}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>

          <View style={{height: 150}}></View>
        </ScrollView>
      )}
    </View>
  );
};

export default ViewInspections;
