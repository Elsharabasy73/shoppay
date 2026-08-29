import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, getProductLike } from '../../store/actions/productsAction';
import mobile from '../../assets/images/mobile.png'
import { getOneCategory } from '../../store/actions/categoryAction';
import { getOneBrand } from '../../store/actions/brandAction';
const ViewProductsDetalisHook = (prodID) => {

    const dispatch = useDispatch();
    useEffect(() => {
        if (prodID) dispatch(getOneProduct(prodID))
    }, [prodID])

    const oneProducts = useSelector((state) => state.allproducts.oneProduct)
    const oneCategory = useSelector((state) => state.allCategory.oneCategory)
    const oneBrand = useSelector((state) => state.allBrand.oneBrand)
    const productLike = useSelector((state) => state.allproducts.productLike)
    //to show products item
    let item = [];
    if (oneProducts.data)
        item = oneProducts.data;
    else
        item = []

    useEffect(() => {
        const categoryId = item?.category?._id || item?.category;
        const brandId = item?.brand?._id || item?.brand;
        if (categoryId && typeof categoryId === 'string' && categoryId.match(/^[0-9a-fA-F]{24}$/)) {
            dispatch(getOneCategory(categoryId))
            dispatch(getProductLike(categoryId))
        } else if (categoryId && typeof categoryId === 'object' && categoryId._id) {
            dispatch(getOneCategory(categoryId._id))
            dispatch(getProductLike(categoryId._id))
        }
        if (brandId && typeof brandId === 'string' && brandId.match(/^[0-9a-fA-F]{24}$/)) {
            dispatch(getOneBrand(brandId))
        } else if (brandId && typeof brandId === 'object' && brandId._id) {
            dispatch(getOneBrand(brandId._id))
        }
    }, [item._id || item.id])


    //to view images gallery - Amazon style: include cover + images with thumbnail
    let images = []
    if (item.imageCover || item.images) {
        const cover = item.imageCover ? [{ original: item.imageCover, thumbnail: item.imageCover }] : []
        const rest = Array.isArray(item.images) ? item.images.map((img) => ({ original: img, thumbnail: img })) : []
        images = [...cover, ...rest]
        // de-duplicate if cover already in images
        const seen = new Set()
        images = images.filter(i => {
            if (seen.has(i.original)) return false
            seen.add(i.original)
            return true
        })
    }
    if (!images.length) {
        images = [{ original: `${mobile}`, thumbnail: `${mobile}` }]
    }


    //to show category item
    let cat = [];
    if (oneCategory.data)
        cat = oneCategory.data;
    else
        cat = []

    //to show brand item
    let brand = [];
    if (oneBrand.data)
        brand = oneBrand.data;
    else
        brand = []

    let prod = []
    if (productLike)
        prod = productLike.data;
    else
        prod = []
    return [item, images, cat, brand, prod]
}

export default ViewProductsDetalisHook