import React from 'react'
import SidebarSearchHook from '../../hooks/search/sidebar-search-hook';

const SideFilter = ({ isOpen, onClose }) => {
  const [category, brand, clickCategory, clickBrand, priceFrom, priceTo] = SidebarSearchHook();
  let localFrom = localStorage.getItem("priceFrom");
  let localTo = localStorage.getItem("priceTo");

  const filterContent = (
    <div className="flex flex-col gap-5">
      {/* Categories */}
      <div>
        <div className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">الفئة</div>
        <div className="flex flex-col gap-2.5">
          {category ? category.map((item, index) => (
            <label key={index} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                onChange={clickCategory}
                type="checkbox"
                value={item._id}
                className="w-4 h-4 rounded border-gray-300 text-sigma-blue focus:ring-sigma-blue cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">{item.name}</span>
            </label>
          )) : <p className="text-sm text-gray-400">لا يوجد تصنيفات</p>}
        </div>
      </div>

      {/* Brands */}
      <div>
        <div className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">الماركة</div>
        <div className="flex flex-col gap-2.5">
          {brand ? brand.map((item, index) => (
            <label key={index} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                onChange={clickBrand}
                type="checkbox"
                value={item._id}
                className="w-4 h-4 rounded border-gray-300 text-sigma-blue focus:ring-sigma-blue cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">{item.name}</span>
            </label>
          )) : <p className="text-sm text-gray-400">لا يوجد ماركات</p>}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">السعر</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 shrink-0">من:</span>
          <input
            value={localFrom || ''}
            onChange={priceFrom}
            className="flex-1 min-w-0 text-center text-sm border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-sigma-blue/30 focus:border-sigma-blue"
            type="number"
            min="0"
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-500 shrink-0">إلى:</span>
          <input
            onChange={priceTo}
            value={localTo || ''}
            className="flex-1 min-w-0 text-center text-sm border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-sigma-blue/30 focus:border-sigma-blue"
            type="number"
            min="0"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block mt-3">
        {filterContent}
      </div>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          {/* Drawer */}
          <div className={`absolute top-0 right-0 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-base font-bold text-gray-900">التصفية</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter content */}
            <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
              {filterContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideFilter
