import { BarCodeScanner } from 'expo-barcode-scanner'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import AuthContext from '../../../Context/index'
import { Ionicons } from '@expo/vector-icons';
import ErrorPopUp from '../../../Components/ErrorPopUp';
import host from '../../../config';
import { actionButton, actionButtonText, backgroundColor, primary, secondary } from '../../../Constants/colors';

export default function CredentialTrainIt({ navigation }) {


    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);
    const { user } = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    useEffect(() => {
        const onLoad = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted');
        }
        onLoad();
    }, [])

    const handleCamera = (bool) => {
        navigation.setOptions(
            { headerShown: bool }
        );
        setScanned(bool)
    }

    if (hasPermission === null) {
        return <View style={styles.root}>
            <Text style={styles.title}>Waiting for camera permission</Text>
        </View>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const handleBarCodeScanned = async ({ type, data }) => {
        handleCamera(true)

        const obj = {
            _id: user._id,
            gymToken: data
        }

        const requestOptions = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(obj)
        };
        try {
            const test = await fetch(`${host}/api/gym/entrance`, requestOptions)
            const response = await test.json()
            if (response.code === 500) {
                throw Error("There was a problem trying to read the QR code")
            }
        } catch (error) {
            setOpen(false)
            setErrMsg(error.message)
            setOpen(true)
            console.log(error);
        }
    };

    return <SafeAreaView style={styles.root}>
        <View style={{
            backgroundColor: secondary,
            marginBottom: '20%',
            marginTop: '10%',
            margin: 10,
            padding: 45,
            borderRadius: 30,
            width: '90%',
            alignSelf: 'center',
        }}>

            <Text style={{ color: actionButtonText, fontSize: 24, fontFamily: 'Poppins-Regular', marginBottom: 25 }}>{`${user.name} ${user.lastName}`}</Text>
            <Text style={{ color: actionButtonText, fontSize: 24, fontFamily: 'Poppins-SemiBold' }}>{user.credential}</Text>
        </View>
        <Text style={styles.title}>Scan Here</Text>
        <TouchableOpacity
            style={{
                borderRadius: 40,
                backgroundColor: actionButton,
                padding: 30,
                width: '40%',
                alignSelf: 'center',
                alignItems: 'center',
            }}
            onPress={() => handleCamera(false)}>
            <Ionicons name='md-qr-code-sharp' color={primary} size={50}></Ionicons>
        </TouchableOpacity>

        {scanned ?
            <></>
            :
            <>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={scanned ? null : [StyleSheet.absoluteFill, styles.container]}
                >
                    <Text style={styles.description}>Scan your code</Text>
                    <View style={styles.layerTop} />
                    <View style={styles.layerCenter}>
                        <View style={styles.layerLeft} />
                        <View style={styles.focused} />
                        <View style={styles.layerRight} />
                    </View>
                    <View style={styles.layerBottom} />
                </BarCodeScanner>
                <TouchableOpacity
                    style={{
                        borderRadius: 50, padding: 10, alignSelf: 'flex-start',
                        marginLeft: 15, position: 'absolute', top: '10%'
                    }}
                    onPress={() => handleCamera(true)}>
                    <Ionicons name='ios-arrow-back-sharp' size={30} color={'whitesmoke'}></Ionicons>
                </TouchableOpacity>
            </>
        }
        {open && <ErrorPopUp open={open} message={errMsg} />}
    </SafeAreaView>
}
const opacity = 'rgba(0, 0, 0, .2)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }, root: {
        height: '100%',
        width: '100%',
        backgroundColor: backgroundColor,
        display: 'flex'
    },
    title: {
        fontSize: 48,
        margin: 10,
        marginBottom: '5%',
        color: primary,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold'
    },
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    layerTop: {
        flex: 1,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 1,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 0.9,
        backgroundColor: opacity
    },
    focused: {
        flex: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    layerRight: {
        flex: 0.9,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 1,
        backgroundColor: opacity
    },
    description: {
        fontSize: 48,
        marginTop: '10%',
        alignSelf: 'center',
        top: '15%',
        color: actionButtonText,
        fontFamily: 'Poppins-Bold',
        position: 'absolute'
    }
})