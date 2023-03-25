import { View, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { useContext, useEffect } from 'react'
import AuthContext from '../../../Context/index'
import GoBack from '../../../Components/GoBack'

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
            <View style={{ marginBottom: 20, alignSelf: 'center', borderBottomWidth: .3, width: '95%', paddingBottom: 20 }}>
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
                            opacity: user.picture !== "" ? 1 : 0.8
                        }}
                        source={user.picture !== "" ? { uri: user.picture } : require('../../../assets/default-user-icon.jpg')}
                    />
                    <Text style={styles.pictureLabel}>Change profile picture</Text>
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>Bio:</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("EditBio")
                }}
                    style={{
                        position: 'absolute',
                        left: '25%',
                    }}>
                    <Text style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#050A30',
                        fontSize: 20,
                        opacity: .4,
                    }}>Change bio</Text>
                </TouchableOpacity>
                {/* 
                //TODO 
                <TouchableOpacity>
                    <Text>Change profile to coach (//Todo)</Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: "#6495ED"
    },
    pictureLabel: {
        fontSize: 20,
        marginLeft: '3%',
        fontWeight: '500',
        color: '#050A30',
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center'
    },
    label: {
        fontSize: 20,
        paddingLeft: '5%',
        color: '#050A30',
        fontFamily: 'Poppins-SemiBold',
    },
    title: {
        fontSize: 40,
        fontFamily: 'Poppins-SemiBold',
        width: '95%',
        alignSelf: 'center',
        color: '#050A30',
    },
})