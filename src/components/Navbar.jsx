import React from 'react'
import Logo from './logo'
import { FaSearchengin } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';



export default function Navbar() {

    const [searchInputValue, setSearchInputValue] = useState('')
    const [styleLeft, setStyleLeft] = useState('-100%')

    let navigate = useNavigate()

    const inputUpdateFunc = (e) => {
        setSearchInputValue(e.target.value)
    }

    const keyUpHandler = (e) => {
        if (e.key === 'Enter' && searchInputValue) {
            navigate(`/search/${searchInputValue}`)
        }
    }

    return (
        <>
            <div className='bg-black w-full fixed z-50 top-0 text-gray-300 bg-opacity-25 border-b-[2px] border-[#ffffff10] shadow-lg shadow-black backdrop-blur-sm'>
                <div className='container mr-auto ml-auto py-3 flex items-center justify-around'>

                    <RxHamburgerMenu onClick={() => setStyleLeft('0')} className='text-3xl lg:hidden'></RxHamburgerMenu>

                    <Logo></Logo>

                    <ul className='lg:flex items-center gap-10 text-xl hidden'>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/about'}>About</Link></li>
                        <li><a href="#">Favorites</a></li>
                        <li><a href="#">Categories</a></li>
                    </ul>

                    <div className='flex items-center gap-2 border-2 border-gray-600 rounded-full h-1/2 px-3 sm:px-5 py-1 w-[40%] sm:w-auto'>
                        <FaSearchengin className='text-lg sm:text-2xl'></FaSearchengin>
                        <input value={searchInputValue} onKeyUp={(e) => keyUpHandler(e)} onChange={(e) => inputUpdateFunc(e)} placeholder='Search for title ...' type="search" className='block w-full bg-transparent outline-none border-none placeholder:text-xs  sm:placeholder:text-sm' />
                    </div>
                </div>
            </div>

            {/* mobileNavbar */}

            <div style={{ left: styleLeft }} className='w-80 h-screen fixed top-0 text-gray-300 bg-gray-900 z-50 duration-500 transition-all'>
                <div className='mt-5 flex justify-end px-5'><IoClose onClick={() => setStyleLeft('-100%')} className='text-4xl cursor-pointer'></IoClose></div>
                <ul className='flex flex-col gap-10 text-3xl mt-10 pl-10'>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                    <li><a href="#">Favorites</a></li>
                    <li><a href="#">Categories</a></li>
                </ul>

            </div>
        </>
    )
}
