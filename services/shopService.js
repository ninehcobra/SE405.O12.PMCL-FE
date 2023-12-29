import axios from '../setup/axios';


const createShop = async (data) => {
    try {
        let res = await axios.post("api/create-shop", data)
        console.log(res)
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}

const getOwnShop = async () => {
    try {
        let res = await axios.get("api/shop")
        console.log(res)
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}

const changeSelectedShop = async (id) => {
    try {
        let res = await axios.post("api/change-selected-shop", { id: id })
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}

const getShopById = async (id) => {
    try {
        let res = await axios.get(`api/shop-detail?id=${id}`)
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}

const updateShop = async (data) => {
    try {
        let res = await axios.post(`api/update-shop`, data)
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}

const createProduct = async (data) => {
    try {
        let res = await axios.post(`api/create-product`, data)
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}

const getShopProduct = async (id) => {
    try {
        let res = await axios.get(`api/product?shopId=${id}`)
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}

const deleteProduct = async (id) => {
    try {
        let res = await axios.post(`api/delete-product`, { id: id })
        return res
    } catch (error) {
        return {
            EC: -5,
            EM: 'Lỗi khi gửi truy vấn'
        }
    }
}

export {
    createShop,
    getOwnShop,
    changeSelectedShop,
    getShopById,
    updateShop,
    createProduct,
    getShopProduct,
    deleteProduct
}   