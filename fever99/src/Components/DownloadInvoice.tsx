import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Platform, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import {Dropdown} from 'react-native-element-dropdown';
import RNFetchBlob from 'rn-fetch-blob';
import url from '../Services/url.service';
import {DownloadInvoiceFile} from '../Services/appointments.service';

const DownloadInvoice = () => {
  const maincolor = '#1263AC';

  const serverUrl = url;

  const [invoice, setInvoice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  
  const [downloadingIndex, setDownloadingIndex] = useState(false);


  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 29) {
      try {
        const writeGranted = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
        const readGranted = await request(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );

        return (
          writeGranted === RESULTS.GRANTED && readGranted === RESULTS.GRANTED
        );
      } catch (err) {
        // console.warn(err);
        return false;
      }
    } else {
      // For Android 10 and above, no need to request WRITE_EXTERNAL_STORAGE permission
      return true;
    }
  };

  // const handleDownloadPrescription = async (_id: any,index:any) => {
  //   try {
  //     setDownloadingIndex(index)
  //     console.log('id is here', _id);

  //     const hasPermission = await requestStoragePermission();
  //     if (!hasPermission) {
  //       alert('Storage permission denied');
  //       return;
  //     }

  //     const newurl = `${serverUrl}/transaction-invoice/${_id}`;
  //     console.log('url is here', url)
  //     const {config, fs} = RNFetchBlob;
  //     const downloadDir = fs.dirs.DownloadDir;

  //     if (Platform.OS === 'android') {
  //       if (Platform.Version >= 29) {
  //         // Use MediaStore for Android 10 and above
  //         RNFetchBlob.config({
  //           fileCache: true,
  //           addAndroidDownloads: {
  //             useDownloadManager: true,
  //             notification: true,
  //             mime: 'application/pdf',
  //             description: 'File downloaded by download manager.',
  //             mediaScannable: true,
  //             path: `${downloadDir}/prescription-by-id${_id}.pdf`,
  //           },
  //         })
  //           .fetch('GET', newurl)
  //           .then(res => {
  //             setDownloadingIndex(null)
  //             alert('Invoice Downloaded');
  //           })
  //           .catch(err => {
  //             // console.log(err);
  //             setDownloadingIndex(null)
  //             console.log('error in downloading',err)
  //             alert('Download failed');
  //           });
    
  //       } else {
  //         // For Android 9 and below
  //         RNFetchBlob.config({
  //           fileCache: true,
  //           addAndroidDownloads: {
  //             useDownloadManager: true,
  //             notification: true,
  //             path: `${downloadDir}/invoice-by-id${_id}.pdf`,
  //             mime: 'application/pdf',
  //             description: 'File downloaded by download manager.',
  //           },
  //         })
  //           .fetch('GET', newurl)
  //           .then(res => {
  //             RNFetchBlob.android.actionViewIntent(
  //               res.path(),
  //               'application/pdf',
  //             );
  //             setDownloadingIndex(null)
  //             alert('Invoice Downloaded');
  //           })
  //           .catch(err => {
  //             // console.log(err);
  //             setDownloadingIndex(null)
  //             alert('Download failed');
  //           });
  //       }
  //     } else {
  //       alert('Not Configured');
  //     }
  //   } catch (error) {
  //     // console.error(error);
  //     setDownloadingIndex(null)
  //     alert('An error occurred');
  //   }
  // };





  const handleDownloadPrescription = async (id: any,index : any) => {
    try {
      setDownloadingIndex(index);
      console.log('id',id)
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        alert('Storage permission denied');
        return;
      }

      const downloadUrl =`${serverUrl}/transaction-invoice/${id}`;
      const {config, fs} = RNFetchBlob;
      const downloadDir = fs.dirs.DownloadDir;

      if (Platform.OS === 'android') {
        if (Platform.Version >= 29) {
          // Use MediaStore for Android 10 and above
          RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              mime: 'application/pdf',
              description: 'File downloaded by download manager.',
              mediaScannable: true,
              path: `${downloadDir}/invoice-by-id${id}.pdf`,
            },
          })
            .fetch('GET', downloadUrl)
            .then(res => {
              setDownloadingIndex(false)
              alert('invoice Downloaded');
            })
            .catch(err => {
              // console.log(err);
              setDownloadingIndex(false)
              alert('Download failed');
            });
        } else {
          // For Android 9 and below
          RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path: `${downloadDir}/invoice-by-id${id}.pdf`,
              mime: 'application/pdf',
              description: 'File downloaded by download manager.',
            },
          })
            .fetch('GET', downloadUrl)
            .then(res => {
              RNFetchBlob.android.actionViewIntent(
                res.path(),
                'application/pdf',
              );
              setDownloadingIndex(false)
              alert('invoice Downloaded');
            })
            .catch(err => {
              // console.log(err);
              setDownloadingIndex(false)
              alert('Download failed');
            });
        }
      } else {
        setDownloadingIndex(false)
        alert('Not Configured');
      }
    } catch (error) {
      // console.error(error);
      setDownloadingIndex(false)
      alert('An error occurred');
    }
  };


  const handleGetAllInvoice = async () => {
    try {
      setIsLoading(true); // Start loading
      let {data: res} = await DownloadInvoiceFile();
      // console.log('all invoice', res);
      setInvoice(res.response);
      // Alert.alert(res?.data?.height);
    } catch (err) {
      console.log('err ', err?.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    handleGetAllInvoice();
  }, []);

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //     }}>
  //    { isLoading ?
  //  (  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
  //    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
  //      <ActivityIndicator size="large" color="#0000ff" />
  //    </View>
  //  </View>) :
  //    (<FlatList
  //       data={invoice}
  //       keyExtractor={(item, index) => `${index}`}
  //       renderItem={({item, index}: any) => {
  //         return (
  //           <View
  //           style={{
  //             flex:1
  //           }}
  //           >
  //               <View
  //                 style={{
  //                   display: 'flex',
  //                   flexDirection: 'row',
  //                   width: wp(100),
  //                 }}>
  //                 <TouchableOpacity
  //                   onPress={
  //                     () => handleDownloadPrescription(item._id, index)
  //                     // alert('working fine ')
  //                   }
  //                   style={{
  //                     backgroundColor: maincolor,
  //                     width: wp(95),
  //                     borderTopRightRadius: 10,
  //                     // userObj?.role == Roles.DOCTOR ? 0 : 10,
  //                     borderBottomRightRadius: 10,
  //                     // userObj?.role == Roles.DOCTOR ? 0 : 10,
  //                     borderBottomLeftRadius: 5,
  //                     borderTopLeftRadius: 5,
  //                     marginBottom: hp(1),
  //                     paddingHorizontal: wp(2),
  //                     paddingVertical: hp(1),
  //                   }}>
  //                   {downloading ? (
  //                     <Text
  //                       style={{
  //                         color: 'white',
  //                         fontSize: hp(2.5),
  //                         textAlign: 'center',
  //                       }}>
  //                       Downloading...
  //                     </Text>
  //                   ) : (
  //                     <Text style={{color: 'white', fontSize: hp(2)}}>
  //                       Prescription
  //                       {moment(item.createdAt).format('DD/MM/YYYY h:mm:ss a')}
  //                     </Text>
  //                   )}
  //                 </TouchableOpacity>
  //               </View>
  //           </View>
  //         );
  //       }}
  //     />)
      
  //     }
  //   </View>
  // );


  return (
    <View style={styles.container}>
      {isLoading ? (
        ( 
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
          <View style={{ padding: 20, borderRadius: 10 }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </View>
          )
      ) : (
        <FlatList
          data={invoice}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              {/* <Text style={styles.itemText}>Name: {item.billing_name}</Text> */}
              <Text style={styles.itemText}>Date: {moment(item?.createdAt).format('DD/MM/YYYY h:mm:ss a')}</Text>
              <Text style={styles.itemText}>Amount: {item?.amount}</Text>
              <Text style={styles.itemText}>Status: {item?.order_status}</Text>
              <Text style={styles.itemText}>Status Message: {item?.status_message}</Text>
              <View style={styles.buttonContainer}>
               
                  <TouchableOpacity
                  onPress={() => handleDownloadPrescription(item._id, index)}
                  style={styles.button}
                >
                  {downloadingIndex === index ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Download</Text>
                  )}
                </TouchableOpacity>

              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
  },
  loadingText: {
    textAlign: 'center',
    marginTop: hp(25),
    fontSize: hp(2.5),
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: wp(3),
    marginVertical: hp(1),
    borderRadius: 10,
    elevation: 2,
  },
  itemText: {
    fontSize: hp(2),
    marginBottom: hp(0.5),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#1263AC',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: hp(2),
    textAlign: 'center',
  },
});


export default DownloadInvoice;
