// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet,ActivityIndicator } from 'react-native';
// import { getNotifications } from '../Services/user.service';

// const NotificationShow = () => {

//   const [notifications,setNotifications] = useState([])

//   const [readNotifications, setReadNotifications] = useState([]);

//   const [loading, setLoading] = useState(true); // State for loading indicator


//   const markAsRead = (notificationId) => {
//     setReadNotifications([...readNotifications, notificationId]);
//   };

//   const isRead = (notificationId) => {
//     return readNotifications.includes(notificationId);
//   };


//   const getAllNotifications = async () => {
//     try {
//       const {data: res} = await getNotifications();
//       // console.log('notificaoitn',res)
//       if (res.status == true) {
//         console.log('getting all notifications in Notifiiton show page  backend',res)
//         setNotifications(res.data);
//         throw new Error(res.error);
//       }
//     } catch (err) {
//       toastError(err);
//     }
//   finally {
//     setLoading(false); // Set loading to false after fetching data
//   }
//   };


//   useEffect(() =>{
//     getAllNotifications();
//   },[])

//   const renderItem = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={[styles.notificationItem, { backgroundColor: isRead(item.userId) ? '#EEE' : '#FFF' }]}
//         onPress={() => markAsRead(item.userId)}
//       >
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.message}>{item.message}</Text>
//         <Text style={styles.timestamp}>{item.timestamp}</Text>
//       </TouchableOpacity>
//     );
//   };


//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={notifications}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.userId.toString()}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   notificationItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#DDD',
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   message: {
//     fontSize: 14,
//     marginBottom: 3,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#888',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default NotificationShow;







import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,ActivityIndicator } from 'react-native';
import { getNotifications, isReadNotification } from '../Services/user.service';

const NotificationShow = () => {

  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState(new Map());
  const [loading, setLoading] = useState(true);


  const markAsRead = async (id) => {
    try {
      const { data: res } = await isReadNotification(id);
      console.log('isReadNotifications',res)
      if (res.status === true) {
        // setNotifications(res.data);
        getAllNotifications();
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } 
    finally {
      setLoading(false);
    }
  };


  const getAllNotifications = async () => {
    try {
      const { data: res } = await getNotifications();
      if (res.status === true) {
        setNotifications(res.data);
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getAllNotifications();
  }, []);




  function convertToIndianTime(timestamp) {
    const date = new Date(timestamp);
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    let hours12 = hours % 12;
    hours12 = hours12 === 0 ? 12 : hours12; // Convert 0 to 12
  
    const period = hours < 12 ? 'AM' : 'PM';
  
    const timeInIndianFormat = `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  
    return timeInIndianFormat;
  }


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.notificationItem, { backgroundColor: item.read ? '#EEE' : '#FFF' }]}
        onPress={() => markAsRead(item._id)}
      >
        {/* <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text> */}

<View
style={{
  flexDirection:"row",
  justifyContent:'space-between'
}}
>
<Text style={styles.title}>Title: {item.title}</Text>
<Text style={styles.timestamp}>{ convertToIndianTime(item.timestamp)}</Text>
</View>

      <Text style={styles.message}>Message: {item.message}</Text>
      
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item._id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    marginBottom: 3,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationShow;
