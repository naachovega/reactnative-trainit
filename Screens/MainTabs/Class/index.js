import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import { useState, useContext, useEffect, useCallback } from 'react'
import CardClass from '../../../Components/ClassCard'
import AuthContext from '../../../Context/index'
import { Ionicons } from '@expo/vector-icons'
import ErrorPopUp from '../../../Components/ErrorPopUp'
import { backgroundColor, primary } from '../../../Constants/colors'

export default function Class({ navigation }) {

    const { user } = useContext(AuthContext)
    const [classes, setClasses] = useState([])

    const [refreshing, setRefreshing] = useState(true)
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')


    useEffect(() => {
        setTimeout(() => {
            fetch(`http://192.168.0.87:3000/api/class`)
                .then(res => res.status === 200 ? res.json() : null)
                .then(data => {
                    if (data) {
                        setClasses([])
                        setClasses(data)
                        setRefreshing(false)
                    } else {
                        throw Error("There was a problem showing the classes")
                    }
                })
                .catch(err => {
                    setMsg(err.message)
                    setRefreshing(false)
                    setOpen(true)
                    console.log(err);
                })
        }, 300)
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            fetch(`http://192.168.0.87:3000/api/class`)
                .then(res => res.status === 200 ? res.json() : null)
                .then(data => {
                    if (data) {
                        setClasses([])
                        setClasses(data)
                        setRefreshing(false)
                    } else {
                        throw Error("There was a problem showing the classes")
                    }
                })
                .catch(err => {
                    setMsg(err.message)
                    setRefreshing(false)
                    setOpen(true)
                    console.log(err);
                })
        }, 300)
    }

    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.title}>Clases</Text>
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            >
                {classes.length > 0
                    ?
                    classes.map((value) => {
                        return <CardClass
                            uniqueClass={value}
                            key={value._id}
                        />
                    })
                    :
                    <></>
                }

            </ScrollView>
            {user.role === 'Coach'
                ?
                <TouchableOpacity style={{
                    position: 'absolute',
                    right: '2.5%',
                    bottom: '3%',
                    backgroundColor: primary,
                    borderRadius: 50,
                    padding: 20
                }}
                    onPress={() => {
                        navigation.navigate('CreateClass')
                    }}>
                    <Ionicons name='add' size={24} color={'white'} />
                </TouchableOpacity>
                :
                <></>}
            {open ? <ErrorPopUp open={open} message={msg} /> : <></>}
        </SafeAreaView>
    )
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
    nullText: {
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        fontSize: 25,
        color: '#ffffffcc',
        padding: 10,
    }
})