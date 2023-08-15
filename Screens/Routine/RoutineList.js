import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { backgroundColor, primary } from '../../Constants/colors'
import React from 'react';
export default function RoutineList({ navigation }) {

    return <View style={style.root}>
        <Text style={style.title}>Your next routine</Text>

    </View>
}

const style = StyleSheet.create({
    root: {
        backgroundColor: backgroundColor,
        height: '100%',
        width: '100%',
        padding: '4%'
    },
    title: {
        color: primary,
        fontSize: 36,
        fontFamily: 'Poppins-Bold'
    },
    subTitle: {
        color: primary,
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
        marginTop: 10

    }
})