import { useEffect, useContext, useState } from "react"
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import CardClass from "../../../Components/ClassCard"
import GoBack from "../../../Components/GoBack"
import AuthContext from '../../../Context/index'

export default function UserClasses({ route, navigation }) {

    const socialMediaId = route.params.socialMediaId;

    const { user, setUser } = useContext(AuthContext)

    const [classes, setClasses] = useState([])

    useEffect(() => {
        if (user.socialMediaId === socialMediaId) {
            fetch(`http://192.168.0.87:3000/api/class/user/${user.socialMediaId}`)
                .then(res => res.status === 200 ? res.json() : null)
                .then(data => {
                    if (data) {
                        setClasses(data)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            fetch(`http://192.168.0.87:3000/api/class/common/${user}/${socialMediaId}`)
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data) {
                        setClasses(data)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [])

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView>
                <Text style={styles.title}>My classes</Text>
                {classes.length > 0
                    ?
                    classes.map((value) => {
                        return <CardClass
                            uniqueClass={value}
                            key={value._id}
                        />
                    })

                    :
                    <Text style={styles.nullText}>There arent any classes to show right now</Text>

                }
            </ScrollView>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#5b8bd4aa'
    },
    title: {
        fontSize: 40,
        fontFamily: 'Poppins-SemiBold',
        width: '95%',
        alignSelf: 'center',
        color: '#050A30',
    },
    nullText: {
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        fontSize: 25,
        color: '#ffffffcc',
        padding: 10,
    }
})