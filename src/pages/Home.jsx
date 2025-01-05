import React from 'react'
import Navbar from '../components/Navbar'
import { useState , useEffect } from 'react'
import MangaCard from '../components/MangaCard'
import Footer from '../components/Footer'


export default function Home() {

    const [mangas , setMangas] = useState([])

    useEffect(()=>{
        fetch('https://corsproxy.io/?url=https://api.mangadex.org/manga?limit=18&availableTranslatedLanguages[]=en')
        .then(response => {
          return response.json()
        }).then(data => {
          setMangas(data.data)
        })  
    } , [])


    return (
        <div className='min-h-[100vh] relative'>
            <Navbar></Navbar>
            <div className='pt-32 text-gray-300 text-2xl font-semibold container mr-auto ml-auto px-5' >Manga List :</div>
            <div className='pb-32 grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 place-items-center gap-5 container mr-auto ml-auto pt-7 px-5'>
                {mangas.map(manga =>{
                    return <MangaCard key={manga.id} {...manga}></MangaCard>
                })}
            </div>
            <Footer></Footer>
        </div>
    )
}
