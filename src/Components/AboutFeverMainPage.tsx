// import React from 'react';
// import { View, Text, TouchableOpacity, Touchable } from 'react-native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Feather';

// const ResponsiveButton = ({ icon, title, onPress }) => {
//   return (

//     <TouchableOpacity style={styles.button} onPress={onPress}>
//       <Icon name={icon} size={wp('5%')} color="#ffffff" />
//       <Text style={styles.buttonText}>{title}</Text>
//     </TouchableOpacity>

//   );
// };

// const AboutFeverMainPage = () => {
//   const onPressContact = () => {
//     // Add functionality for contact button
//   };

//   const onPressFAQ = () => {
//     // Add functionality for FAQ button
//   };

//   const onPressTermsAndConditions = () => {
//     // Add functionality for terms and conditions button
//   };

//   const onPressCancellationAndRefundPolicy = () => {
//     // Add functionality for cancellation and refund policy button
//   };

//   return (
//     <View style={styles.container}>
//       <ResponsiveButton icon="mail" title="Contact" onPress={onPressContact} />
//       <ResponsiveButton icon="help-circle" title="FAQ" onPress={onPressFAQ} />
//       <ResponsiveButton icon="file-text" title="Terms & Conditions" onPress={onPressTermsAndConditions} />
//       <ResponsiveButton icon="corner-up-left" title="Cancellation & Refund Policy" onPress={onPressCancellationAndRefundPolicy} />
//     </View>
//   );
// };

// // const styles = {
// //   container: {
// //     flexDirection: 'column',
// //     justifyContent: 'space-around',
// //     marginTop: hp('5%'),
// //     margin:5,
// //     bottom:0,
// //   },
// //   button: {
// //     backgroundColor: '#007bff',
// //     padding: wp('3%'),
// //     borderRadius: wp('3%'),
// //     flexDirection: 'row',
// //     padding:10,
// //     margin:10,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#ffffff',
// //     marginLeft: wp('2%'),
// //   },
// // };

// export default AboutFeverMainPage;

// // import React, { useEffect, useRef } from 'react';
// // import { View, Text, TouchableOpacity, Animated } from 'react-native';
// // import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// // import Icon from 'react-native-vector-icons/Feather';

// const ProfileTermsAndConditions = () => {
//   const translateY = useRef(new Animated.Value(hp('100%'))).current;

//   useEffect(() => {
//     Animated.timing(translateY, {
//       toValue: 0,
//       duration: 500, // Adjust the duration as needed
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const onPressContact = () => {
//     // Add functionality for contact button
//   };

//   const onPressFAQ = () => {
//     // Add functionality for FAQ button
//   };

//   const onPressTermsAndConditions = () => {
//     // Add functionality for terms and conditions button
//   };

//   const onPressCancellationAndRefundPolicy = () => {
//     // Add functionality for cancellation and refund policy button
//   };

//   return (
//     <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
//       <TouchableOpacity style={styles.button} onPress={onPressContact}>
//         <Icon name="mail" size={wp('5%')} color="#ffffff" />
//         <Text style={styles.buttonText}>Contact</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={onPressFAQ}>
//         <Icon name="help-circle" size={wp('5%')} color="#ffffff" />
//         <Text style={styles.buttonText}>FAQ</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={onPressTermsAndConditions}>
//         <Icon name="file-text" size={wp('5%')} color="#ffffff" />
//         <Text style={styles.buttonText}>Terms & Conditions</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={onPressCancellationAndRefundPolicy}>
//         <Icon name="corner-up-left" size={wp('5%')} color="#ffffff" />
//         <Text style={styles.buttonText}>Cancellation & Refund Policy</Text>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// const styles = {
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: '#fff', // Adjust the background color and opacity as needed
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: wp('3%'),
//     borderRadius: wp('3%'),
//     flexDirection: 'row',
//     padding: 10,
//     margin: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#ffffff',
//     marginLeft: wp('2%'),
//   },
// };








import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';

const ProfileTermsAndConditions = () => {

    const navigation: any = useNavigation();

  const translateY = useRef(new Animated.Value(hp('100%'))).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressContact = () => {
    // 
    navigation.navigate('ContactUs')
    // Add functionality for contact button
  };

  const onPressFAQ = () => {
    console.log('faq')
    // alert('comin inside')
   navigation.navigate('faq')
    // Add functionality for FAQ button
  };

  const onPressTermsAndConditions = () => {
    navigation.navigate('TAC')
    // Add functionality for terms and conditions button
  };

  const onPressCancellationAndRefundPolicy = () => {
 navigation.navigate('ReturnandRefundPolicy')
    // Add functionality for cancellation and refund policy button
  };

  const AboutUsFunction = () => {
    navigation.navigate('ProfileTemrs')
       // Add functionality for cancellation and refund policy button
     };

  

  return (
    <View
    style={{
        backgroundColor:'#fff'
    }}
    >
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/Logo.png')}
          resizeMode="contain"
          style={{
            flex: 0,
            width: wp(50),
            height: wp(50),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          //   style={styles.logo}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
        Fever99
        </Text>

        <Text
        style={{
            marginTop:10,
            padding:5,
            margin:5,
            textAlign:'center'
        }}
        >
          {' '}
          Fever99 - About Us is a leading healthcare provider dedicated to
          delivering exceptional medical services to individuals and families.
          Our journey began with a simple but profound mission: to make
          healthcare accessible, convenient, and compassionate.
        </Text>
      </View>

      <View style={styles.container}>
        <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
          <TouchableOpacity style={styles.button} onPress={onPressContact}>
            <Icon name="mail" size={wp('5%')} color="#ffffff" />
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressFAQ}>
            <Icon name="help-circle" size={wp('5%')} color="#ffffff" />
            <Text style={styles.buttonText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={onPressTermsAndConditions}>
            <Icon name="file-text" size={wp('5%')} color="#ffffff" />
            <Text style={styles.buttonText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={onPressCancellationAndRefundPolicy}>
            <Icon name="corner-up-left" size={wp('5%')} color="#ffffff" />
            <Text style={styles.buttonText}>Cancellation & Refund Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={AboutUsFunction}>
            <Icon name="corner-up-left" size={wp('5%')} color="#ffffff" />
            <Text style={styles.buttonText}>About Us</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = {
  logo: {
    width: '100%',
    // height: hp('20%'), // Adjust the height as needed
    // resizeMode: 'contain', // Adjust the resizeMode as needed
  },
  container: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)', // Adjust the background color and opacity as needed
  },
  button: {
    backgroundColor: '#007bff',
    padding: wp('3%'),
    borderRadius: wp('3%'),
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: wp('2%'),
  },
};

export default ProfileTermsAndConditions;





