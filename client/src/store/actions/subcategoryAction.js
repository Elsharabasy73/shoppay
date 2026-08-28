import { CREATE_SUB_CATEGORY, GET_SUB_CATEGORY, GET_ERROR, DELETE_SUB_CATEGORY, GET_ALL_SUB_CATEGORY, UPDATE_SUB_CATEGORY } from '../type'
import { useGetData } from '../../hooks/common/useGetData'
import { useInsertData } from '../../hooks/common/useInsertData'
import useDeleteData from '../../hooks/common/useDeleteData'
import { useInsUpdateData } from '../../hooks/common/useUpdateData'

//gcreate sub category with pagination
export const createSubCategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertData("/api/v1/subcategories", data);
        dispatch({
            type: CREATE_SUB_CATEGORY,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: CREATE_SUB_CATEGORY,
            payload: e.response,
        })
    }
}

//get sub category depend in cat id
export const getOneCategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/categories/${id}/subcategories`);

        dispatch({
            type: GET_SUB_CATEGORY,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//get all subcategories
export const getAllSubCategory = (limit = 100) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/subcategories?limit=${limit}`);
        dispatch({
            type: GET_ALL_SUB_CATEGORY,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

//delete subcategory
export const deleteSubCategory = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/subcategories/${id}`);
        dispatch({
            type: DELETE_SUB_CATEGORY,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: DELETE_SUB_CATEGORY,
            payload: e.response,
        })
    }
}

//update subcategory
export const updateSubCategory = (id, data) => async (dispatch) => {
    try {
        const response = await useInsUpdateData(`/api/v1/subcategories/${id}`, data);
        dispatch({
            type: UPDATE_SUB_CATEGORY,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: UPDATE_SUB_CATEGORY,
            payload: e.response,
        })
    }
}

//get one subcategory by id
export const getOneSubCategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/subcategories/${id}`);
        dispatch({
            type: GET_SUB_CATEGORY,
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}