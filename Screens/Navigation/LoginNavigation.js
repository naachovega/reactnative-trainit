import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoBack from "../../Components/GoBack";
import ForgotPassword from "../Authentication/ForgotPasswordIndex";
import Login from "../Authentication/LoginIndex";
import SignUp from "../Authentication/SignUpIndex";
import { TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { backgroundColor } from "../../Constants/colors";

export default function LoginNavigation() {

    const Stack = createNativeStackNavigator();

    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Group screenOptions={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: backgroundColor,
                },
                headerShadowVisible: false, 
                headerBackTitleVisible: false,
                headerLeft: () => { return <GoBack /> }

            }}>
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}

                />

            </Stack.Group>

        </Stack.Navigator>
    </NavigationContainer>
}