



// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import CustomStatusBar from '../allModals/CustomStatusBar';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const HomeFirstScreen2 = ({callBackFunction}) => {

//   return (
//     <View style={styles.container}>
//       <CustomStatusBar />
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.header}>
//           <Image
//             source={require('../../assets/images/GetStartedImage.png')}
//             style={styles.image}
//           />
//         </View>

//         <View style={styles.textContainer}>
//           <View 
//           style={{ marginBottom: 20 }}
//           >
//             <Text style={styles.title}>Healthcare at</Text>
//             <Text style={styles.title}>your doorstep</Text>
//           </View>
//           <Text style={styles.subtitle}>Convenient, Affordable and</Text>
//           <Text style={styles.subtitle}>Quality Healthcare</Text>
//         </View>

//         <TouchableOpacity 
//         style={styles.button}
//         onPress={()=>{
//             callBackFunction()
//             console.log('call back is working');
//         }}
//         >
//           <Text style={styles.buttonText}>Get Started</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1263AC',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp('5%'),
//   },
//   image: {
//     width: wp('90%'),
//     height: hp('35%'),
//     resizeMode: 'contain',
//   },
//   textContainer: {
//     alignSelf: 'flex-start',
//     marginBottom: hp('2%'),
//     marginLeft: hp('5%'),
//   },
//   title: {
//     color: 'white',
//     fontSize: wp('9%'),
//     fontWeight: 'bold',
//     textAlign: 'left',
//   },
//   subtitle: {
//     color: 'white',
//     fontSize: wp('4%'),
//     textAlign: 'left',
//     marginTop: wp('1%'),
//   },
//   button: {
//     backgroundColor: 'white',
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('8%'),
//     borderRadius: 10,
//     alignSelf: 'flex-start',
//     marginLeft: wp('10%'),
//     marginTop:wp('20%')
//   },
//   buttonText: {
//     color: '#0B61A4',
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//   },
// });

// export default HomeFirstScreen2;




import React from 'react';
import { View, Text, StyleSheet, Dimensions,Button } from 'react-native';
// import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

const LoggedOutScreen = ({callBackFunction}) => {

  const handleLoginAgain = () => {
    // Handle login again action
    callBackFunction();
  };

  const handleNeverMind = () => {
    // Handle never mind action
    // You can navigate to a different screen or just exit the app
    navigation.navigate('Home'); // Assuming you have a home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logged Out</Text>
      <Text style={styles.message}>
        You have been logged out because you just logged in on another device. Would you like to log in again?
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Login Again"
          buttonStyle={styles.loginButton}
          onPress={callBackFunction}
        />
        <Button
          title="Never Mind"
          type="outline"
          buttonStyle={styles.neverMindButton}
        //   onPress={handleNeverMind}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: width * 0.8,
  },
  loginButton: {
    backgroundColor: '#007bff',
    marginBottom: 10,
  },
  neverMindButton: {
    borderColor: '#007bff',
  },
});

export default LoggedOutScreen;