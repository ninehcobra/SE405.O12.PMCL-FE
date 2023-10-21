import { View, Text, Image, Button, Platform } from "react-native"
import { ActivityIndicator } from 'react-native-paper'
import { getTest } from "../services/userService"
import { useEffect, useState } from "react"
import axios from 'axios';



const Loading = (props) => {

    const [arr, setArr] = useState('')
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.8:8080/api/test-api')
                const responseData = response.data
                console.log('check api', responseData)
            } catch (error) {
                console.log('loi', error)
            }
        };
        fetchData();
    }, [load]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: 'bold' }}>{props.text}</Text>
            <Button onPress={() => setLoad(!load)} title="nut"></Button>

            {/* <ActivityIndicator size={200} animating={true} color="#F46722"></ActivityIndicator> */}
        </View>
    )
}

export default Loading