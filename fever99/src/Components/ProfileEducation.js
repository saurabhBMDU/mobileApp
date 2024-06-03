

// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import {updateProfileTo } from '../Services/user.service';

// const Profilestudy = () => {
    
//     const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    
//   const [study, setstudy] = useState('');
//   const [fieldOfStudy, setfieldOfStudy] = useState('');
//   const [country, setCountry] = useState('India');
//   const [collegeName, setcollegeName] = useState('');
//   const [startMonth, setStartMonth] = useState('');
//   const [startYear, setStartYear] = useState('');
//   const [endMonth, setEndMonth] = useState('');
//   const [endYear, setEndYear] = useState('');
//   const [isPickerVisible, setPickerVisible] = useState(false);
//   const [pickerType, setPickerType] = useState('');
//   const [pickerOptions, setPickerOptions] = useState([]);

//   const [cityState,setCityState] = useState('')
//   const [clicked,setClicked] = useState(false);
  
//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const years = Array.from({ length: 50 }, (_, i) => `${new Date().getFullYear() - i}`);

//   const countries = [
//     "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
//     "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
//     "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
//     "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
//     "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
//     "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", 
//     "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
//     "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
//     "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", 
//     "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", 
//     "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
//     "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
//     "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", 
//     "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
//     "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
//     "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
//     "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
//     "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", 
//     "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", 
//     "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
//     "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", 
//     "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", 
//     "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", 
//     "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
//     "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", 
//     "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", 
//     "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
//     "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
//     "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", 
//     "Vietnam", "Yemen", "Zambia", "Zimbabwe"
//   ];
  

//   const handleOpenPicker = (type) => {
//     setPickerType(type);
//     setPickerOptions(type === 'startMonth' || type === 'endMonth' ? months : type === 'startYear' || type === 'endYear' ? years : filteredCountries);
//     setPickerVisible(true);
//   };

//   const handlePickerSelect = (item) => {
//     if (pickerType === 'startMonth') setStartMonth(item);
//     else if (pickerType === 'startYear') setStartYear(item);
//     else if (pickerType === 'endMonth') setEndMonth(item);
//     else if (pickerType === 'endYear') setEndYear(item);
//     else if (pickerType === 'country') setCountry(item);
//     setPickerVisible(false);
//   };

//   const saveExperienceData = async () => {
//     console.log('all data is here', {
//       study, fieldOfStudy, country, collegeName, startMonth, endMonth, startYear, endYear
//     });
//   };




// //   const [pickerOptions, setPickerOptions] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

// //   const months = [...];
// //   const years = [...];
// //   const countries = [...];

//   const filteredCountries = countries.filter(country =>
//     country.toLowerCase().includes(searchQuery.toLowerCase())
//   );
  


//   const handleSubmit = async () => {
//     try {
//       setIsLoadingSubmit(true); 

//       const experiences = {
//           'study' : study,
//           'fieldOfStudy' : fieldOfStudy,
//           'country' : country,
//           'collegeName' : collegeName,
//           'cityState' : cityState,
//           startMonth,
//           startYear,
//           endMonth,
//           endYear,
//         }


    
//       //   setExperiences([...experiences, experience]);

//         console.log('All experiences:', experiences);

    
//         // Reset form fields
        
//         const education = {'education' : experiences}

//       let {data: res} = await updateProfileTo(education);
//       console.log('response is here',res)
//       if (res) {
//         alert(res.message);
//       //   await setUser(res.data);

//       setstudy('');
//       setfieldOfStudy('');
//       setCountry('India');
//       setcollegeName('');
//       setStartMonth('');
//       setStartYear('');
//       setEndMonth('');
//       setEndYear('');   

//       }

//     } catch (error) {
//       setIsLoadingSubmit(false); // Set loading state to true

//       alert(error);
//     }
//   };


//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.label}>Level of study<Text style={styles.required}> </Text></Text>
//       <TextInput 
//         style={styles.input}
//         value={study}
//         onChangeText={setstudy}
//       />

//       <Text style={styles.label}>Field of study</Text>
//       <TextInput 
//         style={styles.input}
//         value={fieldOfStudy}
//         onChangeText={setfieldOfStudy}
//       />

//     <Text style={styles.label}>College Name</Text>
//       <TextInput 
//         style={styles.input}
//         value={collegeName}
//         onChangeText={setcollegeName}
//       />

//     <Text style={styles.label}>City, State</Text>
//       <TextInput 
//         style={styles.input}
//         value={cityState}
//         onChangeText={setCityState}
//       />


      

//     <Text style={styles.label}>Country</Text>
//       <View style={styles.countrySearchContainer}>
//         <TextInput
//           style={styles.countrySearchInput}
//           placeholder="Search country..."
//           value={searchQuery}
//           onChangeText={(e) => {
//             setSearchQuery(e)
//             setClicked(true)
//         }}
//         />
//         {filteredCountries.length > 0 && clicked && (
//           <FlatList
//             data={filteredCountries}
//             keyExtractor={(item) => item}
//             renderItem={({ item }) => (
//               <TouchableOpacity onPress={() =>{ 
//                 handlePickerSelect(item)
//                 console.log('clicked')
//                 setSearchQuery(item)
//                 setClicked(false)
//                 }}>
//                 <Text style={styles.filteredCountry}>{item}</Text>
//               </TouchableOpacity>
//             )}
//             style={styles.filteredCountryList}
//           />
//         )}
//       </View>


//       {/*  */}

//       <Text style={styles.label}>Start date</Text>
//       <View style={styles.dateContainer}>
//         <TouchableOpacity onPress={() => handleOpenPicker('startMonth')}>
//           <View style={styles.picker}>
//             <Text>{startMonth || 'Month'}</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleOpenPicker('startYear')}>
//           <View style={styles.picker}>
//             <Text>{startYear || 'Year'}</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.label}>End date</Text>
//       <View style={styles.dateContainer}>
//         <TouchableOpacity onPress={() => handleOpenPicker('endMonth')}>
//           <View style={styles.picker}>
//             <Text>{endMonth || 'Month'}</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleOpenPicker('endYear')}>
//           <View style={styles.picker}>
//             <Text>{endYear || 'Year'}</Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         onPress={ () => { 
//             // saveExperienceData();
//             handleSubmit(); 
//         }}
//         style={{ backgroundColor: 'blue', padding: 10, margin: 10, borderRadius: 10 }}
//       >
//         <Text style={{ color: "#fff", alignSelf: 'center' }}>Save</Text>
//       </TouchableOpacity>

//       {/* Custom Picker Modal */}
//       <Modal
//         transparent={true}
//         visible={isPickerVisible}
//         onRequestClose={() => setPickerVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <FlatList
//               data={pickerOptions}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity onPress={() => handlePickerSelect(item)}>
//                   <Text style={styles.pickerItem}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//   },    
//   countrySearchContainer: {
//     position: 'relative',
//     marginBottom: hp('2%'),
//     zIndex:1,
//   },
//   countrySearchInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: wp('2%'),
//     fontSize: hp('2%'),
//   },
//   filteredCountryList: {
//     position: 'absolute',
//     top: '100%',
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     maxHeight: hp('20%'),
//     zIndex: 1,
//   },
//   filteredCountry: {
//     padding: wp('2%'),
//     fontSize: hp('2%'),
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },

//   label: {
//     fontSize: hp('2%'),
//     fontWeight: 'bold',
//     marginBottom: hp('0.5%'),
//   },
//   required: {
//     color: 'red',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: wp('2%'),
//     marginBottom: hp('2%'),
//     fontSize: hp('2%'),
//   },
//   countryText: {
//     fontSize: hp('2%'),
//     marginBottom: hp('2%'),
//   },
//   changeText: {
//     color: 'blue',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: wp('2%'),
//   },
//   checkboxTick: {
//     width: 14,
//     height: 14,
//     backgroundColor: '#000',
//   },
//   checkboxLabel: {
//     fontSize: hp('2%'),
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('2%'),
//   },
//   picker: {
//     width: wp('40%'),
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: wp('2%'),
//     alignItems: 'center',
//   },
//   textArea: {
//     height: hp('20%'),
//     textAlignVertical: 'top',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: wp('80%'),
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: wp('5%'),
//   },
//   pickerItem: {
//     padding: hp('2%'),
//     fontSize: hp('2%'),
//   },
// });

// export default Profilestudy;



























import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { updateProfileTo, getDoctorWithBankDetails, getUser, deleteExperienceEducationForDoctorProfile } from '../Services/user.service';

const Profilestudy = () => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [study, setStudy] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [country, setCountry] = useState('India');
  const [collegeName, setCollegeName] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [cityState, setCityState] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState('');
  const [pickerOptions, setPickerOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [clicked, setClicked] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const years = Array.from({ length: 50 }, (_, i) => `${new Date().getFullYear() - i}`);
  
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", 
    "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", 
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", 
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", 
    "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", 
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", 
    "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", 
    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", 
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", 
    "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", 
    "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", 
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", 
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      let userData = await getUser();
      let { data: res } = await getDoctorWithBankDetails(userData._id);
      setExperiences(res.data.extraDetail.education);
    } catch (err) {
      alert(err);
    }
  };

  const handleOpenPicker = (type) => {
    setPickerType(type);
    setPickerOptions(type === 'startMonth' || type === 'endMonth' ? months : type === 'startYear' || type === 'endYear' ? years : filteredCountries);
    setPickerVisible(true);
  };

  const handlePickerSelect = (item) => {
    if (pickerType === 'startMonth') setStartMonth(item);
    else if (pickerType === 'startYear') setStartYear(item);
    else if (pickerType === 'endMonth') setEndMonth(item);
    else if (pickerType === 'endYear') setEndYear(item);
    else if (pickerType === 'country') setCountry(item);
    setPickerVisible(false);
  };

  const handleDelete = async (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);

    try {
      const education = { 'education': 'education' };
      const { data: res } = await deleteExperienceEducationForDoctorProfile(index, education);
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoadingSubmit(true);

      const experiencesData = {
        study,
        fieldOfStudy,
        country,
        collegeName,
        cityState,
        startMonth,
        startYear,
        endMonth,
        endYear,
      };

      const education = { 'education': experiencesData };
      let { data: res } = await updateProfileTo(education);

      if (res) {
        alert(res.message);

        setStudy('');
        setFieldOfStudy('');
        setCountry('India');
        setCollegeName('');
        setStartMonth('');
        setStartYear('');
        setEndMonth('');
        setEndYear('');
        setCityState('');

        fetchExperiences();
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderExperienceItem = ({ item, index }) => (
    <View style={styles.experienceItem}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.jobTitle}>{item.study}</Text>
        <TouchableOpacity 
          onPress={() => handleDelete(index)} 
          style={styles.deleteButton}
        >
          <Image
            source={require('../../assets/images/bin.png')}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.companyName}>{item.collegeName}</Text>
      <Text style={styles.companyName}>{item.fieldOfStudy}</Text>
      <Text style={styles.companyName}>{item.cityState}</Text>
      <Text style={styles.dates}>
        {item.startMonth} {item.startYear} - {item.endMonth} {item.endYear}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>

<TouchableOpacity 
        style={styles.toggleButton} 
        onPress={() => setClicked(!clicked)}
      >
        <Text style={styles.toggleButtonText}>{clicked ? 'Close' : 'Add Education'}</Text>
      </TouchableOpacity>

      {clicked ? (
        <View style={styles.form}>
          <Text style={styles.label}>Degree *</Text>
          <TextInput
            style={styles.input}
            placeholder='Add Degree'
            placeholderTextColor='#888'
            value={study}
            onChangeText={setStudy}
          />

          <Text style={styles.label}>Field of Study</Text>
          <TextInput
            style={styles.input}
            placeholder='Field of Study'
            placeholderTextColor='#888'
            value={fieldOfStudy}
            onChangeText={setFieldOfStudy}
          />

          <Text style={styles.label}>Country</Text>
          <TouchableOpacity onPress={() => handleOpenPicker('country')}>
            <TextInput
              style={styles.input}
              placeholder='Country'
              placeholderTextColor='#888'
              value={country}
              editable={false}
            />
          </TouchableOpacity>

          <Text style={styles.label}>College/School Name</Text>
          <TextInput
            style={styles.input}
            placeholder='College/School Name'
            placeholderTextColor='#888'
            value={collegeName}
            onChangeText={setCollegeName}
          />

          <Text style={styles.label}>City/State</Text>
          <TextInput
            style={styles.input}
            placeholder='City/State'
            placeholderTextColor='#888'
            value={cityState}
            onChangeText={setCityState}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.dateContainer}>
              <Text style={styles.label}>Start Month</Text>
              <TouchableOpacity onPress={() => handleOpenPicker('startMonth')}>
                <TextInput
                  style={styles.input}
                  placeholder='Start Month'
                  placeholderTextColor='#888'
                  value={startMonth}
                  editable={false}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.label}>Start Year</Text>
              <TouchableOpacity onPress={() => handleOpenPicker('startYear')}>
                <TextInput
                  style={styles.input}
                  placeholder='Start Year'
                  placeholderTextColor='#888'
                  value={startYear}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.dateContainer}>
              <Text style={styles.label}>End Month</Text>
              <TouchableOpacity onPress={() => handleOpenPicker('endMonth')}>
                <TextInput
                  style={styles.input}
                  placeholder='End Month'
                  placeholderTextColor='#888'
                  value={endMonth}
                  editable={false}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.label}>End Year</Text>
              <TouchableOpacity onPress={() => handleOpenPicker('endYear')}>
                <TextInput
                  style={styles.input}
                  placeholder='End Year'
                  placeholderTextColor='#888'
                  value={endYear}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSubmit} 
            disabled={isLoadingSubmit}
          >
            <Text style={styles.submitButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.experienceList}>
          {experiences.length === 0 ? (
            <View style={styles.noExperienceContainer}>
              <Text style={styles.noExperienceText}>Add your Education details here</Text>
            </View>
          ) : (
            <FlatList
              data={experiences}
              renderItem={renderExperienceItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </ScrollView>
      )}

    

      <Modal visible={isPickerVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredCountries}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.pickerItem} 
                onPress={() => handlePickerSelect(item)}
              >
                <Text style={styles.pickerItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity 
            style={styles.modalCloseButton} 
            onPress={() => setPickerVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  form: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  dateContainer: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
    height:hp('50%')
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
  modalCloseButton: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profilestudy;
