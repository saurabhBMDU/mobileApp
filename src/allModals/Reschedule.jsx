import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  Alert
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CloseBtn_incon from 'react-native-vector-icons/Entypo';

const mainFont = 'Montserrat-Regular';

const Reschedule = ({ cartID, closeModal }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [gender, setGender] = useState('');
  const [isGenderFocused, setIsGenderFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedDate || !gender) {
      Alert.alert('Validation Error', 'Please select date and gender');
      return;
    }

    // Construct your API request payload
    const requestData = {
      date: selectedDate,
      gender: gender,
      // Add other fields as needed
    };

    setIsLoading(true);
    try {
      // Make API request
      const response = await axios.post('YOUR_API_ENDPOINT', requestData);
      console.log('API Response:', response.data);
      setIsLoading(false);
      closeModal();
      // Handle success response
    } catch (error) {
      console.error('API Error:', error);
      setIsLoading(false);
      // Handle error response
    }
  };

  const offModal = () => {
    closeModal();
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.modalContent}>
        <View style={styles.d_Flex}>
          <Text style={styles.modalTitle}>Update</Text>
          <TouchableOpacity onPress={offModal}>
            <CloseBtn_incon
              name="cross"
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <TouchableOpacity onPress={() => setSelectedDate(new Date())}>
            <Text style={styles.label}>Select Date:</Text>
            <TextInput
              value={selectedDate ? selectedDate.toString() : ''}
              editable={false}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={'gray'}
              style={styles.inputField}
            />
          </TouchableOpacity>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            minDate={new Date()}
          />
          <Text style={styles.label}>Gender:</Text>
          <Dropdown
            data={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
              { label: 'Other', value: 'Other' },
            ]}
            value={gender}
            onChangeText={(value) => setGender(value)}
            containerStyle={styles.dropdownContainer}
            inputContainerStyle={styles.dropdownInput}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Reschedule;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: hp(1),
    width: wp(95),
  },
  d_Flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: hp(3),
    fontFamily: mainFont,
    fontWeight: 'bold',
    color: 'black',
  },
  closeIcon: {
    fontSize: hp(5),
    padding: 8,
    backgroundColor: '#dfeefc',
    color: '#1263AC',
    borderRadius: wp(40),
  },
  formContainer: {
    marginTop: hp(1),
  },
  label: {
    fontSize: hp(1.8),
    fontFamily: mainFont,
    color: 'black',
    marginTop: hp(1),
  },
  inputField: {
    height: hp(6),
    width: wp(95),
    backgroundColor: '#F2F2F2E5',
    marginTop: hp(0.5),
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.7,
    paddingLeft: wp(2),
  },
  dropdownContainer: {
    width: wp(95),
    marginTop: hp(1),
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.7,
  },
  dropdownInput: {
    borderBottomWidth: 0,
  },
  submitButton: {
    width: wp(95),
    height: hp(7),
    backgroundColor: '#1263AC',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  submitButtonText: {
    color: 'white',
    fontSize: hp(2),
    fontFamily: mainFont,
  },
});
