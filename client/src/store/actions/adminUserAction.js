import { GET_ALL_USERS, GET_ONE_USER, CREATE_USER, UPDATE_USER, DELETE_USER, GET_ERROR } from '../type'
import { useGetDataToken } from '../../hooks/common/useGetData'
import { useInsertDataWithImage } from '../../hooks/common/useInsertData'
import useDeleteData from '../../hooks/common/useDeleteData'
import { useInUpdateDataWithImage } from '../../hooks/common/useUpdateData'

// get all users with pagination
export const getAllUsers = (page = 1, limit = 8) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/users?page=${page}&limit=${limit}`);
        dispatch({
            type: GET_ALL_USERS,
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

// get all users with limit only (first page)
export const getAllUsersWithLimit = (limit) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/users?limit=${limit}`);
        dispatch({
            type: GET_ALL_USERS,
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

// get one user by id
export const getOneUser = (id) => async (dispatch) => {
    try {
        const response = await useGetDataToken(`/api/v1/users/${id}`);
        dispatch({
            type: GET_ONE_USER,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: GET_ONE_USER,
            payload: e.response,
        })
    }
}

// create user (admin)
export const createUser = (formData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage("/api/v1/users", formData);
        dispatch({
            type: CREATE_USER,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: CREATE_USER,
            payload: e.response,
        })
    }
}

// update user
export const updateUser = (id, formData) => async (dispatch) => {
    try {
        const response = await useInUpdateDataWithImage(`/api/v1/users/${id}`, formData);
        dispatch({
            type: UPDATE_USER,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: UPDATE_USER,
            payload: e.response,
        })
    }
}

// delete user
export const deleteUser = (id) => async (dispatch) => {
    try {
        const response = await useDeleteData(`/api/v1/users/${id}`);
        dispatch({
            type: DELETE_USER,
            payload: response,
            loading: true
        })
    } catch (e) {
        dispatch({
            type: DELETE_USER,
            payload: e.response,
        })
    }
}
