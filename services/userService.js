import axios from '../setup/axios';
import { useNavigation } from '@react-navigation/native';


const handleRegister = async (data) => {
    try {

        let res = await axios.post('/api/register', data)
        return res
    } catch (error) {
        return ({
            EC: -5,
            EM: 'Something wrong when connect to server'
        })
    }
};

const handleLogin = async (data) => {
    try {

        let res = await axios.post('/api/login', data)
        return res
    } catch (error) {
        return ({
            EC: -5,
            EM: 'Something wrong when connect to server'
        })
    }
};

const handleGetAccountInfo = async () => {
    try {

        let res = await axios.get('/api/account')
        return res
    } catch (error) {
        return ({
            EC: -5,
            EM: 'Something wrong when connect to server'
        })
    }
};

const handleUpdateUserInfo = async (name, phoneNumber) => {
    try {

        let res = await axios.post('/api/update-user-info', {
            name: name,
            phoneNumber: phoneNumber
        })
        return res
    } catch (error) {
        return ({
            EC: -5,
            EM: 'Something wrong when connect to server'
        })
    }
}

const handleChangePassword = async (oldPassword, newPassword) => {
    try {

        let res = await axios.post('/api/update-password', {
            oldPassword,
            newPassword
        })
        return res
    } catch (error) {
        return ({
            EC: -5,
            EM: 'Something wrong when connect to server'
        })
    }
}


export {
    handleRegister,
    handleLogin,
    handleGetAccountInfo,
    handleUpdateUserInfo,
    handleChangePassword
};
