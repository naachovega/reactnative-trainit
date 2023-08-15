import { View, Text, StyleSheet } from 'react-native'
import { backgroundColor } from '../../../Constants/colors'


export default function Gym({ route }) {

    const item = route.params.item

    return <View style={styles.root}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.price}</Text>
        <Text>Carousel con las fotos del gimnasio</Text>
        <Text>Mapa mostrando la ubicacion del gimnasio</Text>
        <Text>Horarios del gimnasio</Text>
        <Text>Disatncia y direccion</Text>
        <Text>Actividades </Text>
    </View>
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: backgroundColor,
        padding: '5%'
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,

    }
})
