import { View, Text, TouchableOpacity, Image } from "react-native"

const Chat = () => {
    return (
        <View style={{ flex: 1 }}>
            <View >
                <View style={{ marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#01466D' }}>
                            Chat với CSKH
                        </Text>
                        <View style={{ flex: 1 }}></View>
                    </View>
                    <View style={{ height: 65, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity >
                            <View style={{ height: 50, width: 160, backgroundColor: '#FF643B', alignItems: 'center', justifyContent: 'center', borderBottomStartRadius: 12, borderTopLeftRadius: 12 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>
                                    Chat
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity >
                            <View style={{ height: 50, width: 160, backgroundColor: '#EEEEEE', alignItems: 'center', justifyContent: 'center', borderBottomEndRadius: 12, borderTopRightRadius: 12 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#133A61' }}>
                                    GHLE Inbox
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>




            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 180, width: 200 }} source={require("../../assets/support.png")}></Image>
                <Text style={{ color: '#133A61', fontSize: 23, fontWeight: 'bold', marginTop: 12 }}>GHLE xin chào!</Text>
            </View>
        </View >
    )
}

export default Chat
