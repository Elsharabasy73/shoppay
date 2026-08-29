import React from 'react'

const TwSpinner = ({ className = '' }) => {
    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#3F96D2] border-t-transparent"></div>
        </div>
    )
}

export default TwSpinner
