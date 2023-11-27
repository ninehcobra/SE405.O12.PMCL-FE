import { Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import { StackActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useState } from "react";
import { handleLogin } from "../services/userService";
import { useDispatch, useSelector } from 'react-redux'
import SyncStorage from 'sync-storage';
import { loginRedux } from '../redux/actions/updateAction'

const Login = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [isValid, setIsValid] = useState(true)

    // const checkValidation = () => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     const passwordRegex = /^.{6,}$/;
    //     if (email && password) {
    //         if (emailRegex.test(email) && passwordRegex.test(password)) {
    //             setIsValid(true)
    //             return true
    //         }
    //         else {
    //             setIsValid(false)
    //             return false
    //         }
    //     }
    //     else {
    //         setIsValid(false)
    //         return false
    //     }
    // }

    const handleOnLogin = async () => {
        // if (checkValidation()) {
        //     Toast.show({
        //         type: 'success',
        //         text1: 'Hello',
        //         text2: `xam`,
        //         position: 'bottom'
        //     })
        // }

        try {
            let res = await handleLogin({
                email: email,
                password: password
            })
            if (res) {
                if (res.EC === 0) {

                    let data = {
                        isAuthenticated: true,
                        token: res.DT.access_token,
                        account: {
                            name: res.DT.name,
                            address: res.DT.address,
                            avatar: res.DT.avatar,
                            email: res.DT.email,
                            phoneNumber: res.DT.phoneNumber,
                            districtId: res.DT.districtId,
                            roles: res.DT.roles
                        }
                    }

                    SyncStorage.set("jwt", res.DT.access_token)

                    dispatch(loginRedux(data))

                    Toast.show({
                        type: 'success',
                        text1: 'Thông báo',
                        text2: `Đăng nhập thành công`,
                        position: 'bottom'
                    })

                    navigation.dispatch(StackActions.replace('MainScreen'))
                }
                if (res.EC === 3) {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: `Sai mật khẩu`,
                        position: 'bottom'
                    })
                }
                if (res.EC === 3) {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: `Sai mật khẩu`,
                        position: 'bottom'
                    })
                }
                if (res.EC === 1) {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: `Tài khoản không tồn tại`,
                        position: 'bottom'
                    })
                }
                if (res.EC === 2) {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: `Thiếu thông tin`,
                        position: 'bottom'
                    })
                }
                if (res.EC === -2) {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: `Lỗi từ server`,
                        position: 'bottom'
                    })
                }
            }

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: `Lỗi phát sinh khi kết nối tới server`,
                position: 'bottom'
            })
        }


    }
    const [email, setEmail] = useState(route.params ? route.params : '')
    const [password, setPassword] = useState('')

    const handleOnChange = (text, type) => {
        if (type === 'email') {
            setEmail(text)
        }
        if (type === 'password') {
            setPassword(text)
        }
    }


    return (
        <ScrollView style={{ flex: 1 }} behavior="padding" enabled>
            <View style={{ flex: 1, margin: 10 }}>
                <View style={{ flex: 35, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 250, width: 250 }} source={require("../assets/logo.png")}></Image>
                    <Text style={{ color: '#F46722', fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>ĐĂNG NHẬP</Text>
                </View>
                <View style={{ flex: 55, alignItems: 'center' }}>
                    <Text style={{ flex: 15, color: '#F46722', fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Chúc bạn một ngày mới tốt lành!</Text>
                    <View style={{ flex: 40 }}>
                        <Text style={{ marginVertical: 2 }}>Email</Text>
                        <TextInput onChangeText={(text) => handleOnChange(text, 'email')} value={email} placeholder="Vui lòng nhập email" style={{
                            color: 'blue',
                            height: 45,
                            width: 360,
                            borderWidth: 1,
                            padding: 10,
                            borderColor: 'black',
                            borderRadius: 16
                        }}></TextInput>
                        {!isValid ? <Text style={{ marginVertical: 2, color: 'red' }}>Email hoặc mật khẩu không hợp lệ</Text> : ''}
                    </View>
                    <View style={{ flex: 40, marginVertical: 2, }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{}}>Mật khẩu</Text>
                            <View style={{ flex: 1 }}></View>
                            <TouchableOpacity>
                                <Text style={{ color: '#F46722' }}>Quên mật khẩu?</Text>
                            </TouchableOpacity>

                        </View>

                        <TextInput onChangeText={(text) => handleOnChange(text, 'password')} value={password} placeholder="Nhập mật khẩu của bạn" style={{
                            color: 'blue',
                            height: 45,
                            width: 360,
                            borderWidth: 1,
                            padding: 10,
                            borderColor: 'black',
                            borderRadius: 16
                        }}></TextInput>
                        {!isValid ? <Text style={{ marginVertical: 2, color: 'red' }}>Email hoặc mật khẩu không hợp lệ</Text> : ''}
                    </View>
                    <View style={{ flex: 40, marginTop: 20 }}>
                        <TouchableOpacity onPress={handleOnLogin} style={{
                            height: 45,
                            width: 360,
                            alignItems: "center",
                            justifyContent: 'center',
                            backgroundColor: "#AFAFAF",
                            borderRadius: 16
                        }}>
                            <Text style={{ color: 'white' }}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <View style={{ textAlign: 'center', margin: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, color: '#11374C', fontWeight: 'bold' }}>Bạn đã có tài khoản chưa?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginLeft: 5 }} >
                                <Text style={{ color: '#F46722', textAlign: 'center', fontWeight: 'bold' }}>Đăng ký ngay</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ flex: 25 }}></View>

                </View >
                <View style={{ flex: 10, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>Đây là đồ án môn học SE405.O12.PMCL</Text>
                </View>

            </View >
        </ScrollView>

    )
}

export default Login