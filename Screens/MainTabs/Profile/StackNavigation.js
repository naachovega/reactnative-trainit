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
import { Ionicons } from "@expo/vector-icons"
import { useContext } from 'react'
import AuthContext from '../../../Context/index'
import { backgroundColor, primary } from "../../../Constants/colors"

export default function StackProfile() {

    const { user } = useContext(AuthContext)

    const Stack = createStackNavigator()

    const navigation = useNavigation()
    return (
        <Stack.Navigator initialRouteName="PersonalData">
            <Stack.Group screenOptions={{
                headerTransparent: false,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: backgroundColor,
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
                        headerRight: () => {
                            return <TouchableOpacity onPress={() => navigation.navigate("Configuration")}>
                                <Ionicons name="settings-sharp" size={26} color={primary} style={{
                                    marginRight: '6%',
                                    marginTop: '-6%'
                                }} />
                            </TouchableOpacity>
                        }
                    }}
                    initialParams={{ _id: user._id }}
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
            </Stack.Group>

        </Stack.Navigator>

    )
}  