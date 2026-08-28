import { GET_ALL_CATEGORY, GET_ERROR, GET_ONE_CATEGORY, CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from '../type'
import { useGetData } from '../../hooks/common/useGetData'
import { useInsertDataWithImage } from '../../hooks/common/useInsertData'
import useDeleteData from '../../hooks/common/useDeleteData'
import { useInUpdateDataWithImage } from '../../hooks/common/useUpdateData'
//get all category
export const getAllCategory = (limit) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/categories?limit=${limit}`);

        dispatch({
            type: GET_ALL_CATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//get one category with
export const getOneCategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/categories/${id}`);

        dispatch({
            type: GET_ONE_CATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//get all category with pagination
export const getAllCategoryPage = (page) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/categories?limit=6&page=${page}`);
        dispatch({
            type: GET_ALL_CATEGORY,
            payload: response,
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}


//get all category with pagination
export const createCategory = (formData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage(`/api/v1/categories`, formData);
        dispatch({
            type: CREATE_CATEGORY,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: CREATE_CATEGORY,
            payload: e.response,
        })
    }
}

//delete category
export const deleteCategory = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/categories/${id}`);
        dispatch({
            type: DELETE_CATEGORY,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: DELETE_CATEGORY,
            payload: e.response,
        })
    }
}

//update category
export const updateCategory = (id, formData) => async (dispatch) => {
    try {
        const response = await useInUpdateDataWithImage(`/api/v1/categories/${id}`, formData);
        dispatch({
            type: UPDATE_CATEGORY,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: UPDATE_CATEGORY,
            payload: e.response,
        })
    }
}