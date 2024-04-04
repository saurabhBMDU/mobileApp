import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import ReusablePicker from './smartPrescriptionPicker';
import Icon from 'react-native-vector-icons/Feather';

const AddMedicineModal = ({visible, onClose, onAdd}) => {
  const [selectedOption, setSelectedOption] = useState('Default');

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  //for duration state and function
  const [duration, setDuration] = useState('');
  const durationFunction = value => {
    console.log('value is here', value);
    setDuration(value);
  };

  const data = Array.from({length: 50}, (_, index) => ({
    key: index + 1,
    label: `${index + 1}`,
    value: `${index + 1}`,
  }));

  //for days data and funtion
  const [days, setDays] = useState('');
  const daysFuntion = value => {
    console.log('value is here', value);
    setDays(value);
  };
  const data2 = [
    {key: 1, label: 'Days(s)', value: 'Days(s)'},
    {key: 2, label: 'Week(s)', value: 'Week(s)'},
    {key: 3, label: 'Month(s)', value: 'Month(s)'},
    {key: 3, label: 'Till Next Review', value: 'Till Next Review'},
    // Add more options as needed
  ];

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedOption === 'Default' ? styles.activeTab : null,
            ]}
            onPress={() => handleOptionSelect('Default')}>
            <Text
              style={[
                styles.tabText,
                selectedOption === 'Default' ? styles.activeTabText : null,
              ]}>
              Default
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedOption === 'Free Text' ? styles.activeTab : null,
            ]}
            onPress={() => handleOptionSelect('Free Text')}>
            <Text
              style={[
                styles.tabText,
                selectedOption === 'Free Text' ? styles.activeTabText : null,
              ]}>
              Free Text
            </Text>
          </TouchableOpacity>
        </View>
        {/* if selected option is Default */}
        {selectedOption && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View>
              <Text>Duration</Text>
           
             <View
             style={{
              flexDirection:"row",
              width:'40%',
              backgroundColor:'red'
             }}
             >
              <ReusablePicker
                data={data}
                selectedValue={duration}
                onValueChange={value => durationFunction(value)}
                width={200}
                height={200}
              />
                 <Icon name={'chevron-down'} size={20} color="black" style={styles.icon} />
                 </View>
            </View>

            <View
              style={{
                marginTop: 18,
              }}>
              <ReusablePicker
                data={data2}
                selectedValue={days}
                onValueChange={value => daysFuntion(value)}
                width={200}
                height={200}
              />
            </View>
          </View>
        )}
        <Text>Add Medicine</Text>
        {/* Add input fields and options for adding medicine */}
        <TouchableOpacity onPress={onAdd}>
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    padding: 20,
  },
  tab: {
    borderBottomWidth: 2,
    width: '50%',
    paddingBottom: 10,
    borderColor: '#086d99',
  },
  tabText: {
    alignSelf: 'center',
    color: '#086d99',
  },
  activeTab: {
    backgroundColor: '#086d99',
  },
  activeTabText: {
    color: 'white',
  },
});

export default AddMedicineModal;
