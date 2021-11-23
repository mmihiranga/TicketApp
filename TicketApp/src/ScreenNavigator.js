import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from './Screens/Auth/context';

// Stack Navigator
const Stack = createNativeStackNavigator();

// Screens
import HomeScreen from './Screens/TabScreens/HomeScreen';
import CardScreen from './Screens/TabScreens/CardScreen';
import NotificationsScreen from './Screens/TabScreens/NotificationsScreen';
import ProfileScreen from './Screens/TabScreens/ProfileScreen';
import CardRecharge from './Screens/Recharge/CardRecharge';
import PaymentSuccses from './Screens/Recharge/PaymentSuccess';
import CardCenter from './Screens/Card/CardCenter';
import SignUp from './Screens/Auth/SignUp';
import LogIn from './Screens/Auth/LogIn';
import ViewInspectionsScreen from './Screens/Inspection/ViewInspections';
import spinnerLoad from './Screens/Common/spinnerLoad';
import InspectionHome from './Screens/Inspection/InspectionHome';
import TimetableScreen from './Screens/Inspection/Timetable';
import UserTimetableScreen from './Screens/Common/UserTimetable';

const HomeTab = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Homepage'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Homepage" component={HomeScreen} />
      <Stack.Screen name="Recharge" component={CardRecharge} />
      <Stack.Screen name="PaySuccess" component={PaymentSuccses} />
      <Stack.Screen
        name="UserTimetableScreen"
        component={UserTimetableScreen}
      />
    </Stack.Navigator>
  );
};

const NotificationTab = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Notification'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Notification" component={NotificationsScreen} />
      <Stack.Screen name="ViewInspections" component={ViewInspectionsScreen} />
    </Stack.Navigator>
  );
};

const CardTab = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Cardpage'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Cardpage" component={CardScreen} />
      <Stack.Screen name="cardCenter" component={CardCenter} />
    </Stack.Navigator>
  );
};

// Tab Navigator

const Tab = createBottomTabNavigator();

//Tab Screen names
const homeName = 'Home';
const detailsName = 'Card Center';
const NotificationsName = 'Notifcations ';
const profileName = 'Profile';

const ScreenNavigator = () => {
  const [token, setToken] = useState();
  const [userType, setuserType] = useState();
  const [IsLoading, setIsLoading] = useState(true);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      AsyncStorage.getItem('token', (err, result) => {
        const userData = JSON.parse(result);
        if (userData != null) {
          console.log(userData);
          setToken(true);
          setuserType(userData.type);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        } else {
          setToken(false);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      });

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, [token, IsLoading]);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          AsyncStorage.setItem('token', JSON.stringify(data), () => {
            console.log(data);
          });
        } catch (e) {
          console.log(e);
        }

        AsyncStorage.getItem('token', (err, result) => {
          const userData = JSON.parse(result);
          if (userData != null) {
            setToken(true);
            console.log(userData.type);
            setuserType(userData.type);
            setIsLoading(false);
          } else {
            setToken(false);
            setIsLoading(false);
          }
        });

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: async data => {
        try {
          await AsyncStorage.removeItem('token');
        } catch (e) {
          console.log(e);
        }
        console.log('token remove');
        setToken(false);

        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  const styles = StyleSheet.create({
    TabBarIcon: {
      fontSize: 32,
      color: '#2F75FD',
      shadowColor: '#2F75FD',
      shadowRadius: 20,
      shadowOffset: {width: 0.5, height: 0.5},
      shadowOpacity: 0.5,
      elevation: 10,
    },
    TabBarInActiveIcon: {},
  });

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {IsLoading ? (
          <Stack.Navigator initialRouteName={'spinnerLoad'}>
            <Stack.Screen
              name="spinnerLoad"
              component={spinnerLoad}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        ) : token ? (
          userType != 'user' ? (
            <Stack.Navigator initialRouteName={'InspectionHome'}>
              <Stack.Screen
                name="InspectionHome"
                component={InspectionHome}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ViewInspectionsScreen"
                component={ViewInspectionsScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TimetableScreen"
                component={TimetableScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator
              initialRouteName={homeName}
              screenOptions={({route}) => ({
                tabBarActiveTintColor: '#2F75FD',
                tabBarInactiveTintColor: '#1c1c1c',
                headerShown: false,
                tabBarLabelStyle: {
                  fontSize: 12,
                  paddingBottom: 8,
                  fontFamily: 'Raleway-Medium',
                },
                tabBarStyle: {
                  backgroundColor: '#FFFEFE',
                  height: 68,
                  paddingTop: 5,
                  shadowColor: '#fff',
                  shadowRadius: 10,
                  shadowOffset: {width: 0.6, height: 0.6},
                  shadowOpacity: 0.6,
                  elevation: 20,
                  marginTop: 1,
                  bottom: 0,
                },

                tabBarIcon: ({focused, color, size}) => {
                  let iconName;
                  let rn = route.name;

                  if (rn === homeName) {
                    iconName = focused ? 'ios-home' : 'ios-home-outline';
                    return (
                      <Ionicons
                        name={iconName}
                        size={size}
                        color={color}
                        style={
                          (iconName = focused
                            ? styles.TabBarIcon
                            : styles.TabBarInActiveIcon)
                        }
                      />
                    );
                  } else if (rn === detailsName) {
                    iconName = focused ? 'ios-card' : 'ios-card-outline';
                    return (
                      <Ionicons
                        name={iconName}
                        size={size}
                        color={color}
                        style={
                          (iconName = focused
                            ? styles.TabBarIcon
                            : styles.TabBarInActiveIcon)
                        }
                      />
                    );
                  } else if (rn === NotificationsName) {
                    iconName = focused
                      ? 'ios-notifications'
                      : 'ios-notifications-outline';
                    return (
                      <Ionicons
                        name={iconName}
                        size={size}
                        color={color}
                        style={
                          (iconName = focused
                            ? styles.TabBarIcon
                            : styles.TabBarInActiveIcon)
                        }
                      />
                    );
                  } else if (rn === profileName) {
                    iconName = focused ? 'user' : 'user-o';
                    return (
                      <FontAwesome
                        name={iconName}
                        size={size}
                        color={color}
                        style={
                          (iconName = focused
                            ? styles.TabBarIcon
                            : styles.TabBarInActiveIcon)
                        }
                      />
                    );
                  }
                },
              })}>
              <Tab.Screen name={homeName} component={HomeTab} />
              <Tab.Screen name={detailsName} component={CardTab} />
              <Tab.Screen
                name={NotificationsName}
                component={NotificationTab}
              />
              <Tab.Screen name={profileName} component={ProfileScreen} />
            </Tab.Navigator>
          )
        ) : (
          <Stack.Navigator initialRouteName={'LogIn'}>
            <Stack.Screen
              name="LogIn"
              component={LogIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default ScreenNavigator;
