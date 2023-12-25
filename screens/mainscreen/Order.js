
import { View, Text, TextInput, Image, TouchableOpacity, Modal } from "react-native"
import { Appbar, IconButton } from 'react-native-paper';
import { ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import AlreadyGet from "../../components/order_screen_components/AlreadyGet";
import NotGet from "../../components/order_screen_components/NotGet"
import Sample from "../../components/order_screen_components/Sample"
import { getOwnShop, changeSelectedShop } from "../../services/shopService"
import Toast from "react-native-toast-message";

const Order = ({ navigation }) => {

    const [isChoosen, setIsChoosen] = useState(0)
    const [shopArr, setShopArr] = useState(null)
    const [modalShop, setModalShop] = useState(false)
    const [selectedShop, setSelectedShop] = useState(null)


    const fetchOwnShop = async () => {
        let res = await getOwnShop()
        if (res.EC === 0 && res.DT.length >= 1) {
            setShopArr(res.DT)
            res.DT.map((shop) => {
                if (shop.isSelected) {
                    setSelectedShop(shop)
                }
            })
        }
    }


    useEffect(() => {
        fetchOwnShop()
    }, [])

    const handleOnChangeShop = async (id, isSelected) => {
        if (isSelected) {
            setModalShop(!modalShop)
        }
        else {
            let res = await changeSelectedShop(id)
            if (res.EC === 0) {
                await fetchOwnShop()

            }
        }
    }

    const handleCheckShop = () => {
        if (shopArr) {
            setModalShop(!modalShop)
        }
        else {
            navigation.navigate("Shop")
        }
    }

    const onCreateOrder = () => {
        if (selectedShop) {
            navigation.navigate('CreateOrder', { shop: selectedShop })
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: `Vui lòng tạo cửa hàng trước khi tạo đơn hàng`,
                position: 'top'
            })
            navigation.navigate('Shop')
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View >
                <View style={{ marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#01466D' }}>
                            Quản lý đơn hàng
                        </Text>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={handleCheckShop} style={{ height: 38, width: 140, backgroundColor: '#F46624', borderRadius: 12, alignItems: "center", padding: 10, flexDirection: 'row' }}>
                                <View style={{ width: 80 }}>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{selectedShop ? `${selectedShop.id} - ${selectedShop.name}` : 'Chưa có shop'}</Text>
                                </View>
                                <View style={{ marginLeft: 5 }}>
                                    <IconButton color="white" icon="chevron-down"></IconButton>
                                </View>

                            </TouchableOpacity>
                            <IconButton onPress={() => console.log('thong bao')} icon="bell" color="#00000" size={28}></IconButton>
                        </View>
                    </View>

                    <View style={{ height: 40, backgroundColor: '#F1F1F1', margin: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton icon={'magnify'}>

                        </IconButton>
                        <TextInput placeholder="Tìm kiếm">

                        </TextInput>
                    </View>
                </View>

                <View >
                    <View style={{ height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setIsChoosen(0)}>
                            <Text style={isChoosen === 0 ? { color: '#F46624', fontSize: 15, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>
                                GHLE đã lấy hàng
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setIsChoosen(1)}>
                            <Text style={isChoosen === 1 ? { color: '#F46624', fontSize: 15, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>
                                GHLE chưa lấy hàng
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setIsChoosen(2)}>
                            <Text style={isChoosen === 2 ? { color: '#F46624', fontSize: 15, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>
                                ĐH nháp
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>


            </View>
            {isChoosen === 0 ? <AlreadyGet /> : isChoosen === 1 ? <NotGet /> : <Sample />}

            <IconButton color="#FFFF" onPress={onCreateOrder} icon={"plus"} size={36} style={{ position: "absolute", bottom: 5, right: 10, backgroundColor: '#F26754' }}>

            </IconButton>
            <Modal animationType="slide" transparent={true} visible={modalShop}>
                <TouchableOpacity onPress={() => setModalShop(!modalShop)} style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đặt màu nền mờ thành màu trong suốt,
                    margin: 0
                }}>
                </TouchableOpacity>
                <View style={{
                    height: 230, width: '100%',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    elevation: 5,
                    position: 'absolute',
                    bottom: 0,
                }}>
                    <View style={{ height: 55, alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setModalShop(!modalShop)} style={{ flex: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#737373', fontWeight: 'bold', fontSize: 16 }}>Đóng</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 60, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#05436C', fontWeight: 'bold', fontSize: 16 }}>Danh sách cửa hàng</Text>
                        </View>

                        <TouchableOpacity style={{ flex: 20, alignItems: 'center', justifyContent: 'center' }}>

                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
                        <View style={{ backgroundColor: '#DF6032', padding: 2, paddingLeft: 8 }}>
                            <Text style={{ color: 'white', fontSize: 12 }}>Cửa hàng bạn làm chủ sở hữu</Text>
                        </View>
                        <View >
                            {shopArr && shopArr.length >= 1 ?
                                shopArr.map((shop) => {
                                    return (
                                        <TouchableOpacity key={shop.id} onPress={() => handleOnChangeShop(shop.id, shop.isSelected)} style={{ paddingVertical: 8, paddingLeft: 24, paddingRight: 12, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#80808033' }}>
                                            <Text style={shop.isSelected ? { fontSize: 12, fontWeight: 'bold', color: '#DF6032' } : { fontSize: 12, fontWeight: 'bold' }}>{shop.id} - {shop.name}</Text>
                                            {shop.isSelected ?
                                                <Image style={{ height: 15, width: 15 }} source={require("../../assets/circle_selected.png")} />
                                                :
                                                <Image style={{ height: 15, width: 15 }} source={require("../../assets/circle.png")} />}

                                        </TouchableOpacity>
                                    )
                                })
                                :
                                <Text>Khong co shop</Text>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    )
}

export default Order
