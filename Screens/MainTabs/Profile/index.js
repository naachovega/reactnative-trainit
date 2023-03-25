import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import AuthContext from '../../../Context/index'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


export default function Profile() {

    const { user, setUser } = useContext(AuthContext)

    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.datosBox}>
                <View style={styles.img}>
                    <TouchableOpacity>
                        <Image
                            style={{
                                display: 'flex',
                                alignContent: 'center',
                                marginBottom: 30,
                                marginTop: 30,
                                width: 150,
                                height: 150,
                                borderRadius: "100%",
                                opacity: user.picture !== "" ? 1 : 0.8
                            }}
                            source={user.picture !== "" ? { uri: user.picture } : require('../../../assets/default-user-icon.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}>{user.name} {user.lastName}</Text>
                </View>

                <View style={styles.infoBox}>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("PersonalData", { _id: user._id })
                        }}
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            paddingRight: 15,
                            paddingTop: 15,
                            paddingBottom: '15%',
                            paddingLeft: 5,
                            justifyContent: 'space-between',
                        }}>
                        <Text style={styles.textBox}>Personal data :</Text>
                        <Ionicons
                            name='ios-arrow-forward-sharp'
                            size={24}
                            color='#000C66cc'
                            style={{
                                alignSelf: 'flex-end'
                            }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Configuration")
                        }}
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            paddingRight: 15,
                            paddingTop: 15,
                            paddingBottom: '15%',
                            paddingLeft: 5,
                            justifyContent: 'space-between',
                        }}>
                        <Text style={styles.textBox}>Configuration :</Text>
                        <Ionicons
                            name='ios-arrow-forward-sharp'
                            size={24}
                            color='#000C66cc'
                            style={{
                                alignSelf: 'flex-end'
                            }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Interests")
                        }}
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            paddingRight: 15,
                            paddingTop: 15,
                            paddingBottom: '15%',
                            paddingLeft: 5,
                            justifyContent: 'space-between',
                        }}>
                        <Text style={styles.textBox}>Interests :</Text>
                        <Ionicons
                            name='ios-arrow-forward-sharp'
                            size={24}
                            color='#000C66cc'
                            style={{
                                alignSelf: 'flex-end'
                            }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setUser(null)}
                        style={{
                            flexDirection: 'row',
                            marginLeft: '3%',
                            marginRight: '3%',
                            paddingTop: 15,
                            borderTopWidth: 1,
                            borderTopColor: "#050A3033",
                            width: '100%',
                            bottom: '54%',
                            position: 'absolute'
                        }}>
                        <Ionicons
                            name='log-out-outline'
                            size={26} color='#ff0000cc'
                            style={{
                                paddingRight: 10,
                            }}
                        />
                        <Text style={{
                            color: '#ff0000cc',
                            fontSize: 21,
                            fontFamily: 'Poppins-SemiBold'
                        }}>Sign out</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: '#6495ED',
    },
    img: {
        paddingTop: 30,
        alignItems: 'center',
        width: '95%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    datosBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        marginTop: 2,
        marginBottom: 10,
        fontSize: 38,
        textAlign: 'center',
        color: '#050A30',
        fontFamily: 'Poppins-SemiBold'
    },
    email: {
        opacity: 0.5,
        fontSize: 16,
        color: "#050A30",
        fontFamily: 'Poppins-SemiBold'
    },
    infoBox: {
        marginTop: '20%',
        backgroundColor: '#d3dbe6cc',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        padding: 10
    },
    textBox: {
        alignSelf: 'flex-start',
        fontSize: 21.5,
        fontFamily: 'Poppins-BoldItalic',
        color: '#050a30',
    },
})