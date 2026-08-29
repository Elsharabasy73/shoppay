import { GET_ALL_USERS, GET_ONE_USER, CREATE_USER, UPDATE_USER, DELETE_USER, GET_ERROR } from '../type'

const initial = {
    users: [],
    allUsers: [],
    oneUser: [],
    createUser: [],
    updateUser: [],
    deleteUser: [],
    loading: true,
}

const adminUsersReducer = (state = initial, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
                loading: false,
            }
        case GET_ONE_USER:
            return {
                ...state,
                oneUser: action.payload,
                loading: false,
            }
        case CREATE_USER:
            return {
                ...state,
                createUser: action.payload,
                loading: false,
            }
        case UPDATE_USER:
            return {
                ...state,
                updateUser: action.payload,
                loading: false,
            }
        case DELETE_USER:
            return {
                ...state,
                deleteUser: action.payload,
                loading: false,
            }
        case GET_ERROR:
            return {
                ...state,
                loading: true,
                allUsers: action.payload,
            }
        default:
            return state;
    }
}
export default adminUsersReducer
