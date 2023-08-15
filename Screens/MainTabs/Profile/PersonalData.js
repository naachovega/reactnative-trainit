import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, RefreshControl } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../../../Context/index'
import ErrorPopUp from '../../../Components/ErrorPopUp';
import host from '../../../config';
import { backgroundColor, primary, secondary, actionButton, actionButtonText } from '../../../Constants/colors';

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

    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetch(`${host}/api/user/information/${_id}`)
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

    const onRefresh = () => {
        setOpen(false)

        setRefreshing(true)
        setTimeout(() => {
            fetch(`${host}/api/user/information/${_id}`)
                .then(res => res.status === 200 ? res.json() : null)
                .then(data => {
                    if (data) {
                        setLoggedUser(data)
                        setRefreshing(false)
                    } else {
                        throw Error("There was a problem loading the user info")
                    }
                })
                .catch(err => {
                    setErrMsg("There was a problem loading the user info. Please try again later")
                    setRefreshing(false)
                    setOpen(true)
                    console.log(err);
                })
        }, 300)
    }

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView
                scrollEnabled={true}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            >
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
                                    borderColor: primary,
                                    borderWidth: 0.35,
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
                                            backgroundColor: actionButton,
                                            padding: 10,
                                            borderRadius: 15
                                        }}
                                            onPress={() => {
                                                navigation.navigate("EditProfile")
                                            }}
                                        >
                                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: primary }}>Edit profile</Text>
                                        </TouchableOpacity>
                                        :
                                        <></>
                                    }
                                </View>
                            </View>
                            <View style={{ paddingLeft: '3%' }}>
                                <Text style={loggedUser.bio !== "" ? styles.bio : { position: 'absolute' }}>{loggedUser.bio}</Text>
                                {loggedUser.interests.length > 0
                                    ?
                                    <>
                                        <Text style={styles.arrayLabel}>My Interests:</Text>
                                        <View style={styles.interestView}>
                                            {loggedUser.interests.map((value) => {
                                                return <TouchableOpacity disabled={true}
                                                    style={{
                                                        backgroundColor: actionButton,
                                                        padding: 10,
                                                        borderColor: actionButton,
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
                                                        fontSize: 16,
                                                        fontFamily: 'Poppins-SemiBold',
                                                        color: primary
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

            </ScrollView>
            {open && <ErrorPopUp open={open} message={errMsg} />}
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: backgroundColor
    },
    datosBox: {
        width: '100%',
        height: '100%',

    },
    textBox: {
        fontFamily: 'Poppins-Regular',
        position: 'absolute',
        left: '33%',
        color: primary,
        fontSize: 20,
        padding: 10,
    },
    textBoxClass: {
        fontFamily: 'Poppins-Regular',
        position: 'absolute',
        left: '33%',
        color: primary,
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
        fontFamily: 'Poppins-Bold',
        width: '95%',
        alignSelf: 'center',
        color: primary,
    },
    label: {
        fontSize: 20,
        padding: 10,
        color: primary,
        fontFamily: 'Poppins-SemiBold',
    },
    bio: {
        fontFamily: 'Poppins-Regular',
        alignSelf: 'left',
        opacity: 0.5,
        fontSize: 14,
        width: '95%',
        marginBottom: '5%',
        color: primary,

    },
    arrayText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        width: '95%',
        marginBottom: '-5%',

    },
    arrayLabel: {
        fontFamily: 'Poppins-SemiBoldItalic',
        fontSize: 24,
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