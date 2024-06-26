import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Remmove_icons from 'react-native-vector-icons/AntDesign';
import axios from '../Services/axios.service';
import { useNavigation } from '@react-navigation/native';
import url from '../Services/url.service';
import { toastError, toastSuccess } from '../utils/toast.utils';

import AlertBox from './AlertBox';

const mainFont = 'Montserrat-Regular';
const mainFontBold = 'Montserrat-Bold';
const mainFontmedium = 'Montserrat-Medium';
const maincolor = '#1263AC';
const PreView = ({ objectData, clodeBtn, images }) => {
    const sending = "Sending.....";

    console.log('preview data',objectData.medicine)

    const navigation = useNavigation();
    const [loding, setLoding] = useState(false);


    const getBase64Size = (base64String) => {
        if(base64String && base64String.length){
        let padding, inBytes, base64StringLength;
        
        if ( base64String && base64String.endsWith('==')) padding = 2;
        else if (base64String && base64String.endsWith('=')) padding = 1;
        else padding = 0;
      
        base64StringLength = base64String.length;
        inBytes = (base64StringLength / 4) * 3 - padding;
        return inBytes / (1024 * 1024); // size in MB
        }
      };


      const [alertVisible, setAlertVisible] = useState(false);

      const showAlert = () => {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3300); // Extra 300ms to account for the sliding out animation
      };

    const handleSubmit = async () => {
        setLoding(true);
        try {
            console.log( `${url}/prescriptions/forApp`);
            console.log('in view preview prescription',objectData);

            const imageSize = getBase64Size(objectData.image); // Assuming image is a property in objectData
            console.log(`Image size: ${imageSize} MB`);

            const respons = await axios.post(`${url}/prescriptions/forApp`, objectData,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Accept': 'Application/json'
                  },
            });
            console.log('prescription for app response is here',respons)
            if (respons.status === 200) {
                clodeBtn();
                navigation.navigate('Appointment');
                setLoding(false);
                toastSuccess(respons.data.message);
            }
            else {
                toastError(respons.data.message)
                setLoding(false);
            }
        } catch (err) {
            console.log(err);
            alert(err.message)
            // toastError(err.message)
            setLoding(false);
        }
    }
    return (
        <View style={styles.mainView}>
            <View>
                {loding ? <Text style={{ fontSize: hp(2.8), color: "gray", textAlign: "center", backgroundColor: "#fff", padding: hp(3), borderRadius: 5, }}>Uploading....</Text> :
                    <View style={styles.sunView}>
                        <View style={styles.dflex}>
                            <Text style={styles.priViewTexyt}>Preview</Text>

                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: hp(1.5) }}>
                            {images ? null :
                                <View>
                                    <View style={styles.d_flex2}>
                                        <Text style={[styles.textStle, { width: "37%" }]}>Symptoms:</Text>
                                        <Text style={[styles.textStle, { fontFamily: mainFont }]}>{objectData && objectData.symptoms ? objectData.symptoms : ''}</Text>
                                    </View>
                                    <View style={styles.d_flex2}>
                                        <Text style={[styles.textStle, { width: "37%" }]}>Diagnosis : </Text>
                                        <Text style={[styles.textStle, { fontFamily: mainFont }]}>{objectData && objectData.diagnosis ? objectData.diagnosis  : ''}</Text>
                                    </View>
                                    <View style={styles.d_flex2}>
                                        <Text style={[styles.textStle, { width: "37%" }]}>*Drug Allergy:</Text>
                                        <Text style={[styles.textStle, { fontFamily: mainFont }]}>{objectData && objectData.drugAllergy ? objectData.drugAllergy : ''}</Text>
                                    </View>
                                    <View style={styles.d_flex2}>
                                        <Text style={[styles.textStle, { width: "37%" }]}>*Past History:</Text>
                                        <Text style={[styles.textStle, { fontFamily: mainFont }]}>{objectData && objectData.pastHistory ? objectData.pastHistory : ''}</Text>
                                    </View>
                                    <View style={styles.d_flex2}>
                                        <Text style={[styles.textStle, { width: "37%" }]}>Personal History:</Text>
                                        <Text style={[styles.textStle, { fontFamily: mainFont }]}>{objectData && objectData.personalHistory ? objectData.personalHistory : ''}</Text>
                                    </View>
                                    <View style={styles.d_flex2}>
                                        <Text style={[styles.textStle, { width: "37%" }]}>Surgical History:</Text>
                                        <Text style={[styles.textStle, { fontFamily: mainFont }]}>{objectData && objectData.surgicalHistory ? objectData.surgicalHistory: ''}</Text>
                                    </View>
                                    <Text style={styles.medicineText}>Medicine</Text>
                                    <View>
                                        {
                                            objectData && objectData.medicine && objectData.medicine.length >0   && objectData.medicine[0].name  && objectData.medicine.map((itms, index) => {
                                                return <>
                                                    <Text style={{ fontSize: hp(1.8), fontFamily: mainFontBold, marginLeft: wp(1) }}>{index + 1}</Text>
                                                    <View style={styles.mainViewMap}>

                                                        <View style={styles.d_flex2}>
                                                            <Text style={[styles.textStle, { width: "37%" }]}>Medicine Name:</Text>
                                                            <Text style={[styles.textStle, { fontFamily: mainFont }]}>{itms.name}</Text>
                                                        </View>
                                                        <View style={styles.d_flex2}>
                                                            <Text style={[styles.textStle, { width: "37%" }]}>Combination:</Text>
                                                            <Text style={[styles.textStle, { fontFamily: mainFont }]}>{itms.combination}</Text>
                                                        </View>
                                                        <View style={styles.d_flex2}>
                                                            <Text style={[styles.textStle, { width: "37%" }]}>Dose Form:</Text>
                                                            <Text style={[styles.textStle, { fontFamily: mainFont }]}>{itms.duration_count} {itms.dose_form}</Text>
                                                        </View>
                                                        <View style={styles.d_flex2}>
                                                            <Text style={[styles.textStle, { width: "37%" }]}>Dose:</Text>
                                                            <Text style={[styles.textStle, { fontFamily: mainFont }]}>{itms.doses}</Text>
                                                        </View>
                                                        <View style={styles.d_flex2}>
                                                            <Text style={[styles.textStle, { width: "37%" }]}>ROA</Text>
                                                            <Text style={[styles.textStle, { fontFamily: mainFont }]}>{itms.roa}</Text>
                                                        </View>
                                                        <View style={styles.d_flex2}>
                                                            <Text style={[styles.textStle, { width: "37%" }]}>Frequency:</Text>
                                                            <Text style={[styles.textStle, { fontFamily: mainFont }]}>{itms.frequency}</Text>
                                                        </View>
                                                        <View style={styles.d_flex2}>
                                                            <Text style={[styles.textStle, { width: "37%" }]}>Duration:</Text>
                                                            <Text style={[styles.textStle, { fontFamily: mainFont }]}>{itms.note} {itms.duration}</Text>
                                                        </View>
                                                    </View>
                                                </>
                                            })
                                        }

                                    </View>
                                </View>
                            }
                            <View>
                                {images && (
                                    <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                        <Image
                                            source={{ uri: images }}
                                            style={{ height: hp(50), width: wp(80) }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                )}
                            </View>
                            <View style={[styles.dflex, { marginTop: hp(5) }]}>
                                <TouchableOpacity style={[styles.bothBtn, { backgroundColor: "#000" }]} onPress={() => clodeBtn()}>
                                    <Text style={styles.bothText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.bothBtn} onPress={() => handleSubmit()}>
                                    <Text style={styles.bothText}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                }
            </View>
        </View>
    )
}

export default PreView;

const styles = StyleSheet.create({
    mainView: {
        height: hp(100),
        width: wp(100),
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sunView: {
        width: wp(95),
        maxHeight: hp(89),
        backgroundColor: '#fff',
        alignSelf: 'center',
        paddingHorizontal: wp(3),
        paddingVertical: hp(2),
        borderRadius: 5,
    },
    dflex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    },
    d_flex2: {
        flexDirection: "row",
    },
    priViewTexyt: {
        fontSize: hp(2.5),
        fontFamily: mainFontBold
    },

    closeIcons: {
        fontSize: hp(4),
        textAlign: 'right',
        backgroundColor: '#fff',
        color: 'red',
        borderRadius: wp(40),
    },
    medicineView: {

    },
    textStle: {
        fontSize: hp(2),
        fontFamily: mainFontmedium,
    },
    bothBtn: {
        width: wp(40),
        height: hp(5),
        backgroundColor: '#50B148',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bothText: {
        fontSize: hp(2),
        color: "#fff",
    },
    medicineText: {
        fontSize: hp(2.5),
        fontFamily: mainFontBold,
        marginTop: hp(1.5)
    },
    mainViewMap: {
        marginBottom: hp(1.5),
        borderWidth: 1.5,
        borderColor: "gray",
        padding: wp(1.5),
        borderRadius: 5,
    }

});