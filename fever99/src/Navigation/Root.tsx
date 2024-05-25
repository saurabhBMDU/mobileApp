import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { AuthContext, LoginContext, UserDataContext } from '../../App';
import Appointment_History from '../Components/Appointment_History';
import BookClient from '../Components/BookClient';
import BookService from '../Components/BookService';
import BookVideo from '../Components/BookVideo';
import Book_Appointment from '../Components/Book_Appointment';
import Chat from '../Components/Chat';
import Contactus from '../Components/Contact';
import EditProfile from '../profile/EditProfile';
import GetOTP from '../Components/GetOTP';
import Settings from '../setting/Settings';
import Login from '../auth/login/Login';
import Meeting from '../Components/Meeting';
import OTP from '../Components/OTP';
import Password from '../auth/login/Password';
import Paymentsuccess from '../paymentScreen/Paymentsuccess';
import PrivacyPolicy from '../privacypolicy/PrivacyPolicy';
import Referal_User from '../Components/Referal_User';
import Register from '../auth/registration/Register';
import ReturnandRefundPolicy from '../profile/refund_t&c/ReturnandRefundPolicy';

import Support from '../Components/Support'
import TermAndC from '../t&c/TermAndC';
import Write_Prescription from '../Components/Write_Prescription';
import PayementScreen from '../paymentScreen/PayementScreen';
import ClintPayment from '../ReuseableComp/ClintPayment';
import { deleteJwt, getJwt, getUser, isUserLoggedIn } from '../Services/user.service';
import BottamTab from '../TabNavigators/BottamTab';
import { useLinkTo } from '@react-navigation/native';
import ForgotPassword from '../Components/ForgotPassword';
import PaymentFail from '../paymentScreen/PaymentFail';
import Abouts_dr from '../Components/dr_full_detail/Abouts_dr';
import { toastError } from '../utils/toast.utils';
import ProfileTermsAndConditions from '../Components/ProfileTermsAndConditions';
import FAQ from '../Components/FAQ';
import AboutFeverMainPage from '../Components/AboutFeverMainPage';
import NotificationShow from '../ReuseableComp/NotificatoinShow';
import SmartPrescriptionPage from '../Components/smartPresscription';
import Income from '../Components/transaction/Income';
import Appointment from '../Components/Appointment';
import HomeFirstScreen from '../Components/HomeFirstScreen';
import ChatPreviewScreen from '../Components/ChatPreviewScreen';

const Stack = createNativeStackNavigator();



export default function Root() {




  const handleLogout = async () => {
    try {
      if(isAuthorized){
      await deleteJwt();
      setIsAuthorized(false);
      }
    } catch (err) {
      // toastError(err);
    }
  };

  useEffect(() => {
    CheckIsUserLoggedIn();
  },[])



  const CheckIsUserLoggedIn = async () => {
    try {
      let token = await getJwt();
      if(token){
      const {data: res}: any = await isUserLoggedIn();
      if (res.status == false) {
        handleLogout()
        console.log('response from backend',res)
        // throw new Error(res.error);
      }
    }
    } catch (err) {
      // toastError(err);
    }
  };


  const linkTo = useLinkTo()
  const [user, setUser] = useContext(LoginContext)
  const [userData, setUserData] = useContext(UserDataContext)
  const [isAuthorized, setIsAuthorized] = useContext(AuthContext)


  const checkAuthorized = async () => {
    let token = await getJwt();
    if (token) {
      setIsAuthorized(true)
      let userDataLocal: any = await getUser();
      if (userDataLocal) {
        setUser(userDataLocal?.role);
        setUserData(userDataLocal)
      }
    }
    else {
      setIsAuthorized(false)
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      checkAuthorized()
    }, 10000)
    checkAuthorized()
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }
    }>
      {
        isAuthorized ?
          <>
            <Stack.Screen name='BottamTab' component={BottamTab} />
            <Stack.Screen name='BookService' component={BookService} />
            <Stack.Screen name='appointments' component={Appointment} />
            <Stack.Screen name='AppointHistory' component={Appointment_History} />
            <Stack.Screen name='Chat' component={Chat} />
            <Stack.Screen name="ChatPreviewScreen" component={ChatPreviewScreen} />
            <Stack.Screen name='BookAppt' component={Book_Appointment} />
            <Stack.Screen name='About Doctor' component={Abouts_dr} />
            <Stack.Screen name='BookVdo' component={BookVideo} />
            <Stack.Screen name='ProfileTemrs' component={ProfileTermsAndConditions} />
            <Stack.Screen name='faq' component={FAQ} />
            <Stack.Screen name='SMART PRESCRIPTION' component={SmartPrescriptionPage} />
            <Stack.Screen name='Notifications' component={NotificationShow} />
            <Stack.Screen name='About fever99' component={AboutFeverMainPage} />
            <Stack.Screen name='BookClient' component={BookClient} />
            <Stack.Screen name='EditiProfile' component={EditProfile} />
            <Stack.Screen name='Write_P' component={Write_Prescription} />
            <Stack.Screen name='Ref' component={Referal_User} />
            <Stack.Screen name='Support' component={Support} />
            <Stack.Screen name='PayementScreen' component={PayementScreen} />
            <Stack.Screen name='PayementSuccess' component={Paymentsuccess} />
            <Stack.Screen name='ClintPayment' component={ClintPayment} />
            <Stack.Screen name='PayementScreen3' component={PayementScreen} />
            <Stack.Screen name='PaymentFail' component={PaymentFail} />
            <Stack.Screen name='Meeting' component={Meeting} />
            <Stack.Screen name='Settings' component={Settings} />
            <Stack.Screen name='Income' component={Income} />
          </>
          :
          <>
            <Stack.Screen name='homefirstscreen' component={HomeFirstScreen} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Password' component={Password} />
            <Stack.Screen name='OTP' component={OTP} />
            <Stack.Screen name='GetOTP' component={GetOTP} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          </>
      }
      <Stack.Screen name='ContactUs' component={Contactus} />
      <Stack.Screen name='ReturnandRefundPolicy' component={ReturnandRefundPolicy} />
      <Stack.Screen name='PAC' component={PrivacyPolicy} />
      <Stack.Screen name='TAC' component={TermAndC} />
    </Stack.Navigator>
  );
}









// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext, LoginContext, UserDataContext } from '../../App';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Appointment_History from '../Components/Appointment_History';
// import BookClient from '../Components/BookClient';
// import BookService from '../Components/BookService';
// import BookVideo from '../Components/BookVideo';
// import Book_Appointment from '../Components/Book_Appointment';
// import Chat from '../Components/Chat';
// import Contactus from '../Components/Contact';
// import EditProfile from '../profile/EditProfile';
// import GetOTP from '../Components/GetOTP';
// import Settings from '../setting/Settings';
// import Login from '../auth/login/Login';
// import Meeting from '../Components/Meeting';
// import OTP from '../Components/OTP';
// import Password from '../auth/login/Password';
// import Paymentsuccess from '../paymentScreen/Paymentsuccess';
// import PrivacyPolicy from '../privacypolicy/PrivacyPolicy';
// import Referal_User from '../Components/Referal_User';
// import Register from '../auth/registration/Register';
// import ReturnandRefundPolicy from '../profile/refund_t&c/ReturnandRefundPolicy';
// import Support from '../Components/Support';
// import TermAndC from '../t&c/TermAndC';
// import Write_Prescription from '../Components/Write_Prescription';
// import PayementScreen from '../paymentScreen/PayementScreen';
// import ClintPayment from '../ReuseableComp/ClintPayment';
// import { deleteJwt, getJwt, getUser, isUserLoggedIn } from '../Services/user.service';
// import BottamTab from '../TabNavigators/BottamTab';
// import { useLinkTo } from '@react-navigation/native';
// import ForgotPassword from '../Components/ForgotPassword';
// import PaymentFail from '../paymentScreen/PaymentFail';
// import Abouts_dr from '../Components/dr_full_detail/Abouts_dr';
// import { toastError } from '../utils/toast.utils';
// import ProfileTermsAndConditions from '../Components/ProfileTermsAndConditions';
// import FAQ from '../Components/FAQ';
// import AboutFeverMainPage from '../Components/AboutFeverMainPage';
// import NotificationShow from '../ReuseableComp/NotificatoinShow';
// import SmartPrescriptionPage from '../Components/smartPresscription';
// import Income from '../Components/transaction/Income';
// import Appointment from '../Components/Appointment';
// import HomeFirstScreen from '../Components/HomeFirstScreen';
// import ChatPreviewScreen from '../Components/ChatPreviewScreen';

// const Stack = createNativeStackNavigator();

// export default function Root() {
//   const [isFirstLaunch, setIsFirstLaunch] = useState(null);
//   const [isAuthorized, setIsAuthorized] = useContext(AuthContext);
//   const [user, setUser] = useContext(LoginContext);
//   const [userData, setUserData] = useContext(UserDataContext);

//   useEffect(() => {
//     const checkFirstLaunch = async () => {
//       try {
//         const value = await AsyncStorage.getItem('isFirstLaunch');
//         if (value === null) {
//           // First launch, set the flag in AsyncStorage
//           await AsyncStorage.setItem('isFirstLaunch', 'true');
//           setIsFirstLaunch(true);
//         } else {
//           setIsFirstLaunch(false);
//         }
//       } catch (error) {
//         console.error('Error checking first launch:', error);
//       }
//     };

//     checkFirstLaunch();
//     CheckIsUserLoggedIn();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       if (isAuthorized) {
//         await deleteJwt();
//         setIsAuthorized(false);
//       }
//     } catch (err) {
//       // toastError(err);
//     }
//   };

//   const CheckIsUserLoggedIn = async () => {
//     try {
//       let token = await getJwt();
//       if (token) {
//         const { data: res } = await isUserLoggedIn();
//         if (res.status === false) {
//           handleLogout();
//           console.log('response from backend', res);
//           // throw new Error(res.error);
//         }
//       }
//     } catch (err) {
//       // toastError(err);
//     }
//   };

//   const linkTo = useLinkTo();

//   const checkAuthorized = async () => {
//     let token = await getJwt();
//     if (token) {
//       setIsAuthorized(true);
//       let userDataLocal = await getUser();
//       if (userDataLocal) {
//         setUser(userDataLocal?.role);
//         setUserData(userDataLocal);
//       }
//     } else {
//       setIsAuthorized(false);
//     }
//   };

//   useEffect(() => {
//     let interval = setInterval(() => {
//       checkAuthorized();
//     }, 10000);
//     checkAuthorized();
//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, []);

//   if (isFirstLaunch === null) {
//     return null; // Or a splash screen while checking the first launch status
//   }

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {isFirstLaunch ? (
//         <>
//         <Stack.Screen name="homefirstscreen" component={HomeFirstScreen} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="BottamTab" component={BottamTab} />
//         <Stack.Screen name="BookService" component={BookService} />
//           <Stack.Screen name="appointments" component={Appointment} />
//           <Stack.Screen name="AppointHistory" component={Appointment_History} />
//           <Stack.Screen name="Chat" component={Chat} />
//           <Stack.Screen name="BookAppt" component={Book_Appointment} />
//           <Stack.Screen name="About Doctor" component={Abouts_dr} />
//           <Stack.Screen name="BookVdo" component={BookVideo} />
//           <Stack.Screen name="ProfileTemrs" component={ProfileTermsAndConditions} />
//           <Stack.Screen name="faq" component={FAQ} />
//           <Stack.Screen name="SMART PRESCRIPTION" component={SmartPrescriptionPage} />
//           <Stack.Screen name="Notifications" component={NotificationShow} />
//           <Stack.Screen name="About fever99" component={AboutFeverMainPage} />
//           <Stack.Screen name="BookClient" component={BookClient} />
//           <Stack.Screen name="EditiProfile" component={EditProfile} />
//           <Stack.Screen name="Write_P" component={Write_Prescription} />
//           <Stack.Screen name="Ref" component={Referal_User} />
//           <Stack.Screen name="Support" component={Support} />
//           <Stack.Screen name="PayementScreen" component={PayementScreen} />
//           <Stack.Screen name="PayementSuccess" component={Paymentsuccess} />
//           <Stack.Screen name="ClintPayment" component={ClintPayment} />
//           <Stack.Screen name="PayementScreen3" component={PayementScreen} />
//           <Stack.Screen name="PaymentFail" component={PaymentFail} />
//           <Stack.Screen name="Meeting" component={Meeting} />
//           <Stack.Screen name="Settings" component={Settings} />
//           <Stack.Screen name="Income" component={Income} />
//           <Stack.Screen name="ChatPreviewScreen" component={ChatPreviewScreen} />
//         </>
//       ) : isAuthorized ? (
//         <>
//           <Stack.Screen name="BottamTab" component={BottamTab} />
//           <Stack.Screen name="BookService" component={BookService} />
//           <Stack.Screen name="appointments" component={Appointment} />
//           <Stack.Screen name="AppointHistory" component={Appointment_History} />
//           <Stack.Screen name="Chat" component={Chat} />
//           <Stack.Screen name="BookAppt" component={Book_Appointment} />
//           <Stack.Screen name="About Doctor" component={Abouts_dr} />
//           <Stack.Screen name="BookVdo" component={BookVideo} />
//           <Stack.Screen name="ProfileTemrs" component={ProfileTermsAndConditions} />
//           <Stack.Screen name="faq" component={FAQ} />
//           <Stack.Screen name="SMART PRESCRIPTION" component={SmartPrescriptionPage} />
//           <Stack.Screen name="Notifications" component={NotificationShow} />
//           <Stack.Screen name="About fever99" component={AboutFeverMainPage} />
//           <Stack.Screen name="BookClient" component={BookClient} />
//           <Stack.Screen name="EditiProfile" component={EditProfile} />
//           <Stack.Screen name="Write_P" component={Write_Prescription} />
//           <Stack.Screen name="Ref" component={Referal_User} />
//           <Stack.Screen name="Support" component={Support} />
//           <Stack.Screen name="PayementScreen" component={PayementScreen} />
//           <Stack.Screen name="PayementSuccess" component={Paymentsuccess} />
//           <Stack.Screen name="ClintPayment" component={ClintPayment} />
//           <Stack.Screen name="PayementScreen3" component={PayementScreen} />
//           <Stack.Screen name="PaymentFail" component={PaymentFail} />
//           <Stack.Screen name="Meeting" component={Meeting} />
//           <Stack.Screen name="Settings" component={Settings} />
//           <Stack.Screen name="Income" component={Income} />
//           <Stack.Screen name="ChatPreviewScreen" component={ChatPreviewScreen} />
//         </>
//       ) : (
//         <>
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Register" component={Register} />
//           <Stack.Screen name="Password" component={Password} />
//           <Stack.Screen name="OTP" component={OTP} />
//           <Stack.Screen name="GetOTP" component={GetOTP} />
//           <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//         </>
//       )}
//       <Stack.Screen name="ContactUs" component={Contactus} />
//       <Stack.Screen name="ReturnandRefundPolicy" component={ReturnandRefundPolicy} />
//       <Stack.Screen name="PAC" component={PrivacyPolicy} />
//       <Stack.Screen name="TAC" component={TermAndC} />
//     </Stack.Navigator>
//   );
// }
