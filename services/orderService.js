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

const findOrderByKeyword = async (keyword) => {
    try {
        let res = await axios.get(`api/get-order-by-keyword?keyword=${keyword}`)
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}

const trackingOrder = async (id) => {
    try {
        let res = await axios.post(`/api/tracking-order`, { id: id })
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}

const getTotalCOD = async (shopId) => {
    try {
        let res = await axios.post(`/api/get-total-COD`, { id: shopId })
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}


export {
    createOrder,
    findOrderByKeyword,
    trackingOrder,
    getTotalCOD
}