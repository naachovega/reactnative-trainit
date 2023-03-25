import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AuthContext from '../../../Context/index'
import { useContext } from 'react'

export default function Home() {

    const { user } = useContext(AuthContext)
    return (
        <View style={style.root}>
            <Text style={style.title}>Welcome back, {user.name}!</Text>
            <Text style={style.subTitle}>New Activities</Text>
            <View style={style.viewStyle}>
                <TouchableOpacity style={style.card}
                    onPress={() => { console.log("navego a actividades") }}
                >
                </TouchableOpacity>
                <Text style={style.text}>Activity 1</Text>
            </View>
            <Text style={style.subTitle}>Near Gyms</Text>
            <View style={style.viewStyle}>
                <TouchableOpacity style={style.card}
                    onPress={() => { console.log("navego a gimnasios") }}
                >
                </TouchableOpacity>
                <Text style={style.text}>Gym 1</Text>
            </View>
            <Text style={style.subTitle}>Your daily routine</Text>
            <View style={style.viewStyle}>
                <TouchableOpacity style={style.card}
                    onPress={() => { console.log("navego a mi rutina") }}
                >
                </TouchableOpacity>
                <Text style={style.text}>My Daily Routine</Text>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        padding: '5%',
        backgroundColor: '#6495ED'
    },
    title: {
        marginBottom: '5%',
        fontSize: 28,
        fontFamily: 'Poppins-SemiBold'
    },
    subTitle: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
    },
    viewStyle: {
        marginBottom: '5%',
        width: '50%',
    },
    card: {
        backgroundColor: '#d3dbe6cc',
        margin: 10,
        height: 100,
        borderRadius: 30,
    },
    text: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center'
    }
})