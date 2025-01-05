import React from 'react'
import { GiBatMask, GiBeastEye } from "react-icons/gi";

export default function Logo() {
    return (
        <div className='flex items-center gap-3 select-none scale-75'>
            <GiBeastEye className='text-7xl'></GiBeastEye>
            <div className='text-3xl font-bold font-[logo]'>
                <div>Manga</div>
                <div className='-mt-3'>Reader</div>
            </div>
        </div>
    )
}
