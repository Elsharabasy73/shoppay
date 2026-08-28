import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../store/actions/categoryAction';

const CategoryCardHook = (category) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handelDelete = async () => {
        await dispatch(deleteCategory(category._id))
        setShow(false);
        window.location.reload(false);
    }

    return [show, handleClose, handleShow, handelDelete]
}

export default CategoryCardHook
