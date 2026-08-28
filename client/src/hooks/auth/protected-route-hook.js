import { useEffect, useState } from 'react'

const ProtectedRouteHook = () => {
    const getStoredUser = () => {
        try { const s = localStorage.getItem("user"); return s ? JSON.parse(s) : null } catch { return null }
    }
    const [userData, setUserData] = useState(getStoredUser())
    const [isUser, setIsUser] = useState()
    const [isAdmin, setIsAdmin] = useState()

    useEffect(() => {
        const data = getStoredUser()
        setUserData(data)
        if (data != null) {
            setIsUser(true)
            if (data.role === "admin" || data.role === "manager") {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        } else {
            setIsAdmin(false)
            setIsUser(false)
        }
    }, [])



    return [isUser, isAdmin, userData]
}

export default ProtectedRouteHook