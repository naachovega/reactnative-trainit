import { SafeAreaView, FlatList, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import UserCard from '../../../Components/UserCard'
import AuthContext from '../../../Context/index'

export default function ClassUsers({ route, navigation }) {

    const { uniqueClass } = route.params

    const { user } = useContext(AuthContext)

    const [users, setUsers] = useState(uniqueClass.users)

    useEffect(() => {
        //traer los usuarios de esa clase en base al _id de la clase
        //voy a traer la imagen, el nombre, el apellido para mostrarlos en una card
    }, [])

    return (
        <SafeAreaView style={styles.root}>
            <View>
                {users.map((value) => {
                    return <UserCard
                        user={user}
                        key={user.socialMediaId}
                    />
                })}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: '#6495ED'
    }
})