import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../store/actions/adminUserAction';

const AdminUserCardHook = (user) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handelDelete = async () => {
        await dispatch(deleteUser(user._id))
        setShow(false);
        window.location.reload(false);
    }

    return [show, handleClose, handleShow, handelDelete]
}

export default AdminUserCardHook
