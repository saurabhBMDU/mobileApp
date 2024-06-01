import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,Image } from 'react-native';

const ProfileEducationGet = ({data}) => {
  const [experiences, setExperiences] = useState([]);


  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      // const response = await fetch('http://your-backend-url/experiences');
      // const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleDelete = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
  };

  const renderExperienceItem = ({ item, index }) => (
    <>
    <View style={styles.experienceItem}>
    
    <View style={{flexDirection:'row',justifyContent:"space-between"}}>
      <Text style={styles.jobTitle}>{item.jobTitle}</Text>
      <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
      <Image
      source={require('../../assets/images/bin.png')}
      style={{height:24,width:24}}
   />
    </TouchableOpacity>
      </View>

      <Text style={styles.companyName}>{item.companyName}</Text>
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
