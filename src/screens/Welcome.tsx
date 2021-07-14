import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { 
    Text, 
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    View
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import watering from '../assets/watering.png'

export const Welcome = () => {

    const navigation = useNavigation();

    const handleStart = () => {
        navigation.navigate("UserIdentification");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Manage {'\n'} 
                    your plants {'\n'}
                    in the best way
                </Text>
                <Image 
                    style={styles.image} 
                    source={watering} 
                    resizeMode="contain"
                />
                <Text style={styles.subtitle}>Don't forget to water your plants anymore. We'll remember whenever you need it.</Text>
                
                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.8}
                    onPress={handleStart}
                >
                    <Feather name="chevron-right" style={styles.buttonIcon}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    title: {
        fontFamily: fonts.heading,
        lineHeight: 34,
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    buttonIcon: {
        fontSize: 28,
        color: colors.white
    }
});