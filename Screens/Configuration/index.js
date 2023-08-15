import { TouchableOpacity, SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native'
import { Switch } from 'react-native-switch'
import { useState, useContext } from 'react'
import AuthContext from '../../Context/index'
import host from '../../config'
import { backgroundColor, placeholderTextColor, primary } from '../../Constants/colors'

export default function Configuration({ navigation }) {

    const { theme, setTheme } = useContext(AuthContext)
    const { user, setUser } = useContext(AuthContext)

    const changeTheme = (value) => {
        const colorTheme = value === 'dark' ? 'light' : 'dark'
        setTheme(colorTheme)
    }

    const deleteAccion = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { "Content-type": "application/json" },

        }

        fetch(`${host}/api/test/${user._id}`, requestOptions)
            .then(res => res.json())
            .then(data => {

                if (data.code === 200) {
                    alert(data.message)
                    setTimeout(() => {
                        setUser(null)
                    }, 2000)
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const deleteUser = () => {
        Alert.alert('Delete Account', 'You will lose access to all your information', [
            {
                text: 'Cancel',
            },
            {
                text: 'Ok',
                onPress: () => deleteAccion(),
                style: 'cancel',
            }
        ]);

    }

    return (
        <SafeAreaView style={styles.root} >
            <Text style={styles.title}>Configuration</Text>
            <Text style={styles.configSubtitle}>Edit your app settings as you wish from here</Text>

            <View style={{ paddingTop: 10, marginTop: '4%', borderTopWidth: 0.3, width: '95%', alignSelf: 'center', flexWrap: 'nowrap', flexDirection: 'row' }}>
                <Text style={styles.subtitle}>Dark Theme: </Text>

                <Switch style={styles.theme}
                    activeText={''}
                    inActiveText={''}
                    value={theme === 'dark' ? true : false}
                    onValueChange={() => changeTheme(theme)}
                    containerStyle={{ margin: '2%', borderColor: placeholderTextColor, borderWidth: 1 }}
                    backgroundActive='#5fededcc'
                    backgroundInactive='#5b8bd4cc'
                />
            </View>
            <View style={{ paddingTop: 10, width: '95%', alignSelf: 'center', flexWrap: 'nowrap', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setUser(null)}>
                    <Text style={[styles.subtitle, { color: '#d61313' }]}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 10, marginTop: '2%', width: '95%', alignSelf: 'center', flexWrap: 'nowrap', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => deleteUser()}>
                    <Text style={[styles.subtitle, { color: '#d61313' }]}>Delete Account</Text>
                </TouchableOpacity>
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
    title: {
        fontSize: 40,
        fontFamily: 'Poppins-SemiBold',
        width: '95%',
        alignSelf: 'center',
        color: primary,

    },
    subtitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        alignSelf: 'center',
        color: primary,
    },
    theme: {
        marginLeft: '20%'
    },
    configSubtitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        alignSelf: 'center',
        color: primary,
        opacity: 0.8,
        marginTop: 10
    }
})