import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ auth, children }) => {
    if (auth === undefined) {
        return null // still checking auth, avoid flash redirect
    }
    if (auth === false) {
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />
}

export default ProtectedRoute