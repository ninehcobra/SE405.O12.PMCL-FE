import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native"
import { StackActions } from "@react-navigation/native"
import { IconButton } from "react-native-paper"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { handleUpdateUserInfo, handleGetAccountInfo } from "../../services/userService"
import { getOwnShop } from "../../services/shopService"
import Toast from "react-native-toast-message"

const User = ({ navigation }) => {
    const [info, setInfo] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        id: ''
    })
    const [shopId, setShopId] = useState(null)

    const fetchMyShop = async () => {
        let res = await getOwnShop()

        if (res && res.EC === 0) {
            res.DT.map((shop) => {
                if (shop.isSelected === true) {
                    setShopId(shop.id)
                }
            })
        }

    }

    const fetchInfo = async () => {
        let data = { ...info }
        let res = await handleGetAccountInfo()

        if (res.EC === 0) {
            data.name = res.DT.name
            data.phoneNumber = res.DT.phoneNumber
            data.email = res.DT.email
            data.id = res.DT.id
        }
        setInfo(data)
    }

    useEffect(() => {
        fetchInfo()

        fetchMyShop()
        const unsubcribe = navigation.addListener('focus', () => {
            fetchMyShop()
            fetchInfo()
        })

        return unsubcribe
    }, [navigation])

    return (
        <View style={{ flex: 1 }}>
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
                    <Text style={{ fontSize: 14, color: '#01466D', fontWeight: 'bold', marginBottom: 2 }}>{info.name} - {info.phoneNumber}</Text>
                    <Text style={{ fontSize: 14, color: '#F16728', fontWeight: 'bold', marginBottom: 2 }}>ID khách hàng - {info.id}</Text>
                    <Text style={{ fontSize: 14, color: '#F16728', fontWeight: 'bold', marginBottom: 2 }}>ID shop - {shopId ? shopId : 'Chưa có cửa hàng'}</Text>
                    <Text style={{ fontSize: 13, color: '#454545', fontWeight: 'bold', marginBottom: 2 }}>{info.email}</Text>
                    <Text style={{ fontSize: 13, color: '#454545', fontWeight: 'bold' }}>Phiên bản 1.0.0</Text>
                </View>
            </View>

            <ScrollView>
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
                    <TouchableOpacity onPress={() => { navigation.navigate('Shop') }} style={{ height: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(69, 69, 69, 0.2)' }}>
                        <Image style={{ height: 35, width: 35, marginLeft: 10 }} source={require("../../assets/store.png")}></Image>
                        <Text style={{ color: '#01466D', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Quản lý cửa hàng</Text>
                        <View style={{ flex: 1 }}></View>
                        <Image style={{ height: 15, width: 15, marginRight: 10 }} source={require("../../assets/right-arrow.png")}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        Toast.show({
                            type: 'error',
                            text1: 'Thông báo',
                            text2: 'Chức năng này đang được hoàn thiện',
                            position: 'top'
                        })
                    }} style={{ height: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(69, 69, 69, 0.2)' }}>
                        <Image style={{ height: 35, width: 35, marginLeft: 10 }} source={require("../../assets/credit-card.png")}></Image>
                        <Text style={{ color: '#01466D', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Tài khoản ngân hàng</Text>
                        <View style={{ flex: 1 }}></View>
                        <Image style={{ height: 15, width: 15, marginRight: 10 }} source={require("../../assets/right-arrow.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('UserDetail') }} style={{ height: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'rgba(69, 69, 69, 0.2)' }}>
                        <Image style={{ height: 35, width: 35, marginLeft: 10 }} source={require("../../assets/edit.png")}></Image>
                        <Text style={{ color: '#01466D', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Thông tin cá nhân</Text>
                        <View style={{ flex: 1 }}></View>
                        <Image style={{ height: 15, width: 15, marginRight: 10 }} source={require("../../assets/right-arrow.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('AboutUs') }} style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ color: '#01466D', fontSize: 14, fontWeight: 'bold', marginLeft: 20 }}>Về doanh nghiệp</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View >
    )
}

export default User