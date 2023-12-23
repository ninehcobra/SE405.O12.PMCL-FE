import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native"

const Shop = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')
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
            <ScrollView style={{ marginBottom: 110 }}>



            </ScrollView >

        </View >
    )
}

export default Shop