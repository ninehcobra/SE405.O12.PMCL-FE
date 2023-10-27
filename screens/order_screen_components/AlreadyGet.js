import { View, Text } from "react-native"
import { Picker } from "@react-native-picker/picker"


const AlreadyGet = () => {
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

            <View style={{ margin: 10, borderWidth: 1, borderRadius: 15, borderColor: '#CCCCCC' }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#19374F' }}>Tổng đơn hàng GHLE đã lấy</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#19374F' }}>0  ĐH</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginLeft: 25, paddingVertical: 10, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>Đang xử lý</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>0  ĐH</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginLeft: 25, paddingVertical: 10, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>Đang giao hàng</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>0  ĐH</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginLeft: 25, paddingVertical: 10, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#F46624' }}>Chờ xác nhận giao lại</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#F46624' }}>0  ĐH</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginLeft: 25, paddingVertical: 10, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>Đã giao hàng & chưa ck</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>0  ĐH</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginLeft: 25, paddingVertical: 10, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>Đã đối soát & ck thành công</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>0  ĐH</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginLeft: 25, paddingVertical: 10, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>Đang hoàn thành</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>0  ĐH</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginLeft: 25, paddingVertical: 10, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>Hoàn hàng thành công</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>0  ĐH</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginLeft: 25, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>Hàng thất lạc - hư hỏng</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#575757' }}>0  ĐH</Text>
                </View>

            </View>
        </View>
    )
}

export default AlreadyGet