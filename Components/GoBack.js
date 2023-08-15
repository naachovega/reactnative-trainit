import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {TouchableOpacity} from 'react-native'
import { iconColor, primary, secondary } from '../Constants/colors'



export default function GoBack() {

    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => {
            navigation.goBack()
        }}>
            <Ionicons name='ios-arrow-back-sharp' color={secondary} size={28}
                style={{
                    marginLeft: '4%',
                    marginTop: '0%'
                }} />
        </TouchableOpacity>

    )
}