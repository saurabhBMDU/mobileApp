

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {updateProfileTo } from '../Services/user.service';

const ProfileEducation = () => {
    
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const handleSubmit = async () => {
      try {
        setIsLoadingSubmit(true); 

        const experiences = [{
           'education' : education,
            'fieldOfStudy' : fieldOfStudy,
             'country' : country,
             'collegeName' : collegeName,
             'cityState' : cityState,
            startMonth,
            startYear,
            endMonth,
            endYear,
          }]


      
        //   setExperiences([...experiences, experience]);

          console.log('All experiences:', experiences);

      
          // Reset form fields
          
          const education = {'education' : experiences}
  
        let {data: res} = await updateProfileTo(education);
        console.log('response is here',res)
        if (res) {
          alert(res.message);
        //   await setUser(res.data);

        seteducation('');
        setfieldOfStudy('');
        setCountry('India');
        setcollegeName('');
        setStartMonth('');
        setStartYear('');
        setEndMonth('');
        setEndYear('');   

        }
  
      } catch (error) {
        setIsLoadingSubmit(false); // Set loading state to true
  
        alert(error);
      }
    };
  

  const [education, seteducation] = useState('');
  const [fieldOfStudy, setfieldOfStudy] = useState('');
  const [country, setCountry] = useState('India');
  const [collegeName, setcollegeName] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState('');
  const [pickerOptions, setPickerOptions] = useState([]);

  const [cityState,setCityState] = useState('')
  const [clicked,setClicked] = useState(false);
  
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

  const saveExperienceData = async () => {
    console.log('all data is here', {
      education, fieldOfStudy, country, collegeName, startMonth, endMonth, startYear, endYear
    });
  };




//   const [pickerOptions, setPickerOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

//   const months = [...];
//   const years = [...];
//   const countries = [...];

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  



  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Level of education<Text style={styles.required}> </Text></Text>
      <TextInput 
        style={styles.input}
        value={education}
        onChangeText={seteducation}
      />

      <Text style={styles.label}>Field of study</Text>
      <TextInput 
        style={styles.input}
        value={fieldOfStudy}
        onChangeText={setfieldOfStudy}
      />

    <Text style={styles.label}>College Name</Text>
      <TextInput 
        style={styles.input}
        value={collegeName}
        onChangeText={setcollegeName}
      />

    <Text style={styles.label}>City, State</Text>
      <TextInput 
        style={styles.input}
        value={cityState}
        onChangeText={setCityState}
      />


      

    <Text style={styles.label}>Country</Text>
      <View style={styles.countrySearchContainer}>
        <TextInput
          style={styles.countrySearchInput}
          placeholder="Search country..."
          value={searchQuery}
          onChangeText={(e) => {
            setSearchQuery(e)
            setClicked(true)
        }}
        />
        {filteredCountries.length > 0 && clicked && (
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() =>{ 
                handlePickerSelect(item)
                console.log('clicked')
                setSearchQuery(item)
                setClicked(false)
                }}>
                <Text style={styles.filteredCountry}>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.filteredCountryList}
          />
        )}
      </View>


      {/*  */}

      <Text style={styles.label}>Start date</Text>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => handleOpenPicker('startMonth')}>
          <View style={styles.picker}>
            <Text>{startMonth || 'Month'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenPicker('startYear')}>
          <View style={styles.picker}>
            <Text>{startYear || 'Year'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>End date</Text>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => handleOpenPicker('endMonth')}>
          <View style={styles.picker}>
            <Text>{endMonth || 'Month'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenPicker('endYear')}>
          <View style={styles.picker}>
            <Text>{endYear || 'Year'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={ () => { 
            // saveExperienceData();
            handleSubmit(); 
        }}
        style={{ backgroundColor: 'blue', padding: 10, margin: 10, borderRadius: 10 }}
      >
        <Text style={{ color: "#fff", alignSelf: 'center' }}>Save</Text>
      </TouchableOpacity>

      {/* Custom Picker Modal */}
      <Modal
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={pickerOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePickerSelect(item)}>
                  <Text style={styles.pickerItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
  },    
  countrySearchContainer: {
    position: 'relative',
    marginBottom: hp('2%'),
    zIndex:1,
  },
  countrySearchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: wp('2%'),
    fontSize: hp('2%'),
  },
  filteredCountryList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: hp('20%'),
    zIndex: 1,
  },
  filteredCountry: {
    padding: wp('2%'),
    fontSize: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  label: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: wp('2%'),
    marginBottom: hp('2%'),
    fontSize: hp('2%'),
  },
  countryText: {
    fontSize: hp('2%'),
    marginBottom: hp('2%'),
  },
  changeText: {
    color: 'blue',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2%'),
  },
  checkboxTick: {
    width: 14,
    height: 14,
    backgroundColor: '#000',
  },
  checkboxLabel: {
    fontSize: hp('2%'),
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  picker: {
    width: wp('40%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: wp('2%'),
    alignItems: 'center',
  },
  textArea: {
    height: hp('20%'),
    textAlignVertical: 'top',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: wp('80%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp('5%'),
  },
  pickerItem: {
    padding: hp('2%'),
    fontSize: hp('2%'),
  },
});

export default ProfileEducation;
