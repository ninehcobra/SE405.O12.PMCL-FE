import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import { Appbar, IconButton } from 'react-native-paper';
import { ScrollView } from "react-native";
import { useState } from "react";

const Home = () => {
    const [isChoosen, setIsChoosen] = useState(0)


    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#01466D' }}>
                            Tổng quát
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

                    <View style={{ height: 100, backgroundColor: '#FFF0D3', borderRadius: 20, margin: 10, flexDirection: 'row' }}>
                        <View style={{ flex: 40, alignItems: "center", justifyContent: "center" }}>
                            <Image source={require('../../assets/memelove.png')} style={{ height: 115, width: 115 }} ></Image>
                        </View>
                        <View style={{ flex: 60, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: '#6F4219', fontWeight: 'bold' }}>Sẵn sàng đua cùng GHLE</Text>
                            <Text style={{ color: '#6F4219', fontWeight: 'bold' }}>Các chương trình sẽ sớm bắt đầu</Text>
                        </View>

                    </View>

                    <View >
                        <View style={{ height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setIsChoosen(0)}>
                                <Text style={isChoosen === 0 ? { color: '#F46624', fontSize: 17, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>Dòng tiền</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setIsChoosen(1)}>
                                <Text style={isChoosen === 1 ? { color: '#F46624', fontSize: 17, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>Vận hành</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {
                        isChoosen === 0 ?
                            < View style={{ height: 500, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                                <View style={{ marginBottom: 5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#01466D' }}>
                                        Dòng tiền
                                    </Text>
                                </View>
                                <View style={{ flex: 1, backgroundColor: "#19374F", borderRadius: 20, height: 350, paddingTop: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <View style={{ height: 18, backgroundColor: 'red', width: 6 }}>
                                        </View>
                                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginLeft: 10 }}>
                                            Số dư hiện tại (GHLE sắp chuyển cho khách)
                                        </Text>
                                    </View>

                                    <View style={{ height: 200, marginLeft: 28 }}>
                                        <View style={{ height: 20, marginTop: 8, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'white' }}>Tiền thu hô (COD)</Text>

                                            </View>
                                            <View style={{ flex: 1 }}></View>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                        </View>

                                        <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'white' }}>Giao thất bại - thu tiền</Text>

                                            </View>
                                            <View style={{ flex: 1 }}></View>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                        </View>

                                        <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'white' }}>Phí dịch vụ tạm thu</Text>

                                            </View>
                                            <View style={{ flex: 1 }}></View>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                        </View>

                                        <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'white' }}>Nợ tồn</Text>

                                            </View>
                                            <View style={{ flex: 1 }}></View>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                        </View>
                                        <View style={{ borderBottomWidth: 1, marginRight: 10, marginTop: 5, borderColor: 'white' }}></View>
                                        <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'white' }}>Tổng số dư hoàn tất hiện tại</Text>

                                            </View>
                                            <View style={{ flex: 1 }}></View>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                        </View>

                                        <View style={{ height: 60, backgroundColor: 'white', marginRight: 28, borderRadius: 20, marginTop: 10, justifyContent: 'center', padding: 10 }}>
                                            <Text style={{ fontWeight: 'bold', color: "#F46624" }}>*Tổng số dư hiện tại=Tiền thu hộ - Phí dịch vụ tạm thu - Nợ tồn</Text>
                                        </View>


                                    </View>



                                    {/* Số dư đang xử lý */}
                                    <View style={{ borderBottomWidth: 1, marginRight: 10, marginTop: 5, borderColor: 'white', marginLeft: 28 }}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                                        <View style={{ height: 18, backgroundColor: 'red', width: 6 }}>
                                        </View>
                                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginLeft: 10 }}>
                                            Số dư đang xử lý (GHLE giữ lại)
                                        </Text>
                                    </View>
                                    <View style={{ height: 200, marginLeft: 28 }}>
                                        <View style={{ height: 20, marginTop: 8, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'white' }}>Số dư qua ví</Text>

                                            </View>
                                            <View style={{ flex: 1 }}></View>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                        </View>

                                        <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'white' }}>Giao thất bại - thu tiền / đang xử lý</Text>

                                            </View>
                                            <View style={{ flex: 1 }}></View>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                        </View>

                                        <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'white' }}>COD hàng lưu kho / đang xử lý</Text>

                                            </View>
                                            <View style={{ flex: 1 }}></View>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                        </View>

                                        <View style={{ borderBottomWidth: 1, marginRight: 10, marginTop: 5, borderColor: 'white' }}></View>
                                        <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: 'white' }}>Tổng số dư còn lại</Text>

                                            </View>
                                            <View style={{ flex: 1 }}></View>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                        </View>

                                        <View style={{ height: 60, backgroundColor: 'white', marginRight: 28, borderRadius: 20, marginTop: 10, justifyContent: 'center', padding: 10 }}>
                                            <Text style={{ fontWeight: 'bold', color: "#F46624" }}>*Tổng số dư hiện tại=Số dư ví - COD hàng lưu kho / đang xử lý</Text>
                                        </View>


                                    </View>
                                </View>




                            </View>

                            :
                            <View style={{ height: 400, backgroundColor: 'green', marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    <Text>
                                        Vận hành
                                    </Text>
                                </View>
                            </View>
                    }
                </View>

            </View>
        </ScrollView >
    )
}

export default Home
