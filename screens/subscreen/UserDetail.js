import { View, Text, TouchableOpacity, Image, Dimensions, TextInput } from "react-native"
import { useEffect, useState } from "react"
import { handleGetAccountInfo } from "../../services/userService"
import { set } from "sync-storage"
import { handleUpdateUserInfo } from "../../services/userService"
import { StackActions } from "@react-navigation/native"
import Toast from "react-native-toast-message"

const UserDetail = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')

    const [userInfo, setUserInfo] = useState({
        name: '',
        phoneNumber: '',
        email: ''
    })
    const [isValid, setIsValid] = useState(false)

    const fetchInfo = async () => {
        let data = { ...userInfo }
        let res = await handleGetAccountInfo()
        console.log(res.DT)
        if (res.EC === 0) {
            data.name = res.DT.name
            data.phoneNumber = res.DT.phoneNumber
            data.email = res.DT.email
        }
        setUserInfo(data)
    }

    const validationUserinfo = (data) => {
        for (const key in data) {
            if (data[key] === null || data[key] === '') {
                setIsValid(false)
                return false; 1
            }
        }

        setIsValid(true)
        return true;

    }


    useEffect(() => {
        fetchInfo()

    }, [])

    const handleOnChange = (value, type) => {
        let data = { ...userInfo }
        data[type] = value
        setUserInfo(data)
        validationUserinfo(data)
    }

    const onUpdateUserInfo = async () => {
        let res = await handleUpdateUserInfo(userInfo.name, userInfo.phoneNumber)
        console.log(res)
        if (res === 0) {
            await fetchInfo()

        }
        Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: `Cập nhật thành công vui lòng đăng nhập lại để đồng bộ dữ liệu`,
            position: 'top'
        })
        navigation.dispatch(StackActions.replace('Login'))
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, height: 55, width: width }}>
                <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', padding: 10, backgroundColor: 'white' }}>
                    <View style={{ flex: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} >
                            <Image style={{ height: 20, width: 20 }} source={require("../../assets/left-arrow.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F4656' }}>Thông tin cá nhân</Text>
                    </View>
                    <View style={{ flex: 20 }}></View>
                </View>
            </View>
            <View style={{ marginBottom: 110, marginTop: 55, padding: 10 }}>
                <View>
                    <Text>Họ tên</Text>
                    <TextInput onChangeText={(text) => handleOnChange(text, 'name')} value={userInfo.name} style={{ height: 35, borderWidth: 1, borderRadius: 20, paddingLeft: 12, borderColor: '#1F4656', marginTop: 4, color: '#1F4656' }}></TextInput>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Số điện thoại</Text>
                    <TextInput onChangeText={(text) => handleOnChange(text, 'phoneNumber')} value={userInfo.phoneNumber} style={{ height: 35, borderWidth: 1, borderRadius: 20, paddingLeft: 12, borderColor: '#1F4656', marginTop: 4, color: '#1F4656' }}></TextInput>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Email</Text>
                    <TextInput editable={false} value={userInfo.email} style={{ height: 35, borderWidth: 1, borderRadius: 20, paddingLeft: 12, borderColor: '#1F4656', marginTop: 4, color: '#1F4656' }}></TextInput>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>Mật khẩu</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('ChangePassword') }}>
                            <Text style={{ color: '#DF6032' }}>Đổi mật khẩu</Text>
                        </TouchableOpacity>

                    </View>
                    <TextInput value="**********" editable={false} style={{ height: 35, borderRadius: 20, paddingLeft: 12, marginTop: 4, color: '#1F4656', backgroundColor: '#80808033' }}></TextInput>
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1, width: width }}>

                <TouchableOpacity onPress={onUpdateUserInfo} disabled={!isValid} style={isValid ? { height: 55, alignItems: 'center', flexDirection: 'row', backgroundColor: '#DF6032', flex: 1, } :
                    { height: 55, alignItems: 'center', flexDirection: 'row', backgroundColor: '#CCCCCC', flex: 1, }
                }>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 55 }}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>Cập nhật</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserDetail