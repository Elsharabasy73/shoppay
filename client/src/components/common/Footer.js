import React from 'react'
import { Container, Col ,Row} from "react-bootstrap";
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import twitter from "../../assets/images/twitter.png";
import phone from "../../assets/images/phone.png";
const Footer = () => {
    return (
        <div className="mt-10 px-5 lg:px-10 pb-6">
            <div className="w-[95%] mx-auto bg-[#393F55] rounded-3xl overflow-hidden relative p-6 md:p-10 text-white">
                <div className="absolute top-0 left-0 w-full h-[80px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 w-full md:w-3/4 mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                        <div className="flex flex-col gap-2 items-center lg:items-start">
                            <div className="font-extrabold text-xl tracking-tighter">ShopPay • Sigma</div>
                            <a href="https://maps.app.goo.gl/LKn1is733eKxzMfSA" target="_blank" rel="noreferrer" className="text-white/70 text-sm hover:text-white no-underline">25 Esraa Al Moalmeen st, Lebnan Sq Giza, Egypt</a>
                            <a href="tel:0233033099" className="text-white/70 text-sm hover:text-white no-underline">0233033099</a>
                            <a href="mailto:sigmapc@gmail.com" className="text-white/70 text-sm hover:text-white no-underline">sigmapc@gmail.com</a>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 justify-center">
                            <div className="min-w-[150px] text-center lg:text-left">
                                <div className="font-bold mb-3">Help & Support</div>
                                <div className="flex flex-col gap-2 text-sm text-white/70">
                                    <span className="hover:text-white cursor-pointer">Contact Us</span>
                                    <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                                    <span className="hover:text-white cursor-pointer">Return Policy</span>
                                    <span className="hover:text-white cursor-pointer">Warranty Policy</span>
                                </div>
                            </div>
                            <div className="min-w-[150px] text-center lg:text-left">
                                <div className="font-bold mb-3">My Account</div>
                                <div className="flex flex-col gap-2 text-sm text-white/70">
                                    <span className="hover:text-white cursor-pointer">My Profile</span>
                                    <span className="hover:text-white cursor-pointer">Addresses</span>
                                    <span className="hover:text-white cursor-pointer">Orders History</span>
                                    <span className="hover:text-white cursor-pointer">Voucher Store</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-white/10 gap-4">
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 no-underline text-white">f</a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 no-underline text-white">◎</a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 no-underline text-white">▶</a>
                            <a href="https://wa.me/201553029842" target="_blank" rel="noreferrer" className="text-white/60 text-sm ml-2 hover:text-white no-underline">01553029842</a>
                        </div>
                        <div className="text-white/60 text-xs text-center">© 2025 ShopPay. All rights reserved.</div>
                        <a href="#header" className="text-white/80 text-xs flex flex-col items-center hover:text-white no-underline">
                            <span>↑</span> Scroll to top
                        </a>
                    </div>
                    {/* Created by - programmer advertising */}
                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <p className="text-white/80 text-xs md:text-sm">
                            Crafted with <span className="text-[#3F96D2]">♥</span> by <a href="https://github.com/Elsharabasy73" target="_blank" rel="noreferrer" className="font-bold text-white hover:text-[#3F96D2] underline decoration-[#3F96D2]/50 underline-offset-4">Elsharabasy73</a> — Full-Stack Developer | <a href="https://wa.me/201553029842" target="_blank" rel="noreferrer" className="text-[#34C759] hover:text-white no-underline">WhatsApp 01553029842 →</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
