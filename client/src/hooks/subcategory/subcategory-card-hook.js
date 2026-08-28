import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteSubCategory } from '../../store/actions/subcategoryAction';

const SubcategoryCardHook = (subcategory) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handelDelete = async () => {
        await dispatch(deleteSubCategory(subcategory._id))
        setShow(false);
        window.location.reload(false);
    }

    return [show, handleClose, handleShow, handelDelete]
}

export default SubcategoryCardHook
