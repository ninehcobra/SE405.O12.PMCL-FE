import { View, Text } from "react-native"

const Chat = () => {
    return (
        <View style={{ flex: 1 }}>
            <View >
                <View style={{ marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, flexDirection: 'row', backgroundColor: 'aqua' }}>
                        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#01466D' }}>
                            Chat với CSKH
                        </Text>
                        <View style={{ flex: 1 }}></View>
                    </View>
                    <View>

                    </View>
                </View>



            </View>

        </View >
    )
}

export default Chat