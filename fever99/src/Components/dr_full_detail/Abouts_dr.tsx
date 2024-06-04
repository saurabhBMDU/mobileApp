import React, {useEffect, useState} from 'react';
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
import {getUser} from '../../Services/user.service';

const Abouts_dr = (props: any) => {
  const mainFont = 'Montserrat-Regular';
  const [doctorData, setDoctorObj] = useState(props?.route?.params?.doctorId);
  const [userData, setUserData] = useState('');

  console.log(
    'this is console data for checking',
    props?.route?.params?.doctorId.userExtraDetails.aboutMe,
  );

  const navigation: any = useNavigation();

  const loggedInUserDetails = async () => {
    let userData = await getUser();
    // console.log('userdata',userData);
    setUserData(userData);
  };

  useEffect(() => {
    loggedInUserDetails();
  }, []);

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
                marginBottom: 5,
                color: '#fff',
              }}>
              {doctorData.name}
            </Text>
            <Text
              style={{
                fontSize: wp(4),
                flexWrap: 'wrap',
                width: 150,
                color: '#fff',
              }}>
              {doctorData.specialization}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
        </View>
        {/* fourth */}

        <View style={{margin: 4}}>
          <View style={styles.commonD_flex}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{doctorData.gender}</Text>
          </View>
          {/* <View style={styles.commonD_flex}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{doctorData.mobile}</Text>
          </View> */}
          {/* <View style={styles.commonD_flex}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{doctorData.email}</Text>
          </View> */}
          <View style={styles.commonD_flex}>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>{doctorData.city}</Text>
          </View>

          {userData?.role === 'FRANCHISE' && (
            <View style={styles.commonD_flex}>
              <Text style={styles.label}>Service Charge:</Text>
              <Text style={styles.value}>₹{doctorData.serviceCharge}</Text>
            </View>
          )}

          {userData?.role === 'PATIENT' && (
            <View style={styles.commonD_flex}>
              <Text style={styles.label}>Service Charge:</Text>
              <Text style={styles.value}>
                ₹{doctorData.serviceChargepatient}
              </Text>
            </View>
          )}

          <View style={styles.commonD_flex}>
            <Text style={styles.label}>Organization:</Text>
            <Text style={styles.value}>
              {doctorData.userExtraDetails.currentOrganization}
            </Text>
          </View>

          <View style={styles.commonD_flex}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{doctorData.address}</Text>
          </View>

          {/* About Me */}

          {doctorData?.userExtraDetails?.aboutMe && (
            <>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  About Me{' '}
                </Text>
              </View>
              <Text
                style={{
                  padding: 10,
                  margin: 10,
                  color: '#00000',
                }}>
                {doctorData?.userExtraDetails?.aboutMe}
              </Text>
            </>
          )}

          {/* Education Details */}
          {doctorData?.userExtraDetails?.education?.length > 1 &&
          <View
            style={{backgroundColor: '#fff', borderRadius: 10, padding: 10}}>
            <Text
              style={{
                color: '#000000',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Education Details{' '}
            </Text>
          </View>
         }

          {doctorData?.userExtraDetails?.education?.length > 1 &&
            doctorData?.userExtraDetails?.education?.map(
              (item: any, index: any) => {
                return (
                  <View>
                    <View
                      style={{
                        backgroundColor: '#1263AC',
                        padding: 10,
                        margin: 10,
                        borderRadius: 10,
                      }}>
                      <Text style={{color: '#fff'}}>Degree {index + 1}</Text>
                    </View>

                    {/* <Text style={styles.jobTitle}>{item.study}</Text> */}
                    <View style={styles.commonD_flex}>
                      <Text style={styles.label}>Designation:</Text>
                      <Text style={styles.value}>{item.study}</Text>
                    </View>
                    {/* </View> */}
                    <View style={styles.commonD_flex}>
                      <Text style={styles.label}>College Name:</Text>
                      <Text style={styles.value}>{item.collegeName}</Text>
                    </View>
                    {/* <Text style={styles.companyName}>{item.collegeName}</Text> */}
                    <View style={styles.commonD_flex}>
                      <Text style={styles.label}>Field Of Study:</Text>
                      <Text style={styles.value}>{item.fieldOfStudy}</Text>
                    </View>
                    {/* <Text style={styles.companyName}>{item.fieldOfStudy}</Text> */}
                    <View style={styles.commonD_flex}>
                      <Text style={styles.label}>City And State:</Text>
                      <Text style={styles.value}>{item.cityState}</Text>
                    </View>
                    {/* <Text style={styles.companyName}>{item.cityState}</Text> */}
                    <View style={styles.commonD_flex}>
                      <Text style={styles.label}>Date:</Text>
                      <Text style={styles.value}>
                        {' '}
                        {item.startMonth} {item.startYear} - {item.endMonth}{' '}
                        {item.endYear}
                      </Text>
                    </View>
                  </View>
                );
              },
            )}

          {/* Experience Details */}
          {doctorData?.userExtraDetails?.experience?.length > 1 &&
          <View
            style={{backgroundColor: '#fff', borderRadius: 10, padding: 10}}>
            <Text
              style={{
                color: '#000000',
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Experience Details{' '}
            </Text>
          </View>
        }

          {doctorData?.userExtraDetails?.experience?.length > 1 &&
            doctorData?.userExtraDetails?.experience?.map(
              (item: any, index: any) => {
                return (
                  <View
                  // style={styles.experienceItem}
                  >
                    <View
                      style={{
                        backgroundColor: '#1263AC',
                        padding: 10,
                        margin: 10,
                        borderRadius: 10,
                      }}>
                      <Text style={{color: '#fff'}}>
                        Experience {index + 1}
                      </Text>
                    </View>

                    <View style={styles.commonD_flex}>
                      <Text style={styles.label}>job Title:</Text>
                      <Text style={styles.value}>{item.jobTitle}</Text>
                    </View>

                    <View style={styles.commonD_flex}>
                      <Text style={styles.label}>Company Name:</Text>
                      <Text style={styles.value}>{item.companyName}</Text>
                    </View>

                    <View style={styles.commonD_flex}>
                      <Text style={styles.label}>Company Name:</Text>
                      <Text style={styles.value}>{item.country}</Text>
                    </View>

                    <View style={styles.commonD_flex}>
                      <Text style={styles.label}>Date:</Text>
                      <Text style={styles.value}>
                        {item.startMonth} {item.startYear} -{' '}
                        {`${item.endMonth} ${item.endYear}`}
                      </Text>
                    </View>

                    <View style={styles.commonD_flex}>
                      <Text style={styles.label}>Job Description:</Text>
                      <Text style={styles.value}>{item.jobDescription}</Text>
                    </View>
                  </View>
                );
              },
            )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignSelf: 'baseline',
            width: wp(100),
            marginVertical: wp(5),
            // padding:wp(1),
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
          {doctorData?.role === 'FRANCHISE' && (
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
  commonD_flex: {
    flexDirection: 'row',
    width: wp(100),
  },
  image: {
    width: wp(20), // Adjust image size
    height: wp(20),
    borderRadius: wp(15), // Adjust border radius for circular image
    marginBottom: hp(1.5), // Add margin for spacing
    backgroundColor: '#eee',
    marginLeft: wp(2),
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
    padding: 10,
    width: wp(60),
  },
  MainView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1263AC',
    width: '100%',
    paddingTop: 12,
    paddingLeft: wp(2),
    marginBottom: hp(1),
  },
  MainTwo: {
    marginLeft: wp(2),
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
    width: wp(40),
    fontWeight: 'bold',
    color: '#333', // Adjust color

    padding: 10,
    // margin:10,
  },

  //new details
  experienceList: {
    paddingBottom: 20,
  },
  experienceItem: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  companyName: {
    fontSize: 14,
    color: '#666',
  },
  dates: {
    fontSize: 14,
    color: '#888',
  },
  deleteButton: {
    padding: 5,
  },
  noExperienceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noExperienceText: {
    fontSize: 16,
    color: '#888',
  },
  toggleButton: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('80%'),
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    padding: wp('5%'),
    height: hp('50%'),
  },
  searchInput: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  pickerItem: {
    padding: 15,
  },
  pickerItemText: {
    fontSize: 16,
  },
});
