import axios from '../setup/axios';

const createOrder = async (data) => {
    try {
        let res = await axios.post(`api/create-order`, data)
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}
export {
    createOrder
}