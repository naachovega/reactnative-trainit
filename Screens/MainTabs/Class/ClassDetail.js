import { SafeAreaView, StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../../Context/index'
import MapView, { Marker } from 'react-native-maps'
import UserCard from '../../../Components/UserCard'
import { Ionicons } from '@expo/vector-icons'
import { backgroundColor, primary, secondary } from '../../../Constants/colors'
export default function ClassDetail({ route, navigation }) {

    const { trainingClass } = route.params

    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState(false)
    const [isUserInClass, setIsUserInClass] = useState(false)
    const [condition, setCondition] = useState(false)
    const [users, setUsers] = useState([])
    const [currentClass, setCurrentClass] = useState(null)

    useEffect(() => {
        fetch(`http://192.168.0.87:3000/api/class/${trainingClass}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setCondition(data.admin === user.socialMediaId)
                    setIsUserInClass(data.users.includes(user.socialMediaId))
                    setCurrentClass(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                opacity: !showModal ? 1 : 0.8,
                backgroundColor: '#5b8bd4aa',
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },

        })
    }, [showModal])


    const actionButton = () => {
        const obj = {
            classId: trainingClass,
            socialMediaId: user.socialMediaId
        }
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj)
        };
        if (condition) {
            fetch(`http://192.168.0.87:3000/api/class/cancel`, requestOptions)
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data) {
                        navigation.goBack()
                        setTimeout(() => {
                            alert("Class succesfully cancelled")
                        }, 300)
                    }
                })
                .catch(err => {
                    console.log(err)
                    alert("error cancelando la clase")
                })
        } else {
            if (isUserInClass) {

                fetch(`http://192.168.0.87:3000/api/class/drop`, requestOptions)
                    .then(res => res.ok ? res.json() : null)
                    .then(data => {
                        if (data) {
                            navigation.goBack()
                            setTimeout(() => {
                                alert("dropped from class")
                            }, 300)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                fetch(`http://192.168.0.87:3000/api/class/add-user`, requestOptions)
                    .then(res => res.ok ? res.json() : null)
                    .then(data => {
                        if (data) {
                            navigation.goBack()
                            setTimeout(() => {
                                alert('Joined succesfully')
                            }, 300)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        alert("Error uniendose")
                    })
            }
        }
    }

    const openModal = () => {
        setShowModal(true)
    }

    const onOpenModal = () => {
        fetch(`http://192.168.0.87:3000/api/user/information/detail/${currentClass._id}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setUsers(data)
                    setShow(true)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <SafeAreaView style={[styles.root, { opacity: !showModal ? 1 : 0.8, }]}>
            <Text style={styles.title}>Class Detail</Text>
            {currentClass ?
                <>
                    <View style={styles.card}>
                        <Text style={styles.text}>{currentClass.title}</Text>
                        <Text style={styles.text}>{currentClass.date.date}</Text>
                        <TouchableOpacity onPress={openModal}>
                            <Text style={[styles.text, { fontFamily: 'Poppins-SemiBold' }]}>Athletes joined: {currentClass.quota - currentClass.users.length} / {currentClass.quota}</Text>
                        </TouchableOpacity>
                        <MapView
                            style={{
                                height: '80%',
                                width: '100%',
                            }}
                            region={{
                                latitude: currentClass.location.latitude,
                                longitude: currentClass.location.longitude,
                                longitudeDelta: 0.1,
                                latitudeDelta: 0.04
                            }}
                        >
                            <Marker
                                coordinate={currentClass.location}
                                pinColor={primary}
                            />
                        </MapView>
                    </View>
                    <Modal
                        visible={showModal}
                        transparent={true}
                        statusBarTranslucent={false}
                        animationType="slide"
                        onRequestClose={() => setShowModal(false)}
                        onShow={onOpenModal}
                    >
                        <View style={{
                            height: !show ? 180 : 470,
                            position: 'absolute',
                            top: '19.5%',
                            width: '95%',
                            alignSelf: 'center',
                            backgroundColor: '#021224',
                            borderRadius: 15,
                            padding: '3%',
                            borderWidth: 0.5,
                            borderColor: 'grey'
                        }}>
                            {!show ?

                                <ModalDetails text={"Loading Athletes..."} setShowModal={setShowModal} setShow={setShow} />
                                :
                                <>
                                    <ModalDetails text={"Athletes in this class"} setShowModal={setShowModal} setShow={setShow} />

                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {users.map((value) => {
                                            return <UserCard
                                                athlete={value}
                                                setShowModal={setShowModal}
                                                setShow={setShow}
                                                key={value.socialMediaId} />
                                        })}
                                    </ScrollView>
                                </>
                            }
                        </View>
                    </Modal>

                    <TouchableOpacity style={{
                        backgroundColor: currentClass.cancelled ? 'red' : '#000C66',
                        width: '70%',
                        alignSelf: 'center',
                        borderRadius: 15,
                        margin: 10,
                        position: 'absolute',
                        bottom: '3%'
                    }}
                        disabled={currentClass.cancelled ? true : false}
                        onPress={actionButton}>
                        <Text style={styles.cancelClass}>
                            {condition ?
                                !currentClass.cancelled
                                    ?
                                    "Cancel Class"
                                    :
                                    "Class cancelled"
                                :
                                isUserInClass
                                    ?
                                    "Dar de baja"
                                    :
                                    "Join Class"}

                        </Text>
                    </TouchableOpacity>
                </>
                :
                <Text style={styles.title}>Loading class...</Text>
            }
        </SafeAreaView >
    )
}

function ModalDetails(props) {
    return (
        <View style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }}>
            <Text style={[styles.title, { fontSize: 20, color: 'white', padding: '3%' }]}>{props.text}</Text>
            <TouchableOpacity
                onPress={() => {
                    props.setShowModal(false)
                    props.setShow(false)
                }}
            >
                <Ionicons name='close' size={28} color={'white'}
                    style={{ right: '50%', top: '3%', padding: '3%' }}
                />
            </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: backgroundColor
    },
    title: {
        fontSize: 40,
        fontFamily: 'Poppins-SemiBold',
        width: '95%',
        alignSelf: 'center',
        color: primary,

    },
    card: {
        marginTop: '5%',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: secondary,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        height: '50%'
    },
    text: {
        color: primary,
        fontFamily: 'Poppins-Regular',
        padding: '3%',
        fontSize: 20,
        alignSelf: 'center'
    },
    cancelClass: {
        padding: '5%',
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        fontSize: 18
    },
    join: {
    },
    cancel: {
        backgroundColor: 'red',
        width: '70%',
        alignSelf: 'center',
        borderRadius: 15,
        margin: 10,
    }
})