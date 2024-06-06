import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';

import React, { useContext, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../../../App';
import { showAlert, toastSuccess } from '../../utils/toast.utils';
import { Dropdown } from 'react-native-element-dropdown';
import { registerUser, sendOtp } from '../../Services/user.service';
import Openeye_closeEye from 'react-native-vector-icons/Ionicons';
import AlertBox from '../../allModals/AlertBox';

const { height, width } = Dimensions.get('window');

const Register = () => {

  const mainFont = 'Montserrat-Regular';
  const mainFontBold = 'Montserrat-Bold';
  const navigation: any = useNavigation();
  const [agree, setAgree] = useState(false);
  const [user, setUser] = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [otp, setOtp] = useState('');
  const [hide, setHide] = useState(true);
  const [hide2, setHide2] = useState(true);


  
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const [showOtpInput, setShowOtpInput] = useState(true);

  const [isAggreed, setIsAggreed] = useState(false);

  const handleRegister = async () => {
    try {
      if (name == '') {
        showAlert('Name is mandatory !!!');
        showAlert('Name is mandatory !!!')
        return;
      }
      if (name.length > 20) {
        showAlert('Name must be less than or equal to 20 characters !!!');
        showAlert('Name must be less than or equal to 20 characters !!!')
        return;
      }
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        showAlert('Invalid email format !!!');
        showAlert('Name must be less than or equal to 20 characters !!!')
        return;
      }
      if (mobile == '') {
        showAlert('Mobile number is mandatory !!!');
        showAlert('Mobile number is mandatory !!!')
        return;
      }
      if (!otp || otp == '') {
        showAlert('Please enter otp to register !!!');
        showAlert('Please enter otp to register !!!')
        return;
      }
      if (gender == '') {
        showAlert('Gender is mandatory !!!');
        showAlert('Gender is mandatory !!!')
        return;
      }
      if (password == '') {
        showAlert('Password is mandatory !!!');
        return;
      }
      if (rePassword == '') {
        showAlert('Confirm Password is mandatory !!!');
        return;
      }
      if (rePassword !== password) {
        showAlert('Password and Confirm Password does not match !!!');
        return;
      }

      let obj = {
        email,
        name,
        gender,
        mobile,
        otp,
        password,
        rePassword,
      };

      let { data: res } = await registerUser(obj);
      if (res.message) {
        toastSuccess(res.message);
        navigation.navigate('Login');
      }
    } catch (err) {
      console.error(JSON.stringify(err));
      showAlert(err);
    }
  };
  const handleSendOtp = async () => {
    try {
      if (!mobile || mobile == '' || mobile.length != 10) {
        showAlert('Please enter a valid mobile number');
        return;
      }
      let obj = {
        mobile: mobile,
      };
      let { data: res } = await sendOtp(obj);
      if (res.message) {
        toastSuccess(res.message);
        setShowOtpInput(false);
      }
    } catch (error) {
      showAlert(error);
    }
  };

  const handleRedirectToNextScreen = () => {
    if (email == '') {
      showAlert('Email is mandatory !!!');
      return;
    }
    navigation.navigate('Password', { data: email });
  };



  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3300); // Extra 300ms to account for the sliding out animation
  };


  return (
    <View>

{alertVisible && (
        <AlertBox
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      )}

    <ScrollView
    showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>      


<View
        style={{ 
          width: wp(100), 
          height: hp(33),
          backgroundColor:"#1263AC",
          justifyContent:"center",
          alignItems:'center'
         }}
        >
          <Text
          style = {{
             color:"#ffff",
             fontSize:50
          }}
          >Welcome !</Text>
          <Text
          style={{
            color:"#ffff"
          }}
          >Register And continue</Text>
          {/* <Image
            source={require('../../../assets/images/final1.png')}
            resizeMode='stretch'
            style={{ width: wp(100), height: hp(33) }} /> */}
        </View>
        

      <View
         style={{ 
          flex: 1,
          backgroundColor:'#fff',
          borderTopLeftRadius:50,
          borderTopRightRadius:50,
          marginBottom:10,
          marginTop: '-10%',
          width:'100%'
           }}
      >
        {/* <Image
          source={require('../../../assets/images/final1.png')}
          resizeMode="stretch"
          style={{
            width: wp(100),
            height: hp(33),
          }} /> */}

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



      </View>


    
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 50}
        style={{
          height: !showOtpInput ?  hp(90) :  hp(80),
        }}>
        <View
          style={{
            height: hp(100),
            justifyContent: 'center',
            marginTop:  !showOtpInput ? hp(-8) : hp(-13),   
            position:'relative'       
          }}>
          <Text
            style={{
              fontSize: hp(3),
              color: '#1263AC',
              marginLeft: wp(2.9),
              fontFamily: mainFont,
              fontWeight: 'bold',
              alignSelf:"center",
              marginTop:100,
            }}>
            Register
          </Text>
          <View
            style={{
              width: wp(95),
              alignSelf: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 10,
              paddingBottom: 10,
            }}>
            {/* Email section >>>>>>>>>>>>>>>>>>>>>*/}
            <Text style={styles.common_Text_Styl}>Name</Text>
            <View style={styles.input_fild_parent_View}>
              <TextInput
                placeholder="Enter Name"
                placeholderTextColor="gray"
                onChangeText={e => setName(e)}
                value={name}
                style={styles.all_input_BOx_ctyl}
              />
            </View>
            <Text style={styles.common_Text_Styl}>Email</Text>
            <View style={styles.input_fild_parent_View}>
              <TextInput
                placeholder="Enter Email Address"
                placeholderTextColor="gray"
                onChangeText={e => setEmail(e)}
                value={email}
                style={styles.all_input_BOx_ctyl}
              />
            </View>
            <Text style={styles.common_Text_Styl}>Mobile number</Text>

            {/* <View > */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Enter Mobile Number"
                placeholderTextColor="gray"
                keyboardType={'number-pad'}
                maxLength={10}
                onChangeText={e => setMobile(e)}
                value={mobile}
                style={{
                  flex: 1,
                  height: hp(5.5),
                  backgroundColor: '#E8E8E8',
                  borderRadius: 5,
                  alignItems: 'center',
                  paddingLeft: wp(1.5),
                  fontSize: hp(2),
                  flexDirection: 'row',
                }}
              />
              <TouchableOpacity
                onPress={() => handleSendOtp()}
                style={{
                  width: wp(25),
                  height: hp(5),
                  backgroundColor: '#1263AC',
                  marginLeft: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'AvenirNextLTPro-Regular',
                    fontSize: hp(2)
                  }}>
                  {showOtpInput == false ? 'Resend OTP' : 'Request OTP'}
                </Text>
              </TouchableOpacity>
            </View>
            {!showOtpInput && (
              <>
                <Text style={styles.common_Text_Styl}>OTP</Text>
                <View style={styles.input_fild_parent_View}>
                  <TextInput
                    placeholder="Enter OTP"
                    placeholderTextColor="gray"
                    onChangeText={e => setOtp(e)}
                    value={otp}
                    style={styles.all_input_BOx_ctyl}
                  />
                </View>
              </>
            )}
            <Text style={styles.common_Text_Styl}>Gender</Text>
            <View style={{ width: '100%' }}>
              <Dropdown
                style={[styles.dropdown, { width: '100%' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                  { label: 'Others', value: 'Others' },
                ]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Gender"
                value={gender}
                onChange={(item: any) => {
                  setGender(item.value);
                }}
              />
            </View>
            <Text style={styles.common_Text_Styl}>Password</Text>
            <View style={styles.input_fild_parent_View}>
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="gray"
                secureTextEntry={hide2}
                onChangeText={e => setPassword(e)}
                value={password}
                style={styles.all_input_BOx_ctyl}
              />
              <Pressable onPress={() => setHide2(!hide2)} style={{ padding: wp(2) }}>
                <Openeye_closeEye
                  name={hide2 ? "eye-off" : "eye"}
                  style={{
                    color: '#696968',
                    fontSize: hp(3),
                  }}
                />
              </Pressable>
            </View>
            <Text style={styles.common_Text_Styl}>Confirm password</Text>
            <View style={styles.input_fild_parent_View}>
              <TextInput
                placeholder="Enter Confirm Password"
                placeholderTextColor="gray"
                onChangeText={e => setRePassword(e)}
                value={rePassword}
                secureTextEntry={hide}
                style={styles.all_input_BOx_ctyl}
              />
              <Pressable onPress={() => setHide(!hide)} style={{ padding: wp(2) }}>
                <Openeye_closeEye
                  name={hide ? "eye-off" : "eye"}
                  style={{
                    color: '#696968',
                    fontSize: hp(3),
                  }}
                />
              </Pressable>

            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginVertical: 20,
              }}>
              <Pressable
                onPress={() => setIsAggreed(prev => !prev)}
                style={{
                  padding: 2,
                  borderRadius: 5,
                  backgroundColor: 'white',
                  marginRight: 5,
                }}>
                <View
                  style={{
                    height: hp(2.5),
                    width: hp(2.5),
                    borderRadius: 5,
                    backgroundColor: isAggreed ? 'black' : 'white',
                    borderWidth: 1,
                  }}></View>
              </Pressable>
              <Text
                style={{
                  color: '#1263AC',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'AvenirNextLTPro-Regular',
                  fontSize: hp(1.8)
                }}>
                I accept fever99
              </Text>
              <Pressable onPress={() => navigation.navigate('PAC')}>
                <Text style={{
                  color: '#1263AC', fontWeight: '800', fontSize: hp(1.8)
                }}> Privacy Policy
                </Text>
              </Pressable>
              <Text
                style={{
                  color: '#1263AC',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'AvenirNextLTPro-Regular',
                  fontSize: hp(1.8)
                }}> and</Text>
              <Pressable
                style={{ marginLeft: 5 }}
                onPress={() => navigation.navigate('TAC')}>
                <Text style={{ color: '#1263AC', fontWeight: '800', fontSize: hp(1.8) }}> T&C </Text>
              </Pressable>
            </View>

            {/* Button section >>>>>>>>>>>>>>>>>> */}
            <TouchableOpacity
              onPress={() => handleRegister()}
              style={{
                width: '100%',
                height: hp(5),
                backgroundColor: '#1263AC',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom:80,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'AvenirNextLTPro-Regular',
                  fontSize: hp(2),
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* </ImageBackground> */}
    </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  common_Text_Styl: {
    color: '#1263AC',
    marginTop: 15,
    fontSize: hp(1.8)
  },
  all_input_BOx_ctyl: {
    width: wp(70),
    fontSize: hp(2)
  },
  input_fild_parent_View: {
    width: '100%',
    height: hp(5.5),
    backgroundColor: '#E8E8E8',
    marginTop: hp(1),
    borderRadius: 5,
    alignItems: 'center',
    paddingLeft: wp(1.5),
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  dropdown: {
    height: hp(5.5),
    borderRadius: 5,
    paddingHorizontal: 8,
    marginTop: hp(1),
    width: wp(45),
    fontSize: hp(2),
    backgroundColor: '#E8E8E8',
  },
  dropdown1: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: hp(1),
    fontSize: hp(2),
    width: wp(95),
    backgroundColor: '#F2F2F2E5',
  },
  placeholderStyle: {
    fontSize: hp(2),
    color: '#8E8E8E',
  },
  selectedTextStyle: {
    fontSize: hp(2),
    color: '#8E8E8E',
  },
  iconStyle: {
    width: 20,
    height: 20,
    fontSize: hp(2),
  },
  inputSearchStyle: {
    height: 40,
    fontSize: hp(2),
    color: '#8E8E8E',
  },
});
export default Register;