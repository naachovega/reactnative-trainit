import { View, Text, TextInput, SafeAreaView, StyleSheet, Alert } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import SendChanges from '../../../Components/SendChanges'
import AuthContext from '../../../Context/index'
import host from '../../../config'
import { actionButtonText, backgroundColor, inputBackground, placeholderTextColor, primary, secondary } from '../../../Constants/colors'


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
            _id: user._id,
            biography: bio
        }

        const requestOptions = {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(biography)
        };

        fetch(`${host}/api/user/edit-bio`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setUser(data)
                    setTimeout(() => {
                        Alert.alert('Exito', 'You can see your new biogrpahy on your profile', [])
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
                    placeholderTextColor={primary}
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
                        color: bio.length >= maxChars - (maxChars * 0.10) ? 'red' : primary,
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
        backgroundColor: backgroundColor
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
        borderWidth: 0.5,
        paddingLeft: '5%',
        height: 55,
        paddingRight: '5%',
        fontSize: 18,
        borderColor: primary,
        color: primary,
        backgroundColor: inputBackground,
        fontFamily: 'Poppins-Regular',
        width: '95%',
    },
    label: {
        fontSize: 32,
        marginLeft: '3%',
        color: primary,
        fontFamily: 'Poppins-Bold',
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
        color: primary,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center'
    }
})