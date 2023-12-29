import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Image, Dimensions, TextInput } from "react-native"
import { handleChangePassword } from "../../services/userService"
import Toast from "react-native-toast-message"

const ChangePassword = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')

    const [isValid, setIsValid] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reNewPassword, setReNewPassword] = useState('')

    const validatePasswords = () => {
        if (!oldPassword || !newPassword || !reNewPassword) {
            return false;
        }

        return true;
    };

    useEffect(() => {
        setIsValid(validatePasswords())
    }, [oldPassword, newPassword, reNewPassword])

    const onChangePassword = async () => {
        if (newPassword !== reNewPassword) {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: `Mật khẩu không trùng khớp`,
                position: 'top'
            })
        }
        else {
            let res = await handleChangePassword(oldPassword, newPassword)
            if (res && res.EC === 3) {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: `Mật khẩu cũ không đúng`,
                    position: 'top'
                })
            }
            else if (res && res.EC === 0) {
                Toast.show({
                    type: 'success',
                    text1: 'Thông báo',
                    text2: `Đổi mật khẩu thành công`,
                    position: 'top'
                })
                navigation.goBack()
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, height: 55, width: width }}>
                <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', padding: 10, backgroundColor: 'white' }}>
                    <View style={{ flex: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} >
                            <Image style={{ height: 20, width: 20 }} source={require("../../assets/left-arrow.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F4656' }}>Đổi mật khẩu</Text>
                    </View>
                    <View style={{ flex: 20 }}></View>
                </View>
            </View>
            <View style={{ marginBottom: 110, marginTop: 65, padding: 10 }}>
                <View>
                    <Text>Mật khẩu cũ</Text>
                    <TextInput secureTextEntry={true} value={oldPassword} onChangeText={(text) => setOldPassword(text)} placeholder="Nhập mật khẩu cũ" style={{ height: 35, borderWidth: 1, borderRadius: 20, paddingLeft: 12, borderColor: '#1F4656', marginTop: 4, color: '#1F4656' }}></TextInput>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Mật khẩu mới</Text>
                    <TextInput secureTextEntry={true} value={newPassword} onChangeText={(text) => setNewPassword(text)} placeholder="Nhập mật khẩu mới" style={{ height: 35, borderWidth: 1, borderRadius: 20, paddingLeft: 12, borderColor: '#1F4656', marginTop: 4, color: '#1F4656' }}></TextInput>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>Nhập lại mật khẩu mới</Text>
                    <TextInput secureTextEntry={true} value={reNewPassword} onChangeText={(text) => setReNewPassword(text)} placeholder="Nhập lại mật khẩu mới" style={{ height: 35, borderWidth: 1, borderRadius: 20, paddingLeft: 12, borderColor: '#1F4656', marginTop: 4, color: '#1F4656' }}></TextInput>
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1, width: width }}>

                <TouchableOpacity onPress={onChangePassword} disabled={!isValid} style={isValid ? { height: 55, alignItems: 'center', flexDirection: 'row', backgroundColor: '#DF6032', flex: 1, } :
                    { height: 55, alignItems: 'center', flexDirection: 'row', backgroundColor: '#CCCCCC', flex: 1, }
                }>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 55 }}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>Đổi mật khẩu</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChangePassword