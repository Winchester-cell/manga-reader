import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function MangaCard({ id, attributes, relationships }) {

    const [coverFile, setCoverFile] = useState('')

    useEffect(() => {
        async function picLoad() {
            let coverID = relationships.find(rel => {
                return rel.type === "cover_art"
            }).id
            await fetch(`https://corsproxy.io/?url=https://api.mangadex.org/cover/${coverID}`)
                .then(response => {
                    return response.json()
                }).then(data => {
                    setCoverFile(data.data.attributes.fileName)
                })
        }


        picLoad()

    }, [])


    return (
        <>
            <Link to={`/manga/${id}`}>
                <div className='w-full h-64 overflow-hidden rounded-xl shadow backdrop-blur-sm flex border-[2px] border-[#ffffff10] text-gray-300 hover:scale-105 transition-all duration-500' >
                    <img className='w-36 h-64 block' src={`https://uploads.mangadex.org/covers/${id}/${coverFile}`} alt="" />
                    <div className='px-5 py-4 w-72'>
                        <div className='font-bold text-lg overflow-hidden text-ellipsis line-clamp-2 h-14 w-full'>{attributes.title.en}</div>
                        <div className='mt-1 w-full'>Description :</div>
                        <div className='text-xs line-clamp-[8] w-full'>{attributes.description.en}</div>
                    </div>
                </div>
            </Link>
        </>
    )
}

