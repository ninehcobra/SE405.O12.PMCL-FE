
import { View, Text, TextInput, Image, TouchableOpacity, } from "react-native"
import { Appbar, IconButton } from 'react-native-paper';
import { ScrollView } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";


const Order = () => {

    const [isChoosen, setIsChoosen] = useState(0)

    return (
        <View style={{ flex: 1 }}>
            <View >
                <View style={{ marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#01466D' }}>
                            Quản lý đơn hàng
                        </Text>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ height: 38, width: 140, backgroundColor: '#F46624', borderRadius: 12, alignItems: "center", padding: 10, flexDirection: 'row' }}>
                                <View >
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>123123123</Text>
                                </View>
                                <View style={{ marginLeft: 5 }}>
                                    <IconButton color="white" icon="chevron-down"></IconButton>
                                </View>

                            </View>
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
                    <View style={{ height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setIsChoosen(0)}>
                            <Text style={isChoosen === 0 ? { color: '#F46624', fontSize: 15, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>
                                GHLE đã lấy hàng
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setIsChoosen(1)}>
                            <Text style={isChoosen === 1 ? { color: '#F46624', fontSize: 15, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>
                                GHLE chưa lấy hàng
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setIsChoosen(2)}>
                            <Text style={isChoosen === 2 ? { color: '#F46624', fontSize: 15, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>
                                ĐH nháp
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </View>
            <View style={{ flex: 1, backgroundColor: '#F1F1F1', marginTop: 10 }}>
                <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={{ marginRight: 15, fontSize: 15, fontWeight: 'bold', color: '#606060' }}>Tổng hợp</Text>
                    </View>
                    <View style={{ flex: 1, borderRadius: 15, borderWidth: 2, borderColor: "#19374F" }}>
                        <Picker style={{ flex: 1 }} >
                            <Picker.Item style={{ fontSize: 14, color: '"#19374F"', fontWeight: '900' }} label="Chọn Quận/Huyện" value={''} ></Picker.Item>
                        </Picker>

                    </View>




                </View>
            </View>

            <IconButton color="#FFFF" onPress={() => { console.log('them') }} icon={"plus"} size={36} style={{ position: "absolute", bottom: 5, right: 10, backgroundColor: '#F26754' }}>

            </IconButton>
        </View >
    )
}

export default Order