import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ViewSearchProductsHook from './../products/view-search-products-hook';

const NavbarSearchHook = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [, , , getProduct] = ViewSearchProductsHook();
    const [searchWord, setSearchWord] = useState('')
    //when user type search word
    const OnChangeSearch = (e) => {
        localStorage.setItem("searchWord", e.target.value)
        setSearchWord(e.target.value)
        if (location.pathname !== "/products") {
           navigate("/products")
        }
    }
    useEffect(() => {
        const t = setTimeout(() => {
            getProduct();
        }, 600);
        return () => clearTimeout(t)
    }, [searchWord])
    return [OnChangeSearch, searchWord]
}

export default NavbarSearchHook