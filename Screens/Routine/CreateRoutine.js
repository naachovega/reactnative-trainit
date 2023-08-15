import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { backgroundColor, inputBackground, placeholderTextColor, primary } from '../../Constants/colors'
import { useState } from 'react'

export default function CreateRoutine({ navigation, route }) {

    const objParam = route.params.obj;

    const [exercises, setExercises] = useState([])
    const [contador, setContador] = useState(1)
    const [name, setName] = useState("")
    const [reps, setReps] = useState(0)
    const [sets, setSets] = useState(0)
    //ver que tipo de objeto se va a guardar de rutina
    const onSubmit = (e) => {

        const obj = {
            date: objParam.dateString,
            title: name,
            exercises: {
                sets: sets,
                reps: reps,
            }
        }
        
        exercises.push(e)
        setExercises([...exercises])
    }
    return <View style={style.root}>

        <Text style={style.title}>New Routine</Text>
        <Text style={style.label}>What are you traning today?</Text>
        <TextInput
            placeholder={'Your routine title'}
            placeholderTextColor={"#505254"}
            value={name}
            onChangeText={setName}
            style={style.input}
            keyboardType='default' />

        <Text style={style.label}>Add exercises to your routine!</Text>
        <ScrollView>

            {exercises.length === 0
                ?
                <></>
                :
                exercises.map((v) => {
                    return <View style={{
                        borderRadius: 15,
                        borderColor: primary,
                        borderWidth: 0.8,
                        padding: 20,
                        marginBottom: 10,
                        marginTop: 10,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        width: '100%',

                    }}
                        key={v}
                    >
                        <Text>Pecho Plano</Text>
                        <Text>4</Text>
                        <Text>12</Text>
                        <Text>65kg</Text>
                        <Ionicons name='close' size={24}
                            onPress={() => {
                                const index = exercises.indexOf(v)
                                exercises.splice(index, 1)
                                setExercises([...exercises])
                            }} />
                    </View>
                })
            }
            <TouchableOpacity style={{
                borderWidth: 0.5,
                borderRadius: 15,
                borderColor: primary,
                padding: 20,
                marginTop: '5%'
            }}
                onPress={() => {
                    setContador(prev => prev + 1)
                    onSubmit(contador)
                }}
            >
                <Ionicons name='add' size={34} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
        </ScrollView>
    </View>
}

const style = StyleSheet.create({
    root: {
        backgroundColor: backgroundColor,
        height: '100%',
        width: '100%',
        padding: '4%'
    },
    title: {
        color: primary,
        fontSize: 36,
        fontFamily: 'Poppins-Bold'
    },
    subTitle: {
        color: primary,
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
        marginTop: 10
    },
    label: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: primary,
        marginTop: 10
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
})