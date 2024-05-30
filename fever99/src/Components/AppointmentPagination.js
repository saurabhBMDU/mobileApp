// AppointmentPagination.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AppointmentPagination = ({ currentPage,totalPage, onPageChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentPage <= 1 && styles.disabledButton]}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>
      <Text style={styles.pageNumber}>{`Total ${totalPage}`}</Text>
      <Text style={styles.pageNumber}>{`Current ${currentPage}`}</Text>
      
      <TouchableOpacity
        style={[styles.button,  currentPage >= totalPage && styles.disabledButton]}
        onPress={() =>{ 
          console.log('currentpage ',currentPage );
          console.log('totalpage',totalPage);
      
          if(currentPage < totalPage ){
           onPageChange(currentPage + 1);
        }else{
          // alert('There is no remaining page')
        }
          }}
         
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1263AC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  pageNumber: {
    fontSize: 16,
    color: '#000',
  },
});

export default AppointmentPagination;
