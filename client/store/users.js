import axios from 'axios'

// ACTION TYPE
const GET_USERS = 'GET_USERS'

// ACTION CREATOR
export const getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    }
}

// THUNK CREATOR
export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get(`/api/users/admin`)
            dispatch(getUsers(data))
        }
        catch(err) {
            console.log(err)
        }
    }
}

// REDUCER
export default (state = [], action) => {
    switch(action.type) {
        case GET_USERS:
            return action.users
        default:
            return state
    }
}
