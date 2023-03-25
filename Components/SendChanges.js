import {TouchableOpacity, Text} from 'react-native'


export default function SendChanges({callback}) {
    return (
        <TouchableOpacity style={{
            padding: 10,
            paddingRight: '6%'
        }}
            onPress={callback}
        >
            <Text
                style={{
                    fontSize: 17,
                    fontFamily: 'Poppins-SemiBold',
                    color: '#000C66'
                }}>
                Send
            </Text>
        </TouchableOpacity>
    )
}