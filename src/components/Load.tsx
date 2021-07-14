import React from 'react';
import LottieView from 'lottie-react-native';
import {
    StyleSheet,
    View
} from 'react-native';

import loadAnimation from '../assets/load.json';

export const Load = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={loadAnimation}
                autoPlay={true}
                loop={true}
                style={styles.animation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200
    }
});