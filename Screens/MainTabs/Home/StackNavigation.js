import { Ionicons } from "@expo/vector-icons"
import { createStackNavigator } from "@react-navigation/stack"
import GoBack from "../../../Components/GoBack"
import { backgroundColor, primary } from "../../../Constants/colors"
import CreateRoutine from "../../Routine/CreateRoutine"
import Routine from "../../Routine/Routine"
import RoutineList from "../../Routine/RoutineList"
import Gym from "../Gym"
import Home from './index'
import { View } from 'react-native'
import { useContext } from 'react'
import AuthContext from '../../../Context/index'
import Test from "../Credential/test"

export default function StackNavHome() {
    const { location } = useContext(AuthContext)

    const Stack = createStackNavigator()
    return (
        <>
            <Stack.Navigator initialRouteName="HomeStack">
                <Stack.Group screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerStatusBarHeight: 50,
                    headerTitleStyle: {
                        fontFamily: 'Poppins-ExtraBold',
                        fontSize: 28,
                        marginTop: '1%'
                    }
                }}>
                    <Stack.Screen name="HomeStack" component={Home} options={{

                        headerTitle: 'Train It',
                        headerRight: () => {
                            return <View style={{ right: '5%' }} >
                                <Ionicons onPress={() => { //darle la opcion de cambiar su ubicacion al usuario
                                }} size={28} color={primary} name="location-outline" />
                            </View>
                        }
                    }} />
                    <Stack.Screen name="CreateRoutine" component={CreateRoutine} options={{
                        headerLeft: () => {
                            return <GoBack />
                        },
                        headerTitle: ''
                    }} />
                    <Stack.Screen name="Routine" component={Routine} options={{

                        headerLeft: () => {
                            return <GoBack />
                        },
                        headerShown: true,
                        headerTitle: 'Routine'
                    }} />
                    <Stack.Screen name="RoutineList" component={RoutineList} options={{

                        headerLeft: () => {
                            return <GoBack />
                        },
                        headerShown: true,
                        headerTitle: ''
                    }} />
                    <Stack.Screen name="Gym" component={Gym} options={{

                        headerLeft: () => {
                            return <GoBack />
                        },
                        headerShown: true,
                        headerTitle: ''
                    }} />
                    <Stack.Screen name="Test" component={Test} options={{

                        headerLeft: () => {
                            return <GoBack />
                        },
                        headerShown: true,
                        headerTitle: ''
                    }} />
                </Stack.Group>
            </Stack.Navigator>
        </>
    )

}
