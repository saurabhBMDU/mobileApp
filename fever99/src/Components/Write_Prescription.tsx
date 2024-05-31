import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Button,
} from 'react-native';
// import RNFetchBlob from 'react-native-fetch-blob';

import {Dropdown} from 'react-native-element-dropdown';
import {PermissionsAndroid} from 'react-native';
import Remmove_icons from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import RNFS from 'react-native-fs';

import Headerr from '../ReuseableComp/Headerr';
import {getUser} from '../Services/user.service';
import {
  addLikedMedicine,
  addMedicine,
  deleteLikedMedicine,
  getFromDatabaseAllLikedMedicines,
  getMedicines,
  updateLikedMedicine,
} from '../Services/MedicinesList.service';
import {showAlert, toastSuccess} from '../utils/toast.utils';
import Camera_icon from 'react-native-vector-icons/FontAwesome';
import Uplode_icons from 'react-native-vector-icons/Entypo';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  ImagePickerOptions,
  requestCameraPermission,
} from 'react-native-image-picker';

import moment from 'moment';

import AlertBox from '../allModals/AlertBox';

import Modal from 'react-native-modal';
import {
  TimeData,
  durationCountData,
  roa,
  DaysData,
  doseFormArr,
  doses,
  duration_count,
} from '../allArrayData/DrArrayDatta';
import PreView from '../allModals/PreView';
import {template} from 'lodash';

const {height, width} = Dimensions.get('window');

const Write_Prescription = (props: any) => {

  // console.log('write prescription daata',props?.route?.params?.data);

  const mainFont = 'Montserrat-Regular';
  const mainFontBold = 'Montserrat-Bold';
  const mainFontmedium = 'Montserrat-Medium';
  const maincolor = '#1263AC';
  const navigation = useNavigation();
  const [userObj, setUserObj] = useState<any>('');
  const [image, setImage] = useState(null);
  const [query, setQuery] = useState({page: 1, size: 10, filter: ''});
  const [isFocus, setIsFocus] = useState(false);

  const [appointMentObj, setAppointMentObj] = useState<any>({});
  const [soModalreschedule, setSoModalreschedule] = useState<boolean>(false);
  const [preView, setPreview] = useState<boolean>(false);
  const focused = useIsFocused();
  const [drugAllergy, setDrugAllergy] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [investigation, setInvestigation] = useState('');
  const [notes, setNotes] = useState('');
  const [pastHistory, setPastHistory] = useState('');
  const [personalHistory, setPersonalHistory] = useState('');
  const [surgicalHistory, setSurgicalHistory] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const [name, setName] = useState('');
  const [combination, setcombination] = useState('');
  const [company, setCompany] = useState('');
  const [medicineModal, setMedicineModal] = useState(false);

  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [prescriptionId, setPrescriptionId] = useState('');
  const [sendData, setSendData] = useState({});
  const [soWritePrescption, setSoWritePrescption] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, steLimit] = useState(1000);
  const [filter, setFilter] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [loding, setloding] = useState(false);
  const [medicinesArr, setMedicinesArr] = useState([]);

  // console.log('medicne arra',sendData)

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [showAll, setShowAll] = useState(false);

  const [displayedData,setDisplayedData] = useState('');



  const showAlert = message => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3300); // Extra 300ms to account for the sliding out animation
  };

  const handleGetAndSetUser = async () => {
    let userData = await getUser();
    if (userData) {
      setUserObj(userData);
    }
  };
  const [medicine, setMedicine] = useState([
    {
      name: '',
      time: '',
      frequency: '',
      duration: '',
      note: '',
      roa: '',
      doses: '',
      dose_form: '',
      duration_count: '',
      combination: '',
    },
  ]);

  const [likedMedicine, setLikedMedicine] = useState([
    {
      name: '',
      time: '',
      frequency: '',
      duration: '',
      note: '',
      roa: '',
      doses: '',
      dose_form: '',
      duration_count: '',
      combination: '',
    },
  ]);

  const handleGetMedicines = async () => {
    setloding(true);
    try {
      let query;
      if (filter) {
        query = `page=${page}&limit=${limit}&filter=${filter}`;
      } else {
        query = `page=${page}&limit=${limit}`;
      }
      let {data: res} = await getMedicines(query);
      // console.log('response from db for medicines',res.data)
      if (res.data) {
        setloding(false);
        setMedicinesArr(
          res.data.map((el: any) => ({label: el.name, value: el.combination})),
        );
      }
    } catch (error) {
      showAlert(error);
    }
  };
  const handleAddMedicineToDataBase = async () => {
    try {
      if (name == '') {
        showAlert('Name is mandatory !!!');
        return;
      }

      if (combination == '') {
        showAlert('combination is mandatory !!!');
        return;
      }

      if (company == '') {
        showAlert('Company is mandatory !!!');
        return;
      }

      let obj = {
        name,
        combination,
        company,
      };
      let {data: res} = await addMedicine(obj);
      if (res) {
        handleGetMedicines();
        toastSuccess(res.message);
        setMedicineModal(false);
      }
    } catch (error) {
      showAlert(error);
    }
  };
  const handleSetDataToEdit = (data: any) => {
    setDrugAllergy(data.drugAllergy);
    setDiagnosis(data.diagnosis);
    setInvestigation(data.investigation);
    setNotes(data.notes);
    setPastHistory(data.pastHistory);
    setPersonalHistory(data.personalHistory);
    setSurgicalHistory(data.surgicalHistory);
    setSymptoms(data.symptoms);
    setMedicine(data.medicine);
    setPrescriptionId(data._id);
  };
  useEffect(() => {
    if (focused && props?.route?.params?.data) {
      handleGetAndSetUser();
      handleGetMedicines();
      setAppointMentObj(props?.route?.params?.data);
      console.log('prescrin feet',props?.route?.params?.data.feet)
      // console.log('data ', props?.route?.params?.data);
      // console.log('appoiitment object data i prescription',appointMentObj)
      if (props?.route?.params?.editModeOn) {
        setIsEditModeOn(true);
        handleSetDataToEdit(props?.route?.params?.prescriptionObj);
      }
    }
  }, [focused, props?.route?.params?.data, medicine]);
  // debouncing implementation
  let delay = 700;
  useEffect(() => {
    const timer = setTimeout(() => {
      handleGetMedicines();
    }, delay);
    return () => clearTimeout(timer);
  }, [filter, delay]);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddMedicine = () => {
    let tempArr = medicine;
    tempArr.push({
      name: '',
      time: '',
      frequency: '',
      duration: '',
      note: '',
      roa: '',
      doses: '',
      dose_form: '',
      duration_count: '',
      combination: '',
    });
    setMedicine([...tempArr]);

    // console.log('handle add medicine ',medicine)
  };

  //add liked medicne into prescriptions medicne

  const handleAddLikedMedicine = (
    name: any,
    time: any,
    frequency: any,
    duration: any,
    note: any,
    roa: any,
    doses: any,
    dose_form: any,
    duration_count: any,
    combination: any,
  ) => {

    console.log('all data to add in liked medicine to prescriptns',{
      name: name,
      time: time,
      frequency: frequency,
      duration: duration,
      note:note,
      roa:roa,
      doses:doses,
      dose_form: dose_form,
      duration_count: duration_count,
      combination: combination,
    })

    // let tempArr = medicine;
    // tempArr.push({
    //   name: name,
    //   time: time,
    //   frequency: frequency,
    //   duration: duration,
    //   note:note,
    //   roa:roa,
    //   doses:doses,
    //   dose_form: dose_form,
    //   duration_count: duration_count,
    //   combination: combination,
    // });
    // setMedicine([...tempArr]);

   

    let tempArr = [...medicine];

    const isObjectEmpty = (obj : any) => {
      return Object.values(obj).every(value => value === '');
    };

    if (tempArr.length === 1 && isObjectEmpty(tempArr[0])) {
      tempArr = [];
      setMedicine([]);
    tempArr.push({
      name: name,
      time: time,
      frequency: frequency,
      duration: duration,
      note: note,
      roa: roa,
      doses: doses,
      dose_form: dose_form,
      duration_count: duration_count,
      combination: combination,
    });
    setMedicine(tempArr);
  }else{

    tempArr.push({
      name: name,
      time: time,
      frequency: frequency,
      duration: duration,
      note: note,
      roa: roa,
      doses: doses,
      dose_form: dose_form,
      duration_count: duration_count,
      combination: combination,
    });

    // alert(medicine.length)
    setMedicine([...tempArr]);
    console.log('medicine legnh',medicine.length)
  }

    

    // console.log('handle add medicine ',medicine)
  };

//update liked medicine in database
  const handleUpdateLikedMedicine = async (
    id : any ,
    name: any,
    time: any,
    frequency: any,
    duration: any,
    note: any,
    roa: any,
    doses: any,
    dose_form: any,
    duration_count: any,
    combination: any,
    
  
  )=>{
    try {

      console.log('update  medicine to prescriptns',{
        name: name,
        time: time,
        frequency: frequency,
        duration: duration,
        note:note,
        roa:roa,
        doses:doses,
        dose_form: dose_form,
        duration_count: duration_count,
        combination: combination,
      })

      console.log('coming in update section for frequently used medicines')
      let {data: res} = await updateLikedMedicine(
        id,
        name,
        time,
        frequency,
        duration,
        note,
        roa,
        doses,
        dose_form,
        duration_count,
        combination,
      );
      console.log('update liked medicine from database ', res.message);
      // setLikedMedicine(res.data)
      if (res.message) {
        alert(res.message);
        setloding(false);
      }
    } catch (error) {
      showAlert(error);
    }
  }

  //delete liked medicine from database

  const handleDeleteLikedMedicine = async (id:any) =>{
    try {
      let {data: res} = await deleteLikedMedicine(id);
      console.log('delete liked medicine from database ', res);
      if (res.status) {
        getAllLikedMedicinesFromDatabase(false);
        alert(res.message);
        setloding(false);
      }
    } catch (error) {
      showAlert(error);
    }
  }



  // const handleDeleteMedicine = (index: Number) => {
  //   let tempArr = medicine;

  //   if (tempArr && tempArr.length > 1) {
  //     tempArr.splice(index);
  //     setMedicine([...tempArr]);
  //   }
  // };


  const handleDeleteMedicine = (index: number) => {
    // Create a copy of the medicine array
    let tempArr = [...medicine];
  
    // Check if the index is within the bounds of the array
    // if (index >= 1 && index < tempArr.length) {
      if (index < tempArr.length) {
      // Remove the item at the specified index
      tempArr.splice(index, 1);
      // Update the state with the new array
      setMedicine(tempArr);
    }
  };
  

  const handleUpdateContentForMedicine = (
    value: any,
    field: string,
    index: number,
  ) => {
    let tempArr: any = medicine;

    tempArr[index][field] = value;

    setMedicine([...tempArr]);
    // console.log('temp arr',tempArr)
  };

  const handleUpdateContentForLikedMedicine = (
    value: any,
    field: string,
    index: number,
  ) => {
    let tempArr: any = likedMedicine;

    tempArr[index][field] = value;

    setLikedMedicine([...tempArr]);
    console.log('temp arr',tempArr)
  };

  //for liked medicine to add in database function

  const addLIkedMedicinesToDatabase = async (
    name: any,
    time: any,
    frequency: any,
    duration: any,
    note: any,
    roa: any,
    doses: any,
    dose_form: any,
    duration_count: any,
    combination: any,
  ) => {
    console.log('all data here form that data', {
      name: name,
      time: time,
      frequency: frequency,
      duration: duration,
      note: note,
      roa: roa,
      doses: doses,
      dose_form: dose_form,
      duration_count: duration_count,
      combination: combination,
    });

    if (
      name &&
      time &&
      frequency &&
      duration &&
      doses &&
      roa &&
      dose_form &&
      duration_count &&
      combination
    ) {
      console.log('goood');

      let obj = {
        name,
        time,
        frequency,
        duration,
        note,
        roa,
        doses,
        dose_form,
        duration_count,
        combination,
      };

      setloding(true);
      try {
        let {data: res} = await addLikedMedicine(obj);
        console.log(
          'response from db for liked medicines medicines',
          res.message,
        );
        if (res.status) {
          getAllLikedMedicinesFromDatabase(false);
          alert(res.message);
          setloding(false);
        }
      } catch (error) {
        showAlert(error);
      }
    } else {
      console.log('not good');
      alert('select all fields to add in frequently used medicines');
      return;
    }
  };



  const getAllLikedMedicinesFromDatabase = async (show) => {
    try {
      let {data: res} = await getFromDatabaseAllLikedMedicines();
      // console.log('all liked medicine from database ', res);
      setLikedMedicine(res.data);
      
  const displayedData = show ? res.data : res.data.slice(0, 4);
  console.log('displayed data',displayedData.length)
      setFilteredData(displayedData)
      setDisplayedData(res.data);
      
      if (res.message) {
        alert(res.message);
        setloding(false);
      }
    } catch (error) {
      showAlert(error);
    }
  };

  useEffect(() => {
    getAllLikedMedicinesFromDatabase(false);
  }, []);

 

  const clodeModal = () => {
    setPreview(false);
  };

  const handleAddPrescription = async () => {
    if (soWritePrescption) {
      if (drugAllergy === '') {
        showAlert('Drug Allergy is Required');
        return;
      }
      if (pastHistory === '') {
        showAlert('Past History Is Required');
        return;
      }
      try {
        let obj: any = {
          appointmentId: appointMentObj?._id,
          doctorId: appointMentObj.doctor._id,
          // patientId: appointMentObj.expert._id,
          patientId: appointMentObj.expert._id,
          symptoms,
          diagnosis,
          medicine,
          investigation,
          pastHistory,
          surgicalHistory,
          drugAllergy,
          notes,
          personalHistory,
        };

        // console.log('patinet id is here in appointment ',appointMentObj.expert._id,)
        // console.log('id all data', appointMentObj.expert);
        // console.log('handle add prescription ',  medicine,)
        setSendData(obj);
        setPreview(true);
      } catch (err) {
        showAlert(err);
      }
    } else {
      try {
        const base64Image = await RNFS.readFile(selectedImage, 'base64');

        let obj: any = {
          appointmentId: appointMentObj?._id,
          doctorId: appointMentObj.doctor._id,
          patientId: appointMentObj.expert._id,
          image: base64Image,
        };
        setSendData(obj);
        setPreview(true);
      } catch (err) {
        showAlert('Please Upload image');
      }
    }
  };

  const openImagePicker = () => {
    const options: ImagePickerOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCameraAfterPermission();
      } else {
        showAlert('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const launchCameraAfterPermission = () => {
    const options: ImagePickerOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1000,
      maxWidth: 1000,
    };
    launchCamera(options, handleResponse);
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
    } else if (response.errorMessage) {
    } else {
      let imageUri;
      if (response && response.assets && response.assets.length > 0) {
        imageUri = response.assets[0]?.uri;
      } else {
        imageUri = response.uri;
      }
      setSelectedImage(imageUri);
      setSoModalreschedule(false);
    }
  };




  
  // useEffect(() => {
  
  // }, [searchText, displayedData]);

 
  const serchFrequentlyUsedMedicine = (e : any) => {
    console.log('search text in funciton ',e)
 
    if(!e){
      console.log('false is working')
      getAllLikedMedicinesFromDatabase(false);
    }
    
  setFilteredData(
    displayedData.filter(medicine =>
      medicine.name.toLowerCase().includes(searchText.toLowerCase())
    )
  )
 
}



  return (
    <View style={{width: width, flex: 1, backgroundColor: 'white'}}>
      <Headerr secndheader={true} label="Prescription" />
      {alertVisible && (
        <AlertBox
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      )}
      <ScrollView
        contentContainerStyle={{paddingBottom: hp(0.5)}}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              width: wp(100),
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <View
              style={{
                width: wp(95),
                marginTop: hp(1),
                borderColor: '#535353',
                borderWidth: 0.8,
                paddingTop: hp(1.5),
                paddingBottom: hp(1.5),
                flexDirection: 'row',
                borderRadius: 5,
              }}>
              <View style={{width: wp(45)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    Name :
                    <Text style={{color: '#757474'}}>
                      {appointMentObj?.patientName}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    Gender :
                    <Text style={{color: '#757474'}}>
                      {appointMentObj?.gender}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    BP :
                    <Text style={{color: '#757474'}}>{appointMentObj?.bp}</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    Sp02 :
                    <Text style={{color: '#757474'}}>
                      {appointMentObj?.oxigne}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    RBS :
                    <Text style={{color: '#757474'}}>
                      {appointMentObj?.suger3}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    Weight :
                    <Text style={{color: '#757474'}}>
                      {/* {appointMentObj?.weight
                        ? '0'
                        : `${appointMentObj?.weight} Kg`} */}
                        {appointMentObj?.weight 
                        ? `${appointMentObj.weight} Kg`
                        : '0 Kg'}

                    </Text>
                  </Text>
                </View>
              </View>

              <View style={{width: wp(45)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    Age :
                    <Text style={{color: '#757474'}}>
                      {appointMentObj?.age === 0 ||
                      appointMentObj?.age === undefined
                        ? ''
                        : `${appointMentObj?.age} Year `}
                      {appointMentObj?.months == 0 ||
                      appointMentObj?.months === undefined
                        ? ''
                        : appointMentObj?.age > 0 || appointMentObj?.months > 0
                        ? ` ${appointMentObj?.months} Month`
                        : ''}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    Body Temp :
                    <Text style={{color: '#757474'}}>
                      {appointMentObj?.bodyTemperature}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    Pulse :
                    <Text style={{color: '#757474'}}>
                      {appointMentObj?.pulse}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    RR :
                    <Text style={{color: '#757474'}}>
                      {appointMentObj?.respiratoryRate}
                    </Text>
                  </Text>
                </View>
               

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    Height :
                    <Text style={{color: '#757474'}}>
                      {/* {appointMentObj?.heightUnits == 'ft'
                        ? `${appointMentObj?.feet}` && `${appointMentObj?.inch}` ? `${appointMentObj?.feet} feet ${appointMentObj?.inch} inch` : '0'
                        : `${appointMentObj?.height}` && `${appointMentObj?.heightUnit}` ? `${appointMentObj?.height} ${appointMentObj?.heightUnit}` : '0'
                        } */}

                          {appointMentObj?.heightUnit === 'ft' ? 
                            (props?.route?.params?.data?.feet || appointMentObj?.inch ? 
                              `${props?.route?.params?.data?.feet} feet ${appointMentObj?.inch} inch` : 
                              '0') : 
                            (appointMentObj?.height ? 
                              `${appointMentObj.height} ${appointMentObj.heightUnit}` : 
                              '0')
                          }


                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(1),
                    paddingLeft: wp(3),
                  }}>
                  <Text style={{fontSize: hp(1.7), fontFamily: mainFont}}>
                    BMI :
                    <Text style={{color: '#757474'}}>
                      {appointMentObj?.bmi}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  width: wp(95),
                  marginTop: hp(2),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#eee',
                  borderColor: '#1263AC',
                  borderWidth: 1,
                  borderRadius: 5,
                  alignItems: 'center',
                  padding: hp(1.5),
                }}
                onPress={() => {
                  setSoModalreschedule(true),
                    setSoWritePrescption(!soWritePrescption);
                  setSelectedImage('');
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: hp(2),
                    color: '#1263AC',
                  }}>
                  {soWritePrescption
                    ? 'Upload Prescription'
                    : ' Write Prescription'}
                </Text>
              </TouchableOpacity>
              {soWritePrescption ? null : (
                <View style={{marginTop: hp(3)}}>
                  <Pressable
                    onPress={handleCameraLaunch}
                    style={{
                      width: wp(94),
                      flexDirection: 'row',
                      justifyContent: 'center',
                      borderColor: '#6b9fce',
                      borderWidth: 2,
                      borderRadius: 5,
                      alignItems: 'center',
                      marginBottom: hp(1.5),
                    }}>
                    <Camera_icon
                      name="camera"
                      style={{
                        color: '#6b9fce',
                        fontSize: hp(4),
                        padding: hp(1.25),
                        borderRadius: 5,
                      }}
                    />
                    <Text style={{fontSize: hp(2), color: '#6b9fce'}}>
                      By Camera
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={openImagePicker}
                    style={{
                      width: wp(94),
                      flexDirection: 'row',
                      justifyContent: 'center',
                      borderColor: '#68a06e',
                      borderWidth: 2,
                      borderRadius: 5,
                      alignItems: 'center',
                    }}>
                    <Uplode_icons
                      name="upload"
                      style={{
                        color: '#759d7a',
                        fontSize: hp(4),
                        padding: hp(1.25),
                        borderRadius: 5,
                      }}
                    />
                    <Text style={{fontSize: hp(2), color: '#759d7a'}}>
                      From Gallery
                    </Text>
                  </Pressable>
                </View>
              )}
              {selectedImage && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(3),
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: selectedImage}}
                    style={{height: hp(50), width: wp(70), marginBottom: hp(2)}}
                    resizeMode="contain"
                  />
                  <View>
                    <Remmove_icons
                      name="closecircle"
                      style={{
                        fontSize: hp(4),
                        marginLeft: wp(3),
                        textAlign: 'right',
                        backgroundColor: '#fff',
                        color: 'red',
                        borderRadius: wp(40),
                      }}
                      onPress={() => setSelectedImage('')}
                    />
                  </View>
                </View>
              )}
            </View>

            {soWritePrescption ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp(96),
                  }}>
                  <View
                    style={{
                      width: wp(44),
                      borderColor: 'gray',
                      borderWidth: 2,
                    }}></View>
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontFamily: mainFontmedium,
                      color: '#1263AC',
                    }}>
                    OR
                  </Text>
                  <View
                    style={{
                      width: wp(44),
                      borderColor: 'gray',
                      borderWidth: 2,
                    }}></View>
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
                        fontFamily: mainFontBold,
                        color: 'black',
                      }}> 
                      Symptoms:
                    </Text>
                    <TextInput
                      multiline
                      onChangeText={e => setSymptoms(e)}
                      value={symptoms}
                      placeholderTextColor="#8E8E8E"
                      placeholder="Symptoms"
                      style={[
                        styles.inputBoxStyl,
                        {height: 'auto', minHeight: hp(6.1), maxHeight: hp(20)},
                      ]}
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
                        fontFamily: mainFontBold,
                        color: 'black',
                      }}>
                      Diagnosis:
                    </Text>
                    <TextInput
                     multiline
                      onChangeText={e => setDiagnosis(e)}
                      value={diagnosis}
                      placeholderTextColor="#8E8E8E"
                      placeholder="Diagnosis"
                      // style={styles.inputBoxStyl}
                      style={[
                        styles.inputBoxStyl,
                        {height: 'auto', minHeight: hp(6.1), maxHeight: hp(20)},
                      ]}
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
                        fontSize: hp(1.7),
                        fontFamily: mainFontBold,
                        color: 'black',
                      }}>
                      Prescription Date:
                    </Text>
                    <TextInput
                      editable={false}
                      value={moment(new Date()).format('YYYY-MM-DD')}
                      placeholderTextColor="#8E8E8E"
                      placeholder="Prescription"
                      // style={styles.inputBoxStyl}
                      style={[
                        styles.inputBoxStyl,
                        {height: 'auto', minHeight: hp(6.1), maxHeight: hp(20)},
                      ]}
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
                        fontFamily: mainFontBold,
                        color: 'black',
                      }}>
                      *Drug Allergy:
                    </Text>
                    <TextInput
                     multiline
                      onChangeText={e => setDrugAllergy(e)}
                      value={drugAllergy}
                      placeholderTextColor="#8E8E8E"
                      placeholder="Drug Allergy"
                      // style={styles.inputBoxStyl}
                      style={[
                        styles.inputBoxStyl,
                        {height: 'auto', minHeight: hp(6.1), maxHeight: hp(20)},
                      ]}
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
                        fontFamily: mainFontBold,
                        color: 'black',
                      }}>
                      *Past History:
                    </Text>
                    <TextInput
                     multiline
                      onChangeText={e => setPastHistory(e)}
                      value={pastHistory}
                      placeholderTextColor="#8E8E8E"
                      placeholder="Past History"
                      // style={styles.inputBoxStyl}
                      style={[
                        styles.inputBoxStyl,
                        {height: 'auto', minHeight: hp(6.1), maxHeight: hp(20)},
                      ]}
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
                        fontFamily: mainFontBold,
                        color: 'black',
                      }}>
                      Personal History:
                    </Text>
                    <TextInput
                     multiline
                      onChangeText={e => setPersonalHistory(e)}
                      value={personalHistory}
                      placeholderTextColor="#8E8E8E"
                      placeholder="Personal History"
                      // style={styles.inputBoxStyl}
                      style={[
                        styles.inputBoxStyl,
                        {height: 'auto', minHeight: hp(6.1), maxHeight: hp(20)},
                      ]}
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
                        fontSize: hp(1.7),
                        fontFamily: mainFontBold,
                        color: 'black',
                      }}>
                      Surgical History:
                    </Text>
                    <TextInput
                     multiline
                      onChangeText={e => setSurgicalHistory(e)}
                      value={surgicalHistory}
                      placeholderTextColor="#8E8E8E"
                      placeholder="Surgical History"
                      // style={styles.inputBoxStyl}
                      style={[
                        styles.inputBoxStyl,
                        {height: 'auto', minHeight: hp(6.1), maxHeight: hp(20)},
                      ]}
                    />
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: wp(95),
                  }}>
                  <Text style={{textTransform: 'uppercase'}}>
                    If medicine is not available in the list please add from
                    here.
                  </Text>
                  <TouchableOpacity
                    onPress={() => setMedicineModal(true)}
                    style={{
                      paddingHorizontal: 15,
                      height: hp(5),
                      backgroundColor: '#50B148',
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: hp(1.8),
                        color: 'white',
                        fontFamily: mainFontmedium,
                      }}>
                      Add new medicines +
                    </Text>
                  </TouchableOpacity>
                </View>

                {medicine.map((el: any, index: number) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: wp(98),
                        flexDirection: 'row',
                        marginTop: hp(1),
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 10,
                        padding: 5,
                      }}>
                      <View style={{width: wp(40)}}>
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            fontFamily: mainFontBold,
                            color: 'black',
                          }}>
                          Medicine Name:
                        </Text>
                        <Dropdown
                          style={[styles.dropdown]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={
                            loding
                              ? [{label: 'Loading...', value: null}]
                              : medicinesArr
                          }
                          search
                          searchPlaceholder="Search..."
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder={el.name ? el.name : 'select medicine'}
                          // value={el.combination}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={(item: any) => {
                            handleUpdateContentForMedicine(
                              item.value,
                              'combination',
                              index,
                            );
                            handleUpdateContentForMedicine(
                              item.label,
                              'name',
                              index,
                            );
                          }}
                          renderInputSearch={(
                            onSearch: (text: string) => void,
                          ) => (
                            <TextInput
                              style={styles.inputBoxStyl}
                              onChangeText={text => {
                                setFilter(text); // Log the typed text to console
                                onSearch(text); // Trigger the search with the typed text
                              }}
                              placeholder="Search..."
                            />
                          )}
                        />
                      </View>
                      <View
                        style={{
                          width: wp(45),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              fontFamily: mainFontBold,
                              color: 'black',
                            }}>
                            Dose
                          </Text>
                          <Dropdown
                            style={[styles.dropdown, {width: wp(17)}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={doses}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Unit"
                            value={el.doses}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item: any) => {
                              console.log(' item.value doses index', item.value,index,)
                              handleUpdateContentForMedicine(
                                item.value,
                                'doses',
                                index,
                              );
                            }}
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              fontFamily: mainFontBold,
                              color: 'black',
                            }}>
                            Dose Form:
                          </Text>
                          <Dropdown
                            style={[styles.dropdown, {width: wp(26)}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={doseFormArr}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Dose"
                            search
                            searchPlaceholder="Search..."
                            value={el.dose_form}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item: any) => {
                              handleUpdateContentForMedicine(
                                item.value,
                                'dose_form',
                                index,
                              );
                            }}
                          />
                        </View>
                      </View>
                      <View style={{width: wp(40)}}>
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            fontFamily: mainFontBold,
                            color: 'black',
                          }}>
                          ROA:
                        </Text>
                        <Dropdown
                          style={[styles.dropdown]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={roa.map(option => ({
                            label: option.label,
                            value: option.value,
                          }))}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select ROA"
                          search
                          searchPlaceholder="Search..."
                          value={el.roa}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={(item: any) => {
                            handleUpdateContentForMedicine(
                              item.value,
                              'roa',
                              index,
                            );
                          }}
                        />
                      </View>
                      <View style={{width: wp(45)}}>
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            fontFamily: mainFontBold,
                            color: 'black',
                          }}>
                          Time:
                        </Text>
                        <Dropdown
                          style={[styles.dropdown]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={TimeData}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Time"
                          value={el.time}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={(item: any) => {
                            handleUpdateContentForMedicine(
                              item.value,
                              'time',
                              index,
                            );
                          }}
                        />
                      </View>
                      <View style={{width: wp(45)}}>
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            fontFamily: mainFontBold,
                            color: 'black',
                          }}>
                          Frequency:
                        </Text>
                        <Dropdown
                          style={[styles.dropdown]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={DaysData}
                          maxHeight={300}
                          labelField="label"
                          search
                          searchPlaceholder="Search..."
                          valueField="value"
                          placeholder="Select"
                          value={el.frequency}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={(item: any) => {
                            handleUpdateContentForMedicine(
                              item.value,
                              'frequency',
                              index,
                            );
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: wp(45),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              fontFamily: mainFontBold,
                              color: 'black',
                            }}>
                            Count
                          </Text>
                          <Dropdown
                            style={[styles.dropdown, {width: wp(18)}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={duration_count}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Unit"
                            value={el.duration_count}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item: any) => {
                              handleUpdateContentForMedicine(
                                item.value,
                                'duration_count',
                                index,
                              );
                            }}
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              fontFamily: mainFontBold,
                              color: 'black',
                            }}>
                            Duration:
                          </Text>
                          <Dropdown
                            style={[styles.dropdown, {width: wp(26)}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={durationCountData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Duration"
                            value={el.duration}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item: any) => {
                              handleUpdateContentForMedicine(
                                item.value,
                                'duration',
                                index,
                              );
                            }}
                          />
                        </View>
                      </View>

                    

                      <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(2),
                    alignSelf: 'center',
                    paddingTop: hp(1),
                    paddingBottom: hp(1),
                    width: wp(95),
                    justifyContent:"space-evenly"
                  }}>

                        <TouchableOpacity
                        onPress={() =>
                          addLIkedMedicinesToDatabase(
                            el.name,
                            el.time,
                            el.frequency,
                            el.duration,
                            el.note,
                            el.roa,
                            el.doses,
                            el.dose_form,
                            el.duration_count,
                            el.combination,
                          )
                        }
                        style={{
                          paddingHorizontal: 15,
                          height: hp(5),
                          backgroundColor: '#50B148',
                          borderRadius: 5,
                          alignItems: 'left',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            color: 'white',
                            fontFamily: mainFontmedium,
                          }}>
                          Add to frequently used medicine
                        </Text>
                      </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDeleteMedicine(index)}
                    style={{
                      paddingHorizontal: 15,
                      height: hp(5),
                      backgroundColor: '#B0B0B0',
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
                      -
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleAddMedicine()}
                    style={{
                      paddingHorizontal: 15,
                      height: hp(5),
                      backgroundColor: '#50B148',
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: wp(5),
                    }}>
                    <Text
                      style={{
                        fontSize: hp(1.8),
                        color: 'white',
                        fontFamily: mainFontmedium,
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>

                    </View>
                  );
                })}
              

                {/* frequently asked medicines */}

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: wp(95),
                    alignItems:'center',
                    justifyContent:'space-evenly',
                  }}>
                  <TouchableOpacity
                    // onPress={() => setMedicineModal(true)}
                    style={{
                      paddingHorizontal: 15,
                      height: hp(5),
                      backgroundColor: '#50B148',
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: hp(1.8),
                        color: 'white',
                        fontFamily: mainFontmedium,
                      }}>
                      Frequently used medicine's
                    </Text>
                  </TouchableOpacity>

                  <TextInput
        style={{
          height: hp(5),
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginBottom: hp(1),
        }}
        placeholder="Search medicine..."
        value={searchText}
        onChangeText={(e) => {
          serchFrequentlyUsedMedicine(e);
          setSearchText(e)
        }}
      />

                </View>

                

                {filteredData.map((el: any, index: number) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: wp(98),
                        flexDirection: 'row',
                        marginTop: hp(1),
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 10,
                        padding: 5,
                      }}>
                      <View style={{width: wp(40)}}>
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            fontFamily: mainFontBold,
                            color: 'black',
                          }}>
                          Medicine Name:
                        </Text>
                        <Dropdown
                          style={[styles.dropdown]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={
                            loding
                              ? [{label: 'Loading...', value: null}]
                              : medicinesArr
                          }
                          search
                          searchPlaceholder="Search..."
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          // placeholder="Select Medicine"
                          placeholder={el.name ? el.name : 'select medicine'}
                          // value={el.combination}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={(item: any) => {
                            handleUpdateContentForLikedMedicine(
                              item.value,
                              'combination',
                              index,
                            );
                            handleUpdateContentForLikedMedicine(
                              item.label,
                              'name',
                              index,
                            );
                          }}
                          renderInputSearch={(
                            onSearch: (text: string) => void,
                          ) => (
                            <TextInput
                              style={styles.inputBoxStyl}
                              onChangeText={text => {
                                setFilter(text); // Log the typed text to console
                                onSearch(text); // Trigger the search with the typed text
                              }}
                              placeholder="Search..."
                            />
                          )}
                        />
                      </View>
                      <View
                        style={{
                          width: wp(45),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              fontFamily: mainFontBold,
                              color: 'black',
                            }}>
                            Dose
                          </Text>
                          <Dropdown
                            style={[styles.dropdown, {width: wp(17)}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={doses}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Unit"
                            value={el.doses}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item: any) => {
                              handleUpdateContentForLikedMedicine(
                                item.value,
                                'doses',
                                index,
                              );
                            }}
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              fontFamily: mainFontBold,
                              color: 'black',
                            }}>
                            Dose Form:
                          </Text>
                          <Dropdown
                            style={[styles.dropdown, {width: wp(26)}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={doseFormArr}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Dose"
                            search
                            searchPlaceholder="Search..."
                            value={el.dose_form}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item: any) => {
                              handleUpdateContentForLikedMedicine(
                                item.value,
                                'dose_form',
                                index,
                              );
                            }}
                          />
                        </View>
                      </View>
                      <View style={{width: wp(40)}}>
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            fontFamily: mainFontBold,
                            color: 'black',
                          }}>
                          ROA:
                        </Text>
                        <Dropdown
                          style={[styles.dropdown]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={roa.map(option => ({
                            label: option.label,
                            value: option.value,
                          }))}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select ROA"
                          search
                          searchPlaceholder="Search..."
                          value={el.roa}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={(item: any) => {
                            handleUpdateContentForLikedMedicine(
                              item.value,
                              'roa',
                              index,
                            );
                          }}
                        />
                      </View>
                      <View style={{width: wp(45)}}>
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            fontFamily: mainFontBold,
                            color: 'black',
                          }}>
                          Time:
                        </Text>
                        <Dropdown
                          style={[styles.dropdown]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={TimeData}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select Time"
                          value={el.time}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={(item: any) => {
                            handleUpdateContentForLikedMedicine(
                              item.value,
                              'time',
                              index,
                            );
                          }}
                        />
                      </View>
                      <View style={{width: wp(45)}}>
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            fontFamily: mainFontBold,
                            color: 'black',
                          }}>
                          Frequency:
                        </Text>
                        <Dropdown
                          style={[styles.dropdown]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={DaysData}
                          maxHeight={300}
                          labelField="label"
                          search
                          searchPlaceholder="Search..."
                          valueField="value"
                          placeholder="Select"
                          value={el.frequency}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={(item: any) => {
                            handleUpdateContentForLikedMedicine(
                              item.value,
                              'frequency',
                              index,
                            );
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: wp(45),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              fontFamily: mainFontBold,
                              color: 'black',
                            }}>
                            Count
                          </Text>
                          <Dropdown
                            style={[styles.dropdown, {width: wp(18)}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={duration_count}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Unit"
                            value={el.duration_count}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item: any) => {
                              handleUpdateContentForLikedMedicine(
                                item.value,
                                'duration_count',
                                index,
                              );
                            }}
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              fontFamily: mainFontBold,
                              color: 'black',
                            }}>
                            Duration:
                          </Text>
                          <Dropdown
                            style={[styles.dropdown, {width: wp(26)}]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={durationCountData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Duration"
                            value={el.duration}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={(item: any) => {
                              handleUpdateContentForLikedMedicine(
                                item.value,
                                'duration',
                                index,
                              );
                            }}
                          />
                        </View>
                      </View>

                      {/* add update and delete */}

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: hp(2),
                          alignSelf: 'center',
                          paddingTop: hp(1),
                          paddingBottom: hp(1),
                          width: wp(95),
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            handleAddLikedMedicine(
                              el.name,
                              el.time,
                              el.frequency,
                              el.duration,
                              el.note,
                              el.roa,
                              el.doses,
                              el.dose_form,
                              el.duration_count,
                              el.combination,
                            );
                            console.log('working fine');
                          }}
                          style={{
                            paddingHorizontal: 15,
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
                            Add to Prescription
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>{
                             handleUpdateLikedMedicine(
                              el._id,
                              el.name,
                              el.time,
                              el.frequency,
                              el.duration,
                              el.note,
                              el.roa,
                              el.doses,
                              el.dose_form,
                              el.duration_count,
                              el.combination,
                            );

                            }}
                          style={{
                            paddingHorizontal: 15,
                            height: hp(5),
                            backgroundColor: '#50B148',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: wp(5),
                          }}>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              color: 'white',
                              fontFamily: mainFontmedium,
                            }}>
                            Update
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => handleDeleteLikedMedicine(el._id)}
                          style={{
                            paddingHorizontal: 15,
                            height: hp(5),
                            backgroundColor: '#fc034e',
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: wp(5),
                          }}>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              color: 'white',
                              fontFamily: mainFontmedium,
                            }}>
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}

                {!showAll && (
                  <Button title="View More" onPress={() => {
                    setShowAll(true);
                    getAllLikedMedicinesFromDatabase(true);
                  }} />
                )}

                {/* frequenlty asked medicnes closed */}
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
                        fontFamily: mainFontBold,
                        color: 'black',
                      }}>
                      Investigation:
                    </Text>
                    <TextInput
                      onChangeText={e => setInvestigation(e)}
                      value={investigation}
                      placeholderTextColor="#8E8E8E"
                      placeholder="Investigation"
                      style={styles.inputBoxStyl}
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
                        fontFamily: mainFontBold,
                        color: 'black',
                      }}>
                      Notes:
                    </Text>
                    <TextInput
                      onChangeText={e => setNotes(e)}
                      value={notes}
                      placeholderTextColor="#8E8E8E"
                      placeholder="Notes"
                      style={styles.inputBoxStyl}
                    />
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          paddingTop: hp(1),
          paddingBottom: hp(1),
          width: wp(95),
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: wp(45),
            height: hp(5),
            backgroundColor: '#000',
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
            Close
          </Text>
        </TouchableOpacity>
        <Modal
          isVisible={preView}
          animationIn={'bounceIn'}
          animationOut={'slideOutDown'}
          onBackButtonPress={() => setPreview(false)}
          style={{marginLeft: 0, marginRight: 0}}>
          <TouchableWithoutFeedback onPress={() => setPreview(false)}>
            <PreView
              objectData={sendData}
              clodeBtn={clodeModal}
              images={selectedImage}
            />
          </TouchableWithoutFeedback>
        </Modal>

        <TouchableOpacity
          onPress={() => handleAddPrescription()}
          style={{
            width: wp(45),
            height: hp(5),
            backgroundColor: '#50B148',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: wp(5),
          }}>
          <Text
            style={{
              fontSize: hp(1.8),
              color: 'white',
              fontFamily: mainFontmedium,
            }}>
            {isEditModeOn ? 'Update' : 'Review'} Prescription
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={medicineModal}
        animationIn={'bounceIn'}
        animationOut={'slideOutDown'}
        onBackButtonPress={() => setMedicineModal(false)}
        style={{marginLeft: 0, marginRight: 0}}>
        <View
          style={{
            width: wp(85),
            paddingTop: hp(3),
            paddingBottom: hp(3),
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 5,
            paddingLeft: wp(4),
            paddingRight: wp(4),
          }}>
          <TouchableOpacity
            onPress={() => setMedicineModal(false)}
            style={{alignSelf: 'flex-end'}}>
            <Image
              source={require('../../assets/images/close.png')}
              style={{tintColor: 'black', height: wp(5), width: wp(5)}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontFamily: mainFont,
              fontWeight: 'bold',
            }}>
            Add New Medicine
          </Text>

          <TextInput
            placeholder="Name"
            style={{marginTop: 15, color: 'gray', backgroundColor: '#e6edf7'}}
            onChangeText={e => setName(e)}
            value={name}
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="Combination"
            style={{
              marginVertical: 15,
              color: 'gray',
              backgroundColor: '#e6edf7',
            }}
            onChangeText={e => setcombination(e)}
            value={combination}
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="Company"
            style={{
              marginVertical: 15,
              color: 'gray',
              backgroundColor: '#e6edf7',
            }}
            onChangeText={e => setCompany(e)}
            value={company}
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            onPress={() => handleAddMedicineToDataBase()}
            style={{
              minWidth: wp(80),
              height: 42,
              marginTop: 15,
              alignSelf: 'center',
              backgroundColor: '#1263AC',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: 'white', fontFamily: mainFont, fontSize: hp(1.8)}}>
              Add Medicine
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: hp(6),
    borderColor: 'gray',
    borderWidth: 0.7,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: hp(1.1),
    width: wp(45),
    fontSize: hp(1.8),
    backgroundColor: '#F2F2F2E5',
  },
  inputBoxStyl: {
    height: hp(6),
    backgroundColor: '#F2F2F2E5',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.7,
    fontSize: hp(1.8),
    // width:wp(45)
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    fontSize: hp(1.7),
  },
  placeholderStyle: {
    fontSize: hp(1.7),
    color: '#8E8E8E',
  },
  selectedTextStyle: {
    fontSize: hp(1.8),
    color: '#8E8E8E',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: hp(1.8),
    color: '#8E8E8E',
  },
});

export default Write_Prescription;
