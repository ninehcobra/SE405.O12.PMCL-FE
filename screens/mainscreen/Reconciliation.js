import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"
import { IconButton } from "react-native-paper"
import { Picker } from "@react-native-picker/picker"


const Reconciliation = () => {
    const [isChoosen, setIsChoosen] = useState(0)
    return (
        <View style={{ flex: 1 }}>
            <View >
                <View style={{ marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#01466D' }}>
                            Đối soát
                        </Text>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <IconButton onPress={() => console.log('thong bao')} icon="bell" color="#00000" size={28}></IconButton>
                        </View>
                    </View>

                    <View style={{ height: 40, backgroundColor: '#F1F1F1', margin: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton icon={'magnify'}>

                        </IconButton>
                        <TextInput placeholder="Tìm kiếm">

                        </TextInput>
                    </View>
                </View>

                <View >
                    <View style={{ height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => setIsChoosen(0)}>
                            <Text style={isChoosen === 0 ? { color: '#F46624', fontSize: 15, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>
                                Đối soát thu hộ
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setIsChoosen(1)}>
                            <Text style={isChoosen === 1 ? { color: '#01466D', fontSize: 15, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>
                                Coming soon
                            </Text>
                        </TouchableOpacity>



                    </View>
                </View>

            </View>
            <View style={{ flex: 1, backgroundColor: '#F1F1F1', marginTop: 10 }}>
                <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ flex: 1, borderRadius: 15, borderWidth: 2, borderColor: "#19374F" }}>
                        <Picker style={{ flex: 1 }} >
                            <Picker.Item style={{ fontSize: 14, color: '"#19374F"', fontWeight: '900' }} label="1 tuần gần nhất" value={''} ></Picker.Item>
                        </Picker>

                    </View>
                    <View style={{ height: 50, justifyContent: 'center', width: 170, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: '#01466D', height: 35, alignItems: 'center', width: 135, justifyContent: 'center', borderRadius: 14 }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Đổi lịch nhận COD</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 155, width: 155 }} source={require("../../assets/not_found.png")}></Image>
                    <Text style={{ color: "#01466D", fontSize: 18, fontWeight: 'bold' }}>Không có phiên chuyển khoản nào theo thông</Text>
                    <Text style={{ color: "#01466D", fontSize: 18, fontWeight: 'bold' }}>tin tìm kiếm</Text>
                </View>
            </View>
        </View >
    )
}

export default Reconciliation
