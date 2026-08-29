import React from 'react'

const TwModal = ({ show, onClose, title, children, footer }) => {
    if (!show) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 z-10">
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 font-[Almarai]">{title}</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
                    </div>
                )}
                <div className="px-6 py-4 font-[Almarai] text-gray-700">
                    {children}
                </div>
                {footer && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TwModal
