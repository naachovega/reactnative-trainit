import { View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext } from 'react';
import AuthContext from '../../Context/index'
import host from '../../config';
import { actionButtonText, backgroundColor, inputBackground, placeholderTextColor, primary, secondary } from '../../Constants/colors';

export default function Register() {
    const { user, setUser } = useContext(AuthContext)
    const [interestsArray, setInterestsArray] = useState([])
    const [bkpArray, setBkpArray] = useState([])
    const [initialInterests, setInitialInterests] = useState([])

    const sendBday = () => {
        setsendDoB(true)
        fetch(`${host}/api/interests`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setInitialInterests(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const [interests, setInterests] = useState([])

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const [name, setName] = useState("")
    const [sendName, setSendName] = useState(false)
    const [lastName, setlastName] = useState("")
    const [sendlastName, setSendlastName] = useState(false)
    const [doB, setDoB] = useState(new Date())
    const [sendDoB, setsendDoB] = useState(false)
    const [sendInterest, setsendInterest] = useState(false)
    const [role, setrole] = useState("Athlete")
    const [sendrole, setsendrole] = useState(false)

    const setChange = (event, value) => {
        const changed = value
        setDoB(changed)
    }
    const submitRegistration = () => {
        // setUser(null)
        // throw Error("")
        const registration = {
            _id: user._id,
            name: name,
            lastName: lastName,
            birthdate: doB,
            interests: interests
        }
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(registration)
        };

        fetch(`${host}/api/athlete/finalize-registration/`, requestOptions)
            .then(res =>
                res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setUser(data[0])
                } else {
                    throw new Error("No se pudieron modifcar los datos del usuario. Intente nuevamente")
                }
            })
            .catch(err => {
                console.log(err);
            })

    }
    return (
        <View style={styles.root} onStartShouldSetResponder={() => Keyboard.dismiss()}>
            <Text style={styles.title}>TRAIN IT</Text>
            {!sendName ?
                <>
                    <Text style={styles.label}>First Name: </Text>
                    <TextInput
                        placeholderTextColor={primary}
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        placeholder={"Your name here"}
                        keyboardType={'default'}
                    >
                    </TextInput>

                    <Text style={styles.label}>Last Name: </Text>
                    <TextInput
                        placeholderTextColor={primary}
                        value={lastName}
                        onChangeText={setlastName}
                        style={styles.input}
                        placeholder={"Your last name here"}
                        keyboardType={'default'}
                    >
                    </TextInput>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{
                            alignSelf: 'flex-end',
                            marginRight: 25,
                        }}
                            onPress={() => {
                                setSendName(true)
                                setSendlastName(true)
                            }}
                            disabled={!name || !lastName ? true : false} >
                            <Ionicons name='ios-arrow-forward-sharp' color={primary} size={28} />
                        </TouchableOpacity>
                    </View>
                </>
                :

                !sendDoB
                    ?
                    <>
                        <Text style={styles.label}>Select your Birthdate:</Text>
                        <DateTimePicker
                            mode='date'
                            display='spinner'
                            style={{ marginTop: 20 }}
                            // maximumDate={new Date(`${year}-${month}-${day}`)}
                            value={doB}
                            onChange={setChange}
                        />

                        <View style={styles.arrows}>
                            <TouchableOpacity style={{
                                alignSelf: 'flex-start',
                                marginLeft: 25
                            }}
                                onPress={() => {
                                    setSendName(false)
                                    setSendlastName(false)
                                }} >
                                <Ionicons name='ios-arrow-back-sharp' color={primary} size={28} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                alignSelf: 'flex-end',
                                marginRight: 25,
                            }}
                                onPress={sendBday}
                                disabled={!name ? true : false} >
                                <Ionicons name='ios-arrow-forward-sharp' color={!name ? "grey" : primary} size={28} />
                            </TouchableOpacity>
                        </View>
                    </>

                    :
                    !sendInterest

                        ?


                        <>
                            <Text style={styles.label}>Interests: <Text style={{ fontSize: 15, opacity: 0.6 }}>(optional)</Text></Text>
                            <Text style={{ fontSize: 15, opacity: 0.6, alignSelf: 'center', marginTop: 12, color: primary }}>This will help you find classes that are more suitable to you</Text>

                            {interests.length > 0
                                ?
                                <>
                                    <View style={styles.interestView}>
                                        {interests.map(value => {
                                            return <TouchableOpacity
                                                style={
                                                    {
                                                        backgroundColor: secondary,
                                                        padding: 7,
                                                        borderColor: secondary,
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
                                                    color: placeholderTextColor
                                                }}>{value}</Text>
                                                <Ionicons style={{ paddingHorizontal: 2.5 }} name='close-sharp' color={actionButtonText} size={19} />
                                            </TouchableOpacity>
                                        })}

                                    </View>
                                </>
                                :
                                <Text style={styles.nullText}>
                                    Select your preferences. You can add up to 5 interests
                                </Text>
                            }
                            <ScrollView>
                                <View style={{
                                    flexWrap: 'wrap',
                                    width: '95%',
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'left',
                                    borderTopWidth: 1,
                                    borderTopColor: "#050A3033",
                                    paddingTop: 15,
                                    margin: 15,
                                }}>

                                    {initialInterests.length > 0
                                        ?
                                        initialInterests.map(value => {
                                            return <TouchableOpacity
                                                style={
                                                    {
                                                        backgroundColor: primary,
                                                        padding: 7,
                                                        borderColor: primary,
                                                        borderWidth: 0.5,
                                                        marginHorizontal: 4.5,
                                                        marginBottom: 12,
                                                        borderRadius: 15,
                                                    }
                                                }

                                                onPress={() => {
                                                    const index = interests.indexOf(value)
                                                    interests.includes(value) ? interests.splice(index, 1) : interests.push(value)
                                                    setInterests([...interests])
                                                }}

                                                key={value}
                                            >
                                                <Text style={{
                                                    fontSize: 18,
                                                    color: '#ebecf5',
                                                    fontFamily: 'Poppins-SemiBold'
                                                }}>{value}</Text>
                                            </TouchableOpacity>
                                        })
                                        :
                                        <></>
                                    }

                                </View>
                                <View style={styles.arrows}>

                                    <TouchableOpacity style={{
                                        alignSelf: 'flex-start',
                                        marginLeft: 25
                                    }}
                                        onPress={() => {
                                            setsendDoB(false)
                                        }} >
                                        <Ionicons name='ios-arrow-back-sharp' color={primary} size={28} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        alignSelf: 'flex-end',
                                        backgroundColor: primary,
                                        padding: 7,
                                        borderColor: primary,
                                        borderWidth: 0.5,
                                        marginHorizontal: 4.5,
                                        borderRadius: 15,
                                        marginRight: 15
                                    }}
                                        onPress={() => submitRegistration()}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: '#ebecf5',
                                            fontFamily: 'Poppins-SemiBold'
                                        }}>Finish</Text>
                                    </TouchableOpacity>

                                </View>
                            </ScrollView>

                        </>
                        :
                        <></>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        padding: '3%',
        backgroundColor: backgroundColor
    },
    title: {
        fontSize: 45,
        margin: 10,
        color: primary,
        marginTop: "30%",
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold'

    },
    label: {
        fontSize: 30,
        textAlign: 'left',
        width: '95%',
        marginBottom: '2%',
        fontWeight: '500',
        color: primary,
        fontFamily: 'Poppins-SemiBold'
    },
    input: {
        width: '100%',
        marginTop: '3%',
        marginBottom: '10%',
        borderRadius: 10,
        borderWidth: 0.7,
        padding: 15,
        fontSize: 18,
        borderColor: placeholderTextColor,
        color: primary,
        backgroundColor: inputBackground,
        fontFamily: 'Poppins-Regular'
    },
    arrows: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    interestView: {
        flexWrap: 'wrap',
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'left',
        margin: 5
    },
    nullText: {
        fontFamily: 'Poppins-SemiBold',
        width: '95%',
        alignSelf: 'center',
        fontSize: 18,
        color: '#ffffffcc',
        textAlign: 'center',
        paddingTop: 15,
        opacity: 0.8
    }

})