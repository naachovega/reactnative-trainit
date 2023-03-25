import { createStackNavigator } from "@react-navigation/stack"
import Home from './index'

export default function StackNavHome() {
    const Stack = createStackNavigator()
    return (
        <>
            <Stack.Navigator initialRouteName="HomeStack">
                <Stack.Screen name="HomeStack" component={Home} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        </>
    )

}
