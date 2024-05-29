import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from '../Services/axios.service';
import url from '../Services/url.service';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Headerr from '../ReuseableComp/Headerr';
import {getDoctorWithBankDetails, getUser, setUser, updateSlot} from '../Services/user.service';
import {toastError, toastSuccess} from '../utils/toast.utils';
// import { navigationRef } from '../Navigation/Root';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {generateFilePath} from '../Services/url.service';
import Notification_icons from 'react-native-vector-icons/MaterialIcons';
import {Roles} from '../utils/constant';
import InterNetError from '../noInterNet/InterNetError';
import {useNetInfo} from '@react-native-community/netinfo';

export default function Settings() {
  // internet connection
  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;
  const mainFont = 'Montserrat-Regular';
  const mainFontBold = 'Montserrat-Bold';
  const mainFontmedium = 'Montserrat-Medium';
  const navigation = useNavigation();
  const [isGenderFocused, setIsGenderFocused] = useState(false);
  const Dropdwndata = [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ];

  const [option, setOption] = useState([{"label": "12:00 AM  12:15 AM", "value": "12:00 AM  12:15 AM"}, {"label": "12:15 AM  12:30 AM", "value": "12:15 AM  12:30 AM"}, {"label": "12:30 AM  12:45 AM", "value": "12:30 AM  12:45 AM"}, {"label": "12:45 AM  1:00 AM", "value": "12:45 AM  1:00 AM"}, {"label": "1:00 AM  1:15 AM", "value": "1:00 AM  1:15 AM"}, {"label": "1:15 AM  1:30 AM", "value": "1:15 AM  1:30 AM"}, {"label": "1:30 AM  1:45 AM", "value": "1:30 AM  1:45 AM"}, {"label": "1:45 AM  2:00 AM", "value": "1:45 AM  2:00 AM"}, {"label": "2:00 AM  2:15 AM", "value": "2:00 AM  2:15 AM"}, {"label": "2:15 AM  2:30 AM", "value": "2:15 AM  2:30 AM"}, {"label": "2:30 AM  2:45 AM", "value": "2:30 AM  2:45 AM"}, {"label": "2:45 AM  3:00 AM", "value": "2:45 AM  3:00 AM"}, {"label": "3:00 AM  3:15 AM", "value": "3:00 AM  3:15 AM"}, {"label": "3:15 AM  3:30 AM", "value": "3:15 AM  3:30 AM"}, {"label": "3:30 AM  3:45 AM", "value": "3:30 AM  3:45 AM"}, {"label": "3:45 AM  4:00 AM", "value": "3:45 AM  4:00 AM"}, {"label": "4:00 AM  4:15 AM", "value": "4:00 AM  4:15 AM"}, {"label": "4:15 AM  4:30 AM", "value": "4:15 AM  4:30 AM"}, {"label": "4:30 AM  4:45 AM", "value": "4:30 AM  4:45 AM"},{"label": "04:30 AM  04:45 AM", "value": "04:30 AM  04:45 AM"}, {"label": "4:45 AM  5:00 AM", "value": "4:45 AM  5:00 AM"}, {"label": "5:00 AM  5:15 AM", "value": "5:00 AM  5:15 AM"}, {"label": "5:15 AM  5:30 AM", "value": "5:15 AM  5:30 AM"}, {"label": "5:30 AM  5:45 AM", "value": "5:30 AM  5:45 AM"}, {"label": "5:45 AM  6:00 AM", "value": "5:45 AM  6:00 AM"}, {"label": "6:00 AM  6:15 AM", "value": "6:00 AM  6:15 AM"}, {"label": "6:15 AM  6:30 AM", "value": "6:15 AM  6:30 AM"}, {"label": "6:30 AM  6:45 AM", "value": "6:30 AM  6:45 AM"}, {"label": "6:45 AM  7:00 AM", "value": "6:45 AM  7:00 AM"}, {"label": "7:00 AM  7:15 AM", "value": "7:00 AM  7:15 AM"}, {"label": "7:15 AM  7:30 AM", "value": "7:15 AM  7:30 AM"}, {"label": "7:30 AM  7:45 AM", "value": "7:30 AM  7:45 AM"}, {"label": "7:45 AM  8:00 AM", "value": "7:45 AM  8:00 AM"}, {"label": "8:00 AM  8:15 AM", "value": "8:00 AM  8:15 AM"}, {"label": "8:15 AM  8:30 AM", "value": "8:15 AM  8:30 AM"}, {"label": "8:30 AM  8:45 AM", "value": "8:30 AM  8:45 AM"}, {"label": "8:45 AM  9:00 AM", "value": "8:45 AM  9:00 AM"}, {"label": "9:00 AM  9:15 AM", "value": "9:00 AM  9:15 AM"}, {"label": "9:15 AM  9:30 AM", "value": "9:15 AM  9:30 AM"}, {"label": "9:30 AM  9:45 AM", "value": "9:30 AM  9:45 AM"}, {"label": "9:45 AM  10:00 AM", "value": "9:45 AM  10:00 AM"}, {"label": "10:00 AM  10:15 AM", "value": "10:00 AM  10:15 AM"}, {"label": "10:15 AM  10:30 AM", "value": "10:15 AM  10:30 AM"}, {"label": "10:30 AM  10:45 AM", "value": "10:30 AM  10:45 AM"}, {"label": "10:45 AM  11:00 AM", "value": "10:45 AM  11:00 AM"}, {"label": "11:00 AM  11:15 AM", "value": "11:00 AM  11:15 AM"}, {"label": "11:15 AM  11:30 AM", "value": "11:15 AM  11:30 AM"}, {"label": "11:30 AM  11:45 AM", "value": "11:30 AM  11:45 AM"}, {"label": "11:45 AM  12:00 PM", "value": "11:45 AM  12:00 PM"}, {"label": "12:00 PM  12:15 PM", "value": "12:00 PM  12:15 PM"}, {"label": "12:15 PM  12:30 PM", "value": "12:15 PM  12:30 PM"}, {"label": "12:30 PM  12:45 PM", "value": "12:30 PM  12:45 PM"}, {"label": "12:45 PM  1:00 PM", "value": "12:45 PM  1:00 PM"}, {"label": "1:00 PM  1:15 PM", "value": "1:00 PM  1:15 PM"}, {"label": "1:15 PM  1:30 PM", "value": "1:15 PM  1:30 PM"}, {"label": "1:30 PM  1:45 PM", "value": "1:30 PM  1:45 PM"}, {"label": "1:45 PM  2:00 PM", "value": "1:45 PM  2:00 PM"}, {"label": "2:00 PM  2:15 PM", "value": "2:00 PM  2:15 PM"}, {"label": "2:15 PM  2:30 PM", "value": "2:15 PM  2:30 PM"}, {"label": "2:30 PM  2:45 PM", "value": "2:30 PM  2:45 PM"}, {"label": "2:45 PM  3:00 PM", "value": "2:45 PM  3:00 PM"}, {"label": "3:00 PM  3:15 PM", "value": "3:00 PM  3:15 PM"}, {"label": "3:15 PM  3:30 PM", "value": "3:15 PM  3:30 PM"}, {"label": "3:30 PM  3:45 PM", "value": "3:30 PM  3:45 PM"}, {"label": "3:45 PM  4:00 PM", "value": "3:45 PM  4:00 PM"}, {"label": "4:00 PM  4:15 PM", "value": "4:00 PM  4:15 PM"}, {"label": "4:15 PM  4:30 PM", "value": "4:15 PM  4:30 PM"}, {"label": "4:30 PM  4:45 PM", "value": "4:30 PM  4:45 PM"}, {"label": "4:45 PM  5:00 PM", "value": "4:45 PM  5:00 PM"}, {"label": "5:00 PM  5:15 PM", "value": "5:00 PM  5:15 PM"}, {"label": "5:15 PM  5:30 PM", "value": "5:15 PM  5:30 PM"}, {"label": "5:30 PM  5:45 PM", "value": "5:30 PM  5:45 PM"}, {"label": "5:45 PM  6:00 PM", "value": "5:45 PM  6:00 PM"}, {"label": "6:00 PM  6:15 PM", "value": "6:00 PM  6:15 PM"}, {"label": "6:15 PM  6:30 PM", "value": "6:15 PM  6:30 PM"}, {"label": "6:30 PM  6:45 PM", "value": "6:30 PM  6:45 PM"}, {"label": "6:45 PM  7:00 PM", "value": "6:45 PM  7:00 PM"}, {"label": "7:00 PM  7:15 PM", "value": "7:00 PM  7:15 PM"}, {"label": "7:15 PM  7:30 PM", "value": "7:15 PM  7:30 PM"}, {"label": "7:30 PM  7:45 PM", "value": "7:30 PM  7:45 PM"}, {"label": "7:45 PM  8:00 PM", "value": "7:45 PM  8:00 PM"}, {"label": "8:00 PM  8:15 PM", "value": "8:00 PM  8:15 PM"}, {"label": "8:15 PM  8:30 PM", "value": "8:15 PM  8:30 PM"}, {"label": "8:30 PM  8:45 PM", "value": "8:30 PM  8:45 PM"}, {"label": "8:45 PM  9:00 PM", "value": "8:45 PM  9:00 PM"}, {"label": "9:00 PM  9:15 PM", "value": "9:00 PM  9:15 PM"}, {"label": "9:15 PM  9:30 PM", "value": "9:15 PM  9:30 PM"}, {"label": "9:30 PM  9:45 PM", "value": "9:30 PM  9:45 PM"}, {"label": "9:45 PM  10:00 PM", "value": "9:45 PM  10:00 PM"}, {"label": "10:00 PM  10:15 PM", "value": "10:00 PM  10:15 PM"}, {"label": "10:15 PM  10:30 PM", "value": "10:15 PM  10:30 PM"}, {"label": "10:30 PM  10:45 PM", "value": "10:30 PM  10:45 PM"}, {"label": "10:45 PM  11:00 PM", "value": "10:45 PM  11:00 PM"}, {"label": "11:00 PM  11:15 PM", "value": "11:00 PM  11:15 PM"}, {"label": "11:15 PM  11:30 PM", "value": "11:15 PM  11:30 PM"}, {"label": "11:30 PM  11:45 PM", "value": "11:30 PM  11:45 PM"}, {"label": "11:45 PM  12:00 AM", "value": "11:45 PM  12:00 AM"}]);


  // const [option, setOption] = useState([])

  const [timeSlot, setTimeSlot] = useState([]);

  console.log('time slot is here',timeSlot)

  const [timeSlotoffline, setTimeSlotoffline] = useState([]);

  const focused = useIsFocused();

  const [name, setName] = useState('');
  const [emailid, setEmailid] = useState('');
  const [gender, setGender] = useState('');

  const [profilePhoto, setProfilePhoto] = useState('');
  const [email, setemail] = useState();
  const [image, setImage] = useState<any>('');
  // const [serviceCharge, setServiceCharge] = useState('');
  // const [address, setAddress] = useState('');
  // const [pinCode, setPinCode] = useState('');
  // const [state, setState] = useState('');
  const [mobile, setMobile] = useState('');
  // const [specialization, setSpecialization] = useState('');
  // const [abhaid, setAbhaid] = useState('');
  const [userObj, setUserObj] = useState<any>('');
  // const [isNotification, setIsNotification] = useState('OFF');


  const [accountNumber, setaccountNumber] = useState('');
  const [ifsc, setifsc] = useState('');
  const [bankName, setbankName] = useState('');
  const [customerName, setcustomerName] = useState('');
  const [branchName, setbranchName] = useState('');
  const [upiId, setupiId] = useState('');
  const [upiNumber, setupiNumber] = useState('');



  

  const handleGetAndSetUser = async () => {
    // alert('workig')
    let userData = await getUser();
    setName(userData?.name);
    setemail(userData?.email);
    setMobile(userData?.mobile);
    setGender(userData?.gender);
    console.log('user data',userData)

    //  let {data : res}  any =  await  getDoctorWithBankDetails(userData._id)
     let {data: res}: any = await getDoctorWithBankDetails(userData._id);

   console.log('detail all for doctor and other-------=', res.data.data.timeSlotoffline)
    
    //setting account details 
    // setaccountNumber(res.data.extraDetail.accountNumber)

    console.log('account number',accountNumber)

    if (userData) {
      // console.log('all user data with details ',userData)
      setUserObj(userData);
      setGender(res?.data?.data?.gender);
      setImage(res?.data?.data?.image);
      // setServiceCharge(res?.data?.data?.serviceCharge);
      // setAddress(res?.data?.data?.address);
      setName(res?.data?.data?.name);
      // setPinCode(userData?.pinCode);
      // setState(userData?.state);
      setMobile(res?.data?.data?.mobile);
      // setSpecialization(userData?.specialization);
      // setAbhaid(userData?.abhaid);
      setemail(res?.data?.data?.email);
      setProfilePhoto(res?.data?.data?.image);
      // setTimeSlot(userData?.timeSlot.map((el: any) => el.value));
      setTimeSlot(res?.data?.data?.timeSlot.map((el: any) => el.label));
      // setOption(userData?.timeSlot); 
      setTimeSlotoffline(res?.data?.data?.timeSlotoffline.map((el: any) => el.value));
      // setIsNotification(userData?.isNotification);

      //setting all bank details
      setaccountNumber(res.data.extraDetail.accountNumber);
      setifsc(res.data.extraDetail.ifsc)
      setbankName(res.data.extraDetail.bankName)
      setcustomerName(res.data.extraDetail.customerName)
      setbranchName(res.data.extraDetail.branchName)
      setupiId(res.data.extraDetail.upiId)
      setupiNumber(res.data.extraDetail.upiNumber)
    }
  };

  useEffect(() => {
    // if (focused) {
      handleGetAndSetUser();
    // }
  }, []);

  const handleSubmit = async () => {
    try {
      let obj: any = {
        // name,
        // email,
        // gender,
      };
      if (userObj.role == Roles.DOCTOR) {
        obj.timeSlot = timeSlot.map(el => ({label: el, value: el}));
        obj.timeSlotoffline = timeSlotoffline.map(el => ({
          label: el,
          value: el,
        }));
      }
      console.log('sending time slot to backend ',obj)
      let {data: res}: any = await updateSlot(obj);
      if (res) {
        await setUser(res.data);
        toastSuccess(res.message);
        handleGetAndSetUser();
        setUserObj(res.data);
        // setTimeSlot(res?.data?.timeSlot.map((el: any) => el.value));
        setOption(res?.data?.timeSlot.map((el: any) => el.value))
        setTimeSlotoffline(
          res?.data?.timeSlotoffline.map((el: any) => el.value),
        );
        navigation.goBack();
      }
    } catch (error) {
      toastError(error);
    }
  };
  const handleRenderProfilePhoto = () => {
    if (image && image?.uri && image?.uri != '') {
      return {uri: image?.uri};
    } else if (
      profilePhoto &&
      profilePhoto != '' &&
      profilePhoto.includes('file')
    ) {
      return {uri: generateFilePath(profilePhoto)};
    } else {
      return require('../../assets/images/profile.png');
    }
  };


  // const

  const BankInfo = async () => {
    // Validate required fields
    if (
      !accountNumber ||
      !ifsc ||
      !bankName ||
      !customerName ||
      !branchName ||
      !upiId ||
      !upiNumber
    ) {
      toastError('All fields are mandatory');
      return;
    }
    // const getRespons = async () => {
      console.log(`${url}/doctor-detail/${userObj?._id}`);
      const response = await axios.get(`${url}/doctor-detail/${userObj?._id}`);
      console.log(response);
    // };
    // useEffect(() => {
    //   getRespons();
    // }, [focused]);

    const allResponsData = {
      accountNumber : accountNumber,
      ifsc:ifsc,
      bankName:bankName,
      customerName:customerName,
      branchName:branchName,
      upiId:upiId,
      upiNumber:upiNumber,
    };

    console.log('this is the data ',allResponsData)

    try {
      const response = await axios.post(
        `${url}/account-information`,
        allResponsData,
      );
      console.log('resposne for account details',response.data)
      if (response.status === 200) {
        toastSuccess('Account details successfully added');
      } else {
        toastError('Unable to add Account details');
      }
    } catch (error) {
      console.error('Error adding account details:', error);
      toastError('Error adding account details');
    }
  };

  // useEffect(() => {
  //   if (focused) {
  //     function generateTimeArray() {
  //       const times = [];
  //       for (let hours = 0; hours < 24; hours++) {
  //         for (let minutes = 0; minutes < 59; minutes += 15) {
  //           const ampm = hours >= 12 ? 'PM' : 'AM';
  //           const formattedHours = hours % 12 || 12;
  //           const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  //           const startTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  //           // Calculate the next 15-minute interval
  //           const nextHours = (hours + Math.floor((minutes + 15) / 60)) % 24;
  //           const nextAmPm = nextHours >= 12 ? 'PM' : 'AM';
  //           const formattedNextHours = nextHours % 12 || 12;
  //           const nextMinutes = (minutes + 15) % 60;
  //           const formattedNextMinutes =
  //             nextMinutes < 10 ? `0${nextMinutes}` : nextMinutes;
  //           const endTime = `${formattedNextHours}:${formattedNextMinutes} ${nextAmPm}`;
  //           // Concatenate the start and end times with a space
  //           times.push({
  //             label: `${startTime}  ${endTime}`,
  //             value: `${startTime}  ${endTime}`,
  //           });
  //         }
  //       }
  //       return times;
  //     }

  //     const timeArray = generateTimeArray();
  //     console.log('generate time is here',timeArray)
  //     setOption(timeArray);
  //   }
  // }, [focused]);




  // Notofication on and off code

  // const handleNotificationToggle = async () => {
  //   try {
  //     const response = await axios.put(`${url}/notification-alert`, {
  //       isNotification: isNotification,
  //     });
  //     if (response.status === 200) {
  //       handleGetAndSetUser();
  //     } else {
  //       throw new Error('Failed to update notification setting');
  //     }
  //   } catch (error: any) {
  //     console.error('Error toggling notification:', error.message);
  //   }
  // };





  if (isConnected === false) {
    return <InterNetError labels={'Setting'} />;
  } else {
    return (
      <View style={{flex: 1, paddingBottom: 25}}>
        <Headerr secndheader={true} label="Setting" />

        <ScrollView
          style={{paddingHorizontal: 10, backgroundColor: '#fff'}}
          showsVerticalScrollIndicator={false}>
          {/* <TouchableOpacity onPress={handleNotificationToggle}> */}
            {/* <Notification_icons
              name={
                isNotification === 'ON' ? 'notifications-off' : 'notifications'
              }
              style={styles.notificationIcons}
            /> */}
          {/* </TouchableOpacity> */}
          <View style={{alignItems: 'center', marginBottom: hp(5)}}>
            <Image
              source={handleRenderProfilePhoto()}
              style={{
                width: wp(20),
                height: wp(20),
                borderRadius: 50,
                objectFit: 'contain',
              }}
            />
          </View>
          <Text
            style={{
              fontFamily: mainFontmedium,
              fontSize: hp(2.6),
              color: '#1263AC',
            }}>
            Basic Informations 
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(1),
              justifyContent: 'space-between',
            }}>
            <View style={{width: wp(95)}}>
              <Text
                style={{
                  fontSize: hp(1.8),
                  fontFamily: mainFont,
                  color: 'black',
                }}>
                Name:
              </Text>
              <TextInput
                placeholderTextColor="#8E8E8E"
                placeholder="Name"
                onChangeText={e => setName(e)}
                value={name}
                style={styles.inputfildeStyle}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(1),
              justifyContent: 'space-between',
            }}>
            <View style={{width: wp(95)}}>
              <Text
                style={{
                  fontSize: hp(1.8),
                  fontFamily: mainFont,
                  color: 'black',
                }}>
                Email Id
              </Text>
              <TextInput
                placeholderTextColor="#8E8E8E"
                placeholder="Email Id"
                editable={false}
                onChangeText={e => setEmailid(e)}
                value={email}
                style={styles.inputfildeStyle}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(1),
              justifyContent: 'space-between',
            }}>
            <View style={{width: wp(95)}}>
              <Text
                style={{
                  fontSize: hp(1.8),
                  fontFamily: mainFont,
                  color: 'black',
                }}>
                Phone
              </Text>
              <TextInput
                placeholderTextColor="#8E8E8E"
                placeholder="Email Id"
                editable={false}
                value={mobile}
                onChangeText={e => setMobile(e)}
                style={styles.inputfildeStyle}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(1),
              justifyContent: 'space-between',
            }}>
            <View style={{width: wp(95)}}>
              <Text
                style={{
                  fontSize: hp(1.8),
                  fontFamily: mainFont,
                  color: 'black',
                }}>
                Gender:
              </Text>
              <Dropdown
                style={[
                  styles.dropdown1,
                  isGenderFocused && {borderColor: 'blue', borderWidth: 0.5},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={Dropdwndata}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Gender"
                value={gender}
                onFocus={() => setIsGenderFocused(true)}
                onBlur={() => setIsGenderFocused(false)}
                onChange={item => {
                  setGender(item.value);
                  setIsGenderFocused(false);
                }}
              />
            </View>
          </View>
          {(userObj?.role == Roles.DOCTOR ||
            userObj?.role == Roles.FRANCHISE) && (
            <>
              <Text
                style={{
                  fontFamily: mainFontmedium,
                  fontSize: hp(2.6),
                  color: '#1263AC',
                  marginTop: hp(1),
                }}>
                Bank Info
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp(1),
                  justifyContent: 'space-between',
                }}>
                <View style={{width: wp(95)}}>
                  <Text
                    style={{
                      fontSize: hp(1.8),
                      fontFamily: mainFont,
                      color: 'black',
                      marginTop:hp(1)
                    }}>
                    Account Number
                  </Text>
                  <TextInput
                    placeholderTextColor="#8E8E8E"
                    placeholder="Account Number"
                    value={String(accountNumber)}
                    onChangeText={e => setaccountNumber(e)}
                    style={styles.inputfildeStyle}
                  />
                </View>
              </View>
              <View style={{width: wp(95)}}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontFamily: mainFont,
                    color: 'black',
                    marginTop:hp(1)
                  }}>
                  IFSC
                </Text>
                <TextInput
                  placeholderTextColor="#8E8E8E"
                  placeholder="IFSC"
                  value={ifsc}
                  onChangeText={e => setifsc(e)}
                  style={styles.inputfildeStyle}
                />
              </View>
              <View style={{width: wp(95)}}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontFamily: mainFont,
                    color: 'black',
                    marginTop:hp(1)
                  }}>
                  Bank Name
                </Text>
                <TextInput
                  placeholderTextColor="#8E8E8E"
                  placeholder="Bank Name"
                  value={bankName}
                  onChangeText={e => setbankName(e)}
                  style={styles.inputfildeStyle}
                />
              </View>
              <View style={{width: wp(95)}}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontFamily: mainFont,
                    color: 'black',
                    marginTop:hp(1)
                  }}>
                  Customer Name
                </Text>
                <TextInput
                  placeholderTextColor="#8E8E8E"
                  placeholder="Customer Name"
                  value={customerName}
                  onChangeText={e => setcustomerName(e)}
                  style={styles.inputfildeStyle}
                />
              </View>
              <View style={{width: wp(95)}}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontFamily: mainFont,
                    color: 'black',
                    marginTop:hp(1)
                  }}>
                  Branch Name
                </Text>
                <TextInput
                  placeholderTextColor="#8E8E8E"
                  placeholder="Branch Name"
                  value={branchName}
                  onChangeText={e => setbranchName(e)}
                  style={styles.inputfildeStyle}
                />
              </View>
              <View style={{width: wp(95)}}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontFamily: mainFont,
                    color: 'black',
                    marginTop:hp(1)
                  }}>
                  UPI id
                </Text>
                <TextInput
                  placeholderTextColor="#8E8E8E"
                  placeholder=" UPI id"
                  value={upiId}
                  onChangeText={e => setupiId(e)}
                  style={styles.inputfildeStyle}
                />
              </View>
              <View style={{width: wp(95)}}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontFamily: mainFont,
                    color: 'black',
                    marginTop:hp(1)
                  }}>
                  UPI Number
                </Text>
                <TextInput
                  placeholderTextColor="#8E8E8E"
                  placeholder="UPI Number"
                  value={String(upiNumber)}
                  onChangeText={e => setupiNumber(e)}
                  style={styles.inputfildeStyle}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: wp(95),
                  height: hp(5),
                  backgroundColor: '#50B148',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginVertical: 25,
                }}
                onPress={() => BankInfo()}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    color: 'white',
                    fontFamily: mainFontmedium,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </>
          )}

          {userObj?.role == Roles.DOCTOR && (
            <>
              <Text style={{marginTop: 10}}>
                Avaliable time slot For Appointment
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp(1),
                  justifyContent: 'space-between',
                }}>
                <View style={{width: wp(95)}}>
                  <Text
                    style={{
                      fontSize: hp(1.8),
                      fontFamily: mainFont,
                      color: 'black',
                    }}>
                    Select Time Slot (Online):
                  </Text>
                  <MultiSelect
                    style={styles.dropdown1}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    data={option}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Time Slot (Online):"
                    searchPlaceholder="Search..."
                    value={timeSlot}
                    onChange={(item: any) => {
                      console.log('item',item)
                      setTimeSlot(item);
                      console.log(item, 'item');
                    }}
                    renderLeftIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                      />
                    )}
                    selectedStyle={styles.selectedStyle}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp(1),
                  justifyContent: 'space-between',
                }}>
                <View style={{width: wp(95)}}>
                  <Text
                    style={{
                      fontSize: hp(1.8),
                      fontFamily: mainFont,
                      color: 'black',
                    }}>
                    Select Time Slot (Offline):
                  </Text>
                  <MultiSelect
                    style={styles.dropdown1}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    data={option}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Time Slot (Offline)"
                    searchPlaceholder="Search..."
                    value={timeSlotoffline}
                    onChange={(item: any) => {
                      setTimeSlotoffline(item);
                      console.log(item, 'item');
                    }}
                    renderLeftIcon={() => (
                      <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                      />
                    )}
                    selectedStyle={styles.selectedStyle}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={{
                  width: wp(94),
                  marginTop: hp(2),
                  height: hp(5),
                  backgroundColor: '#50B148',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    color: 'white',
                    fontFamily: mainFontmedium,
                  }}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dropdown1: {
    width: wp(95),
    height: hp(5.5),
    borderRadius: 3,
    paddingHorizontal: 8,
    marginTop: hp(1),
    backgroundColor: '#F1ECEC',
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingLeft: wp(1),
    paddingRight: wp(3),
  },
  inputfildeStyle: {
    width: wp(95),
    height: hp(5.5),
    marginTop: hp(0.5),
    backgroundColor: '#F1ECEC',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 3,
    paddingLeft: wp(1),
    paddingRight: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#8E8E8E',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#8E8E8E',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#8E8E8E',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  notificationIcons: {
    fontSize: hp(5),
    textAlign: 'right',
    color: 'red',
    padding: hp(1),
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
