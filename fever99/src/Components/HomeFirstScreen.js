// // HomeScreen.js

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
// import CustomStatusBar from '../allModals/CustomStatusBar'

// const { width, height } = Dimensions.get('window');

// const HomeFirstScreen = () => {
//   return (
//     <View style={styles.container}>
//          <CustomStatusBar/>

//       <View style={styles.header}>
//         <Image 
//           source={require('../../assets/images/Logo.png')}
//         style={styles.image} />
//       </View>
   
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>Healthcare at</Text>
//         <Text style={styles.title}>your doorstep</Text>
//         <Text style={styles.subtitle}>Convenient, Affordable and</Text>
//         <Text style={styles.subtitle}>Quality Healthcare</Text>
//       </View>

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Get Started</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0B61A4',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   header: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   textContainer: {
//     alignSelf: 'flex-start',
//     marginBottom: 20,
//     marginLeft:20,
//   },
//   title: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'left',
    
//   },
//   subtitle: {
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'left',
//     marginLeft: 20,
//   },
//   image: {
//     width: width * 0.8,
//     height: width * 0.5, // Adjust the size as needed
//     resizeMode: 'contain',
//   },
//   title: {
//     color: 'white',
//     fontSize:34,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     marginLeft:20,
//   },
//   subtitle: {
//     color: 'white',
//     // fontSize: 16,
//     // textAlign: 'center',
//     // marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'white',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: '#0B61A4',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default HomeFirstScreen;





// HomeScreen.js


// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import CustomStatusBar from '../allModals/CustomStatusBar';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const HomeFirstScreen = () => {
//   return (
//     <View style={styles.container}>
//     <CustomStatusBar />
//     <View>
      
//       <View style={styles.header}>
//         <Image
//           source={require('../../assets/images/GetStartedImage.png')}
//           style={styles.image}
//         />
//       </View>

//       <View style={styles.textContainer}>
//        <View
//        style={{
//         marginBottom:20,
//        }}
//        >
//         <Text style={styles.title}>Healthcare at</Text>
//         <Text style={styles.title}>your doorstep</Text>
//         </View>
//         <Text style={styles.subtitle}>Convenient, Affordable and</Text>
//         <Text style={styles.subtitle}>Quality Healthcare</Text>
//       </View>

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Get Started</Text>
//       </TouchableOpacity>
//     </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0B61A4',
//     alignItems: 'center',
//     justifyContent: 'center',
//     // padding: wp('5%'),
//     height:'100%'
//   },
//   header: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp('5%'),
//   },
//   image: {
//     width: wp('80%'),
//     height: hp('25%'),
//     resizeMode: 'contain',
//   },
//   textContainer: {
//     alignSelf: 'flex-start',
//     marginBottom: hp('2%'),
//     marginLeft:hp('5%'),
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
//     borderRadius:10,
//     alignSelf: 'flex-start',
//     marginLeft: wp('10%')
//   },
//   buttonText: {
//     color: '#0B61A4',
//     fontSize: wp('5%'),
//     fontWeight: 'bold'
//   },
// });

// export default HomeFirstScreen;






import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import CustomStatusBar from '../allModals/CustomStatusBar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const HomeFirstScreen = () => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/GetStartedImage.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.textContainer}>
          <View 
          style={{ marginBottom: 20 }}
          >
            <Text style={styles.title}>Healthcare at</Text>
            <Text style={styles.title}>your doorstep</Text>
          </View>
          <Text style={styles.subtitle}>Convenient, Affordable and</Text>
          <Text style={styles.subtitle}>Quality Healthcare</Text>
        </View>

        <TouchableOpacity 
        style={styles.button}
        onPress={()=>{
            navigation.navigate('Login')
        }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1263AC',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  image: {
    width: wp('90%'),
    height: hp('35%'),
    resizeMode: 'contain',
  },
  textContainer: {
    alignSelf: 'flex-start',
    marginBottom: hp('2%'),
    marginLeft: hp('5%'),
  },
  title: {
    color: 'white',
    fontSize: wp('9%'),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    color: 'white',
    fontSize: wp('4%'),
    textAlign: 'left',
    marginTop: wp('1%'),
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginLeft: wp('10%'),
    marginTop:wp('20%')
  },
  buttonText: {
    color: '#0B61A4',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
});

export default HomeFirstScreen;
