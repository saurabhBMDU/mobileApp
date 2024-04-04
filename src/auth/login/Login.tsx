import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../../../App';
import { toastError } from '../../utils/toast.utils';
import Mail_icons from 'react-native-vector-icons/Entypo';
const { height, width } = Dimensions.get('window');
import { useNetInfo } from '@react-native-community/netinfo';

const Login = () => {
  // checking internet connection
  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;
  const mainFont = 'Montserrat-Regular';
  const navigation: any = useNavigation();
  const [agree, setAgree] = useState(false);
  const [user, setUser] = useContext(LoginContext);
  const [email, setEmail] = useState('');

  const handleRedirectToNextScreen = () => {
    if (email == '') {
      toastError('Email is mandatory !!!');
      return;
    }
    navigation.navigate('Password', { data: email });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <StatusBar backgroundColor={isConnected ? '#102D47' : '#cc5933'} />
          <View
            style={{
              backgroundColor: isConnected ? '#8f4608' : '#cc5933',
              width: width,
              alignItems: 'center',
            }}>
            {!isConnected && (
              <Text style={{ fontSize: 18, color: '#fff' }}>
                Verify Your Connection
              </Text>
            )}
          </View>
        </View>
        <View style={{ width: width, justifyContent: "center", alignItems: "center" }}>
          <Image source={require('../../../assets/images/Logo.png')} style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: height * 0.15,
            resizeMode: 'center',
            marginTop: height * 0.1
          }} />
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 40

            }}>
            <Text style={[styles.login_Text, { fontFamily: mainFont, color: 'black', fontWeight: 'bold' },]}>Sign</Text>
            <Text
              style={[styles.login_Text, {
                fontFamily: mainFont,
                color: '#1263AC',
                fontWeight: 'bold',
                marginLeft: 10,
              }]}>In</Text>
          </View>
          <View
            style={{ width: width * 0.9, alignSelf: 'center', marginTop: height * 0.02 }}>
            {/* Email section */}
            <Text style={{ color: '#1263AC', fontWeight: 'bold', fontSize: 18 }}>
              Mobile Number/Email
            </Text>
            <View
              style={{
                width: '100%',
                height: 45,
                backgroundColor: '#E8E8E8',
                marginTop: 10,
                borderRadius: 5,
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Mail_icons
                name="mail"
                style={{
                  color: 'grey',
                  fontSize: 22,
                }}
              />
              <TextInput
                placeholder="Enter Mobile Number or Email"
                placeholderTextColor="gray"
                onChangeText={e => setEmail(e)}
                value={email}
                style={{ marginLeft: 5, width: width * 0.7, fontSize: 16 }}
              />
            </View>

            {/* Button section */}
            <TouchableOpacity
              onPress={() => handleRedirectToNextScreen()}
              style={[
                styles.both_reg_continew_BTN,
                { backgroundColor: '#1263AC', borderColor: '#1263AC' },
              ]}>
              <Text style={styles.register_And_Continew}>SIGN IN</Text>
            </TouchableOpacity>
            {/* Or Section */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1263AC',
                fontFamily: 'AvenirNextLTPro-Regular',
                alignSelf: 'center',
                padding: 10,
              }}>
              Or
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 17 }}>Don't have an account</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    color: '#1263AC',
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}> SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View></View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  login_Text: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
    marginTop: 70,
  },
  register_And_Continew: {
    color: 'white',
    fontFamily: 'AvenirNextLTPro-Regular',
    fontSize: 18
  },
  Both_small_Line: {
    width: 150,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  both_reg_continew_BTN: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
