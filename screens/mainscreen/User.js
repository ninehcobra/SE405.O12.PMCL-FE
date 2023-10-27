import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { StackActions } from "@react-navigation/native"
import { IconButton } from "react-native-paper"

const User = ({ navigation }) => {
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
                            <IconButton size={18} icon={'logout'}></IconButton>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#01466D' }}>
                                Đăng xuất
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>




            </View>


        </View >
    )
}

export default User