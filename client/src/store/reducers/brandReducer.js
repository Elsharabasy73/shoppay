import { GET_ALL_BRAND, GET_ONE_BRAND, GET_ERROR, CREATE_BRAND, DELETE_BRAND } from '../type'

const inital = {
    brand: [],
    oneBrand: [],
    deleteBrand: [],
    loading: true,
}
const brandReducer = (state = inital, action) => {
    switch (action.type) {
        case GET_ALL_BRAND:
            return {
                ...state,
                brand: action.payload,
                loading: false,
            }
        case GET_ONE_BRAND:
            return {
                oneBrand: action.payload,
                loading: false,
            }
        case CREATE_BRAND:
            return {
                ...state,
                brand: action.payload,
                loading: false
            }
        case DELETE_BRAND:
            return {
                ...state,
                deleteBrand: action.payload,
            }
        case GET_ERROR:
            return {
                loading: true,
                brand: action.payload,
            }
        default:
            return state;
    }
}
export default brandReducer