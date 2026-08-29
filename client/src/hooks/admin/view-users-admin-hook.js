import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../store/actions/adminUserAction';

const ViewUsersAdminHook = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers(1, 8))
    }, [])

    const onPress = async (page) => {
        await dispatch(getAllUsers(page, 8))
    }
    let items = []; let pagination = [];
    const allUsers = useSelector((state) => state.adminUsers.allUsers)
    try {
        if (allUsers.data)
            items = allUsers.data;
        else
            items = []

        if (allUsers.paginationResult)
            pagination = allUsers.paginationResult.numberOfPages;
        else
            pagination = []
    } catch (e) { }
    return [items, pagination, onPress]
}

export default ViewUsersAdminHook
