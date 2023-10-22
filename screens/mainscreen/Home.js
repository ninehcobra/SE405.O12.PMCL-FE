import { View, Text } from "react-native"
import { Appbar } from 'react-native-paper';
import { ScrollView } from "react-native";

const Home = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, backgroundColor: 'red', flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#01466D' }}>
                            Tổng quát
                        </Text>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ height: 38, width: 120, backgroundColor: 'blue', borderRadius: 12 }}>

                            </View>
                            <Text>hi</Text>
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default Home