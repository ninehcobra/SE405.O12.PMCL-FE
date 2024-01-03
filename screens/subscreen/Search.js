import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, TextInput } from "react-native"
import { Appbar, IconButton } from 'react-native-paper';
import { findOrderByKeyword } from "../../services/orderService";
const Search = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')

    const [keyword, setKeyword] = useState('')
    const [orders, setOrders] = useState([])

    const handleFindOrder = async () => {
        let res = await findOrderByKeyword(keyword)
        if (res && res.EC === 0) {
            setOrders(res.DT)
        }
        else {
            setOrders([])
        }
    }
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <View>
            <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, height: 55, width: width }}>
                <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', padding: 10, backgroundColor: 'white' }}>
                    <View style={{ flex: 5 }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} >
                            <Image style={{ height: 20, width: 20 }} source={require("../../assets/left-arrow.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 95, justifyContent: 'center' }}>
                        <View style={{ height: 40, backgroundColor: '#F1F1F1', margin: 10, borderRadius: 20, alignItems: 'center', marginTop: 40 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={handleFindOrder}>
                                    <IconButton icon={'magnify'}>

                                    </IconButton>
                                </TouchableOpacity>
                                <TextInput value={keyword} onChangeText={(text) => setKeyword(text)} placeholder="Nhập SĐT - Mã đơn hàng - Tên người nhận ">

                                </TextInput>
                            </View>
                            <Text style={{ fontStyle: 'italic', fontSize: 12 }}>Bạn có thể tìm kiếm gần đúng với 1 hoặc 2 ký tự trong tên, số điện thoại, hoặc mã đơn hàng.</Text>
                        </View>
                    </View>

                </View>

            </View>
            <View style={{ marginBottom: 110, marginTop: 85, padding: 10 }}>
                {orders ? orders.map((order) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Tracking', { id: order.id })} style={{ padding: 10, borderRadius: 15, backgroundColor: '#80808033', borderWidth: 1, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View >
                                <Text style={{ fontSize: 13 }}>
                                    Mã đơn hàng: {order.id}
                                </Text>
                                <Text style={{ fontSize: 13 }}>
                                    Người nhận: {order.recName}
                                </Text>
                                <Text tyle={{ fontSize: 13 }}>
                                    Số điện thoại: {order.recPhoneNumber}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 13 }}>
                                    Phí vận chuyển: {formatter.format(order.fee)}
                                </Text>
                                <Text style={{ fontSize: 13 }}>
                                    COD:  {formatter.format(order.COD)}
                                </Text>
                                <Text tyle={{ fontSize: 13 }}>
                                    Tình trạng thanh toán: {order.payOption === 'p3' ? 'Đã thanh toán' : 'Chưa '}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }) : ''}
            </View>
        </View >
    )
}

export default Search