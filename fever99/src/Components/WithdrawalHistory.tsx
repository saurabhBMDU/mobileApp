import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Dimensions,ActivityIndicator,TouchableOpacity,TextInput} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Profiles_setting_icons from 'react-native-vector-icons/AntDesign';
import Money_icons from 'react-native-vector-icons/FontAwesome';
import Calendar_icons from 'react-native-vector-icons/FontAwesome5';
import Descriptyin_icosn from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Headerr from '../ReuseableComp/Headerr';
import LoadingService from '../All_Loding_page/Loding_service';
import {getWithdrawalHistory } from '../Services/wallet.service';

import Status_icons from 'react-native-vector-icons/FontAwesome';
import AppointmentPagination from './AppointmentPagination';

import Clode_icons from 'react-native-vector-icons/AntDesign';
import {Calendar} from 'react-native-calendars';


const {height, width} = Dimensions.get('window');

const mainFont = 'Montserrat-Regular';
const mainFontBold = 'Montserrat-Bold';
const maincolor = '#1263AC';

const WithdrawalHistory = () => {
  const focused = useIsFocused();
  const [incomeTrans, setIncomeTrans] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page,setPage] = useState(1);

  const [fromDate, setFromDate] = useState('');
  const [toDate, settoDate] = useState('');

  const [userObj, setUserObj] = useState<any>('');
  const [dateModal, setDateModal] = useState(false);
  const [dateToModal, setDateToModal] = useState(false);

  const [limit, setLimit] = useState(10);


 

  const [totalPages,setTotalPages] = useState(0);




  const handlegetTrasction = async (page:number) => {
    try {
        setLoading(true)

        let queryString = `page=${1}&limit=${limit}`;

        if (fromDate && fromDate !== '') {
          queryString = `${queryString}&fromDate=${fromDate}`;
        }
        if (toDate && toDate !== '') {
          queryString = `${queryString}&toDate=${toDate}`;
        }

      const {data: res} = await getWithdrawalHistory(queryString);
      console.log('Transactions data not found in the response', res);
      if (res?.withdrawals) {
        setLoading(false)
        setIncomeTrans(res?.withdrawals);
        setTotalPages(res.totalPages);
      } else {
        setLoading(false)
        console.error('Transactions data not found in the response');
      }
      setLoading(false);
    } catch (err) {
        setLoading(false)
      // Handle errors here
      console.error('Error while fetching transactions:', err);
      setLoading(false);
    }
  };


  useEffect(() => {
    handlegetTrasction(1);
},[]);




const handlePageChange = (no : number) => {
    console.log('page',no)
    setPage(no);
    // setPage(page);
    // HandleGetAppointmentsPaginated(page)
    // console.log('page',page)
    handlegetTrasction(no)
  };



  const HandleGetAppointmentsWithFilterPaginated = async () => {
    try {
      setPage(1);
      setLoading(true)
      let queryString = `page=${1}&limit=${limit}`;

      if (fromDate && fromDate !== '') {
        queryString = `${queryString}&fromDate=${fromDate}`;
      }
      if (toDate && toDate !== '') {
        queryString = `${queryString}&toDate=${toDate}`;
      }

      try {
        setLoading(true)
      const {data: res} = await getWithdrawalHistory(queryString);
      console.log('Transactions data not found in the response', res);
      if (res?.withdrawals) {
        setLoading(false)
        setIncomeTrans(res?.withdrawals);
      } else {
        setLoading(false)
        console.error('Transactions data not found in the response');
      }
      setLoading(false);
    } catch (err) {
        setLoading(false)
      // Handle errors here
      console.error('Error while fetching transactions:', err);
      setLoading(false);
    }

    //   if (res.data) {
    //     if (!isEqual(res.data, appointmentsArr)) {
    //       setAppointmentsArr([...res.data]);
    //     }
    //   }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      // toastError(err);
    }
  };



  
  return (
    <View
    style={{
        flex:1,
    }}
    >
      <Headerr
        secndheader={true}
        // secondText={`Income Wallet: ₹${balance}`}  
        // label={`Income Wallet Balance : ₹${balance}`}
        btn={false}
      />


<View
            style={{
              width: wp(95),
              alignSelf: 'center',
              marginTop: hp(1),
              flexDirection: 'row',
              // marginBottom: hp(1),
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => setDateModal(true)}
              style={{width: wp(35)}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: hp(1.8),
                  fontFamily: mainFont,
                }}>
                From Date:
              </Text>
              <TextInput
                editable={false}
                placeholder="YYYY-MM-DD"
                value={fromDate}
                placeholderTextColor={'gray'}
                style={{
                  height: hp(6),
                  width: wp(35),
                  backgroundColor: '#F2F2F2E5',
                  marginTop: hp(0.5),
                  borderRadius: 5,
                  borderColor: 'gray',
                  borderWidth: 0.7,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDateToModal(true)}
              style={{width: wp(35)}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: hp(1.8),
                  fontFamily: mainFont,
                }}>
                To Date:
              </Text>
              <TextInput
                editable={false}
                placeholder="YYYY-MM-DD"
                value={toDate}
                placeholderTextColor={'gray'}
                style={{
                  height: hp(6),
                  width: wp(35),
                  backgroundColor: '#F2F2F2E5',
                  marginTop: hp(0.5),
                  borderRadius: 5,
                  borderColor: 'gray',
                  borderWidth: 0.7,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                HandleGetAppointmentsWithFilterPaginated();
                setPage(1);
              }}
              style={{
                width: wp(18),
                backgroundColor: maincolor,
                height: hp(6),
                marginTop: hp(3),
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: hp(1.7),
                  fontFamily: mainFont,
                }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>


            <Modal
          isVisible={dateModal}
          animationIn={'bounceIn'}
          animationOut={'bounceOut'}
          onBackButtonPress={() => setDateModal(false)}
          style={{marginLeft: 0, marginRight: 0}}>
          <View
            style={{
              width: wp(85),
              paddingTop: hp(1),
              paddingBottom: hp(3),
              backgroundColor: 'white',
              alignSelf: 'center',
              borderRadius: 5,
              paddingLeft: wp(4),
              paddingRight: wp(4),
            }}>
            <TouchableOpacity
              onPress={() => setDateModal(false)}
              style={{alignSelf: 'flex-end'}}>
              <Clode_icons
                name="close"
                style={{
                  fontSize: hp(4),
                  paddingLeft: wp(6),
                  marginBottom: hp(1),
                }}
              />
            </TouchableOpacity>
            <Calendar
              onDayPress={day => {
                setFromDate(day.dateString);
                setDateModal(false);
              }}
            />
          </View>
        </Modal>

        <Modal
          isVisible={dateToModal}
          animationIn={'bounceIn'}
          animationOut={'bounceOut'}
          onBackButtonPress={() => setDateToModal(false)}
          style={{marginLeft: 0, marginRight: 0}}>
          <View
            style={{
              width: wp(85),
              paddingTop: hp(1),
              paddingBottom: hp(3),
              backgroundColor: 'white',
              alignSelf: 'center',
              borderRadius: 5,
              paddingLeft: wp(4),
              paddingRight: wp(4),
            }}>
            <TouchableOpacity
              onPress={() => setDateToModal(false)}
              style={{alignSelf: 'flex-end'}}>
              <Clode_icons
                name="close"
                style={{
                  fontSize: hp(4),
                  paddingLeft: wp(6),
                  marginBottom: hp(1),
                }}
              />
            </TouchableOpacity>
            <Calendar
              onDayPress={day => {
                settoDate(day.dateString);
                setDateToModal(false);
              }}
              minDate={
                fromDate && fromDate != ''
                  ? `${new Date(fromDate)}`
                  : `${new Date()}`
              }
            />
          </View>
        </Modal>


        {loading ? (
          <View
          style={{
            flex:1,
            alignItems:"center",
            justifyContent:'center',
          }}
          >
        <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (

      <FlatList
        showsVerticalScrollIndicator={false}
        data={incomeTrans}
        ListEmptyComponent={
          <>
            {loading ? (
              <View>
                <LoadingService/>
              </View>
            ) : (
              <View
                style={{
                  height: hp(70),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: hp(2)}}>
                  No Withdrawal transactions found
                </Text>
              </View>
            )}
          </>
        }
        removeClippedSubviews={true}
        contentContainerStyle={{paddingBottom: hp(10)}}
        renderItem={({item, index}: any) => {
          console.log(item.timestamp);
          const timestamp = new Date(item.timestamp);
          const formattedDate = `${('0' + (timestamp.getMonth() + 1)).slice(
            -2,
          )}-${('0' + timestamp.getDate()).slice(
            -2,
          )}-${timestamp.getFullYear()}`;

          return (
            <View
              style={{
                width: width,
                paddingTop: hp(0.75),
                paddingBottom: hp(2),
                backgroundColor: item.type == 'debit' ? '#F3ECEF' : '#E9F5F3',
                elevation: 3,
                marginBottom: hp(1),
              }}>
              <View style={{width: width, flexDirection: 'row'}}>
                <View
                  style={{
                    width: wp(100),
                    paddingLeft: wp(3),
                    paddingTop: hp(1),
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Profiles_setting_icons
                        name="profile"
                        style={styles.iconsStyls}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        S.no:
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: 'gray', fontSize: hp(2)}}>
                        {index + 1}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Calendar_icons
                        name="calendar-day"
                        style={styles.iconsStyls}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        Date and Time:
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: 'gray', fontSize: hp(2)}}>
                        {moment(item.timestamp).format('DD-MM-YYYY hh:mm a')}
                      </Text>
                    </View>
                  </View>

                  {/* <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Credit_icosn
                        name="credit-card"
                        style={styles.iconsStyls}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        Types:
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: 'gray',
                          textTransform: 'capitalize',
                          fontSize: hp(2),
                        }}>
                        {item?.type}
                      </Text>
                    </View>
                  </View> */}

                  {/* <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Credit_icosn
                        name="credit-card"
                        style={styles.iconsStyls}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        Remaining:
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: 'gray',
                          textTransform: 'capitalize',
                          fontSize: hp(2),
                        }}>
                        {item?.remainingBalance ? item?.remainingBalance.toFixed(2) :item?.remainingBalance }
                      </Text>
                    </View>
                  </View> */}


                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Money_icons name="money" style={styles.iconsStyls} />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        Amount:
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: 'gray', fontSize: hp(2)}}>
                        ₹ {item?.amount}
                      </Text>
                    </View>
                  </View>

                 

                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                    <Profiles_setting_icons
                        name="profile"
                        style={styles.iconsStyls}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        Status:
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: 'gray', fontSize: hp(2)}}>
                        ₹ {item?.status}
                      </Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.flexSTYLES}>
                      <Descriptyin_icosn
                        name="description"
                        style={styles.iconsStyls}
                      />
                      <Text
                        style={{
                          marginLeft: wp(2),
                          fontSize: hp(1.8),
                          color: 'black',
                          fontFamily: mainFontBold,
                        }}>
                        Description:
                      </Text>
                    </View>
                    <View style={{width: wp(50)}}>
                      <Text style={{color: 'gray', fontSize: hp(2)}}>
                        {item?.message}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    )}
      <AppointmentPagination currentPage={page}   totalPage={totalPages} onPageChange={handlePageChange} />
    </View>
  );
};

export default WithdrawalHistory;

const styles = StyleSheet.create({
  common_displayFlex: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  flexSTYLES: {
    flexDirection: 'row',
    width: wp(45),
  },
  iconsStyls: {
    color: '#1263AC',
    fontSize: hp(2.2),
    marginRight: wp(3),
    marginVertical: 4,
  },
  //
  statusIconSuccess: {
    color: 'green',
    fontSize: hp(2.5),
  },
  statusIconFailure: {
    color: 'red',
    fontSize: hp(2.5),
  },
  statusIconPending: {
    color: 'orange',
    fontSize: hp(2.5),
  },
});






