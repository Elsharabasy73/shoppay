import { GET_ALL_CATEGORY, GET_ONE_CATEGORY, GET_ERROR, CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from '../type'

const inital = {
    category: [],
    oneCategory: [],
    deleteCategory: [],
    updateCategory: [],
    loading: true,
}
const categoryReducer = (state = inital, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false,
            }
        case GET_ONE_CATEGORY:
            return {
                ...state,
                oneCategory: action.payload,
                loading: false,
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                deleteCategory: action.payload,
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                updateCategory: action.payload,
                loading: false,
            }
        case GET_ERROR:
            return {
                loading: true,
                category: action.payload,
            }
        default:
            return state;
    }
}
export default categoryReducer