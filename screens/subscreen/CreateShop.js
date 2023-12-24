import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useState, useEffect } from "react"
import { getAllProvince, getDistrictById } from "../../services/addressService"
import { createShop, updateShop, getShopById } from "../../services/shopService"
import Toast from 'react-native-toast-message';


const Shop = ({ navigation, route }) => {

    const [shopData, setShopData] = useState({
        phoneNumber: '',
        name: '',
        address: '',
        provinceId: 0,
        districtId: 0
    })
    const [isFetchDistrict, setIsFetchDistrict] = useState(false)
    const [arrProvince, setArrProvince] = useState(null)
    const [arrDistrict, setArrDistrict] = useState(null)
    const [isValid, setIsValid] = useState(false)
    const [isFetchDetailShop, setIsFetchDetailShop] = useState(true)


    const { height, width } = Dimensions.get('window')

    const fetchProvince = async () => {
        let res = await getAllProvince()
        if (res.EC === 0) {
            setArrProvince(res.DT)
        }
        else {
            setArrProvince([])
        }
        setIsFetchDistrict(true)
    }

    const handleOnChange = (value, type) => {
        let data = { ...shopData }
        data[type] = value
        setShopData(data)
        isShopDataValid(data)
    }

    const fetchDistrictById = async (id) => {
        handleOnChange(0, 'districtId')
        let res = await getDistrictById(id)
        if (res.EC === 0) {
            setArrDistrict(res.DT)

        }
        else {
            setArrDistrict([])
        }
    }

    const fetchShopDetail = async (id) => {
        let res = await getShopById(id)
        if (res.EC === 0) {
            let data = { ...shopData }
            data.address = res.DT.address
            data.provinceId = res.DT.provinceId

            data.name = res.DT.name
            data.phoneNumber = res.DT.phoneNumber

            await setShopData(data)
            data.districtId = res.DT.districtId
            await setShopData(data)
            setIsFetchDetailShop(false)
        }

    }

    useEffect(() => {
        if (!isFetchDistrict) {
            fetchProvince()
        }
        if (isFetchDetailShop) {
            if (route.params?.edit) {
                fetchShopDetail(route.params?.id)
            }
        }


        fetchDistrictById(shopData.provinceId)
    }, [shopData.provinceId])

    function isShopDataValid(data) {
        for (const key in data) {
            if (data.provinceId === 0 || data.districtId === 0) {
                setIsValid(false)
                return false
            }
            else if (data[key] === null || data[key] === '') {
                setIsValid(false)
                return false;
            }
        }
        setIsValid(true)
        return true;
    }

    const handleCreateShop = async () => {
        if (route.params?.id) {
            let data = { ...shopData }

            data.id = route.params?.id

            let res = await updateShop(data)
            if (res && res.EC === 0) {
                Toast.show({
                    type: 'success',
                    text1: 'Thông báo',
                    text2: `Cập nhật cửa hàng thành công`,
                    position: 'top'
                })
                navigation.goBack()
            }
            else {
                Toast.show({
                    type: 'success',
                    text1: 'Thông báo',
                    text2: `Lỗi hệ thông`,
                    position: 'top'
                })
            }
        }
        else {
            let res = await createShop(shopData)
            if (res && res.EC === 0) {
                Toast.show({
                    type: 'success',
                    text1: 'Thông báo',
                    text2: `Tạo cửa hàng thành công`,
                    position: 'top'
                })
                navigation.goBack()
            }
            else {
                Toast.show({
                    type: 'success',
                    text1: 'Thông báo',
                    text2: `Lỗi hệ thông`,
                    position: 'top'
                })
            }
        }
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
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F4656' }}> {route.params?.edit ? 'Chỉnh sửa cửa hàng' : 'Thêm cửa hàng'}</Text>
                    </View>
                    <View style={{ flex: 20 }}></View>

                </View>
            </View>

            <ScrollView style={{ marginBottom: 110, marginTop: 55 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 55, backgroundColor: 'white' }}>
                    <View style={{ padding: 10, backgroundColor: '#80808033', borderRadius: 20 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1F4656' }}>Thông tin chung</Text>
                    </View>
                </View>
                <View style={{ margin: 8, padding: 10, backgroundColor: 'white', borderRadius: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 8 }}>Số điện thoại</Text>
                        <TextInput value={shopData.phoneNumber} onChangeText={(text) => handleOnChange(text, 'phoneNumber')} style={{ paddingBottom: 4, borderBottomWidth: 1, marginRight: 12, borderColor: '#80808033', flex: 1 }} placeholder="Nhập số điện thoại cửa hàng">
                        </TextInput>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                        <Text style={{ marginRight: 8 }}>Tên cửa hàng</Text>
                        <TextInput value={shopData.name} onChangeText={(text) => handleOnChange(text, 'name')} style={{ flex: 1, paddingBottom: 4, borderBottomWidth: 1, marginRight: 12, borderColor: '#80808033' }} placeholder="Tên cửa hàng">
                        </TextInput>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                        <Text style={{ marginRight: 8 }}>Địa chỉ</Text>
                        <TextInput value={shopData.address} onChangeText={(text) => handleOnChange(text, 'address')} style={{ flex: 1, paddingBottom: 4, borderBottomWidth: 1, marginRight: 12, borderColor: '#80808033' }} placeholder="Vui lòng nhập địa chỉ">
                        </TextInput>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                            <Picker selectedValue={shopData.provinceId}
                                onValueChange={(itemValue) => { handleOnChange(itemValue, 'provinceId') }}>
                                <Picker.Item
                                    style={{ color: '#808080' }}
                                    key={0}
                                    label="Chọn tỉnh / thành phố"
                                    value={0}
                                />
                                {arrProvince && arrProvince.length > 0 ? (
                                    arrProvince.map((province) => {
                                        if (province.id) {
                                            return (
                                                <Picker.Item
                                                    style={{ color: 'black' }}
                                                    key={province.id}
                                                    label={province.name}
                                                    value={province.id}
                                                />
                                            );
                                        }
                                        return null; // Thêm dòng này nếu cần
                                    })
                                ) : (
                                    <Picker.Item
                                        style={{ color: '#808080' }}
                                        key={0}
                                        label="Chọn tỉnh / thành phố"
                                        value={0}
                                    />
                                )}
                            </Picker>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                            <Picker selectedValue={shopData.districtId}
                                onValueChange={(itemValue) => { handleOnChange(itemValue, 'districtId') }} >
                                <Picker.Item
                                    style={{ color: '#808080' }}
                                    key={0}
                                    label="Chọn quận / huyện"
                                    value={0}
                                />
                                {arrDistrict && arrDistrict.length > 0 ? (
                                    arrDistrict.map((district) => {
                                        if (district.id) {
                                            return (
                                                <Picker.Item
                                                    style={{ color: 'black' }}
                                                    key={district.id}
                                                    label={district.name}
                                                    value={district.id}
                                                />
                                            );
                                        }
                                        return null; // Thêm dòng này nếu cần
                                    })
                                ) : (
                                    <Picker.Item
                                        style={{ color: '#808080' }}
                                        key={0}
                                        label="Chọn quận / huyện"
                                        value={0}
                                    />
                                )}
                            </Picker>
                        </View>
                    </View>

                </View>

            </ScrollView >
            <View style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1, width: width }}>

                <TouchableOpacity onPress={handleCreateShop} disabled={!isValid} style={isValid ? { height: 55, alignItems: 'center', flexDirection: 'row', backgroundColor: '#DF6032', flex: 1, } : { height: 55, alignItems: 'center', flexDirection: 'row', backgroundColor: '#CCCCCC', flex: 1, }}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 55 }}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>{route.params?.edit ? 'Lưu thay đổi' : 'Tạo cửa hàng'}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Shop