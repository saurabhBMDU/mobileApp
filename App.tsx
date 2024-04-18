
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, useLinkTo } from '@react-navigation/native';
import React, { createContext, useEffect, useState } from 'react';
import { Linking,PermissionsAndroid } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-toast-message';
import { navigationRef } from './index';
import Root from './src/Navigation/Root';
export const LanguageContext = createContext<any>(null);
export const LoginContext = createContext<any>(null);
export const UserDataContext = createContext<any>(null);
export const AuthContext = createContext<any>(false)

import { LogBox } from 'react-native';
import UpdateModal from './updateModal';
import { AppVersioinCheck, deleteJwt, getJwt, isUserLoggedIn } from './src/Services/user.service';
import { toastError } from './src/utils/toast.utils';
import DeviceInfo from 'react-native-device-info';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App(): JSX.Element {

  const [isAuthorized, setIsAuthorized] = useState(false)
  const linkTo = useLinkTo()


 

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      console.log(initialUrl, "initialUrl, initialUrl,initialUrl ,initialUrl")
      // setLinkedURL(decodeURI(initialUrl));
    };

    getUrlAsync();
  }, []);





  const handleLogout = async () => {
    try {
      console.log('woriing in app.js file')
      if(isAuthorized){
      await deleteJwt();
      setIsAuthorized(false);
    }
    } catch (err) {
      // toastError(err);
    }
  };


  useEffect(() => {
    appVersioinCheckInApp();
    CheckIsUserLoggedIn();
  },[])


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (isAuthorized) {
  //       CheckIsUserLoggedIn();
  //     }
  //   }, 10000); // 10 seconds delay
  
  //   return () => clearTimeout(timer);
  // }, []);


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



  //getting this device id 
  const [deviceVersion, setDeviceVersion] = useState(0);
  const [backendVeriosn,setBackendVersion] = useState(0)
  useEffect(() => {
    const fetchDeviceVersion = async () => {
      let  version =  DeviceInfo.getBuildNumber();
      console.log('this is device verions',version)
      setDeviceVersion(parseInt(version));
    };

    fetchDeviceVersion();
  }, []);

  
  const appVersioinCheckInApp = async () => {
    try {
      const { data: res } = await AppVersioinCheck();
      if (res.data && res.data.length > 0 && res.data[0].versionCode) {
        console.log('App Version Check in App', res.data[0].version);
        setBackendVersion(parseInt(res.data[0].version));
      } else {
        // If version code is not present in the response
        toastError("Version code not found in response.");
      }
    } catch (err) {
      // toastError(err);
    }    
  };


  // useEffect(() => {
  //   requestPermissions();
  // }, []);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.MODIFY_AUDIO_SETTINGS,
        PermissionsAndroid.PERMISSIONS.BIND_TELECOM_CONNECTION_SERVICE,
        PermissionsAndroid.PERMISSIONS.FOREGROUND_SERVICE,
      ]);

      console.log('Permissions granted:', granted);

      // Check if all permissions are granted
      if (
        Object.values(granted).every(
          (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
        )
      ) {
        console.log('All permissions granted');
      } else {
        console.log('Some permissions not granted');
        // You can handle the scenario where permissions are not granted here
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };


  RNCallKeep.addEventListener('answerCall', async ({ callUUID }) => {
    Linking.openURL(`fever99://app/Meeting/${callUUID}`)
    RNCallKeep.rejectCall(callUUID)
    // navigationRef.current?.navigate(`Meeting`, { data: callUUID })
    // linkTo()
  });
  RNCallKeep.addEventListener('didReceiveStartCallAction', async ({ callUUID }) => {
    Linking.openURL(`fever99://app/Meeting/${callUUID}`)
    if (callUUID) {
      RNCallKeep.rejectCall(callUUID)
    }
    // navigationRef.current?.navigate(`Meeting`, { data: callUUID })
    // linkTo()
  });

  const [language, setLanguage] = useState('EN')
  const [user, setUser] = useState('')
  const [userData, setUserData] = useState('')

  const notifyChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fever99', // (required)
        channelName: 'General', // (required)
        channelDescription: 'General Channel', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'my_sound.mp3', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };




  RNCallKeep.addEventListener('didReceiveStartCallAction', ({ handle, callUUID, name }) => {
    console.log(handle, callUUID, name, "handle, callUUID, name")
  });

  RNCallKeep.addEventListener('didDisplayIncomingCall', ({ error, callUUID, handle, localizedCallerName, hasVideo, fromPushKit, payload }) => {
    // you might want to do following things when receiving this event:
    console.log(error, callUUID, handle, localizedCallerName, hasVideo, fromPushKit, payload, " error, callUUID, handle, localizedCallerName, hasVideo, fromPushKit, payload")
    // - Start playing ringback if it is an outgoing call
  });



  RNCallKeep.canMakeMultipleCalls(false);

  useEffect(() => {
    notifyChannel();
    // Geocoder.init("AIzaSyCtkZzuFSZ94CSPnDArwvPMqxkk58Fzfno")



    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      if (remoteMessage?.data?.otherData == "show") {
        // let temp = await RNCallKeep.backToForeground();
        // console.log(temp, "temp")
        RNCallKeep.displayIncomingCall(remoteMessage.data.appointmentId, "Doctor", "Fever99");
      }

      console.log(remoteMessage, "remoteMessage")

      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'fever99', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
        ticker: 'My Notification Ticker', // (optional)
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
        // largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
        smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        // bigText: `${remoteMessage.data.title}`, // (optional) default: "message" prop
        bigLargeIcon: 'ic_launcher', // (optional) default: undefined
        // bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
        // color: "blue", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 2000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: 'some_tag', // (optional) add tag to message
        group: 'group', // (optional) add group to message
        groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: 'high', // (optional) set notification priority, default: high
        visibility: 'private', // (optional) set notification visibility, default: private
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
        shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

        when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
        usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
        timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

        messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

        // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
        invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
        /* iOS only properties */
        category: '', // (optional) default: empty string

        /* iOS and Android properties */
        id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        title: `${remoteMessage?.data?.title}`, // (optional)
        message: `${remoteMessage?.data?.description}`, // (required)
        // userInfo: `${remoteMessage.data.redirectTo}`, // (optional) default: {} (using null throws a JSON value '<null>' error)
        playSound: true, // (optional) default: true
        soundName: 'my_sound.mp3', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      });


    });

    return unsubscribe;
  }, []);

  


  const [routeName, setRouteName] = useState<any>();


  // const options = {
  //   ios: {
  //     appName: 'fever99',
  //   },
  //   android: {
  //     alertTitle: 'Permission required',
  //     alertDescription: 'This application needs to access your phone accounts',
  //     cancelButton: 'Cancel',
  //     okButton: 'OK',
  //     imageName: "ic_launcher",
  //     additionalPermissions: [
  //       // 'android.permission.READ_PHONE_STATE',
  //       // 'android.permission.CALL_PHONE',
  //       'android.permission.RECORD_AUDIO',
  //       'android.permission.MODIFY_AUDIO_SETTINGS',
  //       'android.permission.BIND_TELECOM_CONNECTION_SERVICE',
  //       'android.permission.FOREGROUND_SERVICE',
  //     ],
  //     callKitEnabled: true,
  //     foregroundService: {
  //       channelId: "com.fever99",
  //       channelName: "fever99",
  //       notificationTitle: "Call from background",
  //       notificationIcon: "ic_launcher"
  //     }
  //   }
  // };


  // RNCallKeep.setup(options).then(() => {
  //   console.log('CallKeep setup done');
  // }).catch(error => {
  //   console.error('CallKeep Setup Error:', error);
  // });



  const [showUpdateModal, setShowUpdateModal] = useState(false); // State to control the visibility of UpdateModal


  useEffect(() => {
    // Open UpdateModal after 10 seconds when the user is authorized
    if (isAuthorized) {
      const timer = setTimeout(() => {
        setShowUpdateModal(true);
      }, 10000);

      return () => clearTimeout(timer); // Cleanup function
    }
  }, [isAuthorized]);


  const linking = {
    prefixes: ['fever99://app'],
    config: {
      screens: {
        PAC: 'PAC',
        Meeting: 'Meeting/:data',
      },
    },
  };
  return (
    <UserDataContext.Provider value={[userData, setUserData]}>
      <LoginContext.Provider value={[user, setUser]}>
        <LanguageContext.Provider value={[language, setLanguage]}>
          <AuthContext.Provider value={[isAuthorized, setIsAuthorized]}>

            <NavigationContainer
              ref={navigationRef}
              linking={linking}
              onReady={() => {
                setRouteName(navigationRef.getCurrentRoute()?.name);
              }}
              onStateChange={async () => {
                const previousRouteName = routeName;
                const currentRouteName = navigationRef.getCurrentRoute()?.name;
                setRouteName(currentRouteName);
              }}>
              <Root />
              <Toast />
            </NavigationContainer>
            {deviceVersion < backendVeriosn && 
            <UpdateModal isVisible={showUpdateModal} onClose={() => setShowUpdateModal(false)} />
            }
            {/* Render UpdateModal */}
          </AuthContext.Provider>
        </LanguageContext.Provider>
      </LoginContext.Provider>
    </UserDataContext.Provider>
  );
}



export default App;
