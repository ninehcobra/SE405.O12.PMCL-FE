import { Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import { StackActions } from '@react-navigation/native';


const Login = ({ navigation }) => {
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
                            <TouchableOpacity>
                                <Text style={{ color: '#F46722' }}>Quên mật khẩu?</Text>
                            </TouchableOpacity>

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
                    <View style={{ flex: 40, marginTop: 20 }}>
                        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.replace('MainScreen'))} style={{
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
                            <TouchableOpacity onPress={() => navigation.navigate('Register', {
                                id: 1,
                                name: 'cac'
                            })} style={{ marginLeft: 5 }} >
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