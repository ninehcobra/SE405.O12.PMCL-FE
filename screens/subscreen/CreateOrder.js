import { View, Text, Image, TouchableOpacity, TextInput, Dimensions, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { getAllProvince, getDistrictById } from "../../services/addressService";

const CreateOrder = ({ navigation }) => {

    const [dataAddressInfo, setDataAddressInfo] = useState({
        recPhoneNumber: '',
        recName: '',
        recAddress: '',
        recProvinceId: 0,
        recDistrictId: 0,
        senAddress: '',
        takeTime: '',
    })
    const [arrProvince, setArrProvince] = useState(null)
    const [arrDistrict, setArrDistrict] = useState(null)
    const [isCollapseAddressInfo, setIsCollapseAddressInfo] = useState(false)
    const [isCollapseOrderInfo, setIsCollapseOrderInfo] = useState(false)
    const [image, setImage] = useState(null);
    const [isFetchDistrict, setIsFetchDistrict] = useState(false)

    const { height, width } = Dimensions.get('window')
    // position: 'absolute', top: 0, left: 0, zIndex: 1

    const chooseImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: undefined,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage({ uri: result.assets[0].uri });
        }
    };

    const numbers = Array.from({ length: 100 }, (_, index) => (index + 1).toString());
    const handleOnChangeAddressInfo = (text, type) => {
        let data = { ...dataAddressInfo }
        data[type] = text
        console.log(data)
        setDataAddressInfo(data)
    }

    const fetchProvince = async () => {
        let res = await getAllProvince()
        if (res.EC === 0) {
            setArrProvince(res.DT)
        }
        setIsFetchDistrict(true)
    }

    const fetchDistrictById = async (id) => {
        handleOnChangeAddressInfo(0, 'recDistrictId')
        let res = await getDistrictById(id)
        if (res.EC === 0) {
            setArrDistrict(res.DT)
        }
    }

    useEffect(() => {
        if (!isFetchDistrict) {
            fetchProvince()
        }

        fetchDistrictById(dataAddressInfo.recProvinceId)
    }, [dataAddressInfo.recProvinceId])

    return (

        <View style={{ backgroundColor: '#F7F7F7', minHeight: height }}>
            <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, height: 55, width: width }}>
                <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', padding: 10, backgroundColor: '#CCCCCC' }}>
                    <View style={{ flex: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} >
                            <Image style={{ height: 20, width: 20 }} source={require("../../assets/left-arrow.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1F4656' }}>Tạo đơn hàng</Text>
                    </View>
                    <View style={{ flex: 20 }}>

                    </View>

                </View>
            </View>
            <ScrollView style={{ marginBottom: 110 }}>
                <View style={{ margin: 8, borderWidth: 1, borderColor: '#80808033', backgroundColor: 'white', borderRadius: 16, marginTop: 63 }}>
                    <View style={{ padding: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>| {isCollapseAddressInfo ? 'ĐỊA CHỈ' : "THÔNG TIN BÊN NHẬN"}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsCollapseAddressInfo(!isCollapseAddressInfo)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#1F4656', fontSize: 14, fontWeight: 500 }}>{isCollapseAddressInfo ? 'Mở rộng' : 'Thu gọn'}</Text>
                                {isCollapseAddressInfo ?
                                    <Image style={{ height: 16, width: 16, marginLeft: 8, marginTop: 4 }} source={require("../../assets/up-arrow.png")} /> :
                                    <Image style={{ height: 16, width: 16, marginLeft: 8, marginTop: 4 }} source={require("../../assets/down-arrow.png")} />
                                }
                            </TouchableOpacity>
                        </View>

                        {
                            isCollapseAddressInfo
                                ?
                                <View>
                                    <View style={{ paddingLeft: 8, marginTop: 12 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Bên nhận:</Text>
                                            <Text style={{ flex: 1, color: '#1F4656', fontWeight: 600 }}>0797260870 - Trương Nguyễn Công Chính ádasd</Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingLeft: 8, marginTop: 12 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Gửi tại bưu cục:</Text>
                                            <Text style={{ flex: 1, color: '#1F4656', fontWeight: 600 }}>0797260870 - Trương Nguyễn Công Chính ádasd</Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingLeft: 8, marginTop: 12 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Ca lấy hàng</Text>
                                            <Text style={{ flex: 1, color: '#1F4656', fontWeight: 600 }}>Ca lấy 23-12-2023(12h00-18h00)</Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={{ paddingLeft: 8, marginTop: 12 }}>
                                    <View style={{ flexDirection: 'row', height: 28 }}>
                                        <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Số điện thoại</Text>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1 }}>
                                            <TextInput onChangeText={(text) => { handleOnChangeAddressInfo(text, 'recPhoneNumber') }} value={dataAddressInfo.recPhoneNumber} placeholder="Nhập sđt bên nhận" style={{ flex: 1, fontSize: 14 }} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Họ tên</Text>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1 }}>
                                            <TextInput onChangeText={(text) => { handleOnChangeAddressInfo(text, 'recName') }} value={dataAddressInfo.recName} placeholder="Nhập họ tên bên nhận" style={{ flex: 1, fontSize: 14 }} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Địa chỉ</Text>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1 }}>
                                            <TextInput onChangeText={(text) => { handleOnChangeAddressInfo(text, 'recAddress') }} value={dataAddressInfo.recAddress} placeholder="Nhập địa chỉ" style={{ flex: 1, fontSize: 14 }} />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                        <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                            <Picker selectedValue={dataAddressInfo.recProvinceId}
                                                onValueChange={(itemValue) => { handleOnChangeAddressInfo(itemValue, 'recProvinceId') }}
                                            >
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
                                            <Picker selectedValue={dataAddressInfo.recDistrictId}
                                                onValueChange={(itemValue) => { handleOnChangeAddressInfo(itemValue, 'recDistrictId') }}
                                            >
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
                        }
                    </View>

                    {
                        isCollapseAddressInfo
                            ?
                            ""
                            :
                            <View>
                                <View style={{ marginTop: 12, padding: 8 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                        <View>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>| THÔNG TIN LẤY HÀNG</Text>
                                        </View>
                                    </View>

                                    <View style={{ paddingLeft: 8, marginTop: 4 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>0797260870 - 0797260870</Text>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>Hẻm 224, ấp 3 xã An Phước</Text>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>Long Thành Đồng Nai</Text>
                                                <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947', height: 18 }}>0797260870 - 0797260870</Text>
                                            </View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <TouchableOpacity>
                                                    <View style={{ height: 40, width: 40, justifyContent: 'center', backgroundColor: '#80808033', alignItems: 'center', borderRadius: 20 }}>
                                                        <Image style={{ height: 18, width: 18 }} source={require("../../assets/pencil.png")} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>


                                        <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                            <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                                <Picker>
                                                    <Picker.Item style={{ color: '#5D5D5D' }} key={0} label="Chọn ca lấy hàng" value={0} />
                                                </Picker>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                            <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                                <Picker>
                                                    <Picker.Item style={{ color: '#5D5D5D' }} key={0} label="Chọn bưu cục gửi hàng" value={0} />
                                                </Picker>
                                            </View>
                                        </View>


                                    </View>

                                </View>
                                <TouchableOpacity style={{
                                    height: 40, backgroundColor: '#AFAFAF', borderBottomRightRadius: 14, borderBottomLeftRadius: 14, marginTop: 8, justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>TIẾP THEO</Text>
                                </TouchableOpacity>
                            </View>
                    }

                </View>

                <View style={{ margin: 8, borderWidth: 1, borderColor: '#80808033', backgroundColor: 'white', borderRadius: 16 }}>
                    <View style={{ padding: 8 }}>
                        {isCollapseOrderInfo ? '' :
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }} >
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>THÔNG TIN HÀNG HÓA</Text>
                                </View>
                            </View>

                        }

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>| {isCollapseOrderInfo ? 'HÀNG HÓA - CƯỚC PHÍ' : "SẢN PHẨM"}</Text>
                                {isCollapseOrderInfo ? '' :
                                    <View style={{ marginLeft: 12, paddingHorizontal: 8, paddingVertical: 6, backgroundColor: '#80808033', borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{ height: 20, width: 20 }} source={require("../../assets/plus.png")} />
                                        <Text style={{ marginLeft: 4, color: '#1F4656', fontWeight: 'bold' }}>SP có sẵn</Text>
                                    </View>
                                }

                            </View>
                            <TouchableOpacity onPress={() => setIsCollapseOrderInfo(!isCollapseOrderInfo)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: '#1F4656', fontSize: 14, fontWeight: 500 }}>{isCollapseOrderInfo ? 'Mở rộng' : 'Thu gọn'}</Text>
                                {isCollapseOrderInfo ?
                                    <Image style={{ height: 16, width: 16, marginLeft: 8, marginTop: 4 }} source={require("../../assets/up-arrow.png")} /> :
                                    <Image style={{ height: 16, width: 16, marginLeft: 8, marginTop: 4 }} source={require("../../assets/down-arrow.png")} />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            isCollapseOrderInfo
                                ?
                                <View style={{ marginTop: 8 }}>
                                    <Text style={{ color: '#1F4656', fontWeight: 500 }}>Xe hơi - SE123 - 1</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#808080', fontWeight: 500 }}>Tổng KL: </Text>
                                        <Text style={{ color: '#1F4656', fontWeight: 500 }}>500 gam</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#808080', fontWeight: 500 }}>COD: </Text>
                                        <Text style={{ color: '#1F4656', fontWeight: 500 }}>0 (vnđ)</Text>
                                    </View>
                                    <Text style={{ color: '#DF6032', fontWeight: 500, fontSize: 14 }}>Chuyển phát thương mại điện tử - 500 gam - 29.000 VNĐ - Ngày giao dự kiến: 25/12/2023</Text>
                                </View>
                                :
                                <View>
                                    <View style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 8, borderWidth: 1, borderRadius: 5, borderColor: '#80808033', marginBottom: 8, marginTop: 8 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ marginRight: 4, flex: 4 }}>1.</Text>
                                            <TextInput style={{ flex: 66, paddingBottom: 10, borderBottomWidth: 1, marginRight: 12, borderColor: '#808080' }} placeholder="Tên sản phẩm"></TextInput>
                                            <TextInput style={{ flex: 30, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#808080' }} placeholder="Mã SP"></TextInput>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                                            <Text style={{ marginRight: 4, flex: 20 }}>KL (gam)</Text>
                                            <TextInput style={{ flex: 50, paddingBottom: 10, borderBottomWidth: 1, marginRight: 12, borderColor: '#808080' }} placeholder="KL sản phẩm"></TextInput>
                                            <View style={{ flex: 30, borderBottomWidth: 1, borderColor: '#808080' }} placeholder="Mã SP">
                                                <Picker>
                                                    {numbers.map((number) => (
                                                        <Picker.Item key={number} label={number} value={number} />
                                                    ))}
                                                </Picker>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={{ height: 40, backgroundColor: '#80808033', marginTop: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ height: 22, width: 22, marginLeft: 8, marginTop: 4 }} source={require("../../assets/plus.png")} />
                                                <Text style={{ fontSize: 16, marginLeft: 8 }}>Thêm sản phẩm</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032', marginBottom: 12 }}>| THÔNG TIN GÓI HÀNG</Text>
                                        <View style={{ flex: 1, paddingHorizontal: 4, paddingVertical: 12, borderWidth: 1, borderRadius: 5, borderColor: '#80808033', flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={chooseImage} style={{ flex: 12, height: 40, width: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#80808033', borderRadius: 20 }}>
                                                {image ?
                                                    <Image source={image} style={{ height: '100%', width: '100%' }} />
                                                    :
                                                    <Text style={{ fontSize: 12, color: '#1F4656' }}>Up ảnh</Text>}
                                            </TouchableOpacity>
                                            <View style={{ flex: 5 }}></View>
                                            <View style={{ flex: 85, flexDirection: 'row' }}>
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ marginRight: 4, flex: 34 }}>Tổng KL (gam)</Text>
                                                    <TextInput style={{ flex: 66, paddingBottom: 4, borderBottomWidth: 1, marginRight: 12, borderColor: '#808080' }} placeholder="Khối lượng sản phẩm" editable={false}></TextInput>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                        }
                    </View>

                    {
                        isCollapseOrderInfo
                            ?
                            ""
                            :
                            <View>
                                <View style={{ marginTop: 12, padding: 8 }}>
                                    <View>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ marginRight: 4, flex: 15 }}>Thu hộ</Text>
                                            <TextInput style={{ flex: 85, paddingBottom: 4, borderBottomWidth: 1, marginRight: 12, borderColor: '#808080' }} placeholder="Khối lượng sản phẩm" editable={false}></TextInput>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>| GÓI CƯỚC</Text>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F4656' }}> - cho khối lượng 200 gam</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 12, marginTop: 4 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#DF6032' }}>Chuyển phát thương mại điện tử</Text>
                                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#1F4656' }}>29.000 VNĐ</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#1F4656' }}>Ngày giao dự kiến</Text>
                                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#1F4656' }}>23/12/2023</Text>
                                    </View>


                                </View>
                                <TouchableOpacity style={{
                                    height: 40, backgroundColor: '#AFAFAF', borderBottomRightRadius: 14, borderBottomLeftRadius: 14, marginTop: 8, justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>TIẾP THEO</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
                <View style={{ paddingHorizontal: 10, marginBottom: 8 }}>
                    {/* Giá tiền chuyển phát */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: 500 }}>Gói Chuyển phát thương mại điện tử</Text>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#1F4656' }}>29.000 vnđ</Text>
                    </View>
                    <View style={{ width: '100%', borderBottomWidth: 1, marginVertical: 10, borderColor: '#80808033' }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 500, color: '#1F4656' }}>Tổng phí</Text>
                            <Text style={{ fontSize: 14, fontWeight: 500, color: '#1F4656', fontStyle: 'italic' }}>Tính cả tiền thu hộ</Text>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#DF6032' }}>29.000 vnđ</Text>
                    </View>
                </View>
            </ScrollView >
            <View style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1, width: width }}>
                <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
                    <View style={{ flex: 1, height: 35, justifyContent: 'center' }}>
                        <View style={{ margin: 10 }}>
                            <Picker>
                                <Picker.Item style={{ color: '#1F4656', fontWeight: 'bold' }} key={0} label="Bên nhận trả phí" value={0} />
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', backgroundColor: '#CCCCCC', flex: 1, }}>
                    <View style={{ flex: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1F4656', height: 55 }}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>Lưu nháp</Text>
                    </View>
                    <View style={{ flex: 50, alignItems: 'center', justifyContent: 'center', height: 55 }}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>Tạo đơn hàng</Text>
                    </View>

                </View>
            </View>
        </View >

    )
}

export default CreateOrder