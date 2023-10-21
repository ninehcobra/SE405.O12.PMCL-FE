import { Text, View, Image, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const Register = (props) => {
    const [isLoading, setIsLoading] = useState(false)


    // state quản lý input

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')


    // state quản lý lỗi

    const [error, setError] = useState(0)


    const onRegister = () => {
        if (validationInput()) {

        }
    }

    const validationInput = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^.{6,}$/;
        if (email === "" || password === "" || rePassword === "") {
            setError(1)
            return false
        }
        else {
            if (emailRegex.test(email) === false) {
                setError(2)
                return false
            }
            else if (passwordRegex.test(password) === false) {
                setError(3)
                return false
            }
            else if (password !== rePassword) {
                setError(4)
                return false
            }
            setError('')
            return true
        }

    }

    const onChangeText = (text, type) => {
        if (type === 'email') { setEmail(text) }
        else if (type === 'password') { setPassword(text) }
        else { setRePassword(text) }
    }


    useEffect(() => {
        setTimeout(() => setIsLoading(true), 3000)
    }, [isLoading])
    return (
        isLoading ?
            <ScrollView style={{ flex: 1 }} behavior="padding" enabled>
                <View style={{ flex: 1, margin: 10 }}>
                    <View style={{ flex: 35, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 250, width: 250 }} source={require("../assets/logo.png")}></Image>
                        <Text style={{ color: '#F46722', fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>ĐĂNG KÝ</Text>
                    </View>
                    <View style={{ flex: 55, alignItems: 'center' }}>

                        <View style={{ flex: 40 }}>
                            <Text style={{ marginVertical: 2 }}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={(text) => onChangeText(text, 'email')}
                                placeholder="Vui lòng nhập email" style={{
                                    color: 'black',
                                    height: 45,
                                    width: 360,
                                    borderWidth: 1,
                                    padding: 10,
                                    borderColor: 'black',
                                    borderRadius: 16
                                }}></TextInput>

                            {
                                error === 1 && email === '' ?
                                    <Text style={{ marginVertical: 2, color: 'red' }}>Vui lòng nhập đầy đủ thông tin</Text> :
                                    error === 2 ?
                                        <Text style={{ marginVertical: 2, color: 'red' }}>Email không hợp lệ vui lòng thử lại</Text> :
                                        <View />
                            }

                        </View>
                        <View style={{ flex: 40, marginVertical: 2, }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{}}>Mật khẩu</Text>
                                <View style={{ flex: 1 }}></View>


                            </View>

                            <TextInput placeholder="Nhập mật khẩu của bạn"
                                value={password}
                                onChangeText={(text) => onChangeText(text, 'password')}
                                style={{
                                    color: 'black',
                                    height: 45,
                                    width: 360,
                                    borderWidth: 1,
                                    padding: 10,
                                    borderColor: 'black',
                                    borderRadius: 16
                                }}></TextInput>
                            {
                                error === 1 && password === "" ?
                                    <Text style={{ marginVertical: 2, color: 'red' }}>Vui lòng nhập đầy đủ thông tin</Text> :
                                    error === 3 ?
                                        <Text style={{ marginVertical: 2, color: 'red' }}>Mật khẩu phải có tối thiểu 6 ký tự</Text> :
                                        <View />
                            }
                        </View>
                        <View style={{ flex: 40, marginVertical: 2 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{}}>Nhập lại mật khẩu</Text>
                                <View style={{ flex: 1 }}></View>


                            </View>

                            <TextInput placeholder="Nhập lại mật khẩu của bạn"
                                value={rePassword}
                                onChangeText={(text) => onChangeText(text, 'rePassword')}
                                style={{
                                    color: 'black',
                                    height: 45,
                                    width: 360,
                                    borderWidth: 1,
                                    padding: 10,
                                    borderColor: 'black',
                                    borderRadius: 16
                                }}></TextInput>
                            {
                                error === 1 && rePassword === "" ?
                                    <Text style={{ marginVertical: 2, color: 'red' }}>Vui lòng nhập đầy đủ thông tin</Text> :
                                    error === 4 ?
                                        <Text style={{ marginVertical: 2, color: 'red' }}>Mật khẩu không trùng khớp</Text> :
                                        <View />
                            }
                        </View>
                        <View


                            style={{ flex: 40, marginTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => onRegister()}
                                style={{
                                    height: 45,
                                    width: 360,
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    backgroundColor: "#AFAFAF",
                                    borderRadius: 16
                                }}>
                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Đăng ký</Text>
                            </TouchableOpacity>
                            <View style={{ textAlign: 'center', margin: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, color: '#11374C', fontWeight: 'bold' }}>Bạn đã có tài khoản!</Text>
                                <TouchableOpacity onPress={() => setIsLoading(false)} style={{ marginLeft: 5 }} >
                                    <Text style={{ color: '#F46722', textAlign: 'center', fontWeight: 'bold' }}>Đăng nhập ngay</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ flex: 25 }}></View>

                    </View >


                </View >
            </ScrollView>
            :
            <Loading text={'Đang xử lý'}></Loading>

    )
}

export default Register