import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Medicine {
  id: number;
  name: string;
}

interface Test {
  id: number;
  name: string;
}

const SmartPrescriptionPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [tests, setTests] = useState<Test[]>([]);

  const addMedicine = (name: string) => {
    const newMedicine: Medicine = {
      id: Date.now(),
      name: name,
    };
    setMedicines([...medicines, newMedicine]);
  };

  const deleteMedicine = (id: number) => {
    console.log('id',id)
    setMedicines(medicines.filter(medicine => medicine.id !== id));
  };

  const addTest = (name: string) => {
    const newTest: Test = {
      id: Date.now(),
      name: name,
    };
    setTests([...tests, newTest]);
  };

  const deleteTest = (id: number) => {
    setTests(tests.filter(test => test.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionHeader}>Frequently Used Medicines</Text>

       <View
       style={{
        padding:5,
        margin:5,
        borderRadius:10,
        elevation: 5,
        backgroundColor:'#fff'
       }}
       >
        <View
          style={{
            backgroundColor: '#fff',
            paddingLeft:10,
            paddingRight:10,
            paddingTop:10,
          }}>
          <FlatList
            data={medicines}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <View
                  style={{
                    width: '85%',
                  }}>
                  <Text
                    style={{
                      color: '#194E5C',
                      fontWeight: 'bold',
                    }}>
                    {item.name}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      marginRight: 5,
                      borderWidth: 2,
                      borderColor: '#4ebfb2',
                      borderRadius: 10,
                    }}
                    onPress={() => deleteMedicine(item.id)}>
                    <Icon name="x" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                  // onPress={() => }
                  >
                    <Icon name="edit" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>


  {/* <View
   style={{
    flexDirection:'row',
    backgroundColor:'red',
    // alignSelf:'center',
    // justifyContent:'center',
   }}
  >

<View style={styles.plusIconContainer}>
      <View style={styles.plusIconBackground}>
        <Icon name="plus" size={24} color="white" />
      </View>
    </View>

        <View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            addMedicine(
              'New Medicine this is awesome medicne i nlakdnlkfdslakf jlka klja   lad fljalf',
            )
          }>
          <Text style={styles.addButtonText}>Add Medicine</Text>
        </TouchableOpacity>
        </View>
        </View> */}


<TouchableOpacity style={styles.container1}>
      <View style={styles.row}>
        <View style={styles.plusIconContainer}>
          <View style={styles.plusIconBackground}>
            <Icon name="plus" size={24} color="white" />
          </View>
        </View>
        <TouchableOpacity
          style={styles.addButton1}
          onPress={() =>
            addMedicine(
              'New Medicine this is awesome medicne i nlakdnlkfdslakf jlka klja   lad fljalf',
            )
          }>
          <Text style={styles.addButtonText1}>Add Medicine</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>


        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    // padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    margin: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    // width:'90%',
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 15,
    color: '#02BB92',
    fontWeight: 'bold',
  },
  addButton: {
    // backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    margin:10,
    alignItems:'flex-start',
    justifyContent: 'center',
    // marginTop: 20,
    // margin:10,
    marginBottom:20,
  },
  addButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize:20,
  },
  plusIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 40,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconBackground: {
    borderRadius: 40,
    backgroundColor: 'orange',
    padding: 5,
  },
  container1: {
    // backgroundColor: 'red',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
//   plusIconContainer: {
//     width: 35,
//     height: 35,
//     borderRadius: 40,
//     backgroundColor: 'orange',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   plusIconBackground: {
//     borderRadius: 40,
//     backgroundColor: 'orange',
//     padding: 5,
//   },
  addButton1: {
    // backgroundColor: '#ffa500',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText1: {
    color: '#ffa500',
    // fontWeight: 'bold',
    fontSize:20,
  },

});

export default SmartPrescriptionPage;
