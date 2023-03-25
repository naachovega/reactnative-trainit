import { View, Text, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, Alert, Image } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import SendChanges from '../../../Components/SendChanges'
import AuthContext from '../../../Context/index'


export default function EditBio({ navigation }) {

    const [bio, setBio] = useState('')

    const maxChars = 200

    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        setBio(user.bio)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <SendChanges callback={sendChanges} />
            }
        })
    }, [bio])

    const sendChanges = () => {

        const biography = {
            socialMediaId: user.socialMediaId,
            biography: bio
        }

        const requestOptions = {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(biography)
        };

        fetch(`http:/192.168.0.87:3000/api/user/edit-bio`, requestOptions)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setUser(data)
                    setTimeout(() => {
                        Alert.alert('Exito', 'You can see your new biogrpahy on your profile', []       )
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
            <View style={{ width: '95%', alignSelf: 'center' }} >
                <Text style={styles.label}>Edit your bio:</Text>
                <Text style={styles.description}>Provide a biography for your profile so other users can get to know you better</Text>
                <TextInput
                    placeholderTextColor={"#000C66cc"}
                    value={bio}
                    onChangeText={setBio}
                    style={styles.input}
                    placeholder={"Your bio here"}
                    keyboardType={'default'}
                    editable={true}
                    // editable={bio.length >= maxChars ? false : true}
                    maxLength={maxChars}
                />
                <View style={styles.viewChars}>
                    <Text style={{
                        color: bio.length >= maxChars - (maxChars * 0.10) ? 'red' : 'black',
                        fontFamily: 'Poppins-SemiBold',
                    }}>{bio.length}/{maxChars}</Text>
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
    description: {
        opacity: 0.5,
        fontFamily: 'Poppins-Regular',
        marginLeft: '3%',
        marginTop: '3%',
        fontSize: 15,
        width: '90%'

    }, input: {
        alignSelf: 'center',
        marginTop: '3%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        padding: '2%',
        fontSize: 18,
        borderColor: '#000C66',
        color: '#050A30',
        backgroundColor: "#ebecf566",
        fontFamily: 'Poppins-Regular',
        width: '95%',
    },
    label: {
        fontSize: 28,
        marginLeft: '3%',
        fontWeight: '500',
        color: '#050A30',
        fontFamily: 'Poppins-SemiBold',
    },
    viewChars: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '95%',
        paddingTop: 4
    },
    pictureLabel: {
        fontSize: 20,
        marginLeft: '3%',
        fontWeight: '500',
        color: '#050A30',
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center'
    }
})