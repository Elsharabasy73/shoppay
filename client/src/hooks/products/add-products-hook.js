
import React, { useState, useEffect } from 'react'
import { getOneCategory } from '../../store/actions/subcategoryAction';
import { createProduct } from '../../store/actions/productsAction';
import notify from '../../utils/notify';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../store/actions/categoryAction'
import { getAllBrand } from './../../store/actions/brandAction';

const AdminAddProductsHook = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory(100));
        dispatch(getAllBrand(100));
    }, [])
    //get last catgeory state from redux
    const category = useSelector(state => state.allCategory.category)
    //get last brand state from redux
    const brand = useSelector(state => state.allBrand.brand)

    //get last sub cat state from redux
    const subCat = useSelector(state => state.subCategory.subcategory)

    const onSelect = (selectedList) => {
        setSeletedSubID(selectedList)
    }
    const onRemove = (selectedList) => {
        setSeletedSubID(selectedList)
    }

    const [options, setOptions] = useState([]);

    //values images products
    const [images, setImages] = useState({});
    //values state
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('السعر قبل الخصم');
    const [priceAftr, setPriceAftr] = useState('السعر بعد الخصم');
    const [qty, setQty] = useState('الكمية المتاحة');
    const [CatID, setCatID] = useState('');
    const [BrandID, SetBrandID] = useState('');
    const [subCatID, setSubCatID] = useState([]);
    const [seletedSubID, setSeletedSubID] = useState([]);
    const [loading, setLoading] = useState(true);


    const onChangeProdName = (event) => {
        setProdName(event.target.value)
    }
    const onChangeDesName = (event) => {
        setProdDescription(event.target.value)
    }
    const onChangePriceBefor = (event) => {
        setPriceBefore(event.target.value)
    }
    const onChangePriceAfter = (event) => {
        setPriceAftr(event.target.value)
    }
    const onChangeQty = (event) => {
        setQty(event.target.value)
    }
    const onChangeColor = () => {
        setShowColor(!showColor)
    }

    //to show hide color picker
    const [showColor, setShowColor] = useState(false);
    //to store all pick color
    const [colors, setColors] = useState([]);
    //when choose new color
    const handelChangeComplete = (color) => {
        setColors([...colors, color.hex])
        setShowColor(!showColor)
    }
    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color)
        setColors(newColor)
    }



    //when selet category store id
    const onSeletCategory = async (e) => {
        if (e.target.value !== 0) {
            await dispatch(getOneCategory(e.target.value))
        }
        setCatID(e.target.value)
    }
    useEffect(() => {
        if (CatID !== 0) {
            if (subCat.data) {

                setOptions(subCat.data)
            }
        } else
            setOptions([])
    }, [CatID])

    //when selet brand store id
    const onSeletBrand = (e) => {
        SetBrandID(e.target.value)
    }

    //to convert base 64 to file
    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    //to save data 
    const handelSubmit = async (e) => {
        e.preventDefault();
        const imagesCount = images ? Object.keys(images).length : 0;
        const priceNum = parseFloat(priceBefore);
        const qtyNum = parseInt(qty, 10);
        if (!CatID || CatID === "0" || !prodName.trim() || !prodDescription.trim() || imagesCount <= 0 || isNaN(priceNum) || priceNum <= 0) {
            notify("من فضلك اكمل البيانات", "warn")
            return;
        }

        //convert base 64 image to file 
        const imgCover = dataURLtoFile(images[0], Math.random() + ".png")
        //convert array of base 64 image to file 
        const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
            (item, index) => {
                return dataURLtoFile(images[index], Math.random() + ".png")
            }
        )

        const formData = new FormData();
        formData.append("title", prodName.trim());
        formData.append("description", prodDescription.trim());
        formData.append("quantity", isNaN(qtyNum) ? 1 : qtyNum);
        formData.append("price", priceNum);
        if (priceAftr && priceAftr !== 'السعر بعد الخصم' && !isNaN(parseFloat(priceAftr))) {
            formData.append("priceAfterDiscount", parseFloat(priceAftr));
        }
        formData.append("category", CatID);
        if (BrandID && BrandID !== "0" && BrandID !== 0) formData.append("brand", BrandID);

        formData.append("imageCover", imgCover);
        itemImages.forEach((item) => formData.append("images", item))
        colors.forEach((color) => formData.append("colors", color))
        // backend expects subcategories or category? check productModel subcategories
        seletedSubID.forEach((item) => formData.append("subcategories", item._id))

        setLoading(true)
        await dispatch(createProduct(formData))
        setLoading(false)

    }

    //get create meesage
    const product = useSelector(state => state.allproducts.products)

    useEffect(() => {
        if (loading === false) {
            if (product && (product.status === 201 || product.status === 200)) {
                notify("تم الاضافة بنجاح", "success")
                // only clear on success
                setColors([])
                setImages({})
                setProdName('')
                setProdDescription('')
                setPriceBefore('السعر قبل الخصم')
                setPriceAftr('السعر بعد الخصم')
                setQty('الكمية المتاحة')
                setCatID('')
                SetBrandID('')
                setSeletedSubID([])
                setOptions([])
            } else if (product) {
                // keep inputs, show real error
                const msg = product.data?.message
                const errors = product.data?.errors
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    errors.forEach(e => notify(e.msg, "error"))
                } else if (msg) {
                    notify(msg, "error")
                } else if (product.message) {
                    notify(product.message, "error")
                } else if (typeof product === 'string') {
                    notify(product, "error")
                } else {
                    notify("هناك مشكله", "error")
                }
            }
            setTimeout(() => setLoading(true), 1500)
        }
    }, [loading])


    return [onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, showColor, category, brand, priceAftr, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSeletCategory, handelSubmit, onSeletBrand, colors, priceBefore, qty, prodDescription, prodName]

}

export default AdminAddProductsHook