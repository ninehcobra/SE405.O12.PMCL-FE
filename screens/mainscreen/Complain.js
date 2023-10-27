import { View, Text, TextInput, TouchableOpacity, Linking } from "react-native"
import { IconButton } from "react-native-paper"
import DatePicker from "react-native-modern-datepicker"

const Complain = () => {

    const handleCall = () => {
        Linking.openURL(`tel:0797260870`)
    }
    return (
        <View style={{ flex: 1 }}>
            <View >
                <View style={{ marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#01466D' }}>
                            Khiếu nại
                        </Text>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity onPress={() => handleCall()} style={{ flexDirection: 'row', alignItems: 'center', height: 35, backgroundColor: '#F16728', marginRight: 10, alignItems: 'center', justifyContent: 'center', width: 210, borderRadius: 13 }}>
                            <IconButton icon="phone" color="#00000" size={24}></IconButton>
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Gọi tổng đài ngay</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 40, backgroundColor: '#F1F1F1', margin: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton icon={'magnify'}>

                        </IconButton>
                        <TextInput placeholder="Tìm kiếm">

                        </TextInput>
                    </View>
                </View>


                <DatePicker
                    current="2020-07-13"
                    selected="2020-07-23"
                ></DatePicker>

            </View>

        </View >
    )
}

export default Complain
