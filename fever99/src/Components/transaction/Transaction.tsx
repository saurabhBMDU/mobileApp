import {View, Text,Image, FlatList, Dimensions, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {toastError} from '../../utils/toast.utils';
import Headerr from '../../ReuseableComp/Headerr';
import {getWallet} from '../../Services/wallet.service';

import Profiles_setting_icons from 'react-native-vector-icons/AntDesign';
import Money_icons from 'react-native-vector-icons/FontAwesome';
import Calendar_icons from 'react-native-vector-icons/FontAwesome5';
import Descriptyin_icosn from 'react-native-vector-icons/MaterialIcons';
import Credit_icosn from 'react-native-vector-icons/SimpleLineIcons';
import Loding_service from '../../All_Loding_page/Loding_service';
import moment from 'moment';

import Right_Icons from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
// import { Image } from 'react-native-svg';


const {height, width} = Dimensions.get('window');
export default function Transactions() {


  const navigation: any = useNavigation();
  const mainFont = 'Montserrat-Regular';
  const mainFontBold = 'Montserrat-Bold';
  const [userObj, setUserObj] = useState<any>({});
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rechargeAmounterr, setRechargeAmounterr] = useState('')
  const [amount, setAmount] = useState('');
  
  const focused = useIsFocused();

  const handleGetWallet = async () => {
    try {
      let {data: res}: any = await getWallet();
      console.log('this is my respons', res);

      if (res) {
        setWallet(res?.data?.transactions?.reverse());
        setBalance(res?.data?.balance);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // toastError(err);
    }
  };

  useEffect(() => {
    if (focused) {
      handleGetWallet();
    }
  }, [focused]);









  const [paymentModal, setPaymentModal] = useState(false);

  // const mainFont = 'Montserrat-Regular';
  // const mainFont = 'Montserrat-Regular';
  
  
  
    const HandleAddAmountToWallet = async () => {
      let tempAmount = parseInt(`${amount}`) || 0;
      if (!tempAmount) {
        setRechargeAmounterr("Please enter amount")
        return;
      }
      if (tempAmount < 10) {
        setRechargeAmounterr("The amount should exceed 10.");
        return;
      }
      try {
        setPaymentModal(false);
        navigation.navigate('PayementScreen', { amount: tempAmount, });
      } catch (error) {
        // toastError(error);
      }
    }


  return (
    <View>
      <Headerr
        secndheader={true}
        secondText={`Wallet balance : ₹${balance}`}
        label={`Wallet balance : ₹${balance}`}
        btn={false}
      />

                  <TouchableOpacity
                  onPress={() => setPaymentModal(true)}
                  style={styles.clickbleLines}>
                    <Money_icons name="money" style={styles.allIconsStyle} />
                    <Text
                      style={{
                        fontSize: hp(1.8),
                        color: '#fff',
                        fontFamily: mainFont,
                        marginLeft: wp(2),
                      }}>
                     Wallet Recharge
                    </Text>
                </TouchableOpacity>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={wallet}
        ListEmptyComponent={
          <>
            {loading ? (
              <View>
                <Loding_service />
                <Loding_service />
                <Loding_service />
              </View>
            ) : (
              <View
                style={{
                  display: 'flex',
                  height: height,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: hp(2)}}>No Transactions found </Text>
              </View>
            )}
          </>
        }
        removeClippedSubviews={true}
        contentContainerStyle={{paddingBottom: hp(10)}}
        renderItem={({item, index}: any) => {
          const timestamp = new Date(item.timestamp);

          const formattedDate = `${('0' + (timestamp.getMonth() + 1)).slice(
            -2,
          )}-${('0' + timestamp.getDate()).slice(
            -2,
          )}-${timestamp.getFullYear()}`;

          return (
            <View
              style={{
                width: width,
                paddingTop: hp(0.75),
                paddingBottom: hp(2),
                backgroundColor: item.type == 'debit' ? '#F3ECEF' : '#E9F5F3',
                elevation: 3,
                marginBottom: hp(2),
              }}>
              <View style={{width: width, flexDirection: 'row'}}>
                <View
                  style={{
                    width: wp(100),
                    paddingLeft: wp(3),
                    paddingTop: hp(1),
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Profiles_setting_icons
                        name="profile"
                        style={styles.iconsStyls}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        S.no:
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: 'gray', fontSize: hp(2)}}>
                        {index + 1}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Calendar_icons
                        name="calendar-day"
                        style={styles.iconsStyls}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        Date and Time:
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: 'gray', fontSize: hp(2)}}>
                        {moment(item.timestamp).format('DD-MM-YYYY hh:mm a')}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Credit_icosn
                        name="credit-card"
                        style={styles.iconsStyls}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        Types:
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: 'gray',
                          textTransform: 'capitalize',
                          fontSize: hp(2),
                        }}>
                        {item?.type}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Money_icons name="money" style={styles.iconsStyls} />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        Amount:
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: 'gray', fontSize: hp(2)}}>
                        ₹ {item?.amount}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Descriptyin_icosn
                        name="description"
                        style={styles.iconsStyls}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        Description:
                      </Text>
                    </View>
                    <View style={{width: wp(50)}}>
                      <Text style={{color: 'gray', fontSize: hp(2)}}>
                        {item?.message}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />

<Modal
                  isVisible={paymentModal}
                  animationIn={'bounceIn'}
                  animationOut={'slideOutDown'}
                  onBackButtonPress={() => { setPaymentModal(false), setRechargeAmounterr('') }}
                  style={{ marginLeft: 0, marginRight: 0 }}>
                  <View style={styles.modalView}>

                    <View style={styles.textAndClose}>
                      <Text style={[styles.modalhi,{fontFamily:mainFont}]}>
                        Recharge Amount
                      </Text>
                      <TouchableOpacity
                        onPress={() => { setPaymentModal(false), setRechargeAmounterr('') }}>
                        <Image
                          source={require('../../../assets/images/close.png')}
                          style={{ tintColor: '#FA6C23', height: wp(4), width: wp(4) }}
                        />
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      placeholder="Amount"
                      keyboardType="number-pad"
                      style={styles.modalInputfilde}
                      onChangeText={(e: any) => setAmount(e)}
                      value={`${amount}`}
                      placeholderTextColor="gray"
                    />
                    <Text style={{ color: "red" }}>{rechargeAmounterr}</Text>
                    <TouchableOpacity
                      onPress={() => HandleAddAmountToWallet()}
                      style={styles.modalBtn}>
                      <Text style={[styles.modlaSubmittext,{fontFamily: mainFont}]}>
                        Recharge
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>


    </View>
  );
}
const styles = StyleSheet.create({
  common_displayFlex: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  flexSTYLES: {
    flexDirection: 'row',
    width: wp(45),
  },
  iconsStyls: {
    color: '#1263AC',
    fontSize: hp(2.2),
    marginRight: wp(3),
    marginVertical: 4,
  },

  //new 
  allIconsStyle: {
    color: '#fff',
    fontSize: hp(3.4),
  },

  clickbleLines: {
    // width: wp(95),
    flexDirection: 'row',
    backgroundColor: '#07cddb',
    height: hp(5.5),
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: wp(3),
    // paddingLeft: wp(3),
    borderRadius: wp(5),
    marginTop: hp(2),
    alignSelf:"center",
    justifyContent:'center',
    padding:10,
    marginBottom:10,
  },
  modalView: {
    width: wp(85),
    paddingTop: hp(3),
    paddingBottom: hp(3),
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 5,
    paddingLeft: wp(4),
    paddingRight: wp(4),
  },
  modalhi: {
    fontSize: hp(2),
    color: 'black',
    // fontFamily: mainFont,
    fontWeight: 'bold',
  },
  modalInputfilde: {
    marginTop: 15,
    color: 'gray',
    backgroundColor: '#e6edf7',
    fontSize: hp(2)
  },
  modalBtn: {
    height: hp(5),
    width: wp(77),
    maxWidth: hp(80),
    alignSelf: 'center',
    marginTop: hp(1),
    backgroundColor: '#1263AC',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modlaSubmittext: {
    color: 'white',
    // fontFamily: mainFont,
    fontSize: hp(1.8),
  },
  closeIcon: {
    fontSize: hp(5),
    padding: 3,
    backgroundColor: '#dfeefc',
    color: '#1263AC',
    borderRadius: wp(40),
  },
  textAndClose: {
    flexDirection: "row",
    justifyContent: "space-between",
  }

});
