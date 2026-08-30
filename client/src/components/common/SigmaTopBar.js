import React from 'react'
import { Link } from 'react-router-dom'

const SigmaTopBar = () => {
  return (
    <div className="sigma-gradient text-white text-xs md:text-sm">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-20 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-4 font-semibold">
          <a href="tel:+2010123456789" className="flex items-center gap-1.5 no-underline text-white hover:text-white/80 transition">
            <span>📞</span> <span className="font-bold tracking-wide">010123456789</span>
          </a>
          <span className="hidden sm:inline text-white/30">|</span>
          <Link to="/allcategory" className="hidden sm:inline no-underline text-white/90 hover:text-white transition underline-offset-4 hover:underline">Stores</Link>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://www.facebook.com/sigmacomputer.egypt/" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition no-underline">
            <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.016 4.388 10.983 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.056 24 18.089 24 12.073z" />
            </svg>
          </a>
          <a href="https://t.me/SigmaComputer/" target="_blank" rel="noreferrer" aria-label="Telegram" className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition no-underline">
            <svg className="w-3.5 h-3.5 fill-[#229ED9]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.893 4.326-2.97-.945c-.643-.2-.658-.643.135-.954l11.6-4.458c.538-.196 1.006.12.832.941z" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@Sigma.Computer/" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition no-underline">
            <svg className="w-3.5 h-3.5 fill-[#FF0000]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SigmaTopBar
