import { useState, useEffect } from 'react'
import { getOneCategory } from '../../store/actions/subcategoryAction';
import { getOneProduct } from '../../store/actions/productsAction';
import notify from '../../utils/notify';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../store/actions/categoryAction'
import { getAllBrand } from './../../store/actions/brandAction';
import { updateProducts } from './../../store/actions/productsAction';
import { validateProduct } from '../../utils/validation';

const AdminEditProductsHook = (id) => {

    const dispatch = useDispatch();
    useEffect(() => {
        if (!id) return;
        const run = async () => {
            await dispatch(getOneProduct(id))
            await dispatch(getAllCategory(100));
            await dispatch(getAllBrand(100));
        }
        run();
    }, [id])

    //get one product details
    const item = useSelector((state) => state.allproducts.oneProduct)
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

    //values images products - MultiImageInput expects object {0: url/base64, 1: ...}
    const [images, setImages] = useState({});
    //value image cover
    const [imageCover, setImageCover] = useState(null);
    const [imageCoverURL, setImageCoverURL] = useState(null);
    //values state
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAftr, setPriceAftr] = useState('');
    const [qty, setQty] = useState('');
    const [CatID, setCatID] = useState('0');
    const [BrandID, SetBrandID] = useState('0');
    const [seletedSubID, setSeletedSubID] = useState([]);
    const [loading, setLoading] = useState(true);

    //to show hide color picker
    const [showColor, setShowColor] = useState(false);
    //to store all pick color
    const [colors, setColors] = useState([]);

    useEffect(() => {
        if (item && item.data) {
            const data = item.data;
            // images: convert array of urls to object for MultiImageInput
            if (data.images && Array.isArray(data.images)) {
                const imagesObj = {};
                data.images.forEach((url, index) => {
                    imagesObj[index] = url;
                });
                setImages(imagesObj);
            }
            if (data.imageCover) {
                setImageCoverURL(data.imageCover);
            }
            setProdName(data.title || '')
            setProdDescription(data.description || '')
            setPriceBefore(data.price || '')
            setPriceAftr(data.priceAfterDiscount || '')
            setQty(data.quantity || '')
            // category may be populated object { _id, name } or string id
            const catId = data.category?._id || data.category || '0';
            setCatID(catId)
            const brandId = data.brand?._id || data.brand || '0';
            SetBrandID(brandId)
            setColors(data.colors || data.availableColors || [])
            // subcategories: array of ids or populated objects
            if (data.subcategories && Array.isArray(data.subcategories)) {
                const subs = data.subcategories.map(s => typeof s === 'string' ? { _id: s, name: s } : s)
                setSeletedSubID(subs)
            }
        }
    }, [item])

    //to change name state
    const onChangeProdName = (event) => {
        setProdName(event.target.value)
    }
    //to change name state
    const onChangeDesName = (event) => {
        setProdDescription(event.target.value)
    }
    //to change name state
    const onChangePriceBefor = (event) => {
        setPriceBefore(event.target.value)
    }
    //to change name state
    const onChangePriceAfter = (event) => {
        setPriceAftr(event.target.value)
    }  //to change name state
    const onChangeQty = (event) => {
        setQty(event.target.value)
    }
    const onChangeColor = () => {
        setShowColor(!showColor)
    }

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
        const val = e.target.value
        setCatID(val)
        if (val && val !== "0" && val !== 0) {
            await dispatch(getOneCategory(val))
        } else {
            setOptions([])
        }
    }
    useEffect(() => {
        if (subCat && subCat.data && Array.isArray(subCat.data)) {
            setOptions(subCat.data)
        } else if (Array.isArray(subCat)) {
            // fallback if already array
            setOptions(subCat)
        }
    }, [subCat])

    // also trigger when CatID changed from prefill
    useEffect(() => {
        if (CatID && CatID !== "0" && CatID !== 0 && typeof CatID === 'string' && CatID.match(/^[0-9a-fA-F]{24}$/)) {
            dispatch(getOneCategory(CatID))
        }
    }, [CatID])

    //when selet brand store id
    const onSeletBrand = (e) => {
        SetBrandID(e.target.value)
    }

    const onChangeImageCover = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageCover(e.target.files[0])
            setImageCoverURL(URL.createObjectURL(e.target.files[0]))
        }
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

    //convert url to file
    const convertURLtoFile = async (url) => {
        const response = await fetch(url, { mode: "cors" });
        const data = await response.blob();
        const ext = url.split(".").pop().split("?")[0].split("#")[0] || "jpg";
        const filename = url.split("/").pop() || `image.${ext}`;
        const metadata = { type: `image/${ext}` };
        return new File([data], filename, metadata);
    };

    //to save data 
    const handelSubmit = async (e) => {
        e.preventDefault();
        const imagesCount = images ? Object.keys(images).length : 0;
        const priceNum = parseFloat(priceBefore);
        const qtyNum = parseInt(qty, 10);
        if (!CatID || CatID === "0" || CatID === 0 || !prodName.trim() || !prodDescription.trim() || !imageCoverURL || imagesCount <= 0 || isNaN(priceNum) || priceNum <= 0) {
            notify("من فضلك اكمل البيانات", "warn")
            return;
        }
        const errMsg = validateProduct({
            title: prodName.trim(),
            description: prodDescription.trim(),
            quantity: qtyNum,
            price: priceNum,
            priceAfterDiscount: (priceAftr && priceAftr !== '') ? priceAftr : undefined,
            category: CatID,
            brand: BrandID,
            subcategories: seletedSubID.map(s => s._id || s),
            imageCover: imageCoverURL,
        }, true);
        if (errMsg) {
            notify(errMsg, "warn")
            return;
        }

        // prepare cover file - use new file if selected, otherwise convert existing URL
        let imgCover;
        if (imageCover) {
            imgCover = imageCover;
        } else if (imageCoverURL) {
            if (imageCoverURL.startsWith("data:")) {
                imgCover = dataURLtoFile(imageCoverURL, Math.random() + ".png")
            } else {
                try {
                    imgCover = await convertURLtoFile(imageCoverURL)
                } catch (err) {
                    notify("فشل تحميل صورة الغلاف", "error")
                    return;
                }
            }
        }

        const imageKeys = Object.keys(images);
        const itemImages = []
        for (let i = 0; i < imageKeys.length; i++) {
            const key = imageKeys[i];
            const src = images[key];
            if (src.startsWith("data:")) {
                itemImages.push(dataURLtoFile(src, Math.random() + ".png"))
            } else {
                try {
                    const file = await convertURLtoFile(src)
                    itemImages.push(file)
                } catch (err) {
                    console.error("convert url failed", src, err)
                }
            }
        }

        const formData = new FormData();
        formData.append("title", prodName.trim());
        formData.append("description", prodDescription.trim());
        formData.append("quantity", isNaN(qtyNum) ? 1 : qtyNum);
        formData.append("price", priceNum);
        if (priceAftr && priceAftr !== '' && !isNaN(parseFloat(priceAftr))) {
            formData.append("priceAfterDiscount", parseFloat(priceAftr));
        }
        formData.append("category", CatID);
        if (BrandID && BrandID !== "0" && BrandID !== 0) formData.append("brand", BrandID);

        formData.append("imageCover", imgCover);
        itemImages.forEach((item) => formData.append("images", item))
        colors.forEach((color) => formData.append("colors", color))
        // backend expects subcategories
        seletedSubID.forEach((item) => {
            const subId = item._id || item
            formData.append("subcategories", subId)
        })

        setLoading(true)
        await dispatch(updateProducts(id, formData))
        setLoading(false)
    }

    //get update meesage
    const product = useSelector(state => state.allproducts.updateProducts)

    useEffect(() => {
        if (loading === false) {
            if (product) {
                const status = product.status || product?.data?.status;
                if (product.status === 200 || product.status === 201) {
                    notify("تم التعديل بنجاح", "success")
                } else if (product.data && product.data.errors) {
                    product.data.errors.forEach(err => notify(err.msg || err.message, "error"))
                } else if (product.data && product.data.message) {
                    notify(product.data.message, "error")
                } else if (product.message) {
                    notify(product.message, "error")
                } else if (typeof product === 'string' && product.startsWith("Error")) {
                    notify("هناك مشكله", "error")
                }
            }
            setTimeout(() => setLoading(true), 1500)
        }
    }, [loading])

    return [CatID, BrandID, onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, onChangeImageCover, showColor, category, brand, priceAftr, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSeletCategory, handelSubmit, onSeletBrand, colors, priceBefore, qty, prodDescription, prodName, imageCoverURL]

}

export default AdminEditProductsHook
