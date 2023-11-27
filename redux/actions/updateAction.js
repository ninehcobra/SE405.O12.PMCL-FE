
import actionTypes from "./actionType"


export const loginRedux = (data) => async dispatch => {
    try {

        dispatch({
            type: actionTypes.USER_LOGIN_SUCCESS,
            data
        })


    } catch (error) {

    }
}