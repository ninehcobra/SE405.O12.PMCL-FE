import { View, Text, Image, TouchableOpacity, TextInput, Dimensions, ScrollView, Modal } from "react-native"
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { getAllProvince, getDistrictById } from "../../services/addressService";
import { getShopById, createProduct, getShopProduct, deleteProduct } from "../../services/shopService";
import { createOrder } from "../../services/orderService";
import { set } from "sync-storage";
import Toast from "react-native-toast-message";

const CreateOrder = ({ navigation, route }) => {

    const [dataAddressInfo, setDataAddressInfo] = useState({
        recPhoneNumber: '',
        recName: '',
        recAddress: '',
        recProvinceId: 0,
        recDistrictId: 0,
        takeTime: 't0',
    })

    const [sampleProduct, setSampleProduct] = useState({ name: '', code: '', weight: '', shopId: '' });
    const [arrSampleProduct, setArrSampleProduct] = useState([{ name: '', code: '', weight: '', shopId: '' }])
    const [isSampleProductValid, setIsSampleProductValid] = useState(true)

    const [shop, setShop] = useState(null)
    const [arrProvince, setArrProvince] = useState(null)
    const [arrDistrict, setArrDistrict] = useState(null)
    const [isCollapseAddressInfo, setIsCollapseAddressInfo] = useState(false)
    const [isCollapseOrderInfo, setIsCollapseOrderInfo] = useState(false)
    const [image, setImage] = useState(null);
    const [isFetchDistrict, setIsFetchDistrict] = useState(false)
    const [products, setProducts] = useState([{ name: '', code: '', weight: '', quantity: '1' }]);
    const [totalProductWeight, setTotalProductWeight] = useState('0');
    const [fee, setFee] = useState('0');
    const [cod, setCod] = useState('0')
    const [payOption, setPayOption] = useState('p1')

    const [selectedProducts, setSelectedProducts] = useState([]);

    const [modalCreateProduct, setModalCreateProduct] = useState(false)
    const [modalManageProduct, setModalManageProduct] = useState(false)

    const [isDataAddressValid, setIsDataAddressValid] = useState(false)
    const [isDataProductValid, setIsDataProductValid] = useState(false)

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

    const validateAddressInfo = (data) => {
        // Kiểm tra null cho mỗi trườn
        const isAnyFieldNull = Object.values(data).some((value) => value === null || value === '');

        // Kiểm tra giá trị 0 cho recProvinceId và recDistrictId
        const isProvinceDistrictZero = data.recProvinceId === 0 || data.recDistrictId === 0;

        return !isAnyFieldNull && !isProvinceDistrictZero;
    };

    const checkProducts = (productFix) => {
        if (productFix) {
            for (const product of products) {
                if (
                    !product.name ||
                    !product.code ||
                    !product.weight ||
                    !product.quantity
                ) {
                    return false;
                }
            }
            return true;
        }
        else {
            for (const product of products) {

                // Kiểm tra xem mỗi trường có giá trị không
                if (
                    !product.name || !product.code || !product.weight || !product.quantity
                ) {
                    // Nếu bất kỳ trường nào là rỗng, trả về false
                    return false;
                }
            }

            // Nếu tất cả sản phẩm đều có giá trị, trả về true
            return true;
        }

    };

    const numbers = Array.from({ length: 100 }, (_, index) => (index + 1).toString());
    const handleOnChangeAddressInfo = (text, type) => {
        if (text !== undefined) {
            let data = { ...dataAddressInfo };
            data[type] = text;
            console.log(data);
            setDataAddressInfo(data);
            setIsDataAddressValid(validateAddressInfo(data))
        }

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

    const fetchShopDetail = async (id) => {
        let res = await getShopById(id)
        if (res.EC === 0) {
            setShop(res.DT)
        }
    }

    const fetchMyShop = async () => {
        if (route.params?.shopId) {
            await fetchShopDetail(route.params?.shopId)
        }
    }

    useEffect(() => {
        const unsubcribe = navigation.addListener('focus', () => {
            fetchMyShop();
        });

        if (!isFetchDistrict) {
            fetchProvince();
        }




        fetchDistrictById(dataAddressInfo.recProvinceId);


        totalFee();

        return unsubcribe;
    }, [dataAddressInfo.recProvinceId, navigation, isFetchDistrict]);


    let time = new Date();
    let hours = time.getHours()
    let month = time.getMonth() + 1;
    let timeString = time.getDate() + "-" + month + "-" + time.getFullYear();
    let timeNextDayString = time.getDate() + 1 + "-" + month + "-" + time.getFullYear();

    function createDateWithTime(dateString, timeOption) {
        // Chuyển đổi ngày từ chuỗi sang đối tượng Date
        const [day, month, year] = dateString.split('-');
        const date = new Date(`${month}-${day}-${year}`);

        // Thiết lập giờ và phút dựa trên timeOption
        if (timeOption === 1) {
            // 7:00 AM
            date.setHours(7, 0, 0, 0);
        } else if (timeOption === 2) {
            // 12:00 PM
            date.setHours(12, 0, 0, 0);
        }

        return date;
    }

    const addProduct = (name, code, weight) => {
        // Sử dụng hàm callback của setProducts để đảm bảo rằng state đã được cập nhật
        setProducts(prevProducts => {
            const newProduct = {
                name: name !== undefined && name !== null && name !== "" ? name : '',
                code: code !== undefined && code !== null ? code : '',
                weight: weight !== undefined && weight !== null ? weight : '',
                quantity: '1'
            };

            const updatedProducts = [...prevProducts, newProduct];

            // Gọi các hàm với state cũ và mới
            setTotalProductWeight(getTotalProductWeight(updatedProducts));
            setIsDataProductValid(checkProducts(updatedProducts));

            return updatedProducts; // Trả về state mới
        });
        totalFee()
    };

    const updateProduct = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
        setTotalProductWeight(getTotalProductWeight())
        setIsDataProductValid(checkProducts())
        totalFee()
    };

    const removeProduct = (index) => {
        if (products.length > 1) {
            const updatedProducts = [...products];
            updatedProducts.splice(index, 1);
            setProducts(updatedProducts);
        }
        setTotalProductWeight(getTotalProductWeight())
        setIsDataProductValid(checkProducts())
        totalFee()
    };

    const handleShowCreateProduct = () => {
        setModalCreateProduct(true)
        onChangeSampleProduct('shopId', shop.id)
    }

    const handleShowManageProduct = async () => {
        await fetchShopProduct()
        setModalManageProduct(true)

    }

    const checkSampleProductValidation = () => {
        const { name, code, weight, shopId } = sampleProduct;
        return name !== '' && code !== '' && weight !== '' && shopId !== ''
    }

    const onCreateSampleProduct = async () => {
        console.log(sampleProduct)
        if (checkSampleProductValidation()) {
            setIsSampleProductValid(true)
            let res = await createProduct(sampleProduct)
            if (res.EC === 0) {
                setModalCreateProduct(false)
                setSampleProduct({ name: '', code: '', weight: '', shopId: '' })
                fetchMyShop()
                await fetchShopProduct()
            }
        }
        else {
            setIsSampleProductValid(false)

        }
    }

    const onDeleteSampleProduct = async (id) => {
        await deleteProduct(id)
        await fetchShopProduct()
    }

    const fetchShopProduct = async () => {
        let res = await getShopProduct(shop.id)
        if (res.EC === 0) {
            setArrSampleProduct(res.DT)
            console.log(res.DT)
        }
    }

    const onChangeSampleProduct = (field, value) => {
        let data = { ...sampleProduct };
        data[field] = value;
        setSampleProduct(data)
        setIsSampleProductValid(checkSampleProductValidation())
    }

    const handleProductSelect = (productId) => {
        // Kiểm tra xem sản phẩm đã được chọn hay chưa
        const isSelected = selectedProducts.includes(productId);

        // Cập nhật state dựa trên trạng thái hiện tại
        if (isSelected) {
            // Nếu đã chọn, loại bỏ khỏi danh sách chọn
            setSelectedProducts((prevSelected) =>
                prevSelected.filter((id) => id !== productId)
            );
        } else {
            // Nếu chưa chọn, thêm vào danh sách chọn
            setSelectedProducts((prevSelected) => [...prevSelected, productId]);
        }
        console.log(selectedProducts)
    };

    const isSelectedProduct = (productId) => {
        return selectedProducts.includes(productId);
    }

    const addArrProductSample = async () => {
        arrSampleProduct.map((product) => {

            if (isSelectedProduct(product.id)) {
                addProduct(product.name.toString(), product.code.toString(), product.weight.toString())
            }
        })
        setSelectedProducts([])
        setModalManageProduct(false)
    }

    const getTotalProductWeight = (productsFix) => {
        if (productsFix) {
            let totalWeight = 0;
            products.forEach((product) => {
                totalWeight += parseFloat(product.weight * product.quantity);
            });
            console.log(products);
            return totalWeight.toString();
        }
        else {
            let totalWeight = 0
            products.map((product) => {
                totalWeight += parseFloat(product.weight * product.quantity)
            })
            console.log(products)
            return totalWeight.toString()
        }
        totalFee()
    }

    const renderProductInputs = () => {
        return products.map((product, index) => (
            <View key={index} style={{ padding: 10, borderWidth: 1, borderRadius: 5, margin: 4, borderColor: '#80808033' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginRight: 4, flex: 4 }}>{index + 1}.</Text>
                    <TextInput
                        style={{ flex: 66, paddingBottom: 10, borderBottomWidth: 1, marginRight: 12, borderColor: '#808080' }}
                        placeholder="Tên sản phẩm"
                        value={product.name}
                        onChangeText={(text) => updateProduct(index, 'name', text)}
                    />
                    <TextInput
                        style={{ flex: 30, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#808080' }}
                        placeholder="Mã SP"
                        value={product.code}
                        onChangeText={(text) => updateProduct(index, 'code', text)}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginRight: 4 }}>KL(gam)</Text>
                    <TextInput
                        style={{ flex: 50, paddingBottom: 10, borderBottomWidth: 1, marginRight: 12, borderColor: '#808080' }}
                        placeholder="KL sản phẩm"
                        value={product.weight}
                        onChangeText={(text) => updateProduct(index, 'weight', text)}
                    />
                    <Text style={{ marginRight: 4 }}>SL</Text>
                    <View style={{ flex: 30, borderBottomWidth: 1, borderColor: '#808080' }}>
                        <Picker
                            selectedValue={product.quantity}
                            onValueChange={(value) => updateProduct(index, 'quantity', value)}>
                            {numbers.map((number) => (
                                <Picker.Item key={number} label={number.toString()} value={number.toString()} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ padding: 4, backgroundColor: '#80808033', width: 60, alignItems: "center", justifyContent: 'center', borderRadius: 20 }}>
                    <TouchableOpacity onPress={() => removeProduct(index)}>
                        <Text style={{ color: 'black' }}>Xóa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ));
    };

    function roundUpTo500(number) {
        return number !== '0' ? Math.ceil(number / 500) * 500 : 500;
    }

    const totalFee = () => {
        let sen = shop ? shop.provinceId ? typeAddress(shop.provinceId) : 'v1' : 'v1'
        let rec = dataAddressInfo.recProvinceId ? typeAddress(dataAddressInfo.recProvinceId) : 'v1'
        let weight = roundUpTo500(totalProductWeight)
        if (sen.toString() === 'HN' && rec.toString() === 'HN' || sen.toString() === 'HCM' && rec.toString() === 'HCM' || sen.toString() === 'DN' && rec.toString() === 'DN') {
            // Nội tỉnh
            setFee(calFee(weight, 15500, 2500))
        }
        else if (sen.toString() === 'HN' && rec.toString() === 'v3' || sen.toString() === 'DN' && rec.toString() === 'v2' || sen.toString() === 'HCM' && rec.toString() === 'v1') {
            //Nội vùng
            setFee(calFee(weight, 21000, 2500))
        }
        else if (sen.toString() === 'v3' && rec.toString() === 'v3' || sen.toString() === 'v2' && rec.toString() === 'v2' || sen.toString() === 'v1' && rec.toString() === 'v1') {
            //Nội vùng tỉnh
            setFee(calFee(weight, 29000, 2500))
        }
        else if (sen.toString() === 'HN' && rec.toString() === 'DN' || sen.toString() === 'DN' && rec.toString() === 'HCM' || sen.toString() === 'HCM' && rec.toString() === 'HN'
            || sen.toString() === 'DN' && rec.toString() === 'HN' || sen.toString() === 'HCM' && rec.toString() === 'DN' || sen.toString() === 'HN' && rec.toString() === 'HCM'
        ) {
            //Nội vùng tỉnh đặc biệt
            setFee(calFee(weight, 29000, 2500))
        }
        else if (sen.toString() === 'HN' && (rec.toString() === 'v1' || rec.toString() === 'v2') || sen.toString() === 'DN' && (rec.toString() === 'v1' || rec.toString() === 'v3') || sen.toString() === 'HCM' && (rec.toString() === 'v2' || rec.toString() === 'v3')) {
            //Liên vùng
            setFee(calFee(weight, 34000, 5000))
        }
        else if (sen.toString() === 'v3' && (rec.toString() === 'v1' || rec.toString() === 'v2') || sen.toString() === 'v2' && (rec.toString() === 'v1' || rec.toString() === 'v3') || sen.toString() === 'v1' && (rec.toString() === 'v2' || rec.toString() === 'v3')) {
            //Liên vùng tỉnh
            setFee(calFee(weight, 39000, 5000))
        }
        else {
            // Ngoại lệ
            setFee(calFee(weight, 39000, 5000))
        }
        console.log(fee)
    }

    const calFee = (weight, cost, addCost) => {
        let fee = 0;
        if (weight <= 500) {
            fee = cost;
        }
        else {
            let addWeight = weight - 500
            if (addWeight % 500 !== 0 && addWeight / 500 >= 1) {
                fee = cost + addCost + (addWeight / 500) * addCost
            }
            else if (addWeight % 500 === 0 && addWeight / 500 >= 1) {
                fee = cost + (addWeight / 500) * addCost
            }
            else {
                fee = cost + addCost
            }
        }
        return fee.toString()
    }


    const typeAddress = (provinceId) => {
        let type = ''
        let arrAdd1 = [8, 21, 44, 18, 31, 19, 42, 35, 11, 19, 10, 52, 2, 9, 38, 20, 57, 7, 1, 61, 59, 13, 28, 50, 32, 5, 12]
        let arrAdd2 = [47, 33, 46, 56, 49, 45]
        let arrAdd3 = [25, 40, 55, 41, 29, 51, 39, 53, 42, 26, 27, 48, 3, 36, 54, 4, 14, 22, 60, 63, 37, 34, 18, 62, 6, 23, 30]
        arrAdd1.map((item, index) => {
            if (provinceId.toString() === item.toString()) {
                type = 'v1'
            }
        })
        arrAdd2.map((item, index) => {
            if (provinceId.toString() === item.toString()) {
                type = 'v2'
            }
        })
        arrAdd3.map((item, index) => {
            if (provinceId.toString() === item.toString()) {
                type = 'v3'
            }
        })
        if (provinceId.toString() === '58') {
            type = 'HCM'
        }
        if (provinceId.toString() === '15') {
            type = 'DN'
        }
        if (provinceId.toString() === '24') {
            type = 'HN'
        }
        return type
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleCreateOrder = async () => {
        let recInfo = { ...dataAddressInfo }
        let res = await createOrder({ recInfo, shop, products, fee, totalProductWeight, cod, payOption })
        if (res && res.EC === 0) {
            Toast.show({
                type: 'success',
                text1: 'Thông báo',
                text2: `Tạo đơn hàng thành công`,
                position: 'top'
            })
            navigation.goBack()
        }
        else if (res && res.EC === -4) {
            Toast.show({
                type: 'error',
                text1: 'Thông báo',
                text2: `Hệ thống chưa hỗ trợ giao hàng ở đây. Mong gặp lại quý khách trong thời gian tới!!`,
                position: 'top'
            })
        }
    }

    console.log(shop)
    return (
        <View>
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
                                <TouchableOpacity disabled={!isDataAddressValid} onPress={() => setIsCollapseAddressInfo(!isCollapseAddressInfo)} style={isDataAddressValid ? { flexDirection: 'row', alignItems: 'center' } : { flexDirection: 'row', alignItems: 'center', opacity: 0.5 }}>
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
                                                <Text style={{ flex: 1, color: '#1F4656', fontWeight: 600 }}>{dataAddressInfo.recPhoneNumber} - {dataAddressInfo.recName}</Text>
                                            </View>
                                        </View>
                                        <View style={{ paddingLeft: 8, marginTop: 12 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Bên gửi:</Text>
                                                <Text style={{ flex: 1, color: '#1F4656', fontWeight: 600 }}>{shop.phoneNumber} - {shop.name}</Text>
                                            </View>
                                        </View>
                                        <View style={{ paddingLeft: 8, marginTop: 12 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ marginRight: 12, paddingBottom: 8, fontSize: 14, fontWeight: 'bold', color: '#5D5D5D' }}>Ca lấy hàng</Text>
                                                <Text style={{ flex: 1, color: '#1F4656', fontWeight: 600 }}>{dataAddressInfo.takeTime !== 3 ? `Ca lấy ${timeString} ${dataAddressInfo.takeTime === 2 ? '(12h00-18h00)' : '(7h00-12h00)'}` :
                                                    `Ca lấy ${timeNextDayString} (7h00-12h00)`
                                                }</Text>
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
                                                {shop ? <View style={{ flexDirection: 'column' }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947' }}>{`${shop.id} - ${shop.name}`}</Text>
                                                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947' }}>{shop.address}</Text>
                                                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#093947' }}>{shop.phoneNumber}</Text>
                                                </View> : ''}
                                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                    <TouchableOpacity onPress={() => { navigation.navigate('CreateShop', { edit: shop ? true : false, id: shop ? shop.id : '' }) }}>
                                                        <View style={{ height: 40, width: 40, justifyContent: 'center', backgroundColor: '#80808033', alignItems: 'center', borderRadius: 20 }}>
                                                            <Image style={{ height: 18, width: 18 }} source={require("../../assets/pencil.png")} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>


                                            <View style={{ flexDirection: 'row', marginTop: 18, height: 28 }}>
                                                <View style={{ paddingBottom: 8, borderBottomWidth: 1, borderColor: '#80808033', flex: 1, justifyContent: 'center' }}>
                                                    <Picker selectedValue={dataAddressInfo.takeTime ? dataAddressInfo.takeTime : '0'}
                                                        onValueChange={(itemValue) => { handleOnChangeAddressInfo(itemValue, 'takeTime') }} >
                                                        <Picker.Item style={{ color: '#5D5D5D' }} key={0} label="Chọn ca lấy hàng" value={'t0'} />
                                                        <Picker.Item
                                                            style={hours + 1 < 12 ? { color: '#5D5D5D' } : { color: '#80808033' }}
                                                            key={1}
                                                            label={`Ca lấy ${timeString} (7h00-12h00)`}
                                                            value={hours + 1 < 12 ? 't1' : ''}
                                                            enabled={hours + 1 < 12 ? true : false}
                                                        />
                                                        <Picker.Item
                                                            style={hours + 1 < 18 ? { color: '#5D5D5D' } : { color: '#80808033' }}
                                                            key={2}
                                                            label={`Ca lấy ${timeString} (12h00-18h00)`}
                                                            value={hours + 1 < 18 ? 't2' : ''}
                                                            enabled={hours + 1 < 18 ? true : false}
                                                        />
                                                        <Picker.Item style={{ color: '#5D5D5D' }} key={3} label={`Ca lấy ${timeNextDayString} (7h00-12h00)`} value={'t3'} />
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
                                    <TouchableOpacity disabled={!isDataAddressValid} style={isDataAddressValid ? {
                                        height: 40, backgroundColor: '#DF6032', borderBottomRightRadius: 14, borderBottomLeftRadius: 14, marginTop: 8, justifyContent: 'center',
                                        alignItems: 'center'
                                    } : {
                                        height: 40, backgroundColor: '#AFAFAF', borderBottomRightRadius: 14, borderBottomLeftRadius: 14, marginTop: 8, justifyContent: 'center',
                                        alignItems: 'center'
                                    }} onPress={() => setIsCollapseAddressInfo(true)}>
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
                                        <TouchableOpacity onPress={handleShowManageProduct} style={{ marginLeft: 12, paddingHorizontal: 8, paddingVertical: 6, backgroundColor: '#80808033', borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ height: 20, width: 20 }} source={require("../../assets/plus.png")} />
                                            <Text style={{ marginLeft: 4, color: '#1F4656', fontWeight: 'bold' }}>SP có sẵn</Text>
                                        </TouchableOpacity>
                                    }

                                </View>
                                <TouchableOpacity disabled={!isDataProductValid}
                                    onPress={() => setIsCollapseOrderInfo(!isCollapseOrderInfo)}
                                    style={isDataProductValid ? { flexDirection: 'row', alignItems: 'center' } :
                                        { flexDirection: 'row', alignItems: 'center', opacity: 0.5 }}>
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
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#808080', fontWeight: 500 }}>Số lượng loại SP: </Text>
                                            <Text style={{ color: '#1F4656', fontWeight: 500 }}>{products.length} </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#808080', fontWeight: 500 }}>Tổng KL: </Text>
                                            <Text style={{ color: '#1F4656', fontWeight: 500 }}>{totalProductWeight} gam</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: '#808080', fontWeight: 500 }}>COD: </Text>
                                            <Text style={{ color: '#1F4656', fontWeight: 500 }}>{formatter.format(parseInt(cod ? cod : '0'))}</Text>
                                        </View>
                                        <Text style={{ color: '#DF6032', fontWeight: 500, fontSize: 14 }}>Chuyển phát thương mại điện tử - {roundUpTo500(totalProductWeight)} gam - {formatter.format(fee)} - Ngày giao dự kiến: 25/12/2023</Text>
                                    </View>
                                    :
                                    <View>
                                        {renderProductInputs()}
                                        <TouchableOpacity onPress={addProduct} style={{ height: 40, backgroundColor: '#80808033', marginTop: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image style={{ height: 22, width: 22, marginLeft: 8, marginTop: 4 }} source={require("../../assets/plus.png")} />
                                                <Text style={{ fontSize: 16, marginLeft: 8 }}>Thêm sản phẩm</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                            }
                        </View>

                        {
                            isCollapseOrderInfo
                                ?
                                ""
                                :
                                <View>
                                    <View style={{ padding: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>| THÔNG TIN GÓI HÀNG</Text>

                                        </View>
                                        <View style={{ padding: 10, borderWidth: 1, borderRadius: 5, margin: 4, borderColor: '#80808033' }}>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ marginRight: 4 }}>Tổng KL (gam)</Text>
                                                <TextInput
                                                    editable={false}
                                                    style={{ flex: 66, paddingBottom: 0, borderBottomWidth: 1, marginRight: 12, borderColor: '#808080', color: 'black', height: 40 }}
                                                    placeholder="Khối lượng sản phảm"
                                                    value={totalProductWeight}
                                                />

                                            </View>

                                        </View>
                                    </View>
                                    <View style={{ padding: 8 }}>
                                        <View>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ marginRight: 4, flex: 15 }}>Thu hộ</Text>
                                                <TextInput keyboardType="numeric" onChangeText={(text) => setCod(text)} value={cod} style={{ flex: 85, paddingBottom: 4, borderBottomWidth: 1, marginRight: 12, borderColor: '#808080' }} placeholder="COD" ></TextInput>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DF6032' }}>| GÓI CƯỚC</Text>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F4656' }}> - cho khối lượng {roundUpTo500(totalProductWeight)} gam</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 12, marginTop: 4 }}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#DF6032' }}>Chuyển phát thương mại điện tử</Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#1F4656' }}>{formatter.format(fee)} </Text>
                                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#1F4656' }}>Ngày giao dự kiến</Text>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#1F4656' }}>23/12/2023</Text>
                                        </View>


                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setIsCollapseOrderInfo(true)}
                                        disabled={!isDataProductValid} style={isDataProductValid ?
                                            {
                                                height: 40, backgroundColor: '#DF6032', borderBottomRightRadius: 14, borderBottomLeftRadius: 14, marginTop: 8, justifyContent: 'center',
                                                alignItems: 'center'
                                            }
                                            :
                                            {
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
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#1F4656' }}>{formatter.format(fee)} </Text>
                        </View>
                        <View style={{ width: '100%', borderBottomWidth: 1, marginVertical: 10, borderColor: '#80808033' }}></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 500, color: '#1F4656' }}>Tổng phí</Text>
                                <Text style={{ fontSize: 14, fontWeight: 500, color: '#1F4656', fontStyle: 'italic' }}>Tính cả tiền thu hộ</Text>
                            </View>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: '#DF6032' }}>{formatter.format(parseInt(fee) + parseInt(cod ? cod : '0'))} </Text>
                        </View>
                    </View>
                </ScrollView >
                <View style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1, width: width }}>
                    <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
                        <View style={{ flex: 1, height: 35, justifyContent: 'center' }}>
                            <View style={{ margin: 10 }}>
                                <Picker value={payOption} onValueChange={(itemValue, itemIndex) => {
                                    console.log(itemValue)
                                    setPayOption(itemValue)
                                }}>
                                    <Picker.Item key={'p1'} style={{ color: '#1F4656', fontWeight: 'bold' }} label="Bên nhận trả phí" value={'p1'} />
                                    <Picker.Item key={'p2'} style={{ color: '#1F4656', fontWeight: 'bold' }} label="Bên gửi trả phí" value={'p2'} />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 55, alignItems: 'center', flexDirection: 'row', backgroundColor: '#CCCCCC', flex: 1, }}>
                        <View style={{ flex: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1F4656', height: 55 }}>
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>Lưu nháp</Text>
                        </View>
                        <TouchableOpacity disabled={!isDataProductValid && !isDataAddressValid} onPress={handleCreateOrder}
                            style={isDataProductValid && isDataAddressValid
                                ?
                                { flex: 50, alignItems: 'center', justifyContent: 'center', height: 55, backgroundColor: '#DF6032' }
                                :
                                { flex: 50, alignItems: 'center', justifyContent: 'center', height: 55 }
                            }
                        >
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>Tạo đơn hàng</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View >
            <Modal animationType='fade' transparent={true} visible={modalManageProduct}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 14 }}>
                        <View style={{ flex: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                <TouchableOpacity onPress={() => setModalManageProduct(false)} style={{ flex: 15 }}>
                                    <Image source={require('../../assets/left-arrow.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                                <View style={{ flex: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F4656' }}>Danh sách sản phẩm</Text>
                                </View>
                                <TouchableOpacity onPress={handleShowCreateProduct} style={{ flex: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../assets/plus.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1F4656', marginHorizontal: 4 }}>SP mới</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#DF6032', padding: 10 }}>Vui lòng bấm để chọn sản phẩm</Text>
                            <View style={{ borderBottomWidth: 1, borderColor: '#80808033' }} />
                        </View>
                        <View style={{ flex: 75, flexDirection: 'row', padding: 10 }}>
                            <ScrollView>
                                {arrSampleProduct &&
                                    arrSampleProduct.length >= 1 ? arrSampleProduct.map((product) => {
                                        return (
                                            <TouchableOpacity style={!isSelectedProduct(product.id)
                                                ?
                                                {
                                                    justifyContent: 'center', height: 70, borderWidth: 1, width: '100%', borderColor: '#80808033',
                                                    borderRadius: 10, padding: 10, flexDirection: 'row', marginBottom: 8
                                                }
                                                :
                                                {
                                                    justifyContent: 'center', height: 70, borderWidth: 1, width: '100%', borderColor: '#1F4656',
                                                    borderRadius: 10, padding: 10, flexDirection: 'row', marginBottom: 8
                                                }
                                            } key={product.id}
                                                onPress={() => handleProductSelect(product.id)}
                                            >
                                                <View style={{ flex: 85, justifyContent: 'center' }}>
                                                    <View style={{ paddingBottom: 4, borderBottomWidth: 1, borderColor: '#80808033', flexDirection: 'row' }}>
                                                        <Text style={{ color: '#1F4656', fontWeight: 500, marginRight: 8 }}>Tên sản phẩm:</Text>
                                                        <Text style={{ color: '#1F4656', fontWeight: 500, marginRight: 8 }} >{product.name}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginTop: 4, justifyContent: 'space-between' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={{ color: '#1F4656', fontWeight: 500, marginRight: 8 }}>KL(gam)</Text>
                                                            <Text style={{ color: '#1F4656', fontWeight: 500, marginRight: 8 }}>{product.weight}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={{ color: '#1F4656', fontWeight: 500, marginRight: 8 }}>Mã SP</Text>
                                                            <Text style={{ color: '#1F4656', fontWeight: 500, marginRight: 8 }}>{product.code}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <TouchableOpacity onPress={() => onDeleteSampleProduct(product.id)} style={{ flex: 15, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={require('../../assets/bin.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )
                                    })
                                    : ''}
                            </ScrollView>
                        </View>
                        <View style={{ flex: 10, borderTopWidth: 1, borderColor: '#80808033', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={addArrProductSample} disabled={!(selectedProducts && selectedProducts.length > 0)} style={selectedProducts && selectedProducts.length > 0
                                ?
                                { alignItems: 'center', justifyContent: 'center', backgroundColor: '#1F4656', height: 35, width: 150, borderRadius: 10 }
                                :
                                { alignItems: 'center', justifyContent: 'center', backgroundColor: '#1F4656', height: 35, width: 150, borderRadius: 10, opacity: 0.5 }
                            }>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Thêm sản phẩm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={modalCreateProduct}>
                <TouchableOpacity onPress={() => setModalCreateProduct(false)} style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đặt màu nền mờ thành màu trong suốt,
                    margin: 0
                }}>
                </TouchableOpacity>
                <View style={{
                    height: '65%', width: '100%',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    elevation: 5,
                    position: 'absolute',
                    bottom: 0,
                }}>
                    <View style={{ height: 55, alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setModalCreateProduct(false)} style={{ flex: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#737373', fontWeight: 'bold', fontSize: 16 }}>Đóng</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#05436C', fontWeight: 'bold', fontSize: 16 }}>Tạo sản phẩm</Text>
                        </View>

                        <TouchableOpacity onPress={onCreateSampleProduct} style={{ flex: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#F16728', fontWeight: 'bold', fontSize: 16 }}>Lưu</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1, backgroundColor: '#F1F1F1', padding: 10 }}>
                        <View style={{ flexDirection: 'row', height: 20, marginBottom: 16 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14, lineHeight: 20 }}>Tên sản phẩm</Text>
                            <TextInput value={sampleProduct.name} onChangeText={(text) => onChangeSampleProduct('name', text)} placeholder="Tên sản phẩm" style={{ flex: 1, borderBottomWidth: 1, borderColor: '#80808033', borderRadius: 10, marginLeft: 15 }} />
                        </View>
                        <View style={{ flexDirection: 'row', height: 20, marginBottom: 16 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14, lineHeight: 20 }}>Mã SP</Text>
                            <TextInput value={sampleProduct.code} onChangeText={(text) => onChangeSampleProduct('code', text)} placeholder="Mã sản phẩm" style={{ flex: 1, borderBottomWidth: 1, borderColor: '#80808033', borderRadius: 10, marginLeft: 15 }} />
                        </View>
                        <View style={{ flexDirection: 'row', height: 20, marginBottom: 16 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14, lineHeight: 20 }}>KL (gam)</Text>
                            <TextInput value={sampleProduct.weight} onChangeText={(text) => onChangeSampleProduct('weight', text)} placeholder="Khối lượng sản phẩm" style={{ flex: 1, borderBottomWidth: 1, borderColor: '#80808033', borderRadius: 10, marginLeft: 15 }} />
                        </View>
                        {!isSampleProductValid ?
                            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Vui lòng nhập đầy đủ thông tin</Text> : ''
                        }
                        <View style={{ flexDirection: 'row', marginBottom: 16, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ marginTop: 12 }}>Lưu ý: Thêm sản phẩm có tác dụng giúp shop quản lý và thêm sản phẩm nhanh chóng</Text>
                        </View>


                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CreateOrder