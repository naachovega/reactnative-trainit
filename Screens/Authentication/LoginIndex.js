import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../Context/index'
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ErrorPopUp from '../../Components/ErrorPopUp';
import host from '../../config';
import { actionButton, backgroundColor, inputBackground, logInButton, placeholderTextColor, primary } from '../../Constants/colors';

export default function Login() {



    const { setUser } = useContext(AuthContext)
    const [errMsg, setErrMsg] = useState("test")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [valid, setValid] = useState(false)
    const [seePassword, setSeePassword] = useState(true)
    const [showErr, setShowErr] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '215733540841-gmt49ne7a8vbmejcg2qh4fs1po3lpotu.apps.googleusercontent.com'
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response
            const obj = { accessToken: authentication.accessToken }

            const requestOptions = {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(obj)
            };

            fetch(`${host}/api/auth/login/google/`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 500) {
                        throw new Error("No se pudo iniciar la sesion con google, intente nuevamente")
                    } else {
                        setShowErr(false)
                        setUser(data)
                    }
                })
                .catch(err => {
                    console.log(err);
                    setErrMsg(err.message)
                    setShowErr(true)
                })
        }
    }, [response])

    const logIn = () => {
        // setShowErr(false)
        // setUser(null)
        // throw Error("")
        const requestOptions = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                username: email,
                password: password
            })
        }

        fetch(`${host}/api/auth/signIn`, requestOptions)
            .then(res => res.json())
            .then(data => {

                if (data.code === 204 || data.code === 401) {
                    throw new Error(data.message)
                } else if (data.code === 200) {
                    setUser(data.user)
                }
            })
            .catch(err => {
                setShowErr(true)
                setErrMsg(err.message)
                console.log(err.message);
            })

    }

    const validate = (text) => {
        showErr && setShowErr(false)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setEmail(text)
            setValid(false)
            return false;
        }
        else {
            setEmail(text)
            setValid(true)
        }
    }


    const navigation = useNavigation()

    return (
        <View style={style.root} onStartShouldSetResponder={() => { Keyboard.dismiss() }}>
            <Text style={style.title}>TRAIN IT</Text>
            <Text style={style.subTitle}>Log In</Text>
            <Text style={style.label}>Email</Text>
            <TextInput
                placeholderTextColor={"#505254"}
                value={email}
                onChangeText={(text) => validate(text)}
                style={{
                    width: '100%',
                    marginTop: '3%',
                    marginBottom: '5%',
                    borderRadius: 10,
                    borderWidth: showErr && email !== "" ? 1 : 0.7,
                    padding: 10,
                    fontSize: 18,
                    borderColor: showErr && email !== "" ? 'red' : placeholderTextColor,
                    color: primary,
                    backgroundColor: inputBackground,
                    fontFamily: 'Poppins-Regular'
                }}
                placeholder={"your_email@hotmail.com"}
                keyboardType={'email-address'} />
            {showErr && email !== "" && <Text style={style.errMsg}>{errMsg}</Text>}
            <Text style={style.label}>Password</Text>
            <View>
                <TextInput
                    placeholderTextColor={"#505254"}
                    value={password}
                    onChangeText={setPassword}
                    style={style.input}
                    placeholder={"********"}
                    keyboardType={'default'}
                    secureTextEntry={seePassword}
                />
                <Ionicons
                    name={seePassword ? 'eye-sharp' : 'eye-off-sharp'}
                    size={25}
                    color={primary}
                    onPress={() => setSeePassword(!seePassword)}
                    style={{
                        position: 'absolute',
                        right: 15,
                        paddingTop: 21,
                    }} />
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: valid && password !== "" ? logInButton : actionButton,
                    width: '100%',
                    borderRadius: 10,
                    padding: '1%',
                    marginBottom: '5%',
                    marginTop: '5%'
                }}
                onPress={logIn}
                disabled={valid && password !== "" ? false : true}>
                <Text style={style.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={style.buttonGoogle}
                onPress={() => promptAsync()}>
                <Text style={style.buttonTextGoogle}>Sign In With Google</Text>
            </TouchableOpacity>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ marginLeft: 10, alignSelf: 'flex-start' }}
                    onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={style.googleLogin}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 10, alignSelf: 'flex-end' }}
                    onPress={() => navigation.navigate("SignUp")}>
                    <Text style={style.googleLogin}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        padding: '5%',
        backgroundColor: backgroundColor,
    },
    buttonGoogle: {
        backgroundColor: "#fff",
        width: '100%',
        borderRadius: 10,
        shadowColor: 'grey',
        padding: '1%',
        marginBottom: '10%',
        marginTop: '5%',
        color: primary
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffffcc',
        textAlign: 'center',
        marginVertical: 6,
        fontFamily: 'Poppins-SemiBold'
    },
    buttonTextGoogle: {
        fontSize: 20,
        color: actionButton,
        textAlign: 'center',
        marginVertical: 6,
        fontFamily: 'Poppins-SemiBold'
    },
    title: {
        fontSize: 56,
        color: primary,
        fontFamily: 'Poppins-ExtraBold',
        alignSelf: 'center',
        marginTop: '40%'
    },
    subTitle: {
        fontSize: 36,
        marginTop: '3%',
        marginBottom: '3%',
        color: primary,
        fontFamily: 'Poppins-Bold',
    },
    googleLogin: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        margin: '2%',
        alignSelf: 'center',
        color: actionButton
    },
    label: {
        fontSize: 26,
        fontFamily: 'Poppins-SemiBold',
        marginTop: '3%',
    },
    errMsg: {
        fontSize: 25,
        alignSelf: 'center',
        color: 'red',
        margin: 10,
        fontFamily: 'Poppins-SemiBold'
    },
    input: {
        width: '100%',
        marginTop: '3%',
        marginBottom: '5%',
        borderRadius: 10,
        borderWidth: 0.7,
        padding: 10,
        fontSize: 18,
        borderColor: placeholderTextColor,
        color: primary,
        backgroundColor: inputBackground,
        fontFamily: 'Poppins-Regular'
    },
    errMsg: {
        fontFamily: 'Poppins-SemiBold',
        color: 'red',
        fontSize: 12,
        alignSelf: 'center',
        marginTop: '-2%'
    }
})