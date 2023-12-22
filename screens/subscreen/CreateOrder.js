import { View, Text, Image, TouchableOpacity, TextInput, Dimensions, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const CreateOrder = ({ navigation }) => {

    const [isCollapseAddressInfo, setIsCollapseAddressInfo] = useState(false)
    const [isCollapseOrderInfo, setIsCollapseOrderInfo] = useState(false)

    const { height, width } = Dimensions.get('window')
    // position: 'absolute', top: 0, left: 0, zIndex: 1
    return (

        <View style={{ backgroundColor: '#DCDCDC', minHeight: height }}>
            <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, height: 55, width: width }}>
                <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', padding: 10, backgroundColor: '#CCCCCC' }}>
                    <View style={{ flex: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} >
                            <Image style={{ height: 20, width: 20 }} source={require("../../assets/left-arrow.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1F4656' }}>Tạo đơn hàng</Text>
                    </View>
                    <View style={{ flex: 20 }}>

                    </View>

                </View>
            </View>
            <ScrollView>
                <View style={{ margin: 8, borderWidth: 1, borderColor: '#80808033', backgroundColor: 'white', borderRadius: 16, marginTop: 63 }}>
                    <View style={{ padding: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>| {isCollapseAddressInfo ? 'ĐỊA CHỈ' : "THÔNG TIN BÊN NHẬN"}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsCollapseAddressInfo(!isCollapseAddressInfo)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#1F4656', fontSize: 14 }}>{isCollapseAddressInfo ? 'Mở rộng' : 'Thu gọn'}</Text>
                                {isCollapseAddressInfo ?
                                    <Image style={{ height: 16, width: 16, marginLeft: 8, marginTop: 4 }} source={require("../../assets/up-arrow.png")} /> :
                                    <Image style={{ height: 16, width: 16, marginLeft: 8, marginTop: 4 }} source={require("../../assets/down-arrow.png")} />
                                }
                            </TouchableOpacity>
                        </View>

                        {
                            isCollapseAddressInfo
                                ?
                                <View>
                                    <View style={{ paddingLeft: 8, marginTop: 12 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Bên nhận:</Text>
                                            <Text style={{ flex: 1, color: '#1F4656', fontWeight: 600 }}>0797260870 - Trương Nguyễn Công Chính ádasd</Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingLeft: 8, marginTop: 12 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Gửi tại bưu cục:</Text>
                                            <Text style={{ flex: 1, color: '#1F4656', fontWeight: 600 }}>0797260870 - Trương Nguyễn Công Chính ádasd</Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={{ paddingLeft: 8, marginTop: 12 }}>
                                    <View style={{ flexDirection: 'row', height: 28 }}>
                                        <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Số điện thoại</Text>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1 }}>
                                            <TextInput placeholder="Nhập sđt bên nhận" style={{ flex: 1, fontSize: 14 }} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Họ tên</Text>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1 }}>
                                            <TextInput placeholder="Nhập họ tên bên nhận" style={{ flex: 1, fontSize: 14 }} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Địa chỉ</Text>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1 }}>
                                            <TextInput placeholder="Nhập địa chỉ" style={{ flex: 1, fontSize: 14 }} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                            <Picker>
                                                <Picker.Item style={{ color: '#808080' }} key={0} label="Chọn tỉnh / thành phố" value={0} />
                                            </Picker>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                            <Picker>
                                                <Picker.Item style={{ color: '#808080' }} key={0} label="Chọn quận huyện" value={0} />
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                        }
                    </View>

                    {
                        isCollapseAddressInfo
                            ?
                            ""
                            :
                            <View>
                                <View style={{ marginTop: 12, padding: 8 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>| THÔNG TIN LẤY HÀNG</Text>
                                        </View>
                                    </View>

                                    <View style={{ paddingLeft: 8, marginTop: 4 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>0797260870 - 0797260870</Text>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>Hẻm 224, ấp 3 xã An Phước</Text>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>Long Thành Đồng Nai</Text>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>0797260870 - 0797260870</Text>
                                            </View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <TouchableOpacity>
                                                    <View style={{ height: 40, width: 40, justifyContent: 'center', backgroundColor: '#80808033', alignItems: 'center', borderRadius: 20 }}>
                                                        <Image style={{ height: 18, width: 18 }} source={require("../../assets/pencil.png")} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>


                                        <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                            <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                                <Picker>
                                                    <Picker.Item style={{ color: '#5D5D5D' }} key={0} label="Chọn ca lấy hàng" value={0} />
                                                </Picker>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                            <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                                <Picker>
                                                    <Picker.Item style={{ color: '#5D5D5D' }} key={0} label="Chọn bưu cục gửi hàng" value={0} />
                                                </Picker>
                                            </View>
                                        </View>


                                    </View>

                                </View>
                                <TouchableOpacity style={{
                                    height: 40, backgroundColor: '#AFAFAF', borderBottomRightRadius: 14, borderBottomLeftRadius: 14, marginTop: 8, justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>TIẾP THEO</Text>
                                </TouchableOpacity>
                            </View>
                    }

                </View>

                <View style={{ margin: 8, borderWidth: 1, borderColor: '#80808033', backgroundColor: 'white', borderRadius: 16 }}>
                    <View style={{ padding: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>| THÔNG HÀNG HÓA</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsCollapseOrderInfo(!isCollapseOrderInfo)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#1F4656', fontSize: 14 }}>{isCollapseOrderInfo ? 'Mở rộng' : 'Thu gọn'}</Text>
                                {isCollapseOrderInfo ?
                                    <Image style={{ height: 16, width: 16, marginLeft: 8, marginTop: 4 }} source={require("../../assets/up-arrow.png")} /> :
                                    <Image style={{ height: 16, width: 16, marginLeft: 8, marginTop: 4 }} source={require("../../assets/down-arrow.png")} />
                                }
                            </TouchableOpacity>
                        </View>

                        {
                            isCollapseOrderInfo
                                ?
                                ""
                                :
                                <View style={{ paddingLeft: 8, marginTop: 12 }}>
                                    <View style={{ flexDirection: 'row', height: 28 }}>
                                        <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Số điện thoại</Text>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1 }}>
                                            <TextInput placeholder="Nhập sđt bên nhận" style={{ flex: 1, fontSize: 14 }} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Họ tên</Text>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1 }}>
                                            <TextInput placeholder="Nhập họ tên bên nhận" style={{ flex: 1, fontSize: 14 }} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Địa chỉ</Text>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1 }}>
                                            <TextInput placeholder="Nhập địa chỉ" style={{ flex: 1, fontSize: 14 }} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                            <Picker>
                                                <Picker.Item style={{ color: '#808080' }} key={0} label="Chọn tỉnh / thành phố" value={0} />
                                            </Picker>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                            <Picker>
                                                <Picker.Item style={{ color: '#808080' }} key={0} label="Chọn quận huyện" value={0} />
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                        }
                    </View>

                    {
                        isCollapseOrderInfo
                            ?
                            ""
                            :
                            <View>
                                <View style={{ marginTop: 12, padding: 8 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>| THÔNG TIN LẤY HÀNG</Text>
                                        </View>
                                    </View>

                                    <View style={{ paddingLeft: 8, marginTop: 4 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>0797260870 - 0797260870</Text>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>Hẻm 224, ấp 3 xã An Phước</Text>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>Long Thành Đồng Nai</Text>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>0797260870 - 0797260870</Text>
                                            </View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <TouchableOpacity>
                                                    <View style={{ height: 40, width: 40, justifyContent: 'center', backgroundColor: '#80808033', alignItems: 'center', borderRadius: 20 }}>
                                                        <Image style={{ height: 18, width: 18 }} source={require("../../assets/pencil.png")} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>


                                        <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                            <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                                <Picker>
                                                    <Picker.Item style={{ color: '#5D5D5D' }} key={0} label="Chọn ca lấy hàng" value={0} />
                                                </Picker>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                            <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                                <Picker>
                                                    <Picker.Item style={{ color: '#5D5D5D' }} key={0} label="Chọn bưu cục gửi hàng" value={0} />
                                                </Picker>
                                            </View>
                                        </View>


                                    </View>

                                </View>
                                <TouchableOpacity style={{
                                    height: 40, backgroundColor: '#AFAFAF', borderBottomRightRadius: 14, borderBottomLeftRadius: 14, marginTop: 8, justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>TIẾP THEO</Text>
                                </TouchableOpacity>
                            </View>
                    }

                </View>
            </ScrollView>
        </View >

    )
}

export default CreateOrder