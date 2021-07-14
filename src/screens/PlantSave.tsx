import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from "date-fns";
import {
    View,
    Text,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';

import { Button } from "../components/Button";
import waterdrop from '../assets/waterdrop.png';
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { PlantProps, savePlant } from "../libs/storage";

interface Params {
    plant: PlantProps;
}

export const PlantSave = () => {
    
    const navigation = useNavigation();
    const route = useRoute();
    const { plant } = route.params as Params; 

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const handleSave = async () => {

        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate("Confirmation", {
                title: "Alright!",
                subtitle: "Don't worry, we'll always remember you to take care of your plants with a lot carefully.",
                buttonTitle: "Thanks :D",
                icon: "hug",
                nextScreen: "MyPlants"
            });
        } catch {
            Alert.alert("Could not save plant. 😢");
        }
    }

    const handleChangeTime = (event: Event, datetime: Date | undefined) => {
        if(Platform.OS === "android"){
            setShowDatePicker(oldState => !oldState);
        }

        if(datetime && isBefore(datetime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert("Choose a future moment. 🕗");
        }

        if(datetime){
            setSelectedDateTime(datetime);
        }
    }

    const handleOpenDateTimePickerAndroid = () => {
        setShowDatePicker(oldState => !oldState);
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />

                    <Text style={styles.plantName}>{plant.name}</Text>
                    <Text style={styles.plantAbout}>{plant.about}</Text>
                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />

                        <Text style={styles.tipText}>{plant.water_tips}</Text>
                    </View>

                    <Text style={styles.alertLabel}>Choose the best time to notify you:</Text>

                    { showDatePicker && (
                        <DateTimePicker
                            value={selectedDateTime}
                            mode="time"
                            display="spinner"
                            onChange={handleChangeTime}
                        />
                    )}

                    { Platform.OS === 'android' && (
                        <TouchableOpacity 
                            style={styles.dateButton}
                            onPress={handleOpenDateTimePickerAndroid}    
                        >
                            <Text style={styles.dateText}>{`Mudar ${format(selectedDateTime, 'HH:mm')}`}</Text>
                        </TouchableOpacity>
                    )}

                    <Button
                        title="Cadastrar planta"
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    controller: {
        backgroundColor: colors.white,
        padding: 20,
        paddingBottom: getBottomSpace() || 20 
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },
    dateText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
});