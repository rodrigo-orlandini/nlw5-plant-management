import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { formatDistance } from "date-fns";
import { pt } from 'date-fns/locale';
import { 
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Alert
} from "react-native";

import { Header } from "../components/Header";
import { PlantCardSecundary } from "../components/PlantCardSecundary";
import { Load } from "../components/Load";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { loadPlant, PlantProps, removePlant } from "../libs/storage";

import waterdrop from '../assets/waterdrop.png';

export const MyPlants = () => {

    const navigation = useNavigation();

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    const handleRemove = async (plant: PlantProps) => {
        Alert.alert("Remove", `Are you sure want to remove the ${plant.name}?`, [
            {
                text: "No 🙏",
                style: 'cancel'
            },
            {
                text: "Yes 👍",
                onPress: async () => {
                    try {
                        await removePlant(plant.id);

                        setMyPlants(oldData => (
                            oldData.filter((item) => item.id !== plant.id)
                        ));
                    } catch (error) {
                        Alert.alert("Could not remove plant. 😢");
                    }
                }
            }
        ]);
    }

    useEffect(() => {
        const loadStoragedData = async () => {
            const plantsStoraged = await loadPlant();
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWatered(`Don't forget to water the ${plantsStoraged[0].name} at ${nextTime}.`);
            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStoragedData();
    }, []);

    if(loading) {
        <Load />
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>{nextWatered}</Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>Next watered</Text>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardSecundary
                            data={item}
                            handleRemove={() => handleRemove(item)}
                        />
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
});