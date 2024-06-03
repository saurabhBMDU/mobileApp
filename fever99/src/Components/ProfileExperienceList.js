import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { deleteExperienceEducationForDoctorProfile, getDoctorWithBankDetails, getUser, updateProfileTo } from '../Services/user.service';

const ProfileExperiencelist = () => {

  
  const [experiences, setExperiences] = useState();
  // console.log('expereince daata',experiences,data)

 
  const [deleteExperience,setDeleteExperience] = useState([]);


  const fetchExperiences = async () => {
    // setisLodings(true);
    try {
      let userData = await getUser();
      let {data: res} = await getDoctorWithBankDetails(userData._id);
      console.log('detail all for doctor and other-------=',res.data.extraDetail.experience)
      setExperiences(res.data.extraDetail.experience);
      // setExperienceData(res.data.extraDetail.experience)
    } catch (err) {
      alert(err);
    }
  };

   useEffect(()=>{
    fetchExperiences();
  },[]);

  

  const deleteExperienceApi = async (index) => {
    try {
      // const response = await fetch('http://your-backend-url/experiences');
      // const data = await response.json();

      let experience = { 'experience' : 'experience'}
      console.log('index and data',index,experience)
       
      let {data: res} = await deleteExperienceEducationForDoctorProfile(index,experience);
      console.log('delete experince response  is here',res)

      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error.message);
    }
  };

  const handleDelete = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
    deleteExperienceApi(index);

  };

  const renderExperienceItem = ({ item, index }) => (
    <>
    <View style={styles.experienceItem}>
    
    <View style={{flexDirection:'row',justifyContent:"space-between"}}>
      <Text style={styles.jobTitle}>{item.jobTitle}</Text>
      <TouchableOpacity 
      onPress={() =>{ handleDelete(index)} }
      style={styles.deleteButton}>
      <Image
      source={require('../../assets/images/bin.png')}
      style={{height:24,width:24}}
   />
    </TouchableOpacity>
      </View>

      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text>{item.startMonth} {item.startYear} To {item.endMonth} {item.endYear}</Text>
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

export default ProfileExperiencelist;
