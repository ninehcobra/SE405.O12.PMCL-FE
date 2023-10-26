import { View, Text } from "react-native"
import { Picker } from "@react-native-picker/picker"

const NotGet = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#F1F1F1', marginTop: 10 }}>
            <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text style={{ marginRight: 15, fontSize: 15, fontWeight: 'bold', color: '#606060' }}>Tổng hợp</Text>
                </View>
                <View style={{ flex: 1, borderRadius: 15, borderWidth: 2, borderColor: "#19374F" }}>
                    <Picker style={{ flex: 1 }} >
                        <Picker.Item style={{ fontSize: 14, color: '"#19374F"', fontWeight: '900' }} label="1 tuần gần nhất" value={''} ></Picker.Item>
                    </Picker>

                </View>

            </View>
            <View>
                <Text>
                    Not get
                </Text>
            </View>
        </View>
    )
}

export default NotGet