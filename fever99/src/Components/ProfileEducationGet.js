import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { deleteExperienceEducationForDoctorProfile, getDoctorWithBankDetails, getUser } from '../Services/user.service';

const ProfileEducationGet = () => {

  const [experiences, setExperiences] = useState([]);
  const [isloding,setisLodings] = useState('');

  const fetchExperiences = async () => {
    setisLodings(true);
    try {
      let userData = await getUser();

      let {data: res} = await getDoctorWithBankDetails(userData._id);
      console.log('detail all for doctor and other-------=',res.data.extraDetail.education)
      setExperiences(res.data.extraDetail.education);
      // setExperienceData(res.data.extraDetail.experience)
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);


  const handleDelete = async (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);

    try{

      const education = {'education' : 'education'}

      const {data : res} = await deleteExperienceEducationForDoctorProfile(index,education)
      console.log('delete doctor profile education k ',res)

    }catch(error){
    
    }

  };


  const renderExperienceItem = ({ item, index }) => (
    <>
    <View style={styles.experienceItem}>
    
    <View style={{flexDirection:'row',justifyContent:"space-between"}}>
      <Text style={styles.jobTitle}>{item.study}</Text>
      <TouchableOpacity 
      onPress={() => handleDelete(index)} 
      style={styles.deleteButton}>
      <Image
      source={require('../../assets/images/bin.png')}
      style={{height:24,width:24}}
   />
    </TouchableOpacity>
      </View>

      <Text style={styles.companyName}>{item.fieldOfStudy}</Text>
      <Text style={styles.companyName}>{item.country}</Text>
      <Text style={styles.companyName}>{item.collegeName}</Text>
      <Text style={styles.companyName}>{item.cityState}</Text>

      <Text>{item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}</Text>
      <Text>{item.jobDescription}</Text>
    
    </View>
    
    </>
  );

  return (
    <View>
    <FlatList
      data={experiences}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderExperienceItem}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  experienceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
    margin:5
  },
  jobTitle: {
    fontWeight: 'bold',
  },
  companyName: {
    color: 'gray',
  },
  deleteButton: {
    padding: 5,
  },
});

export default ProfileEducationGet;
