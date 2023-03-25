import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'


export default function CardClass({ uniqueClass }) {

    const navigation = useNavigation()

    const lugarDisponible = uniqueClass.quota !== uniqueClass.users.length

    return (
        <View style={{ width: '95%', justifyContent: 'center', alignSelf: 'center' }}>
            <TouchableOpacity style={{
                backgroundColor: '#d3dbe6',
                marginTop: '4%',
                width: '50%',
                height: 250,
                borderBottomStartRadius: 15,
                borderTopStartRadius: 15,
                padding: '3%',
                marginBottom: '4%'
            }}
                disabled={false}
                onPress={() => {
                    navigation.navigate('ClassDetail', { trainingClass: uniqueClass._id });
                }}>

                <Text style={styles.text}>{uniqueClass.title}</Text>
                <Text style={styles.text}>{uniqueClass.date.date}</Text>
                <Text style={{
                    color: lugarDisponible ? '#000C66cc' : 'red',
                    fontFamily: 'Poppins-SemiBold',
                    padding: '2%',
                    fontSize: 23,

                }}>
                    {lugarDisponible ? "Join Class" : "Class full"}
                </Text>
                <Text style={[styles.text, { opacity: 0.8, position: 'absolute', bottom: '5%', alignSelf: 'center' }]}>View Details</Text>
            </TouchableOpacity>
            <MapView
                style={{
                    height: 250,
                    width: '50%',
                    position: 'absolute',
                    right: 0,
                }}
                scrollEnabled={true}
                zoomEnabled={true}
                moveOnMarkerPress={false}
                initialRegion={{
                    latitude: uniqueClass.location.latitude,
                    longitude: uniqueClass.location.longitude,
                    longitudeDelta: 0.1,
                    latitudeDelta: 0.025
                }}
            >
                <Marker
                    coordinate={uniqueClass.location}
                    pinColor="#050A30"

                />
            </MapView>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        color: '#000C66cc',
        fontFamily: 'Poppins-SemiBold',
        padding: '2%',
        fontSize: 23,
    }
})