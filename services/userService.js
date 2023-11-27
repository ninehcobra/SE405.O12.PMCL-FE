import axios from '../setup/axios';


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

export {
    handleRegister,
    handleLogin
};
