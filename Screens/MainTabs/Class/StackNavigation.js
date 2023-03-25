

import { createStackNavigator } from "@react-navigation/stack"
import GoBack from "../../../Components/GoBack"
import UserCard from "../../../Components/UserCard"
import PersonalData from "../Profile/PersonalData"
import ClassDetail from "./ClassDetail"
import ClassUsers from "./ClassUsers"
import CreateClass from "./CreateClass"
import Class from "./index"

export default function StackClass() {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName="Class">
            <Stack.Screen
                name="Class"
                component={Class}
                options={{
                    headerTransparent: false,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#5b8bd4aa',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerMode: 'screen'
                }} />
            <Stack.Screen
                name="ClassDetail"
                component={ClassDetail}
                options={{
                    headerTransparent: false,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#5b8bd4aa',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerMode: 'screen',
                    headerLeft: () => {
                        return <GoBack />
                    }
                }} />
            <Stack.Screen
                name="CreateClass"
                component={CreateClass}
                options={{
                    headerTransparent: false,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#5b8bd4aa',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerMode: 'screen',
                    headerLeft: () => {
                        return <GoBack />
                    }
                }} />

            <Stack.Screen
                name="ClassUsers"
                component={ClassUsers}
                options={{
                    headerTransparent: false,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#5b8bd4aa',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerMode: 'screen',
                    headerLeft: () => {
                        return <GoBack />
                    }
                }} />
            <Stack.Screen
                name="UserCard"
                component={UserCard}
                options={{
                    headerTransparent: false,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#5b8bd4aa',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerMode: 'screen',
                    headerLeft: () => {
                        return <GoBack />
                    }
                }} />
            <Stack.Screen
                name="PersonalData"
                component={PersonalData}
                options={{
                    headerTransparent: false,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#5b8bd4aa',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },

                    headerLeft: () => {
                        return <GoBack />
                    },
                    headerMode: 'screen'
                }}
            />
        </Stack.Navigator>

    )
}  