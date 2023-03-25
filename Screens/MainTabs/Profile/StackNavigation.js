import { createStackNavigator } from "@react-navigation/stack"
import Interests from "../../Interests"
import Profile from "./index"
import { TouchableOpacity, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import PersonalData from "./PersonalData"
import Configuration from "../../Configuration"
import EditBio from "./EditBio"
import EditProfile from "./EditProfile"
import UserClasses from "../Class/UserClasses"
import GoBack from "../../../Components/GoBack"
import ClassDetail from "../Class/ClassDetail"



export default function StackProfile() {

    const Stack = createStackNavigator()

    const navigation = useNavigation()
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Group screenOptions={{
                headerTransparent: false,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: '#6495ED',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
            }}>
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen
                    name="Interests"
                    component={Interests}
                    options={{
                        headerLeft: () => {
                            return <GoBack />
                        },

                    }}
                />
                <Stack.Screen
                    name="PersonalData"
                    component={PersonalData}
                    options={{
                        headerLeft: () => {
                            return <GoBack />
                        },
                    }}
                />
                <Stack.Screen
                    name="Configuration"
                    component={Configuration}
                    options={{
                        headerLeft: () => {
                            return <GoBack />
                        },
                    }}
                />
                <Stack.Screen
                    name="EditBio"
                    component={EditBio}
                    options={{
                        headerLeft: () => {
                            return <GoBack />
                        },
                    }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{
                        headerLeft: () => {
                            return <GoBack />
                        },
                    }}
                />
                <Stack.Screen
                    name="UserClasses"
                    component={UserClasses}
                    options={{
                        headerLeft: () => {
                            return <GoBack />
                        },
                    }}
                />
                <Stack.Screen
                    name="ClassDetail"
                    component={ClassDetail}
                    options={{
                        headerMode: 'screen',
                        headerLeft: () => {
                            return <GoBack />
                        }
                    }} />
            </Stack.Group>

        </Stack.Navigator>

    )
}  