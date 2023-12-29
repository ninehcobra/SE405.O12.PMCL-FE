import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native"

const AboutUs = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')
    return (
        <View>
            <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, height: 55, width: width }}>
                <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', padding: 10, backgroundColor: 'white' }}>
                    <View style={{ flex: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} >
                            <Image style={{ height: 20, width: 20 }} source={require("../../assets/left-arrow.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F4656' }}>Về doanh nghiệp</Text>
                    </View>
                    <View style={{ flex: 20 }}></View>
                </View>
            </View>
            <View style={{ marginBottom: 110, marginTop: 65, padding: 10 }}>
                <Text style={{ color: '#DF6032', fontWeight: 500, fontSize: 16 }}>CÔNG TY CỔ PHẦN DỊCH VỤ GIAO HÀNG LẸ</Text>
                <Text style={{ fontWeight: 500, color: '#1F4656' }}>Công ty giao nhận đầu tiên tại Việt Nam được thành lập với sứ mệnh phục vụ nhu cầu vận chuyển chuyên nghiệp của
                    các đối tác thương mại điện tử trên toàn quốc.
                </Text>
                <View style={{ borderBottomWidth: 1, marginTop: 12, borderColor: '#80808033' }}></View>
                <Text style={{ fontWeight: 500, color: '#1F4656', marginTop: 8 }}>Trụ sợ chính: Hẻm 224, ấp 3, xã An Phước, huyện Long Thành, tỉnh Đồng Nai</Text>
                <Text style={{ fontWeight: 500, color: '#1F4656' }}>Email: congchinh2903@gmail.com</Text>
            </View>
        </View>
    )
}

export default AboutUs