import { View, Text, TextInput, TouchableOpacity, Linking, Modal, Animated, PanResponder, Image } from "react-native"
import { IconButton } from "react-native-paper"
import DatePicker from "react-native-modern-datepicker"
import { useState, useRef } from "react"

const formatDate = (date, index) => {
    if (index === 0) {
        return getTenDaysAgo(date)
    }
    const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và thêm số 0 ở đằng trước nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (lưu ý rằng tháng trong JavaScript bắt đầu từ 0)
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;


}

const getTenDaysAgo = (date) => {

    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(date.getDate() - 10); // Trừ 10 ngày từ ngày hiện tại

    // Chuyển định dạng ngày thành "dd/mm/yyyy"
    const day = tenDaysAgo.getDate().toString().padStart(2, '0');
    const month = (tenDaysAgo.getMonth() + 1).toString().padStart(2, '0');
    const year = tenDaysAgo.getFullYear();

    return `${day}/${month}/${year}`;
}

const Complain = () => {



    const [dateFrom, setDateFrom] = useState(formatDate(new Date(), 0))
    const [dateTo, setDateTo] = useState(formatDate(new Date(), 1))


    const [modalChangeDate, setModalChangeDate] = useState(false)
    const [modalDatePicker, setModalDatePicker] = useState(false)

    const handleCall = () => {
        Linking.openURL(`tel:0797260870`)
    }






    return (
        <View style={{ flex: 1 }}>
            <View >
                <View style={{ marginTop: 15 }}>
                    <View style={{ alignItems: 'center', height: 60, flexDirection: 'row' }}>
                        <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#01466D' }}>
                            Khiếu nại
                        </Text>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity onPress={() => handleCall()} style={{ flexDirection: 'row', alignItems: 'center', height: 35, backgroundColor: '#F16728', marginRight: 10, alignItems: 'center', justifyContent: 'center', width: 210, borderRadius: 13 }}>
                            <IconButton icon="phone" color="#00000" size={24}></IconButton>
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Gọi tổng đài ngay</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => setModalChangeDate(true)} style={{ height: 40, backgroundColor: '#F1F1F1', margin: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: '#454545' }}>{`${dateFrom} - ${dateTo}`}</Text>
                        </View>
                        <View style={{ flex: 1 }}></View>

                        <IconButton icon="calendar-month"></IconButton>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image style={{ height: 300, width: 300, marginTop: 90 }} source={require("../../assets/note.png")}></Image>
                <Text style={{ color: '#05436C', fontWeight: 'bold', fontSize: 16 }}>Bạn chưa tạo hỗ trợ nào</Text>
            </View>
            <Modal animationType="slide" transparent={true} visible={modalChangeDate}>
                <TouchableOpacity onPress={() => setModalChangeDate(false)} style={{
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
                        <TouchableOpacity onPress={() => setModalChangeDate(false)} style={{ flex: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#737373', fontWeight: 'bold', fontSize: 16 }}>Đóng</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#05436C', fontWeight: 'bold', fontSize: 16 }}>Tùy chỉnh thời gian</Text>
                        </View>

                        <TouchableOpacity style={{ flex: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#F16728', fontWeight: 'bold', fontSize: 16 }}>Áp dụng</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1, backgroundColor: '#F1F1F1', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setModalDatePicker(true)} style={{ marginTop: 15, marginLeft: 25 }}>
                            <Text style={{ color: '#737373', fontWeight: 'bold', fontSize: 16 }}>Từ</Text>
                            <Text style={{ color: '#05436C', fontWeight: 'bold', fontSize: 16 }}>{dateFrom}</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity onPress={() => setModalDatePicker(true)} style={{ marginTop: 15, marginRight: 25 }}>
                            <Text style={{ color: '#737373', fontWeight: 'bold', fontSize: 16 }}>Đến</Text>
                            <Text style={{ color: '#05436C', fontWeight: 'bold', fontSize: 16 }}>{dateTo}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* DatePicker */}
            <Modal animationType='fade' transparent={true} visible={modalDatePicker}>
                <TouchableOpacity onPress={() => setModalDatePicker(false)} style={{ flex: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', }}></TouchableOpacity>
                <View style={{ flex: 60, backgroundColor: 'white' }}>
                    <DatePicker></DatePicker>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity onPress={() => setModalDatePicker(false)} style={{ marginRight: 30 }}>
                            <Text style={{ color: '#60DAFB', fontSize: 16, fontWeight: 'bold' }}>Hủy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginRight: 40 }}>
                            <Text style={{ color: '#60DAFB', fontSize: 16, fontWeight: 'bold' }}>Ok</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <TouchableOpacity onPress={() => setModalDatePicker(false)} style={{ flex: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)', }}></TouchableOpacity>
            </Modal>

        </View >
    )
}

export default Complain
