import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {generateFilePath} from '../../Services/url.service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Roles} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';

const Abouts_dr = (props: any) => {
  const mainFont = 'Montserrat-Regular';
  const [doctorData, setDoctorObj] = useState(props?.route?.params?.doctorId);

  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainView}>
          <Image
            source={{uri: generateFilePath(doctorData.image)}}
            style={styles.image}
          />
          <View style={styles.MainTwo}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: wp(4),
                width: 150,
                marginBottom: 5,
              }}>
              {doctorData.name}
            </Text>
            <Text style={{fontSize: wp(4), flexWrap: 'wrap', width: 150}}>
              {doctorData.specialization}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {/* first */}

          <View style={styles.iconRow}>
            <View style={styles.iconStyle}>
              <Icon name="briefcase" size={wp(6)} color="blue" />
            </View>
            <Text style={styles.iconText}>
              {doctorData.userExtraDetails.totalExperience} +
            </Text>
            <Text style={styles.iconTextSecond}>Years Exp.</Text>
          </View>

          {/* second */}

          <View style={styles.iconRow}>
            <View style={styles.iconStyle}>
              <Icon name="address-card" size={wp(6)} color="blue" />
            </View>
            <Text style={styles.iconText}>
              {doctorData.userExtraDetails.registrationNumber}
            </Text>
            <Text style={styles.iconTextSecond}>Registration NO.</Text>
          </View>

          {/* third */}

          {/* <View style={styles.iconRow}>
            <View style={styles.iconStyle}>
              <Icon name="graduation-cap" size={wp(6)} color="blue" />
            </View>
            <Text style={styles.iconText}>
              {doctorData.userExtraDetails.degree}
            </Text>
            <Text style={styles.iconTextSecond}>Degree</Text>
          </View>
        </View> */}
        </View>
        {/* fourth */}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'baseline',
            paddingTop: hp(1.5),
            margin:4,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BookVdo', {doctor: doctorData})}
            style={{
              flex: 1,
              marginRight: 5,
              height: hp(5),
              backgroundColor: '#1263AC',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: mainFont,
                fontSize: 13,
              }}>
              Book Video Consult
            </Text>
          </TouchableOpacity>
          {doctorData?.role !== Roles.FRANCHISE && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BookClient', {doctor: doctorData})
              }
              style={{
                flex: 1,
                marginLeft: 5,
                height: hp(5),
                backgroundColor: '#50B148',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: mainFont,
                  fontSize: 13,
                }}>
                Book Clinic Visit
              </Text>
            </TouchableOpacity>
          )}
        </View>

      <View style={{ margin:4}}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{doctorData.gender}</Text>

        <Text style={styles.label}>Mobile:</Text>
        <Text style={styles.value}>{doctorData.mobile}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{doctorData.email}</Text>

        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{doctorData.city}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{doctorData.address}</Text>

        <Text style={styles.label}>Service Charge:</Text>
        <Text style={styles.value}>${doctorData.serviceCharge}</Text>

        <Text style={styles.label}>Patient Service Charge:</Text>
        <Text style={styles.value}>${doctorData.serviceChargepatient}</Text>

        <Text style={styles.label}>Current Organization:</Text>
        <Text style={styles.value}>
          {doctorData.userExtraDetails.currentOrganization}
        </Text>
    </View>

        {/* Add more icons and details here */}
      </ScrollView>
    </View>
  );
};

export default Abouts_dr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: wp(30), // Adjust image size
    height: wp(30),
    borderRadius: wp(15), // Adjust border radius for circular image
    marginBottom: hp(3), // Add margin for spacing
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: '#eee',
  },
  iconRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: hp(1), // Add margin for spacing
  },
  iconText: {
    fontSize: wp(4.1), // Adjust font size
    marginLeft: wp(2), // Add margin for spacing
    color: 'blue', // Adjust color
    fontWeight: 'bold',
  },
  iconTextSecond: {
    color: '#84868a',
    fontSize: wp(4.1),
  },
  value: {
    fontSize: wp(4), // Adjust font size
    marginBottom: hp(2), // Add margin for spacing
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    // margin:10,
    borderRadius: 10,
  },
  MainView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#74a3ed',
    width: '100%',
    paddingTop: 22,
    marginBottom: 10,
  },
  MainTwo: {
    marginLeft: 20,
  },
  iconStyle: {
    borderRadius: wp(5), // Adjust to set the radius of the circle equal to the icon size
    width: wp(13), // Adjust to set the width of the circle equal to the icon size
    height: wp(13), // Adjust to set the height of the circle equal to the icon size
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#eee', // Adjust background color as needed
  },

  label: {
    fontSize: wp(4), // Adjust font size
    fontWeight: 'bold',
    marginBottom: hp(1), // Add margin for spacing
    color: '#333', // Adjust color
    padding: 10,
    // margin:10,
  },
});
