import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantCardSecundaryProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}

export const PlantCardSecundary = ({ data, handleRemove, ...rest } : PlantCardSecundaryProps) => {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={styles.removeButton}
                            onPress={handleRemove}
                        >
                            <Feather
                                name="trash"
                                size={32}
                                color={colors.white}
                            />
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >
            <RectButton
                style={styles.container}
                { ...rest }
            >
                <SvgFromUri 
                    uri={data.photo}
                    width={50}
                    height={50}
                />

                <Text style={styles.text}>
                    { data.name }
                </Text>

                <View style={styles.details}>
                    <Text style={styles.timeLabel}>Water at</Text>
                    <Text style={styles.time}>{data.hour}</Text>
                </View>
            </RectButton>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5
    },
    text: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    removeButton: {
        width: 100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15
    }
});