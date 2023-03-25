import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from 'react-native'
import { useContext, useState, useEffect, useCallback } from 'react'
import AuthContext from '../../../Context/index'
import ErrorPopUp from '../../../Components/ErrorPopUp';

export default function PersonalData({ route, navigation }) {

    const { user } = useContext(AuthContext)

    const _id = route.params._id;

    const [loggedUser, setLoggedUser] = useState(null)

    const [birthdate, setBirthdate] = useState(null)

    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [day, setDay] = useState()

    const [errMsg, setErrMsg] = useState(null)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch(`http://192.168.0.87:3000/api/user/information/${_id}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setTimeout(() => {
                        setLoggedUser(data)
                        const date = new Date(data.birthdate)
                        let bdayYear = date.getFullYear()
                        let bdayMonth = date.toLocaleString('default', { month: 'long' })
                        let bdayDay = date.getDate()

                        setYear(bdayYear)
                        setMonth(bdayMonth)
                        setDay(bdayDay)
                        setBirthdate(date)
                    }, 300)
                } else {
                    throw new Error()
                }
            })
            .catch(err => {
                setErrMsg("There was a problem getting the user information")
                setOpen(true)
            })
    }, [user])

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.title}>Personal data</Text>
            {loggedUser &&
                <View>
                    <View style={styles.datosBox}>
                        <View style={{
                            paddingLeft: '3%',
                            flexDirection: 'row',
                            width: '100%',
                            marginBottom: '5%',
                            marginTop: '5%'
                        }}>
                            <Image style={{
                                width: 100,
                                height: 100,
                                borderRadius: "100%",
                                opacity: user.picture !== "" ? 1 : 0.8
                            }}
                                source={user.picture !== "" ? { uri: user.picture } : require('../../../assets/default-user-icon.jpg')}
                            />
                            <View style={{
                                position: 'absolute',
                                right: '5%',
                                top: '10%',
                                justifyContent: 'flex-start',
                            }}>
                                {user._id === user._id ?
                                    <TouchableOpacity style={{
                                        backgroundColor: '#d3dbe6',
                                        padding: 10,
                                        borderRadius: 15
                                    }}
                                        onPress={() => {
                                            navigation.navigate("EditProfile")
                                        }}
                                    >
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 18, color: '#1929e0cc' }}>Edit profile</Text>
                                    </TouchableOpacity>
                                    :
                                    <></>
                                }
                            </View>
                        </View>
                        <View style={{ paddingLeft: '3%' }}>
                            <Text style={styles.bio}>{loggedUser.bio}</Text>
                            {loggedUser.interests.length > 0
                                ?
                                <>
                                    <Text style={styles.arrayLabel}>My Interests:</Text>
                                    <View style={styles.interestView}>
                                        {loggedUser.interests.map((value) => {
                                            return <TouchableOpacity disabled={true}
                                                style={{
                                                    backgroundColor: "#ebecf5cc",
                                                    padding: 10,
                                                    borderColor: "#ebecf5cc",
                                                    borderWidth: 0.5,
                                                    marginRight: 8,
                                                    marginBottom: 12,
                                                    borderRadius: 15,
                                                    alignSelf: 'center',
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                }}
                                                key={value}>
                                                <Text style={{
                                                    fontSize: 17,
                                                    fontFamily: 'Poppins-SemiBold',
                                                    color: '#000C66cc'
                                                }}>{value}</Text>
                                            </TouchableOpacity>
                                        })}
                                    </View>
                                </>
                                :
                                <></>
                            }
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.detailView}>
                                <Text style={styles.label}>First Name:</Text>
                                <Text style={styles.textBox}>{loggedUser.name}</Text>
                            </View>
                            <View style={styles.detailView}>
                                <Text style={styles.label}>Last Name:</Text>
                                <Text style={styles.textBox}>{loggedUser.lastName}</Text>
                            </View>
                            <View style={styles.detailView}>
                                <Text style={styles.label}>Birthdate:</Text>
                                <Text style={styles.textBox}> {!birthdate ? "Loading..." : `${day} / ${month} / ${year}`}</Text>
                            </View>
                            <View style={styles.detailView}>
                                <Text style={styles.label}>Email:</Text>
                                <Text style={styles.textBox}>{loggedUser.email}</Text>
                            </View>
                        </View>
                    </View >
                </View>
            }
            {open && <ErrorPopUp open={open} message={errMsg} />}

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: '#6495ED',
    },
    datosBox: {
        width: '100%',
        height: '100%',

    },
    textBox: {
        fontFamily: 'Poppins-Regular',
        position: 'absolute',
        left: '33%',
        color: '#050A30',
        fontSize: 20,
        padding: 10,
    },
    textBoxClass: {
        fontFamily: 'Poppins-Regular',
        position: 'absolute',
        left: '33%',
        color: '#050A30',
        fontSize: 20,
        padding: 10,
        opacity: 0.4
    },
    infoBox: {
        width: '100%',
        height: '100%',
        borderTopWidth: 0.5,
        borderTopColor: "#050A3033",
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
        padding: 10,
        color: '#050A30',
        fontFamily: 'Poppins-SemiBold',
    },
    bio: {
        fontFamily: 'Poppins-Regular',
        alignSelf: 'left',
        opacity: 0.5,
        fontSize: 14,
        width: '95%',
        marginBottom: '5%',
        color: '#050A30',

    },
    arrayText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        width: '95%',
        marginBottom: '-5%',

    },
    arrayLabel: {
        fontFamily: 'Poppins-SemiBoldItalic',
        fontSize: 18,
        marginBottom: '2%'
    },
    interestView: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginBottom: '5%'
    },
    detailView: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: "#050A3033",
    },
    errMsg: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: 'white'
    }
})