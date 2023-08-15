import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { useState, useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import AuthContext from '../../Context/index'
import host from '../../config'
import { backgroundColor, inputBackground, placeholderTextColor, primary } from '../../Constants/colors'

export default function SignUp({ navigation }) {

    const { user, setUser } = useContext(AuthContext)


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [valid, setValid] = useState(false)
    const [seePassword, setSeePassword] = useState(true)
    const [showErr, setShowErr] = useState(false)
    const [errMsg, setErrMsg] = useState("")

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
    const register = () => {
        // setShowErr(false)
        const requestOptions = {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                username: email,
                password: password
            })
        };

        fetch(`${host}/api/auth/register/`, requestOptions)
            .then(res => res.json())
            .then(data => {

                if (data.code === 204 || data.code === 400 || data.code === 500) {
                    throw new Error(data.message)
                } else {
                    setUser(data)
                }
            })
            .catch(err => {
                setShowErr(true)
                setErrMsg(err.message)
                console.log(err.message);
            })
    }

    return <View onStartShouldSetResponder={() => Keyboard.dismiss()} style={style.root}>
        <Text style={style.title}>TRAIN IT</Text>
        <Text style={style.subTitle}>Sign Up</Text>
        <Text style={style.label}>Email</Text>
        <TextInput
            placeholderTextColor={"#505254"}
            value={email}
            onChangeText={(text) => validate(text)}
            style={style.input}
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
                color={'050a30'}
                onPress={() => setSeePassword(!seePassword)}
                style={{
                    position: 'absolute',
                    right: 15,
                    paddingTop: 21,
                }} />
        </View>
        <TouchableOpacity
            style={{
                backgroundColor: valid && password !== "" ? primary : '#050a30aa',
                width: '100%',
                borderRadius: 10,
                shadowColor: 'grey',
                padding: '1%',
                marginBottom: '5%',
                marginTop: '5%'
            }}
            onPress={register}
            disabled={valid && password !== "" ? false : true}>
            <Text style={style.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View>
            <Text style={[style.googleLogin, { position: 'absolute', alignSelf: 'flex-start', fontFamily: 'Poppins-Regular' }]}>Already have an account?</Text>
            <TouchableOpacity style={{ marginRight: 10, alignSelf: 'flex-end' }}
                onPress={() => navigation.popToTop()}>
                <Text style={style.googleLogin}>Log In</Text>
            </TouchableOpacity>
        </View>
    </View>

}

const style = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        padding: '5%',
        backgroundColor: backgroundColor
    },
    buttonText: {
        fontSize: 20,
        color: '#ffffffcc',
        textAlign: 'center',
        marginVertical: 6,
        fontFamily: 'Poppins-SemiBold'
    },
    googleLogin: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        margin: '2%',
        alignSelf: 'center'
    },
    title: {
        fontSize: 56,
        color: primary,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        marginTop: '15%'
    },
    subTitle: {
        fontSize: 36,
        marginTop: '3%',
        marginBottom: '3%',
        color: primary,
        fontFamily: 'Poppins-Bold',
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
    label: {
        fontSize: 26,
        fontFamily: 'Poppins-SemiBold',
        marginTop: '3%',
    },
    errMsg: {
        fontFamily: 'Poppins-SemiBold',
        color: 'red',
        fontSize: 12,
        alignSelf: 'center',
        marginTop: '-2%'
    }
})