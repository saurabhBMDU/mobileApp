import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, { useContext, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../../App';
import { showAlert, toastSuccess } from '../utils/toast.utils';
import { forgotPassword } from '../Services/user.service';
import AlertBox from '../allModals/AlertBox';
const { height, width } = Dimensions.get('window');

const ForgotPassword = () => {
  const mainFont = 'Montserrat-Regular';
  const mainFontBold = 'Montserrat-Bold';
  const navigation: any = useNavigation();
  const [agree, setAgree] = useState(false);
  const [user, setUser] = useContext(LoginContext);
  const [email, setEmail] = useState('');

  const mobileNumberPattern = /^[0-9]{10}$/;
  const [mobile, setMobile] = useState('');


  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3300); // Extra 300ms to account for the sliding out animation
  };


  const handleForgotPassword = async () => {
    try {
      if (!mobile || mobile == '' || !mobileNumberPattern.test(mobile)) {
        showAlert('Mobile is mandatory !!!');
        return;
      }
      let obj = {
        mobile,
      };

      let { data: res } = await forgotPassword(obj);
      if (res.message) {
        showAlert(res.message);
        navigation.navigate('GetOTP', { data: mobile });
      }
    } catch (err) {
      showAlert(err.message);
    }
  };
  return (
    <View
      style={{
        // width: width,
        // alignItems: 'center',
        // justifyContent: 'center',
        // height: height,
        backgroundColor:'#fff'
      }}>

{alertVisible && (
        <AlertBox
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      )}


      {/* <ImageBackground
        source={require('../../assets/images/feverNewLogo.png')}
        resizeMode="stretch"
        style={{ flex: 1, width: wp(100), height: hp(100), alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
          }}> */}

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
          >Forgot Password</Text>
          {/* <Image
            source={require('../../../assets/images/final1.png')}
            resizeMode='stretch'
            style={{ width: wp(100), height: hp(33) }} /> */}
        </View>
        
<View
  style={{ 
    // flex: 1,
    backgroundColor:'#fff',
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    // marginBottom:40,
    marginTop: '-10%',
    width:'100%',
    height:'20%'
     }}
> 
        

            <Image
              source={require('../../assets/images/Logo34.png')}
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

 <View
 style={{
  backgroundColor:'#fff',
  height:'80%'
 }}
 >
          <Text
            style={{
              fontSize: hp(3),
              color: '#1263AC',
              fontWeight: 'bold',
              fontFamily: mainFont,
              marginBottom: hp(2),
              marginLeft:20,
            }}>
            Forgot Password
          </Text>
          <View style={{ width: wp(90), alignSelf: 'center' }}>
            {/* Email section >>>>>>>>>>>>>>>>>>>>>*/}
            <Text style={{ color: '#1263AC',fontSize:hp(1.8) }}>Mobile Number</Text>
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
              }}>
              <TextInput
                placeholder="Enter Mobile Number"
                placeholderTextColor="gray"
                keyboardType="number-pad"
                onChangeText={e => setMobile(e)}
                value={mobile}
                style={{ marginLeft: 2, width: wp(70),fontSize:hp(2) }}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleForgotPassword()}
              style={{
                width: '100%',
                height: hp(6),
                backgroundColor: '#1263AC',
                marginTop: hp(4),
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ color: 'white', fontFamily: 'AvenirNextLTPro-Regular',fontSize:hp(1.9) }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};

export default ForgotPassword;
