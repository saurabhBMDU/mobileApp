// import {
//   View,
//   Text,
//   KeyboardAvoidingView,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   Dimensions,
//   Platform,
//   Pressable,
//   Linking,
//   ScrollView,
// } from 'react-native';
// import React, {useContext, useEffect, useState, useRef} from 'react';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import url, {fileurl, generateFilePath} from '../Services/url.service';
// import DocumentPicker from 'react-native-document-picker';

// import io from 'socket.io-client';
// import moment from 'moment';
// import {Roles} from '../utils/constant';
// import {getAppointmentById} from '../Services/appointments.service';
// import {LoginContext} from '../../App';
// import {toastError, toastSuccess} from '../utils/toast.utils';
// import {addAppointmentHistory} from '../Services/appointmentHistory.service';
// import {getUser} from '../Services/user.service';
// import {fileUpload} from '../Services/fileUpload.service';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import Attachment_Send_icons from 'react-native-vector-icons/MaterialCommunityIcons'; // send and attachment

// const {height, width} = Dimensions.get('window');
// export default function Chat(props: any) {
//   //  auto scroller code
//   const flatListRef = useRef<FlatList>(null);
//   const scrollToBottom = () => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToEnd({animated: true});
//     }
//   };

//   const mainFont = 'Montserrat-Regular';
//   const mainFontBold = 'Montserrat-Bold';
//   const mainFontmedium = 'Montserrat-Medium';
//   const maincolor = '#1263AC';
//   const [doctorName, setDoctorName] = useState('');
//   const [patientName, setPatientName] = useState('');

//   const focused = useIsFocused();
//   const [user, setUser] = useContext(LoginContext);

//   const navigation: any = useNavigation();
//   const [appointmentData, setAppointmentData] = useState<any>();

//   const [userObj, setUserObj] = useState<any>('');
//   const [userMessage, setUserMessage] = useState('');

//   const [msgArr, setMsgArr] = useState<
//     {
//       message: string;
//       fromId: string;
//       toId: string;
//       type: string;
//       _id: string;
//       timestamp: string;
//       told?: string;
//     }[]
//   >([]);

//   console.log('message arra',msgArr)

//   const [socket, setSocket] = useState<any>();

//   const allowedFile = [
//     'image/png',
//     // "application/pdf",
//     'image/jpeg',
//     'image/jpg',
//   ];
//   const handleGetAndSetUser = async () => {
//     let userData = await getUser();
//     if (userData) {
//       socket?.emit('join', userData?._id);
//       setUserObj(userData);
//     }
//   };
//   useEffect(() => {
//     let socket: any;
//     if (focused && userObj && userObj._id) {
//       socket = io(fileurl);
//       if (socket) {
//         setSocket(socket);
//         socket.emit('join', userObj._id);
//         socket.on(userObj._id, (data: any) => {
//           console.log(data, 'data');
//           setMsgArr(prevData => [...prevData, {...data, toId: data.toUserId}]);
//         });
//       }
//     } else {
//       socket?.disconnect();
//     }
//     return () => {
//       socket?.disconnect();
//     };
//   }, [focused, userObj]);

//   const handleSubmit = async () => {
//     try {
//       if (!userMessage) return;
//       // e.preventDefault();
//       let tmpMessage = userMessage;

//       let toUserId = '';
//       if (Roles.DOCTOR === userObj?.role) {
//         toUserId = appointmentData?.expert;
//       } else {
//         toUserId = appointmentData?.doctor?._id;
//       }

//       socket?.emit('message', {
//         toUserId: toUserId,
//         message: userMessage,
//         userId: userObj._id,
//         type: 'text',
//       });
//       setUserMessage('');

//       setMsgArr(prev => [
//         ...prev,
//         {
//           toId: toUserId,
//           message: tmpMessage,
//           type: 'text',
//           fromId: userObj._id,
//           timestamp: new Date().toISOString(),
//           _id: new Date().toISOString(),
//         },
//       ]);
//       const res = await addAppointmentHistory(appointmentData._id, {
//         message: tmpMessage,
//         toId: toUserId,
//         type: 'text',
//       });

//       // dispatch(addHistory(data._id, { message: messages, toId: toUserId }));
//     } catch (error) {
//       toastError(error);
//     }
//   };

//   const getFromUser = (message: any) => {
//     console.log(message.fromId, userObj?._id, message.fromId == userObj?._id);
//     if (message.fromId == userObj?._id) {
//       return 'user';
//     } else {
//       console.log('other');
//       return 'other';
//     }
//   };

//   const handleGetAppointmentById = async () => {
//     try {
//       let {data: res} = await getAppointmentById(
//         props?.route?.params?.data,
//       );
//       if (res.data) {
//         setDoctorName(res?.data?.doctor?.name);
//         setPatientName(res?.data?.patientName);
//         console.log(JSON.stringify(res?.data?.history, null, 2));
//         setMsgArr(res?.data?.history);
//         setAppointmentData(res.data);
//       }
//       // console.log(JSON.stringify(res, null, 2), "appointments")
//     } catch (err) {
//       toastError(err);
//     }
//   };

//   useEffect(() => {
//     if (focused && props?.route?.params?.data) {
//       handleGetAndSetUser();
//       handleGetAppointmentById();
//     }
//   }, [focused, props?.route?.params?.data]);

//   const handleDocumentPicker = async () => {
//     try {
//       let file: any = await DocumentPicker.pick({
//         presentationStyle: 'fullScreen',
//         allowMultiSelection: true,
//         type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
//       });
//       if (file) {
//         let toUserId = '';
//         if (Roles.DOCTOR === userObj?.role) {
//           toUserId = appointmentData?.expert;
//         } else {
//           toUserId = appointmentData?.doctor?._id;
//         }
//         for (const el of file) {
//           let formData = new FormData();
//           formData.append('file', el);
//           let {data: res} = await fileUpload(formData);
//           if (res.message) {
//             console.log(res, 'response', el, 'ele');
//             toastSuccess(res.message);

//             setMsgArr(prev => [
//               ...prev,
//               {
//                 toId: toUserId,
//                 message: res.data,
//                 fromId: userObj._id,
//                 type: el.type,
//                 timestamp: new Date().toISOString(),
//                 _id: new Date().toISOString(),
//               },
//             ]);
//             console.log(
//               {
//                 toUserId: toUserId,
//                 message: res.data,
//                 fromId: userObj._id,
//                 type: el.type,
//               },
//               'asdasdasdsad',
//             );
//             socket?.emit('message', {
//               toUserId: toUserId,
//               message: res.data,
//               fromId: userObj._id,
//               type: el.type,
//             });
//             await addAppointmentHistory(appointmentData._id, {
//               message: res.data,
//               toId: toUserId,
//               type: el.type,
//             });
//           }
//         }
//       }
//     } catch (error) {
//       toastError(error);
//     }
//   };

//   return (
//     <View style={{height: height}}>
//       <ScrollView>
//         <View
//           style={{
//             width: width,
//             height: height - wp(13),
//             backgroundColor: '#E2E2E2',
//             justifyContent: 'space-between',
//           }}>
//           <View
//             style={{
//               width: width,
//               height: hp(7),
//               backgroundColor: '#F1F8FF',
//               paddingLeft: wp(3),
//               paddingRight: wp(4),
//               alignItems: 'center',
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 height: hp(10),
//                 alignItems: 'center',
//               }}>
//               <Text
//                 style={{
//                   fontSize: hp(2),
//                   color: 'black',
//                   fontFamily: mainFontBold,
//                   textTransform: 'capitalize',
//                 }}>
//                 {userObj?.role == Roles.DOCTOR ? patientName : doctorName}
//               </Text>
//             </View>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={{
//                 height: wp(7),
//                 width: wp(7),
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <Image
//                 source={require('../../assets/images/close.png')}
//                 style={{
//                   tintColor: 'black',
//                   height: wp(4),
//                   width: wp(4),
//                   resizeMode: 'contain',
//                 }}
//               />
//             </TouchableOpacity>
//           </View>
//           {/*  chat render screen */}
//           <FlatList
//             ref={flatListRef}
//             data={msgArr}
//             renderItem={({item, index}) => {
//               return (
//                 <View
//                   style={{
//                     width: width,
//                     paddingTop: hp(1),
//                     paddingBottom: hp(1),
//                     backgroundColor: '#eee',
//                     alignSelf: 'center',
//                     paddingLeft: wp(1),
//                   }}>
//                   {getFromUser(item) === 'user' && (
//                     <View
//                       style={{
//                         width: wp(98),
//                         flexDirection: 'column',
//                         marginBottom: hp(1),
//                         justifyContent: 'space-between',
//                         paddingRight: wp(1),
//                         paddingLeft: wp(0.5),
//                         alignSelf: 'center',
//                       }}>
//                       {!item.type || item.type == 'text' ? (
//                         <View
//                           style={{
//                             backgroundColor: maincolor,
//                             padding: wp(3.8),
//                             borderTopLeftRadius: 30,
//                             borderTopRightRadius: 30,
//                             borderBottomLeftRadius: 30,
//                             borderBottomRightRadius: 1,
//                             marginLeft: wp(1),
//                             alignSelf: 'flex-end',
//                           }}>
//                           <Text
//                             style={{
//                               color: '#fff',
//                               fontSize: hp(1.8),
//                               fontFamily: mainFont,
//                             }}>
//                             {item.message}
//                           </Text>
//                         </View>
//                       ) : allowedFile.some(el =>
//                           el.toLowerCase().includes(item.type.toLowerCase()),
//                         ) ? (
//                         <Image
//                           source={{uri: generateFilePath(item.message)}}
//                           style={{
//                             height: wp(40),
//                             width: wp(40),
//                             borderRadius: 10,
//                             alignSelf: 'flex-end',
//                           }}
//                         />
//                       ) : (
//                         <Pressable
//                           onPress={() =>
//                             Linking.openURL(generateFilePath(item.message))
//                           }
//                           style={{
//                             backgroundColor: maincolor,
//                             padding: 15,
//                             borderRadius: 5,
//                             marginLeft: wp(1),
//                             alignSelf: 'flex-end',
//                           }}>
//                           <Text style={{color: 'white'}}>
//                             Click to open file
//                           </Text>
//                         </Pressable>
//                       )}
//                       {/* date time */}
//                       <Text
//                         style={{
//                           color: '#4A4040B2',
//                           fontSize: hp(1.2),
//                           fontFamily: mainFont,
//                           alignSelf: 'flex-end',
//                         }}>
//                         {moment(item.timestamp).format('DD/MM/YY hh:mm a')}
//                       </Text>
//                     </View>
//                   )}

//                   {!(getFromUser(item) === 'user') && (
//                     <View
//                       style={{
//                         width: wp(98),
//                         flexDirection: 'column',
//                         marginBottom: hp(1),
//                         justifyContent: 'space-between',
//                         paddingRight: wp(1),
//                         alignSelf: 'center',
//                       }}>
//                       {!item.type || item.type == 'text' ? (
//                         <View
//                           style={{
//                             backgroundColor: 'gray',
//                             padding: wp(3.8),
//                             borderTopLeftRadius: 1,
//                             borderTopRightRadius: 30,
//                             borderBottomLeftRadius: 30,
//                             borderBottomRightRadius: 30,
//                             alignSelf: 'flex-start',
//                           }}>
//                           <Text
//                             style={{
//                               color: '#fff',
//                               fontSize: hp(1.8),
//                               fontFamily: mainFont,
//                             }}>
//                             {item.message}
//                           </Text>
//                         </View>
//                       ) : allowedFile.some(el =>
//                           el.toLowerCase().includes(item.type.toLowerCase()),
//                         ) ? (
//                         <Image
//                           source={{uri: generateFilePath(item.message)}}
//                           style={{
//                             height: wp(40),
//                             width: wp(40),
//                             borderRadius: 10,
//                             alignSelf: 'flex-start',
//                           }}
//                         />
//                       ) : (
//                         <Pressable
//                           onPress={() =>
//                             Linking.openURL(generateFilePath(item.message))
//                           }
//                           style={{
//                             backgroundColor: maincolor,
//                             padding: 15,
//                             borderRadius: 5,
//                             marginLeft: wp(1),
//                             alignSelf: 'flex-start',
//                           }}>
//                           <Text style={{color: 'white'}}>
//                             Click to open file
//                           </Text>
//                         </Pressable>
//                       )}
//                       <Text
//                         style={{
//                           color: '#4A4040B2',
//                           fontSize: hp(1.5),
//                           fontFamily: mainFont,
//                         }}>
//                         {moment(item.timestamp).format('DD/MM/YY hh:mm a')}
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//               );
//             }}
//             keyExtractor={(item, index) => index.toString()}
//             onContentSizeChange={scrollToBottom} // Automatically scrolls to bottom when content size changes
//             onLayout={scrollToBottom}
//           />
//           S
//         </View>

//         <View style={{backgroundColor: 'red'}}>
//           <View
//             style={{
//               width: width,
//               backgroundColor: '#E2E2E2',
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}>
//             <View style={{width: wp(75)}}>
//               <View
//                 style={{
//                   backgroundColor: 'white',
//                   borderRadius: 5,
//                   marginLeft: wp(1),
//                 }}>
//                 <TextInput
//                   placeholder="Message..."
//                   placeholderTextColor={'gray'}
//                   style={{color: 'black', width: '100%'}}
//                   value={userMessage}
//                   onChangeText={text => setUserMessage(text)}
//                 />
//               </View>
//             </View>

//             <View
//               style={{
//                 width: wp(25),
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 marginRight: 10,
//               }}>
//               <TouchableOpacity onPress={() => handleDocumentPicker()}>
//                 <Attachment_Send_icons
//                   name="attachment"
//                   style={{fontSize: wp(9), color: maincolor}}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => handleSubmit()}>
//                 <Attachment_Send_icons
//                   name="send"
//                   style={{fontSize: wp(9), color: maincolor, marginRight: 3}}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }


























import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Platform,
  Pressable,
  Linking,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import url, { fileurl, generateFilePath } from '../Services/url.service';
import DocumentPicker from 'react-native-document-picker';

import io from 'socket.io-client';
import moment from 'moment';
import { Roles } from '../utils/constant';
import { getAppointmentById } from '../Services/appointments.service';
import { LoginContext } from '../../App';
import { toastError, toastSuccess } from '../utils/toast.utils';
import { addAppointmentHistory } from '../Services/appointmentHistory.service';
import { getUser } from '../Services/user.service';
import { fileUpload } from '../Services/fileUpload.service';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Import useKeyboard hook from your library

import Attachment_Send_icons from 'react-native-vector-icons/MaterialCommunityIcons'; // send and attachment
import { SendNotification, SendNotificationForMeetingCreation } from '../Services/notificationSevice';


import LoadingModal from './ChatLoadingModal';

const { height, width } = Dimensions.get('window');
export default function Chat (props: any) {
  console.log('props in chat app for chatting individual persons',props)
  console.log('clik on chat inside app', props?.route?.params?.data,)
  console.log('clik on chat outside of app', props?.route?.params?.data)
  //  auto scroller code
  const flatListRef = useRef<FlatList>(null);
  // const scrollToBottom = () => {
  //   if (flatListRef.current) {
  //     // flatListRef.current.scrollToEnd({ animated: false });
  //     flatListRef.current?.scrollToOffset({
  //           offset: 0,
  //           // animated,
  //         });
  //   }
  // };

  const scrollToBottom = (animated = true) => {
    flatListRef.current?.scrollToEnd({ animated: false });
  };


  const mainFont = 'Montserrat-Regular';
  const mainFontBold = 'Montserrat-Bold';
  const mainFontmedium = 'Montserrat-Medium';
  // const maincolor = '#1263AC';
  const maincolor = '#E7FFDD'
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');

  const focused = useIsFocused();
  const [user, setUser] = useContext(LoginContext);

  const navigation: any = useNavigation();
  const [appointmentData, setAppointmentData] = useState<any>();

  const [userObj, setUserObj] = useState<any>('');
  const [userMessage, setUserMessage] = useState('');

  const [msgArr, setMsgArr] = useState<
    {
      message: string;
      fromId: string;
      toId: string;
      type: string;
      _id: string;
      timestamp: string;
      told?: string;
    }[]
  >([]);

  // console.log('array for user chatting in chat line no 606',msgArr)

  const [socket, setSocket] = useState<any>();

  const allowedFile = [
    'image/png',
    // "application/pdf",
    'image/jpeg',
    'image/jpg',
  ];
  const handleGetAndSetUser = async () => {
    let userData = await getUser();
    if (userData) {
      socket?.emit('join', userData?._id);
      setUserObj(userData);
    }
  };
  useEffect(() => {
    let socket: any;
    if (focused && userObj && userObj._id) {
      socket = io(fileurl);
      if (socket) {
        setSocket(socket);
        socket.emit('join', userObj._id);
        socket.on(userObj._id, (data: any) => {
          // console.log(data, 'data');
          setMsgArr(prevData => [...prevData, { ...data, toId: data.toUserId }]);
        });
      }
    } else {
      socket?.disconnect();
    }
    return () => {
      socket?.disconnect();
    };
  }, [focused, userObj]);

  const handleSubmit = async () => {
    try {
      if (!userMessage) return;
      // e.preventDefault();
      let tmpMessage = userMessage;

      let toUserId = '';
      if (Roles.DOCTOR === userObj?.role) {
        toUserId = appointmentData?.expert;
      } else {
        toUserId = appointmentData?.doctor?._id;
      }

      socket?.emit('message', {
        toUserId: toUserId,
        message: userMessage,
        userId: userObj._id,
        type: 'text',
      });
      setUserMessage('');

      setMsgArr(prev => [
        ...prev,
        {
          toId: toUserId,
          message: tmpMessage,
          type: 'text',
          fromId: userObj._id,
          timestamp: new Date().toISOString(),
          _id: new Date().toISOString(),
        },
      ]);
      const res = await addAppointmentHistory(appointmentData._id, {
        message: tmpMessage,
        toId: toUserId,
        type: 'text',
      });
     
      // SendNotificationForMeetingCreation({ appointment: tmpMessage })
      // SendNotification({ appointment: toUserId })



      await SendNotificationForMeetingCreation({ appointment: userObj._id})
        // SendNotificationForMeetingCreation({
        //     appointmentId: appointmentData._id,
           
        // })
    
    
    //   let result =   await SendNotification({
    //     appointmentId: appointmentData._id,
    //     userId: userObj._id,
    // });
  
      // dispatch(addHistory(data._id, { message: messages, toId: toUserId }));
    } catch (error) {
      toastError(error);
    }
  };

  const getFromUser = (message: any) => {
    // console.log(message.fromId, userObj?._id, message.fromId == userObj?._id);
    if (message.fromId == userObj?._id) {
      return 'user';
    } else {
      // console.log('other');
      return 'other';
    }
  };

  const handleGetAppointmentById = async () => {
    try {
      let { data: res } = await getAppointmentById(
        props?.route?.params?.data,
      );
      if (res.data) {
        setDoctorName(res?.data?.doctor?.name);
        setPatientName(res?.data?.patientName);
        // console.log(JSON.stringify(res?.data?.history, null, 2));
        setMsgArr(res?.data?.history);
        setAppointmentData(res.data);
      }
      // console.log(JSON.stringify(res, null, 2), "appointments")
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
    if (focused && props?.route?.params?.data) {
      handleGetAndSetUser();
      handleGetAppointmentById();
    }
  }, [focused, props?.route?.params?.data]);

  const handleDocumentPicker = async () => {
    try {
      let file: any = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      if (file) {
        let toUserId = '';
        if (Roles.DOCTOR === userObj?.role) {
          toUserId = appointmentData?.expert;
        } else {
          toUserId = appointmentData?.doctor?._id;
        }
        for (const el of file) {
          let formData = new FormData();
          formData.append('file', el);
          let { data: res } = await fileUpload(formData);
          if (res.message) {
            // console.log(res, 'response', el, 'ele');
            toastSuccess(res.message);

            setMsgArr(prev => [
              ...prev,
              {
                toId: toUserId,
                message: res.data,
                fromId: userObj._id,
                type: el.type,
                timestamp: new Date().toISOString(),
                _id: new Date().toISOString(),
              },
            ]);
            // console.log(
            //   {
            //     toUserId: toUserId,
            //     message: res.data,
            //     fromId: userObj._id,
            //     type: el.type,
            //   },
            //   'asdasdasdsad',
            // );
            socket?.emit('message', {
              toUserId: toUserId,
              message: res.data,
              fromId: userObj._id,
              type: el.type,
            });
            await addAppointmentHistory(appointmentData._id, {
              message: res.data,
              toId: toUserId,
              type: el.type,
            });
          }
        }
      }
    } catch (error) {
      toastError(error);
    }
  };

  // const flatListRef = useRef<FlatList>(null);
  const [keyboardOffset, setKeyboardOffset] = useState<number>(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = (event: KeyboardEvent): void => {
    setKeyboardOffset(event.endCoordinates.height);
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const keyboardDidHide = (): void => {
    setKeyboardOffset(0);
  };



  // const scrollToBottom = (animated = true) => {
  //   flatListRef.current?.scrollToOffset({
  //     offset: 0,
  //     animated,
  //   });
  // };

  // Scroll to bottom on initial render
  useEffect(() => {
    if (msgArr.length > 0) {
      scrollToBottom(false);
    }
  }, []);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (msgArr.length > 0) {
      scrollToBottom(true);
    }
  }, [msgArr]);
 

//   return (
//     // <View style={{
//     //   height: height,
//     //   // height: height - wp(50) - hp(20), 
//     //   // backgroundColor:'white'
//     // }}>

//     <TouchableWithoutFeedback
//      onPress={Keyboard.dismiss}>
//        <KeyboardAvoidingView
//         // keyboardVerticalOffset={hp(5)}
//         // behavior={'padding'}
//         // style={styles.container}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 60 :10} // Adjust as needed
//         // style={{
//           // backgroundColor: 'red',
//           // marginBottom:10,
//         // }}
//         // behavior={'padding'}
//         // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={{ flex: 1 }}
//         >

//       <View
//         style={{
//           // width: width,
//           // height: height,
//           // height: height - wp(5),
//           // height: height - wp(5) - hp(10),
//           // backgroundColor: '#E2E2E2',
//           // backgroundColor: 'white',
//           backgroundColor: '#EFE6DD',
//           justifyContent: 'space-between',
//         }}>
//         <View
//           style={{
//             width: width,
//             height: hp(7),
//             // backgroundColor: '#F1F8FF',
//            backgroundColor: '#1263AC',
//             paddingLeft: wp(3),
//             paddingRight: wp(4),
//             alignItems: 'center',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               height: hp(10),
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 fontSize: hp(2),
//                 color: '#fff',
//                 fontFamily: mainFontBold,
//                 textTransform: 'capitalize',
//               }}>
//               {userObj?.role == Roles.DOCTOR ? patientName : doctorName}
//             </Text>
//           </View>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={{
//               height: wp(7),
//               width: wp(7),
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Image
//               source={require('../../assets/images/close.png')}
//               style={{
//                 tintColor: '#fff',
//                 height: wp(4),
//                 width: wp(4),
//                 resizeMode: 'contain',
//               }}
//             />
//           </TouchableOpacity>
//         </View>
//         {/* {/  chat render screen /} */}
//         {/* <View
//           style={{
//             // marginBottom: height - wp(187),
//             // backgroundColor: '#EFE6DD',
//             // marginBottom:149,
//           }}
//         > */}
        
//         {/* flat to scolview */}
//         <ScrollView
//     ref={flatListRef}
//   contentContainerStyle={{ flexGrow: 1 }}
//   onContentSizeChange={() => scrollToBottom(true)}
//   // onEndReached={fetchMoreMessages}
//   onEndReachedThreshold={0.1}
// >
//   <View>
// {msgArr.length === 0 ? (
//   <>
//   <LoadingModal/>
// </>
// ) : (
//   msgArr.map((item, index) => (
//     <View
//       key={index.toString()}
//       style={{
//         backgroundColor: '#EFE6DD',
//       }}
//     >
//       <View
//         style={{
//           width: width,
//           backgroundColor: '#EFE6DD',
//           alignSelf: 'center',
//           paddingTop: 10,
//           paddingRight: 10,
//           paddingLeft: 10,
//         }}
//       >
//         {getFromUser(item) === 'user' && (
//           <View
//             style={{
//               width: wp(98),
//               flexDirection: 'column',
//               marginBottom: hp(1),
//               justifyContent: 'space-between',
//               paddingRight: wp(1),
//               paddingLeft: wp(0.5),
//               alignSelf: 'center',
//             }}
//           >
//             {!item.type || item.type == 'text' ? (
//               <View
//                 style={{
//                   backgroundColor: maincolor,
//                   padding: wp(3.8),
//                   borderTopLeftRadius: 30,
//                   borderTopRightRadius: 30,
//                   borderBottomLeftRadius: 30,
//                   borderBottomRightRadius: 1,
//                   marginLeft: wp(1),
//                   alignSelf: 'flex-end',
//                   marginRight: wp(2),
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: 'black',
//                     fontSize: hp(2),
//                   }}
//                 >
//                   {item.message}
//                 </Text>
//               </View>
//             ) : allowedFile.some(el =>
//                 el.toLowerCase().includes(item.type.toLowerCase()),
//               ) ? (
//                 <Image
//                   source={{ uri: generateFilePath(item.message) }}
//                   style={{
//                     height: wp(40),
//                     width: wp(40),
//                     borderRadius: 10,
//                     alignSelf: 'flex-end',
//                   }}
//                 />
//               ) : (
//                 <Pressable
//                   onPress={() =>
//                     Linking.openURL(generateFilePath(item.message))
//                   }
//                   style={{
//                     backgroundColor: maincolor,
//                     padding: 15,
//                     borderRadius: 5,
//                     marginLeft: wp(1),
//                     alignSelf: 'flex-end',
//                   }}
//                 >
//                   <Text style={{ color: 'white' }}>Click to open file</Text>
//                 </Pressable>
//               )}
//             <Text
//               style={{
//                 color: '#453f3b',
//                 fontSize: hp(1.2),
//                 fontFamily: mainFont,
//                 alignSelf: 'flex-end',
//                 fontWeight: "bold",
//                 marginRight: wp(2),
//               }}
//             >
//               {moment(item.timestamp).format('DD/MM/YY hh:mm a')}
//             </Text>
//           </View>
//         )}

//         {!(getFromUser(item) === 'user') && (
//           <View
//             style={{
//               width: wp(98),
//               flexDirection: 'column',
//               marginBottom: hp(1),
//               justifyContent: 'space-between',
//               paddingRight: wp(1),
//               alignSelf: 'center',
//             }}
//           >
//             {!item.type || item.type == 'text' ? (
//               <View
//                 style={{
//                   backgroundColor: 'white',
//                   padding: wp(3.8),
//                   borderTopLeftRadius: 1,
//                   borderTopRightRadius: 30,
//                   borderBottomLeftRadius: 30,
//                   borderBottomRightRadius: 30,
//                   alignSelf: 'flex-start',
//                   marginLeft: wp(2),
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: 'black',
//                     fontSize: hp(2),
//                   }}
//                 >
//                   {item.message}
//                 </Text>
//               </View>
//             ) : allowedFile.some(el =>
//                 el.toLowerCase().includes(item.type.toLowerCase()),
//               ) ? (
//                 <Image
//                   source={{ uri: generateFilePath(item.message) }}
//                   style={{
//                     height: wp(40),
//                     width: wp(40),
//                     borderRadius: 10,
//                     alignSelf: 'flex-start',
//                   }}
//                 />
//               ) : (
//                 <Pressable
//                   onPress={() =>
//                     Linking.openURL(generateFilePath(item.message))
//                   }
//                   style={{
//                     backgroundColor: maincolor,
//                     padding: 15,
//                     borderRadius: 5,
//                     marginLeft: wp(1),
//                     alignSelf: 'flex-start',
//                   }}
//                 >
//                   <Text style={{ color: 'white' }}>Click to open file</Text>
//                 </Pressable>
//               )}
//             <Text
//               style={{
//                 color: '#453f3b',
//                 fontSize: hp(1.5),
//                 fontFamily: mainFont,
//                 fontWeight: 'bold',
//                 marginLeft: wp(2),
//               }}
//             >
//               {moment(item.timestamp).format('DD/MM/YY hh:mm a')}
//             </Text>
//           </View>
//         )}
//       </View>
//     </View>
//   ))
// )}
// </View>
//   <View style={{ height: keyboardOffset }} />
// </ScrollView>


//         {/* </View> */}

        
//       </View>

     
//         {/* <View
//           style={{
//             width: width,
//             backgroundColor: 'black',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//           <View style={{width: wp(75)}}>
//             <View
//               style={{
//                 backgroundColor: 'white',
//                 borderRadius:15,
//                 // marginLeft: wp(1),
//                 margin:20,
                   
//               }}>
//               <TextInput
//                 placeholder="Message..."
//                 placeholderTextColor={'gray'}
//                 style={{
//                   color: 'black', 
//                   padding: 10, 
//                   borderRadius:10,
//                   borderWidth:1,
//                 }}
//                 value={userMessage}
//                 onChangeText={text => setUserMessage(text)}
//               />
//             </View>
//           </View>

//           <View
//             style={{
//               width: wp(25),
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginRight: 10,
//             }}>
//             <TouchableOpacity onPress={() => handleDocumentPicker()}>
//               <Attachment_Send_icons
//                 name="attachment"
//                 style={{fontSize: wp(9), color: maincolor}}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleSubmit()}>
//               <Attachment_Send_icons
//                 name="send"
//                 style={{fontSize: wp(9), color: maincolor, marginRight: 3}}
//               />
//             </TouchableOpacity>
//           </View>
//         </View> */}


//         <View style={{ position: 'absolute', bottom:15, marginBottom:15,
//         width: '100%',
//         //  backgroundColor: '#EFE6DD',
//           //  backgroundColor:'red',
//           flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
//           <View style={{ width: '70%',}}>
//             <View style={{ backgroundColor: 'white', borderRadius: 15,marginLeft:5,}}>
//               <TextInput
//                 placeholder="Message..."
//                 placeholderTextColor={'gray'}
//                 style={{  padding: 10, borderRadius:20 }}
//                 value={userMessage}
//                 onChangeText={text => setUserMessage(text)}
//               />
//             </View>
//           </View>

//           <View style={{ width: '25%', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }}>
//             <TouchableOpacity onPress={() => handleDocumentPicker()}>
//               <Attachment_Send_icons name="attachment" style={{ fontSize: wp(9), color: '#1263AC' }} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleSubmit()}>
//               <Attachment_Send_icons name="send" style={{ fontSize: wp(9), color: '#1263AC', marginRight: 3 }} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>

//     // </View>
//   );


return (
  <TouchableWithoutFeedback 
  style={{height:hp(100),width:wp(100),backgroundColor:'#EFE6DD'}}
  onPress={Keyboard.dismiss}
  >
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : keyboardOffset  ? 0 :30} // Adjust as needed
  >
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={[styles.headerText,{fontFamily: mainFontBold}]}>
          {userObj?.role === 'DOCTOR' ? patientName : doctorName}
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerRight}>
        <Image
          source={require('../../assets/images/close.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>

    <ScrollView
      ref={flatListRef}
      contentContainerStyle={{ 
        flexGrow: 1, 
        justifyContent: 'flex-end',
        // paddingBottom: 80,
       }}
      onContentSizeChange={scrollToBottom}
      style={styles.messagesContainer}
    >
      {msgArr.length === 0 ? (
        <LoadingModal />
      ) : (
        msgArr.map((item, index) => (
          <View key={index.toString()} style={styles.messageWrapper}>
            {getFromUser(item) === 'user' ? (
              <View style={styles.userMessage}>
                {!item.type || item.type === 'text' ? (
                  <View style={styles.userTextMessage}>
                    <Text style={[styles.messageText,{fontFamily: mainFont}]}>{item.message}</Text>
                  </View>
                ) : allowedFile.some(el => el.toLowerCase().includes(item.type.toLowerCase())) ? (
                  <Image
                    source={{ uri: generateFilePath(item.message) }}
                    style={styles.messageImage}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(generateFilePath(item.message))}
                    style={styles.fileLink}
                  >
                    <Text style={styles.fileLinkText}>Click to open file</Text>
                  </TouchableOpacity>
                )}
                <Text style={[styles.timestamp,{fontFamily: mainFont}]}>
                  {moment(item.timestamp).format('DD/MM/YY hh:mm a')}
                </Text>
              </View>
            ) : (
              <View style={styles.otherMessage}>
                {!item.type || item.type === 'text' ? (
                  <View style={styles.otherTextMessage}>
                    <Text style={styles.messageText}>{item.message}</Text>
                  </View>
                ) : allowedFile.some(el => el.toLowerCase().includes(item.type.toLowerCase())) ? (
                  <Image
                    source={{ uri: generateFilePath(item.message) }}
                    style={styles.messageImage}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(generateFilePath(item.message))}
                    style={styles.fileLink}
                  >
                    <Text style={styles.fileLinkText}>Click to open file</Text>
                  </TouchableOpacity>
                )}
                <Text style={[styles.timestamp,{fontFamily: mainFont}]}>
                  {moment(item.timestamp).format('DD/MM/YY hh:mm a')}
                </Text>
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>

    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Message..."
          placeholderTextColor="gray"
          style={[styles.textInput,{fontFamily: mainFont}]}
          value={userMessage}
          onChangeText={text => setUserMessage(text)}
        />
      </View>
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={handleDocumentPicker}>
          <Attachment_Send_icons name="attachment" style={styles.attachmentIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Attachment_Send_icons name="send" style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>

</TouchableWithoutFeedback>
);
};

const styles = StyleSheet.create({
header: {
width: '100%',
height: hp(7),
backgroundColor: '#1263AC',
paddingLeft: wp(3),
paddingRight: wp(4),
alignItems: 'center',
flexDirection: 'row',
justifyContent: 'space-between',
},
headerLeft: {
flexDirection: 'row',
height: hp(10),
alignItems: 'center',
},
headerText: {
fontSize: hp(2),
color: '#fff',
// fontFamily: mainFontBold,
textTransform: 'capitalize',
},
headerRight: {
height: wp(7),
width: wp(7),
alignItems: 'center',
justifyContent: 'center',
},
closeIcon: {
tintColor: '#fff',
height: wp(4),
width: wp(4),
resizeMode: 'contain',
},
messagesContainer: {
flex: 1,
backgroundColor: '#EFE6DD',
},
messageWrapper: {
backgroundColor: '#EFE6DD',
},
userMessage: {
width: wp(98),
flexDirection: 'column',
marginBottom: hp(1),
justifyContent: 'space-between',
paddingRight: wp(1),
paddingLeft: wp(0.5),
alignSelf: 'center',
},
userTextMessage: {
backgroundColor: '#1263AC',
padding: wp(3.8),
borderTopLeftRadius: 30,
borderTopRightRadius: 30,
borderBottomLeftRadius: 30,
borderBottomRightRadius: 1,
marginLeft: wp(1),
alignSelf: 'flex-end',
marginRight: wp(2),
},
otherMessage: {
width: wp(98),
flexDirection: 'column',
marginBottom: hp(1),
justifyContent: 'space-between',
paddingRight: wp(1),
alignSelf: 'center',
},
otherTextMessage: {
backgroundColor: 'white',
padding: wp(3.8),
borderTopLeftRadius: 1,
borderTopRightRadius: 30,
borderBottomLeftRadius: 30,
borderBottomRightRadius: 30,
alignSelf: 'flex-start',
marginLeft: wp(2),
},
messageText: {
color: 'black',
fontSize: hp(2),
// fontFamily: mainFont, // Using inline style for font
},
messageImage: {
height: wp(40),
width: wp(40),
borderRadius: 10,
alignSelf: 'flex-end',
},
fileLink: {
backgroundColor: '#1263AC',
padding: 15,
borderRadius: 5,
marginLeft: wp(1),
alignSelf: 'flex-end',
},
fileLinkText: {
color: 'white',
},
timestamp: {
color: '#453f3b',
fontSize: hp(1.2),
// fontFamily: mainFont, // Using inline style for font
alignSelf: 'flex-end',
fontWeight: 'bold',
marginRight: wp(2),
},
inputContainer: {
// position: 'absolute',
// bottom:5,
paddingBottom:5,
width: '100%',
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
backgroundColor:'#EFE6DD'
},
inputWrapper: {
width: '70%',
backgroundColor: 'white',
borderRadius: 15,
marginLeft: 5,
},
textInput: {
padding: 10,
borderRadius: 20,
// fontFamily: mainFont, // Using inline style for font
},
iconWrapper: {
width: '25%',
flexDirection: 'row',
justifyContent: 'space-between',
marginRight: 10,
},
attachmentIcon: {
fontSize: wp(9),
color: '#1263AC',
},
sendIcon: {
fontSize: wp(9),
color: '#1263AC',
marginRight: 3,
},
});