import { View, Text } from "react-native"
import { ActivityIndicator } from 'react-native-paper'

const Loading = (props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: 'bold' }}>{props.text}</Text>
            <ActivityIndicator size={200} animating={true} color="#F46722"></ActivityIndicator>
        </View>
    )
}

export default Loading