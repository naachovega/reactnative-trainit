import { BarCodeScanner } from 'expo-barcode-scanner'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import AuthContext from '../../../Context/index'
import { Ionicons } from '@expo/vector-icons';
import ErrorPopUp from '../../../Components/ErrorPopUp';

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
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const handleBarCodeScanned = ({ type, data }) => {

        fetch(`http://192.168.0.87:3000/api/gym/entrance/${data}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    console.log(data.token);
                    setScanned(true);
                } else {
                    setOpen(false)
                    setErrMsg("There was a problem scanning the QR code")
                    setScanned(true)
                    setOpen(true)
                }
            })
            .catch(err => {
                setOpen(false)
                setErrMsg("There was a problem trying to read the QR code.")
                setScanned(true)
                setOpen(true)
            })
    };

    return <SafeAreaView style={styles.root}>
        <View style={{
            backgroundColor: '#d3dbe6cc',
            marginBottom: '20%',
            marginTop: '10%',
            margin: 10,
            padding: 45,
            borderRadius: 30,
            width: '90%',
            alignSelf: 'center',
        }}>
            <Text style={{ color: '#050A30', fontSize: 25, fontFamily: 'Poppins-Regular', marginBottom: 25 }}>{`${user.name} ${user.lastName}`}</Text>
            <Text style={{ color: '#050A30', fontSize: 20, fontFamily: 'Poppins-Bold' }}>{user.credential}</Text>
        </View>

        <Text style={styles.title}>Scan Here</Text>
        <TouchableOpacity
            style={{
                borderRadius: 40,
                backgroundColor: '#050A30',
                padding: 30,
                width: '40%',
                alignSelf: 'center',
                alignItems: 'center',
            }}
            onPress={() => handleCamera(false)}>
            <Ionicons name='md-qr-code-sharp' color={'whitesmoke'} size={50}></Ionicons>
        </TouchableOpacity>

        {scanned ?
            <></>
            :
            <>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={scanned ? null : StyleSheet.absoluteFill}
                />
                <TouchableOpacity
                    style={{
                        borderRadius: 50, backgroundColor: '#050A30cc', padding: 10, alignSelf: 'flex-start',
                        marginLeft: 25, position: 'absolute', top: '10%'
                    }}
                    onPress={() => handleCamera(true)}>
                    <Ionicons name='ios-arrow-back-sharp' size={30} color={'whitesmoke'}></Ionicons>
                </TouchableOpacity>
            </>
        }
        {open && <ErrorPopUp open={open} message={errMsg} />}
    </SafeAreaView>
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: '#6495ED',
        display: 'flex'
    },
    title: {
        fontSize: 35,
        margin: 10,
        marginBottom: '10%',
        color: "#050A30",
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold'
    }
})