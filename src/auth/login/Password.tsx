import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {LoginContext, UserDataContext} from '../../../App';
import {AuthContext} from '../../../App';
import {loginUser, setJwt,ProceedToLoginUser} from '../../Services/user.service';
import {toastError} from '../../utils/toast.utils';
const {height, width} = Dimensions.get('window');
import Openeye_closeEye from 'react-native-vector-icons/Ionicons';
import Lock from 'react-native-vector-icons/FontAwesome6';

const Password = (props: any) => {
  const mainFont = 'Montserrat-Regular';
  const mainFontBold = 'Montserrat-Bold';
  const navigation: any = useNavigation();
  const [hide, setHide] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useContext<any>(AuthContext);
  const [user, setUser] = useContext(LoginContext);
  const [userData, setUserData] = useContext(UserDataContext);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    try {
      if (password == '') {
        toastError('Password is mandatory !!!');
        return;
      }
      let obj = {
        email: props.route.params.data,
        password,
      };

      const {data: res}: any = await loginUser(obj);
      if (res.status == false) {
        if(res.error === 'User already login in other device'){
          showModalPopup();
          console.log('response from backend',res)
        }else{
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
      toastError(err);
    }
  };




  const ProceedToLogin = async () => {
    try {
      if (password == '') {
        toastError('Password is mandatory !!!');
        return;
      }
      let obj = {
        email: props.route.params.data,
        password,
      };
      const {data: res}: any = await ProceedToLoginUser(obj);
      if (res.status == false) {
        console.log('response from backend',res)
        throw new Error(res.error);
      }
      if (res.token) {
        closeModal();
        await setJwt(res?.token, res?.user);
        setUser(res?.user?.role);
        setUserData(JSON.stringify(res?.user));
        setIsAuthorized(true);
      }
    } catch (err) {
      toastError(err);
    }
  };


  const showModalPopup = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <View style={{flex: 1, width: width}}>
      <ImageBackground
        // source={require('../../../assets/images/background_img.png')}
        // resizeMode='contain'
        // style={{ flex: 1, width: width, backgroundColor: "#1263AC" }}
        source={require('../../../assets/images/feverNewLogo.png')}
        resizeMode="stretch"
        // style={{
          // width: wp(70),
          // height: hp(20),
          // marginTop: hp(10),
          // alignItems: 'center',
          // justifyContent: 'center',
          // alignSelf: 'center',
        // }}
        // style={{ flex: 1, width: width, backgroundColor: "#1263AC" }}
        style={{ flex: 1, width: wp(100), height: hp(100), alignItems: 'center', justifyContent: 'center' }}
        >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            // backgroundColor: '#eee',
            flex: 1,
            // width: width,
            justifyContent: 'center',
            // alignItems: 'center',
            // marginBottom: 100,
          }}>
          <Text
            style={{
              fontSize: hp(3),
              color: '#1263AC',
              alignSelf: 'center',
              marginTop: hp(7),
              fontFamily: mainFont,
              fontWeight: 'bold',
            }}>
            Login
          </Text>
          <View style={{width: wp(90), alignSelf: 'center', marginTop: hp(2)}}>
            {/* Password sectio
                            n >>>>>>>>>>>>>>>>>>>>>*/}
            <Text style={{color: '#1263AC'}}>Password</Text>
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
              }}>
              <Lock
                name="lock"
                style={{
                  height: wp(5.5),
                  width: wp(5.5),
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
                style={{marginLeft: 5, width: wp(70)}}
              />
              <Pressable onPress={() => setHide(!hide)}>
                {hide ? (
                  <Openeye_closeEye
                    name="eye-off"
                    style={{
                      height: wp(5.5),
                      width: wp(5.5),
                      color: 'grey',
                      fontSize: hp(3),
                    }}
                  />
                ) : (
                  <Openeye_closeEye
                    name="eye"
                    style={{
                      height: wp(5.5),
                      width: wp(5.5),
                      color: 'grey',
                      fontSize: hp(3),
                    }}
                  />
                )}
              </Pressable>
            </View>
            <Pressable
              onPress={() => navigation.navigate('ForgotPassword')}
              style={{alignSelf: 'flex-end', marginTop: 8}}>
              <Text style={{color: '#1263AC'}}>Forgot Password</Text>
            </Pressable>
            {/* Button section >>>>>>>>>>>>>>>>>> */}
            <TouchableOpacity
              onPress={() => handleLogin()}
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
                style={{color: 'white', fontFamily: 'AvenirNextLTPro-Regular'}}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      </TouchableWithoutFeedback>

      </ImageBackground>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => closeModal()}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          
          <View style={{ backgroundColor: '#ececec', padding: 20, borderRadius: 10, width: '80%' }}>
          <Lock name="lock" style={{ height: wp(5.5), width: wp(5.5), color: 'grey', fontSize: hp(2.8) , alignSelf:"center",marginBottom:10, }} />
            <Text style={{ fontSize: 18, fontWeight:'normal', textAlign: 'center', marginBottom: 20 }}>Are you sure you want to log out from another device and log in here?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => closeModal()} style={{ padding: 10, backgroundColor: '#fa1640', borderRadius: 5 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { closeModal(); handleLogin(); }} style={{ padding: 10, backgroundColor: '#1263AC', borderRadius: 5 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}



<Modal
  animationType="slide"
  transparent={true}
  visible={showModal}
  onRequestClose={() => closeModal()}
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View style={{ backgroundColor: '#ececec', padding: 20, borderRadius: 10, width: '80%' }}>
      <Lock name="lock" style={{ height: wp(5.5), width: wp(5.5), color: 'grey', fontSize: hp(2.8), alignSelf: "center", marginBottom: 10 }} />
      <Text style={{ fontSize: 18, fontWeight: 'normal', textAlign: 'center', marginBottom: 20 }}>Are you sure you want to log out from another device and log in here?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => closeModal()} style={{ flex: 1, marginRight: 10, backgroundColor: '#fa1640', borderRadius: 5,padding:10 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => { closeModal(); ProceedToLogin(); }} style={{ flex: 1, marginLeft: 10, backgroundColor: '#1263AC', borderRadius: 5,padding:10 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>


    </View>
  );
};

export default Password;
