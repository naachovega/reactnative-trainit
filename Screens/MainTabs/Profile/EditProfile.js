import { View, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { useContext, useEffect } from 'react'
import AuthContext from '../../../Context/index'
import GoBack from '../../../Components/GoBack'
import { backgroundColor, primary } from '../../../Constants/colors'

export default function EditProfile({ navigation }) {

    const { user } = useContext(AuthContext)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerLeft: () => {
                return <GoBack />
            }
        })
    }, [])

    return (
        <SafeAreaView style={styles.root} >
            <Text style={styles.title}>Edit Profile</Text>
            <View style={{ marginBottom: 20, alignSelf: 'center', borderBottomWidth: .3, width: '95%', paddingBottom: 20, borderBottomColor: primary }}>
                <TouchableOpacity>
                    <Image
                        style={{
                            marginLeft: 10,
                            marginBottom: 10,
                            marginTop: 10,
                            width: 100,
                            height: 100,
                            borderRadius: "100%",
                            alignSelf: 'center',
                            borderColor: primary,
                            borderWidth: 0.35,
                            opacity: user.picture !== "" ? 1 : 0.8
                        }}
                        source={user.picture !== "" ? { uri: user.picture } : require('../../../assets/default-user-icon.jpg')}
                    />
                    <Text style={styles.pictureLabel}>Change profile picture</Text>
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <Text style={styles.label}>Bio:</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("EditBio")
                }}
                    style={{
                        position: 'absolute',
                        left: '35%',
                    }}>
                    <Text style={{
                        fontFamily: 'Poppins-Regular',
                        color: primary,
                        fontSize: 20,
                        opacity: .4,
                    }}>Edit bio</Text>
                </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>Interests:</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Interests")
                }}
                    style={{
                        position: 'absolute',
                        left: '35%',
                    }}>
                    <Text style={{
                        fontFamily: 'Poppins-Regular',
                        color: primary,
                        fontSize: 20,
                        opacity: .4,
                    }}>Edit Interests</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: backgroundColor
    },
    pictureLabel: {
        fontSize: 20,
        marginLeft: '3%',
        color: primary,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center'
    },
    label: {
        fontSize: 20,
        paddingLeft: '5%',
        color: primary,
        fontFamily: 'Poppins-SemiBold',
    },
    title: {
        fontSize: 40,
        fontFamily: 'Poppins-Bold',
        width: '95%',
        alignSelf: 'center',
        color: primary,
    },
})