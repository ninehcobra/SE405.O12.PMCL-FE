import { Text, View, Image, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const Register = (props) => {
    const [isLoading, setIsLoading] = useState(false)

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
                            <TextInput placeholder="Vui lòng nhập email" style={{
                                color: 'blue',
                                height: 45,
                                width: 360,
                                borderWidth: 1,
                                padding: 10,
                                borderColor: 'black',
                                borderRadius: 16
                            }}></TextInput>
                            <Text style={{ marginVertical: 2, color: 'red' }}>Vui lòng nhập email</Text>
                        </View>
                        <View style={{ flex: 40, marginVertical: 2, }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{}}>Mật khẩu</Text>
                                <View style={{ flex: 1 }}></View>


                            </View>

                            <TextInput placeholder="Nhập mật khẩu của bạn" style={{
                                color: 'blue',
                                height: 45,
                                width: 360,
                                borderWidth: 1,
                                padding: 10,
                                borderColor: 'black',
                                borderRadius: 16
                            }}></TextInput>
                            <Text style={{ marginVertical: 2, color: 'red' }}>Vui lòng nhập password</Text>
                        </View>
                        <View style={{ flex: 40, marginVertical: 2 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{}}>Nhập lại mật khẩu</Text>
                                <View style={{ flex: 1 }}></View>


                            </View>

                            <TextInput placeholder="Nhập mật khẩu của bạn" style={{
                                color: 'blue',
                                height: 45,
                                width: 360,
                                borderWidth: 1,
                                padding: 10,
                                borderColor: 'black',
                                borderRadius: 16
                            }}></TextInput>
                            <Text style={{ marginVertical: 2, color: 'red' }}>Vui lòng nhập password</Text>
                        </View>
                        <View style={{ flex: 40, marginTop: 10 }}>
                            <TouchableOpacity style={{
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