import { GET_ERROR, GET_SUB_CATEGORY, CREATE_SUB_CATEGORY, DELETE_SUB_CATEGORY, GET_ALL_SUB_CATEGORY, UPDATE_SUB_CATEGORY } from '../type'

const inital = {
    subcategory: [],
    allSubcategory: [],
    deleteSubcategory: [],
    updateSubcategory: [],
    oneSubcategory: [],
    loading: true,
}
const subcategoryReducer = (state = inital, action) => {
    switch (action.type) {
        case CREATE_SUB_CATEGORY:
            return {
                ...state,
                subcategory: action.payload,
                loading: false,
            }
        case GET_SUB_CATEGORY:
            return {
                ...state,
                subcategory: action.payload,
                loading: false,
            }
        case GET_ALL_SUB_CATEGORY:
            return {
                ...state,
                allSubcategory: action.payload,
                loading: false,
            }
        case DELETE_SUB_CATEGORY:
            return {
                ...state,
                deleteSubcategory: action.payload,
            }
        case UPDATE_SUB_CATEGORY:
            return {
                ...state,
                updateSubcategory: action.payload,
                loading: false,
            }
        case GET_ERROR:
            return {
                loading: true,
                subcategory: action.payload,
            }
        default:
            return state;
    }
}
export default subcategoryReducer