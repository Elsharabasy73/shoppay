import { useEffect, useState } from 'react'
import baseUrl from '../../api/baseURL'

const ViewHomeNewestHook = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const fetchNewest = async () => {
            try {
                const res = await baseUrl.get('/api/v1/products?limit=8&sort=-createdAt')
                const data = res.data?.data || res.data
                const arr = Array.isArray(data) ? data : (data?.data || [])
                setItems(Array.isArray(arr) ? arr.slice(0, 4) : [])
            } catch (e) {
                setItems([])
            }
        }
        fetchNewest()
    }, [])
    return [items]
}

export default ViewHomeNewestHook
