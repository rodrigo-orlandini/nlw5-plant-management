import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { 
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';

import userImage from '../assets/rodrigo.jpg';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const Header = () => {

    const [username, setUsername] = useState<string>();

    useEffect(() => {
        const getStorageUsername = async () => {
            const user = await AsyncStorage.getItem("@plantmanager:user");
            setUsername(user || "");
        }

        getStorageUsername();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.username}>{ username }</Text>
            </View>

            <Image
                source={userImage}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    username: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    }
});