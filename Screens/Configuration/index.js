import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { Switch } from 'react-native-switch'
import { useState, useContext } from 'react'
import GoBack from '../../Components/GoBack'
import AuthContext from '../../Context/index'

export default function Configuration({ navigation }) {

    const { theme, setTheme } = useContext(AuthContext)

    const changeTheme = (value) => {
        const colorTheme = value === 'dark' ? 'light' : 'dark'
        setTheme(colorTheme)
    }

    return (
        <SafeAreaView style={styles.root} >
            <Text style={styles.title}>Configuration</Text>
            <Text style={styles.configSubtitle}>Edit your apps settings as you wish from here</Text>

            <View style={{ paddingTop: 10, marginTop: '4%', borderTopWidth: 0.3, width: '95%', alignSelf: 'center', flexWrap: 'nowrap', flexDirection: 'row' }}>
                <Text style={styles.subtitle}>Dark Theme: </Text>

                <Switch style={styles.theme}
                    activeText={''}
                    inActiveText={''}
                    value={theme === 'dark' ? true : false}
                    onValueChange={() => changeTheme(theme)}
                    containerStyle={{ margin: '2%', borderColor: '#000C66cc', borderWidth: 1 }}
                    backgroundActive='#5fededcc'
                    backgroundInactive='#5b8bd4cc'
                />
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
    title: {
        fontSize: 40,
        fontFamily: 'Poppins-SemiBold',
        width: '95%',
        alignSelf: 'center',
        color: '#050A30',

    },
    subtitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        alignSelf: 'center',
        color: '#050A30',
    },
    theme: {
        marginLeft: '20%'
    },
    configSubtitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        alignSelf: 'center',
        color: '#050A30',
        opacity: 0.8,
        marginTop: 10
    }
})