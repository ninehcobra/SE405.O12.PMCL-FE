import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native"
import { StackActions } from "@react-navigation/native"
import { IconButton } from "react-native-paper"

const User = ({ navigation }) => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <View >
                <View style={{ marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#01466D' }}>
                            Tài khoản cửa hàng
                        </Text>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.replace('Login'))} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                            <Image source={require("../../assets/sign_out.png")} style={{ marginRight: 5, height: 20, width: 20 }}></Image>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#01466D' }}>
                                Đăng xuất
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* User Info */}
            <View style={{ height: 135, flexDirection: 'row' }}>
                <View style={{ flex: 20, alignItems: 'center', marginTop: 10 }}>
                    <Image source={require("../../assets/avatar.png")} style={{ height: 65, width: 65 }}></Image>
                </View>
                <View style={{ flex: 80, marginTop: 10 }}>
                    <Text style={{ fontSize: 14, color: '#01466D', fontWeight: 'bold', marginBottom: 2 }}>Truong Nguyen Cong Chinh - 0797260870</Text>
                    <Text style={{ fontSize: 14, color: '#F16728', fontWeight: 'bold', marginBottom: 2 }}>ID khách hàng - 3583804</Text>
                    <Text style={{ fontSize: 14, color: '#F16728', fontWeight: 'bold', marginBottom: 2 }}>ID shop - 38665544</Text>
                    <Text style={{ fontSize: 13, color: '#454545', fontWeight: 'bold', marginBottom: 2 }}>congchinh2903@gmail.com</Text>
                    <Text style={{ fontSize: 13, color: '#454545', fontWeight: 'bold' }}>Phiên bản 1.0.0</Text>
                </View>
            </View>

            <View style={{ marginBottom: 10, height: 75, backgroundColor: "#60B07D", marginLeft: 10, borderTopLeftRadius: 40, borderBottomLeftRadius: 40, flexDirection: 'row' }}>
                <View style={{ height: 55, width: 55, backgroundColor: 'green', margin: 10, borderRadius: 55, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#01466D' }}>
                    <Image source={require("../../assets/incentive.png")} style={{ height: 40, width: 40 }}></Image>
                </View>
                <View style={{ flex: 50, justifyContent: 'center' }}>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 11, color: 'white' }}>Nhóm ưu đãi</Text>
                        <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Đồng hành</Text>
                    </View>

                </View>
                <View style={{ flex: 50, justifyContent: 'center' }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 11, color: 'white' }}>Điểm tích lũy</Text>
                        <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>0</Text>
                    </View>
                </View>
            </View>

            {/* Account Auth */}
            <View style={{ height: 180, margin: 10, borderRadius: 8, flexDirection: 'row', borderWidth: 1, borderColor: '#454545' }}>
                <View style={{ flex: 25, marginTop: 30 }}>
                    <Image source={require("../../assets/authentication.png")} style={{ height: 80, width: 80 }}></Image>
                </View>
                <View style={{ flex: 75, marginTop: 38 }}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Xác thực tài khoản của bạn</Text>
                    <Text style={{ fontSize: 16, color: '#454545', fontWeight: '500' }}>Xác thực để tận hưởng các</Text>
                    <Text style={{ fontSize: 16, color: '#454545', fontWeight: '500' }}>quyền lợi đặc biệt từ GHLE.</Text>
                    <TouchableOpacity style={{ height: 42, backgroundColor: '#F16728', width: 230, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 16, color: 'white', }}>Xác thực ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View >
                <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(69, 69, 69, 0.2)' }}>
                    <Image style={{ height: 35, width: 35, marginLeft: 10 }} source={require("../../assets/store.png")}></Image>
                    <Text style={{ color: '#01466D', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Quản lý cửa hàng</Text>
                    <View style={{ flex: 1 }}></View>
                    <Image style={{ height: 15, width: 15, marginRight: 10 }} source={require("../../assets/right-arrow.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(69, 69, 69, 0.2)' }}>
                    <Image style={{ height: 35, width: 35, marginLeft: 10 }} source={require("../../assets/profile.png")}></Image>
                    <Text style={{ color: '#01466D', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Phân quyền</Text>
                    <View style={{ flex: 1 }}></View>
                    <Image style={{ height: 15, width: 15, marginRight: 10 }} source={require("../../assets/right-arrow.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(69, 69, 69, 0.2)' }}>
                    <Image style={{ height: 35, width: 35, marginLeft: 10 }} source={require("../../assets/credit-card.png")}></Image>
                    <Text style={{ color: '#01466D', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Tài khoản ngân hàng</Text>
                    <View style={{ flex: 1 }}></View>
                    <Image style={{ height: 15, width: 15, marginRight: 10 }} source={require("../../assets/right-arrow.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(69, 69, 69, 0.2)' }}>
                    <Image style={{ height: 35, width: 35, marginLeft: 10 }} source={require("../../assets/edit.png")}></Image>
                    <Text style={{ color: '#01466D', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Thông tin cá nhân</Text>
                    <View style={{ flex: 1 }}></View>
                    <Image style={{ height: 15, width: 15, marginRight: 10 }} source={require("../../assets/right-arrow.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(69, 69, 69, 0.2)' }}>
                    <Image style={{ height: 35, width: 35, marginLeft: 10 }} source={require("../../assets/arrows.png")}></Image>
                    <Text style={{ color: '#01466D', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Thiết lập măc định khi lên đơn</Text>
                    <View style={{ flex: 1 }}></View>
                    <Image style={{ height: 15, width: 15, marginRight: 10 }} source={require("../../assets/right-arrow.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ color: '#01466D', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Về doanh nghiệp</Text>
                </TouchableOpacity>
            </View>

        </ScrollView >
    )
}

export default User