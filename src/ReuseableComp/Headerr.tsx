import { View, Text, Dimensions, Image, TouchableOpacity, StatusBar, Pressable, TextInput, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LanguageContext, LoginContext, UserDataContext } from '../../App';
import Modal from "react-native-modal";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { generateFilePath } from '../Services/url.service';
import Clipboard from '@react-native-clipboard/clipboard';
import { toastError, toastSuccess } from '../utils/toast.utils';
import { getUser } from '../Services/user.service';
import Back_Icons from "react-native-vector-icons/Ionicons"

const { height, width } = Dimensions.get('window')

const Headerr = (props: any) => {
    const mainFont = 'Montserrat-Regular'
    const mainFontBold = 'Montserrat-Bold'
    const navigation: any = useNavigation();
    const focused = useIsFocused();
    const [userData, setUserData] = useContext(UserDataContext)
    const [greeting, setGreeting] = useState('');
    const [paymentModal, setPaymentModal] = useState(false);

    const [amount, setAmount] = useState("");

    const handleGetProfile = async () => {
        try {
            let res = await getUser();
            if (res) {
                setUserData(res)
            }
        } catch (error) {
            toastError(error)
        }
    }


    useEffect(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        let message = '';
        if (currentHour >= 3 && currentHour < 12) {
            message = 'Good Morning';
        } else if (currentHour >= 12 && currentHour < 17) {
            message = 'Good Afternoon';
        } else {
            message = 'Good Evening';
        }
        setGreeting(message);
    }, []);


    useEffect(() => {
        if (focused) {
            handleGetProfile()
        }
    }, [focused])


    const handleServiceBooking = () => {
        navigation.navigate('BookService', { serviceId: props.serviceId })
    }


    const HandleAddAmountToWallet = async () => {
        try {

            let tempAmount = parseInt(`${amount}`) || 0
            if (tempAmount && tempAmount <= 10) {
                toastError("Amount should be more than 10 rupees !!!")
                return
            }
            setPaymentModal(false);
            navigation.navigate("PayementScreen", { amount: tempAmount })
        }
        catch (error) {
            toastError(error)
        }
    }
    return (
        <View style={{ width: width, backgroundColor: '#1263AC', alignItems: 'center', }}>
            <StatusBar backgroundColor="#1263AC" />

            {props.user && props.height &&
                <View style={{ width: width, flexDirection: 'row', paddingLeft: wp(2), paddingRight: wp(3), alignItems: 'center', height: hp(10), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Pressable onPress={() => navigation.navigate("Profile")}>
                            <Image source={userData.image ? { uri: generateFilePath(userData.image) } : require('../../assets/images/profile.png')}
                                style={{ height: wp(15), width: wp(15),  resizeMode: 'center', borderRadius: wp(30),backgroundColor:"#eee" }} />
                        </Pressable>
                        <View style={{ marginLeft: wp(2), height: wp(15), justifyContent: 'flex-end', flexDirection: "column", paddingBottom: 5 }}>
                            <Text style={{ color: 'white', fontSize: hp(1.8), fontFamily: mainFont }}>{greeting}</Text>
                            <Text style={{ color: 'white', fontSize: hp(2), fontFamily: mainFontBold, textTransform: "capitalize" }}>Hello {userData?.name}</Text>
                        </View>
                    </View>
                </View>
            }
            {props.secndheader &&
                <View style={{ width: width, height: hp(8), flexDirection: 'row', paddingRight: wp(3), paddingLeft: wp(2), alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: wp(3) }}>
                            <Back_Icons name='chevron-back-outline' style={{ fontSize: wp(8), color: "#fff" }} />
                        </TouchableOpacity>
                        <View>
                            {
                                props.label === "Appointment" || props.label === "Book Category" || props.label === "Transactions" ? <View>
                                    {
                                        props.btn && <TouchableOpacity
                                            onPress={() => {
                                                { props.btnlbl == "Book Service" ? handleServiceBooking() : (props.btnlbl == "Book Appointment" ? navigation.navigate("BookAppt") : console.log("else clicked")) }
                                            }}
                                            style={{ paddingHorizontal: 10, height: hp(4.5), backgroundColor: 'white', borderRadius: wp(1), alignItems: 'center', justifyContent: 'center', elevation: 2 }}>
                                            <Text style={{ fontSize: hp(1.6), color: 'black', fontFamily: mainFont }}>{props.btnlbl ? props.btnlbl : ""}</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                                    : <Text style={{ fontSize: hp(1.9), color: 'white', fontFamily: mainFontBold, marginLeft: wp(5) }}>{props.label ? props.label : ""}</Text>
                            }
                        </View>
                    </View>

                    {
                        props.referalCode &&
                        <Pressable onPress={() => {
                            Clipboard.setString(props.referalCode);
                            toastSuccess("coppied to clipboard !!!")
                        }
                        }>
                            <Text style={{ fontSize: hp(1.6), fontFamily: mainFont, color: "white" }}>Referal code : {props.referalCode}</Text>
                        </Pressable>
                    }
                    {
                        props.secondText &&
                        <Pressable onPress={() => setPaymentModal(true)}>
                            <Text style={{ fontSize: hp(1.6), fontFamily: mainFont, color: "white" }}>{props.secondText}</Text>
                        </Pressable>
                    }
                </View>
            }




            <Modal
                isVisible={paymentModal}
                animationIn={'bounceIn'}
                animationOut={'slideOutDown'}
                onBackButtonPress={() => setPaymentModal(false)}
                style={{ marginLeft: 0, marginRight: 0 }}
            >
                <View style={{ width: wp(85), paddingTop: hp(3), paddingBottom: hp(3), backgroundColor: 'white', alignSelf: 'center', borderRadius: 5, paddingLeft: wp(4), paddingRight: wp(4) }}>
                    <TouchableOpacity
                        onPress={() => setPaymentModal(false)}
                        style={{ alignSelf: 'flex-end' }}>
                        <Image source={require('../../assets/images/close.png')}
                            style={{ tintColor: 'black', height: wp(5), width: wp(5) }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, color: 'black', fontFamily: mainFont, fontWeight: "bold" }}>Add Wallet Amount</Text>

                    <TextInput placeholder='Amount' keyboardType='number-pad' style={{ marginTop: 15, color: 'gray', backgroundColor: "#e6edf7" }} onChangeText={(e: any) => setAmount(e)} value={`${amount}`} placeholderTextColor="gray" />
                    <TouchableOpacity onPress={() => HandleAddAmountToWallet()} style={{ minWidth: wp(80), height: 42, marginTop: 15, alignSelf: "center", backgroundColor: '#1263AC', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontFamily: mainFont, fontSize: hp(1.8) }}>Add now</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default Headerr