import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native"
import { getOwnShop, changeSelectedShop } from "../../services/shopService"
import { ShopItem } from "./components/ShopItem"
import Toast from "react-native-toast-message"

const Shop = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')
    const [isUpdate, setIsUpdate] = useState(false)
    const [shops, setShops] = useState()

    const fetchMyShop = async () => {
        let res = await getOwnShop()
        if (res && res.EC === 0) {
            setShops(res.DT)
        }
    }


    useEffect(() => {
        const unsubcribe = navigation.addListener('focus', () => {
            fetchMyShop()
        })

        return unsubcribe
    }, [navigation])

    const handleOnChangeSelectedShop = async (id) => {
        let res = await changeSelectedShop(id)
        if (res.EC === 0) {
            await fetchMyShop()
            Toast.show({
                type: 'success',
                text1: 'Thông báo',
                text2: `Cập nhật thành công`,
                position: 'top'
            })
        }

        setIsUpdate(!isUpdate)
    }

    return (
        <View style={{ backgroundColor: '#F7F7F7', minHeight: height }}>
            <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, height: 55, width: width }}>
                <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', padding: 10, backgroundColor: 'white' }}>
                    <View style={{ flex: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} >
                            <Image style={{ height: 20, width: 20 }} source={require("../../assets/left-arrow.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F4656' }}>Quản lý cửa hàng</Text>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate('CreateShop') }} style={{ flex: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 24, lineHeight: 24, color: 'black', fontWeight: 'bold' }}>+</Text>
                        <Text style={{ fontSize: 10, lineHeight: 10, color: 'black' }}>Thêm cửa hàng</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView style={{ marginBottom: 110, marginTop: 65 }}>

                {shops ? shops.map((shop) => {

                    return (
                        <View style={{ backgroundColor: 'white', marginHorizontal: 12, marginBottom: 12, borderRadius: 10 }}>
                            <View style={{ padding: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#DF6032' }}>{shop.id} - {shop.name}</Text>
                                    {
                                        shop.isSelected ?
                                            <Text style={{ color: 'green', fontSize: 13, fontWeight: 'bold' }}>Cửa hàng mặc định</Text>
                                            :
                                            <TouchableOpacity onPress={() => handleOnChangeSelectedShop(shop.id)}>
                                                <Image style={{ height: 20, width: 20, marginRight: 4 }} source={require("../../assets/circle.png")} />
                                            </TouchableOpacity>
                                    }
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: 500, color: '#1F4656' }}>{shop.phoneNumber}</Text>
                                <Text style={{ fontSize: 14, fontWeight: 500, color: '#1F4656' }}>{shop.address}</Text>
                            </View>
                            <TouchableOpacity onPress={() => { navigation.navigate('CreateShop', { edit: true, id: shop.id }) }} style={{
                                flex: 1, height: 35, backgroundColor: '#80808033', borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10, alignItems: "center", justifyContent: 'center', flexDirection: 'row'
                            }}>
                                <Image style={{ height: 16, width: 16, marginRight: 4 }} source={require("../../assets/pencil.png")} />
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1F4656' }}>Sửa thông tin</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }) : ''}

            </ScrollView >

        </View >
    )
}

export default Shop