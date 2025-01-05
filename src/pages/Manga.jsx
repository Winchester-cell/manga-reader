import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaBookReader } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";



export default function Manga() {

    let params = useParams()
    let mangaID = params.mangaID

    const [manga, setManga] = useState('')
    const [coverFile, setCoverFile] = useState('')
    const [author, setAuthor] = useState('')
    const [chapters, setChapters] = useState([])
    const [styleLeft, setStyleLeft] = useState('-100%')

    useEffect(() => {
        fetch(`https://corsproxy.io/?url=https://api.mangadex.org/manga/${mangaID}`)
            .then(response => {
                return response.json()
            }).then(data => {
                setManga(data.data)
            })


    }, [])

    useEffect(() => {
        if (manga) {
            let mangaCoverID = manga.relationships.find(rel => {
                return rel.type === 'cover_art'
            }).id
            let authorID = manga.relationships.find(rel => {
                return rel.type === 'author'
            }).id

            fetch(`https://corsproxy.io/?url=https://api.mangadex.org/cover/${mangaCoverID}`)
                .then(response => {
                    return response.json()
                }).then(data => {
                    setCoverFile(data.data.attributes.fileName)

                })

            fetch(`https://corsproxy.io/?url=https://api.mangadex.org/author/${authorID}`)
                .then(response => {
                    return response.json()
                }).then(data => {
                    setAuthor(data.data.attributes.name)
                })

            fetch(`https://api.mangadex.org/manga/${mangaID}/feed?translatedLanguage[]=en&limit=500&order[chapter]=asc`)
                .then(response => {
                    return response.json()
                }).then(data => {

                    setChapters(data.data)

                })


        }
    }, [manga])

    let navigate = useNavigate()

    const backHomeFunc = () => {
        navigate('/')
    }

    const chapterMenuFunc = () => {
        setStyleLeft('0')
    }

    const closeMenu = () => {
        setStyleLeft('-100%')
    }

    return (
        <div className='select-none'>
            {
                chapters && (
                    <div style={{ right: styleLeft }} className='transition-all duration-700 overflow-y-auto text-gray-300 fixed z-50 w-screen h-screen bg-[#000000d2] backdrop-blur-sm top-0 select-none'>
                        <div className='w-full flex items-center justify-between px-10 py-5'><span className='font-bold text-2xl'>Chapters List :</span><IoClose onClick={closeMenu} className='text-5xl cursor-pointer' /></div>
                        <div className='w-full px-10 pb-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5'>
                            {
                                chapters.filter(chapter => {
                                    return chapter.attributes.pages !== 0
                                }).map(chapter => {
                                    return (
                                        <Link key={chapter.id} to={`/chapter/${chapter.id}`}>
                                            <div className='w-full flex justify-center items-center border-2 border-gray-300 p-3 rounded-md h-[60px]'>
                                                <div>Chapter : {chapter.attributes.chapter}</div>
                                            </div>
                                        </Link>

                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
            {manga && (
                <div className='container h-screen w-screen mr-auto ml-auto p-3 flex justify-center'>

                    <div className='h-fit lg:h-full lg:overflow-hidden rounded-xl py-5 lg:py-0 shadow backdrop-blur-sm grid grid-cols-1 place-items-center items-stretch lg:flex border-[2px] border-[#ffffff10] text-gray-300'>
                        <img className='block w-1/2 h-64 lg:w-96 lg:h-full rounded-lg' src={`https://uploads.mangadex.org/covers/${mangaID}/${coverFile}`} alt="" />

                        <div className='px-5 mt-5 lg:mt-0 lg:py-8 lg:px-20 lg:w-[80%]'>
                            <h2 className='xl:text-3xl text-2xl font-semibold mb-5'>{manga.attributes.title.en}</h2>
                            <h2 className='text-xl font-semibold mb-3'>Description : </h2>
                            <p className='p-2 rounded-lg text-sm w-full lg:w-[70%] h-[135px] overflow-hidden line-clamp-6 mb-3 border-2 border-[#ffffff1c]'>{manga.attributes.description.en}</p>
                            <h2 className='mb-5'>Author : {author}</h2>
                            <div className='grid grid-cols-1 gap-3 lg:gap-2  mb-5'>
                                <h2>Genre :</h2>
                                <ul className='flex items-center gap-2 select-none flex-wrap'>
                                    {manga.attributes.tags.slice(0, 6).map(tag => {
                                        return (<li className='border-2 py-1 px-2 rounded-lg border-[#ffffff1c]' key={tag.id}>{tag.attributes.name.en}</li>)
                                    })}
                                </ul>
                            </div>
                            <h2 className='mb-5'>Last Chapter : {manga.attributes.lastChapter}</h2>
                            <div className='flex justify-center gap-2 lg:gap-10'>
                                <button onClick={backHomeFunc} className='text-lg gap-2 flex justify-center items-center font-bold text-gray-300 bg-gray-900 xl:px-20 xl:py-3 px-7 py-2  rounded-xl hover:scale-110 duration-500 transition-all' > <IoIosArrowBack /> <span>Back Home</span>   </button>
                                <button onClick={chapterMenuFunc} className='text-lg gap-2 flex justify-center items-center font-bold text-gray-900 bg-gray-300 xl:px-20 xl:py-3 px-7 py-2  rounded-xl hover:scale-110 duration-500 transition-all' > <span>Read</span>  <FaBookReader /> </button>

                            </div>
                        </div>
                    </div>


                </div>

            )}


        </div>
    )
}
