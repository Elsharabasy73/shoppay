import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteBrand } from '../../store/actions/brandAction';

const BrandCardHook = (brand) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handelDelete = async () => {
        await dispatch(deleteBrand(brand._id))
        setShow(false);
        window.location.reload(false);
    }

    return [show, handleClose, handleShow, handelDelete]
}

export default BrandCardHook
