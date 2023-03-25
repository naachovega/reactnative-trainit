import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native'
import StackNavHome from "../MainTabs/Home/StackNavigation";
import StackProfile from "../MainTabs/Profile/StackNavigation";
import StackClass from "../MainTabs/Class/StackNavigation";
import CredentialTrainIt from "../MainTabs/Credential/Credential";

export default function UserNavigation() {
    const Tab = createBottomTabNavigator()
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='HomeTab'
                screenOptions={({ route }) => ({
                    tabBarStyle: {
                        backgroundColor: '#d3dbe6cc',
                        height: 84
                    },
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = ""
                        if (route.name === 'HomeTab') {
                            iconName = focused
                                ? 'ios-home'
                                : 'ios-home-outline'
                            // } else if (route.name === 'ClassTab') {
                            //     iconName = focused ? 'ios-barbell' : 'ios-barbell-outline'
                        } else if (route.name === 'ProfileTab') {
                            iconName = focused ? 'ios-person' : 'ios-person-outline'
                        } else if (route.name === 'CredentialTab') {
                            iconName = focused ? 'md-qr-code-sharp' : 'md-qr-code-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarInactiveTintColor: '#7c7c8f',
                    tabBarActiveTintColor: '#6495ED',
                    headerShown: false,
                    tabBarShowLabel: false,
                })}>


                <Tab.Group screenOptions={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#6495ED",
                    },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerStatusBarHeight: 50,
                    headerTitleStyle: {
                        fontFamily: 'Poppins-Bold',
                        fontSize: 28,
                        marginTop: '1%'
                    }
                }}>
                    <Tab.Screen
                        name="HomeTab"
                        component={StackNavHome}
                        options={{
                            headerTitle: 'Train It',
                            headerRight: () => {
                                return <TouchableOpacity onPress={() => {
                                    console.log("Aca voy a las notificaciones")
                                }}>
                                    <Ionicons name="notifications-outline" size={24} color={"#000000cc"} style={{ marginRight: 23 }}></Ionicons>
                                </TouchableOpacity>
                            }
                        }}
                    />
                    <Tab.Screen
                        name="CredentialTab"
                        component={CredentialTrainIt}
                        options={{
                            headerTitle: 'My Credential'
                        }}
                    />
                </Tab.Group>
                <Tab.Screen
                    name="ProfileTab"
                    component={StackProfile}
                    options={{
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}