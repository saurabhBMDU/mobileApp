import {NativeModules, AppState, AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
// import { createNavigationContainerRef } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import RNCallKeep from 'react-native-callkeep';
// export const navigationRef = createNavigationContainerRef();
import { navigate, navigationRef} from './NavigationService';
import io from 'socket.io-client';
import { fileurl } from './src/Services/url.service';
import { addAppointmentHistory } from './src/Services/appointmentHistory.service';

// import InCallManager from 'react-native-incall-manager';
// Navigate to a screen

import Meeting from './src/Components/Meeting';

import notifee, {
  EventType,
  AndroidImportance,
  AuthorizationStatus,
  AndroidColor,
  AndroidStyle,
  AndroidCategory,
} from '@notifee/react-native';


import InCallManager from 'react-native-incall-manager';
import { getUser } from './src/Services/user.service';


AppRegistry.registerComponent(appName, () => HeadlessCheck);


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(
    'background message in index.js',
    remoteMessage.data.appointmentId,
  );
  // console.log('navigation: ',navigationRef)


  
    try {
      let userData = await getUser();

      if (remoteMessage?.data?.otherData == 'show') {
      await RNCallKeep.displayIncomingCall(
        remoteMessage.data.appointmentId,
        'Doctor',
        'fever99',
      );
      await RNCallKeep.backToForeground();
      // InCallManager.startRingtone('_Default_')
      // console.log('in call manager',inCallManager)

      RNCallKeep.addEventListener('answerCall', async ({callUUID}) => {
        Linking.openURL(`fever99://app/Meeting/${callUUID}`);
        RNCallKeep.rejectCall(callUUID);
        // navigationRef.current?.navigate(`Meeting`, { data: callUUID })
        // linkTo()
        // Linking.openURL(`fever99://app/Meeting/${remoteMessage.data.appointmentId}`)
      });
      
       
            const channelId = await  notifee.createChannel({
              id: "custom-sound",
              name: "System Sound",
              importance: AndroidImportance.HIGH,
            });
            InCallManager.startRingtone('_Default_');
        // Display a notification with two action buttons
        await notifee.displayNotification({
          title: 'You have an incoming call',
          // body: 'Someone is calling',
          body: 'Ongoing notification',
          data: {data:'calling',appointmentId:remoteMessage.data.appointmentId},
          // body: 'Full-screen notification',
          android: {
            ongoing: true,
          category: AndroidCategory.CALL,
          // Recommended to set importance to high
          importance: AndroidImportance.HIGH,
          fullScreenAction: {
            id: 'default',
          },
            // importance: AndroidImportance.HIGH,
            channelId,
            largeIcon: 'https://as2.ftcdn.net/v2/jpg/04/63/63/59/1000_F_463635935_IweuYhCqZRtHp3SLguQL8svOVroVXvvZ.jpg',
            // style: {
              // type: AndroidStyle.BIGPICTURE,
              // picture: 'https://as2.ftcdn.net/v2/jpg/04/63/63/59/1000_F_463635935_IweuYhCqZRtHp3SLguQL8svOVroVXvvZ.jpg',
            // },
            actions: [
              {
                title: 'Accept',
                // icon: 'https://my-cdn.com/icons/snooze.png',
                // icon : '@drawable/ic_accept',
                pressAction: {
                  id: 'accept',
                },
              },
              {
                title: 'Reject',
                // icon: 'https://my-cdn.com/icons/snooze.png',
                pressAction: {
                  id: 'reject',
                },
              },
            ],
          },
          ios: {
            foregroundPresentationOptions: {
              badge: true,
              sound: true,
              banner: true,
              list: true,
            },
          } 
        });
      // }
      // Function to handle background notification events
      
    } else if (remoteMessage?.data?.title === "New Message!" && userData?._id === remoteMessage.data.toId) {
        
      console.log('id', userData?._id, remoteMessage.data.toId);
      console.log('remote data is here', remoteMessage?.data);

      const channelId = await notifee.createChannel({
        id: "Chat",
        name: "Chatting",
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: `You have a new message from ${remoteMessage.data.fromName}`,
        body: `${remoteMessage.data.description}`,
        data: {appointmentId:remoteMessage.data.appointmentId,fromId:remoteMessage.data.fromId},
        android: {
          channelId,
          actions: [
            {
              title: 'Reply',
              icon: 'https://my-cdn.com/icons/reply.png',
              pressAction: {
                id: 'reply',
              },
              input: true, // enable free text input
            },
          ],
        },
      });
    }
    else{
      console.log('coming inside this')
      const channelId = await notifee.createChannel({
        id: "notificaion",
        name: "new",
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: `${remoteMessage.data.title}`,
        body: `${remoteMessage.data.description}`,
        // data: {appointmentId:remoteMessage.data.appointmentId,fromId:remoteMessage.data.fromId},
        android: {
          channelId,
        
        },
      });
    }

    const handleBackgroundNotification = async ({type, detail}) => {
      if (type === EventType.ACTION_PRESS) {
        if (detail.pressAction.id === 'reply') {
          console.log('detials ',detail.notification.data)
          let  data = detail
            // # Extract values
          let  appointment_id = data["notification"]["data"]["appointmentId"]
           let    from_id = data["notification"]["data"]["fromId"]
            console.log("Appointment ID:", appointment_id)
            console.log("From ID:", from_id)
          // const { appointmentId, fromId } = detail.notification.android?.data || {};
          console.log('Reply pressed', detail);
          await handleSendReplayFromNotification(detail.input,appointment_id, from_id);
          await notifee.cancelNotification(detail.notification.id);
        }
      }

      if (type === EventType.ACTION_PRESS && detail.pressAction.id && 'accept' === detail.pressAction.id) {
        console.log('User pressed an action with the id: ', detail.pressAction.id);
        // handleIncomingCall(remoteMessage.data.appointmentId);
        InCallManager.stopRingtone(); 
        Linking.openURL(`fever99://app/Meeting/${remoteMessage.data.appointmentId}`)
        setTimeout(() => {
          // navigate('PAC');
          // InCallManager.stopRingtone(); 
          Linking.openURL(`fever99://app/Meeting/${remoteMessage.data.appointmentId}`)
          // Check if navigation is ready and navigate if so
          if (navigationRef.isReady()) {
            // navigationRef.navigate('PAC');
            // InCallManager.stopRingtone(); 
            Linking.openURL(`fever99://app/Meeting/${remoteMessage.data.appointmentId}`)
          } else {
            console.error('Navigation is not ready');
            // Handle the case where navigation is not ready
            // You can choose to retry navigation later or show an error message
          }
        },4000); 
      }
      if (type === EventType.ACTION_PRESS && detail.pressAction.id && 'reject' === detail.pressAction.id) {
        console.log('User pressed an action with the id: ', detail.pressAction.id);
        await notifee.cancelNotification('incoming-call-notification');
        InCallManager.stopRingtone(); // Stop ringing
      }

      // switch (type) {
        if(type === EventType.DISMISSED){
        // case EventType.DISMISSED:
        InCallManager.stopRingtone(); 
          // InCallManager.stopRingtone(); // Stop ringing
          await notifee.cancelNotification('incoming-call-notification');
          console.log('User dismissed notification', detail.notification);
          // break;
        }else if(type === EventType.PRESS){
          let  data = detail
          if (data["notification"]["data"]["fromId"]) {
            console.log('replay with tap press')
          console.log('User pressed notification');
          // navigate('Chat');
          navigate('Chat',{data :detail["notification"]["data"]["appointmentId"]});
          Linking.openURL(`fever99://app/Meeting/`)
          setTimeout(() => {
            // navigate('Chat');
            navigate('Chat',{data :detail["notification"]["data"]["appointmentId"]});
            // InCallManager.stopRingtone(); 
            Linking.openURL(`fever99://app/Meeting/`)
            // Check if navigation is ready and navigate if so
            if (navigationRef.isReady()) {
              // navigationRef.navigate('Chat');
              navigate('Chat',{data :detail["notification"]["data"]["appointmentId"]});
              // InCallManager.stopRingtone(); 
              // Linking.openURL(`fever99://app/Meeting/${remoteMessage.data.appointmentId}`)
            } else {
              console.error('Navigation is not ready');
              // navigate('Chat');
              navigate('Chat',{data :detail["notification"]["data"]["appointmentId"]});
              // Handle the case where navigation is not ready
              // You can choose to retry navigation later or show an error message
            }
          },4000); 
          // Linking.openURL(
          //   `fever99`,
          // );
          // navigate('Chat')
        } else if(detail["notification"]["data"]["data"]){
          //for incoming call 
          InCallManager.stopRingtone(); 
          navigationRef.navigate('Meeting');
          Linking.openURL(`fever99://app/Meeting/${detail["notification"]["data"]["appointmentId"]}`)
          setTimeout(() => {
            // navigate('PAC');  appointmentId
            // InCallManager.stopRingtone(); 
            Linking.openURL(`fever99://app/Meeting/${detail["notification"]["data"]["appointmentId"]}`)
            // Check if navigation is ready and navigate if so
            if (navigationRef.isReady()) {
              navigationRef.navigate('Meeting');
              // InCallManager.stopRingtone(); 
              Linking.openURL(`fever99://app/Meeting/${detail["notification"]["data"]["appointmentId"]}`)
            } else {
              console.error('Navigation is not ready');
              // Handle the case where navigation is not ready
              // You can choose to retry navigation later or show an error message
            }
          },4000); 
        }
        }
      
      }
      // Listen for background notification events
    notifee.onBackgroundEvent(handleBackgroundNotification);

    } catch (error) {
      console.log(error, 'error');
    }

    const handleSendReplayFromNotification = async (userMessage,appointmentId,toUserId) => {
      let userData = await getUser();
  
      console.log('getting user details', userMessage);
      console.log('socket data', {
        toUserId,
        message: userMessage,
        userId: userData._id,
        appointmentId,
      });
  
      if (!appointmentId) return;
      let socket = io(fileurl);
      socket.emit('message', {
        toUserId,
        message: userMessage,
        userId: userData._id,
        type: 'text',
      });
      socket.close();
  
      await addAppointmentHistory(appointmentId, {
        message: userMessage,
        toId: toUserId,
        type: 'text',
      });
    };
  
});

// coment

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: async function (notification) {
    console.log(
      'NOTIFICATIONNOTIFICATIONNOTIFICATIONNOTIFICATIONNOTIFICATIONNOTIFICATIONNOTIFICATION:',
      notification,
    );
    console.log('notification pressed in index.js file in line no 105');
    // await Linking.openURL("fever99://app/Meeting" + notification.redirectTo)
    console.log('a1', notification);
    // await Linking.openURL("fever99://app/Meeting/" + notification.data.id);
    console.log('a2');
    // You can add other navigation logic here
  },
  // IOS ONLY: (optional) Called when Action is pressed (IOS)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
   */
  requestPermissions: true,
});

// coment


// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({data}) {
  if (data) {
    // App has been launched in the background by iOS, ignore
    RNCallKeep.addEventListener(
      'didReceiveStartCallAction',
      ({handle, callUUID, name}) => {
        console.log('adsas');
      },
    );
    return (
      <Meeting route={{ params: { data: data } }} />
    )
  }
  // Render the app component on foreground launch
  return <App />;
}

AppState.addEventListener('change', nextAppState => {
  if (nextAppState === 'active') {
    // Handle foreground call actions
    // For example, display a call UI or handle incoming calls
  } else if (nextAppState === 'background') {
    console.log('background app working in line 169 in index.js file ');
  }
});



















// import {NativeModules, AppState, AppRegistry, Linking} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
// import RNCallKeep from 'react-native-callkeep';
// import { navigate, navigationRef} from './NavigationService';
// import io from 'socket.io-client';
// import { fileurl } from './src/Services/url.service';
// import { addAppointmentHistory } from './src/Services/appointmentHistory.service';
// import notifee, {
//   EventType,
//   AndroidImportance,
//   AndroidCategory,
// } from '@notifee/react-native';
// import InCallManager from 'react-native-incall-manager';
// import { getUser } from './src/Services/user.service';

// AppRegistry.registerComponent(appName, () => HeadlessCheck);

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('background message in index.js', remoteMessage.data.appointmentId);
  
//   try {
//     let userData = await getUser();

//     if (remoteMessage?.data?.otherData == 'show') {
//       await RNCallKeep.displayIncomingCall(remoteMessage.data.appointmentId, 'Doctor', 'fever99');
//       await RNCallKeep.backToForeground();
      
//       RNCallKeep.addEventListener('answerCall', async ({callUUID}) => {
//         Linking.openURL(`fever99://app/Meeting/${callUUID}`);
//         RNCallKeep.rejectCall(callUUID);
//       });
      
//       const channelId = await notifee.createChannel({
//         id: "custom-sound",
//         name: "System Sound",
//         importance: AndroidImportance.HIGH,
//       });
//       InCallManager.startRingtone('_Default_');

//       await notifee.displayNotification({
//         title: 'You have an incoming call',
//         body: 'Ongoing notification',
//         data: {data:'calling',appointmentId:remoteMessage.data.appointmentId},
//         android: {
//           ongoing: true,
//           category: AndroidCategory.CALL,
//           importance: AndroidImportance.HIGH,
//           fullScreenAction: {
//             id: 'default',
//           },
//           channelId,
//           largeIcon: 'https://as2.ftcdn.net/v2/jpg/04/63/63/59/1000_F_463635935_IweuYhCqZRtHp3SLguQL8svOVroVXvvZ.jpg',
//           actions: [
//             {
//               title: 'Accept',
//               pressAction: {
//                 id: 'accept',
//               },
//             },
//             {
//               title: 'Reject',
//               pressAction: {
//                 id: 'reject',
//               },
//             },
//           ],
//         },
//         ios: {
//           foregroundPresentationOptions: {
//             badge: true,
//             sound: true,
//             banner: true,
//             list: true,
//           },
//         } 
//       });
//     } else if (remoteMessage?.data?.title === "New Message!" && userData?._id === remoteMessage.data.toId) {
//       const channelId = await notifee.createChannel({
//         id: "Chat",
//         name: "Chatting",
//         importance: AndroidImportance.HIGH,
//       });

//       await notifee.displayNotification({
//         title: `You have a new message from ${remoteMessage.data.fromName}`,
//         body: `${remoteMessage.data.description}`,
//         data: {appointmentId:remoteMessage.data.appointmentId,fromId:remoteMessage.data.fromId},
//         android: {
//           channelId,
//           actions: [
//             {
//               title: 'Reply',
//               icon: 'https://my-cdn.com/icons/reply.png',
//               pressAction: {
//                 id: 'reply',
//               },
//               input: true, // enable free text input
//             },
//           ],
//         },
//       });
//     } else {
//       const channelId = await notifee.createChannel({
//         id: "notification",
//         name: "new",
//         importance: AndroidImportance.HIGH,
//       });

//       await notifee.displayNotification({
//         title: `${remoteMessage.data.title}`,
//         body: `${remoteMessage.data.description}`,
//         android: {
//           channelId,
//         },
//       });
//     }

//     const handleBackgroundNotification = async ({type, detail}) => {
//       if (type === EventType.ACTION_PRESS) {
//         if (detail.pressAction.id === 'reply') {
//           let data = detail.notification.data;
//           let appointment_id = data.appointmentId;
//           let from_id = data.fromId;
//           await handleSendReplayFromNotification(detail.input, appointment_id, from_id);
//           await notifee.cancelNotification(detail.notification.id);
//         }
//       }

//       if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'accept') {
//         InCallManager.stopRingtone(); 
//         Linking.openURL(`fever99://app/Meeting/${detail["notification"]["data"]["appointmentId"]}`);
//       }
//       if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'reject') {
//         await notifee.cancelNotification('incoming-call-notification');
//         InCallManager.stopRingtone(); // Stop ringing
//       }

//       if (type === EventType.DISMISSED) {
//         InCallManager.stopRingtone(); 
//         await notifee.cancelNotification('incoming-call-notification');
//       }
//       if (type === EventType.PRESS) {
//         let data = detail.notification.data;
//         if (data.fromId) {
//           navigate('Chat', { data: detail.notification.data.appointmentId });
//           Linking.openURL(`fever99://app/Meeting/`);
//         } else if (data.data) {
//           InCallManager.stopRingtone(); 
//           navigate('Meeting');
//           Linking.openURL(`fever99://app/Meeting/${data.appointmentId}`);
//         }
//       }
//     }
//     notifee.onBackgroundEvent(handleBackgroundNotification);

//   } catch (error) {
//     console.log(error, 'error');
//   }

//   const handleSendReplayFromNotification = async (userMessage, appointmentId, toUserId) => {
//     let userData = await getUser();
  
//     let socket = io(fileurl);
//     socket.emit('message', {
//       toUserId,
//       message: userMessage,
//       userId: userData._id,
//       type: 'text',
//     });
//     socket.close();
  
//     await addAppointmentHistory(appointmentId, {
//       message: userMessage,
//       toId: toUserId,
//       type: 'text',
//     });
//   };
// });

// PushNotification.configure({
//   onNotification: async function (notification) {
//     console.log('NOTIFICATION:', notification);
//   },
//   onAction: function (notification) {
//     console.log('ACTION:', notification.action);
//     console.log('NOTIFICATION:', notification);
//   },
//   popInitialNotification: true,
//   requestPermissions: true,
// });

// function HeadlessCheck({isHeadless}) {
//   if (isHeadless) {
//     RNCallKeep.addEventListener(
//       'didReceiveStartCallAction',
//       ({handle, callUUID, name}) => {
//         console.log('adsas');
//       },
//     );
//     return null;
//   }

//   return <App />;
// }

// AppState.addEventListener('change', nextAppState => {
//   if (nextAppState === 'active') {
//     // Handle foreground call actions
//   } else if (nextAppState === 'background') {
//     console.log('background app working in line 169 in index.js file ');
//   }
// });
