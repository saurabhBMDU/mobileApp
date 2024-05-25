import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {AuthContext, LoginContext, UserDataContext} from '../../../App';
import {showAlert} from '../../utils/toast.utils';
import Mail_icons from 'react-native-vector-icons/Entypo';
const {height, width} = Dimensions.get('window');
import {useNetInfo} from '@react-native-community/netinfo';
import type {StatusBarStyle} from 'react-native';
import RoundedStatusBar from '../../allModals/CustomStatusBar';
import CustomStatusBar from '../../allModals/CustomStatusBar';
import {
  ProceedToLoginUser,
  loginUser,
  setJwt,
} from '../../Services/user.service';
import AlertBox from '../../allModals/AlertBox';
import Lock from 'react-native-vector-icons/FontAwesome6';

import Openeye_closeEye from 'react-native-vector-icons/Ionicons';

const STYLES = ['default', 'dark-content', 'light-content'] as const;
const TRANSITIONS = ['fade', 'slide', 'none'] as const;

const Login = () => {
  // checking internet connection

  // message and password

  const [message, setUserMessage] = useState('');
  const [onClose, setONclose] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;
  const mainFont = 'Montserrat-Regular';
  const mainFontBold = 'Montserrat-Bold';
  const navigation: any = useNavigation();
  const [agree, setAgree] = useState(false);
  const [user, setUser] = useContext(LoginContext);
  const [email, setEmail] = useState('');

  const handleRedirectToNextScreen = () => {
    if (email == '') {
      showAlert('Email is mandatory !!!');
      // showAlert('Email is mandatory !!!');
      return;
    }
    // navigation.navigate('Password', { data: email });
  };

  //for password section

  const [hide, setHide] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useContext<any>(AuthContext);
  // const [user, setUser] = useContext(LoginContext);
  const [userData, setUserData] = useContext(UserDataContext);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    try {
      if (password == '') {
        showAlert('Password is mandatory !!!');
        return;
      }
      let obj = {
        email,
        password,
      };

      const {data: res}: any = await loginUser(obj);
      if (res.status == false) {
        if (res.error === 'User already login in other device') {
          showModalPopup();
          console.log('response from backend', res);
        } else {
          throw new Error(res.error);
        }
      }
      if (res.token) {
        await setJwt(res?.token, res?.user);
        setUser(res?.user?.role);
        setUserData(JSON.stringify(res?.user));
        setIsAuthorized(true);
      }
    } catch (err) {
      showAlert(err.message);
    }
  };

  const ProceedToLogin = async () => {
    try {
      if (password == '') {
        showAlert('Password is mandatory !!!');
        return;
      }
      let obj = {
        email,
        password,
      };
      const {data: res}: any = await ProceedToLoginUser(obj);
      if (res.status == false) {
        console.log('response from backend', res);
        throw new Error(res.error);
      }

      if (res.token) {
        closeModal();
        await setJwt(res?.token, res?.user);
        setUser(res?.user?.role);
        setUserData(JSON.stringify(res?.user));
        setIsAuthorized(true);
      }
      // }
    } catch (err) {
      showAlert(err.message);
    }
  };

  const showModalPopup = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //show alert box

  const showAlert = message => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3300); // Extra 300ms to account for the sliding out animation
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#fff',
      }}>
      {/* <AlertBox message={message} onClose={onClose}/> */}
      {alertVisible && (
        <AlertBox
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      )}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <View>
          {/*<StatusBar backgroundColor={isConnected ? '#baddff' : '#cc5933'} />*/}
          {/* <CustomStatusBar/> */}

          <CustomStatusBar />

          <View
            style={{
              backgroundColor: isConnected ? '#8f4608' : '#cc5933',
              width: wp(100),
              alignItems: 'center',
            }}>
            {!isConnected && (
              <Text style={{fontSize: wp(4), color: '#fff'}}>
                Verify Your Connection
              </Text>
            )}
          </View>
        </View>

        <View
          style={{
            width: wp(100),
            height: hp(33),
            backgroundColor: '#1263AC',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#ffff',
              fontSize: 50,
            }}>
            Welcome !
          </Text>
          <Text
            style={{
              color: '#ffff',
            }}>
            Sign in to continue
          </Text>
          {/* <Image
            source={require('../../../assets/images/final1.png')}
            resizeMode='stretch'
            style={{ width: wp(100), height: hp(33) }} /> */}
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              marginBottom: 10,
              marginTop: '-10%',
              width: '100%',
            }}>
            <Image
              source={require('../../../assets/images/Logo34.png')}
              resizeMode="stretch"
              style={{
                width: wp(77),
                height: hp(20),
                alignSelf: 'center',
                marginTop: 30,
                marginRight:5,
              }}
            />

            <View style={{flexDirection: 'row'}}></View>
            <View
              style={{width: wp(73), alignSelf: 'center', marginTop: hp(2)}}>
              <Text
                style={{
                  color: '#1263AC',
                  fontWeight: 'bold',
                  fontSize: hp(1.8),
                  marginBottom: 5,
                }}>
                Email/Mobile No
              </Text>
              <View
                style={{
                  width: '100%',
                  height: hp(5.5),
                  backgroundColor: '#E8E8E8',
                  marginTop: hp(1),
                  borderRadius: 5,
                  alignItems: 'center',
                  paddingLeft: wp(2),
                  flexDirection: 'row',
                  marginBottom: 20,
                }}>
                <Mail_icons
                  name="mail"
                  style={{
                    color: 'grey',
                    fontSize: hp(2.8),
                  }}
                />

                <TextInput
                  placeholder="Enter Mobile Number or Email"
                  placeholderTextColor="gray"
                  onChangeText={e => setEmail(e)}
                  value={email}
                  style={{
                    width: wp(70),
                    fontSize: hp(2),
                    paddingLeft: 20,
                  }}
                />
              </View>

              <Text
                style={{
                  color: '#1263AC',
                  fontWeight: 'bold',
                  fontSize: hp(1.8),
                  marginBottom: 5,
                }}>
                Password
              </Text>
              <View
                style={{
                  width: '100%',
                  height: hp(5.5),
                  backgroundColor: '#E8E8E8',
                  marginTop: hp(1),
                  borderRadius: 5,
                  alignItems: 'center',
                  paddingLeft: wp(3),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Lock
                  name="lock"
                  style={{
                    color: 'grey',
                    fontSize: hp(2.8),
                  }}
                />
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor="gray"
                  secureTextEntry={hide}
                  onChangeText={e => setPassword(e)}
                  value={password}
                  style={{width: wp(70), fontSize: hp(2)}}
                />
                <Pressable
                  onPress={() => setHide(!hide)}
                  style={{padding: wp(2), marginLeft: -100}}>
                  <Openeye_closeEye
                    name={hide ? 'eye-off' : 'eye'}
                    style={{
                      color: '#696968',
                      fontSize: hp(3),
                    }}
                  />
                </Pressable>
              </View>
              <Pressable
                onPress={() => navigation.navigate('ForgotPassword')}
                style={{alignSelf: 'flex-end', marginTop: 8}}>
                <Text style={{color: '#1263AC', fontSize: hp(1.8)}}>
                  Forgot Password?{' '}
                </Text>
              </Pressable>

              {/* Button section >>>>>>>>>>>>>>>>>> */}
              <TouchableOpacity
                // onPress={() => handleRedirectToNextScreen()}
                onPress={() => handleLogin()}
                style={[
                  styles.both_reg_continew_BTN,
                  {backgroundColor: '#1263AC', borderColor: '#1263AC'},
                ]}>
                <Text style={styles.register_And_Continew}>Sign in</Text>
              </TouchableOpacity>
              {/* <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: '600',
                  color: '#1263AC',
                  fontFamily: 'AvenirNextLTPro-Regular',
                  alignSelf: 'center',
                  padding: 10,
                }}>
                Or
              </Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                  }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text
                    style={{
                      color: '#1263AC',
                      fontSize: hp(1.8),
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    SIGN UP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View></View>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => closeModal()}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: '#ececec',
                padding: 20,
                borderRadius: 10,
                width: '80%',
              }}>
              <Lock
                name="lock"
                style={{
                  height: wp(5.5),
                  width: wp(5.5),
                  color: 'grey',
                  fontSize: hp(2.8),
                  alignSelf: 'center',
                  marginBottom: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'normal',
                  textAlign: 'center',
                  marginBottom: 20,
                }}>
                Are you sure you want to log out from another device and log in
                here?
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => closeModal()}
                  style={{
                    flex: 1,
                    marginRight: 10,
                    backgroundColor: '#fa1640',
                    borderRadius: 5,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    closeModal();
                    ProceedToLogin();
                  }}
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    backgroundColor: '#1263AC',
                    borderRadius: 5,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Proceed
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  login_Text: {
    fontSize: hp(3),
    color: 'white',
    alignSelf: 'center',
    marginTop: hp(7),
  },
  register_And_Continew: {
    color: 'white',
    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: hp(2),
  },
  Both_small_Line: {
    width: wp(40),
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  both_reg_continew_BTN: {
    width: '100%',
    height: hp(6),
    borderWidth: 1,
    marginTop: hp(2),
    marginBottom: hp(2),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
