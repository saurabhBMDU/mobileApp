import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getNotifications, isReadNotification } from '../Services/user.service';
import Icon from 'react-native-vector-icons/Feather';
import Headerr from './Headerr';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const NotificationShow = () => {

  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState(new Map());
  const [loading, setLoading] = useState(true);


  const markAsRead = async (id) => {
    try {
      const { data: res } = await isReadNotification(id);
      if (res.status === true) {
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
      console.log("my this respons", res.data)
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

  const preProcessData = (data) => {
    return data.map((item, index) => {
      const showRelativeTime = index === 0 || data[index - 1].timestamp !== item.timestamp;
      return { ...item, showRelativeTime };
    });
  };

  // Usage example:

  const preprocessedData = preProcessData(notifications);

  const renderItem = ({ items, index }) => {
    let showRelativeTime = false;
    // Check if the current item is not the first one and if its timestamp is the same as the previous one

    // if (index > 0 && items[index - 1].timestamp === timestamp) {
    //   showRelativeTime = false;
    // } else {
    //   showRelativeTime = true;
    // }
    let iconName;
    let iconColor;

    // Set icon based on notification type
    switch (items.title) {
      case 'Appointment rescheduled':
        iconName = 'calendar';
        iconColor = '#fff'; // Example color, adjust as needed
        break;
      case 'Appointment Scheduled':
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
    const timestamp = new Date(items.timestamp);

    const formattedDate = `${('0' + (timestamp.getMonth() + 1)).slice(-2)}-${('0' + timestamp.getDate()).slice(-2)}-${timestamp.getFullYear()}`;
    return (
      <TouchableOpacity
        style={[styles.notificationItem, { backgroundColor: items.read ? '#EEE' : '#FFF' }]}
        onPress={() => markAsRead(items._id)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: '#048f91',
                height: 60,
                width: 60,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name={iconName} size={40} color={iconColor} style={{}} />
            </View>
            <View
              style={{
                marginLeft: 10,
                width: '80%'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>

                <Text style={styles.title}>{items.title}</Text>
                <Text style={styles.timestamp}>{formattedDate}</Text>
              </View>
              <Text style={styles.message}>{items.message}</Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Headerr secndheader={true} label='Notification' />
      {
        loading ?
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          :
          <FlatList
            data={notifications}
            ListEmptyComponent={
              <View style={styles.loadingContainer}>
                <Text style={{ fontSize: hp(2) }}>Oops! No Notifications Found</Text>
              </View>
            }
            renderItem={({ item,index }) => {
              return (
                <View>
                  <Text style={styles.dateH1}>{item.date}</Text>
                  {item.notifications.map((items, index) => (
                    renderItem({ items, index })
                  ))}
                </View>
              );
            }}
          />


      }
    </View>
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
    fontSize:hp(1.8),
    marginBottom: 5,
  },
  message: {
    marginBottom: 3,
    fontSize:hp(1.5)
  },
  timestamp: {
    fontSize: 12,
    color: 'black',
  },
  loadingContainer: {
    height: hp(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateH1: {
    fontSize: hp(2.5),
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10

  }
});

export default NotificationShow;
