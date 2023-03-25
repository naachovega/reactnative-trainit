import { StyleSheet, SafeAreaView, Text, TextInput, View, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import SendChanges from '../../../Components/SendChanges';
import AuthContext from '../../../Context/index'
import GoBack from '../../../Components/GoBack';
import { Ionicons } from '@expo/vector-icons';


export default function CreateClass({ route, navigation }) {

    const interestsArray = ["Futbol", "Pilates", "Funcional", "Tenis", "Deportes", "Calistenia", "ESCUCHEN", "CORRAN LA BOLA", "JUEGAN EN", "FRANCIA PERO", "SON TODOS", "DE ANGOLA"]
    const [interests, setInterests] = useState([])
    const { user } = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [date, setDate] = useState(new Date())
    const [quota, setQuota] = useState('')
    const [locationClass, setLocationClass] = useState({})
    const [show, setShow] = useState(false)

    const [newClass, setNewClass] = useState({
        title: "",
        quota: 0,
        date: new Date(),
        location: {
            latitude: "",
            longitude: ""
        },
        admin: user.socialMediaId,
        tags: interests
    })

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return !show ? <SendChanges callback={sendChanges} /> : null
            },
            headerStyle: {
                opacity: !show ? 1 : 0.8,
                backgroundColor: '#5b8bd4aa',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerLeft: () => {
                return !show ? <GoBack /> : null
            },
            headerTitle: !show ? "" : "Select Location",
            headerTitleStyle: {
                fontFamily: 'Poppins-SemiBold',
                fontSize: 25,
                color: '#050A30'
            },
        })
    }, [newClass, show])

    const sendChanges = () => {

        const requestOptions = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newClass)
        };
        fetch(`http://192.168.0.87:3000/api/class`, requestOptions)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                setTimeout(() => {
                    alert(`${data.message}`)
                }, 300)
                navigation.goBack()
            })
            .catch(err => {
                console.log(err);
                alert("Error")
            })

    }

    const setChange = (event, value) => {
        const changed = value
        const changedDate = value.toLocaleDateString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })
        const changedTime = value.toLocaleTimeString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })
        setDate(changed)
        Object.assign(newClass, {
            date: {
                date: changedDate,
                time: changedTime
            }
        });
    }

    const changeText = (value) => {
        setTitle(value)
        Object.assign(newClass, { title: value });
    }

    const changeQuota = (value) => {
        setQuota(value)
        Object.assign(newClass, { quota: value });
    }

    const changeLocation = (value) => {
        setLocationClass(value)
        Object.assign(newClass, {
            location: {
                latitude: value.latitude,
                longitude: value.longitude
            }
        })
    }

    const changeTags = (value) => {
        const index = interests.indexOf(value)
        interests.includes(value) ? interests.splice(index, 1) : interests.push(value)
        setInterests([...interests])
        Object.assign(newClass, { tags: interests })
    }

    const removeTags = (value) => {
        const index = interests.indexOf(value)
        interests.includes(value) ? interests.splice(index, 1) : null
        setInterests([...interests])
        Object.assign(newClass, { tags: interests })
    }

    return (
        <SafeAreaView style={[styles.root, { opacity: !show ? 1 : 0.8 }]}>
            <Text style={styles.title}>Create Class</Text>
            <ScrollView>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Your class title here"}
                    value={title}
                    onChangeText={changeText}
                />
                <View>
                    <Text style={[styles.label, { marginTop: 20, marginBottom: '10%' }]}>Quota:</Text>
                    <TextInput
                        style={[styles.input, { width: '65%', position: 'absolute', right: 0, top: -10 }]}
                        placeholder={"Amount of athletes available"}
                        value={quota}
                        onChangeText={changeQuota}
                        keyboardType={'number-pad'}
                    />
                </View>
                <View>
                    <Text style={[styles.label]}>Date: </Text>
                    <Text
                        style={[{ width: '68%', position: 'absolute', right: 0, fontSize: 20, fontFamily: 'Poppins-Regular' }]}
                    >
                        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                    </Text>
                    <DateTimePicker
                        mode='datetime'
                        display='spinner'
                        minuteInterval={5}
                        value={date}
                        onChange={setChange}
                        minimumDate={new Date()}
                    />
                </View>
                <Text style={styles.label}>Location:</Text>
                <TouchableOpacity
                    onPress={() => {
                        setShow(!show)
                    }}
                >
                    <Text style={{ position: 'absolute', bottom: 0, fontFamily: 'Poppins-Regular', fontSize: 20, right: '30%', opacity: .5 }}>Select Location:</Text>
                </TouchableOpacity>
                <Modal
                    visible={show}
                    transparent={true}
                    animationType='slide'
                    collapsable={true}

                >
                    <View style={{
                        height: '100%',
                        width: '100%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                    }}>
                        <MapView
                            style={{ height: '70%', width: '95%', borderRadius: 15, alignSelf: 'center' }}
                            onPress={(direction) => {
                                changeLocation(direction.nativeEvent.coordinate)
                            }}
                        >
                            <Marker
                                coordinate={locationClass}
                                draggable={false}
                                pinColor="#050A30"
                            >
                            </Marker>
                        </MapView>
                        <TouchableOpacity onPress={() => {
                            setShow(false)
                        }}
                            style={{
                                backgroundColor: '#000C66',
                                width: '70%',
                                alignSelf: 'center',
                                borderRadius: 15,
                                margin: 10,
                            }}>
                            <Text style={{
                                padding: '5%',
                                color: 'white',
                                fontFamily: 'Poppins-SemiBold',
                                alignSelf: 'center',
                                fontSize: 18
                            }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={{ marginTop: '8%' }}>
                    <Text style={styles.label}>Tags Selected:</Text>
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
                                onPress={() => { removeTags(value) }}
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
                    <Text style={styles.label}>Tags:</Text>
                    <View style={styles.fullInterestView}>
                        {interestsArray.map(value => {
                            return <TouchableOpacity
                                style={
                                    {
                                        backgroundColor: !interests.includes(value) ? "#000C66cc" : 'grey',
                                        padding: 7,
                                        borderColor: "#000C66cc",
                                        borderWidth: 0.5,
                                        marginHorizontal: 4.5,
                                        marginBottom: 12,
                                        borderRadius: 15,
                                    }
                                }
                                onPress={() => { changeTags(value) }}
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
                </View>
            </ScrollView >
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#6495ED'
    },
    title: {
        fontSize: 40,
        fontFamily: 'Poppins-SemiBold',
        width: '95%',
        alignSelf: 'center',
        color: '#050A30',
    },
    label: {
        fontSize: 20,
        paddingLeft: '3%',
        color: '#050A30',
        fontFamily: 'Poppins-SemiBold',
    },
    input: {
        margin: '3%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        padding: 8,
        fontSize: 18,
        borderColor: '#000C66',
        color: '#050A30',
        backgroundColor: "#ebecf566",
        fontFamily: 'Poppins-Regular'
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
    interestView: {
        flexWrap: 'wrap',
        width: '98%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'left',
        margin: 5
    },
})