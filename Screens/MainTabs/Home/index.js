import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import AuthContext from '../../../Context/index'
import { useContext, useEffect, useState } from 'react'
import { actionButton, actionButtonText, backgroundColor, primary, secondary } from '../../../Constants/colors'
import { Ionicons } from '@expo/vector-icons'
import CalendarPicker from 'react-native-calendar-picker';
import { BottomSheet } from "react-native-btr";
import CircleSlider from '../../../Components/CircleSlider'
import Carousel from 'react-native-anchor-carousel'
import React from 'react'
import * as Location from 'expo-location';
import getDistance from 'geolib/es/getDistance';
import host from '../../../config'

export default function Home({ navigation }) {

    const { user, location, setLocation } = useContext(AuthContext)

    const date = new Date()
    const [sunday, setSunday] = useState(new Date())
    const [monday, setMonday] = useState(new Date())
    const [tuesday, setTuesady] = useState(new Date())
    const [wednesday, setWednesday] = useState(new Date())
    const [thursday, setThursday] = useState(new Date())
    const [friday, setFriday] = useState(new Date())
    const [saturday, setSaturday] = useState(new Date())
    const [daysOfMonth, setDaysOfMonth] = useState(null)
    const [goal, setGoal] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [gyms, setGyms] = useState([])

    const setWeeksDates = () => {
        const numberDate = date.getDate()
        let dateAux = new Date()

        if (date.getDay() === 0) {
            for (let index = 0; index < 7; index++) {
                let actualDate = new Date(dateAux.setDate(numberDate - (index)))
                setDay(actualDate)
            }
        } else if (date.getDay() === 1) {
            for (let index = 0; index < 7; index++) {
                let actualDate = new Date(dateAux.setDate(numberDate + (index)))
                setDay(actualDate)
            }
        } else {
            const today = date.getDay() - 1
            for (let index = 0; index < today; index++) {
                let actualDate = new Date(dateAux.setDate(numberDate - (index + 1)))
                setDay(actualDate)
            }
            for (let index = 0; index < (6 - today); index++) {
                let actualDate = new Date(dateAux.setDate(numberDate + (index + 1)))
                setDay(actualDate)
            }
        }
    }

    const setDay = (date) => {
        switch (date.getDay()) {
            case 0:
                setSunday(date)
                break;
            case 1:
                setMonday(date)
                break;
            case 2:
                setTuesady(date)
                break;
            case 3:
                setWednesday(date)
                break;
            case 4:
                setThursday(date)
                break;
            case 5:
                setFriday(date)
                break;
            case 6:
                setSaturday(date)
                break;
        }
    }

    const navToRoutine = (date, calendar) => {
        setShowModal(false)

        let year
        let month
        let day

        year = date.getFullYear()
        month = date.getMonth() + 1
        day = date.getDate()

        day = day < "10" ? "0" + day : day
        month = month < "10" ? "0" + month : month

        const dateString = `${year}-${month}-${day}`

        const obj = {
            dateString: dateString,
            day: day,
            month: month,
            year: year
        }

        //buscar si el usuario tiene rutinas cargadas para ese dia, si tiene, redirigir a la vista con su rutina, si no, redirigirlo para crear una nueva rutina.
        // Si es una fecha pasada, solamente tiene que ser readonly, no puede dejarle crear una nueva
        true ? navigation.navigate("CreateRoutine", { obj: obj }) : navigation.navigate("Routine", { _id: "" })
    }

    const setShowDate = (date) => {
        return date.toLocaleString('default', { weekday: 'long' }).substring(0, 2)

    }

    const configLocation = async () => {

        if (!location) {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let auxLocation = await Location.getCurrentPositionAsync({});
            setLocation(auxLocation);
        }


        fetch(`${host}/api/gym`)
            .then(res => res.json())
            .then(data => {
                setGyms(data)
                // console.log(data);
            })
            .catch(err => {
                console.log(err);
            })

        //este endpoint obtiene datos de ubicacion en base a un lat y lng dado
        // const apikey = "Fob9_rRxDfzbzfiai2SGqZIrO8hnJ2Hl-udCgkNVaM0"
        // fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${obj.lat},${obj.lng}&lang=en-US&apiKey=${apikey}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data.items[0].address)
        //     })
        //     .catch(err => console.log(err))
    }

    const calculateDistance = (latitude, longitude) => {
        const distance = getDistance({ lat: location.coords.latitude, lng: location.coords.longitude }, { lat: latitude, lng: longitude }, 1) / 1000

        return Math.round(distance)

    }

    const dayOfMonth = () => {

        ///Mostrar solo por semana, considerar hacer configurable mostrar por mes.
        if (date.getDate() === 1) {

        }
        var d = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        setDaysOfMonth(d.getDate())
    }

    useEffect(() => {
        configLocation()
        setWeeksDates()
        dayOfMonth()
    }, [])

    const carouselRef = React.useRef(null);

    const renderItem = ({ item, index }) => {

        return (
            <View style={{ width: '100%' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: actionButton,
                        borderRadius: 10,
                        alignSelf: 'center',
                        width: '90%',
                        marginBottom: '3%',
                        marginTop: '3%',
                        height: '65%'
                    }}
                    onPress={() => {
                        navigation.navigate("Gym", { item: item })
                    }}>
                </TouchableOpacity>
                <View>
                    <Text style={style.gymText}>{item.name}</Text>
                    <Text style={[style.gymText, { fontFamily: 'Poppins-Regular' }]}>$ {item.price}</Text>
                    <Text style={[style.gymText, { position: 'absolute', bottom: 0, alignSelf: 'flex-end', fontFamily: 'Poppins-Regular', marginRight: '5%' }]}> <Ionicons name='location-outline' size={16} color={primary} /> {calculateDistance(item.location.lat, item.location.lng)} km</Text>
                </View>
            </View>
        );
    }

    return (
        <ScrollView scrollEnabled={false} style={style.root}>
            <Text style={style.title}>Welcome back, {user.name}!</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 24 }}>Your {!goal ? "Monthly" : "Weekly"}</Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 24 }}>Gym</Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 24 }}>Attendance</Text>
                    <TouchableOpacity style={{ marginTop: '15%' }}
                        onPress={() => navigation.navigate("RoutineList")}>
                        <Text style={{ fontFamily: 'Poppins-Bold' }}>Configure your routines</Text>
                    </TouchableOpacity>
                </View>
                {daysOfMonth &&
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <CircleSlider
                            step={1}
                            min={0}
                            value={0}
                            max={31}
                            contentContainerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            strokeWidth={10}
                            buttonBorderColor={secondary}
                            buttonFillColor="#fff"
                            buttonStrokeWidth={4}
                            openingRadian={Math.PI / 4}
                            buttonRadius={10}
                            linearGradient={[{ stop: '0%', color: actionButton }, { stop: '100%', color: primary }]}
                            onPress={() => {
                                setGoal(false)
                            }}
                        >
                            <Text style={{ color: primary, fontFamily: 'Poppins-Bold', fontSize: 42, marginTop: 10 }}>{user.gymAttendanceMonthly} / {user.monthlyGoalAttendance}</Text>
                            <Text style={{ left: 6, fontFamily: 'Poppins-Regular', marginRight: 15, fontSize: 18, color: primary }}>Your Goal</Text>
                        </CircleSlider>
                    </View>
                }
            </View>
            <View style={[style.viewStyle, { height: '40%' }]}>
                <Text style={style.subTitle}>Gyms near you</Text>
                {gyms.length === 0
                    ?
                    <Text>Loading Gyms</Text>
                    :
                    <Carousel
                        ref={carouselRef}
                        data={gyms}
                        renderItem={renderItem}
                        itemWidth={Dimensions.get("window").width * 0.65}
                        containerWidth={Dimensions.get("window").width}
                        separatorWidth={5}
                    />
                }

            </View>
            <View style={[style.viewStyle, { alignItems: 'center' }]}>
                <Text style={style.subTitle}>{date.toLocaleString('default', { weekday: 'long' })}, {date.getDate()} {date.toLocaleString('default', { month: 'long' })}</Text>
                <Ionicons name='calendar' style={{ position: 'absolute', right: 5 }} color={secondary} size={30} onPress={() => setShowModal(true)} />
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        style={[style.viewCalendar, { backgroundColor: date.getDay() === 1 ? secondary : null, borderRadius: 15 }]}
                        onPress={() => navToRoutine(monday)}>
                        <Text style={[style.calendarDate, { color: date.getDay() !== monday.getDay() ? secondary : actionButtonText }]}>{setShowDate(monday)}</Text>
                        <Text style={[style.calendarNumber, { color: date.getDay() !== monday.getDay() ? secondary : actionButtonText }]}>{monday.getDate()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.viewCalendar, { backgroundColor: date.getDay() === 2 ? secondary : null, borderRadius: 15 }]}
                        onPress={() => navToRoutine(tuesday)}>
                        <Text style={[style.calendarDate, { color: date.getDay() !== tuesday.getDay() ? secondary : actionButtonText }]}>{setShowDate(tuesday)}</Text>
                        <Text style={[style.calendarNumber, { color: date.getDay() !== tuesday.getDay() ? secondary : actionButtonText }]}> {tuesday.getDate()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.viewCalendar, { backgroundColor: date.getDay() === 3 ? secondary : null, borderRadius: 15 }]}
                        onPress={() => navToRoutine(wednesday)}>
                        <Text style={[style.calendarDate, { color: date.getDay() !== wednesday.getDay() ? secondary : actionButtonText }]}>{setShowDate(wednesday)}</Text>
                        <Text style={[style.calendarNumber, { color: date.getDay() !== wednesday.getDay() ? secondary : actionButtonText }]}>{wednesday.getDate()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.viewCalendar, { backgroundColor: date.getDay() === 4 ? secondary : null, borderRadius: 15 }]}
                        onPress={() => navToRoutine(thursday)}>
                        <Text style={[style.calendarDate, { color: date.getDay() !== thursday.getDay() ? secondary : actionButtonText }]}>{setShowDate(thursday)}</Text>
                        <Text style={[style.calendarNumber, { color: date.getDay() !== thursday.getDay() ? secondary : actionButtonText }]}>{thursday.getDate()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.viewCalendar, { backgroundColor: date.getDay() === 5 ? secondary : null, borderRadius: 15 }]}
                        onPress={() => navToRoutine(friday)}>
                        <Text style={[style.calendarDate, { color: date.getDay() !== friday.getDay() ? secondary : actionButtonText }]}>{setShowDate(friday)}</Text>
                        <Text style={[style.calendarNumber, { color: date.getDay() !== friday.getDay() ? secondary : actionButtonText }]}>{friday.getDate()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.viewCalendar, { backgroundColor: date.getDay() === 6 ? secondary : null, borderRadius: 15 }]}
                        onPress={() => navToRoutine(saturday)}>
                        <Text style={[style.calendarDate, { color: date.getDay() !== saturday.getDay() ? secondary : actionButtonText }]}>{setShowDate(saturday)}</Text>
                        <Text style={[style.calendarNumber, { color: date.getDay() !== saturday.getDay() ? secondary : actionButtonText }]}>{saturday.getDate()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[style.viewCalendar, { backgroundColor: date.getDay() === 0 ? secondary : null, borderRadius: 15 }]}
                        onPress={() => navToRoutine(sunday)}>
                        <Text style={[style.calendarDate, { color: date.getDay() !== sunday.getDay() ? secondary : actionButtonText }]}>{setShowDate(sunday)}</Text>
                        <Text style={[style.calendarNumber, { color: date.getDay() !== sunday.getDay() ? secondary : actionButtonText }]}>{sunday.getDate()}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomSheet visible={showModal}>
                <View style={{ marginBottom: 0 }}>
                    <View style={{ backgroundColor: backgroundColor, padding: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                        <Ionicons name='close' style={{ alignSelf: 'flex-end', marginTop: 10 }} color={primary} size={30} onPress={() => setShowModal(false)} />
                    </View >
                    <View style={{ backgroundColor: backgroundColor, padding: 15, width: '100%', borderBottomEndRadius: 15, borderBottomLeftRadius: 15, paddingBottom: '15%' }}>
                        <CalendarPicker
                            startFromMonday={true}
                            initialView={'days'}
                            todayBackgroundColor={primary}
                            selectedDayColor={primary}
                            todayTextStyle={{
                                color: backgroundColor
                            }}
                            textStyle={{
                                fontFamily: 'Poppins-SemiBold',
                                color: primary,
                                padding: 5,
                            }}
                            nextComponent={<Ionicons name='arrow-forward-outline' size={24} />}
                            previousComponent={<Ionicons name='arrow-back-outline' size={24} />}
                            onDateChange={(day) => {
                                const auxDate = new Date(day)
                                navToRoutine(auxDate, true)
                            }}
                            allowRangeSelection={false}
                            yearTitleStyle={{
                                fontFamily: 'Poppins-SemiBold',

                            }}
                            weekdays={['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']}
                            selectMonthTitle='Month of '
                        />
                    </View>
                </View>
            </BottomSheet>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        padding: '2%',
        backgroundColor: backgroundColor
    },
    title: {
        marginBottom: '2%',
        marginTop: '2%',
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
        color: primary,
        alignSelf: 'center'
    },
    subTitle: {
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'left',
        color: primary
    },
    viewStyle: {
        marginBottom: '5%',
        width: '100%',
    },
    card: {
        backgroundColor: actionButton,
        margin: 10,
        height: 100,
        borderRadius: 30,
    },
    text: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        color: primary
    },
    calendarDate: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: primary,
        marginBottom: 10,
        padding: 10
    },
    calendarNumber: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: primary,
        marginBottom: 10,
        marginRight: '1%',
    },
    viewCalendar: {
        marginTop: '5%',
        marginRight: '2%',
        marginLeft: '2%',
        alignItems: 'center',
    },
    gymText: {
        marginLeft: '5%',
        fontSize: 15,
        fontFamily: 'Poppins-Bold',
        color: primary
    }
})