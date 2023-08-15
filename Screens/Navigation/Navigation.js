import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import StackNavHome from "../MainTabs/Home/StackNavigation";
import StackProfile from "../MainTabs/Profile/StackNavigation";
import CredentialTrainIt from "../MainTabs/Credential/Credential";
import { actionButton, actionButtonText, backgroundColor, primary, secondary } from "../../Constants/colors";

export default function UserNavigation() {
    const Tab = createBottomTabNavigator()
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='HomeTab'
                screenOptions={({ route }) => ({
                    tabBarStyle: {
                        backgroundColor: actionButton,
                        // height: 84,
                        borderTopColor: actionButton
                    },
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = ""
                        if (route.name === 'HomeTab') {
                            iconName = focused
                                ? 'home-sharp'
                                : 'home-outline'
                        } else if (route.name === 'ProfileTab') {
                            iconName = focused ? 'person' : 'person-outline'
                        } else if (route.name === 'CredentialTab') {
                            iconName = focused ? 'md-qr-code-sharp' : 'md-qr-code-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: primary,
                    tabBarInactiveTintColor: actionButtonText,
                    headerShown: false,
                    tabBarShowLabel: false,
                })}>


                <Tab.Group screenOptions={{
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
                    <Tab.Screen
                        name="HomeTab"
                        component={StackNavHome}
                        options={{
                            headerShown: false,
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