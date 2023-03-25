import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {TouchableOpacity} from 'react-native'



export default function GoBack() {

    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => {
            navigation.goBack()
        }}>
            <Ionicons name='ios-arrow-back-sharp' color={'#050A30'} size={28}
                style={{
                    marginLeft: '3%',
                    marginTop: '-6%'
                }} />
        </TouchableOpacity>

    )
}