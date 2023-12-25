import { View, Text, TextInput, Image, TouchableOpacity, Modal } from "react-native"
import { Appbar, IconButton } from 'react-native-paper';
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getOwnShop, changeSelectedShop } from "../../services/shopService"
import Toast from "react-native-toast-message"

const Home = ({ navigation }) => {
    const [isChoosen, setIsChoosen] = useState(0)
    const [shopArr, setShopArr] = useState(null)
    const [modalShop, setModalShop] = useState(false)
    const [selectedShop, setSelectedShop] = useState(null)

    const info = useSelector((state) => state.personalInfo)

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


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#01466D' }}>
                            Tổng quát
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

                    <View style={{ height: 100, backgroundColor: '#FFF0D3', borderRadius: 20, margin: 10, flexDirection: 'row' }}>
                        <View style={{ flex: 40, alignItems: "center", justifyContent: "center" }}>
                            <Image source={require('../../assets/memelove.png')} style={{ height: 115, width: 115 }} ></Image>
                        </View>
                        <View style={{ flex: 60, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: '#6F4219', fontWeight: 'bold' }}>Sẵn sàng đua cùng GHLE</Text>
                            <Text style={{ color: '#6F4219', fontWeight: 'bold' }}>Các chương trình sẽ sớm bắt đầu</Text>
                        </View>

                    </View>

                    <View >
                        <View style={{ height: 40, marginLeft: 25, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setIsChoosen(0)}>
                                <Text style={isChoosen === 0 ? { color: '#F46624', fontSize: 17, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>Dòng tiền</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setIsChoosen(1)}>
                                <Text style={isChoosen === 1 ? { color: '#F46624', fontSize: 17, fontWeight: 'bold', borderBottomColor: "#F46624", borderBottomWidth: 2, padding: 10 } : { color: "#19374F", fontSize: 14, fontWeight: 'bold' }}>Vận hành</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <ScrollView>
                        {
                            isChoosen === 0 ?
                                < View style={{ height: 500, marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                                    <View style={{ marginBottom: 5 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#01466D' }}>
                                            Dòng tiền
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "#19374F", borderRadius: 20, height: 350, paddingTop: 15 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                            <View style={{ height: 18, backgroundColor: 'red', width: 6 }}>
                                            </View>
                                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginLeft: 10 }}>
                                                Số dư hiện tại (GHLE sắp chuyển cho khách)
                                            </Text>
                                        </View>

                                        <View style={{ height: 200, marginLeft: 28 }}>
                                            <View style={{ height: 20, marginTop: 8, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white' }}>Tiền thu hô (COD)</Text>

                                                </View>
                                                <View style={{ flex: 1 }}></View>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                            </View>

                                            <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white' }}>Giao thất bại - thu tiền</Text>

                                                </View>
                                                <View style={{ flex: 1 }}></View>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                            </View>

                                            <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white' }}>Phí dịch vụ tạm thu</Text>

                                                </View>
                                                <View style={{ flex: 1 }}></View>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                            </View>

                                            <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white' }}>Nợ tồn</Text>

                                                </View>
                                                <View style={{ flex: 1 }}></View>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                            </View>
                                            <View style={{ borderBottomWidth: 1, marginRight: 10, marginTop: 5, borderColor: 'white' }}></View>
                                            <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white' }}>Tổng số dư hoàn tất hiện tại</Text>

                                                </View>
                                                <View style={{ flex: 1 }}></View>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                            </View>

                                            <View style={{ height: 60, backgroundColor: 'white', marginRight: 28, borderRadius: 20, marginTop: 10, justifyContent: 'center', padding: 10 }}>
                                                <Text style={{ fontWeight: 'bold', color: "#F46624" }}>*Tổng số dư hiện tại=Tiền thu hộ - Phí dịch vụ tạm thu - Nợ tồn</Text>
                                            </View>


                                        </View>



                                        {/* Số dư đang xử lý */}
                                        <View style={{ borderBottomWidth: 1, marginRight: 10, marginTop: 5, borderColor: 'white', marginLeft: 28 }}></View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                                            <View style={{ height: 18, backgroundColor: 'red', width: 6 }}>
                                            </View>
                                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginLeft: 10 }}>
                                                Số dư đang xử lý (GHLE giữ lại)
                                            </Text>
                                        </View>
                                        <View style={{ height: 200, marginLeft: 28 }}>
                                            <View style={{ height: 20, marginTop: 8, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white' }}>Số dư qua ví</Text>

                                                </View>
                                                <View style={{ flex: 1 }}></View>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                            </View>

                                            <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white' }}>Giao thất bại - thu tiền / đang xử lý</Text>

                                                </View>
                                                <View style={{ flex: 1 }}></View>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                            </View>

                                            <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white' }}>COD hàng lưu kho / đang xử lý</Text>

                                                </View>
                                                <View style={{ flex: 1 }}></View>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                            </View>

                                            <View style={{ borderBottomWidth: 1, marginRight: 10, marginTop: 5, borderColor: 'white' }}></View>
                                            <View style={{ height: 20, marginTop: 4, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white' }}>Tổng số dư còn lại</Text>

                                                </View>
                                                <View style={{ flex: 1 }}></View>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>O vnđ</Text>
                                            </View>

                                            <View style={{ height: 60, backgroundColor: 'white', marginRight: 28, borderRadius: 20, marginTop: 10, justifyContent: 'center', padding: 10 }}>
                                                <Text style={{ fontWeight: 'bold', color: "#F46624" }}>*Tổng số dư hiện tại=Số dư ví - COD hàng lưu kho / đang xử lý</Text>
                                            </View>


                                        </View>
                                    </View>




                                </View>

                                :
                                <View style={{ height: 400, backgroundColor: 'green', marginTop: 15, marginLeft: 10, marginRight: 10 }}>
                                    <View>
                                        <Text>
                                            Vận hành
                                        </Text>
                                    </View>
                                </View>
                        }
                    </ScrollView>
                </View>

            </View>
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

export default Home
