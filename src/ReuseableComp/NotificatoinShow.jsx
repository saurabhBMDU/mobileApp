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
import Icon from 'react-native-vector-icons/Feather';



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





  function convertToIndianTimeAndRelative(timestamp) {
    const date = new Date(timestamp);
    const currentDate = new Date();
    
    // Convert to Indian time
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let hours12 = hours % 12;
    hours12 = hours12 === 0 ? 12 : hours12;
    const period = hours < 12 ? 'AM' : 'PM';
    const timeInIndianFormat = `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
  
    // Calculate relative time
    const diffTime = currentDate - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    let relativeTime;
    if (diffDays === 0) {
      relativeTime = 'Today';
    } else if (diffDays === 1) {
      relativeTime = 'Yesterday';
    } else {
      relativeTime = `${diffDays} days ago`;
    }
  
    return `${relativeTime}`;
  }
  

  const [lastRelativeTime, setLastRelativeTime] = useState('');



  const preProcessData = (data) => {
    return data.map((item, index) => {
      const showRelativeTime = index === 0 || data[index - 1].timestamp !== item.timestamp;
      return { ...item, showRelativeTime };
    });
  };
  
  // Usage example:
  const preprocessedData = preProcessData(notifications);
  


const renderItem = ({ item ,index}) => {


  // const relativeTime = convertToIndianTimeAndRelative(item.timestamp);
  // let showRelativeTime = false;

  // // Check if relative time is different from the last one
  // if (relativeTime !== lastRelativeTime) {
  //   showRelativeTime = true;
  //   setLastRelativeTime(relativeTime);
  // }

  let showRelativeTime = false;

  // Check if the current item is not the first one and if its timestamp is the same as the previous one
  if (index > 0 && notifications[index - 1].timestamp === item.timestamp) {
    showRelativeTime = false;
  } else {
    showRelativeTime = true;
  }



  let iconName;
  let iconColor;

  // Set icon based on notification type
  switch (item.title) {
    case 'Appointment rescheduled':
      iconName = 'calendar';
      iconColor = '#fff'; // Example color, adjust as needed
      break;
    case 'Appointment Created':
      iconName = 'plus-circle';
      iconColor = '#fff'; // Example color, adjust as needed
      break;
    case 'Appointment canceled':
      iconName = 'x-circle';
      iconColor = 'red'; // Example color, adjust as needed
      break;
      case 'Appointment Rejected':
        iconName = 'slash';
        iconColor = 'orange'; // Example color, adjust as needed
        break;
    default:
      iconName = 'bell';
      iconColor = 'black'; // Default color
      break;
  }

  return (
    <TouchableOpacity
      style={[styles.notificationItem, { backgroundColor: item.read ? '#EEE' : '#FFF' }]}
      onPress={() => markAsRead(item._id)}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
          style={{
             backgroundColor:'#048f91',
             height:60,
             width:60,
             borderRadius:50,
             alignItems:'center',
             justifyContent:'center',
          }}
          >
          <Icon name={iconName} size={40} color={iconColor} style={{ }} />
        </View>
        
         <View
         style={{
          marginLeft:10,
          width:'80%'
         }}
         >
          <View 
          style={{
             flexDirection:'row',
             justifyContent:'space-between',
             alignItems:'center'
          }}
          >
       <Text style={styles.title}>{item.title}</Text>
       <Text style={styles.timestamp}>{convertToIndianTime(item.timestamp)}</Text>
       </View>

       {/* <Text style={styles.message}>{convertToIndianTimeAndRelative(item.timestamp)}</Text> */}
       {/* {showRelativeTime && (
        <Text style={styles.message}>{convertToIndianTimeAndRelative(item.timestamp)}</Text>
      )} */}

{item.showRelativeTime && (
        <Text style={styles.message}>{convertToIndianTimeAndRelative(item.timestamp)}</Text>
      )}
      
       {/* {showRelativeTime && (
        <Text style={styles.message}>{relativeTime}</Text>
      )} */}
       <Text style={styles.message}>{item.message}</Text>
      </View>
      </View>

      </View>
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
      data={preprocessedData}
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
    color: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationShow;
