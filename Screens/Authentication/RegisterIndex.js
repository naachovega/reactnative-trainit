import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useContext } from 'react';
import AuthContext from '../../Context/index'

export default function Register() {

    const { user, setUser } = useContext(AuthContext)

    const interestsArray = ["Futbol", "Pilates", "Funcional", "Tenis", "Deportes", "Calistenia", "ESCUCHEN", "CORRAN LA BOLA", "JUEGAN EN", "FRANCIA PERO", "SON TODOS", "DE ANGOLA"]

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
            role: role,
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

        fetch(`http://192.168.0.87:3000/api/athlete/finalize-registration/`, requestOptions)
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
        <View style={styles.root}>
            <Text style={styles.title}>TRAIN IT</Text>
            {!sendrole ?
                <>
                    <Text style={styles.label}>What type of user will you be?</Text>
                    <Picker
                        style={{ marginLeft: 10, marginRight: 10 }}
                        selectedValue={role}
                        onValueChange={(itemValue, itemIndex) => {
                            setrole(itemValue)
                        }}
                    >
                        <Picker.Item label='Athlete' value='Athlete' />
                        <Picker.Item label='Coach' value='Coach' />
                    </Picker>

                    <View style={{ justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{
                            alignSelf: 'flex-end',
                            marginRight: 25,
                        }}
                            onPress={() => {
                                setsendrole(true)
                            }}
                        >
                            <Ionicons name='ios-arrow-forward-sharp' color={"#000C66cc"} size={28} />
                        </TouchableOpacity>
                    </View>
                </>
                :
                !sendName ?
                    <>
                        <Text style={styles.label}>First Name: </Text>
                        <TextInput
                            placeholderTextColor={"#000C66cc"}
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                            placeholder={"Your name here"}
                            keyboardType={'default'}
                        >
                        </TextInput>

                        <Text style={styles.label}>Last Name: </Text>
                        <TextInput
                            placeholderTextColor={"#000C66cc"}
                            value={lastName}
                            onChangeText={setlastName}
                            style={styles.input}
                            placeholder={"Your last name here"}
                            keyboardType={'default'}
                        >
                        </TextInput>


                        <View style={styles.arrows}>
                            <TouchableOpacity style={{
                                alignSelf: 'flex-start',
                                marginLeft: 25
                            }}
                                onPress={() => {
                                    setsendrole(false)
                                }} >
                                <Ionicons name='ios-arrow-back-sharp' color={"#000C66cc"} size={28} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                alignSelf: 'flex-end',
                                marginRight: 25,
                            }}
                                onPress={() => {
                                    setSendName(true)
                                    setSendlastName(true)
                                }}
                                disabled={!name || !lastName ? true : false} >
                                <Ionicons name='ios-arrow-forward-sharp' color={!name || !lastName ? "grey" : "#000C66cc"} size={28} />
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
                                    <Ionicons name='ios-arrow-back-sharp' color={"#000C66cc"} size={28} />
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    alignSelf: 'flex-end',
                                    marginRight: 25,
                                }}
                                    onPress={() => setsendDoB(true)}
                                    disabled={!name ? true : false} >
                                    <Ionicons name='ios-arrow-forward-sharp' color={!name ? "grey" : "#000C66cc"} size={28} />
                                </TouchableOpacity>
                            </View>
                        </>

                        :
                        !sendInterest

                            ?


                            <>
                                <Text style={styles.label}>Interests: <Text style={{ fontSize: 15, opacity: 0.6 }}>(optional)</Text></Text>
                                <Text style={{ fontSize: 15, opacity: 0.6, alignSelf: 'center', marginTop: 12, color: '#050A30' }}>This will help you find classes that are more suitable to you</Text>

                                {interests.length > 0
                                    ?
                                    <>
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
                                        {interestsArray.map(value => {
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
                                        })}
                                    </View>
                                    <View style={styles.arrows}>

                                        <TouchableOpacity style={{
                                            alignSelf: 'flex-start',
                                            marginLeft: 25
                                        }}
                                            onPress={() => {
                                                setsendDoB(false)
                                            }} >
                                            <Ionicons name='ios-arrow-back-sharp' color={"#000C66cc"} size={28} />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{
                                            alignSelf: 'flex-end',
                                            marginRight: 25,
                                            backgroundColor: "#000C66cc",
                                            borderRadius: 10,
                                        }}>
                                            <Button color={"lightgrey"} title="Finish" onPress={() => submitRegistration()} />
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
        flex: 1,
        backgroundColor: '#6495ED'
    },
    title: {
        fontSize: 45,
        margin: 10,
        color: "#050A30",
        marginTop: "30%",
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold'

    },
    label: {
        fontSize: 30,
        textAlign: 'left',
        alignSelf: 'center',
        width: '95%',
        marginBottom: -10,
        fontWeight: '500',
        color: '#050A30',
        fontFamily: 'Poppins-SemiBold'
    },
    input: {
        margin: 20,
        borderRadius: 10,
        borderWidth: 1,
        padding: 8,
        fontSize: 18,
        borderColor: '#000C66',
        color: '#050A30',
        backgroundColor: "#ebecf566",
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