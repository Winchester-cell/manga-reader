import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";

export default function Chapter() {

  const [chapterFiles, setChapterFile] = useState([])
  const [baseUrl, setBaseUrl] = useState('')
  const [hash, setHash] = useState('')

  let params = useParams()
  let chapterID = params.chapterID

  useEffect(() => {
    fetch(`https://corsproxy.io/?url=https://api.mangadex.org/at-home/server/${chapterID}`)
      .then(response => {
        return response.json()
      }).then(data => {
        setBaseUrl(data.baseUrl)
        setHash(data.chapter.hash)
        setChapterFile(data.chapter.dataSaver)
      })
  }, [])

  let navigate = useNavigate()

  const backHomeFunc = () => {
    navigate('/')
  }



  return (
    <div className='text-gray-300 font-bold flex flex-col items-center'>
      <button onClick={backHomeFunc} className='my-5 text-lg gap-2 flex justify-center items-center font-bold text-gray-300 bg-gray-900 xl:px-20 xl:py-3 px-7 py-2  rounded-xl hover:scale-110 duration-500 transition-all' > <IoIosArrowBack /> <span>Back Home</span>   </button>
      {
        chapterFiles.map((chapterFile, index) => {
          return <img className='w-[80dvw] lg:w-[50dvw]' key={index} src={`https://corsproxy.io/?url=${baseUrl}/data-saver/${hash}/${chapterFile}`} alt="" />
        })
      }

    </div>
  )
}
