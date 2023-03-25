import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'

export default function UserCard({ athlete, setShowModal, setShow }) {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#000C66cc',
                margin: 10,
                padding: 15,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#ffffff44',

            }}
            onPress={() => {
                setShowModal(false)
                setShow(false)
                setTimeout(() => {
                    navigation.navigate("PersonalData", { socialMediaId: athlete.socialMediaId })
                }, 200)
            }}
        >
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={{
                        height: 65,
                        width: 65,
                        borderRadius: 50
                    }}
                    source={{ uri: athlete.picture }}
                />
                <Text style={{
                    position: 'absolute',
                    left: '28%',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 20,
                    color: 'white',
                    top: 15
                }}>{athlete.name}</Text>
                <Text style={{
                    position: 'absolute',
                    left: '55%',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 20,
                    top: 15,
                    color: 'white'
                }}>{athlete.lastName}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

})