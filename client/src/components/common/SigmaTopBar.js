import React from 'react'
import { Link } from 'react-router-dom'

const SigmaTopBar = () => {
  return (
    <div className="sigma-gradient text-white text-xs md:text-sm">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-20 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4 font-semibold">
          <a href="tel:+20233033099" className="hover:opacity-80 flex items-center gap-1.5 no-underline text-white">
            <span>📞</span> +20233033099
          </a>
          <Link to="/allcategory" className="hidden sm:inline hover:opacity-80 text-white no-underline">Stores</Link>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://www.facebook.com/sigmacomputer.egypt/" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[11px] hover:bg-white/30 text-white no-underline">f</a>
          <a href="https://t.me/SigmaComputer/" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[11px] hover:bg-white/30 text-white no-underline">✈</a>
          <a href="https://www.youtube.com/@Sigma.Computer/" target="_blank" rel="noreferrer" className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[11px] hover:bg-white/30 text-white no-underline">▶</a>
          <span className="hidden md:inline opacity-70">|</span>
          <select className="bg-[#013A60] text-white text-xs px-3 py-1.5 rounded-full border border-white/20 outline-none">
            <option>English</option>
            <option>العربية</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SigmaTopBar
