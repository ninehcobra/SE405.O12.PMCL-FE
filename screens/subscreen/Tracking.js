import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native"
import { trackingOrder } from "../../services/orderService"

const Tracking = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('window')
    const [tracking, setTracking] = useState([])

    const fetchTracking = async () => {
        let res = await trackingOrder(route.params.id)
        if (res && res.EC === 0) {
            setTracking(res.DT)
        }
    }


    useEffect(() => {
        fetchTracking()

    }, [])

    function formatDateTime(inputDateTime) {
        const date = new Date(inputDateTime);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    return (
        <View>
            <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, height: 55, width: width }}>
                <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', padding: 10, backgroundColor: 'white' }}>
                    <View style={{ flex: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }} >
                            <Image style={{ height: 20, width: 20 }} source={require("../../assets/left-arrow.png")} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F4656' }}>Lịch sử đơn hàng</Text>
                    </View>
                    <View style={{ flex: 20 }}></View>
                </View>
            </View>
            <View style={{ marginBottom: 110, marginTop: 65, padding: 10 }}>
                <View>
                    <Text style={{ fontSize: 18 }}>Mã đơn hàng: {route.params.id}</Text>
                </View>
                {tracking ?
                    tracking.map((item) => {
                        return (
                            <View style={{ padding: 8, borderBottomWidth: 1, borderColor: '#80808033' }} key={item.id}>
                                <Text>{item.message}</Text>
                                <Text>{formatDateTime(item.createdAt)}</Text>
                            </View>
                        )

                    })
                    : ''
                }
            </View>
        </View>
    )
}

export default Tracking