import { Text, View, Image, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { getAllProvince, getDistrictById } from "../services/addressService";
import { handleRegister } from "../services/userService";
import Toast from 'react-native-toast-message';


const Register = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true)

    // state quản lý input

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])


    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');


    // state quản lý lỗi

    const [error, setError] = useState(0)


    const onRegister = async () => {
        // console.log('email', email, 'phonenumber', phoneNumber, 'name', fullName, 'address', address, 'province', selectedProvince, 'district', selectedDistrict, 'password', password, 'repass', rePassword)
        if (validationInput()) {
            let res = await handleRegister({
                email: email,
                password: password,
                address: address,
                phoneNumber: phoneNumber,
                districtId: selectedDistrict,
                name: fullName
            })


            if (res) {
                if (res.EC === 0) {
                    Toast.show({
                        text1: 'Thông báo',
                        text2: 'Tạo tài khoản thành công 👋',
                        position: 'bottom',
                    })
                    navigation.navigate("Login", { email: email })
                }
                if (res.EC === 2) {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: 'Thông tin bị thiếu 👋',
                        position: 'top'
                    })
                }
                if (res.EC === 1) {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: 'Email này đã tồn tại trên hệ thống ❗',
                        position: 'top'
                    })
                }
                if (res.EC === -2) {
                    Toast.show({
                        type: 'error',
                        text1: 'Thông báo',
                        text2: 'Lỗi phát sinh từ server ❗',
                        position: 'top'
                    })
                }
            }
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
        if (type === 'password') { setPassword(text) }
        if (type === 'phoneNumber') { setPhoneNumber(text) }
        if (type === 'fullName') { setFullName(text) }
        if (type === 'address') { setAddress(text) }
        if (type === 'rePassword') { setRePassword(text) }
    }


    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const responseData = await getAllProvince();
                setProvince(responseData.data.data);
            } catch (error) {
                // Xử lý lỗi nếu cần thiết
                console.log('Lỗi khi lấy dữ liệutừ API:', error);
            }
        };

        const fetchDistrict = async (id) => {
            try {
                const responseData = await getDistrictById(id);
                setDistrict(responseData.data);
            } catch (error) {
                // Xử lý lỗi nếu cần thiết
                console.log('Lỗi khi lấy dữ liệutừ API:', error);
            }
        }


        console.log(selectedProvince)
        if (selectedProvince === '') {
            fetchProvince();
        }
        else {
            fetchDistrict(selectedProvince)
        }

    }, [selectedProvince])


    return (

        <ScrollView style={{ flex: 1 }} behavior="padding" enabled>
            <View style={{ flex: 1, margin: 10 }}>
                <View style={{ flex: 35, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ height: 250, width: 250 }} source={require("../assets/logo.png")}></Image>
                    <Text style={{ color: '#F46722', fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>ĐĂNG KÝ</Text>
                </View>
                <View style={{ flex: 55, alignItems: 'center' }}>

                    {/* Email */}
                    <View style={{ flex: 40 }}>
                        <Text style={{ marginVertical: 2 }}>Email</Text>
                        <TextInput
                            spellCheck={false}
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

                    <View style={{ flex: 40 }}>
                        <Text style={{ marginVertical: 2 }}>Số điện thoại</Text>
                        <TextInput
                            spellCheck={false}
                            value={phoneNumber}
                            onChangeText={(text) => onChangeText(text, 'phoneNumber')}
                            placeholder="Vui lòng nhập số điện thoại của bạn" style={{
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


                    <View style={{ flex: 40 }}>
                        <Text style={{ marginVertical: 2 }}>Họ và tên</Text>
                        <TextInput
                            spellCheck={false}
                            value={fullName}
                            onChangeText={(text) => onChangeText(text, 'fullName')}
                            placeholder="Vui lòng nhập đầy đủ họ và tên" style={{
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

                    <View style={{ flex: 40 }}>
                        <Text style={{ marginVertical: 2 }}>Địa chỉ</Text>
                        <TextInput
                            spellCheck={false}
                            value={address}
                            onChangeText={(text) => onChangeText(text, 'address')}
                            placeholder="Vui lòng nhập địa chỉ chính xác của bạn" style={{
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

                    <View style={{ flex: 40 }}>
                        <Text style={{ marginVertical: 2 }}>Tỉnh/Thành phố</Text>
                        <View style={{
                            borderWidth: 1, borderColor: 'black',
                            borderRadius: 16,
                            height: 45,
                            width: 360,
                            padding: 10,
                            justifyContent: 'center'
                        }}>
                            <Picker
                                style={{
                                    color: 'black',
                                }}
                                selectedValue={selectedProvince}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedProvince(itemValue)
                                }>
                                <Picker.Item key={0} label="Chọn tỉnh" value="" />
                                {province ? province.map((item) => {
                                    return (
                                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                                    )
                                }) : ''}
                            </Picker>
                        </View>
                    </View>


                    <View style={{ flex: 40 }}>
                        <Text style={{ marginVertical: 2 }}>Quận/Huyện</Text>
                        <View style={{
                            borderWidth: 1, borderColor: 'black',
                            borderRadius: 16,
                            height: 45,
                            width: 360,
                            padding: 10,
                            justifyContent: 'center'
                        }}>
                            <Picker
                                style={{
                                    color: 'black',
                                }}
                                selectedValue={selectedDistrict}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedDistrict(itemValue)
                                }>
                                <Picker.Item key={0} label="Chọn Quận/Huyện" value={''} />
                                {district ? district.map((item) => {
                                    return (
                                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                                    )
                                }) : ''}
                            </Picker>
                        </View>
                    </View>







                    <View style={{ flex: 40, marginVertical: 2, }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{}}>Mật khẩu</Text>
                            <View style={{ flex: 1 }}></View>


                        </View>

                        <TextInput
                            spellCheck={false} placeholder="Nhập mật khẩu của bạn"
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

                        <TextInput
                            spellCheck={false} placeholder="Nhập lại mật khẩu của bạn"
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
                            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginLeft: 5 }} >
                                <Text style={{ color: '#F46722', textAlign: 'center', fontWeight: 'bold' }}>Đăng nhập ngay</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ flex: 25 }}></View>

                </View >


            </View >
        </ScrollView>


    )
}

export default Register