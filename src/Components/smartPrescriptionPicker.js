import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const ReusablePicker = ({ data, selectedValue, onValueChange, width, height }) => {
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <View style={[styles.container, { width }]}>
      <TouchableOpacity onPress={togglePicker} style={styles.selectedValueContainer}>
        <Text>{selectedValue}</Text>
      </TouchableOpacity>
      {showPicker && (
        <View style={[styles.pickerContainer, { width, height }]}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.key.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.pickerItem}
                onPress={() => {
                  onValueChange(item.value);
                  togglePicker();
                }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  selectedValueContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    position: 'absolute',
    top: 40, // Adjust this value according to your layout
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 1,
  },
  pickerItem: {
    padding: 10,
    // borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default ReusablePicker;
