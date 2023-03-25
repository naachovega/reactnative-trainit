
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import AuthContext from '../../Context/index'
import GoBack from '../../Components/GoBack'
import SendChanges from '../../Components/SendChanges'


export default function Interests({ navigation }) {

    const [interestsArray, setInterestsArray] = useState([])
    const [interests, setInterests] = useState([])

    const [test, setTest] = useState([])

    const maxInterests = 5

    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://192.168.0.87:3000/api/interests`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setInterestsArray(data)
                }
            })
            .catch(err => {
                console.log(err)
            })

        const interestsBkp = user.interests.map((value) => value)
        setInterests(interestsBkp)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <SendChanges callback={sendChanges} />
            }
        })
    }, [interests])

    const sendChanges = () => {
        const newIntereses = {
            socialMediaId: user.socialMediaId,
            interests: interests
        }

        const requestOptions = {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newIntereses)
        };

        fetch(`http:/192.168.0.87:3000/api/user/edit-interests`, requestOptions)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setUser(data)
                    setTimeout(() => {
                        Alert.alert('Exito', 'Modificaste con exito tus intereses')
                    }, 300)
                    navigation.goBack()
                }
            })
            .catch(err => {
                console.log(err);
                Alert.alert(`Error`, `${err.message}`)

            })

    }

    return (
        <SafeAreaView style={styles.root}>
            <View>
                <Text style={{
                    fontSize: 40,
                    fontFamily: 'Poppins-SemiBold',
                    width: '95%',
                    alignSelf: 'center',
                    color: '#050A30',

                }}>Interests</Text>
                <Text style={{ fontSize: 18, color: interests.length >= 5 ? 'red' : 'black', position: 'absolute', right: '6%', bottom: '20%', fontFamily: 'Poppins-SemiBold' }}>({interests.length}/{maxInterests})</Text>
            </View>
            <Text style={styles.nullText}>
                Select your preferences. You can add up to 5 interests.
            </Text>

            {interests.length === 0 ?
                <></>
                :
                <View style={styles.interestView}>
                    {interests.map(value => {
                        return <TouchableOpacity
                            style={
                                {
                                    backgroundColor: "#ebecf5cc",
                                    padding: 7,
                                    borderColor: "#ebecf5cc",
                                    borderWidth: 0.5,
                                    marginHorizontal: 4.5,
                                    marginBottom: 12,
                                    borderRadius: 15,
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }
                            }
                            onPress={() => {
                                const index = interests.indexOf(value)
                                interests.includes(value) ? interests.splice(index, 1) : null
                                setInterests([...interests])
                            }}
                            key={value}
                        >
                            <Text style={{
                                fontSize: 17,
                                fontFamily: 'Poppins-SemiBold',
                                color: '#000C66cc'
                            }}>{value}</Text>
                            <Ionicons style={{ paddingHorizontal: 2.5 }} name='close-sharp' color={'black'} size={19} />
                        </TouchableOpacity>
                    })}

                </View>
            }
            <ScrollView style={{
                borderTopColor: '#050A3033',
                borderTopWidth: 1,
                width: '100%',
                paddingVertical: 15
            }}>
                <View style={styles.fullInterestView}>
                    {interestsArray.length === 0
                        ?
                        <></>
                        :
                        interestsArray.map(value => {
                            return <TouchableOpacity
                                style={
                                    {
                                        backgroundColor: "#000C66cc",
                                        padding: 7,
                                        borderColor: "#000C66cc",
                                        borderWidth: 0.5,
                                        marginHorizontal: 4.5,
                                        marginBottom: 12,
                                        borderRadius: 15,
                                    }
                                }
                                onPress={() => {
                                    if (interests.length >= 5) {
                                        Alert.alert("Alert", "You can only have 5 interests")
                                    } else {
                                        const index = interests.indexOf(value.Description)
                                        interests.includes(value.Description) ? interests.splice(index, 1) : interests.push(value.Description)
                                        setInterests([...interests])
                                    }
                                }}

                                key={value._id}
                            >
                                <Text style={{
                                    fontSize: 18,
                                    color: '#ebecf5',
                                    fontFamily: 'Poppins-SemiBold'
                                }}>{value.Description}</Text>
                            </TouchableOpacity>

                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: '#6495ED',
    },
    text: {
        fontFamily: 'Poppins-Regular',
        width: '95%',
        alignSelf: 'center',
        fontSize: 24
    },
    interestView: {
        flexWrap: 'wrap',
        width: '98%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'left',
        margin: 5
    },
    fullInterestView: {
        flexWrap: 'wrap',
        width: '98%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'left',
        flex: 0,
        margin: 15
    },
    nullText: {
        fontFamily: 'Poppins-Regular',
        width: '95%',
        alignSelf: 'center',
        fontSize: 19,
        color: '#ffffffcc',
        paddingBottom: 10,
    }
})