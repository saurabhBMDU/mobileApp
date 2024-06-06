import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Headerr from '../ReuseableComp/Headerr';
import Openeye_closeEye from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import {generateFilePath} from '../Services/url.service';
import {
  deleteExperienceEducationForDoctorProfile,
  getDoctorWithBankDetails,
  getUser,
  setUser,
  updatePassword,
  updateProfile,
  updateProfileTo,
} from '../Services/user.service';

import {Roles} from '../utils/constant';
const {height, width} = Dimensions.get('window');
import {useNetInfo} from '@react-native-community/netinfo';
import InterNetError from '../noInterNet/InterNetError';
import AddWorkExperience from '../Components/ProfileExperience';
import ProfileEducation from '../Components/ProfileEducation';
import ProfileExperiencelist from '../Components/ProfileExperienceList';
import ProfileEducationGet from '../Components/ProfileEducationGet';
const EditProfile = () => {
  // checking internet connection
  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;
  const focused = useIsFocused();
  const mainFont = 'Montserrat-Regular';
  const mainFontBold = 'Montserrat-Bold';
  const mainFontmedium = 'Montserrat-Medium';
  const maincolor = '#1263AC';

  const navigation: any = useNavigation();

  const [profilePhoto, setProfilePhoto] = useState('');
  const [email, setemail] = useState();
  const [gender, setGender] = useState('Male');
  const [image, setImage] = useState<any>('');
  const [serviceCharge, setServiceCharge] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('');
  const [mobile, setMobile] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [abhaid, setAbhaid] = useState('');
  const [userObj, setUserObj] = useState<any>('');
  const [isLoading, setisLodings] = useState(true);

  const [timeSlot, setTimeSlot] = useState<any[]>([]);
  
  const [option, setOption] = useState<any[]>([]);

  // const languageKnownString = '[{"label":"English","value":"English"},{"label":"Hindi","value":"Hindi"}]';

  const indianLanguages = [
    {"label":"English","value":"English"},
    {"label":"Hindi","value":"Hindi"},
    {"label":"Assamese","value":"Assamese"},
    {"label":"Bengali","value":"Bengali"},
    {"label":"Bodo","value":"Bodo"},
    {"label":"Dogri","value":"Dogri"},
    {"label":"Gujarati","value":"Gujarati"},
    {"label":"Kannada","value":"Kannada"},
    {"label":"Kashmiri","value":"Kashmiri"},
    {"label":"Konkani","value":"Konkani"},
    {"label":"Maithili","value":"Maithili"},
    {"label":"Malayalam","value":"Malayalam"},
    {"label":"Manipuri","value":"Manipuri"},
    {"label":"Marathi","value":"Marathi"},
    {"label":"Nepali","value":"Nepali"},
    {"label":"Odia","value":"Odia"},
    {"label":"Punjabi","value":"Punjabi"},
    {"label":"Sanskrit","value":"Sanskrit"},
    {"label":"Santali","value":"Santali"},
    {"label":"Sindhi","value":"Sindhi"},
    {"label":"Tamil","value":"Tamil"},
    {"label":"Telugu","value":"Telugu"},
    {"label":"Urdu","value":"Urdu"}
  ];
  

  // const languageKnown = JSON.parse(languageKnownString);
 

  useEffect(()=> {
    // setTimeSlot(languageKnown)
    setOption(indianLanguages)
  },[])


  const transformSelectedLanguages = (selectedValues) => {
    return selectedValues.map(value => {
      const language = indianLanguages.find(lang => lang.value === value);
      return language ? { label: language.label, value: language.value } : null;
    }).filter(Boolean); // Remove any null values
  };


  const[Organization,setOrganization] = useState('');
  

  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [viewOldpasswd, setViewOldPasswd] = useState(true);
  const [viewPasswd, setViewPasswd] = useState(true);
  const [preView, setPreviewPasswd] = useState(true);

  const [addExperience, setAddExperience] = useState(false);
  const [addEducation, setAddEducation] = useState(false);
  const [addAboutMe,setAboutMe] = useState(false);

   const [experienceData,setExperienceData] = useState('');
   const [educationData,setEducationData] = useState('');

   const [aboutMeMessage,setAboutMeMessage] = useState('');

   const [showAboutMessage,setshowAboutMessage] = useState('');

  const handleGetAndSetUser = async () => {
    setisLodings(true);
    try {
      let userData = await getUser();

      let {data: res}: any = await getDoctorWithBankDetails(userData._id);

      console.log('detail', res?.data?.data.languageKnown)

      setOrganization(res?.data?.extraDetail?.currentOrganization)
      setEducationData(res?.data?.extraDetail?.education)
      setExperienceData(res?.data?.extraDetail?.experience)
      setshowAboutMessage(res?.data?.extraDetail?.aboutMe)
      setAboutMeMessage(res?.data?.extraDetail?.aboutMe)

      
      if(res?.data?.data && res?.data?.data?.languageKnown.length>0){
      const languageKnown = JSON.parse(res?.data?.data?.languageKnown);
      setTimeSlot(languageKnown);
    }
       
      if (userData) {
        setUserObj(userData);
        setGender(userData?.gender);
        setImage(userData?.image);
        setServiceCharge(userData?.serviceCharge);
        setAddress(userData?.address);
        setName(userData?.name);
        setPinCode(userData?.pinCode);
        setState(userData?.state);
        setMobile(userData?.mobile);
        setSpecialization(userData?.specialization);
        setAbhaid(userData?.abhaid);
        console.log('user data and apiid', abhaid);
        setemail(userData?.email);
        setProfilePhoto(userData?.image);
        setisLodings(false);
      }
    } catch (err) {
      alert(err);
    }
  };


//save about me

  const saveAboutMe = async () => {
     
      const aboutMe = {'aboutMe' : aboutMeMessage}
      console.log('aboutMe',aboutMe)

    let {data: res} = await updateProfileTo(aboutMe);
    if(res.message){
      alert(res.message);
    }
    console.log('response is here',res);
  }

  //delete about  me 
  const deleteAboutMe = async () => {
    let aboutMe = { 'aboutMe' : 'aboutMe'}
    console.log('index and data',aboutMe);
     
    let {data: res} = await deleteExperienceEducationForDoctorProfile(0,aboutMe);
    if(res){
      alert(res.message)
    }
    console.log('delete experince response  is here',res)
  }

   


  useEffect(() => {
    if (focused) {
      handleGetAndSetUser();
    }
  }, [focused]);

  useEffect(() => {
    handleGetAndSetUser();
  }, []);

  // const handleDocumentPicker = async () => {
  //   try {
  //     let file: any = await DocumentPicker.pickSingle({
  //       presentationStyle: 'fullScreen',
  //       type: [DocumentPicker.types.images],
  //     });
  //     if (file) {
  //       setImage(file);
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  const handleDocumentPicker = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      if (file) {
        const imageSizeInMB = file.size / (1024 * 1024); // convert bytes to MB
        if (imageSizeInMB > 2) {
          Alert.alert('Select a photo with less than 2MB');
        } else {
          setImage(file);
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoadingSubmit(true); // Set loading state to true

      let formData = new FormData();
   
      if(timeSlot && timeSlot.length >0 &&Roles.DOCTOR){
        console.log('language known',timeSlot)
        const  languageKnownJson = JSON.stringify(timeSlot);
        formData.append('languageKnown', languageKnownJson);
      }
    

      Object.entries(userObj).map(entry => {
        const [key, value] = entry;
      });

      formData.append('serviceCharge', serviceCharge);
      formData.append('address', address);
      formData.append('name', name);
      formData.append('pinCode', pinCode);
      formData.append('state', state);
      formData.append('gender', gender);
      formData.append('mobile', mobile);
      formData.append('specialization', specialization);
      formData.append('currentOrganization', Organization);
     
      formData.append('image', image);
      if (userObj.role == Roles.DOCTOR) {
        formData.append('abhaid', abhaid);
      }

      console.log('this is form data without entry', {
        serviceCharge,
        abhaid,
        address,
        name,
        pinCode,
        state,
        gender,
        mobile,
        specialization,
        image,
      });

      let {data: res}: any = await updateProfile(formData);
      if (res) {
        alert(res.message);
        await setUser(res.data);
        setGender(res.data?.gender);
        setImage(res.data?.image);
        setServiceCharge(res.data?.serviceCharge);
        setAddress(res.data?.address);
        setName(res.data?.name);
        setPinCode(res.data?.pinCode);
        setState(res.data?.state);
        setMobile(res.data?.mobile);
        setSpecialization(res.data?.specialization);
        setAbhaid(res.data?.abhaid);
        setemail(res.data?.email);
        setProfilePhoto(res.data?.image);
        setUserObj(res.data);
        navigation.goBack();
      }
      setIsLoadingSubmit(false); // Set loading state to true
    } catch (error) {
      setIsLoadingSubmit(false); // Set loading state to true

      alert(error);
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

  const handleUpdatePasswordSubmit = async () => {
    try {
      if (newPassword == '') {
        alert('Please enter new password');
        return;
      }
      if (oldPassword == '') {
        alert('Please enter old password');
        return;
      }
      if (confirmPassword == '') {
        alert('Please enter confirm password');
        return;
      }
      if (newPassword != confirmPassword) {
        alert('Confirm password does not match new password');
        return;
      }

      let obj = {
        newPassword,
        oldPassword,
        confirmPassword,
      };
      let {data: res}: any = await updatePassword(obj);
      if (res.success) {
        alert(res.message);
        navigation.goBack();
      }
    } catch (error) {
      alert(error);
    }
  };

  const data = [
    {
      jobTitle: 'Software Engineer',
      companyName: 'Example Inc',
      startMonth: 'January',
      startYear: '2022',
      endMonth: 'Present',
      endYear: '',
      jobDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      jobTitle: 'Software Engineer',
      companyName: 'Example Inc',
      startMonth: 'January',
      startYear: '2022',
      endMonth: 'Present',
      endYear: '',
      jobDescription:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];

  if (isConnected == false) {
    return <InterNetError labels={'Edit Profile'} />;
  } else {
    return (
      <ScrollView
        style={{backgroundColor: 'white', paddingBottom: hp(5)}}
        showsVerticalScrollIndicator={false}>
        <Headerr secndheader={true} label="Edit Profile" />
        <ScrollView
          style={{width: wp(95), alignSelf: 'center'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor: '#F5F5F5',
            }}>
            <TouchableOpacity 
            style={{
              backgroundColor: '#F5F5F5',
            }}
            onPress={() => handleDocumentPicker()}>
              <Image
                source={handleRenderProfilePhoto()}
                style={{
                  height: wp(25),
                  width: wp(25),
                  resizeMode: 'center',
                  borderRadius: wp(40),
                  marginTop: hp(1.5),
                  // backgroundColor: '#F5F5F5',
                }}
              />
            </TouchableOpacity>
          </View>

        
         <View
          style={{
        //   padding:20,
        //   flex:1,
        //   backgroundColor: '#3b5998',
        // backgroundColor: '#F5F5F5',
         }}

         >

          <View 
          // style={{marginTop: hp(1.5), width: wp(95)}}
          style={{
            padding:20,
            flex:1,
            backgroundColor: '#F5F5F5',
           }}
          >
            <View 
            // style={{width: wp(85)}}
            >
              <Text
                // style={{
                //   color: 'black',
                //   fontSize: hp(1.7),
                //   fontFamily: mainFontmedium,
                // }}
                style={styles.label}
                >
                Name
              </Text>
              <TextInput
                onChangeText={e => setName(e)}
                value={name}
                placeholder={isLoading ? 'Loading...' : 'Enter Your Name'}
                placeholderTextColor={'gray'}
                style={styles.inputfildeStyle}
              />
            </View>
            <View 
            // style={{width: wp(95), marginTop: hp(2)}}
            >
              <Text
                style={styles.label}
                >
                Email
              </Text>
              <View 
              // style={{width: wp(95)}}
              >
                <TextInput
                  value={email}
                  editable={false}
                  placeholder={
                    isLoading ? 'Loading...' : 'Enter Your Phone Email'
                  }
                  placeholderTextColor={'gray'}
                  style={[styles.inputfildeStyle, {backgroundColor: '#eee'}]}
                />
              </View>
            </View>
            <View 
            // style={{width: wp(95), marginTop: hp(2)}}
            >
              <Text
                style={styles.label}>
                Phone Number
              </Text>
              <TextInput
                onChangeText={e => setMobile(e)}
                value={mobile}
                editable={false}
                placeholder={
                  isLoading ? 'Loading...' : 'Enter Your Phone Number'
                }
                placeholderTextColor={'gray'}
                style={styles.inputfildeStyle}
              />
            </View>
            
          <View 
          // style={{width: wp(95), marginTop: hp(2)}}
          >
         
           <Text
                style={styles.label}>
             {userObj?.role == Roles?.DOCTOR ?   'Clinic Address' : 'Address' }
              </Text>
          
              <TextInput
                onChangeText={e => setAddress(e)}
                value={address}
                placeholder={isLoading ? 'Loading...' : 'Enter Your Address'}
                placeholderTextColor={'gray'}
                style={styles.inputfildeStyle}
              />
            </View> 

            <View 
            // style={{width: wp(95), marginTop: hp(2)}}
            >
              <Text
                style={styles.label}>
                State
              </Text>
              <TextInput
                onChangeText={e => setState(e)}
                value={state}
                placeholder={isLoading ? 'Loading...' : 'Enter Your state'}
                placeholderTextColor={'gray'}
                style={styles.inputfildeStyle}
              />
            </View>




            {userObj?.role == Roles.DOCTOR && (
            <>
              <Text>Add Language</Text>
              {/* <View style={{ flexDirection: 'row', marginTop: hp(1), justifyContent: 'space-between', }}> */}
                <View 
                // style={{ width: wp(90) }}
                >
                  <Text style={{ fontSize: hp(1.8), fontFamily: mainFont, color: 'black', }}>Select Language </Text>
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
                    placeholder="Select Language"
                    searchPlaceholder="Search..."
                    // value={timeSlot}
                    value={timeSlot.map(lang => lang.value)} 
                    onChange={(item: any) => {
                      const transformed = transformSelectedLanguages(item);
                      setTimeSlot(transformed);
                      // setTimeSlot(item);
                      console.log(transformed, 'item');
                    }}
                    renderLeftIcon={() => (<AntDesign style={styles.icon} color="black" name="Safety" size={20} />)}
                    selectedStyle={styles.selectedStyle}
                  />
                </View>
              {/* </View> */}

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp(1),
                  justifyContent: 'space-between',
                }}>
             
              </View>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={{ width: wp(94), marginTop: hp(5), height: hp(5), backgroundColor: '#50B148', borderRadius: 5, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ color: 'white', fontFamily: mainFontmedium, }}> Proceed</Text>
              </TouchableOpacity>
            </>
          )}


            <View 
            // style={{width: wp(95), marginTop: hp(2)}}
            >
              <Text
                style={styles.label}>
                Country
              </Text>
              <TextInput
                value={'India'}
                placeholder={isLoading ? 'Loading...' : 'Enter Your Address'}
                placeholderTextColor={'gray'}
                style={styles.inputfildeStyle}
              />
            </View>
            <View 
            // style={{width: wp(95), marginTop: hp(2)}}
            >
              <Text
                 style={styles.label}>
                Pincode
              </Text>
              <TextInput
                onChangeText={e => setPinCode(e)}
                value={`${pinCode}`}
                keyboardType="number-pad"
                maxLength={6}
                placeholder={isLoading ? 'Loading...' : 'Enter Your Pincode'}
                placeholderTextColor={'gray'}
                style={styles.inputfildeStyle}
              />
            </View>

            {userObj.role == Roles.DOCTOR && (
              <View 
              // style={{width: wp(95), marginTop: hp(2)}}
              >
                <Text
                   style={styles.label}>
                  Specialization
                </Text>
                <TextInput
                  editable={false}
                  onChangeText={e => setSpecialization(e)}
                  value={specialization}
                  placeholder={isLoading ? 'Loading...' : 'Your specialization'}
                  placeholderTextColor={'gray'}
                  style={styles.inputfildeStyle}
                />
              </View>
            )}
          {/* Organization */}

          {userObj.role == Roles.DOCTOR && (
              <View 
              // style={{width: wp(95), marginTop: hp(2)}}
              >
                <Text
                   style={styles.label}>
                  Organization
                </Text>
                <TextInput
                  editable={true}
                  onChangeText={e => setOrganization(e)}
                  value={Organization}
                  placeholder={isLoading ? 'Loading...' : 'Your Organization'}
                  placeholderTextColor={'gray'}
                  style={styles.inputfildeStyle}
                />
              </View>
            )}

            <View 
            // style={{marginTop: hp(2), width: wp(95)}}
            >
              <Text
                  style={styles.label}>
                How do you identify yourself?
              </Text>
              <View
                style={{
                  // width: wp(95),
                  flexDirection: 'row',
                  marginTop: hp(1),
                  justifyContent: 'space-between',
                }}
                >
                <TouchableOpacity
                  onPress={() => setGender('Male')}
                  style={{
                    borderColor: '#686868',
                    borderWidth: gender == 'Male' ? 0 : 0.8,
                    width: wp(20),
                    // padding:10,
                    height: hp(5),
                    borderRadius: 5,
                    backgroundColor: gender == 'Male' ? maincolor : 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: gender == 'Male' ? 'white' : '#686868',
                      fontSize: hp(1.8),
                      fontFamily: mainFont,
                    }}>
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender('Female')}
                  style={{
                    borderColor: '#686868',
                    borderWidth: gender == 'Female' ? 0 : 0.8,
                    width: wp(20),
                    // padding:10,
                    height: hp(5),
                    borderRadius: 5,
                    backgroundColor: gender == 'Female' ? maincolor : 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: gender == 'Female' ? 'white' : '#686868',
                      fontSize: hp(1.8),
                      fontFamily: mainFont,
                    }}>
                    Female
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setGender('Other')}
                  style={{
                    borderColor: '#686868',
                    borderWidth: gender == 'Other' ? 0 : 0.8,
                    width: wp(20),
                    // padding:10,
                    height: hp(5),
                    borderRadius: 5,
                    backgroundColor: gender == 'Other' ? maincolor : 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: gender == 'Other' ? 'white' : '#686868',
                      fontSize: hp(1.8),
                      fontFamily: mainFont,
                    }}>
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            </View>


            
            <>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={{
                  width: wp(95),
                  height: hp(5),
                  backgroundColor: '#50B148',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginVertical: 25,
                }}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    color: 'white',
                    fontFamily: mainFontmedium,
                  }}>
                  Submit 
                </Text>
              </TouchableOpacity>
              {isLoadingSubmit && (
                <View
                  style={{
                    position: 'absolute',
                    // height:'100%',
                    // width:'100%',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(10, 10, 10, 0.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>
              )}
            </>

            </View>

            {/* {userObj.role == Roles.DOCTOR && (
              <View style={{width: wp(95), marginTop: hp(2)}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: hp(1.7),
                    fontFamily: mainFontmedium,
                  }}>
                  Abha Id
                </Text>
                <TextInput
                  onChangeText={e => setAbhaid(e)}
                  value={abhaid}
                  placeholder={isLoading ? 'Loading...' : 'Your Abha Id'}
                  placeholderTextColor={'gray'}
                  style={styles.inputfildeStyle}
                />
              </View>
            )} */}

            {/* {(userObj.role == Roles.DOCTOR ||
              userObj.role == Roles.FRANCHISE) && (
              <View style={{width: wp(95), marginTop: hp(2)}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: hp(1.7),
                    fontFamily: mainFontmedium,
                  }}>
                  Uplode Document
                </Text>
              </View>
            )} */}

            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{padding: 10, margin: 10, borderRadius: 10}}>
                <Text style={{color: '#000000', fontWeight: 'bold'}}>
                  Total Experience
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setAddExperience(!addExperience);
                  setAddEducation(false);
                }}
                style={{
                  backgroundColor: 'green',
                  padding: 10,
                  margin: 10,
                  borderRadius: 10,
                }}>
                <Text style={{color: '#fff'}}>Add Experience</Text>
              </TouchableOpacity>
            </View> */}

            {/* {addExperience && ( */}
             
            {userObj.role == Roles.DOCTOR && (  <View>
                <AddWorkExperience />
              </View>)}

            {/* )} */}

            <View>
              {/* <ProfileExperiencelist /> */}
            </View>

            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{padding: 10, margin: 10, borderRadius: 10}}>
                <Text style={{color: '#000000', fontWeight: 'bold'}}>
                  Education
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setAddEducation(!addEducation);
                  setAddExperience(false);
                }}
                style={{
                  backgroundColor: 'green',
                  padding: 10,
                  margin: 10,
                  borderRadius: 10,
                }}>
                <Text style={{color: '#fff'}}>Add Education</Text>
              </TouchableOpacity>
            </View> */}

            {/* {addEducation && ( */}

            {userObj.role == Roles.DOCTOR && ( <View>
                <ProfileEducation />
              </View>)}

            {/* )} */}

           


       


            {userObj.role == Roles.DOCTOR && (
                   <View
                   style={{
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     flex: 1,
                     // padding: wp('5%'),
                     backgroundColor: '#3b5998',
                     marginTop:10,
                     marginBottom:10
                   }}>
                   <View style={{padding: 10, margin: 10, borderRadius: 10}}>
                     <Text style={{ 
                       color:'#fff', 
                       fontSize: wp('5%'),
                       fontWeight: 'bold',
                   }}>About Me</Text>
                   </View>
                   <TouchableOpacity
                     onPress={() => {
                       setAboutMe(!addAboutMe)
                     }}
                     style={{
                       backgroundColor: 'green',
                       padding: 10,
                       margin: 10,
                       borderRadius: 10,
                     }}>
                     <Text 
                     style={{
                       color: '#fff',
                       fontSize: 16,
                       fontWeight: 'bold',
                       }}>Add</Text>
                   </TouchableOpacity>
                 </View>
          )}
            
            {userObj.role == Roles.DOCTOR &&   addAboutMe && <>
            <Text
             style={{marginLeft:10,}}
             >Add about me</Text>
          <TextInput 
           style={{
            //  backgroundColor:"bwhitelack",
             padding:10,
             margin:10,
             borderWidth:1,
             borderRadius:10
           }}
            // style={styles.input}
            value={aboutMeMessage}
            onChangeText={setAboutMeMessage}
            multiline
          />

           <TouchableOpacity
           onPress={ () => {
            saveAboutMe()
            handleGetAndSetUser()
          }}
           style={{
            padding:10,
            margin:10,
            borderRadius:10,
            borderWidth:1,
            backgroundColor: '#3b5998',
            alignSelf:'center',
           }}
           >
            <Text style={{color:'#fff'}}>update About Me</Text>
           </TouchableOpacity>
           </>}

            {/* shwo about me */}

            {userObj.role == Roles.DOCTOR &&  showAboutMessage && 
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              padding: 10, 
              borderWidth: 1, 
              borderRadius: 10,
              // margin: 10 
            }}>
    <Text style={{ flex: 1 }}>
      {showAboutMessage}
    </Text>
    <TouchableOpacity
      onPress={() => { 
        deleteAboutMe();
        handleGetAndSetUser();
      }}
      style={{
        padding: 5, 
        marginLeft: 10, 
      }}
    >
      <Image
        source={require('../../assets/images/bin.png')}
        style={{ height: 24, width: 24 }}
      />
    </TouchableOpacity>

    {/* <TouchableOpacity
      onPress={() => { 
        // deleteAboutMe();
        handleGetAndSetUser();
      }}
      style={{
        padding: 5, 
        marginLeft: 10, 
      }}
    >
        <Image
            source={require('../../assets/images/edit2.png')}
            style={{height:24,width:24}}
          />
    </TouchableOpacity> */}

  </View> 
}
       


          

           

          

            {/* <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                width: wp(95),
                height: hp(5),
                backgroundColor: '#50B148',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginVertical: 25,
              }}>
              <Text
                style={{
                  fontSize: hp(1.8),
                  color: 'white',
                  fontFamily: mainFontmedium,
                }}>
                Submit
              </Text>
            </TouchableOpacity> */}


            {!isLoadingSubmit && (
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  borderRadius: 5,
                  padding: 10,
                }}>
                <View style={{width: wp(95), marginTop: hp(2)}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp(1.7),
                      fontFamily: mainFontmedium,
                    }}>
                    Old Password
                  </Text>
                  <TextInput
                    onChangeText={e => setOldPassword(e)}
                    value={`${oldPassword}`}
                    secureTextEntry
                    maxLength={6}
                    placeholder="Enter Your old password"
                    placeholderTextColor={'gray'}
                    style={[styles.inputfildeStyle, {width: wp(90)}]}
                  />
                </View>
                <View style={{width: wp(95), marginTop: hp(2)}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp(1.7),
                      fontFamily: mainFontmedium,
                    }}>
                    New Password
                  </Text>
                  <TextInput
                    onChangeText={e => setNewPassword(e)}
                    value={`${newPassword}`}
                    secureTextEntry
                    maxLength={6}
                    placeholder="Enter Your new password"
                    placeholderTextColor={'gray'}
                    style={[styles.inputfildeStyle, {width: wp(90)}]}
                  />
                </View>
                <View style={{width: wp(95), marginTop: hp(1.8)}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: hp(1.7),
                      fontFamily: mainFontmedium,
                    }}>
                    Confirm Password
                  </Text>
                  <TextInput
                    onChangeText={e => setConfirmPassword(e)}
                    value={`${confirmPassword}`}
                    secureTextEntry
                    maxLength={6}
                    placeholder="Confirm Your password"
                    placeholderTextColor={'gray'}
                    style={[styles.inputfildeStyle, {width: wp(90)}]}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleUpdatePasswordSubmit()}
                  style={{
                    width: wp(90),
                    height: hp(5),
                    backgroundColor: '#50B148',
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginVertical: 25,
                  }}>
                  <Text
                    style={{
                      fontSize: hp(1.8),
                      color: 'white',
                      fontFamily: mainFontmedium,
                    }}>
                    Update Password
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
};
const styles = StyleSheet.create({
  input: {
    width: 40,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E8E8E8',
    marginLeft: 10,
    textAlign: 'center',
    fontSize: hp(2.5),
    fontWeight: '700',
    color: 'gray',
  },
  label:{
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  inputfildeStyle: {
    // width: wp(95),
    // height: hp(5.5),
    // marginTop: hp(0.5),
    // backgroundColor: '#F1ECEC',
    // borderColor: 'gray',
    // borderWidth: 0.5,
    // borderRadius: 3,
    // paddingLeft: wp(1),
    // paddingRight: wp(3),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,

  },

  //drop down  css 
  dropdown1: {
    height: hp(6.7),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: hp(1),
    width: wp(85),
    backgroundColor: '#F2F2F2E5',
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

  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },

});

export default EditProfile;
