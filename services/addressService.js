import axios from "axios";

const getAllProvince = async () => {
    try {
        const response = await axios.get('http://192.168.1.8:8080/api/get-all-province')
        const responseData = response.data
        return responseData
    } catch (error) {
        console.log('loi', error)
    }

}

const getDistrictById = async (id) => {
    try {
        const response = await axios.get(`http://192.168.1.8:8080/api/get-district-by-id?provinceId=${id}`)
        const responseData = response.data
        return responseData
    } catch (error) {
        console.log('loi', error)
    }
}

export {
    getAllProvince,
    getDistrictById
}   