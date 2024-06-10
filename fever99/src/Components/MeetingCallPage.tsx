// import React from 'react';
// import { View, StyleSheet, BackHandler } from 'react-native';
// import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'

// export default function VoiceCallPage(props:any) {


//     console.log('props ',props.route.params.data);
       
   
//     return (
//         <View style={styles.container}>
//             <ZegoUIKitPrebuiltCall
//                 appID={658015688}
//                 appSign={'03544581824b76201d7db652b04d1837a26094095d8ff984740d607e83762616'}
//                 userID={props.route.params.data} // userID can be something like a phone number or the user id on your own user system. 
//                 userName={'userName'}
//                 callID={props.route.params.data} // callID can be any unique string. 

//                 config={{
//                     // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
//                     ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
//                     onOnlySelfInRoom: () => { props.navigation.goBack() },
//                     onHangUp: () => { 
//                         // props.navigation.goBack() 
//                         BackHandler.exitApp();
//                      },
//                 }}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 0,
//   },
// });




import React, { useEffect } from 'react';
import { View, StyleSheet, BackHandler, PermissionsAndroid, Platform } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';

export default function VoiceCallPage(props: any) {

    // Function to generate a 10-digit random ID
    const generateRandomId = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    };

    const userId = generateRandomId(); // Generate a random user ID
    const { data: callId } = props.route.params; // Assuming callId is passed through route params

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                if (
                    granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
                    granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Permissions not granted');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    console.log('User ID: ', userId);
    console.log('Call ID: ', callId);

    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={658015688}
                appSign={'03544581824b76201d7db652b04d1837a26094095d8ff984740d607e83762616'}
                userID={userId} // Use generated random user ID
                userName={'userName'}
                callID={callId} // Use call ID passed through route params

                config={{
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { 
                        console.log('Only self in room, going back');
                        props.navigation.goBack();
                    },
                    onHangUp: () => {
                        console.log('Call ended, exiting app');
                        if ( props.navigation.canGoBack()) {
                            props.navigation.goBack();
                          }else{
                            BackHandler.exitApp();
                            return true; // Prevent default behavior
                          }
                    },
                    onError: (error) => {
                        console.error('Error: ', error);
                    },
                    onJoinRoom: () => {
                        console.log('Joined the room');
                    },
                    onLeaveRoom: () => {
                        console.log('Left the room');
                    },
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
});
